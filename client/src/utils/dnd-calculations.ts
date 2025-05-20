import { CharacterSheet } from "@shared/schema";

/**
 * Calculate ability score modifier
 */
export function getAbilityModifier(score: number): number {
  return Math.floor((score - 10) / 2);
}

/**
 * Get modifier with sign (e.g., "+3" or "-1")
 */
export function getModifierString(score: number): string {
  const modifier = getAbilityModifier(score);
  return modifier >= 0 ? `+${modifier}` : `${modifier}`;
}

/**
 * Calculate a character's proficiency bonus based on level
 */
export function getProficiencyBonus(level: number): number {
  return Math.ceil(level / 4) + 1;
}

/**
 * Calculate saving throw modifier
 */
export function getSavingThrowModifier(
  ability: string, 
  abilityScores: CharacterSheet["abilities"], 
  proficient: boolean, 
  proficiencyBonus: number
): number {
  const abilityScore = abilityScores[ability as keyof typeof abilityScores] || 10;
  const abilityModifier = getAbilityModifier(abilityScore);
  return proficient ? abilityModifier + proficiencyBonus : abilityModifier;
}

/**
 * Calculate skill modifier
 */
export function getSkillModifier(
  ability: string,
  abilityScores: CharacterSheet["abilities"],
  proficient: boolean,
  proficiencyBonus: number,
  expertise: boolean = false
): number {
  const abilityScore = abilityScores[ability as keyof typeof abilityScores] || 10;
  const abilityModifier = getAbilityModifier(abilityScore);
  
  if (proficient) {
    return abilityModifier + (expertise ? proficiencyBonus * 2 : proficiencyBonus);
  }
  
  return abilityModifier;
}

/**
 * Calculate passive perception
 */
export function getPassivePerception(
  wisdomScore: number,
  proficient: boolean,
  proficiencyBonus: number
): number {
  const wisdomModifier = getAbilityModifier(wisdomScore);
  return 10 + wisdomModifier + (proficient ? proficiencyBonus : 0);
}

/**
 * Calculate spell save DC
 */
export function getSpellSaveDC(
  spellcastingAbility: string,
  abilityScores: CharacterSheet["abilities"],
  proficiencyBonus: number
): number {
  const abilityScore = abilityScores[spellcastingAbility as keyof typeof abilityScores] || 10;
  const abilityModifier = getAbilityModifier(abilityScore);
  return 8 + abilityModifier + proficiencyBonus;
}

/**
 * Calculate spell attack bonus
 */
export function getSpellAttackBonus(
  spellcastingAbility: string,
  abilityScores: CharacterSheet["abilities"],
  proficiencyBonus: number
): number {
  const abilityScore = abilityScores[spellcastingAbility as keyof typeof abilityScores] || 10;
  const abilityModifier = getAbilityModifier(abilityScore);
  return abilityModifier + proficiencyBonus;
}

/**
 * Calculate initiative bonus (typically just DEX modifier)
 */
export function getInitiativeBonus(dexterityScore: number): number {
  return getAbilityModifier(dexterityScore);
}

/**
 * Calculate AC based on equipment and abilities
 * (This is simplified; full calculation would need to consider armor worn, shield, etc.)
 */
export function getArmorClass(
  dexterityScore: number,
  constitutionScore?: number,
  armor?: string
): number {
  const dexMod = getAbilityModifier(dexterityScore);
  
  // Unarmored
  if (!armor) {
    return 10 + dexMod;
  }
  
  // Unarmored Defense (Barbarian)
  if (armor === "unarmored-barbarian" && constitutionScore) {
    const conMod = getAbilityModifier(constitutionScore);
    return 10 + dexMod + conMod;
  }
  
  // Other armor types would need specific calculations
  
  return 10 + dexMod; // Default
}

/**
 * Calculate carrying capacity
 */
export function getCarryingCapacity(strengthScore: number): number {
  return strengthScore * 15;
}

/**
 * Calculate a character's max hit points
 */
export function getMaxHitPoints(
  level: number,
  hitDice: string,
  constitutionScore: number
): number {
  const conModifier = getAbilityModifier(constitutionScore);
  let maxDiceValue = 0;
  
  switch(hitDice) {
    case "d6": maxDiceValue = 6; break;
    case "d8": maxDiceValue = 8; break;
    case "d10": maxDiceValue = 10; break;
    case "d12": maxDiceValue = 12; break;
    default: maxDiceValue = 8;
  }
  
  // First level gets max HP
  return maxDiceValue + conModifier + ((level - 1) * (Math.ceil(maxDiceValue / 2) + conModifier));
}
