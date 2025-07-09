// 50 tipos de peixes com raridade
export const fishTypes = [
  // Peixes Comuns (20)
  { id: 1, name: "Peixe Dourado", rarity: "comum", value: 10, color: "#FFD700" },
  { id: 2, name: "Carpa", rarity: "comum", value: 8, color: "#CD853F" },
  { id: 3, name: "Tilápia", rarity: "comum", value: 12, color: "#A0A0A0" },
  { id: 4, name: "Bagre", rarity: "comum", value: 15, color: "#696969" },
  { id: 5, name: "Sardinha", rarity: "comum", value: 5, color: "#C0C0C0" },
  { id: 6, name: "Anchova", rarity: "comum", value: 7, color: "#B0B0B0" },
  { id: 7, name: "Lambari", rarity: "comum", value: 6, color: "#87CEEB" },
  { id: 8, name: "Traíra", rarity: "comum", value: 18, color: "#556B2F" },
  { id: 9, name: "Pacu", rarity: "comum", value: 20, color: "#8FBC8F" },
  { id: 10, name: "Pintado", rarity: "comum", value: 25, color: "#F5DEB3" },
  { id: 11, name: "Cascudo", rarity: "comum", value: 14, color: "#2F4F4F" },
  { id: 12, name: "Mandi", rarity: "comum", value: 16, color: "#708090" },
  { id: 13, name: "Piaba", rarity: "comum", value: 4, color: "#FFE4B5" },
  { id: 14, name: "Curimbatá", rarity: "comum", value: 22, color: "#DDA0DD" },
  { id: 15, name: "Dourado Pequeno", rarity: "comum", value: 30, color: "#DAA520" },
  { id: 16, name: "Piau", rarity: "comum", value: 13, color: "#F0E68C" },
  { id: 17, name: "Matrinxã", rarity: "comum", value: 28, color: "#CD5C5C" },
  { id: 18, name: "Piapara", rarity: "comum", value: 19, color: "#DEB887" },
  { id: 19, name: "Curimatã", rarity: "comum", value: 17, color: "#D2B48C" },
  { id: 20, name: "Piraputanga", rarity: "comum", value: 24, color: "#F4A460" },

  // Peixes Incomuns (15)
  { id: 21, name: "Tucunaré", rarity: "incomum", value: 45, color: "#228B22" },
  { id: 22, name: "Robalo", rarity: "incomum", value: 50, color: "#4682B4" },
  { id: 23, name: "Corvina", rarity: "incomum", value: 40, color: "#2F4F4F" },
  { id: 24, name: "Linguado", rarity: "incomum", value: 55, color: "#8B7355" },
  { id: 25, name: "Badejo", rarity: "incomum", value: 48, color: "#CD853F" },
  { id: 26, name: "Garoupa", rarity: "incomum", value: 60, color: "#A0522D" },
  { id: 27, name: "Salmão", rarity: "incomum", value: 70, color: "#FA8072" },
  { id: 28, name: "Truta", rarity: "incomum", value: 65, color: "#FFB6C1" },
  { id: 29, name: "Pirarucu Jovem", rarity: "incomum", value: 80, color: "#8B4513" },
  { id: 30, name: "Surubim", rarity: "incomum", value: 75, color: "#696969" },
  { id: 31, name: "Jaú", rarity: "incomum", value: 85, color: "#2F2F2F" },
  { id: 32, name: "Piranha", rarity: "incomum", value: 35, color: "#DC143C" },
  { id: 33, name: "Peacock Bass", rarity: "incomum", value: 90, color: "#FF6347" },
  { id: 34, name: "Tambaqui", rarity: "incomum", value: 55, color: "#8FBC8F" },
  { id: 35, name: "Peixe Espada", rarity: "incomum", value: 95, color: "#C0C0C0" },

  // Peixes Raros (10)
  { id: 36, name: "Atum", rarity: "raro", value: 150, color: "#191970" },
  { id: 37, name: "Marlim", rarity: "raro", value: 200, color: "#4169E1" },
  { id: 38, name: "Dourado Gigante", rarity: "raro", value: 180, color: "#FFD700" },
  { id: 39, name: "Pirarucu", rarity: "raro", value: 250, color: "#8B4513" },
  { id: 40, name: "Esturjão", rarity: "raro", value: 300, color: "#2F4F4F" },
  { id: 41, name: "Peixe Voador", rarity: "raro", value: 120, color: "#87CEEB" },
  { id: 42, name: "Mero", rarity: "raro", value: 220, color: "#556B2F" },
  { id: 43, name: "Peixe Anjo", rarity: "raro", value: 160, color: "#FFE4E1" },
  { id: 44, name: "Barracuda", rarity: "raro", value: 190, color: "#708090" },
  { id: 45, name: "Tubarão Bebê", rarity: "raro", value: 280, color: "#2F4F4F" },

  // Peixes Épicos (3)
  { id: 46, name: "Dragão Marinho", rarity: "épico", value: 500, color: "#8A2BE2" },
  { id: 47, name: "Peixe Cristal", rarity: "épico", value: 600, color: "#E0FFFF" },
  { id: 48, name: "Leviatã Jovem", rarity: "épico", value: 750, color: "#4B0082" },

  // Peixes Lendários (2)
  { id: 49, name: "Kraken Bebê", rarity: "lendário", value: 1000, color: "#8B008B" },
  { id: 50, name: "Fênix Aquática", rarity: "lendário", value: 1500, color: "#FF4500" }
];

export const getFishByRarity = (rarity) => {
  return fishTypes.filter(fish => fish.rarity === rarity);
};

export const getRandomFishByEgg = (eggRarity) => {
  const rarityMapping = {
    comum: ["comum"],
    incomum: ["comum", "incomum"],
    raro: ["comum", "incomum", "raro"],
    épico: ["incomum", "raro", "épico"],
    lendário: ["raro", "épico", "lendário"],
    mítico: ["épico", "lendário"],
    divino: ["lendário"]
  };

  const possibleRarities = rarityMapping[eggRarity] || ["comum"];
  const availableFish = fishTypes.filter(fish => 
    possibleRarities.includes(fish.rarity)
  );

  return availableFish[Math.floor(Math.random() * availableFish.length)];
};