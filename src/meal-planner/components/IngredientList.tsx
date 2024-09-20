// src/meal-planner/components/IngredientList.tsx

import styles from "../styles/MealPlannerPage.module.css";
import { useState, useEffect } from 'react';
import { addIngredient, getIngredients } from '../data/MealPlannerDatabase'; // Import database functions

type Ingredient = {
  id: number;
  name: string;
  storage: string;
  tags: string;
};

export default function IngredientList() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [newIngredient, setNewIngredient] = useState('');
  const [storage, setStorage] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    async function fetchIngredients() {
      try {
        console.log('Fetching ingredients...');
        const ingredientsFromDB = await getIngredients();
        console.log('Ingredients fetched:', ingredientsFromDB);
        setIngredients(ingredientsFromDB.map((item: any) => ({
          id: item.id,
          name: item.name,
          storage: item.storage,
          tags: item.tags,
        })));
      } catch (error) {
        console.error('Error fetching ingredients:', error);
      }
    }
    fetchIngredients();
  }, []);
  
  const handleAddIngredient = async () => {
    if (!newIngredient || !storage) return;
    const tagsString = tags.join(',');
  
    try {
      // Add ingredient to the database
      await addIngredient(newIngredient, storage, tags);
  
      // Update state with new ingredient
      setIngredients([
        ...ingredients,
        { id: Date.now(), name: newIngredient, storage, tags: tagsString }
      ]);
  
      // Clear form fields
      setNewIngredient('');
      setStorage('');
      setTags([]);
    } catch (error) {
      console.error('Error adding ingredient:', error);
    }
  };
  

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Meal Planner</h1>
      <div className={styles.form}>
        <input
          type="text"
          placeholder="Enter ingredient"
          value={newIngredient}
          onChange={(e) => setNewIngredient(e.target.value)}
          className={styles.input}
        />
        <select
          value={storage}
          onChange={(e) => setStorage(e.target.value)}
          className={styles.select}
        >
          <option value="">Select Storage</option>
          <option value="freezer">Freezer</option>
          <option value="fridge">Fridge</option>
          <option value="cabinet">Cabinet</option>
        </select>

        <input
          type="text"
          placeholder="Add tags (comma-separated)"
          onChange={(e) => setTags(e.target.value.split(','))}
          className={styles.input}
        />

        <button
          onClick={handleAddIngredient}
          className={styles.button}
        >
          Add Ingredient
        </button>
      </div>

      <ul className={styles.list}>
        {ingredients.map((ingredient) => (
          <li key={ingredient.id} className={styles.listItem}>
            {ingredient.name} (Stored in: {ingredient.storage})
            <br /> Tags: {ingredient.tags.split(',').join(', ')}
          </li>
        ))}
      </ul>
    </div>
  );
}
