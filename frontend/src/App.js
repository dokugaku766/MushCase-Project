import React, { useState } from 'react';
import './App.css';

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState('');
  const [user, setUser] = useState(null);
  const [showInventory, setShowInventory] = useState(false);
  const [inventory, setInventory] = useState([]);
  const [isOpening, setIsOpening] = useState(false);
  const [openingCase, setOpeningCase] = useState(null);
  const [wonItem, setWonItem] = useState(null);
  const [showCaseContent, setShowCaseContent] = useState(false);
  const [selectedCase, setSelectedCase] = useState(null);
  const [showTopUp, setShowTopUp] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [spinItems, setSpinItems] = useState([]);

  // Данные кейсов CS2
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
    },
    {
      id: 3,
      name: "Phoenix Case",
      price: 100,
      image: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO1gb-Gw_alDL_YlWNY_chOhuDG_Zi72wK1qkVpNmj3LNXDJgRqaQ7V-1nrwOzpxcjramtGSA"
    },
    {
      id: 4,
      name: "Huntsman Case",
      price: 200,
      image: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO1gb-Gw_alDLDXh2xY_chOhuDG_Zi72wK2qko4MT3zJdWUdANpM13W-Fnrxea6gMjr8eiXVSM"
    },
    {
      id: 5,
      name: "Spectrum Case",
      price: 180,
      image: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO1gb-Gw_alDL_Yh2xY_chOhuDG_Zi72w23-Uo5NjrxdNeUdlJoZg3U_1a3ye6-gMjrb8kDQrs"
    },
    {
      id: 6,
      name: "Glove Case",
      price: 300,
      image: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO1gb-Gw_alDLDXlWNY_chOhuDG_Zi72wXk-BBsY2-lJNWSdFQ5aQ3Q-FG6kurugMjrQqQ1J3s"
    },
    {
      id: 7,
      name: "Gamma Case",
      price: 140,
      image: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO1gb-Gw_alDL_YklRc7cF4ntbN_Iv9nBq3rko6YWvxJNfBewM6NAvZrwW8wua8hMS96ZrAyXo3vSV3sGGdwUK14qMjag"
    },
    {
      id: 8,
      name: "Danger Zone Case",
      price: 160,
      image: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO1gb-Gw_alDLDUkmJE5cU_juDU-MKhgFXjqBE-MTymctDAJgU3ZVqEq1Xryer-gJXttcvNwXYyuCYh4GCPXQBB0pU"
    }
  ];

  // Скины для кейсов
  const allSkins = [
    { name: "AK-47 Redline", price: 500, rarity: "restricted", image: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV09-5lpKKqPrxN7LEmyUE6ccxg-rLyoT8j1yg5UJuNzz6J4SdJAFrNwrSqFPvku_n15a8ot2XnjMNhG1F" },
    { name: "M4A4 Asiimov", price: 800, rarity: "covert", image: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhoyszMdC5H_siJmIWKk8j4OrzZgiUG65Ek3r6Spt2jigDmr0tqZGz6LYeRJlQ3ZArY_Fa_wOi90Ja-6oOJlyUPg7oNNQ" },
    { name: "AWP Dragon Lore", price: 15000, rarity: "extraordinary", image: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17PLfYQJD_9W7m5a0mvLwOq7c2DwF6sEnj-rF8Nf32ATh_hVuZW76INSTcFU3YQrTrwK6wOjugpa7ot2XntwfkWo" },
    { name: "Glock-18 Water Elemental", price: 150, rarity: "restricted", image: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposbaqKAxf0vL3djFN79eJmIGZnPL6DLfYkWNFppMi3OuXo9ig0VDg-UVkZ27xd4DHIlRvMA6D8ge2wujphMO46snInCdr7yZw5XfVzUXhn1gSOYQN0v1f" },
    { name: "P90 Asiimov", price: 300, rarity: "covert", image: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopuP1FAR17P7NdTRH-t26q4SClvD7PYTQgGY65skn0-yZ8I322gzh8xVsam2nLdCUIVVvN1vV8li_l-q8g8S7upiYziFnsy5zt3uJgVXp1kj6Ixsc" },
    { name: "USP-S Kill Confirmed", price: 1200, rarity: "covert", image: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoo6m1FBRp3_bGcjhQ09-jq5WYh8j_OrfdqWdY781lteXA54vwxgDs8RU4YGrwJYWRdlRsMFyF-Va6kry-g5-_u8yYzyZluCB152GdwUJMNqLRNg" },
    { name: "Karambit Doppler", price: 25000, rarity: "extraordinary", image: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJlY20k_PkP6_um25V4dB8teXI8oThxlHl-ENsZjv0IIeVdAVsY1vVrwPqyObthJK0tcvOzXQ37SJ05nyOyh2pgQYMMLIP8b8Ek4w" },
    { name: "M4A1-S Hot Rod", price: 600, rarity: "classified", image: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uOxh7-Gw_alDLzYhXtu5cB1g_zMu9-iiwS1-BFoZWz0IdCVJwQ4aF7R_ADtw-i8gMDpvZuannM3viEq4X6PzhHhn1gSOX-fQR_l" },
    { name: "Desert Eagle Blaze", price: 450, rarity: "restricted", image: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposr-kLAtl7PDdTjlH7du5q4GFk8j5Nr_Yg2Y-7cN-teTE8YXwjQPhqUs4Mj2mLdOSdlI7aAvQ_1C-kr_vgZLvv8zBziNmuCUj7CzbgVXp1i-8N5dt" },
    { name: "StatTrak M9 Bayonet", price: 3500, rarity: "extraordinary", image: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf3qr3czxb49KzgL-DlvD7PYTck29Y_chOhuy1pY-jjQW3-UdkNW6mLNeRJAA3YguF-lG7x-y8hJK96ZqdziNn6z5iuyjAhj-Jnlc"  },
    { name: "Negev Mjolnir", price: 350, rarity: "covert", image: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpouL-iLhFf2-r3eThW5d2kl4-Zk_PkNoTEhGlQ5Px9g-fEyoD3jATk-UduYz2ldYOXJAE7MFnZ_gXvkOvr0J--u52czSM373Em7Czdmh2zn1gSOSdplnKZjQ" },
    { name: "Five-SeveN Monkey Business", price: 95, rarity: "mil-spec", image: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposLOzLhRlxfbGTjxP09itk4-PkvPLP7LWnn8fv501jLvCotyii1Hn-hFtZj3ycoTBdlQ5N1iGrFC4yfCv28G9yLB0iw" }
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('Отправка данных...');

    try {
      const response = await fetch('http://localhost:4000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setMessage('Регистрация успешна!');
        setUser({
          ...data.user,
          casesOpened: 0,
          totalSpent: 0,
          totalWon: 0,
          joinDate: new Date().toISOString()
        });
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('Ошибка подключения к серверу');
      console.error('Ошибка:', error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('Вход в систему...');

    try {
      const response = await fetch('http://localhost:4000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage('Вход выполнен успешно!');
        setUser({
          ...data.user,
          casesOpened: Math.floor(Math.random() * 50),
          totalSpent: Math.floor(Math.random() * 10000),
          totalWon: Math.floor(Math.random() * 15000),
          joinDate: new Date(2024, 0, 1).toISOString()
        });
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('Ошибка подключения к серверу');
      console.error('Ошибка:', error);
    }
  };

  const showCaseDetails = (caseItem) => {
    setSelectedCase(caseItem);
    setShowCaseContent(true);
  };

  const openCase = async (caseItem) => {
    if (user.balance < caseItem.price || isOpening) {
      return;
    }

    setShowCaseContent(false);
    setIsOpening(true);
    setOpeningCase(caseItem);
    setWonItem(null);

    setUser({
      ...user,
      balance: user.balance - caseItem.price,
      casesOpened: user.casesOpened + 1,
      totalSpent: user.totalSpent + caseItem.price
    });

    const randomSkin = allSkins[Math.floor(Math.random() * allSkins.length)];
    const newItem = {
      ...randomSkin,
      id: Date.now(),
      fromCase: caseItem.name
    };

    const shuffledSkins = [...allSkins].sort(() => Math.random() - 0.5);
    const spinItemsArray = [];

    for (let i = 0; i < 20; i++) {
      spinItemsArray.push(shuffledSkins[i % shuffledSkins.length]);
    }

    spinItemsArray[15] = newItem;
    setSpinItems(spinItemsArray);

    setTimeout(() => {
      setWonItem(newItem);
      setInventory([...inventory, newItem]);
      setUser(prev => ({
        ...prev,
        totalWon: prev.totalWon + newItem.price
      }));

      setTimeout(() => {
        setIsOpening(false);
        setOpeningCase(null);
        setWonItem(null);
        setSpinItems([]);
      }, 2000);
    }, 3000);
  };

  const sellItem = (item) => {
    setInventory(inventory.filter(i => i.id !== item.id));
    setUser({...user, balance: user.balance + item.price});
    alert('Продано: ' + item.name + ' за ' + item.price + '₽');
  };

  const topUpBalance = (amount) => {
    const bonuses = { 100: 0, 500: 50, 1000: 150, 5000: 1000 };
    const totalAmount = amount + (bonuses[amount] || 0);
    setUser({...user, balance: user.balance + totalAmount});
    setShowTopUp(false);
    alert('Баланс пополнен на ' + totalAmount + '₽');
  };

  // Страница профиля
  if (showProfile && user) {
    return (
      <div className="App">
        <div className="header">
          <div className="logo">
            <h1 className="gothic-title">MushCase</h1>
            <div className="blood-drip"></div>
          </div>
          <div className="user-panel">
            <span className="username">👤 {user.username}</span>
            <span className="balance">💰 {user.balance}₽</span>
            <button onClick={() => setShowProfile(false)} className="logout-btn">Назад</button>
          </div>
        </div>

        <div className="profile-content">
          <div className="profile-container">
            <div className="profile-header">
              <div className="profile-avatar">
                <div className="avatar-circle">
                  {user.username.charAt(0).toUpperCase()}
                </div>
                <h2>{user.username}</h2>
                <p className="profile-level">ТРАВЕ ЛВЛ 📦</p>
              </div>

              <div className="profile-stats">
                <h3>📊 СТАТИСТИКА</h3>
                <div className="stats-grid">
                  <div className="stat-item">
                    <span className="stat-icon">📦</span>
                    <span className="stat-value">{user.casesOpened}</span>
                    <span className="stat-label">Открыто кейсов</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-icon">💰</span>
                    <span className="stat-value">{user.balance}₽</span>
                    <span className="stat-label">Текущий баланс</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-icon">💸</span>
                    <span className="stat-value">{user.totalSpent}₽</span>
                    <span className="stat-label">Потрачено</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-icon">💎</span>
                    <span className="stat-value">{user.totalWon}₽</span>
                    <span className="stat-label">Выиграно</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="profile-sections">
              <div className="profile-section">
                <h3>🎒 ВАШИ ПРЕДМЕТЫ</h3>
                <div className="profile-items">
                  {inventory.length === 0 ? (
                    <p className="no-items">У вас пока нет предметов</p>
                  ) : (
                    <div className="items-grid">
                      {inventory.slice(0, 6).map(item => (
                        <div key={item.id} className="profile-item">
                          <img src={item.image} alt={item.name} />
                          <p className="item-name">{item.name}</p>
                          <p className="item-price">{item.price}₽</p>
                        </div>
                      ))}
                    </div>
                  )}
                  {inventory.length > 6 && (
                    <button className="view-all-btn" onClick={() => {setShowProfile(false); setShowInventory(true);}}>
                      Показать все предметы
                    </button>
                  )}
                </div>
              </div>

              <div className="profile-section">
                <h3>ℹ️ ИНФОРМАЦИЯ ПРОФИЛЯ</h3>
                <div className="profile-info">
                  <div className="info-item">
                    <span className="info-label">Email:</span>
                    <span className="info-value">{user.email}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Дата регистрации:</span>
                    <span className="info-value">{new Date(user.joinDate).toLocaleDateString('ru-RU')}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Статус:</span>
                    <span className="info-value status-active">🟢 Активен</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="profile-actions">
              <button className="profile-action-btn" onClick={() => setShowTopUp(true)}>
                💳 Пополнить баланс
              </button>
              <button className="profile-action-btn" onClick={() => {setShowProfile(false); setShowInventory(true);}}>
                🎒 Открыть инвентарь
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Страница пополнения баланса
  if (showTopUp && user) {
    return (
      <div className="App">
        <div className="header">
          <div className="logo">
            <h1 className="gothic-title">MushCase</h1>
            <div className="blood-drip"></div>
          </div>
          <div className="user-panel">
            <span className="username">👤 {user.username}</span>
            <span className="balance">💰 {user.balance}₽</span>
            <button onClick={() => setShowTopUp(false)} className="logout-btn">Назад</button>
          </div>
        </div>

        <div className="topup-content">
          <div className="topup-container">
            <h2>💳 Пополнение баланса</h2>
            <p className="current-balance">Текущий баланс: <span>{user.balance}₽</span></p>

            <div className="topup-options">
              <div className="topup-card" onClick={() => topUpBalance(100)}>
                <div className="topup-amount">100₽</div>
                <div className="topup-bonus">Без бонуса</div>
              </div>

              <div className="topup-card popular" onClick={() => topUpBalance(500)}>
                <div className="topup-badge">Популярно</div>
                <div className="topup-amount">500₽</div>
                <div className="topup-bonus">+50₽ бонус</div>
              </div>

              <div className="topup-card" onClick={() => topUpBalance(1000)}>
                <div className="topup-amount">1000₽</div>
                <div className="topup-bonus">+150₽ бонус</div>
              </div>

              <div className="topup-card vip" onClick={() => topUpBalance(5000)}>
                <div className="topup-badge">VIP</div>
                <div className="topup-amount">5000₽</div>
                <div className="topup-bonus">+1000₽ бонус</div>
              </div>
            </div>

            <div className="payment-methods">
              <h3>Способы оплаты:</h3>
              <div className="payment-icons">
                <div className="payment-method">💳 Банковская карта</div>
                <div className="payment-method">📱 СБП</div>
                <div className="payment-method">🅰️ QIWI</div>
                <div className="payment-method">🌐 WebMoney</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Главная страница с кейсами
  if (user) {
    return (
      <div className="App">
        <div className="header">
          <div className="logo">
            <h1 className="gothic-title">MushCase</h1>
            <div className="blood-drip"></div>
          </div>
          <div className="user-panel">
            <span className="username" onClick={() => setShowProfile(true)} style={{cursor: 'pointer'}}>
              👤 {user.username}
            </span>
            <span className="balance">💰 {user.balance}₽</span>
            <button onClick={() => setUser(null)} className="logout-btn">Выйти</button>
          </div>
        </div>

        <div className="main-content">
          <div className="promo-banner">
            <h2>🔥 Открывай кейсы CS2 и выигрывай редкие скины!</h2>
          </div>

          <div className="cases-grid">
            {cases.map(caseItem => (
              <div key={caseItem.id} className="case-card">
                <div className="case-image" onClick={() => showCaseDetails(caseItem)}>
                  <img src={caseItem.image} alt={caseItem.name} />
                  <div className="view-content-overlay">
                    <span>👁️ Показать содержимое</span>
                  </div>
                </div>
                <h3 className="case-name">{caseItem.name}</h3>
                <p className="case-price">{caseItem.price}₽</p>
                <button
                  className="open-case-btn"
                  onClick={() => openCase(caseItem)}
                  disabled={user.balance < caseItem.price || isOpening}
                >
                  {isOpening && openingCase?.id === caseItem.id ? 'Открываю...' :
                   user.balance >= caseItem.price ? 'Открыть кейс' : 'Недостаточно средств'}
                </button>
              </div>
            ))}
          </div>

          <div className="bottom-panel">
            <button className="inventory-btn" onClick={() => setShowInventory(!showInventory)}>
              🎒 Инвентарь ({inventory.length})
            </button>
            <button className="add-balance-btn" onClick={() => setShowTopUp(true)}>
              💳 Пополнить баланс
            </button>
          </div>

          {showInventory && (
            <div className="inventory">
              <h3>🎒 Ваш инвентарь:</h3>
              {inventory.length === 0 ? (
                <p style={{textAlign: 'center', color: '#888'}}>
                  Инвентарь пуст. Откройте кейсы чтобы получить скины!
                </p>
              ) : (
                <div className="inventory-grid">
                  {inventory.map(item => (
                    <div key={item.id} className="inventory-item">
                      <img src={item.image} alt={item.name} />
                      <p className="item-name">{item.name}</p>
                      <p className="item-price">{item.price}₽</p>
                      <p className="item-case">Из: {item.fromCase}</p>
                      <button onClick={() => sellItem(item)} className="sell-btn">Продать</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Модальное окно содержимого кейса */}
        {showCaseContent && selectedCase && (
          <div className="case-content-modal">
            <div className="case-content-wrapper">
              <div className="case-content-header">
                <div className="case-info">
                  <img src={selectedCase.image} alt={selectedCase.name} className="case-large-image" />
                  <div className="case-details">
                    <h2>{selectedCase.name}</h2>
                    <p className="case-description">Содержимое кейса</p>
                    <p className="case-cost">
                      Чтобы открыть этот кейс на баланс должно быть не менее {selectedCase.price} ₽
                    </p>
                    <button
                      className="open-case-modal-btn"
                      onClick={() => openCase(selectedCase)}
                      disabled={user.balance < selectedCase.price}
                    >
                      {user.balance >= selectedCase.price ? 'ОТКРЫТЬ' : 'НЕДОСТАТОЧНО СРЕДСТВ'}
                    </button>
                  </div>
                </div>
                <button className="close-modal-btn" onClick={() => setShowCaseContent(false)}>✕</button>
              </div>

              <div className="case-skins-grid">
                {allSkins.map((skin, index) => (
                  <div key={index} className={`skin-item rarity-${skin.rarity}`}>
                    <img src={skin.image} alt={skin.name} />
                    <div className="skin-info">
                      <p className="skin-name">{skin.name}</p>
                      <p className="skin-price">{skin.price} ₽</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Модальное окно открытия кейса */}
        {isOpening && openingCase && (
          <div className="case-opening-modal">
            <div className="case-opening-content">
              <h2>Открытие {openingCase.name}</h2>
              <div className="spinning-wheel">
                <div className="case-items" style={{
                  transform: isOpening ? 'translateX(-1950px)' : 'translateX(0px)',
                  transition: 'transform 3s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                }}>
                  {spinItems.map((skin, i) => (
                    <div key={i} className="spinning-item">
                      <img src={skin.image} alt={skin.name} />
                      <div className="spinning-item-info">
                        <p className="spinning-item-name">{skin.name}</p>
                        <p className="spinning-item-price">{skin.price}₽</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="selector-line"></div>
              </div>

              {wonItem && (
                <div className="win-result">
                  <h3>🎉 Поздравляем!</h3>
                  <img src={wonItem.image} alt={wonItem.name} />
                  <p className="won-item-name">{wonItem.name}</p>
                  <p className="won-item-price">{wonItem.price}₽</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Страница авторизации
  return (
    <div className="App">
      <header className="App-header">
        <div className="logo">
          <h1 className="gothic-title">MushCase</h1>
          <div className="blood-drip"></div>
        </div>
        <p className="subtitle">CS2 Case Opening</p>

        <div className="auth-form">
          <div className="tabs">
            <button
              className={!isLogin ? 'tab active' : 'tab'}
              onClick={() => {setIsLogin(false); setMessage('');}}
            >
              Регистрация
            </button>
            <button
              className={isLogin ? 'tab active' : 'tab'}
              onClick={() => {setIsLogin(true); setMessage('');}}
            >
              Вход
            </button>
          </div>

          <form onSubmit={isLogin ? handleLogin : handleRegister} className="form">
            {!isLogin && (
              <input
                type="text"
                name="username"
                placeholder="Имя пользователя"
                value={formData.username}
                onChange={handleInputChange}
                className="input-field"
                required
              />
            )}

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="input-field"
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Пароль"
              value={formData.password}
              onChange={handleInputChange}
              className="input-field"
              required
            />

            {!isLogin && (
              <input
                type="password"
                name="confirmPassword"
                placeholder="Подтвердите пароль"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="input-field"
                required
              />
            )}

            {message && (
              <div className={`status-message ${message.includes('успешна') || message.includes('выполнен') ? 'success' : 'error'}`}>
                {message}
              </div>
            )}

            <button type="submit" className="submit-button">
              {isLogin ? 'Войти' : 'Зарегистрироваться'}
            </button>
          </form>
        </div>
      </header>
    </div>
  );
}

export default App;
