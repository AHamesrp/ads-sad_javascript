import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { createTask, updateTask } from '../services/api';

/**
 * Tela do formulário para criar e editar tarefas
 */
const TaskFormScreen = ({ route, navigation }) => {
  const { mode, task } = route.params;
  const isEditMode = mode === 'edit';

  // Estados do formulário
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [priority, setPriority] = useState(task?.priority || 'media');
  const [completed, setCompleted] = useState(task?.completed || false);
  const [loading, setLoading] = useState(false);

  // Validação dos campos
  const validateForm = () => {
    if (!title.trim()) {
      Alert.alert('Atenção', 'O título da tarefa é obrigatório.');
      return false;
    }

    if (title.trim().length < 3) {
      Alert.alert('Atenção', 'O título deve ter pelo menos 3 caracteres.');
      return false;
    }

    return true;
  };

  /**
   * Salva a tarefa (cria ou atualiza)
   */
  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      const taskData = {
        title: title.trim(),
        description: description.trim(),
        priority,
        completed,
        createdAt: task?.createdAt || new Date().toISOString(),
      };

      if (isEditMode) {
        await updateTask(task.id, taskData);
        Alert.alert('Sucesso', 'Tarefa atualizada com sucesso!');
      } else {
        await createTask(taskData);
        Alert.alert('Sucesso', 'Tarefa criada com sucesso!');
      }

      // Volta para a tela anterior
      navigation.goBack();
    } catch (error) {
      Alert.alert(
        'Erro',
        isEditMode
          ? 'Não foi possível atualizar a tarefa. Tente novamente.'
          : 'Não foi possível criar a tarefa. Tente novamente.'
      );
    } finally {
      setLoading(false);
    }
  };

  /**
   * Renderiza os botões de prioridade
   */
  const renderPriorityButton = (value, label, color) => (
    <TouchableOpacity
      style={[
        styles.priorityButton,
        priority === value && { backgroundColor: color, borderColor: color },
      ]}
      onPress={() => setPriority(value)}
    >
      <Text
        style={[
          styles.priorityButtonText,
          priority === value && styles.priorityButtonTextActive,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>
            {isEditMode ? 'Editar Tarefa' : 'Nova Tarefa'}
          </Text>
        </View>

        <View style={styles.form}>
          {/* Campo Título */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              Título <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Digite o título da tarefa"
              value={title}
              onChangeText={setTitle}
              maxLength={100}
            />
            <Text style={styles.charCount}>{title.length}/100</Text>
          </View>

          {/* Campo Descrição */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Descrição</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Digite a descrição da tarefa (opcional)"
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
              maxLength={500}
              textAlignVertical="top"
            />
            <Text style={styles.charCount}>{description.length}/500</Text>
          </View>

          {/* Campo Prioridade */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Prioridade</Text>
            <View style={styles.priorityContainer}>
              {renderPriorityButton('baixa', 'Baixa', '#4caf50')}
              {renderPriorityButton('media', 'Média', '#ff9800')}
              {renderPriorityButton('alta', 'Alta', '#f44336')}
            </View>
          </View>

          {/* Campo Status (apenas no modo edição) */}
          {isEditMode && (
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Status</Text>
              <View style={styles.statusContainer}>
                <TouchableOpacity
                  style={[
                    styles.statusButton,
                    !completed && styles.statusButtonActive,
                  ]}
                  onPress={() => setCompleted(false)}
                >
                  <Text
                    style={[
                      styles.statusButtonText,
                      !completed && styles.statusButtonTextActive,
                    ]}
                  >
                    ⏳ Pendente
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.statusButton,
                    completed && styles.statusButtonActive,
                  ]}
                  onPress={() => setCompleted(true)}
                >
                  <Text
                    style={[
                      styles.statusButtonText,
                      completed && styles.statusButtonTextActive,
                    ]}
                  >
                    ✅ Concluída
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Botões de ação fixos na parte inferior */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={() => navigation.goBack()}
          disabled={loading}
        >
          <Text style={styles.cancelButtonText}>Cancelar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.saveButton, loading && styles.buttonDisabled]}
          onPress={handleSave}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.saveButtonText}>
              {isEditMode ? 'Atualizar' : 'Criar'}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    backgroundColor: '#2196F3',
    padding: 20,
    paddingTop: 40,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  form: {
    padding: 16,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  required: {
    color: '#f44336',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
  },
  textArea: {
    height: 100,
    paddingTop: 12,
  },
  charCount: {
    fontSize: 12,
    color: '#999',
    textAlign: 'right',
    marginTop: 4,
  },
  priorityContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  priorityButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  priorityButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  priorityButtonTextActive: {
    color: '#fff',
  },
  statusContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  statusButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  statusButtonActive: {
    backgroundColor: '#2196F3',
    borderColor: '#2196F3',
  },
  statusButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  statusButtonTextActive: {
    color: '#fff',
  },
  footer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: '#2196F3',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
});

export default TaskFormScreen;
