-- ====================================
-- SISTEMA DE GESTÃO VETERINÁRIA
-- Script de criação do banco de dados
-- Data: 12/11/2025
-- ====================================

-- Criar banco de dados
CREATE DATABASE IF NOT EXISTS vetclinic
    DEFAULT CHARACTER SET utf8mb4
    DEFAULT COLLATE utf8mb4_unicode_ci;

USE vetclinic;

-- ====================================
-- TABELA: tutor
-- Descrição: Armazena dados dos tutores (donos dos animais)
-- ====================================
CREATE TABLE tutor (
    id_tutor INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(14) UNIQUE NOT NULL,
    telefone VARCHAR(15),
    email VARCHAR(100),
    endereco TEXT,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ativo BOOLEAN DEFAULT TRUE,
    CONSTRAINT chk_cpf_formato CHECK (cpf REGEXP '^[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}$')
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ====================================
-- TABELA: animal
-- Descrição: Armazena dados dos pacientes (animais)
-- ====================================
CREATE TABLE animal (
    id_animal INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL,
    especie VARCHAR(30) NOT NULL,
    raca VARCHAR(50),
    data_nascimento DATE,
    peso DECIMAL(5,2),
    observacoes TEXT,
    id_tutor INT NOT NULL,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ativo BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (id_tutor) REFERENCES tutor(id_tutor) ON DELETE RESTRICT,
    INDEX idx_nome (nome),
    INDEX idx_tutor (id_tutor)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ====================================
-- TABELA: veterinario
-- Descrição: Armazena dados dos veterinários
-- ====================================
CREATE TABLE veterinario (
    id_veterinario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    crmv VARCHAR(20) UNIQUE NOT NULL,
    especialidade VARCHAR(50),
    telefone VARCHAR(15),
    email VARCHAR(100),
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ativo BOOLEAN DEFAULT TRUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ====================================
-- TABELA: consulta
-- Descrição: Armazena dados das consultas realizadas
-- ====================================
CREATE TABLE consulta (
    id_consulta INT PRIMARY KEY AUTO_INCREMENT,
    data_consulta DATE NOT NULL,
    hora_consulta TIME NOT NULL,
    motivo TEXT,
    diagnostico TEXT,
    tratamento TEXT,
    observacoes TEXT,
    id_animal INT NOT NULL,
    id_veterinario INT NOT NULL,
    status VARCHAR(20) DEFAULT 'AGENDADA',
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_animal) REFERENCES animal(id_animal) ON DELETE RESTRICT,
    FOREIGN KEY (id_veterinario) REFERENCES veterinario(id_veterinario) ON DELETE RESTRICT,
    INDEX idx_data (data_consulta),
    INDEX idx_animal (id_animal),
    INDEX idx_veterinario (id_veterinario),
    CONSTRAINT chk_status CHECK (status IN ('AGENDADA', 'REALIZADA', 'CANCELADA'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ====================================
-- TABELA: usuario
-- Descrição: Armazena dados dos usuários do sistema
-- ====================================
CREATE TABLE usuario (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    login VARCHAR(50) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    tipo_usuario VARCHAR(20) NOT NULL,
    nome_completo VARCHAR(100) NOT NULL,
    id_veterinario INT,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ultimo_acesso TIMESTAMP NULL,
    ativo BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (id_veterinario) REFERENCES veterinario(id_veterinario) ON DELETE SET NULL,
    CONSTRAINT chk_tipo_usuario CHECK (tipo_usuario IN ('ADMINISTRADOR', 'VETERINARIO', 'ASSISTENTE'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ====================================
-- TABELA: log_sistema
-- Descrição: Registra ações importantes no sistema (auditoria)
-- ====================================
CREATE TABLE log_sistema (
    id_log INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT NOT NULL,
    acao VARCHAR(50) NOT NULL,
    tabela_afetada VARCHAR(50),
    id_registro INT,
    descricao TEXT,
    data_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario),
    INDEX idx_data_hora (data_hora),
    INDEX idx_usuario (id_usuario)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ====================================
-- INSERÇÃO DE DADOS DE EXEMPLO
-- ====================================

-- Inserir tutores de exemplo
INSERT INTO tutor (nome, cpf, telefone, email, endereco) VALUES
('João Silva', '123.456.789-01', '(19) 98765-4321', 'joao.silva@email.com', 'Rua das Flores, 123, Centro, Campinas-SP'),
('Maria Santos', '987.654.321-00', '(19) 99876-5432', 'maria.santos@email.com', 'Av. Principal, 456, Jardim das Palmeiras, Campinas-SP'),
('Pedro Oliveira', '456.789.123-45', '(19) 97654-3210', 'pedro.oliveira@email.com', 'Rua dos Pinheiros, 789, Vila Nova, Campinas-SP');

-- Inserir veterinários de exemplo
INSERT INTO veterinario (nome, crmv, especialidade, telefone, email) VALUES
('Dra. Ana Paula Costa', 'CRMV-SP 12345', 'Clínica Geral', '(19) 3234-5678', 'ana.costa@vetclinic.com'),
('Dr. Carlos Eduardo Lima', 'CRMV-SP 67890', 'Cirurgia', '(19) 3234-5679', 'carlos.lima@vetclinic.com'),
('Dra. Juliana Ferreira', 'CRMV-SP 11223', 'Dermatologia', '(19) 3234-5680', 'juliana.ferreira@vetclinic.com');

-- Inserir animais de exemplo
INSERT INTO animal (nome, especie, raca, data_nascimento, peso, id_tutor, observacoes) VALUES
('Rex', 'Cachorro', 'Labrador', '2020-05-15', 28.5, 1, 'Animal dócil e obediente'),
('Mimi', 'Gato', 'Siamês', '2021-03-20', 4.2, 1, 'Alérgico a ração com frango'),
('Thor', 'Cachorro', 'Pastor Alemão', '2019-08-10', 35.0, 2, 'Necessita exercícios diários'),
('Nina', 'Gato', 'Persa', '2022-01-05', 3.8, 3, 'Castrada');

-- Inserir usuários de exemplo (senha padrão: "senha123" - deve ser criptografada na aplicação real)
INSERT INTO usuario (login, senha, tipo_usuario, nome_completo, id_veterinario) VALUES
('admin', '$2b$10$rKvvVZH.ePJz8KcxqWvVj.JiPqjX6QZPJRGJXrwZZQn5vXrY0rqGe', 'ADMINISTRADOR', 'Administrador do Sistema', NULL),
('ana.costa', '$2b$10$rKvvVZH.ePJz8KcxqWvVj.JiPqjX6QZPJRGJXrwZZQn5vXrY0rqGe', 'VETERINARIO', 'Dra. Ana Paula Costa', 1),
('carlos.lima', '$2b$10$rKvvVZH.ePJz8KcxqWvVj.JiPqjX6QZPJRGJXrwZZQn5vXrY0rqGe', 'VETERINARIO', 'Dr. Carlos Eduardo Lima', 2),
('recep01', '$2b$10$rKvvVZH.ePJz8KcxqWvVj.JiPqjX6QZPJRGJXrwZZQn5vXrY0rqGe', 'ASSISTENTE', 'Recepcionista Maria', NULL);

-- Inserir consultas de exemplo
INSERT INTO consulta (data_consulta, hora_consulta, motivo, diagnostico, tratamento, id_animal, id_veterinario, status) VALUES
('2025-11-10', '09:00:00', 'Consulta de rotina', 'Animal saudável', 'Manutenção da dieta e exercícios', 1, 1, 'REALIZADA'),
('2025-11-10', '10:30:00', 'Coceira excessiva', 'Dermatite alérgica', 'Antialérgico por 7 dias', 2, 3, 'REALIZADA'),
('2025-11-13', '14:00:00', 'Vacinação anual', NULL, NULL, 1, 1, 'AGENDADA'),
('2025-11-14', '15:30:00', 'Check-up geral', NULL, NULL, 3, 2, 'AGENDADA');

-- ====================================
-- VIEWS ÚTEIS
-- ====================================

-- View: Lista completa de animais com seus tutores
CREATE VIEW vw_animais_tutores AS
SELECT 
    a.id_animal,
    a.nome AS nome_animal,
    a.especie,
    a.raca,
    a.data_nascimento,
    a.peso,
    t.id_tutor,
    t.nome AS nome_tutor,
    t.telefone,
    t.email
FROM animal a
INNER JOIN tutor t ON a.id_tutor = t.id_tutor
WHERE a.ativo = TRUE AND t.ativo = TRUE;

-- View: Agenda de consultas com informações completas
CREATE VIEW vw_agenda_consultas AS
SELECT 
    c.id_consulta,
    c.data_consulta,
    c.hora_consulta,
    c.status,
    a.nome AS nome_animal,
    a.especie,
    t.nome AS nome_tutor,
    t.telefone,
    v.nome AS nome_veterinario,
    c.motivo
FROM consulta c
INNER JOIN animal a ON c.id_animal = a.id_animal
INNER JOIN tutor t ON a.id_tutor = t.id_tutor
INNER JOIN veterinario v ON c.id_veterinario = v.id_veterinario
ORDER BY c.data_consulta, c.hora_consulta;

-- View: Histórico completo de consultas por animal
CREATE VIEW vw_historico_animal AS
SELECT 
    a.id_animal,
    a.nome AS nome_animal,
    c.data_consulta,
    c.hora_consulta,
    c.motivo,
    c.diagnostico,
    c.tratamento,
    v.nome AS nome_veterinario,
    c.status
FROM animal a
INNER JOIN consulta c ON a.id_animal = c.id_animal
INNER JOIN veterinario v ON c.id_veterinario = v.id_veterinario
ORDER BY a.id_animal, c.data_consulta DESC, c.hora_consulta DESC;

-- ====================================
-- PROCEDURES ÚTEIS
-- ====================================

-- Procedure: Verificar conflito de horário
DELIMITER //
CREATE PROCEDURE sp_verificar_conflito_horario(
    IN p_data_consulta DATE,
    IN p_hora_consulta TIME,
    IN p_id_veterinario INT,
    OUT p_tem_conflito BOOLEAN
)
BEGIN
    DECLARE v_count INT;
    
    SELECT COUNT(*) INTO v_count
    FROM consulta
    WHERE data_consulta = p_data_consulta
      AND hora_consulta = p_hora_consulta
      AND id_veterinario = p_id_veterinario
      AND status = 'AGENDADA';
    
    IF v_count > 0 THEN
        SET p_tem_conflito = TRUE;
    ELSE
        SET p_tem_conflito = FALSE;
    END IF;
END //
DELIMITER ;

-- Procedure: Buscar histórico completo de um animal
DELIMITER //
CREATE PROCEDURE sp_historico_animal(IN p_id_animal INT)
BEGIN
    SELECT 
        c.id_consulta,
        c.data_consulta,
        c.hora_consulta,
        c.motivo,
        c.diagnostico,
        c.tratamento,
        c.observacoes,
        v.nome AS veterinario,
        c.status
    FROM consulta c
    INNER JOIN veterinario v ON c.id_veterinario = v.id_veterinario
    WHERE c.id_animal = p_id_animal
    ORDER BY c.data_consulta DESC, c.hora_consulta DESC;
END //
DELIMITER ;

-- ====================================
-- TRIGGERS
-- ====================================

-- Trigger: Registrar log ao inserir nova consulta
DELIMITER //
CREATE TRIGGER trg_log_insert_consulta
AFTER INSERT ON consulta
FOR EACH ROW
BEGIN
    INSERT INTO log_sistema (id_usuario, acao, tabela_afetada, id_registro, descricao)
    VALUES (1, 'INSERT', 'consulta', NEW.id_consulta, CONCAT('Nova consulta agendada para ', NEW.data_consulta));
END //
DELIMITER ;

-- Trigger: Registrar log ao atualizar consulta
DELIMITER //
CREATE TRIGGER trg_log_update_consulta
AFTER UPDATE ON consulta
FOR EACH ROW
BEGIN
    INSERT INTO log_sistema (id_usuario, acao, tabela_afetada, id_registro, descricao)
    VALUES (1, 'UPDATE', 'consulta', NEW.id_consulta, CONCAT('Consulta atualizada. Status: ', NEW.status));
END //
DELIMITER ;

-- ====================================
-- ÍNDICES ADICIONAIS PARA PERFORMANCE
-- ====================================

CREATE INDEX idx_tutor_cpf ON tutor(cpf);
CREATE INDEX idx_veterinario_crmv ON veterinario(crmv);
CREATE INDEX idx_consulta_data_hora ON consulta(data_consulta, hora_consulta);
CREATE INDEX idx_animal_especie ON animal(especie);

-- ====================================
-- COMENTÁRIOS FINAIS
-- ====================================

-- Este script cria a estrutura completa do banco de dados
-- para o Sistema de Gestão de Pacientes Veterinários
-- Inclui:
-- - 6 tabelas principais
-- - Dados de exemplo para testes
-- - 3 views para consultas facilitadas
-- - 2 stored procedures
-- - 2 triggers para auditoria
-- - Índices para otimização de performance

-- Para utilizar: mysql -u root -p < vetclinic.sql
