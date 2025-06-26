import React, { useState, useEffect } from 'react';
import api from '../api/api';

const Inventory = ({ user, setUser }) => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const response = await api.get('/users/inventory');
      setInventory(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Ошибка загрузки инвентаря:', error);
      setLoading(false);
    }
  };

  const sellSkin = async (inventoryId, price) => {
    try {
      const response = await api.post(`/users/sell/${inventoryId}`);
      
      // Обновляем баланс пользователя
      setUser({ ...user, balance: response.data.newBalance });
      
      // Удаляем предмет из инвентаря
      setInventory(inventory.filter(item => item.id !== inventoryId));
      
      alert(`Скин продан за ${price}₽!`);
    } catch (error) {
      alert(error.response?.data?.message || 'Ошибка продажи');
    }
  };

  const getRarityColor = (rarity) => {
    const colors = {
      'Consumer Grade': '#b0c3d9',
      'Industrial Grade': '#5e98d9',
      'Mil-Spec': '#4b69ff',
      'Restricted': '#8847ff',
      'Classified': '#d32ce6',
      'Covert': '#eb4b4b',
      'Exceedingly Rare': '#ffd700'
    };
    return colors[rarity] || '#ffffff';
  };

  if (loading) {
    return <div className="loading">Загрузка инвентаря...</div>;
  }

  return (
    <div className="inventory">
      <div className="container">
        <h2 className="section-title">Мой инвентарь</h2>
        
        {inventory.length === 0 ? (
          <div className="empty-inventory">
            <p>Ваш инвентарь пуст</p>
            <p>Откройте кейсы, чтобы получить скины!</p>
          </div>
        ) : (
          <div className="inventory-grid">
            {inventory.map(item => (
              <div key={item.id} className="inventory-item" style={{borderColor: getRarityColor(item.rarity)}}>
                <img src={item.image_url} alt={item.name} />
                <h4>{item.name}</h4>
                <p className="item-price">{item.price}₽</p>
                <span className="rarity" style={{color: getRarityColor(item.rarity)}}>{item.rarity}</span>
                <button 
                  className="sell-btn"
                  onClick={() => sellSkin(item.id, item.price)}
                >
                  Продать
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Inventory;