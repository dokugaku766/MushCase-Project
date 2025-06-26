const jwt = require('jsonwebtoken');
const db = require('../database');

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            return res.status(401).json({ message: 'Токен не предоставлен' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const [users] = await db.execute('SELECT * FROM users WHERE id = ?', [decoded.userId]);
        
        if (users.length === 0) {
            return res.status(401).json({ message: 'Пользователь не найден' });
        }

        req.user = users[0];
        next();
    } catch (error) {
        res.status(401).json({ message: 'Недействительный токен' });
    }
};

const adminMiddleware = async (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Доступ запрещен' });
    }
    next();
};

module.exports = { authMiddleware, adminMiddleware };