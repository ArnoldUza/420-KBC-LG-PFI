import { Stack } from 'expo-router';
import { PanierProvider } from '../context/panierContext';

import { useEffect } from 'react';

import { initDB } from './bdSQLite';

export default function RootLayout() {

  useEffect(() => {

    initDB();

  }, []);

  return (
    <PanierProvider>
      <Stack />
    </PanierProvider>
  );
}