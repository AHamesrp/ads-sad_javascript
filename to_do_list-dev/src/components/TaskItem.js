import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

/**
 * Componente que representa um item da lista de tarefas
 */
const TaskItem = ({ task, onEdit, onDelete }) => {
  // Formata a data de criação
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  // Define a cor baseada na prioridade
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'alta':
        return '#f44336';
      case 'media':
        return '#ff9800';
      case 'baixa':
        return '#4caf50';
      default:
        return '#9e9e9e';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={2}>
            {task.title}
          </Text>
          <View
            style={[
              styles.priorityBadge,
              { backgroundColor: getPriorityColor(task.priority) },
            ]}
          >
            <Text style={styles.priorityText}>
              {task.priority ? task.priority.toUpperCase() : 'N/A'}
            </Text>
          </View>
        </View>

        {task.description && (
          <Text style={styles.description} numberOfLines={2}>
            {task.description}
          </Text>
        )}

        <View style={styles.footer}>
          <Text style={styles.date}>
            {task.createdAt ? formatDate(task.createdAt) : 'Data não disponível'}
          </Text>

          <View style={styles.statusContainer}>
            <View
              style={[
                styles.statusDot,
                { backgroundColor: task.completed ? '#4caf50' : '#ff9800' },
              ]}
            />
            <Text style={styles.statusText}>
              {task.completed ? 'Concluída' : 'Pendente'}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.actionButton, styles.editButton]}
          onPress={onEdit}
        >
          <Text style={styles.editButtonText}>✏️ Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={onDelete}
        >
          <Text style={styles.deleteButtonText}>🗑️ Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  content: {
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    marginRight: 8,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  priorityText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  date: {
    fontSize: 12,
    color: '#999',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editButton: {
    backgroundColor: '#2196F3',
  },
  editButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  deleteButton: {
    backgroundColor: '#f44336',
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default TaskItem;
