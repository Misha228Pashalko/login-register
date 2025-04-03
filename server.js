const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const USERS_FILE = path.join(__dirname, 'users.json');

// Middleware
app.use(bodyParser.json());
app.use(express.static('public')); // Папка з HTML файлом

// Завантаження користувачів з файлу
function loadUsers() {
    try {
        const data = fs.readFileSync(USERS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        return {};
    }
}

// Збереження користувачів у файл
function saveUsers(users) {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf8');
}

// Маршрут для реєстрації
app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    const users = loadUsers();

    if (users[email]) {
        return res.status(400).json({ error: 'Користувач з таким email вже існує!' });
    }

    users[email] = { name, password };
    saveUsers(users);

    res.json({ message: 'Реєстрація успішна!' });
});

// Маршрут для входу
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const users = loadUsers();

    if (!users[email]) {
        return res.status(400).json({ error: 'Користувача з таким email не знайдено!' });
    }

    if (users[email].password !== password) {
        return res.status(400).json({ error: 'Невірний пароль!' });
    }

    res.json({ name: users[email].name });
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущено на http://localhost:${PORT}`);
});