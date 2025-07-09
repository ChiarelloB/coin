import React, { useState, useEffect } from 'react';
import { fishTypes } from '../data/fish.js';
import { eggTypes } from '../data/eggs.js';
import { mutationTypes } from '../data/mutations.js';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState([]);
  const [auctions, setAuctions] = useState([]);
  const [newFish, setNewFish] = useState({
    name: '',
    rarity: 'comum',
    value: 0,
    color: '#000000'
  });
  const [newItem, setNewItem] = useState({
    name: '',
    type: 'food',
    effect: '',
    value: 0
  });

  useEffect(() => {
    // Carregar usuários reais do localStorage ou API
    loadUsers();
    loadAuctions();
  }, []);

  const loadUsers = () => {
    const savedUsers = JSON.parse(localStorage.getItem('cointofish_users') || '[]');
    setUsers(savedUsers);
  };

  const loadAuctions = () => {
    const savedAuctions = JSON.parse(localStorage.getItem('cointofish_auctions') || '[]');
    setAuctions(savedAuctions);
  };

  const handleAddFish = () => {
    if (!newFish.name || !newFish.value) {
      alert('Preencha todos os campos obrigatórios');
      return;
    }

    const fish = {
      id: Date.now(),
      ...newFish,
      value: parseInt(newFish.value)
    };

    // Adicionar à lista de peixes
    fishTypes.push(fish);
    
    setNewFish({
      name: '',
      rarity: 'comum',
      value: 0,
      color: '#000000'
    });

    alert('Peixe adicionado com sucesso!');
  };

  const handleAddItem = () => {
    if (!newItem.name || !newItem.effect) {
      alert('Preencha todos os campos obrigatórios');
      return;
    }

    const item = {
      id: Date.now(),
      ...newItem,
      value: parseInt(newItem.value)
    };

    // Salvar item no localStorage
    const items = JSON.parse(localStorage.getItem('cointofish_items') || '[]');
    items.push(item);
    localStorage.setItem('cointofish_items', JSON.stringify(items));

    setNewItem({
      name: '',
      type: 'food',
      effect: '',
      value: 0
    });

    alert('Item adicionado com sucesso!');
  };

  const deleteUser = (userId) => {
    if (window.confirm('Tem certeza que deseja deletar este usuário?')) {
      const updatedUsers = users.filter(user => user.id !== userId);
      setUsers(updatedUsers);
      localStorage.setItem('cointofish_users', JSON.stringify(updatedUsers));
    }
  };

  const deleteAuction = (auctionId) => {
    if (window.confirm('Tem certeza que deseja deletar este leilão?')) {
      const updatedAuctions = auctions.filter(auction => auction.id !== auctionId);
      setAuctions(updatedAuctions);
      localStorage.setItem('cointofish_auctions', JSON.stringify(updatedAuctions));
    }
  };

  const renderUsers = () => (
    <div className="admin-section">
      <h3>Usuários Registrados ({users.length})</h3>
      <div className="users-grid">
        {users.map(user => (
          <div key={user.id} className="user-card">
            <div className="user-info">
              <h4>{user.username}</h4>
              <p>Email: {user.email}</p>
              <p>Coins: {user.coins || 0}</p>
              <p>Peixes: {user.fish?.length || 0}</p>
              <p>Registrado: {new Date(user.createdAt).toLocaleDateString()}</p>
            </div>
            <button 
              className="delete-btn"
              onClick={() => deleteUser(user.id)}
            >
              Deletar
            </button>
          </div>
        ))}
        {users.length === 0 && (
          <p>Nenhum usuário registrado ainda.</p>
        )}
      </div>
    </div>
  );

  const renderFishManagement = () => (
    <div className="admin-section">
      <h3>Gerenciar Peixes</h3>
      
      <div className="add-form">
        <h4>Adicionar Novo Peixe</h4>
        <div className="form-group">
          <input
            type="text"
            placeholder="Nome do peixe"
            value={newFish.name}
            onChange={(e) => setNewFish({...newFish, name: e.target.value})}
          />
          <select
            value={newFish.rarity}
            onChange={(e) => setNewFish({...newFish, rarity: e.target.value})}
          >
            <option value="comum">Comum</option>
            <option value="incomum">Incomum</option>
            <option value="raro">Raro</option>
            <option value="épico">Épico</option>
            <option value="lendário">Lendário</option>
          </select>
          <input
            type="number"
            placeholder="Valor"
            value={newFish.value}
            onChange={(e) => setNewFish({...newFish, value: e.target.value})}
          />
          <input
            type="color"
            value={newFish.color}
            onChange={(e) => setNewFish({...newFish, color: e.target.value})}
          />
          <button onClick={handleAddFish}>Adicionar Peixe</button>
        </div>
      </div>

      <div className="fish-list">
        <h4>Peixes Existentes ({fishTypes.length})</h4>
        <div className="fish-grid">
          {fishTypes.map(fish => (
            <div key={fish.id} className="fish-card" style={{borderColor: fish.color}}>
              <h5>{fish.name}</h5>
              <p>Raridade: {fish.rarity}</p>
              <p>Valor: {fish.value} coins</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderItemManagement = () => (
    <div className="admin-section">
      <h3>Gerenciar Itens</h3>
      
      <div className="add-form">
        <h4>Adicionar Novo Item</h4>
        <div className="form-group">
          <input
            type="text"
            placeholder="Nome do item"
            value={newItem.name}
            onChange={(e) => setNewItem({...newItem, name: e.target.value})}
          />
          <select
            value={newItem.type}
            onChange={(e) => setNewItem({...newItem, type: e.target.value})}
          >
            <option value="food">Comida</option>
            <option value="decoration">Decoração</option>
            <option value="tool">Ferramenta</option>
            <option value="special">Especial</option>
          </select>
          <input
            type="text"
            placeholder="Efeito"
            value={newItem.effect}
            onChange={(e) => setNewItem({...newItem, effect: e.target.value})}
          />
          <input
            type="number"
            placeholder="Valor"
            value={newItem.value}
            onChange={(e) => setNewItem({...newItem, value: e.target.value})}
          />
          <button onClick={handleAddItem}>Adicionar Item</button>
        </div>
      </div>
    </div>
  );

  const renderAuctions = () => (
    <div className="admin-section">
      <h3>Leilões Ativos ({auctions.length})</h3>
      <div className="auctions-grid">
        {auctions.map(auction => (
          <div key={auction.id} className="auction-card">
            <div className="auction-info">
              <h4>{auction.fishName}</h4>
              <p>Vendedor: {auction.sellerName}</p>
              <p>Preço Inicial: {auction.startPrice} coins</p>
              <p>Lance Atual: {auction.currentBid} coins</p>
              <p>Termina: {new Date(auction.endTime).toLocaleString()}</p>
              <p>Status: {auction.status}</p>
            </div>
            <button 
              className="delete-btn"
              onClick={() => deleteAuction(auction.id)}
            >
              Remover
            </button>
          </div>
        ))}
        {auctions.length === 0 && (
          <p>Nenhum leilão ativo no momento.</p>
        )}
      </div>
    </div>
  );

  const renderStats = () => (
    <div className="admin-section">
      <h3>Estatísticas do Sistema</h3>
      <div className="stats-grid">
        <div className="stat-card">
          <h4>Tipos de Ovos</h4>
          <p>{eggTypes.length}</p>
        </div>
        <div className="stat-card">
          <h4>Tipos de Peixes</h4>
          <p>{fishTypes.length}</p>
        </div>
        <div className="stat-card">
          <h4>Tipos de Mutações</h4>
          <p>{mutationTypes.length}</p>
        </div>
        <div className="stat-card">
          <h4>Usuários Ativos</h4>
          <p>{users.length}</p>
        </div>
        <div className="stat-card">
          <h4>Leilões Ativos</h4>
          <p>{auctions.length}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h2>Painel de Administração</h2>
        <div className="admin-tabs">
          <button 
            className={activeTab === 'users' ? 'active' : ''}
            onClick={() => setActiveTab('users')}
          >
            Usuários
          </button>
          <button 
            className={activeTab === 'fish' ? 'active' : ''}
            onClick={() => setActiveTab('fish')}
          >
            Peixes
          </button>
          <button 
            className={activeTab === 'items' ? 'active' : ''}
            onClick={() => setActiveTab('items')}
          >
            Itens
          </button>
          <button 
            className={activeTab === 'auctions' ? 'active' : ''}
            onClick={() => setActiveTab('auctions')}
          >
            Leilões
          </button>
          <button 
            className={activeTab === 'stats' ? 'active' : ''}
            onClick={() => setActiveTab('stats')}
          >
            Estatísticas
          </button>
        </div>
      </div>

      <div className="admin-content">
        {activeTab === 'users' && renderUsers()}
        {activeTab === 'fish' && renderFishManagement()}
        {activeTab === 'items' && renderItemManagement()}
        {activeTab === 'auctions' && renderAuctions()}
        {activeTab === 'stats' && renderStats()}
      </div>
    </div>
  );
};

export default AdminPanel;