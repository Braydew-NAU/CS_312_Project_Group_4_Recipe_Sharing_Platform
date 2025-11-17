// seedRecipes.js
const pool = require('./db');

const recipes = [
  {
    title: 'Crispy Chicken Wings',
    image_url: '/images/chicken_wings.jpg',
    ingredients: 'Chicken wings\nSalt\nPepper\nGarlic powder\nOil',
    instructions: 'Season wings.\nBake or fry until crispy.\nServe hot.',
    cuisine: 'American',
    cooking_time: 40,
    difficulty: 'Easy',
    meal_type: 'Dinner'
  },
  {
    title: 'Creamy Mac & Cheese',
    image_url: '/images/mac_cheese.jpg',
    ingredients: 'Macaroni\nCheddar cheese\nMilk\nButter\nFlour\nSalt',
    instructions: 'Cook pasta.\nMake cheese sauce.\nCombine and bake.',
    cuisine: 'American',
    cooking_time: 35,
    difficulty: 'Easy',
    meal_type: 'Dinner'
  }
];

async function seed() {
  try {
    for (const r of recipes) {
      await pool.query(
        `INSERT INTO recipes
         (user_id, title, image_url, ingredients, instructions, cuisine, cooking_time, difficulty, meal_type)
         VALUES (NULL, $1,$2,$3,$4,$5,$6,$7,$8)`,
        [
          r.title,
          r.image_url,
          r.ingredients,
          r.instructions,
          r.cuisine,
          r.cooking_time,
          r.difficulty,
          r.meal_type
        ]
      );
    }
    console.log('Seeded recipes!');
  } catch (err) {
    console.error('Seeding error:', err);
  } finally {
    process.exit();
  }
}

seed();
