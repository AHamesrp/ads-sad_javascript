import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import TaskItem from '../components/TaskItem';
import DeleteModal from '../components/DeleteModal';
import { getTasks, deleteTask } from '../services/api';

/**
 * Tela principal que exibe a lista de tarefas
 */
const HomeScreen = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  /**
   * Carrega as tarefas da API
   */
  const loadTasks = async () => {
    try {
      setLoading(true);
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      Alert.alert(
        'Erro',
        'Não foi possível carregar as tarefas. Verifique sua conexão e tente novamente.'
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  /**
   * Atualiza a lista quando a tela recebe foco
   */
  useFocusEffect(
    useCallback(() => {
      loadTasks();
    }, [])
  );

  /**
   * Pull to refresh
   */
  const onRefresh = () => {
    setRefreshing(true);
    loadTasks();
  };

  /**
   * Navega para o formulário de criação
   */
  const handleAddTask = () => {
    navigation.navigate('TaskForm', { mode: 'create' });
  };

  /**
   * Navega para o formulário de edição
   */
  const handleEditTask = (task) => {
    navigation.navigate('TaskForm', { mode: 'edit', task });
  };

  /**
   * Abre o modal de confirmação de exclusão
   */
  const handleDeleteRequest = (task) => {
    setTaskToDelete(task);
    setDeleteModalVisible(true);
  };

  /**
   * Confirma e executa a exclusão da tarefa
   */
  const handleConfirmDelete = async () => {
    try {
      setDeleteModalVisible(false);
      setLoading(true);

      await deleteTask(taskToDelete.id);

      // Remove a tarefa da lista localmente
      setTasks(tasks.filter((task) => task.id !== taskToDelete.id));

      Alert.alert('Sucesso', 'Tarefa excluída com sucesso!');
    } catch (error) {
      Alert.alert(
        'Erro',
        'Não foi possível excluir a tarefa. Tente novamente.'
      );
    } finally {
      setLoading(false);
      setTaskToDelete(null);
    }
  };

  /**
   * Cancela a exclusão
   */
  const handleCancelDelete = () => {
    setDeleteModalVisible(false);
    setTaskToDelete(null);
  };

  /**
   * Renderiza cada item da lista
   */
  const renderTaskItem = ({ item }) => (
    <TaskItem
      task={item}
      onEdit={() => handleEditTask(item)}
      onDelete={() => handleDeleteRequest(item)}
    />
  );

  /**
   * Renderiza mensagem quando não há tarefas
   */
  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>📝</Text>
      <Text style={styles.emptyText}>Nenhuma tarefa cadastrada</Text>
      <Text style={styles.emptySubtext}>
        Toque no botão "+" para adicionar sua primeira tarefa
      </Text>
    </View>
  );

  /**
   * Renderiza o cabeçalho da lista
   */
  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Minhas Tarefas</Text>
      <Text style={styles.headerSubtitle}>
        {tasks.length} {tasks.length === 1 ? 'tarefa' : 'tarefas'}
      </Text>
    </View>
  );

  if (loading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text style={styles.loadingText}>Carregando tarefas...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        renderItem={renderTaskItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmptyList}
        contentContainerStyle={
          tasks.length === 0 ? styles.emptyListContainer : styles.listContainer
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#2196F3']}
            tintColor="#2196F3"
          />
        }
      />

      <TouchableOpacity style={styles.fab} onPress={handleAddTask}>
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>

      <DeleteModal
        visible={deleteModalVisible}
        taskTitle={taskToDelete?.title || ''}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  header: {
    padding: 16,
    paddingTop: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
  },
  listContainer: {
    paddingBottom: 80,
  },
  emptyListContainer: {
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingTop: 60,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  fabIcon: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
