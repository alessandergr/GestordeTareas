import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import colors from '../theme/colors';

interface Props {
  titulo: string;
  descripcion: string;
  onEdit: () => void;
  onDelete: () => void;
}

export default function TaskCard({
  titulo,
  descripcion,
  onEdit,
  onDelete,
}: Props) {
  const [expandido, setExpandido] = useState(false);

  return (
    <View style={styles.card}>
      <View style={styles.info}>
        <Text style={styles.titulo}>{titulo}</Text>

        <Text
          style={styles.descripcion}
          numberOfLines={expandido ? undefined : 3}
        >
          {descripcion}
        </Text>

        {descripcion.length > 80 && (
          <TouchableOpacity onPress={() => setExpandido(!expandido)}>
            <Text style={styles.verMas}>
              {expandido ? 'Ver menos' : 'Ver más'}
            </Text>
          </TouchableOpacity>
        )}
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

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',

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

  verMas: {
    marginTop: 5,
    color: colors.primary,
    fontWeight: '600',
  },

  botones: {
    flexDirection: 'row',
    gap: 15,
    marginTop: 5,
  },
});