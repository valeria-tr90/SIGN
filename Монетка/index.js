const express = require('express');

const app = express();
app.use(express.json()); 

let upgrades = [
  { id: 1, name: "Click Accelerator", description: "speed of earning x10", price: 3000},
  { id: 2, name: "Coin Multiplier", description: "ClickCoins per click x10", price: 4000 },
  { id: 3, name: "Power Tap", description: "ClickCoins per click x2", price: 1000 },
];


app.get('/upgrades', (req, res) => {
  res.json(upgrades);
}); // Отримання списку усіх апгрейдів


app.get('/upgrades/:id', (req, res) => {
  const upgrade = upgrades.find(u => u.id === parseInt(req.params.id));
  if (!upgrade) {
    return res.status(404).json({ error: "Апгрейд не знайдено" });
  }
  res.json(upgrade);
}); // Отримання одного апгрейду


app.post('/upgrades', (req, res) => {
  const { name, description, price } = req.body; // Додаємо новий апгрейд

  if (!name || !description || typeof price !== 'number' || price < 0) {
    return res.status(400).json({ error: "Недійсні вхідні дані" });
  }

  if (!name.trim() || !description.trim()) {
    return res.status(400).json({ error: "Назва та опис не можуть бути пустими" });
  }

  const newUpgrade = {
    id: upgrades.length ? upgrades[upgrades.length - 1].id + 1 : 1,
    name,
    description,
    price,
  };

  upgrades.push(newUpgrade);
  res.status(201).json(newUpgrade);
});


app.put('/upgrades/:id', (req, res) => {
  const { name, description, price } = req.body;
  const upgrade = upgrades.find(u => u.id === parseInt(req.params.id)); // Оновити апгрейд

  // Перевірка на існування апгрейду
  if (!upgrade) {
    return res.status(404).json({ error: "Апгрейд не знайдено" });
  } 

  // Перевірка на валідність даних
  if (!name || !description || typeof price !== 'number' || price < 0) {
    return res.status(400).json({ error: "Недійсні вхідні дані" });
  } 

//Перевірка на пусті поля  
  if (!name.trim() || !description.trim()) {
    return res.status(400).json({ error: "Назва та опис не можуть бути пустими" });
  } 

  upgrade.name = name;
  upgrade.description = description;
  upgrade.price = price;

  res.json(upgrade);
});


app.delete('/upgrades/:id', (req, res) => {
  const upgradeIndex = upgrades.findIndex(u => u.id === parseInt(req.params.id));// Видалити апгрейд

  if (upgradeIndex === -1) {
    return res.status(404).json({ error: "Апгрейд не знайдено" });
  }

  upgrades.splice(upgradeIndex, 1);
  res.status(204).send();
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
}); // Запуск сервера