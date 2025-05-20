import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Define the character sheet schema
export const characterSheets = pgTable("character_sheets", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  race: text("race").notNull(),
  class: text("class").notNull(),
  level: integer("level").notNull().default(1),
  background: text("background").default(""),
  alignment: text("alignment").notNull().default("true-neutral"),
  experience: integer("experience").default(0),
  abilities: jsonb("abilities").notNull(),
  savingThrows: jsonb("saving_throws").notNull(),
  skills: jsonb("skills").notNull(),
  proficiencyBonus: integer("proficiency_bonus").notNull().default(2),
  inspiration: boolean("inspiration").default(false),
  armorClass: integer("armor_class").notNull().default(10),
  initiative: integer("initiative").default(0),
  speed: integer("speed").notNull().default(30),
  maxHitPoints: integer("max_hit_points").notNull().default(10),
  currentHitPoints: integer("current_hit_points").notNull().default(10),
  temporaryHitPoints: integer("temporary_hit_points").default(0),
  hitDiceType: text("hit_dice_type").notNull().default("d8"),
  maxHitDice: integer("max_hit_dice").notNull().default(1),
  currentHitDice: integer("current_hit_dice").notNull().default(1),
  deathSaves: jsonb("death_saves").notNull(),
  attacks: jsonb("attacks").notNull(),
  equipment: jsonb("equipment").notNull(),
  currency: jsonb("currency").notNull(),
  personalityTraits: text("personality_traits").default(""),
  ideals: text("ideals").default(""),
  bonds: text("bonds").default(""),
  flaws: text("flaws").default(""),
  features: jsonb("features").notNull(),
  spellcasting: jsonb("spellcasting").notNull(),
  spells: jsonb("spells").notNull(),
  notes: text("notes").default(""),
  userId: text("user_id"), // Optional for multi-user support
});

// Character Sheet interface
export interface CharacterSheet {
  id?: number;
  name: string;
  race: string;
  class: string;
  level: number;
  background: string;
  alignment: string;
  experience: number;
  abilities: {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
  };
  savingThrows: {
    strength: { proficient: boolean };
    dexterity: { proficient: boolean };
    constitution: { proficient: boolean };
    intelligence: { proficient: boolean };
    wisdom: { proficient: boolean };
    charisma: { proficient: boolean };
  };
  skills: {
    [key: string]: { proficient: boolean };
  };
  proficiencyBonus: number;
  inspiration: boolean;
  armorClass: number;
  initiative: number;
  speed: number;
  maxHitPoints: number;
  currentHitPoints: number;
  temporaryHitPoints: number;
  hitDiceType: string;
  maxHitDice: number;
  currentHitDice: number;
  deathSaves: {
    successes: boolean[];
    failures: boolean[];
  };
  attacks: {
    name: string;
    bonus: string;
    damage: string;
  }[];
  equipment: {
    name: string;
    quantity: number;
    weight?: string;
  }[];
  currency: {
    copper: number;
    silver: number;
    electrum: number;
    gold: number;
    platinum: number;
  };
  personalityTraits: string;
  ideals: string;
  bonds: string;
  flaws: string;
  features: {
    name: string;
    source: string;
    description: string;
    uses?: string;
  }[];
  spellcasting: {
    class: string;
    ability: string;
    spellSaveDC: number;
    spellAttackBonus: number;
    slots: {
      level1: number;
      level2: number;
      level3: number;
      level4: number;
      level5: number;
      level6: number;
      level7: number;
      level8: number;
      level9: number;
    };
    slotsUsed: {
      level1: number;
      level2: number;
      level3: number;
      level4: number;
      level5: number;
      level6: number;
      level7: number;
      level8: number;
      level9: number;
    };
  };
  spells: {
    id: string;
    name: string;
    level: number;
    castingTime: string;
    range: string;
    components: string;
    duration: string;
    description: string;
    prepared: boolean;
  }[];
  notes: string;
  userId?: string;
}

// Create insert schema using drizzle-zod
export const insertCharacterSheetSchema = createInsertSchema(characterSheets)
  .omit({ id: true });

// For type safety when inserting
export type InsertCharacterSheet = z.infer<typeof insertCharacterSheetSchema>;
export type Character = typeof characterSheets.$inferSelect;

// Default character sheet for new characters
export const defaultCharacterSheet: CharacterSheet = {
  name: 'New Character',
  race: 'human',
  class: 'fighter',
  level: 1,
  background: '',
  alignment: 'true-neutral',
  experience: 0,
  abilities: {
    strength: 10,
    dexterity: 10,
    constitution: 10,
    intelligence: 10,
    wisdom: 10,
    charisma: 10
  },
  savingThrows: {
    strength: { proficient: false },
    dexterity: { proficient: false },
    constitution: { proficient: false },
    intelligence: { proficient: false },
    wisdom: { proficient: false },
    charisma: { proficient: false }
  },
  skills: {
    acrobatics: { proficient: false },
    'animal-handling': { proficient: false },
    arcana: { proficient: false },
    athletics: { proficient: false },
    deception: { proficient: false },
    history: { proficient: false },
    insight: { proficient: false },
    intimidation: { proficient: false },
    investigation: { proficient: false },
    medicine: { proficient: false },
    nature: { proficient: false },
    perception: { proficient: false },
    performance: { proficient: false },
    persuasion: { proficient: false },
    religion: { proficient: false },
    'sleight-of-hand': { proficient: false },
    stealth: { proficient: false },
    survival: { proficient: false }
  },
  proficiencyBonus: 2,
  inspiration: false,
  armorClass: 10,
  initiative: 0,
  speed: 30,
  maxHitPoints: 10,
  currentHitPoints: 10,
  temporaryHitPoints: 0,
  hitDiceType: 'd8',
  maxHitDice: 1,
  currentHitDice: 1,
  deathSaves: {
    successes: [false, false, false],
    failures: [false, false, false]
  },
  attacks: [],
  equipment: [],
  currency: {
    copper: 0,
    silver: 0,
    electrum: 0,
    gold: 0,
    platinum: 0
  },
  personalityTraits: '',
  ideals: '',
  bonds: '',
  flaws: '',
  features: [],
  spellcasting: {
    class: 'none',
    ability: 'none',
    spellSaveDC: 0,
    spellAttackBonus: 0,
    slots: {
      level1: 0,
      level2: 0,
      level3: 0,
      level4: 0,
      level5: 0,
      level6: 0,
      level7: 0,
      level8: 0,
      level9: 0
    },
    slotsUsed: {
      level1: 0,
      level2: 0,
      level3: 0,
      level4: 0,
      level5: 0,
      level6: 0,
      level7: 0,
      level8: 0,
      level9: 0
    }
  },
  spells: [],
  notes: ''
};
