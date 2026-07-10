import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

import TaskCard from '../components/TaskCard';
import { TaskContext } from '../context/TaskContext';
import colors from '../theme/colors';

export default function HomeScreen({ navigation }: any) {
  const { tareas, eliminarTarea } = useContext(TaskContext);

  function confirmarEliminar(id: string) {
    Alert.alert(
      'Eliminar tarea',
      '¿Deseas eliminar esta tarea?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => eliminarTarea(id),
        },
      ]
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>Mis Tareas</Text>

        <TouchableOpacity
          style={styles.boton}
          onPress={() =>
            navigation.navigate('TaskForm', { isEditing: false })
          }
        >
          <Feather name="plus" size={24} color={colors.white} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={tareas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskCard
            titulo={item.titulo}
            descripcion={item.descripcion}
            onEdit={() =>
              navigation.navigate('TaskForm', {
                isEditing: true,
                task: item,
              })
            }
            onDelete={() => confirmarEliminar(item.id)}
          />
        )}
        contentContainerStyle={styles.lista}
        ListEmptyComponent={
          <View style={styles.vacio}>
            <Feather name="clipboard" size={70} color={colors.lightGray} />
            <Text style={styles.tituloVacio}>No tienes tareas</Text>
            <Text style={styles.textoVacio}>
              ¡Comienza creando tu primera tarea!
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },

  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.black,
  },

  boton: {
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },

  lista: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    flexGrow: 1,
  },

  vacio: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 120,
  },

  tituloVacio: {
    marginTop: 15,
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.gray,
  },

  textoVacio: {
    marginTop: 8,
    fontSize: 15,
    color: colors.gray,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
});