import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import useCharacterStore from "@/store/character-store";

export default function PersonalityBackground() {
  const { character, updateCharacter } = useCharacterStore();

  if (!character) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <Card className="shadow-md">
        <CardContent className="p-4">
          <h2 className="text-xl font-header font-semibold text-primary mb-2">Personality Traits</h2>
          <Textarea
            value={character.personalityTraits}
            onChange={(e) => updateCharacter({ personalityTraits: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded h-24"
            placeholder="Describe your character's personality traits..."
          />
          
          <h2 className="text-xl font-header font-semibold text-primary mt-4 mb-2">Ideals</h2>
          <Textarea
            value={character.ideals}
            onChange={(e) => updateCharacter({ ideals: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded h-24"
            placeholder="What ideals drive your character?"
          />
        </CardContent>
      </Card>
      
      <Card className="shadow-md">
        <CardContent className="p-4">
          <h2 className="text-xl font-header font-semibold text-primary mb-2">Bonds</h2>
          <Textarea
            value={character.bonds}
            onChange={(e) => updateCharacter({ bonds: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded h-24"
            placeholder="What bonds tie your character to people, places, or events?"
          />
          
          <h2 className="text-xl font-header font-semibold text-primary mt-4 mb-2">Flaws</h2>
          <Textarea
            value={character.flaws}
            onChange={(e) => updateCharacter({ flaws: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded h-24"
            placeholder="What flaws does your character have?"
          />
        </CardContent>
      </Card>
    </div>
  );
}
