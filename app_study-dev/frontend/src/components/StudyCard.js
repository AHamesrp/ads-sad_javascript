import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

// Cores por status
const STATUS_COLORS = {
  not_learned: '#FF6B6B',
  learned_not_mastered: '#FFE66D',
  mastered: '#4ECDC4'
};

const StudyCard = ({ study, onEdit, onDelete }) => {
  const handleDelete = () => {
    Alert.alert(
      'Confirmar Exclusão',
      `Deseja realmente excluir "${study.title}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Excluir', style: 'destructive', onPress: () => onDelete(study.id) }
      ]
    );
  };

  return (
    <View style={[styles.card, { borderLeftColor: STATUS_COLORS[study.status] }]}>
      <View style={styles.header}>
        <Text style={styles.title} numberOfLines={1}>{study.title}</Text>
        <View style={[styles.statusBadge, { backgroundColor: STATUS_COLORS[study.status] }]}>
          <Text style={styles.statusText}>{study.statusLabel}</Text>
        </View>
      </View>
      
      <Text style={styles.content} numberOfLines={3}>{study.content}</Text>
      
      <View style={styles.actions}>
        <TouchableOpacity style={styles.editButton} onPress={() => onEdit(study)}>
          <Text style={styles.editButtonText}>✏️ Editar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.deleteButtonText}>🗑️ Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    flex: 1,
    marginRight: 8
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#2C3E50'
  },
  content: {
    fontSize: 14,
    color: '#7F8C8D',
    lineHeight: 20,
    marginBottom: 12
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12
  },
  editButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#4A90D9',
    borderRadius: 8
  },
  editButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14
  },
  deleteButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#E74C3C',
    borderRadius: 8
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14
  }
});

export default StudyCard;
