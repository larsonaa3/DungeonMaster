import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CharacterSheet } from '@shared/schema';
import { getAbilityModifier, getProficiencyBonus } from '../utils/dnd-calculations';
import { apiRequest } from '../lib/queryClient';

// Define the store state interface
interface CharacterState {
  character: CharacterSheet | null;
  activeTab: string;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setCharacter: (character: CharacterSheet) => void;
  updateCharacter: (updates: Partial<CharacterSheet>) => void;
  saveCharacter: () => Promise<void>;
  loadCharacter: (id: number) => Promise<void>;
  createNewCharacter: () => void;
  setActiveTab: (tab: string) => void;
  
  // Ability Score Related
  updateAbilityScore: (ability: keyof CharacterSheet['abilities'], value: number) => void;
  
  // Combat Related
  updateHitPoints: (current: number) => void;
  updateTemporaryHitPoints: (temp: number) => void;
  updateHitDice: (current: number) => void;
  updateDeathSave: (type: 'success' | 'failure', index: number, value: boolean) => void;
  
  // Equipment Related
  addEquipment: (item: { name: string; quantity: number; weight?: string }) => void;
  updateEquipment: (index: number, updates: Partial<{ name: string; quantity: number; weight?: string }>) => void;
  removeEquipment: (index: number) => void;
  updateCurrency: (currency: keyof CharacterSheet['currency'], amount: number) => void;
  
  // Attack Related
  addAttack: (attack: { name: string; bonus: string; damage: string }) => void;
  updateAttack: (index: number, updates: Partial<{ name: string; bonus: string; damage: string }>) => void;
  removeAttack: (index: number) => void;
  
  // Features Related
  addFeature: (feature: { name: string; source: string; description: string; uses?: string }) => void;
  updateFeature: (index: number, updates: Partial<{ name: string; source: string; description: string; uses?: string }>) => void;
  removeFeature: (index: number) => void;
  
  // Proficiency Related
  toggleProficiency: (type: 'skills' | 'savingThrows', name: string) => void;
  updateProficiencyBonus: (bonus: number) => void;
  toggleInspiration: () => void;
  
  // Spell Related
  updateSpellSlots: (level: number, used: number, max: number) => void;
  
  // Calculated Properties
  getAbilityModifier: (ability: keyof CharacterSheet['abilities']) => number;
  getModifierString: (ability: keyof CharacterSheet['abilities']) => string;
  getSavingThrowModifier: (ability: keyof CharacterSheet['abilities']) => number;
  getSkillModifier: (skill: string, abilityType: keyof CharacterSheet['abilities']) => number;
}

// Create the store with persistence
const useCharacterStore = create<CharacterState>()(
  persist(
    (set, get) => ({
      character: null,
      activeTab: 'main',
      isLoading: false,
      error: null,
      
      // Initialize with a default character or load from storage
      setCharacter: (character) => set({ character }),
      
      updateCharacter: (updates) => {
        const { character } = get();
        if (!character) return;
        
        set({ 
          character: { 
            ...character, 
            ...updates 
          } 
        });
      },
      
      saveCharacter: async () => {
        const { character } = get();
        if (!character) return;
        
        set({ isLoading: true, error: null });
        
        try {
          if (character.id) {
            await apiRequest('PUT', `/api/characters/${character.id}`, character);
          } else {
            const response = await apiRequest('POST', '/api/characters', character);
            const savedCharacter = await response.json();
            set({ character: savedCharacter });
          }
        } catch (error) {
          set({ error: (error as Error).message });
        } finally {
          set({ isLoading: false });
        }
      },
      
      loadCharacter: async (id) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await fetch(`/api/characters/${id}`, {
            credentials: 'include'
          });
          
          if (!response.ok) {
            throw new Error('Failed to load character');
          }
          
          const character = await response.json();
          set({ character });
        } catch (error) {
          set({ error: (error as Error).message });
        } finally {
          set({ isLoading: false });
        }
      },
      
      createNewCharacter: () => {
        const defaultCharacter: CharacterSheet = {
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
        
        set({ character: defaultCharacter });
      },
      
      setActiveTab: (tab) => set({ activeTab: tab }),
      
      updateAbilityScore: (ability, value) => {
        const { character } = get();
        if (!character) return;
        
        set({
          character: {
            ...character,
            abilities: {
              ...character.abilities,
              [ability]: value
            }
          }
        });
      },
      
      updateHitPoints: (current) => {
        const { character } = get();
        if (!character) return;
        
        set({
          character: {
            ...character,
            currentHitPoints: current
          }
        });
      },
      
      updateTemporaryHitPoints: (temp) => {
        const { character } = get();
        if (!character) return;
        
        set({
          character: {
            ...character,
            temporaryHitPoints: temp
          }
        });
      },
      
      updateHitDice: (current) => {
        const { character } = get();
        if (!character) return;
        
        set({
          character: {
            ...character,
            currentHitDice: current
          }
        });
      },
      
      updateDeathSave: (type, index, value) => {
        const { character } = get();
        if (!character) return;
        
        const newDeathSaves = { ...character.deathSaves };
        
        if (type === 'success') {
          newDeathSaves.successes = [...newDeathSaves.successes];
          newDeathSaves.successes[index] = value;
        } else {
          newDeathSaves.failures = [...newDeathSaves.failures];
          newDeathSaves.failures[index] = value;
        }
        
        set({
          character: {
            ...character,
            deathSaves: newDeathSaves
          }
        });
      },
      
      addEquipment: (item) => {
        const { character } = get();
        if (!character) return;
        
        set({
          character: {
            ...character,
            equipment: [...character.equipment, item]
          }
        });
      },
      
      updateEquipment: (index, updates) => {
        const { character } = get();
        if (!character) return;
        
        const newEquipment = [...character.equipment];
        newEquipment[index] = { ...newEquipment[index], ...updates };
        
        set({
          character: {
            ...character,
            equipment: newEquipment
          }
        });
      },
      
      removeEquipment: (index) => {
        const { character } = get();
        if (!character) return;
        
        const newEquipment = [...character.equipment];
        newEquipment.splice(index, 1);
        
        set({
          character: {
            ...character,
            equipment: newEquipment
          }
        });
      },
      
      updateCurrency: (currency, amount) => {
        const { character } = get();
        if (!character) return;
        
        set({
          character: {
            ...character,
            currency: {
              ...character.currency,
              [currency]: amount
            }
          }
        });
      },
      
      addAttack: (attack) => {
        const { character } = get();
        if (!character) return;
        
        set({
          character: {
            ...character,
            attacks: [...character.attacks, attack]
          }
        });
      },
      
      updateAttack: (index, updates) => {
        const { character } = get();
        if (!character) return;
        
        const newAttacks = [...character.attacks];
        newAttacks[index] = { ...newAttacks[index], ...updates };
        
        set({
          character: {
            ...character,
            attacks: newAttacks
          }
        });
      },
      
      removeAttack: (index) => {
        const { character } = get();
        if (!character) return;
        
        const newAttacks = [...character.attacks];
        newAttacks.splice(index, 1);
        
        set({
          character: {
            ...character,
            attacks: newAttacks
          }
        });
      },
      
      addFeature: (feature) => {
        const { character } = get();
        if (!character) return;
        
        set({
          character: {
            ...character,
            features: [...character.features, feature]
          }
        });
      },
      
      updateFeature: (index, updates) => {
        const { character } = get();
        if (!character) return;
        
        const newFeatures = [...character.features];
        newFeatures[index] = { ...newFeatures[index], ...updates };
        
        set({
          character: {
            ...character,
            features: newFeatures
          }
        });
      },
      
      removeFeature: (index) => {
        const { character } = get();
        if (!character) return;
        
        const newFeatures = [...character.features];
        newFeatures.splice(index, 1);
        
        set({
          character: {
            ...character,
            features: newFeatures
          }
        });
      },
      
      toggleProficiency: (type, name) => {
        const { character } = get();
        if (!character) return;
        
        if (type === 'skills') {
          const skill = character.skills[name as keyof typeof character.skills];
          
          set({
            character: {
              ...character,
              skills: {
                ...character.skills,
                [name]: {
                  ...skill,
                  proficient: !skill.proficient
                }
              }
            }
          });
        } else if (type === 'savingThrows') {
          const save = character.savingThrows[name as keyof typeof character.savingThrows];
          
          set({
            character: {
              ...character,
              savingThrows: {
                ...character.savingThrows,
                [name]: {
                  ...save,
                  proficient: !save.proficient
                }
              }
            }
          });
        }
      },
      
      updateProficiencyBonus: (bonus) => {
        const { character } = get();
        if (!character) return;
        
        set({
          character: {
            ...character,
            proficiencyBonus: bonus
          }
        });
      },
      
      toggleInspiration: () => {
        const { character } = get();
        if (!character) return;
        
        set({
          character: {
            ...character,
            inspiration: !character.inspiration
          }
        });
      },
      
      updateSpellSlots: (level, used, max) => {
        const { character } = get();
        if (!character) return;
        
        const levelKey = `level${level}` as keyof typeof character.spellcasting.slots;
        
        set({
          character: {
            ...character,
            spellcasting: {
              ...character.spellcasting,
              slots: {
                ...character.spellcasting.slots,
                [levelKey]: max
              },
              slotsUsed: {
                ...character.spellcasting.slotsUsed,
                [levelKey]: used
              }
            }
          }
        });
      },
      
      // Calculated Properties
      getAbilityModifier: (ability) => {
        const { character } = get();
        if (!character) return 0;
        
        const score = character.abilities[ability];
        return getAbilityModifier(score);
      },
      
      getModifierString: (ability) => {
        const modifier = get().getAbilityModifier(ability);
        return modifier >= 0 ? `+${modifier}` : `${modifier}`;
      },
      
      getSavingThrowModifier: (ability) => {
        const { character } = get();
        if (!character) return 0;
        
        const abilityModifier = get().getAbilityModifier(ability);
        const isProficient = character.savingThrows[ability].proficient;
        
        return isProficient 
          ? abilityModifier + character.proficiencyBonus 
          : abilityModifier;
      },
      
      getSkillModifier: (skill, abilityType) => {
        const { character } = get();
        if (!character) return 0;
        
        const abilityModifier = get().getAbilityModifier(abilityType);
        const isProficient = character.skills[skill]?.proficient || false;
        
        return isProficient 
          ? abilityModifier + character.proficiencyBonus 
          : abilityModifier;
      }
    }),
    {
      name: 'dnd-character-sheet',
      getStorage: () => localStorage
    }
  )
);

export default useCharacterStore;
