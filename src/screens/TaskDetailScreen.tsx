import React from 'react';
import {
  View,
 Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

import colors from '../theme/colors';

export default function TaskDetailScreen({ navigation, route }: any) {
  const { task } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather
            name="arrow-left"
            size={24}
            color={colors.primary}
          />
        </TouchableOpacity>

        <Text style={styles.tituloHeader}>
          Detalle de la tarea
        </Text>

        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.contenido}>
        <Text style={styles.titulo}>
          {task.titulo}
        </Text>

        <Text style={styles.descripcion}>
          {task.descripcion}
        </Text>
      </ScrollView>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },

  tituloHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.black,
  },

  contenido: {
    padding: 20,
  },

  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: 20,
  },

  descripcion: {
    fontSize: 17,
    color: colors.gray,
    lineHeight: 28,
  },
});