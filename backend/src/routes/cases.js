const express = require('express');
const db = require('../database');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// Получение всех кейсов
router.get('/', async (req, res) => {
    try {
        const [cases] = await db.execute('SELECT * FROM cases ORDER BY price ASC');
        res.json(cases);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});

// Получение содержимого кейса
router.get('/:id/contents', async (req, res) => {
    try {
        const [skins] = await db.execute(
            'SELECT * FROM skins WHERE case_id = ? ORDER BY rarity_order ASC',
            [req.params.id]
        );
        res.json(skins);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});

// Открытие кейса
router.post('/:id/open', authMiddleware, async (req, res) => {
    try {
        const caseId = req.params.id;
        const userId = req.user.id;

        // Получение информации о кейсе
        const [cases] = await db.execute('SELECT * FROM cases WHERE id = ?', [caseId]);
        if (cases.length === 0) {
            return res.status(404).json({ message: 'Кейс не найден' });
        }

        const caseData = cases[0];

        // Проверка баланса
        if (req.user.balance < caseData.price) {
            return res.status(400).json({ message: 'Недостаточно средств' });
        }

        // Получение скинов из кейса
        const [skins] = await db.execute(
            'SELECT * FROM skins WHERE case_id = ?',
            [caseId]
        );

        // Алгоритм выпадения с учетом редкости
        const rarityChances = {
            'Consumer Grade': 0.7992,    // ~80%
            'Industrial Grade': 0.1598,  // ~16%
            'Mil-Spec': 0.032,          // ~3.2%
            'Restricted': 0.0064,        // ~0.64%
            'Classified': 0.0019,        // ~0.19%
            'Covert': 0.0006,           // ~0.06%
            'Exceedingly Rare': 0.0001   // ~0.01%
        };

        let random = Math.random();
        let selectedRarity = 'Consumer Grade';

        for (const [rarity, chance] of Object.entries(rarityChances)) {
            if (random <= chance) {
                selectedRarity = rarity;
                break;
            }
            random -= chance;
        }

        // Выбор случайного скина выбранной редкости
        const raritySkuns = skins.filter(skin => skin.rarity === selectedRarity);
        const selectedSkin = raritySkuns[Math.floor(Math.random() * raritySkuns.length)];

        // Обновление баланса
        await db.execute(
            'UPDATE users SET balance = balance - ? WHERE id = ?',
            [caseData.price, userId]
        );

        // Добавление скина в инвентарь
        await db.execute(
            'INSERT INTO inventory (user_id, skin_id, obtained_at) VALUES (?, ?, NOW())',
            [userId, selectedSkin.id]
        );

        // Запись транзакции
        await db.execute(
            'INSERT INTO transactions (user_id, type, amount, description) VALUES (?, ?, ?, ?)',
            [userId, 'case_opening', -caseData.price, `Открытие кейса: ${caseData.name}`]
        );

        res.json({
            message: 'Кейс открыт успешно!',
            skin: selectedSkin,
            newBalance: req.user.balance - caseData.price
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});

module.exports = router;