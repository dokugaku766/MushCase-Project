const express = require('express');
const db = require('../database');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// Получение инвентаря
router.get('/inventory', authMiddleware, async (req, res) => {
    try {
        const [inventory] = await db.execute(`
            SELECT i.*, s.name, s.rarity, s.price, s.image_url, s.case_id
            FROM inventory i
            JOIN skins s ON i.skin_id = s.id
            WHERE i.user_id = ?
            ORDER BY i.obtained_at DESC
        `, [req.user.id]);

        res.json(inventory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});

// Продажа скина
router.post('/sell/:inventoryId', authMiddleware, async (req, res) => {
    try {
        const inventoryId = req.params.inventoryId;

        // Получение информации о скине
        const [inventoryItems] = await db.execute(`
            SELECT i.*, s.name, s.price
            FROM inventory i
            JOIN skins s ON i.skin_id = s.id
            WHERE i.id = ? AND i.user_id = ?
        `, [inventoryId, req.user.id]);

        if (inventoryItems.length === 0) {
            return res.status(404).json({ message: 'Предмет не найден' });
        }

        const item = inventoryItems[0];

        // Удаление из инвентаря
        await db.execute('DELETE FROM inventory WHERE id = ?', [inventoryId]);

        // Обновление баланса
        await db.execute(
            'UPDATE users SET balance = balance + ? WHERE id = ?',
            [item.price, req.user.id]
        );

        // Запись транзакции
        await db.execute(
            'INSERT INTO transactions (user_id, type, amount, description) VALUES (?, ?, ?, ?)',
            [req.user.id, 'skin_sale', item.price, `Продажа скина: ${item.name}`]
        );

        res.json({
            message: 'Скин продан успешно!',
            soldPrice: item.price,
            newBalance: req.user.balance + item.price
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});

// Пополнение баланса (заглушка)
router.post('/deposit', authMiddleware, async (req, res) => {
    try {
        const { amount } = req.body;

        if (amount <= 0 || amount > 10000) {
            return res.status(400).json({ message: 'Некорректная сумма' });
        }

        await db.execute(
            'UPDATE users SET balance = balance + ? WHERE id = ?',
            [amount, req.user.id]
        );

        await db.execute(
            'INSERT INTO transactions (user_id, type, amount, description) VALUES (?, ?, ?, ?)',
            [req.user.id, 'deposit', amount, 'Пополнение баланса']
        );

        res.json({
            message: 'Баланс пополнен успешно!',
            depositAmount: amount,
            newBalance: req.user.balance + amount
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});

module.exports = router;