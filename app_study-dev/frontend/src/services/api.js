// Configuração da URL da API
// Altere para o IP da sua máquina quando testar no celular
const API_URL = 'http://localhost:3001/api';

// Opções de status disponíveis
export const STATUS_OPTIONS = [
  { value: 'not_learned', label: 'Ainda não aprendi' },
  { value: 'learned_not_mastered', label: 'Aprendi, mas não domino' },
  { value: 'mastered', label: 'Conteúdo dominado' }
];

// Helper para requisições
const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Erro na requisição');
  }
  return data;
};

// Listar todos os estudos
export const getStudies = async () => {
  const response = await fetch(`${API_URL}/studies`);
  return handleResponse(response);
};

// Buscar estudo por ID
export const getStudyById = async (id) => {
  const response = await fetch(`${API_URL}/studies/${id}`);
  return handleResponse(response);
};

// Criar novo estudo
export const createStudy = async (study) => {
  const response = await fetch(`${API_URL}/studies`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(study)
  });
  return handleResponse(response);
};

// Atualizar estudo
export const updateStudy = async (id, study) => {
  const response = await fetch(`${API_URL}/studies/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(study)
  });
  return handleResponse(response);
};

// Deletar estudo
export const deleteStudy = async (id) => {
  const response = await fetch(`${API_URL}/studies/${id}`, {
    method: 'DELETE'
  });
  return handleResponse(response);
};

// Health check
export const healthCheck = async () => {
  const response = await fetch(`${API_URL}/health`);
  return handleResponse(response);
};
