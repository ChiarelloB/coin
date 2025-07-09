import React, { useState, useEffect } from 'react';
import { getRandomEgg } from '../data/eggs.js';
import { getRandomFishByEgg } from '../data/fish.js';
import { getRandomMutation } from '../data/mutations.js';

const GameEngine = ({ user, onUpdateUser }) => {
  const [eggs, setEggs] = useState([]);
  const [hatchingEggs, setHatchingEggs] = useState(new Set());

  useEffect(() => {
    if (user && user.eggs) {
      setEggs(user.eggs);
    }
  }, [user]);

  useEffect(() => {
    // Verificar ovos que devem chocar automaticamente
    const checkAutoHatch = () => {
      if (!eggs.length) return;

      const now = Date.now();
      const eggsToHatch = eggs.filter(egg => {
        if (egg.isHatching) return false;
        const timeElapsed = now - egg.startTime;
        return timeElapsed >= egg.hatchTime;
      });

      eggsToHatch.forEach(egg => {
        hatchEgg(egg.id, true); // true indica auto-hatch
      });
    };

    const interval = setInterval(checkAutoHatch, 1000);
    return () => clearInterval(interval);
  }, [eggs]);

  const buyEgg = () => {
    if (user.coins < 50) {
      alert('Você precisa de 50 coins para comprar um ovo!');
      return;
    }

    const eggType = getRandomEgg();
    const newEgg = {
      id: Date.now(),
      ...eggType,
      startTime: Date.now(),
      isHatching: false
    };

    const updatedEggs = [...eggs, newEgg];
    setEggs(updatedEggs);

    const updatedUser = {
      ...user,
      coins: user.coins - 50,
      eggs: updatedEggs
    };

    onUpdateUser(updatedUser);
  };

  const hatchEgg = (eggId, isAutoHatch = false) => {
    const egg = eggs.find(e => e.id === eggId);
    if (!egg) return;

    const now = Date.now();
    const timeElapsed = now - egg.startTime;

    // Se não é auto-hatch, verificar se o tempo passou
    if (!isAutoHatch && timeElapsed < egg.hatchTime) {
      const remainingTime = Math.ceil((egg.hatchTime - timeElapsed) / 1000);
      alert(`Este ovo ainda precisa de ${remainingTime} segundos para chocar!`);
      return;
    }

    if (hatchingEggs.has(eggId)) return;

    setHatchingEggs(prev => new Set([...prev, eggId]));

    // Simular processo de chocagem
    setTimeout(() => {
      const fish = getRandomFishByEgg(egg.rarity);
      const mutation = getRandomMutation(fish.rarity);

      const newFish = {
        id: Date.now(),
        ...fish,
        mutation,
        bornAt: Date.now(),
        finalValue: mutation ? 
          Math.floor(fish.value * mutation.multiplier) : 
          fish.value
      };

      // Remover ovo e adicionar peixe
      const updatedEggs = eggs.filter(e => e.id !== eggId);
      const updatedFish = [...(user.fish || []), newFish];

      setEggs(updatedEggs);
      setHatchingEggs(prev => {
        const newSet = new Set(prev);
        newSet.delete(eggId);
        return newSet;
      });

      const updatedUser = {
        ...user,
        eggs: updatedEggs,
        fish: updatedFish
      };

      onUpdateUser(updatedUser);

      // Mostrar resultado
      let message = `🐟 ${fish.name} nasceu!`;
      if (mutation) {
        message += `\n✨ Com mutação: ${mutation.name} (x${mutation.multiplier})`;
        message += `\n💰 Valor: ${newFish.finalValue} coins`;
      } else {
        message += `\n💰 Valor: ${fish.value} coins`;
      }
      
      alert(message);
    }, 2000);
  };

  const sellFish = (fishId) => {
    const fish = user.fish.find(f => f.id === fishId);
    if (!fish) return;

    const saleValue = fish.finalValue || fish.value;
    const updatedFish = user.fish.filter(f => f.id !== fishId);
    
    const updatedUser = {
      ...user,
      fish: updatedFish,
      coins: user.coins + saleValue
    };

    onUpdateUser(updatedUser);
    alert(`Peixe vendido por ${saleValue} coins!`);
  };

  const getTimeRemaining = (egg) => {
    const now = Date.now();
    const timeElapsed = now - egg.startTime;
    const remaining = Math.max(0, egg.hatchTime - timeElapsed);
    
    if (remaining === 0) return 'Pronto para chocar!';
    
    const seconds = Math.ceil(remaining / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    
    if (minutes > 0) {
      return `${minutes}m ${remainingSeconds}s`;
    }
    return `${remainingSeconds}s`;
  };

  const canHatch = (egg) => {
    const now = Date.now();
    const timeElapsed = now - egg.startTime;
    return timeElapsed >= egg.hatchTime;
  };

  return (
    <div className="game-engine">
      <div className="game-header">
        <h2>CoinToFish Game</h2>
        <div className="user-stats">
          <span>💰 {user.coins} coins</span>
          <span>🥚 {eggs.length} ovos</span>
          <span>🐟 {user.fish?.length || 0} peixes</span>
        </div>
      </div>

      <div className="game-actions">
        <button 
          className="buy-egg-btn"
          onClick={buyEgg}
          disabled={user.coins < 50}
        >
          Comprar Ovo (50 coins)
        </button>
      </div>

      <div className="eggs-section">
        <h3>Seus Ovos ({eggs.length})</h3>
        <div className="eggs-grid">
          {eggs.map(egg => (
            <div 
              key={egg.id} 
              className={`egg-card ${hatchingEggs.has(egg.id) ? 'hatching' : ''}`}
              style={{ 
                background: egg.color,
                opacity: hatchingEggs.has(egg.id) ? 0.7 : 1
              }}
            >
              <h4>{egg.name}</h4>
              <p>Raridade: {egg.rarity}</p>
              <p>{egg.description}</p>
              <div className="egg-timer">
                {hatchingEggs.has(egg.id) ? (
                  <span>Chocando... 🐣</span>
                ) : (
                  <>
                    <span>{getTimeRemaining(egg)}</span>
                    {canHatch(egg) && (
                      <button 
                        className="hatch-btn"
                        onClick={() => hatchEgg(egg.id)}
                      >
                        Chocar Agora!
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="fish-section">
        <h3>Seus Peixes ({user.fish?.length || 0})</h3>
        <div className="fish-grid">
          {(user.fish || []).map(fish => (
            <div key={fish.id} className="fish-card">
              <h4 style={{ color: fish.color }}>{fish.name}</h4>
              <p>Raridade: {fish.rarity}</p>
              <p>Valor Base: {fish.value} coins</p>
              {fish.mutation && (
                <div className="mutation-info">
                  <p style={{ color: fish.mutation.color }}>
                    ✨ {fish.mutation.name}
                  </p>
                  <p>Multiplicador: x{fish.mutation.multiplier}</p>
                </div>
              )}
              <p><strong>Valor Final: {fish.finalValue || fish.value} coins</strong></p>
              <div className="fish-actions">
                <button 
                  className="sell-btn"
                  onClick={() => sellFish(fish.id)}
                >
                  Vender
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameEngine;