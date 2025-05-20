export type CharacterClass = {
  id: string;
  name: string;
  hitDice: string;
  primaryAbility: string[];
  savingThrowProficiencies: string[];
  armorProficiencies: string[];
  weaponProficiencies: string[];
  toolProficiencies: string[];
  skillChoices: number;
  skillOptions: string[];
};

export const characterClasses: CharacterClass[] = [
  {
    id: "barbarian",
    name: "Barbarian",
    hitDice: "d12",
    primaryAbility: ["strength"],
    savingThrowProficiencies: ["strength", "constitution"],
    armorProficiencies: ["light", "medium", "shields"],
    weaponProficiencies: ["simple", "martial"],
    toolProficiencies: [],
    skillChoices: 2,
    skillOptions: ["animal-handling", "athletics", "intimidation", "nature", "perception", "survival"]
  },
  {
    id: "bard",
    name: "Bard",
    hitDice: "d8",
    primaryAbility: ["charisma"],
    savingThrowProficiencies: ["dexterity", "charisma"],
    armorProficiencies: ["light"],
    weaponProficiencies: ["simple", "hand crossbows", "longswords", "rapiers", "shortswords"],
    toolProficiencies: ["musical instruments (three of your choice)"],
    skillChoices: 3,
    skillOptions: ["athletics", "acrobatics", "sleight-of-hand", "stealth", "arcana", "history", "investigation", "nature", "religion", "animal-handling", "insight", "medicine", "perception", "survival", "deception", "intimidation", "performance", "persuasion"]
  },
  {
    id: "cleric",
    name: "Cleric",
    hitDice: "d8",
    primaryAbility: ["wisdom"],
    savingThrowProficiencies: ["wisdom", "charisma"],
    armorProficiencies: ["light", "medium", "shields"],
    weaponProficiencies: ["simple"],
    toolProficiencies: [],
    skillChoices: 2,
    skillOptions: ["history", "insight", "medicine", "persuasion", "religion"]
  },
  {
    id: "druid",
    name: "Druid",
    hitDice: "d8",
    primaryAbility: ["wisdom"],
    savingThrowProficiencies: ["intelligence", "wisdom"],
    armorProficiencies: ["light", "medium", "shields"],
    weaponProficiencies: ["clubs", "daggers", "darts", "javelins", "maces", "quarterstaffs", "scimitars", "sickles", "slings", "spears"],
    toolProficiencies: ["herbalism kit"],
    skillChoices: 2,
    skillOptions: ["arcana", "animal-handling", "insight", "medicine", "nature", "perception", "religion", "survival"]
  },
  {
    id: "fighter",
    name: "Fighter",
    hitDice: "d10",
    primaryAbility: ["strength", "dexterity"],
    savingThrowProficiencies: ["strength", "constitution"],
    armorProficiencies: ["light", "medium", "heavy", "shields"],
    weaponProficiencies: ["simple", "martial"],
    toolProficiencies: [],
    skillChoices: 2,
    skillOptions: ["acrobatics", "animal-handling", "athletics", "history", "insight", "intimidation", "perception", "survival"]
  },
  {
    id: "monk",
    name: "Monk",
    hitDice: "d8",
    primaryAbility: ["dexterity", "wisdom"],
    savingThrowProficiencies: ["strength", "dexterity"],
    armorProficiencies: [],
    weaponProficiencies: ["simple", "shortswords"],
    toolProficiencies: ["one type of artisan's tools or one musical instrument"],
    skillChoices: 2,
    skillOptions: ["acrobatics", "athletics", "history", "insight", "religion", "stealth"]
  },
  {
    id: "paladin",
    name: "Paladin",
    hitDice: "d10",
    primaryAbility: ["strength", "charisma"],
    savingThrowProficiencies: ["wisdom", "charisma"],
    armorProficiencies: ["light", "medium", "heavy", "shields"],
    weaponProficiencies: ["simple", "martial"],
    toolProficiencies: [],
    skillChoices: 2,
    skillOptions: ["athletics", "insight", "intimidation", "medicine", "persuasion", "religion"]
  },
  {
    id: "ranger",
    name: "Ranger",
    hitDice: "d10",
    primaryAbility: ["dexterity", "wisdom"],
    savingThrowProficiencies: ["strength", "dexterity"],
    armorProficiencies: ["light", "medium", "shields"],
    weaponProficiencies: ["simple", "martial"],
    toolProficiencies: [],
    skillChoices: 3,
    skillOptions: ["animal-handling", "athletics", "insight", "investigation", "nature", "perception", "stealth", "survival"]
  },
  {
    id: "rogue",
    name: "Rogue",
    hitDice: "d8",
    primaryAbility: ["dexterity"],
    savingThrowProficiencies: ["dexterity", "intelligence"],
    armorProficiencies: ["light"],
    weaponProficiencies: ["simple", "hand crossbows", "longswords", "rapiers", "shortswords"],
    toolProficiencies: ["thieves' tools"],
    skillChoices: 4,
    skillOptions: ["acrobatics", "athletics", "deception", "insight", "intimidation", "investigation", "perception", "performance", "persuasion", "sleight-of-hand", "stealth"]
  },
  {
    id: "sorcerer",
    name: "Sorcerer",
    hitDice: "d6",
    primaryAbility: ["charisma"],
    savingThrowProficiencies: ["constitution", "charisma"],
    armorProficiencies: [],
    weaponProficiencies: ["daggers", "darts", "slings", "quarterstaffs", "light crossbows"],
    toolProficiencies: [],
    skillChoices: 2,
    skillOptions: ["arcana", "deception", "insight", "intimidation", "persuasion", "religion"]
  },
  {
    id: "warlock",
    name: "Warlock",
    hitDice: "d8",
    primaryAbility: ["charisma"],
    savingThrowProficiencies: ["wisdom", "charisma"],
    armorProficiencies: ["light"],
    weaponProficiencies: ["simple"],
    toolProficiencies: [],
    skillChoices: 2,
    skillOptions: ["arcana", "deception", "history", "intimidation", "investigation", "nature", "religion"]
  },
  {
    id: "wizard",
    name: "Wizard",
    hitDice: "d6",
    primaryAbility: ["intelligence"],
    savingThrowProficiencies: ["intelligence", "wisdom"],
    armorProficiencies: [],
    weaponProficiencies: ["daggers", "darts", "slings", "quarterstaffs", "light crossbows"],
    toolProficiencies: [],
    skillChoices: 2,
    skillOptions: ["arcana", "history", "insight", "investigation", "medicine", "religion"]
  }
];

export function getClassById(id: string): CharacterClass | undefined {
  return characterClasses.find(c => c.id === id);
}
