import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import useCharacterStore from "@/store/character-store";
import { Check } from "lucide-react";

export default function SavingThrows() {
  const { character, toggleProficiency, getSavingThrowModifier } = useCharacterStore();

  if (!character) return null;

  const savingThrows = [
    { key: 'strength', label: 'Strength' },
    { key: 'dexterity', label: 'Dexterity' },
    { key: 'constitution', label: 'Constitution' },
    { key: 'intelligence', label: 'Intelligence' },
    { key: 'wisdom', label: 'Wisdom' },
    { key: 'charisma', label: 'Charisma' }
  ] as const;

  return (
    <Card className="shadow-md">
      <CardContent className="p-4">
        <h2 className="text-xl font-header font-semibold text-primary mb-4">Saving Throws</h2>
        <div className="space-y-2">
          {savingThrows.map(({ key, label }) => {
            const modifier = getSavingThrowModifier(key);
            const modifierText = modifier >= 0 ? `+${modifier}` : `${modifier}`;
            
            return (
              <div key={key} className="flex items-center">
                <div 
                  className={`flex items-center justify-center h-6 w-6 rounded-full border-2 border-primary mr-2 cursor-pointer ${
                    character.savingThrows[key].proficient ? "bg-primary text-white" : ""
                  }`}
                  onClick={() => toggleProficiency('savingThrows', key)}
                >
                  {character.savingThrows[key].proficient && <Check className="h-4 w-4" />}
                </div>
                <span className="w-8 text-center font-medium">{modifierText}</span>
                <span className="ml-2">{label}</span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
