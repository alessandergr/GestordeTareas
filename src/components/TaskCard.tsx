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
        <TouchableOpacity style={styles.icono} onPress={onEdit}>
          <Feather name="edit-2" size={18} color={colors.primary} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.icono} onPress={onDelete}>
          <Feather name="trash-2" size={18} color={colors.danger} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 18,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 6,
  },

  info: {
    flex: 1,
    marginRight: 12,
  },

  titulo: {
    fontSize: 17,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: 6,
  },

  descripcion: {
    fontSize: 14,
    color: colors.gray,
    lineHeight: 20,
  },

  verMas: {
    marginTop: 8,
    color: colors.primary,
    fontWeight: '600',
  },

  botones: {
    gap: 10,
  },

  icono: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
});