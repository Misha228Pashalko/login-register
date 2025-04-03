# Система реєстрації та авторизації

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

Проста система реєстрації та авторизації з використанням HTML, CSS, JavaScript та Node.js. Дані зберігаються у файлі JSON.

## Особливості

- 📝 Форма реєстрації з валідацією
- 🔑 Форма входу з перевіркою облікових даних
- 💾 Зберігання даних у файлі `users.json`
- 🔄 Асинхронна обробка запитів
- 📱 Адаптивний дизайн

## Встановлення та запуск

1. **Клонуйте репозиторій**:
   ```bash
   git clone https://github.com/Misha228Pashalko/login-register
   cd ваш-репозиторій
   ```

2. **Встановіть залежності**:
   ```bash
   npm install
   ```

3. **Запустіть сервер**:
   ```bash
   node server.js
   ```

4. **Відкрийте у браузері**:
   ```
   http://localhost:3000
   ```

## Структура проекту

```
project/
├── public/
│   ├── index.html      # Головна сторінка з формами
│   ├── script.js       # js код для html
│   └── style.css       # Стилі
├── server.js           # Серверний код
├── packege-lock.json   # Зберігання дерева версій  
├── users.json          # Файл з даними користувачів (створиться автоматично)
├── package.json        # Файл конфігурації Node.js
└── README.md           # Цей файл
```

## API Ендпоінти

- `POST /register` - Реєстрація нового користувача
  ```json
  {
    "name": "Ім'я користувача",
    "email": "user@example.com",
    "password": "пароль"
  }
  ```

- `POST /login` - Вхід в систему
  ```json
  {
    "email": "user@example.com",
    "password": "пароль"
  }
  ```

## Приклад використання

### Реєстрація
```javascript
fetch('/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'Іван Петренко',
    email: 'ivan@example.com',
    password: 'secure123'
  }),
})
.then(response => response.json())
.then(data => console.log(data));
```

### Вхід
```javascript
fetch('/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'ivan@example.com',
    password: 'secure123'
  }),
})
.then(response => response.json())
.then(data => console.log(data));
```

## Ліцензія

Цей проект ліцензований за умовами [MIT License](LICENSE).

---

**Примітка**: Ця реалізація призначена лише для навчальних цілей. У продакшен середовищі слід використовувати:
- Хешування паролів (bcrypt)
- HTTPS для захисту даних
- Бази даних замість файлового сховища
- Додаткові заходи безпеки (CSRF токени, rate limiting)