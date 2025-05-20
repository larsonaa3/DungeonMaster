import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import useCharacterStore from "@/store/character-store";

export default function AbilityScores() {
  const { character, updateAbilityScore, getModifierString } = useCharacterStore();

  if (!character) return null;

  const abilityScores = [
    { key: 'strength', label: 'STR' },
    { key: 'dexterity', label: 'DEX' },
    { key: 'constitution', label: 'CON' },
    { key: 'intelligence', label: 'INT' },
    { key: 'wisdom', label: 'WIS' },
    { key: 'charisma', label: 'CHA' }
  ] as const;

  return (
    <Card className="shadow-md">
      <CardContent className="p-4">
        <h2 className="text-xl font-header font-semibold text-primary mb-4">Ability Scores</h2>
        <div className="grid grid-cols-3 gap-4 justify-items-center">
          {abilityScores.map(({ key, label }) => (
            <div key={key} className="ability-score-container">
              <label className="block text-sm font-semibold text-center mb-1">{label}</label>
              <div className="ability-score-box border-2 border-primary rounded-lg">
                <Input
                  type="number"
                  value={character.abilities[key]}
                  onChange={(e) => updateAbilityScore(key, parseInt(e.target.value) || 0)}
                  className="w-12 text-center font-bold text-xl bg-transparent border-0 focus-visible:ring-0"
                  min={1}
                  max={30}
                />
                <div className="modifier-circle bg-primary text-white font-bold">
                  {getModifierString(key)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
