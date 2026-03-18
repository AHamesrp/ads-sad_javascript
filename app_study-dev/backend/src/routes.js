const express = require('express');
const router = express.Router();
const { getDatabase, saveDatabase } = require('./database');

// Mapeamento de status para exibição
const STATUS_LABELS = {
  'not_learned': 'Ainda não aprendi',
  'learned_not_mastered': 'Aprendi, mas não domino',
  'mastered': 'Conteúdo dominado'
};

// Helper para converter resultado SQL em array de objetos
function resultToArray(result) {
  if (!result || result.length === 0) return [];
  const columns = result[0].columns;
  const values = result[0].values;
  return values.map(row => {
    const obj = {};
    columns.forEach((col, i) => {
      obj[col] = row[i];
    });
    return obj;
  });
}

// GET /api/studies - Listar todos os estudos
router.get('/', (req, res) => {
  try {
    const db = getDatabase();
    const result = db.exec('SELECT * FROM studies ORDER BY created_at DESC');
    const studies = resultToArray(result);
    const studiesWithLabels = studies.map(study => ({
      ...study,
      statusLabel: STATUS_LABELS[study.status]
    }));
    res.json(studiesWithLabels);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar estudos', details: error.message });
  }
});

// GET /api/studies/options/status - Retornar opções de status (DEVE VIR ANTES DE /:id)
router.get('/options/status', (req, res) => {
  res.json([
    { value: 'not_learned', label: 'Ainda não aprendi' },
    { value: 'learned_not_mastered', label: 'Aprendi, mas não domino' },
    { value: 'mastered', label: 'Conteúdo dominado' }
  ]);
});

// GET /api/studies/:id - Buscar estudo por ID
router.get('/:id', (req, res) => {
  try {
    const db = getDatabase();
    const result = db.exec(`SELECT * FROM studies WHERE id = ${parseInt(req.params.id)}`);
    const studies = resultToArray(result);
    
    if (studies.length === 0) {
      return res.status(404).json({ error: 'Estudo não encontrado' });
    }
    
    res.json({ ...studies[0], statusLabel: STATUS_LABELS[studies[0].status] });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar estudo', details: error.message });
  }
});

// POST /api/studies - Criar novo estudo
router.post('/', (req, res) => {
  try {
    const { title, content, status } = req.body;
    const db = getDatabase();

    // Validações
    if (!title || !title.trim()) {
      return res.status(400).json({ error: 'Título é obrigatório' });
    }
    if (!content || !content.trim()) {
      return res.status(400).json({ error: 'Conteúdo é obrigatório' });
    }
    if (!status || !['not_learned', 'learned_not_mastered', 'mastered'].includes(status)) {
      return res.status(400).json({ error: 'Status inválido' });
    }

    // Escapar aspas simples
    const safeTitle = title.trim().replace(/'/g, "''");
    const safeContent = content.trim().replace(/'/g, "''");

    db.run(`INSERT INTO studies (title, content, status) VALUES ('${safeTitle}', '${safeContent}', '${status}')`);
    saveDatabase();

    // Buscar o registro inserido
    const result = db.exec('SELECT * FROM studies ORDER BY id DESC LIMIT 1');
    const newStudy = resultToArray(result)[0];
    
    res.status(201).json({ ...newStudy, statusLabel: STATUS_LABELS[newStudy.status] });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar estudo', details: error.message });
  }
});

// PUT /api/studies/:id - Atualizar estudo
router.put('/:id', (req, res) => {
  try {
    const { title, content, status } = req.body;
    const id = parseInt(req.params.id);
    const db = getDatabase();

    // Verificar se existe
    const existingResult = db.exec(`SELECT * FROM studies WHERE id = ${id}`);
    const existing = resultToArray(existingResult);
    
    if (existing.length === 0) {
      return res.status(404).json({ error: 'Estudo não encontrado' });
    }

    // Validações
    if (!title || !title.trim()) {
      return res.status(400).json({ error: 'Título é obrigatório' });
    }
    if (!content || !content.trim()) {
      return res.status(400).json({ error: 'Conteúdo é obrigatório' });
    }
    if (!status || !['not_learned', 'learned_not_mastered', 'mastered'].includes(status)) {
      return res.status(400).json({ error: 'Status inválido' });
    }

    // Escapar aspas simples
    const safeTitle = title.trim().replace(/'/g, "''");
    const safeContent = content.trim().replace(/'/g, "''");

    db.run(`UPDATE studies SET title = '${safeTitle}', content = '${safeContent}', status = '${status}', updated_at = CURRENT_TIMESTAMP WHERE id = ${id}`);
    saveDatabase();

    const updatedResult = db.exec(`SELECT * FROM studies WHERE id = ${id}`);
    const updatedStudy = resultToArray(updatedResult)[0];
    
    res.json({ ...updatedStudy, statusLabel: STATUS_LABELS[updatedStudy.status] });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar estudo', details: error.message });
  }
});

// DELETE /api/studies/:id - Deletar estudo
router.delete('/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const db = getDatabase();

    const existingResult = db.exec(`SELECT * FROM studies WHERE id = ${id}`);
    const existing = resultToArray(existingResult);
    
    if (existing.length === 0) {
      return res.status(404).json({ error: 'Estudo não encontrado' });
    }

    db.run(`DELETE FROM studies WHERE id = ${id}`);
    saveDatabase();
    
    res.json({ message: 'Estudo deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar estudo', details: error.message });
  }
});

module.exports = router;
