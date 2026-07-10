import React, { useContext, useState } from 'react';
import { View,Text,TextInput,TouchableOpacity,StyleSheet,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

import { TaskContext } from '../context/TaskContext';
import colors from '../theme/colors';

//Si esta vacio te lo da vacio si editas no, el inicio es solo para editar si ya esta
export default function TaskFormScreen({ navigation, route }: any) {
  const { isEditing, task } = route.params || {};
  const { agregarTarea, editarTarea } = useContext(TaskContext);

  const [titulo, setTitulo] = useState(task?.titulo || '');
  const [descripcion, setDescripcion] = useState(task?.descripcion || '');

  const [errorTitulo, setErrorTitulo] = useState('');
  const [errorDescripcion, setErrorDescripcion] = useState('');

  //aqui guarda, tenemos validacion, tambien verifica si estamos editando o añadiendo
  function guardar() {
    setErrorTitulo('');
    setErrorDescripcion('');

    let valido = true;

    if (titulo.trim() === '') {
      setErrorTitulo('Ingrese un titulo');
      valido = false;
    }

    if (descripcion.trim() === '') {
      setErrorDescripcion('Ingrese una descripcion');
      valido = false;
    }

    if (!valido) return;

    const nuevaTarea = {
      id: task?.id || Date.now().toString(),
      titulo,
      descripcion,
    };

    if (isEditing) {
      editarTarea(nuevaTarea);
    } else {
      agregarTarea(nuevaTarea);
    }

    navigation.goBack();
  }

  //Es el diseno de la pagina, tiene validaciones si en caso intentas apretar el boton sin colocar 
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color={colors.primary} />
        </TouchableOpacity>

        <Text style={styles.titulo}>
          {isEditing ? 'Editar tarea' : 'Nueva tarea'}
        </Text>

        <View style={{ width: 24 }} />
      </View>

      <View style={styles.formulario}>
        <Text style={styles.label}>Titulo</Text>

        <TextInput
          style={styles.input}
          placeholder="Escribe un titulo"
          value={titulo}
          onChangeText={setTitulo}
        />

        {errorTitulo !== '' && (
          <Text style={styles.error}>{errorTitulo}</Text>
        )}

        <Text style={styles.label}>Descripción</Text>

        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Escribe una descripción"
          value={descripcion}
          onChangeText={setDescripcion}
          multiline
        />

        {errorDescripcion !== '' && (
          <Text style={styles.error}>{errorDescripcion}</Text>
        )}
      </View>

      <TouchableOpacity style={styles.boton} onPress={guardar}>
        <Text style={styles.textoBoton}>
          {isEditing ? 'Guardar cambios' : 'Crear tarea'}
        </Text>
      </TouchableOpacity>
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
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.black,
  },

  formulario: {
    flex: 1,
    paddingHorizontal: 20,
  },

  label: {
    marginTop: 15,
    marginBottom: 5,
    color: colors.gray,
    fontSize: 15,
  },

  input: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
  },

  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },

  error: {
    color: colors.danger,
    marginTop: 5,
  },

  boton: {
    backgroundColor: colors.primary,
    margin: 20,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },

  textoBoton: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});