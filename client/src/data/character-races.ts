export type CharacterRace = {
  id: string;
  name: string;
  abilityScoreIncrease: { [key: string]: number };
  speed: number;
  traits: string[];
  subraces?: { id: string; name: string; abilityScoreIncrease: { [key: string]: number }; traits: string[] }[];
};

export const characterRaces: CharacterRace[] = [
  {
    id: "dwarf",
    name: "Dwarf",
    abilityScoreIncrease: { constitution: 2 },
    speed: 25,
    traits: ["Darkvision", "Dwarven Resilience", "Dwarven Combat Training", "Stonecunning"],
    subraces: [
      {
        id: "hill-dwarf",
        name: "Hill Dwarf",
        abilityScoreIncrease: { wisdom: 1 },
        traits: ["Dwarven Toughness"]
      },
      {
        id: "mountain-dwarf",
        name: "Mountain Dwarf",
        abilityScoreIncrease: { strength: 2 },
        traits: ["Dwarven Armor Training"]
      }
    ]
  },
  {
    id: "elf",
    name: "Elf",
    abilityScoreIncrease: { dexterity: 2 },
    speed: 30,
    traits: ["Darkvision", "Keen Senses", "Fey Ancestry", "Trance"],
    subraces: [
      {
        id: "high-elf",
        name: "High Elf",
        abilityScoreIncrease: { intelligence: 1 },
        traits: ["Elf Weapon Training", "Cantrip", "Extra Language"]
      },
      {
        id: "wood-elf",
        name: "Wood Elf",
        abilityScoreIncrease: { wisdom: 1 },
        traits: ["Elf Weapon Training", "Fleet of Foot", "Mask of the Wild"]
      },
      {
        id: "dark-elf",
        name: "Dark Elf (Drow)",
        abilityScoreIncrease: { charisma: 1 },
        traits: ["Superior Darkvision", "Drow Magic", "Drow Weapon Training", "Sunlight Sensitivity"]
      }
    ]
  },
  {
    id: "halfling",
    name: "Halfling",
    abilityScoreIncrease: { dexterity: 2 },
    speed: 25,
    traits: ["Lucky", "Brave", "Halfling Nimbleness"],
    subraces: [
      {
        id: "lightfoot-halfling",
        name: "Lightfoot Halfling",
        abilityScoreIncrease: { charisma: 1 },
        traits: ["Naturally Stealthy"]
      },
      {
        id: "stout-halfling",
        name: "Stout Halfling",
        abilityScoreIncrease: { constitution: 1 },
        traits: ["Stout Resilience"]
      }
    ]
  },
  {
    id: "human",
    name: "Human",
    abilityScoreIncrease: { 
      strength: 1, 
      dexterity: 1, 
      constitution: 1, 
      intelligence: 1, 
      wisdom: 1, 
      charisma: 1 
    },
    speed: 30,
    traits: ["Extra Language"]
  },
  {
    id: "dragonborn",
    name: "Dragonborn",
    abilityScoreIncrease: { strength: 2, charisma: 1 },
    speed: 30,
    traits: ["Draconic Ancestry", "Breath Weapon", "Damage Resistance"]
  },
  {
    id: "gnome",
    name: "Gnome",
    abilityScoreIncrease: { intelligence: 2 },
    speed: 25,
    traits: ["Darkvision", "Gnome Cunning"],
    subraces: [
      {
        id: "forest-gnome",
        name: "Forest Gnome",
        abilityScoreIncrease: { dexterity: 1 },
        traits: ["Natural Illusionist", "Speak with Small Beasts"]
      },
      {
        id: "rock-gnome",
        name: "Rock Gnome",
        abilityScoreIncrease: { constitution: 1 },
        traits: ["Artificer's Lore", "Tinker"]
      }
    ]
  },
  {
    id: "half-elf",
    name: "Half-Elf",
    abilityScoreIncrease: { charisma: 2 }, // Plus two other ability scores of your choice increase by 1
    speed: 30,
    traits: ["Darkvision", "Fey Ancestry", "Skill Versatility"]
  },
  {
    id: "half-orc",
    name: "Half-Orc",
    abilityScoreIncrease: { strength: 2, constitution: 1 },
    speed: 30,
    traits: ["Darkvision", "Menacing", "Relentless Endurance", "Savage Attacks"]
  },
  {
    id: "tiefling",
    name: "Tiefling",
    abilityScoreIncrease: { intelligence: 1, charisma: 2 },
    speed: 30,
    traits: ["Darkvision", "Hellish Resistance", "Infernal Legacy"]
  }
];

export function getRaceById(id: string): CharacterRace | undefined {
  return characterRaces.find(r => r.id === id);
}
