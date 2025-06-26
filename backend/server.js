const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4000;

// CORS настройки
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true
}));

app.use(express.json());

// Роут для теста
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend MushCase работает на порту 4000!' });
});

// Роут для регистрации
app.post('/api/auth/register', (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  console.log('Попытка регистрации:', { username, email });

  // Простая валидация
  if (!username || !email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Заполните все поля!'
    });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({
      success: false,
      message: 'Пароли не совпадают!'
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message: 'Пароль должен содержать минимум 6 символов!'
    });
  }

  // Успешная регистрация
  res.json({
    success: true,
    message: `Добро пожаловать, ${username}!`,
    user: {
      id: Date.now(),
      username,
      email,
      balance: 1500 // Стартовый баланс
    }
  });
});

// Роут для входа
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  console.log('Попытка входа:', { email });

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Заполните все поля!'
    });
  }

  // Заглушка для входа
  res.json({
    success: true,
    message: 'Вход выполнен успешно!',
    user: {
      id: 1,
      username: 'TestUser',
      email,
      balance: 2000
    }
  });
});

// Роут для получения кейсов
app.get('/api/cases', (req, res) => {
  const cases = [
    {
      id: 1,
      name: "Operation Bravo Case",
      price: 150,
      image: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO1gb-Gw_alIITck29Y_chOhuDG_Zi72wLnqUBsZjzzLdSSdA49aQ7W8wS5wubxxcjrGXRQKw"
    },
    {
      id: 2,
      name: "Chroma Case",
      price: 120,
      image: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO1gb-Gw_alDL_Yh2xY_chOhuDG_Zi72w2jqko4Zz30cNLEcQ9qY13V-Va3x-bqxcjrV1lT3w"
    }
  ];

  res.json(cases);
});

app.listen(PORT, () => {
  console.log(`🚀 Backend запущен на http://localhost:${PORT}`);
  console.log(`🌐 CORS настроен для http://localhost:3000`);
  console.log(`🎮 MushCase API готов к работе!`);
});
