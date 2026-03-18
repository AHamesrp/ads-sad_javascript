const API_URL = 'https://6909670e2d902d0651b39c69.mockapi.io/lista/api/v1/tasks';

/**
 * Busca todas as tarefas da API
 * @returns {Promise<Array>} Lista de tarefas
 */
export const getTasks = async () => {
  try {
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar tarefas:', error);
    throw error;
  }
};

/**
 * Cria uma nova tarefa na API
 * @param {Object} task - Objeto com os dados da tarefa
 * @returns {Promise<Object>} Tarefa criada
 */
export const createTask = async (task) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    
    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao criar tarefa:', error);
    throw error;
  }
};

/**
 * Atualiza uma tarefa existente
 * @param {string} id - ID da tarefa
 * @param {Object} task - Objeto com os dados atualizados
 * @returns {Promise<Object>} Tarefa atualizada
 */
export const updateTask = async (id, task) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    
    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao atualizar tarefa:', error);
    throw error;
  }
};

/**
 * Remove uma tarefa da API
 * @param {string} id - ID da tarefa a ser removida
 * @returns {Promise<Object>} Resposta da API
 */
export const deleteTask = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao deletar tarefa:', error);
    throw error;
  }
};
