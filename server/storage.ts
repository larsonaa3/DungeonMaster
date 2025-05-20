import { CharacterSheet, defaultCharacterSheet } from "@shared/schema";

// Interface for character storage operations
export interface IStorage {
  getUser(id: number): Promise<any | undefined>;
  getUserByUsername(username: string): Promise<any | undefined>;
  createUser(user: any): Promise<any>;
  
  // Character sheet operations
  getCharacterSheet(id: number): Promise<CharacterSheet | undefined>;
  getAllCharacterSheets(): Promise<CharacterSheet[]>;
  createCharacterSheet(character: CharacterSheet): Promise<CharacterSheet>;
  updateCharacterSheet(id: number, character: Partial<CharacterSheet>): Promise<CharacterSheet | undefined>;
  deleteCharacterSheet(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, any>;
  private characterSheets: Map<number, CharacterSheet>;
  private userId: number;
  private characterId: number;

  constructor() {
    this.users = new Map();
    this.characterSheets = new Map();
    this.userId = 1;
    this.characterId = 1;

    // Initialize with a default character
    this.createCharacterSheet({
      ...defaultCharacterSheet,
      name: "Thorian Stormbreaker",
      race: "dwarf",
      class: "barbarian",
      level: 5,
      background: "Soldier",
      alignment: "chaotic-good",
      experience: 6500,
      abilities: {
        strength: 16,
        dexterity: 14,
        constitution: 16,
        intelligence: 10,
        wisdom: 12,
        charisma: 8
      },
      savingThrows: {
        strength: { proficient: true },
        dexterity: { proficient: false },
        constitution: { proficient: true },
        intelligence: { proficient: false },
        wisdom: { proficient: false },
        charisma: { proficient: false }
      },
      skills: {
        acrobatics: { proficient: false },
        'animal-handling': { proficient: false },
        arcana: { proficient: false },
        athletics: { proficient: true },
        deception: { proficient: false },
        history: { proficient: false },
        insight: { proficient: true },
        intimidation: { proficient: true },
        investigation: { proficient: false },
        medicine: { proficient: false },
        nature: { proficient: false },
        perception: { proficient: true },
        performance: { proficient: false },
        persuasion: { proficient: false },
        religion: { proficient: false },
        'sleight-of-hand': { proficient: false },
        stealth: { proficient: false },
        survival: { proficient: true }
      },
      proficiencyBonus: 3,
      armorClass: 16,
      speed: 25,
      maxHitPoints: 45,
      currentHitPoints: 38,
      hitDiceType: 'd12',
      maxHitDice: 5,
      currentHitDice: 3,
      attacks: [
        { name: "Greataxe", bonus: "+6", damage: "1d12+3 slashing" },
        { name: "Handaxe", bonus: "+6", damage: "1d6+3 slashing" },
        { name: "Javelin", bonus: "+6", damage: "1d6+3 piercing" }
      ],
      equipment: [
        { name: "Greataxe", quantity: 1, weight: "7 lb." },
        { name: "Explorer's Pack", quantity: 1, weight: "10 lb." },
        { name: "Javelins", quantity: 4, weight: "8 lb." },
        { name: "Chain Mail", quantity: 1, weight: "55 lb." },
        { name: "Backpack", quantity: 1, weight: "5 lb." }
      ],
      currency: {
        copper: 15,
        silver: 30,
        electrum: 0,
        gold: 75,
        platinum: 0
      },
      personalityTraits: "I am always polite and respectful. But when battle starts, I become a force of nature.",
      ideals: "Honor. The way I fight is a reflection of who I am. (Lawful)",
      bonds: "I fight for those who cannot fight for themselves.",
      flaws: "I have trouble trusting strangers. Those who aren't part of my tribe might be waiting to stab me in the back.",
      features: [
        {
          name: "Rage",
          source: "Barbarian",
          description: "In battle, you fight with primal ferocity. On your turn, you can enter a rage as a bonus action. While raging, you gain advantage on STR checks and STR saving throws, +2 damage with melee weapons using STR, and resistance to bludgeoning, piercing, and slashing damage.",
          uses: "3/day"
        },
        {
          name: "Unarmored Defense",
          source: "Barbarian",
          description: "While you are not wearing any armor, your AC equals 10 + your Dexterity modifier + your Constitution modifier."
        },
        {
          name: "Reckless Attack",
          source: "Barbarian",
          description: "You can throw aside all concern for defense to attack with fierce desperation. When you make your first attack on your turn, you can decide to attack recklessly, giving you advantage on melee weapon attack rolls using Strength during this turn, but attack rolls against you have advantage until your next turn."
        },
        {
          name: "Darkvision",
          source: "Dwarf",
          description: "You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light."
        },
        {
          name: "Dwarven Resilience",
          source: "Dwarf",
          description: "You have advantage on saving throws against poison, and you have resistance against poison damage."
        }
      ]
    });
  }

  async getUser(id: number): Promise<any | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<any | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(user: any): Promise<any> {
    const id = this.userId++;
    const newUser = { ...user, id };
    this.users.set(id, newUser);
    return newUser;
  }

  // Character Sheet Methods
  async getCharacterSheet(id: number): Promise<CharacterSheet | undefined> {
    return this.characterSheets.get(id);
  }

  async getAllCharacterSheets(): Promise<CharacterSheet[]> {
    return Array.from(this.characterSheets.values());
  }

  async createCharacterSheet(character: CharacterSheet): Promise<CharacterSheet> {
    const id = this.characterId++;
    const newCharacter: CharacterSheet = { ...character, id };
    this.characterSheets.set(id, newCharacter);
    return newCharacter;
  }

  async updateCharacterSheet(id: number, updates: Partial<CharacterSheet>): Promise<CharacterSheet | undefined> {
    const character = this.characterSheets.get(id);
    if (!character) return undefined;

    const updatedCharacter = { ...character, ...updates };
    this.characterSheets.set(id, updatedCharacter);
    return updatedCharacter;
  }

  async deleteCharacterSheet(id: number): Promise<boolean> {
    return this.characterSheets.delete(id);
  }
}

export const storage = new MemStorage();
