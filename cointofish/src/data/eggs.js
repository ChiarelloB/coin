// Tipos de ovos com raridade e RNG
export const eggTypes = [
  {
    id: 1,
    name: "Ovo Comum",
    rarity: "comum",
    rarityWeight: 60,
    hatchTime: 30000, // 30 segundos
    color: "#8B4513",
    description: "Um ovo básico encontrado em águas rasas"
  },
  {
    id: 2,
    name: "Ovo Tropical",
    rarity: "comum",
    rarityWeight: 50,
    hatchTime: 45000,
    color: "#FF6B35",
    description: "Ovo de águas tropicais quentes"
  },
  {
    id: 3,
    name: "Ovo Cristalino",
    rarity: "incomum",
    rarityWeight: 25,
    hatchTime: 60000, // 1 minuto
    color: "#87CEEB",
    description: "Ovo translúcido de águas cristalinas"
  },
  {
    id: 4,
    name: "Ovo Dourado",
    rarity: "raro",
    rarityWeight: 10,
    hatchTime: 120000, // 2 minutos
    color: "#FFD700",
    description: "Ovo precioso com brilho dourado"
  },
  {
    id: 5,
    name: "Ovo de Pérola",
    rarity: "raro",
    rarityWeight: 8,
    hatchTime: 180000, // 3 minutos
    color: "#F0F8FF",
    description: "Ovo nacarado extremamente raro"
  },
  {
    id: 6,
    name: "Ovo Sombrio",
    rarity: "épico",
    rarityWeight: 4,
    hatchTime: 300000, // 5 minutos
    color: "#2F2F2F",
    description: "Ovo misterioso das profundezas"
  },
  {
    id: 7,
    name: "Ovo Arco-íris",
    rarity: "épico",
    rarityWeight: 3,
    hatchTime: 420000, // 7 minutos
    color: "linear-gradient(45deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3)",
    description: "Ovo multicolorido extremamente raro"
  },
  {
    id: 8,
    name: "Ovo Lendário",
    rarity: "lendário",
    rarityWeight: 2,
    hatchTime: 600000, // 10 minutos
    color: "#9932CC",
    description: "Ovo de poder lendário"
  },
  {
    id: 9,
    name: "Ovo Mítico",
    rarity: "mítico",
    rarityWeight: 1,
    hatchTime: 900000, // 15 minutos
    color: "#FF1493",
    description: "Ovo de origem mítica e poder ancestral"
  },
  {
    id: 10,
    name: "Ovo Divino",
    rarity: "divino",
    rarityWeight: 0.5,
    hatchTime: 1800000, // 30 minutos
    color: "#FFFFFF",
    description: "O mais raro de todos os ovos, de origem divina"
  }
];

export const getRarityColor = (rarity) => {
  const colors = {
    comum: "#808080",
    incomum: "#00FF00",
    raro: "#0080FF",
    épico: "#8000FF",
    lendário: "#FF8000",
    mítico: "#FF0080",
    divino: "#FFFFFF"
  };
  return colors[rarity] || "#808080";
};

export const getRandomEgg = () => {
  const totalWeight = eggTypes.reduce((sum, egg) => sum + egg.rarityWeight, 0);
  let random = Math.random() * totalWeight;
  
  for (const egg of eggTypes) {
    random -= egg.rarityWeight;
    if (random <= 0) {
      return egg;
    }
  }
  
  return eggTypes[0]; // fallback
};