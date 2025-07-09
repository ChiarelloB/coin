import React, { useState, useEffect } from 'react';
import { getRarityColor } from '../data/eggs.js';

const AuctionSystem = ({ user, onUpdateUser }) => {
  const [auctions, setAuctions] = useState([]);
  const [userFish, setUserFish] = useState([]);
  const [selectedFish, setSelectedFish] = useState(null);
  const [startPrice, setStartPrice] = useState('');
  const [duration, setDuration] = useState(24); // horas
  const [showCreateAuction, setShowCreateAuction] = useState(false);

  useEffect(() => {
    loadAuctions();
    loadUserFish();
  }, [user]);

  const loadAuctions = () => {
    const savedAuctions = JSON.parse(localStorage.getItem('cointofish_auctions') || '[]');
    // Filtrar leilões expirados
    const activeAuctions = savedAuctions.filter(auction => 
      new Date(auction.endTime) > new Date() && auction.status === 'active'
    );
    setAuctions(activeAuctions);
    
    // Atualizar localStorage removendo leilões expirados
    localStorage.setItem('cointofish_auctions', JSON.stringify(activeAuctions));
  };

  const loadUserFish = () => {
    if (!user || !user.fish) return;
    
    // Filtrar peixes que podem ir para leilão (5 horas após nascer)
    const now = new Date().getTime();
    const availableFish = user.fish.filter(fish => {
      const timeSinceBirth = now - (fish.bornAt || fish.hatchedAt || now);
      return timeSinceBirth >= 5 * 60 * 60 * 1000; // 5 horas em ms
    });
    
    setUserFish(availableFish);
  };

  const createAuction = () => {
    if (!selectedFish || !startPrice) {
      alert('Selecione um peixe e defina o preço inicial');
      return;
    }

    const auction = {
      id: Date.now(),
      fishId: selectedFish.id,
      fishName: selectedFish.name,
      fishRarity: selectedFish.rarity,
      fishValue: selectedFish.value,
      fishMutation: selectedFish.mutation,
      sellerId: user.id,
      sellerName: user.username,
      startPrice: parseInt(startPrice),
      currentBid: parseInt(startPrice),
      currentBidder: null,
      endTime: new Date(Date.now() + duration * 60 * 60 * 1000).getTime(),
      status: 'active',
      createdAt: Date.now()
    };

    // Adicionar leilão
    const updatedAuctions = [...auctions, auction];
    setAuctions(updatedAuctions);
    localStorage.setItem('cointofish_auctions', JSON.stringify(updatedAuctions));

    // Remover peixe do usuário
    const updatedUserFish = user.fish.filter(fish => fish.id !== selectedFish.id);
    const updatedUser = { ...user, fish: updatedUserFish };
    onUpdateUser(updatedUser);

    // Reset form
    setSelectedFish(null);
    setStartPrice('');
    setShowCreateAuction(false);
    loadUserFish();

    alert('Leilão criado com sucesso!');
  };

  const placeBid = (auctionId, bidAmount) => {
    const auction = auctions.find(a => a.id === auctionId);
    if (!auction) return;

    if (bidAmount <= auction.currentBid) {
      alert('O lance deve ser maior que o lance atual');
      return;
    }

    if (user.coins < bidAmount) {
      alert('Você não tem coins suficientes');
      return;
    }

    if (auction.sellerId === user.id) {
      alert('Você não pode dar lance no seu próprio leilão');
      return;
    }

    // Devolver coins para o licitante anterior
    if (auction.currentBidder) {
      const previousBidder = JSON.parse(localStorage.getItem('cointofish_users') || '[]')
        .find(u => u.id === auction.currentBidder);
      if (previousBidder) {
        previousBidder.coins += auction.currentBid;
        // Atualizar usuário anterior
        const users = JSON.parse(localStorage.getItem('cointofish_users') || '[]');
        const updatedUsers = users.map(u => u.id === previousBidder.id ? previousBidder : u);
        localStorage.setItem('cointofish_users', JSON.stringify(updatedUsers));
      }
    }

    // Atualizar leilão
    const updatedAuction = {
      ...auction,
      currentBid: bidAmount,
      currentBidder: user.id,
      currentBidderName: user.username
    };

    const updatedAuctions = auctions.map(a => 
      a.id === auctionId ? updatedAuction : a
    );
    setAuctions(updatedAuctions);
    localStorage.setItem('cointofish_auctions', JSON.stringify(updatedAuctions));

    // Debitar coins do usuário atual
    const updatedUser = { ...user, coins: user.coins - bidAmount };
    onUpdateUser(updatedUser);

    alert('Lance realizado com sucesso!');
  };

  const formatTimeRemaining = (endTime) => {
    const now = new Date().getTime();
    const remaining = endTime - now;
    
    if (remaining <= 0) return 'Expirado';
    
    const hours = Math.floor(remaining / (1000 * 60 * 60));
    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m`;
  };

  const canCreateAuction = userFish.length > 0;

  return (
    <div className="auction-system">
      <div className="auction-header">
        <h2>Sistema de Leilões</h2>
        <button 
          className="create-auction-btn"
          onClick={() => setShowCreateAuction(!showCreateAuction)}
          disabled={!canCreateAuction}
        >
          {canCreateAuction ? 'Criar Leilão' : 'Nenhum peixe disponível'}
        </button>
      </div>

      {showCreateAuction && (
        <div className="create-auction-form">
          <h3>Criar Novo Leilão</h3>
          <div className="form-group">
            <label>Selecionar Peixe:</label>
            <select 
              value={selectedFish?.id || ''}
              onChange={(e) => {
                const fish = userFish.find(f => f.id === parseInt(e.target.value));
                setSelectedFish(fish);
              }}
            >
              <option value="">Escolha um peixe</option>
              {userFish.map(fish => (
                <option key={fish.id} value={fish.id}>
                  {fish.name} ({fish.rarity}) - {fish.value} coins
                  {fish.mutation && ` + ${fish.mutation.name}`}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Preço Inicial:</label>
            <input
              type="number"
              value={startPrice}
              onChange={(e) => setStartPrice(e.target.value)}
              placeholder="Preço inicial em coins"
              min="1"
            />
          </div>

          <div className="form-group">
            <label>Duração:</label>
            <select 
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value))}
            >
              <option value={1}>1 hora</option>
              <option value={6}>6 horas</option>
              <option value={12}>12 horas</option>
              <option value={24}>24 horas</option>
              <option value={48}>48 horas</option>
            </select>
          </div>

          <div className="form-actions">
            <button onClick={createAuction}>Criar Leilão</button>
            <button onClick={() => setShowCreateAuction(false)}>Cancelar</button>
          </div>
        </div>
      )}

      <div className="auctions-list">
        <h3>Leilões Ativos ({auctions.length})</h3>
        {auctions.length === 0 ? (
          <p>Nenhum leilão ativo no momento.</p>
        ) : (
          <div className="auctions-grid">
            {auctions.map(auction => (
              <div key={auction.id} className="auction-card">
                <div className="auction-fish">
                  <h4 style={{ color: getRarityColor(auction.fishRarity) }}>
                    {auction.fishName}
                  </h4>
                  <p>Raridade: {auction.fishRarity}</p>
                  <p>Valor Base: {auction.fishValue} coins</p>
                  {auction.fishMutation && (
                    <p className="mutation">
                      Mutação: {auction.fishMutation.name} 
                      (x{auction.fishMutation.multiplier})
                    </p>
                  )}
                </div>

                <div className="auction-info">
                  <p>Vendedor: {auction.sellerName}</p>
                  <p>Lance Atual: <strong>{auction.currentBid} coins</strong></p>
                  {auction.currentBidderName && (
                    <p>Maior Lance: {auction.currentBidderName}</p>
                  )}
                  <p>Termina em: {formatTimeRemaining(auction.endTime)}</p>
                </div>

                {auction.sellerId !== user.id && (
                  <div className="bid-section">
                    <input
                      type="number"
                      placeholder={`Mínimo: ${auction.currentBid + 1}`}
                      min={auction.currentBid + 1}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          const bidAmount = parseInt(e.target.value);
                          if (bidAmount > auction.currentBid) {
                            placeBid(auction.id, bidAmount);
                            e.target.value = '';
                          }
                        }
                      }}
                    />
                    <button
                      onClick={(e) => {
                        const input = e.target.previousElementSibling;
                        const bidAmount = parseInt(input.value);
                        if (bidAmount > auction.currentBid) {
                          placeBid(auction.id, bidAmount);
                          input.value = '';
                        }
                      }}
                    >
                      Dar Lance
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {!canCreateAuction && userFish.length === 0 && user.fish?.length > 0 && (
        <div className="cooldown-info">
          <p>⏰ Seus peixes precisam esperar 5 horas após nascer para ir ao leilão</p>
        </div>
      )}
    </div>
  );
};

export default AuctionSystem;