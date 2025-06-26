import React, { useState } from 'react';
import api from '../api/api';

const Profile = ({ user, setUser }) => {
  const [depositAmount, setDepositAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const deposit = async (amount) => {
    setLoading(true);
    try {
      const response = await api.post('/users/deposit', { amount });
      setUser({ ...user, balance: response.data.newBalance });
      alert(`Баланс пополнен на ${amount}₽!`);
    } catch (error) {
      alert(error.response?.data?.message || 'Ошибка пополнения');
    } finally {
      setLoading(false);
    }
  };

  const handleCustomDeposit = async (e) => {
    e.preventDefault();
    const amount = parseInt(depositAmount);
    if (amount > 0 && amount <= 10000) {
      await deposit(amount);
      setDepositAmount('');
    } else {
      alert('Введите сумму от 1 до 10000 рублей');
    }
  };

  return (
    <div className="profile">
      <div className="container">
        <div className="profile-header">
          <h2 className="section-title">Профиль</h2>
          <div className="user-stats">
            <div className="stat">
              <h3>{user.nickname}</h3>
              <p>Никнейм</p>
            </div>
            <div className="stat">
              <h3>{user.balance}₽</h3>
              <p>Баланс</p>
            </div>
            <div className="stat">
              <h3>{user.email}</h3>
              <p>Email</p>
            </div>
          </div>
        </div>

        <div className="deposit-section">
          <h3>Пополнение баланса</h3>
          <div className="deposit-buttons">
            <button onClick={() => deposit(100)} disabled={loading}>+100₽</button>
            <button onClick={() => deposit(500)} disabled={loading}>+500₽</button>
            <button onClick={() => deposit(1000)} disabled={loading}>+1000₽</button>
            <button onClick={() => deposit(5000)} disabled={loading}>+5000₽</button>
          </div>
          
          <form onSubmit={handleCustomDeposit} className="custom-deposit">
            <input
              type="number"
              placeholder="Введите сумму"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              min="1"
              max="10000"
            />
            <button type="submit" disabled={loading}>Пополнить</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;