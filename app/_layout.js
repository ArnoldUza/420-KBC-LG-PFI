import { Stack } from 'expo-router';
import { PanierProvider } from '../context/panierContext';
import { CompteProvider } from '../context/compteContext';

import { useEffect } from 'react';

import { initDB } from './bdSQLite';

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
        <CompteProvider>

            <PanierProvider>

                <Stack />

            </PanierProvider>

        </CompteProvider>
    );
}