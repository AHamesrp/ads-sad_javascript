import React, { useState, useCallback } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  StyleSheet, 
  Alert,
  ActivityIndicator,
  RefreshControl
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import StudyCard from '../components/StudyCard';
import { getStudies, deleteStudy } from '../services/api';

const HomeScreen = ({ navigation }) => {
  const [studies, setStudies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadStudies = async () => {
    try {
      const data = await getStudies();
      setStudies(data);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os estudos. Verifique se o servidor está rodando.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadStudies();
    }, [])
  );

  const handleRefresh = () => {
    setRefreshing(true);
    loadStudies();
  };

  const handleEdit = (study) => {
    navigation.navigate('StudyForm', { study });
  };

  const handleDelete = async (id) => {
    try {
      await deleteStudy(id);
      setStudies(studies.filter(s => s.id !== id));
      Alert.alert('Sucesso', 'Estudo excluído com sucesso!');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível excluir o estudo.');
    }
  };

  const handleAdd = () => {
    navigation.navigate('StudyForm', { study: null });
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#4A90D9" />
        <Text style={styles.loadingText}>Carregando estudos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>📚 Meus Estudos</Text>
        <Text style={styles.headerSubtitle}>{studies.length} registro(s)</Text>
      </View>

      {studies.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>📖</Text>
          <Text style={styles.emptyTitle}>Nenhum estudo cadastrado</Text>
          <Text style={styles.emptySubtitle}>
            Clique no botão abaixo para adicionar seu primeiro estudo!
          </Text>
        </View>
      ) : (
        <FlatList
          data={studies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <StudyCard 
              study={item} 
              onEdit={handleEdit} 
              onDelete={handleDelete} 
            />
          )}
          contentContainerStyle={styles.list}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={['#4A90D9']}
            />
          }
          showsVerticalScrollIndicator={false}
        />
      )}

      <TouchableOpacity style={styles.fab} onPress={handleAdd}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA'
  },
  header: {
    backgroundColor: '#4A90D9',
    padding: 20,
    paddingTop: 50
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF'
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.8,
    marginTop: 4
  },
  list: {
    padding: 16
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F7FA'
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#7F8C8D'
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 8
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#7F8C8D',
    textAlign: 'center',
    lineHeight: 20
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4A90D9',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8
  },
  fabText: {
    fontSize: 32,
    color: '#FFFFFF',
    fontWeight: 'bold'
  }
});

export default HomeScreen;
