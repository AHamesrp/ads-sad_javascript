import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { createStudy, updateStudy, STATUS_OPTIONS } from '../services/api';

const StudyFormScreen = ({ navigation, route }) => {
  const existingStudy = route.params?.study;
  const isEditing = !!existingStudy;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState('not_learned');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (existingStudy) {
      setTitle(existingStudy.title);
      setContent(existingStudy.content);
      setStatus(existingStudy.status);
    }
  }, [existingStudy]);

  const handleSubmit = async () => {
    // Validações
    if (!title.trim()) {
      Alert.alert('Atenção', 'Por favor, informe o título do estudo.');
      return;
    }
    if (!content.trim()) {
      Alert.alert('Atenção', 'Por favor, informe o conteúdo/descrição do estudo.');
      return;
    }

    setLoading(true);

    try {
      const studyData = {
        title: title.trim(),
        content: content.trim(),
        status
      };

      if (isEditing) {
        await updateStudy(existingStudy.id, studyData);
        Alert.alert('Sucesso', 'Estudo atualizado com sucesso!');
      } else {
        await createStudy(studyData);
        Alert.alert('Sucesso', 'Estudo cadastrado com sucesso!');
      }
      
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', error.message || 'Não foi possível salvar o estudo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>
            {isEditing ? '✏️ Editar Estudo' : '📝 Novo Estudo'}
          </Text>
          <Text style={styles.headerSubtitle}>
            {isEditing ? 'Atualize as informações do seu estudo' : 'Preencha os campos abaixo'}
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Título do Estudo *</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Introdução ao React Native"
              placeholderTextColor="#B0BEC5"
              value={title}
              onChangeText={setTitle}
              maxLength={100}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Conteúdo / Descrição *</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Descreva o que você está estudando..."
              placeholderTextColor="#B0BEC5"
              value={content}
              onChangeText={setContent}
              multiline
              numberOfLines={5}
              textAlignVertical="top"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Status do Aprendizado *</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={status}
                onValueChange={setStatus}
                style={styles.picker}
              >
                {STATUS_OPTIONS.map(option => (
                  <Picker.Item 
                    key={option.value} 
                    label={option.label} 
                    value={option.value} 
                  />
                ))}
              </Picker>
            </View>
          </View>

          <View style={styles.statusLegend}>
            <Text style={styles.legendTitle}>Legenda de Status:</Text>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#FF6B6B' }]} />
              <Text style={styles.legendText}>Ainda não aprendi</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#FFE66D' }]} />
              <Text style={styles.legendText}>Aprendi, mas não domino</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#4ECDC4' }]} />
              <Text style={styles.legendText}>Conteúdo dominado</Text>
            </View>
          </View>

          <View style={styles.buttons}>
            <TouchableOpacity 
              style={styles.cancelButton} 
              onPress={() => navigation.goBack()}
              disabled={loading}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.submitButton, loading && styles.submitButtonDisabled]} 
              onPress={handleSubmit}
              disabled={loading}
            >
              <Text style={styles.submitButtonText}>
                {loading ? 'Salvando...' : (isEditing ? 'Atualizar' : 'Cadastrar')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA'
  },
  scrollView: {
    flex: 1
  },
  header: {
    backgroundColor: '#4A90D9',
    padding: 20,
    paddingTop: 50
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF'
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.8,
    marginTop: 4
  },
  form: {
    padding: 20
  },
  inputGroup: {
    marginBottom: 20
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 8
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#2C3E50',
    borderWidth: 1,
    borderColor: '#E0E6ED'
  },
  textArea: {
    height: 120,
    paddingTop: 16
  },
  pickerContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E6ED',
    overflow: 'hidden'
  },
  picker: {
    height: 50
  },
  statusLegend: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24
  },
  legendTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 12
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 10
  },
  legendText: {
    fontSize: 14,
    color: '#7F8C8D'
  },
  buttons: {
    flexDirection: 'row',
    gap: 12
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: '#E0E6ED',
    alignItems: 'center'
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#7F8C8D'
  },
  submitButton: {
    flex: 2,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: '#4A90D9',
    alignItems: 'center'
  },
  submitButtonDisabled: {
    opacity: 0.6
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF'
  }
});

export default StudyFormScreen;
