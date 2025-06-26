const express = require('express');
const db = require('../database');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

const router = express.Router();

// Получение всех пользователей
router.get('/users', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const [users] = await db.execute(
            'SELECT id, nickname, email, balance, role, created_at FROM users ORDER BY created_at DESC'
        );
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});

// Изменение баланса пользователя
router.put('/users/:id/balance', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const { balance } = req.body;
        const userId = req.params.id;

        await db.execute('UPDATE users SET balance = ? WHERE id = ?', [balance, userId]);

        await db.execute(
            'INSERT INTO transactions (user_id, type, amount, description) VALUES (?, ?, ?, ?)',
            [userId, 'admin_adjustment', balance, 'Корректировка баланса администратором']
        );

        res.json({ message: 'Баланс обновлен успешно!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});

// Статистика сайта
router.get('/stats', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const [userCount] = await db.execute('SELECT COUNT(*) as count FROM users');
        const [casesOpened] = await db.execute('SELECT COUNT(*) as count FROM inventory');
        const [totalSpent] = await db.execute(
            'SELECT SUM(amount) as total FROM transactions WHERE type = "case_opening"'
        );

        res.json({
            totalUsers: userCount[0].count,
            casesOpened: casesOpened[0].count,
            totalSpent: totalSpent[0].total || 0
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});

module.exports = router;