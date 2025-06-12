const express = require('express');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const users = require('./index.js'); // Імпортуємо об'єкт users
const app = express();
app.use(express.json());


let upgrades = [
  { id: 1, name: "Click Accelerator", description: "speed of earning x10", price: 40000 },
  { id: 2, name: "Coin Multiplier", description: "ClickCoins per click x10", price: 50000 },
  { id: 3, name: "Power Tap", description: "ClickCoins per click x2", price: 20000 },
];

app.get('/upgrades', (req, res) => {
  res.json(upgrades);
});// Отримати один Upgrade

app.post('/upgrades', (req, res) => {
  const { name, description, price } = req.body;

  if (!name || !description || typeof price !== 'number' || price < 0) {
    return res.status(400).json({ error: "Дані не можуть бути дійсними" });
  }

  if (!name.trim() || !description.trim()) {
    return res.status(400).json({ error: "Ці поля не можна пропустити" });
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
// Додати новий Upgrade

app.put('/upgrades/:id', (req, res) => {
  const { name, description, price } = req.body;
  const upgrade = upgrades.find(u => u.id === parseInt(req.params.id));
// Оновити Upgrade
  
if (!upgrade) {
    return res.status(404).json({ error: "Upgrade не знайдено" });
  } // Перевірка на існування Upgrade

  if (!name || !description || typeof price !== 'number' || price < 0) {
    return res.status(400).json({ error: "Дані не можуть бути дійсними" });
  } // Перевірка на валідність даних

  // Отримати список усіх Upgrade
app.get('/upgrades/:id', (req, res) => {
  const upgrade = upgrades.find(u => u.id === parseInt(req.params.id));
  if (!upgrade) {
    return res.status(404).json({ error: "Upgrade не знайдено" });
  }
  res.json(upgrade);
});
// Отримати список усіх Upgrade

if (!name.trim() || !description.trim()) {
    return res.status(400).json({ error: "Ці поля не можна пропустити" });
  } //Перевірка на пусті поля

  upgrade.name = name;
  upgrade.description = description;
  upgrade.price = price;

  res.json(upgrade);
});

// Видалити Upgrade
app.delete('/upgrades/:id', (req, res) => {
  const upgradeIndex = upgrades.findIndex(u => u.id === parseInt(req.params.id));

  if (upgradeIndex === -1) {
    return res.status(404).json({ error: "Upgrade не знайдено" });
  }

  upgrades.splice(upgradeIndex, 1);
  res.status(204).send();
});

let users = []; // Масив для збереження користувачів

// Реєстрація
app.post('/sign-up', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Ці поля не можна пропустити" });
  }

  if (password.length < 8) {
    return res.status(400).json({ error: "Пароль має бути мінімум 8 символів" });
  }

  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return res.status(400).json({ error: "Такий email вже існує" });
  }

  const hashedPassword = await bcrypt.hash(password, 10); // Хешування пароля
  users.push({ email, password: hashedPassword });

  res.status(201).json({ message: "Реєстрація успішна" });
});

// Авторизація
app.post('/sign-in', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Ці поля не можна пропустити" });
  }

  const user = users.find(user => user.email === email);
  if (!user) {
    return res.status(401).json({ error: "Email або пароль неправильний" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ error: "Email або пароль неправильний" });
  }

  const token = crypto.randomBytes(16).toString('hex'); // Генерація токена
  res.status(200).json({ token });
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});