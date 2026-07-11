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
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import {
  RootStackParamList,
  BottomTabParamList,
} from '../types/navigation';

import TaskCard from '../components/TaskCard';
import { TaskContext } from '../context/TaskContext';
import { Task } from '../models/Task';
import colors from '../theme/colors';

type Props = CompositeScreenProps<
  BottomTabScreenProps<BottomTabParamList, 'Tareas'>,
  NativeStackScreenProps<RootStackParamList>
>;

export default function HomeScreen({ navigation }: Props) {
  const taskContext = useContext(TaskContext);

  if (!taskContext) {
    return null;
  }

  const { tareas, eliminarTarea } = taskContext;

  function confirmarEliminar(id: string) {
    Alert.alert(
      'Eliminar tarea',
      '¿Deseas eliminar esta tarea?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
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
            navigation.navigate('TaskForm', {
              isEditing: false,
            })
          }
        >
          <Feather name="plus" size={28} color={colors.white} />
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
            onView={() =>
              navigation.navigate('TaskDetail', {
                task: item,
              })
            }
          />
        )}
        contentContainerStyle={styles.lista}
        ListEmptyComponent={
          <View style={styles.vacio}>
            <Feather
              name="clipboard"
              size={70}
              color={colors.lightGray}
            />

            <Text style={styles.tituloVacio}>
              No tienes tareas
            </Text>

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
    fontSize: 30,
    fontWeight: 'bold',
    color: colors.black,
  },

  boton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.18,
    shadowRadius: 5,
    elevation: 8,
  },

   lista: {
    paddingHorizontal: 20,
    paddingBottom: 70,
    flexGrow: 1,
    },

  vacio: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    marginBottom: 80,
  },

  tituloVacio: {
    marginTop: 20,
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.gray,
  },

  textoVacio: {
    marginTop: 10,
    fontSize: 16,
    color: colors.gray,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
});