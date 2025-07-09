// 50 tipos de mutações
export const mutationTypes = [
  // Mutações Comuns (25)
  { id: 1, name: "Escamas Douradas", rarity: "comum", multiplier: 1.2, color: "#FFD700" },
  { id: 2, name: "Nadadeiras Grandes", rarity: "comum", multiplier: 1.15, color: "#87CEEB" },
  { id: 3, name: "Olhos Grandes", rarity: "comum", multiplier: 1.1, color: "#FF6347" },
  { id: 4, name: "Cauda Longa", rarity: "comum", multiplier: 1.25, color: "#32CD32" },
  { id: 5, name: "Listras Coloridas", rarity: "comum", multiplier: 1.18, color: "#FF69B4" },
  { id: 6, name: "Pontos Brilhantes", rarity: "comum", multiplier: 1.12, color: "#00CED1" },
  { id: 7, name: "Barbatanas Duplas", rarity: "comum", multiplier: 1.22, color: "#9370DB" },
  { id: 8, name: "Escamas Metálicas", rarity: "comum", multiplier: 1.16, color: "#C0C0C0" },
  { id: 9, name: "Brilho Suave", rarity: "comum", multiplier: 1.14, color: "#F0E68C" },
  { id: 10, name: "Padrão Zebra", rarity: "comum", multiplier: 1.19, color: "#000000" },
  { id: 11, name: "Nadadeira Colorida", rarity: "comum", multiplier: 1.13, color: "#FF1493" },
  { id: 12, name: "Escamas Iridescentes", rarity: "comum", multiplier: 1.17, color: "#7FFFD4" },
  { id: 13, name: "Cauda Bifurcada", rarity: "comum", multiplier: 1.21, color: "#DDA0DD" },
  { id: 14, name: "Olhos Coloridos", rarity: "comum", multiplier: 1.11, color: "#FF4500" },
  { id: 15, name: "Manchas Circulares", rarity: "comum", multiplier: 1.15, color: "#20B2AA" },
  { id: 16, name: "Borda Dourada", rarity: "comum", multiplier: 1.23, color: "#DAA520" },
  { id: 17, name: "Padrão Mosaico", rarity: "comum", multiplier: 1.18, color: "#8B4513" },
  { id: 18, name: "Escamas Translúcidas", rarity: "comum", multiplier: 1.14, color: "#F5F5DC" },
  { id: 19, name: "Nadadeiras Longas", rarity: "comum", multiplier: 1.20, color: "#98FB98" },
  { id: 20, name: "Brilho Pérola", rarity: "comum", multiplier: 1.16, color: "#FFF8DC" },
  { id: 21, name: "Padrão Ondulado", rarity: "comum", multiplier: 1.12, color: "#4682B4" },
  { id: 22, name: "Escamas Rugosas", rarity: "comum", multiplier: 1.17, color: "#A0522D" },
  { id: 23, name: "Cauda Leque", rarity: "comum", multiplier: 1.19, color: "#FF6B6B" },
  { id: 24, name: "Olhos Cristalinos", rarity: "comum", multiplier: 1.13, color: "#E0FFFF" },
  { id: 25, name: "Manchas Simétricas", rarity: "comum", multiplier: 1.15, color: "#DEB887" },

  // Mutações Incomuns (15)
  { id: 26, name: "Aura Brilhante", rarity: "incomum", multiplier: 1.5, color: "#FFFF00" },
  { id: 27, name: "Escamas Cristalinas", rarity: "incomum", multiplier: 1.45, color: "#E6E6FA" },
  { id: 28, name: "Nadadeiras Etéreas", rarity: "incomum", multiplier: 1.4, color: "#B0E0E6" },
  { id: 29, name: "Olhos Luminosos", rarity: "incomum", multiplier: 1.35, color: "#00FF7F" },
  { id: 30, name: "Cauda Espiral", rarity: "incomum", multiplier: 1.55, color: "#FF7F50" },
  { id: 31, name: "Padrão Galáctico", rarity: "incomum", multiplier: 1.42, color: "#483D8B" },
  { id: 32, name: "Escamas Flamejantes", rarity: "incomum", multiplier: 1.48, color: "#FF4500" },
  { id: 33, name: "Brilho Elétrico", rarity: "incomum", multiplier: 1.38, color: "#00BFFF" },
  { id: 34, name: "Nadadeiras Fantasma", rarity: "incomum", multiplier: 1.52, color: "#F0F8FF" },
  { id: 35, name: "Padrão Fractal", rarity: "incomum", multiplier: 1.46, color: "#9932CC" },
  { id: 36, name: "Escamas Prismáticas", rarity: "incomum", multiplier: 1.44, color: "#FF69B4" },
  { id: 37, name: "Aura Gelada", rarity: "incomum", multiplier: 1.41, color: "#B0C4DE" },
  { id: 38, name: "Cauda Dupla", rarity: "incomum", multiplier: 1.49, color: "#32CD32" },
  { id: 39, name: "Olhos Místicos", rarity: "incomum", multiplier: 1.37, color: "#8A2BE2" },
  { id: 40, name: "Padrão Temporal", rarity: "incomum", multiplier: 1.53, color: "#FF1493" },

  // Mutações Raras (7)
  { id: 41, name: "Forma Espectral", rarity: "raro", multiplier: 2.0, color: "#9370DB" },
  { id: 42, name: "Essência Elemental", rarity: "raro", multiplier: 2.2, color: "#FF6347" },
  { id: 43, name: "Poder Ancestral", rarity: "raro", multiplier: 1.8, color: "#DAA520" },
  { id: 44, name: "Energia Cósmica", rarity: "raro", multiplier: 2.1, color: "#4169E1" },
  { id: 45, name: "Alma Cristalizada", rarity: "raro", multiplier: 1.9, color: "#E0FFFF" },
  { id: 46, name: "Chama Eterna", rarity: "raro", multiplier: 2.3, color: "#FF4500" },
  { id: 47, name: "Vento Divino", rarity: "raro", multiplier: 2.0, color: "#87CEEB" },

  // Mutações Épicas (2)
  { id: 48, name: "Transcendência", rarity: "épico", multiplier: 3.0, color: "#FFD700" },
  { id: 49, name: "Poder Primordial", rarity: "épico", multiplier: 3.5, color: "#8B008B" },

  // Mutação Lendária (1)
  { id: 50, name: "Essência Divina", rarity: "lendário", multiplier: 5.0, color: "#FFFFFF" }
];

export const getRandomMutation = (fishRarity) => {
  const mutationChance = {
    comum: 0.1,      // 10% chance
    incomum: 0.15,   // 15% chance
    raro: 0.25,      // 25% chance
    épico: 0.4,      // 40% chance
    lendário: 0.6    // 60% chance
  };

  if (Math.random() > (mutationChance[fishRarity] || 0.1)) {
    return null; // Sem mutação
  }

  const rarityWeights = {
    comum: { comum: 70, incomum: 25, raro: 4, épico: 1, lendário: 0 },
    incomum: { comum: 50, incomum: 35, raro: 12, épico: 2.5, lendário: 0.5 },
    raro: { comum: 30, incomum: 40, raro: 25, épico: 4.5, lendário: 0.5 },
    épico: { comum: 20, incomum: 30, raro: 35, épico: 14, lendário: 1 },
    lendário: { comum: 10, incomum: 20, raro: 40, épico: 25, lendário: 5 }
  };

  const weights = rarityWeights[fishRarity] || rarityWeights.comum;
  const totalWeight = Object.values(weights).reduce((sum, weight) => sum + weight, 0);
  let random = Math.random() * totalWeight;

  for (const [rarity, weight] of Object.entries(weights)) {
    random -= weight;
    if (random <= 0) {
      const availableMutations = mutationTypes.filter(m => m.rarity === rarity);
      return availableMutations[Math.floor(Math.random() * availableMutations.length)];
    }
  }

  return null;
};