import { Stack } from 'expo-router'
import { PanierProvider } from '../context/panierContext'   

export default function RootLayout ()
{
 return (
    <PanierProvider>
        <Stack/>
    </PanierProvider>
 )
}