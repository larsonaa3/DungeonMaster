import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import useCharacterStore from "@/store/character-store";
import { getAbilityModifier } from "@/utils/dnd-calculations";
import { Plus, Minus } from "lucide-react";

export default function CombatStats() {
  const { 
    character, 
    updateCharacter,
    updateHitPoints,
    updateTemporaryHitPoints,
    updateHitDice,
    updateDeathSave,
    getModifierString
  } = useCharacterStore();

  if (!character) return null;

  const dexterityModifier = getAbilityModifier(character.abilities.dexterity);
  const initiativeBonus = dexterityModifier;
  const initiativeBonusText = initiativeBonus >= 0 ? `+${initiativeBonus}` : `${initiativeBonus}`;

  const addHitPoints = () => {
    updateHitPoints(Math.min(character.currentHitPoints + 1, character.maxHitPoints));
  };

  const removeHitPoints = () => {
    updateHitPoints(Math.max(character.currentHitPoints - 1, 0));
  };

  return (
    <Card className="shadow-md">
      <CardContent className="p-4">
        <h2 className="text-xl font-header font-semibold text-primary mb-4">Combat</h2>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="h-24 w-24 mx-auto border-2 border-primary rounded-full flex flex-col items-center justify-center">
              <Label className="text-xs font-medium mb-1">Armor Class</Label>
              <Input
                type="number"
                value={character.armorClass}
                onChange={(e) => updateCharacter({ armorClass: parseInt(e.target.value) || 10 })}
                className="w-12 text-center font-bold text-2xl bg-transparent border-0 focus-visible:ring-0"
                min={1}
              />
            </div>
          </div>
          <div className="text-center">
            <div className="h-24 w-24 mx-auto border-2 border-primary rounded-full flex flex-col items-center justify-center">
              <Label className="text-xs font-medium mb-1">Initiative</Label>
              <span className="text-2xl font-bold">{initiativeBonusText}</span>
            </div>
          </div>
          <div className="text-center">
            <div className="h-24 w-24 mx-auto border-2 border-primary rounded-full flex flex-col items-center justify-center">
              <Label className="text-xs font-medium mb-1">Speed</Label>
              <Input
                type="number"
                value={character.speed}
                onChange={(e) => updateCharacter({ speed: parseInt(e.target.value) || 30 })}
                className="w-12 text-center font-bold text-2xl bg-transparent border-0 focus-visible:ring-0"
                min={0}
              />
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <div className="mb-4">
            <div className="flex items-center mb-1">
              <Label className="text-sm font-medium">Hit Points</Label>
              <span className="text-xs text-gray-500 ml-2">(Max: <span>{character.maxHitPoints}</span>)</span>
            </div>
            <div className="flex items-center">
              <Input
                type="number"
                value={character.currentHitPoints}
                onChange={(e) => updateHitPoints(parseInt(e.target.value) || 0)}
                className="w-16 p-2 border border-gray-300 rounded-l text-center font-bold"
                min={0}
                max={character.maxHitPoints}
              />
              <span className="p-2 bg-gray-100 border-t border-b border-gray-300 font-bold">/</span>
              <Input
                type="number"
                value={character.maxHitPoints}
                onChange={(e) => updateCharacter({ maxHitPoints: parseInt(e.target.value) || 1 })}
                className="w-16 p-2 border border-gray-300 rounded-r text-center font-bold"
                min={1}
              />
              <Button variant="default" size="icon" className="ml-2 bg-primary" onClick={addHitPoints}>
                <Plus className="h-4 w-4" />
              </Button>
              <Button variant="destructive" size="icon" className="ml-1" onClick={removeHitPoints}>
                <Minus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="mb-4">
            <Label className="block text-sm font-medium mb-1">Temporary Hit Points</Label>
            <div className="flex items-center">
              <Input
                type="number"
                value={character.temporaryHitPoints}
                onChange={(e) => updateTemporaryHitPoints(parseInt(e.target.value) || 0)}
                className="w-16 p-2 border border-gray-300 rounded text-center font-bold"
                min={0}
              />
            </div>
          </div>
          
          <div>
            <Label className="block text-sm font-medium mb-1">Hit Dice</Label>
            <div className="flex items-center">
              <Input
                type="number"
                value={character.currentHitDice}
                onChange={(e) => updateHitDice(parseInt(e.target.value) || 0)}
                className="w-12 p-2 border border-gray-300 rounded-l text-center font-bold"
                min={0}
                max={character.maxHitDice}
              />
              <span className="p-2 bg-gray-100 border-t border-b border-gray-300 font-bold">/</span>
              <Input
                type="number"
                value={character.maxHitDice}
                onChange={(e) => updateCharacter({ maxHitDice: parseInt(e.target.value) || 1 })}
                className="w-12 p-2 border border-gray-300 rounded-r text-center font-bold"
                min={1}
              />
              <Select
                value={character.hitDiceType}
                onValueChange={(value) => updateCharacter({ hitDiceType: value })}
              >
                <SelectTrigger className="ml-2 w-24">
                  <SelectValue placeholder="Hit Die" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="d6">d6</SelectItem>
                  <SelectItem value="d8">d8</SelectItem>
                  <SelectItem value="d10">d10</SelectItem>
                  <SelectItem value="d12">d12</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="mt-4">
            <Label className="block text-sm font-medium mb-1">Death Saves</Label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm">Successes</span>
                <div className="flex mt-1">
                  {character.deathSaves.successes.map((isChecked, index) => (
                    <div
                      key={`success-${index}`}
                      className={`flex items-center justify-center h-6 w-6 rounded-full border-2 border-primary mr-2 cursor-pointer ${
                        isChecked ? "bg-primary text-white" : ""
                      }`}
                      onClick={() => updateDeathSave('success', index, !isChecked)}
                    >
                      {isChecked && <Check className="h-4 w-4" />}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-sm">Failures</span>
                <div className="flex mt-1">
                  {character.deathSaves.failures.map((isChecked, index) => (
                    <div
                      key={`failure-${index}`}
                      className={`flex items-center justify-center h-6 w-6 rounded-full border-2 border-destructive mr-2 cursor-pointer ${
                        isChecked ? "bg-destructive text-white" : ""
                      }`}
                      onClick={() => updateDeathSave('failure', index, !isChecked)}
                    >
                      {isChecked && <X className="h-4 w-4" />}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Import these at the top of the file
import { Check, X } from "lucide-react";
