// src/meal-planner/data/meal-planner-db.ts

import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

async function openDB() {
  return open({
    filename: './src/meal-planner/data/mealplanner.db',
    driver: sqlite3.Database,
  });
}

export async function initializeDB() {
  try {
    console.log('Initializing database...');
    const db = await openDB();
    await db.exec(`
      CREATE TABLE IF NOT EXISTS ingredients (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        storage TEXT NOT NULL,
        tags TEXT
      )
    `);
    console.log('Database initialized.');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}


// Add a new ingredient to the database
export async function addIngredient(name: string, storage: string, tags: string[]) {
  const db = await openDB();
  const tagsString = tags.join(',');
  await db.run(
    'INSERT INTO ingredients (name, storage, tags) VALUES (?, ?, ?)',
    name, storage, tagsString
  );
}

// Get all ingredients from the database
export async function getIngredients() {
  const db = await openDB();
  return db.all('SELECT * FROM ingredients');
}
