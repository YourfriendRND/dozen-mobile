import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const RoutineScheduleScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Routine Schedule</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },
});
