/**
 * Controller de Animais
 * Gerencia CRUD de pacientes (animais)
 */

const db = require('../config/database');

const animalController = {
    /**
     * Listar todos os animais
     */
    async listar(req, res) {
        try {
            const [animais] = await db.query(`
                SELECT 
                    a.id_animal,
                    a.nome,
                    a.especie,
                    a.raca,
                    a.data_nascimento,
                    a.peso,
                    a.observacoes,
                    t.nome AS nome_tutor,
                    t.telefone AS telefone_tutor
                FROM animal a
                INNER JOIN tutor t ON a.id_tutor = t.id_tutor
                WHERE a.ativo = TRUE
                ORDER BY a.nome
            `);

            res.json({
                total: animais.length,
                animais
            });

        } catch (error) {
            console.error('Erro ao listar animais:', error);
            res.status(500).json({
                error: 'Erro ao listar animais'
            });
        }
    },

    /**
     * Buscar animal por ID
     */
    async buscarPorId(req, res) {
        try {
            const { id } = req.params;

            const [animais] = await db.query(`
                SELECT 
                    a.*,
                    t.nome AS nome_tutor,
                    t.cpf AS cpf_tutor,
                    t.telefone AS telefone_tutor,
                    t.email AS email_tutor
                FROM animal a
                INNER JOIN tutor t ON a.id_tutor = t.id_tutor
                WHERE a.id_animal = ? AND a.ativo = TRUE
            `, [id]);

            if (animais.length === 0) {
                return res.status(404).json({
                    error: 'Animal não encontrado'
                });
            }

            res.json(animais[0]);

        } catch (error) {
            console.error('Erro ao buscar animal:', error);
            res.status(500).json({
                error: 'Erro ao buscar animal'
            });
        }
    },

    /**
     * Buscar histórico de consultas do animal
     */
    async buscarHistorico(req, res) {
        try {
            const { id } = req.params;

            const [consultas] = await db.query(`
                SELECT 
                    c.id_consulta,
                    c.data_consulta,
                    c.hora_consulta,
                    c.motivo,
                    c.diagnostico,
                    c.tratamento,
                    c.status,
                    v.nome AS veterinario
                FROM consulta c
                INNER JOIN veterinario v ON c.id_veterinario = v.id_veterinario
                WHERE c.id_animal = ?
                ORDER BY c.data_consulta DESC, c.hora_consulta DESC
            `, [id]);

            res.json({
                total: consultas.length,
                consultas
            });

        } catch (error) {
            console.error('Erro ao buscar histórico:', error);
            res.status(500).json({
                error: 'Erro ao buscar histórico de consultas'
            });
        }
    },

    /**
     * Cadastrar novo animal
     */
    async criar(req, res) {
        try {
            const { nome, especie, raca, data_nascimento, peso, observacoes, id_tutor } = req.body;

            // Validações
            if (!nome || !especie || !id_tutor) {
                return res.status(400).json({
                    error: 'Nome, espécie e tutor são obrigatórios'
                });
            }

            // Verificar se tutor existe
            const [tutores] = await db.query(
                'SELECT id_tutor FROM tutor WHERE id_tutor = ? AND ativo = TRUE',
                [id_tutor]
            );

            if (tutores.length === 0) {
                return res.status(404).json({
                    error: 'Tutor não encontrado'
                });
            }

            // Inserir animal
            const [result] = await db.query(
                `INSERT INTO animal (nome, especie, raca, data_nascimento, peso, observacoes, id_tutor)
                 VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [nome, especie, raca || null, data_nascimento || null, peso || null, observacoes || null, id_tutor]
            );

            res.status(201).json({
                message: 'Animal cadastrado com sucesso',
                id_animal: result.insertId
            });

        } catch (error) {
            console.error('Erro ao cadastrar animal:', error);
            res.status(500).json({
                error: 'Erro ao cadastrar animal'
            });
        }
    },

    /**
     * Atualizar dados do animal
     */
    async atualizar(req, res) {
        try {
            const { id } = req.params;
            const { nome, especie, raca, data_nascimento, peso, observacoes, id_tutor } = req.body;

            // Verificar se animal existe
            const [animais] = await db.query(
                'SELECT id_animal FROM animal WHERE id_animal = ? AND ativo = TRUE',
                [id]
            );

            if (animais.length === 0) {
                return res.status(404).json({
                    error: 'Animal não encontrado'
                });
            }

            // Atualizar animal
            await db.query(
                `UPDATE animal 
                 SET nome = ?, especie = ?, raca = ?, data_nascimento = ?, 
                     peso = ?, observacoes = ?, id_tutor = ?
                 WHERE id_animal = ?`,
                [nome, especie, raca, data_nascimento, peso, observacoes, id_tutor, id]
            );

            res.json({
                message: 'Animal atualizado com sucesso'
            });

        } catch (error) {
            console.error('Erro ao atualizar animal:', error);
            res.status(500).json({
                error: 'Erro ao atualizar animal'
            });
        }
    },

    /**
     * Excluir animal (soft delete)
     */
    async excluir(req, res) {
        try {
            const { id } = req.params;

            // Verificar permissão (apenas admin pode excluir)
            if (req.user.tipo !== 'ADMINISTRADOR') {
                return res.status(403).json({
                    error: 'Você não tem permissão para excluir registros'
                });
            }

            // Verificar se animal existe
            const [animais] = await db.query(
                'SELECT id_animal FROM animal WHERE id_animal = ? AND ativo = TRUE',
                [id]
            );

            if (animais.length === 0) {
                return res.status(404).json({
                    error: 'Animal não encontrado'
                });
            }

            // Soft delete
            await db.query(
                'UPDATE animal SET ativo = FALSE WHERE id_animal = ?',
                [id]
            );

            res.json({
                message: 'Animal excluído com sucesso'
            });

        } catch (error) {
            console.error('Erro ao excluir animal:', error);
            res.status(500).json({
                error: 'Erro ao excluir animal'
            });
        }
    }
};

module.exports = animalController;
