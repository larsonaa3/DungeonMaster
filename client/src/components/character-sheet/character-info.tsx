import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import useCharacterStore from "@/store/character-store";
import { characterClasses } from "@/data/character-classes";
import { characterRaces } from "@/data/character-races";

export default function CharacterInfo() {
  const { character, updateCharacter } = useCharacterStore();

  if (!character) return null;

  return (
    <Card className="shadow-md mb-6">
      <CardContent className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-1">Character Name</Label>
            <Input
              value={character.name}
              onChange={(e) => updateCharacter({ name: e.target.value })}
              placeholder="Character Name"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-1">Class & Level</Label>
            <div className="flex gap-2">
              <Select
                value={character.class}
                onValueChange={(value) => updateCharacter({ class: value })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  {characterClasses.map((charClass) => (
                    <SelectItem key={charClass.id} value={charClass.id}>
                      {charClass.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                type="number"
                value={character.level}
                onChange={(e) => updateCharacter({ level: Number(e.target.value) })}
                min={1}
                max={20}
                className="w-20 p-2 border border-gray-300 rounded"
              />
            </div>
          </div>
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-1">Race</Label>
            <Select
              value={character.race}
              onValueChange={(value) => updateCharacter({ race: value })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select race" />
              </SelectTrigger>
              <SelectContent>
                {characterRaces.map((race) => (
                  <SelectItem key={race.id} value={race.id}>
                    {race.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-1">Background</Label>
            <Input
              value={character.background}
              onChange={(e) => updateCharacter({ background: e.target.value })}
              placeholder="Background"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-1">Alignment</Label>
            <Select
              value={character.alignment}
              onValueChange={(value) => updateCharacter({ alignment: value })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select alignment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lawful-good">Lawful Good</SelectItem>
                <SelectItem value="neutral-good">Neutral Good</SelectItem>
                <SelectItem value="chaotic-good">Chaotic Good</SelectItem>
                <SelectItem value="lawful-neutral">Lawful Neutral</SelectItem>
                <SelectItem value="true-neutral">True Neutral</SelectItem>
                <SelectItem value="chaotic-neutral">Chaotic Neutral</SelectItem>
                <SelectItem value="lawful-evil">Lawful Evil</SelectItem>
                <SelectItem value="neutral-evil">Neutral Evil</SelectItem>
                <SelectItem value="chaotic-evil">Chaotic Evil</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-1">Experience Points</Label>
            <Input
              type="number"
              value={character.experience}
              onChange={(e) => updateCharacter({ experience: Number(e.target.value) })}
              min={0}
              placeholder="XP"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
