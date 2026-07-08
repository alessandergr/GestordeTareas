import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import colors from '../utils/colors';

// Datos que recibira la tarjeta :0//
interface Props {
  titulo: string;
  descripcion: string;
  onEdit: () => void;
  onDelete: () => void;
}
// Datos que necesitara nuestra tarjeta, son las tarjetas que salen en home//
export default function TaskCard({
  titulo,
  descripcion,
  onEdit,
  onDelete,
}: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.info}>
        <Text style={styles.titulo}>{titulo}</Text>
        <Text style={styles.descripcion}>{descripcion}</Text>
      </View>

      <View style={styles.botones}>
        <TouchableOpacity onPress={onEdit}>
          <Feather name="edit-2" size={20} color={colors.primary} />
        </TouchableOpacity>

        <TouchableOpacity onPress={onDelete}>
          <Feather name="trash-2" size={20} color={colors.danger} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
//diseno//
const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },

  info: {
    flex: 1,
    marginRight: 10,
  },

  titulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: 5,
  },

  descripcion: {
    fontSize: 14,
    color: colors.gray,
  },

  botones: {
    flexDirection: 'row',
    gap: 15,
  },
});