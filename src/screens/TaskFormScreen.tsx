import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

import { TaskContext } from '../context/TaskContext';
import { Task } from '../models/Task';
import colors from '../theme/colors';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'TaskForm'
>;

export default function TaskFormScreen({
  navigation,
  route,
}: Props) {
  const { isEditing, task } = route.params || {};

  const taskContext = useContext(TaskContext);

  if (!taskContext) {
    return null;
  }

  const { agregarTarea, editarTarea } = taskContext;

  const [titulo, setTitulo] = useState(task?.titulo || '');
  const [descripcion, setDescripcion] = useState(task?.descripcion || '');

  const [errorTitulo, setErrorTitulo] = useState('');
  const [errorDescripcion, setErrorDescripcion] = useState('');

  function guardar() {
    setErrorTitulo('');
    setErrorDescripcion('');

    let valido = true;

    if (titulo.trim() === '') {
      setErrorTitulo('Ingrese un título');
      valido = false;
    }

    if (descripcion.trim() === '') {
      setErrorDescripcion('Ingrese una descripción');
      valido = false;
    }

    if (!valido) return;

    const nuevaTarea: Task = {
      id: task?.id || Date.now().toString(),
      titulo,
      descripcion,
    };

    if (isEditing) {
      editarTarea(nuevaTarea);
    } else {
      agregarTarea(nuevaTarea);
    }

    Keyboard.dismiss();
    navigation.goBack();
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
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
            <Text style={styles.label}>Título</Text>

            <TextInput
              style={styles.input}
              placeholder="Escribe un título"
              value={titulo}
              onChangeText={(texto) => {
                setTitulo(texto);
                if (errorTitulo) {
                  setErrorTitulo('');
                }
              }}
            />

            {errorTitulo !== '' && (
              <Text style={styles.error}>{errorTitulo}</Text>
            )}

            <Text style={styles.label}>Descripción</Text>

            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Escribe una descripción"
              value={descripcion}
              onChangeText={(texto) => {
                setDescripcion(texto);
                if (errorDescripcion) {
                  setErrorDescripcion('');
                }
              }}
              multiline
            />

            {errorDescripcion !== '' && (
              <Text style={styles.error}>{errorDescripcion}</Text>
            )}
          </View>

          <TouchableOpacity
            style={styles.boton}
            onPress={guardar}
          >
            <Text style={styles.textoBoton}>
              {isEditing ? 'Guardar cambios' : 'Crear tarea'}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.black,
  },

  formulario: {
    flex: 1,
    paddingHorizontal: 20,
  },

  label: {
    marginTop: 18,
    marginBottom: 6,
    color: colors.gray,
    fontSize: 15,
    fontWeight: '600',
  },

  input: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 14,
    padding: 15,
    fontSize: 16,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 3,
  },

  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },

  error: {
    color: colors.danger,
    marginTop: 6,
    marginLeft: 4,
  },

  boton: {
    backgroundColor: colors.primary,
    margin: 20,
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.18,
    shadowRadius: 5,
    elevation: 6,
  },

  textoBoton: {
    color: colors.white,
    fontSize: 17,
    fontWeight: 'bold',
  },
});