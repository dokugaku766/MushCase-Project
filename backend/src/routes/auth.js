const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../database');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// Регистрация
router.post('/register', async (req, res) => {
    try {
        const { nickname, email, password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Пароли не совпадают' });
        }

        // Проверка существования пользователя
        const [existingUsers] = await db.execute(
            'SELECT * FROM users WHERE email = ? OR nickname = ?',
            [email, nickname]
        );

        if (existingUsers.length > 0) {
            return res.status(400).json({ message: 'Пользователь уже существует' });
        }

        // Хэширование пароля
        const hashedPassword = await bcrypt.hash(password, 12);

        // Создание пользователя
        const [result] = await db.execute(
            'INSERT INTO users (nickname, email, password, balance) VALUES (?, ?, ?, ?)',
            [nickname, email, hashedPassword, 1000] // Стартовый баланс 1000₽
        );

        const token = jwt.sign(
            { userId: result.insertId },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(201).json({
            message: 'Пользователь создан успешно',
            token,
            user: {
                id: result.insertId,
                nickname,
                email,
                balance: 1000
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});

// Вход
router.post('/login', async (req, res) => {
    try {
        const { login, password } = req.body;

        const [users] = await db.execute(
            'SELECT * FROM users WHERE email = ? OR nickname = ?',
            [login, login]
        );

        if (users.length === 0) {
            return res.status(400).json({ message: 'Неверные данные' });
        }

        const user = users[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Неверные данные' });
        }

        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            message: 'Вход выполнен успешно',
            token,
            user: {
                id: user.id,
                nickname: user.nickname,
                email: user.email,
                balance: user.balance
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});

// Получение профиля
router.get('/profile', authMiddleware, async (req, res) => {
    try {
        const [users] = await db.execute('SELECT * FROM users WHERE id = ?', [req.user.id]);
        const user = users[0];

        res.json({
            id: user.id,
            nickname: user.nickname,
            email: user.email,
            balance: user.balance,
            createdAt: user.created_at
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});

module.exports = router;