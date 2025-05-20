import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import useCharacterStore from "@/store/character-store";
import { skills } from "@/data/skills";
import { Check } from "lucide-react";

export default function Skills() {
  const { character, toggleProficiency, getSkillModifier } = useCharacterStore();

  if (!character) return null;

  return (
    <Card className="shadow-md">
      <CardContent className="p-4">
        <h2 className="text-xl font-header font-semibold text-primary mb-4">Skills</h2>
        <div className="space-y-2">
          {skills.map((skill) => {
            const ability = skill.ability;
            const abilityAbbr = ability.charAt(0).toUpperCase() + ability.slice(1, 3);
            const modifier = getSkillModifier(skill.id, skill.ability as keyof typeof character.abilities);
            const modifierText = modifier >= 0 ? `+${modifier}` : `${modifier}`;
            
            return (
              <div key={skill.id} className="flex items-center">
                <div 
                  className={`flex items-center justify-center h-6 w-6 rounded-full border-2 border-primary mr-2 cursor-pointer ${
                    character.skills[skill.id]?.proficient ? "bg-primary text-white" : ""
                  }`}
                  onClick={() => toggleProficiency('skills', skill.id)}
                >
                  {character.skills[skill.id]?.proficient && <Check className="h-4 w-4" />}
                </div>
                <span className="w-8 text-center font-medium">{modifierText}</span>
                <span className="ml-2">{skill.name} <span className="text-gray-500 text-xs">({abilityAbbr})</span></span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
