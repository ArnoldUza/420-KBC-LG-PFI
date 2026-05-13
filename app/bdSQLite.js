import {useSQLiteContext, SQLiteProvider} from "expo-sqlite";
import * as SQLite from 'expo-sqlite';
import produits from './(tabs)/produits.json';

const dbPromise = SQLite.openDatabaseAsync('laBulle.db');

export async function initDB() {
  const db = await dbPromise;

  await db.execAsync(`

    CREATE TABLE IF NOT EXISTS produits (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nom TEXT,
      description TEXT,
      prix REAL,
      image TEXT
    );

    CREATE TABLE IF NOT EXISTS clients (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nom TEXT UNIQUE,
      mdp TEXT,
      admin INTEGER,
      adresse TEXT,
      langue TEXT
    );

  `);

  // PRODUITS

  const totalProduits = await db.getFirstAsync(
    "SELECT COUNT(*) as total FROM produits"
  );

  if (totalProduits.total === 0) {

    for (const produit of produits) {

      await db.runAsync(
        `INSERT INTO produits
        (nom, description, prix, image)
        VALUES (?, ?, ?, ?)`,
        [
          produit.nom,
          produit.description,
          produit.prix,
          produit.image
        ]
      );
    }
  }

  // COMPTES TEST

  const totalClients = await db.getFirstAsync(
    "SELECT COUNT(*) as total FROM clients"
  );

  if (totalClients.total === 0) {

    // admin
    await ajouterCompte(
      "admin",
      "admin123",
      1,
      "Laval",
      "fr"
    );

    // utilisateur normal
    await ajouterCompte(
      "client",
      "client123",
      0,
      "Montréal",
      "fr"
    );
  }
}

////////////////////////////////////////////////////////
// PRODUITS
////////////////////////////////////////////////////////

export async function getProduits() {
  const db = await dbPromise;

  return await db.getAllAsync(
    "SELECT * FROM produits"
  );
}

export async function ajouterProduit(
  nom,
  description,
  prix,
  image
) {
  const db = await dbPromise;

  await db.runAsync(
    `INSERT INTO produits
    (nom, description, prix, image)
    VALUES (?, ?, ?, ?)`,
    [nom, description, prix, image]
  );
}

export async function supprimerProduit(id) {
  const db = await dbPromise;

  await db.runAsync(
    "DELETE FROM produits WHERE id = ?",
    [id]
  );
}

////////////////////////////////////////////////////////
// CLIENTS
////////////////////////////////////////////////////////

export async function ajouterCompte(
  nom,
  mdp,
  admin,
  adresse,
  langue
) {
  const db = await dbPromise;

  await db.runAsync(
    `INSERT INTO clients
    (nom, mdp, admin, adresse, langue)
    VALUES (?, ?, ?, ?, ?)`,
    [
      nom,
      mdp,
      admin,
      adresse,
      langue
    ]
  );
}

export async function connecterCompte(
  nom,
  mdp
) {
  const db = await dbPromise;

  return await db.getFirstAsync(
    `SELECT * FROM clients
    WHERE nom = ?
    AND mdp = ?`,
    [nom, mdp]
  );
}