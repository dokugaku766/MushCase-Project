import React, { useState, useEffect } from 'react';
import api from '../api/api';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [usersRes, statsRes] = await Promise.all([
        api.get('/admin/users'),
        api.get('/admin/stats')
      ]);
      
      setUsers(usersRes.data);
      setStats(statsRes.data);
      setLoading(false);
    } catch (error) {
      console.error('Ошибка загрузки данных:', error);
      setLoading(false);
    }
  };

  const updateBalance = async (userId, newBalance) => {
    try {
      await api.put(`/admin/users/${userId}/balance`, { balance: newBalance });
      
      setUsers(users.map(user => 
        user.id === userId ? { ...user, balance: newBalance } : user
      ));
      
      alert('Баланс обновлен!');
    } catch (error) {
      alert('Ошибка обновления баланса');
    }
  };

  if (loading) {
    return <div className="loading">Загрузка...</div>;
  }

  return (
    <div className="admin-panel">
      <div className="container">
        <h2 className="section-title">Админ панель</h2>
        
        <div className="admin-stats">
          <div className="stat-card">
            <h3>{stats.totalUsers}</h3>
            <p>Всего пользователей</p>
          </div>
          <div className="stat-card">
            <h3>{stats.casesOpened}</h3>
            <p>Кейсов открыто</p>
          </div>
          <div className="stat-card">
            <h3>{stats.totalSpent}₽</h3>
            <p>Потрачено всего</p>
          </div>
        </div>

        <div className="users-table">
          <h3>Пользователи</h3>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Никнейм</th>
                <th>Email</th>
                <th>Баланс</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.nickname}</td>
                  <td>{user.email}</td>
                  <td>{user.balance}₽</td>
                  <td>
                    <button 
                      onClick={() => {
                        const newBalance = prompt('Новый баланс:', user.balance);
                        if (newBalance !== null) {
                          updateBalance(user.id, parseInt(newBalance));
                        }
                      }}
                    >
                      Изменить баланс
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;