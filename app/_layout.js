import { Stack } from 'expo-router';
import { PanierProvider } from '../context/panierContext';

import { useEffect } from 'react';

import { initDB } from './bdSQLite';
import { LangueProvider } from '../context/langueContext';

export default function RootLayout() {
    useEffect(() => {

        async function setup() {

            try {

                await initDB();

                console.log("DB détectée");

            } catch (e) {

                console.log("ERREUR DB");

                console.log(e);
            }
        }

        setup();

    }, []);

    return (
        <PanierProvider>
            <LangueProvider>
                <Stack />
            </LangueProvider>
        </PanierProvider>

   
    );
}