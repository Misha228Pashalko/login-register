const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 3000;
const USERS_FILE = path.join(__dirname, 'users.json');

// Ініціалізація файлу користувачів, якщо він не існує
if (!fs.existsSync(USERS_FILE)) {
  fs.writeFileSync(USERS_FILE, JSON.stringify([]));
}

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Маршрути
app.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const users = JSON.parse(fs.readFileSync(USERS_FILE));

    // Перевірка на існуючого користувача
    if (users.some(user => user.email === email)) {
      return res.status(400).json({ error: 'Користувач з таким email вже існує' });
    }

    // Хешування пароля
    const hashedPassword = await bcrypt.hash(password, 10);

    // Створення нового користувача
    const newUser = {
      id: uuidv4(),
      name,
      email,
      password: hashedPassword,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));

    res.status(201).json({ message: 'Реєстрація успішна!', user: { id: newUser.id, name: newUser.name } });
  } catch (error) {
    console.error('Помилка реєстрації:', error);
    res.status(500).json({ error: 'Помилка сервера' });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const users = JSON.parse(fs.readFileSync(USERS_FILE));

    // Пошук користувача
    const user = users.find(user => user.email === email);
    if (!user) {
      return res.status(401).json({ error: 'Невірний email або пароль' });
    }

    // Перевірка пароля
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Невірний email або пароль' });
    }

    res.json({ message: 'Вхід успішний!', user: { id: user.id, name: user.name } });
  } catch (error) {
    console.error('Помилка входу:', error);
    res.status(500).json({ error: 'Помилка сервера' });
  }
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущено на http://localhost:${PORT}`);
});