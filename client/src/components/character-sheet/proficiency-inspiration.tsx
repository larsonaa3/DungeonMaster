import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useCharacterStore from "@/store/character-store";
import { Sparkles } from "lucide-react";

export default function ProficiencyInspiration() {
  const { character, updateProficiencyBonus, toggleInspiration } = useCharacterStore();

  if (!character) return null;

  return (
    <Card className="shadow-md">
      <CardContent className="p-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-1">Proficiency Bonus</Label>
            <div className="flex items-center">
              <span className="text-xl font-semibold">+</span>
              <Input
                type="number"
                value={character.proficiencyBonus}
                onChange={(e) => updateProficiencyBonus(parseInt(e.target.value) || 2)}
                className="w-12 p-2 border border-gray-300 rounded text-center font-bold"
                min={2}
                max={6}
              />
            </div>
          </div>
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-1">Inspiration</Label>
            <div 
              className={`flex items-center justify-center h-10 w-10 rounded-full border-2 border-primary cursor-pointer ${
                character.inspiration ? "bg-primary text-white" : ""
              }`}
              onClick={toggleInspiration}
            >
              <Sparkles className="h-5 w-5" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
