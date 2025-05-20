import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import useCharacterStore from "@/store/character-store";
import { Sparkles } from "lucide-react";
import { getSpellSaveDC } from "@/utils/dnd-calculations";

export default function SpellsTab() {
  const { character, updateCharacter, updateSpellSlots } = useCharacterStore();

  if (!character) return null;

  const spellcastingClasses = [
    { id: 'none', name: 'None' },
    { id: 'barbarian', name: 'Barbarian' },
    { id: 'bard', name: 'Bard' },
    { id: 'cleric', name: 'Cleric' },
    { id: 'druid', name: 'Druid' },
    { id: 'fighter', name: 'Fighter' },
    { id: 'monk', name: 'Monk' },
    { id: 'paladin', name: 'Paladin' },
    { id: 'ranger', name: 'Ranger' },
    { id: 'rogue', name: 'Rogue' },
    { id: 'sorcerer', name: 'Sorcerer' },
    { id: 'warlock', name: 'Warlock' },
    { id: 'wizard', name: 'Wizard' }
  ];

  const spellcastingAbilities = [
    { id: 'none', name: 'None' },
    { id: 'strength', name: 'Strength' },
    { id: 'dexterity', name: 'Dexterity' },
    { id: 'constitution', name: 'Constitution' },
    { id: 'intelligence', name: 'Intelligence' },
    { id: 'wisdom', name: 'Wisdom' },
    { id: 'charisma', name: 'Charisma' }
  ];

  const spellSaveDC = character.spellcasting.ability !== 'none'
    ? getSpellSaveDC(
        character.spellcasting.ability,
        character.abilities,
        character.proficiencyBonus
      )
    : 0;

  return (
    <>
      <Card className="shadow-md p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-1">Spellcasting Class</Label>
            <Select
              value={character.spellcasting.class}
              onValueChange={(value) => updateCharacter({ 
                spellcasting: { ...character.spellcasting, class: value }
              })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select class" />
              </SelectTrigger>
              <SelectContent>
                {spellcastingClasses.map((cls) => (
                  <SelectItem key={cls.id} value={cls.id}>{cls.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-1">Spellcasting Ability</Label>
            <Select
              value={character.spellcasting.ability}
              onValueChange={(value) => updateCharacter({ 
                spellcasting: { ...character.spellcasting, ability: value }
              })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select ability" />
              </SelectTrigger>
              <SelectContent>
                {spellcastingAbilities.map((ability) => (
                  <SelectItem key={ability.id} value={ability.id}>{ability.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-1">Spell Save DC</Label>
            <Input
              type="number"
              value={spellSaveDC}
              className="w-full p-2 border border-gray-300 rounded text-center"
              disabled
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-1">Cantrips (0)</Label>
            <Input
              type="number"
              value={0}
              className="w-full p-2 border border-gray-300 rounded text-center"
              disabled
            />
          </div>
          
          {[1, 2, 3].map((level) => {
            const slotsKey = `level${level}` as keyof typeof character.spellcasting.slots;
            const slotsUsedKey = `level${level}` as keyof typeof character.spellcasting.slotsUsed;
            
            return (
              <div key={level}>
                <Label className="block text-sm font-medium text-gray-700 mb-1">{level}{getOrdinalSuffix(level)} Level</Label>
                <div className="flex items-center">
                  <Input
                    type="number"
                    value={character.spellcasting.slotsUsed[slotsUsedKey]}
                    onChange={(e) => updateSpellSlots(
                      level,
                      parseInt(e.target.value) || 0,
                      character.spellcasting.slots[slotsKey]
                    )}
                    className="w-16 p-2 border border-gray-300 rounded-l text-center"
                    min={0}
                    max={character.spellcasting.slots[slotsKey]}
                  />
                  <span className="p-2 bg-gray-100 border-t border-b border-gray-300 font-bold">/</span>
                  <Input
                    type="number"
                    value={character.spellcasting.slots[slotsKey]}
                    onChange={(e) => updateSpellSlots(
                      level,
                      character.spellcasting.slotsUsed[slotsUsedKey],
                      parseInt(e.target.value) || 0
                    )}
                    className="w-16 p-2 border border-gray-300 rounded-r text-center"
                    min={0}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Card>
      
      {character.spellcasting.class === 'none' ? (
        <Card className="shadow-md p-8 text-center">
          <Sparkles className="text-4xl text-gray-400 mb-2" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No Spells Available</h3>
          <p className="text-gray-500">This character doesn't have spellcasting abilities.</p>
          <p className="text-gray-500 text-sm mt-2">Change your class or add spellcasting features to manage spells.</p>
        </Card>
      ) : (
        // Spell list would go here
        <Card className="shadow-md p-4">
          <CardContent>
            <h2 className="text-xl font-header font-semibold text-primary mb-4">Spell List</h2>
            <p className="text-gray-500 text-center py-4">
              Spell management is coming soon. You can note your spells in the Notes tab for now.
            </p>
          </CardContent>
        </Card>
      )}
    </>
  );
}

function getOrdinalSuffix(num: number): string {
  const j = num % 10;
  const k = num % 100;
  if (j === 1 && k !== 11) {
    return "st";
  }
  if (j === 2 && k !== 12) {
    return "nd";
  }
  if (j === 3 && k !== 13) {
    return "rd";
  }
  return "th";
}
