/**
 * Controller de Autenticação
 * Gerencia login, logout e verificação de token
 */

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/database');

const authController = {
    /**
     * Login de usuário
     */
    async login(req, res) {
        try {
            const { login, senha } = req.body;

            // Validação
            if (!login || !senha) {
                return res.status(400).json({
                    error: 'Login e senha são obrigatórios'
                });
            }

            // Buscar usuário no banco
            const [users] = await db.query(
                'SELECT * FROM usuario WHERE login = ? AND ativo = TRUE',
                [login]
            );

            if (users.length === 0) {
                return res.status(401).json({
                    error: 'Usuário ou senha inválidos'
                });
            }

            const user = users[0];

            // Verificar senha
            const senhaValida = await bcrypt.compare(senha, user.senha);
            if (!senhaValida) {
                return res.status(401).json({
                    error: 'Usuário ou senha inválidos'
                });
            }

            // Gerar token JWT
            const token = jwt.sign(
                {
                    id: user.id_usuario,
                    login: user.login,
                    tipo: user.tipo_usuario
                },
                process.env.JWT_SECRET || 'secret_key',
                {
                    expiresIn: process.env.JWT_EXPIRES_IN || '24h'
                }
            );

            // Atualizar último acesso
            await db.query(
                'UPDATE usuario SET ultimo_acesso = NOW() WHERE id_usuario = ?',
                [user.id_usuario]
            );

            // Retornar dados do usuário (sem a senha)
            res.json({
                message: 'Login realizado com sucesso',
                token,
                user: {
                    id: user.id_usuario,
                    login: user.login,
                    nome: user.nome_completo,
                    tipo: user.tipo_usuario
                }
            });

        } catch (error) {
            console.error('Erro no login:', error);
            res.status(500).json({
                error: 'Erro ao fazer login'
            });
        }
    },

    /**
     * Logout de usuário
     */
    logout(req, res) {
        // No caso de JWT, o logout é feito no frontend removendo o token
        res.json({
            message: 'Logout realizado com sucesso'
        });
    },

    /**
     * Middleware para verificar token JWT
     */
    verifyToken(req, res, next) {
        const token = req.headers['authorization']?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({
                error: 'Token não fornecido'
            });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_key');
            req.user = decoded;
            next();
        } catch (error) {
            return res.status(401).json({
                error: 'Token inválido ou expirado'
            });
        }
    },

    /**
     * Obter informações do usuário logado
     */
    async getMe(req, res) {
        try {
            const [users] = await db.query(
                `SELECT id_usuario, login, nome_completo, tipo_usuario, ultimo_acesso
                 FROM usuario WHERE id_usuario = ?`,
                [req.user.id]
            );

            if (users.length === 0) {
                return res.status(404).json({
                    error: 'Usuário não encontrado'
                });
            }

            res.json({
                user: users[0]
            });

        } catch (error) {
            console.error('Erro ao buscar usuário:', error);
            res.status(500).json({
                error: 'Erro ao buscar informações do usuário'
            });
        }
    }
};

module.exports = authController;
