import React, { useState, useEffect } from 'react';
import api from '../api/api';
import '../styles/CaseOpening.css';

const CaseOpening = ({ user, setUser }) => {
  const [cases, setCases] = useState([]);
  const [selectedCase, setSelectedCase] = useState(null);
  const [caseContents, setCaseContents] = useState([]);
  const [isOpening, setIsOpening] = useState(false);
  const [wonSkin, setWonSkin] = useState(null);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    fetchCases();
  }, []);

  const fetchCases = async () => {
    try {
      const response = await api.get('/cases');
      setCases(response.data);
    } catch (error) {
      console.error('Ошибка загрузки кейсов:', error);
    }
  };

  const openCaseModal = async (caseData) => {
    try {
      const response = await api.get(`/cases/${caseData.id}/contents`);
      setCaseContents(response.data);
      setSelectedCase(caseData);
      setWonSkin(null);
      setShowResult(false);
    } catch (error) {
      console.error('Ошибка загрузки содержимого кейса:', error);
    }
  };

  const openCase = async () => {
    if (user.balance < selectedCase.price) {
      alert('Недостаточно средств!');
      return;
    }

    setIsOpening(true);
    
    try {
      const response = await api.post(`/cases/${selectedCase.id}/open`);
      const { skin, newBalance } = response.data;
      
      // Обновляем баланс пользователя
      setUser({ ...user, balance: newBalance });
      
      // Запуск анимации
      setTimeout(() => {
        setWonSkin(skin);
        setIsOpening(false);
        setShowResult(true);
      }, 3000);
      
    } catch (error) {
      setIsOpening(false);
      alert(error.response?.data?.message || 'Ошибка открытия кейса');
    }
  };

  const closeModal = () => {
    setSelectedCase(null);
    setCaseContents([]);
    setWonSkin(null);
    setShowResult(false);
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

  return (
    <div className="case-opening">
      <div className="container">
        <h2 className="section-title">Выберите кейс</h2>
        
        <div className="cases-grid">
          {cases.map(caseData => (
            <div key={caseData.id} className="case-card" onClick={() => openCaseModal(caseData)}>
              <img src={caseData.image_url} alt={caseData.name} />
              <h3>{caseData.name}</h3>
              <p className="case-price">{caseData.price}₽</p>
            </div>
          ))}
        </div>

        {selectedCase && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="case-modal" onClick={e => e.stopPropagation()}>
              <button className="close-btn" onClick={closeModal}>×</button>
              
              <h3>{selectedCase.name}</h3>
              
              {!isOpening && !showResult && (
                <>
                  <div className="case-contents">
                    {caseContents.map(skin => (
                      <div key={skin.id} className="skin-item" style={{borderColor: getRarityColor(skin.rarity)}}>
                        <img src={skin.image_url} alt={skin.name} />
                        <p>{skin.name}</p>
                        <p className="skin-price">{skin.price}₽</p>
                        <span className="rarity" style={{color: getRarityColor(skin.rarity)}}>{skin.rarity}</span>
                      </div>
                    ))}
                  </div>
                  
                  <button className="open-case-btn" onClick={openCase}>
                    Открыть за {selectedCase.price}₽
                  </button>
                </>
              )}

              {isOpening && (
                <div className="opening-animation">
                  <div className="roulette">
                    <div className="roulette-items">
                      {[...caseContents, ...caseContents, ...caseContents].map((skin, index) => (
                        <div key={index} className="roulette-item">
                          <img src={skin.image_url} alt={skin.name} />
                        </div>
                      ))}
                    </div>
                    <div className="roulette-pointer"></div>
                  </div>
                  <p>Открываем кейс...</p>
                </div>
              )}

              {showResult && wonSkin && (
                <div className="opening-result">
                  <h4>Поздравляем!</h4>
                  <div className="won-skin" style={{borderColor: getRarityColor(wonSkin.rarity)}}>
                    <img src={wonSkin.image_url} alt={wonSkin.name} />
                    <h5>{wonSkin.name}</h5>
                    <p className="skin-price">{wonSkin.price}₽</p>
                    <span className="rarity" style={{color: getRarityColor(wonSkin.rarity)}}>{wonSkin.rarity}</span>
                  </div>
                  <button className="close-result-btn" onClick={closeModal}>Закрыть</button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CaseOpening;