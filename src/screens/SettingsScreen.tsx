import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../utils/colors';

//Darle funcion a settings no es importante por ahora
export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Ajustes</Text>
      <Text style={styles.texto}>
        Proximamente podras configurar la aplicacion.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: 20,
  },

  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: 10,
  },

  texto: {
    fontSize: 16,
    color: colors.gray,
    textAlign: 'center',
  },
});