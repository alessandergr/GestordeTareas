import React, { useContext } from 'react';
import { View,Text,StyleSheet,FlatList,TouchableOpacity,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

import TaskCard from '../components/TaskCard';
import { TaskContext } from '../context/TaskContext';
import colors from '../utils/colors';

//Navegador de paginas
export default function HomeScreen({ navigation }: any) {
  //trae el taskContext
  const { tareas, eliminarTarea } = useContext(TaskContext);

  //Nuestra pantalla, taskform nos lleva a donde agregamos una tarea
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
  //Estas son nuestras tareas practicamente y tambien agregando la funcion a sus opciones//
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
            onDelete={() => eliminarTarea(item.id)}
          />
        )}
        contentContainerStyle={styles.lista}
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
  },
});