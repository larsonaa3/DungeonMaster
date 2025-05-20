import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import useCharacterStore from "@/store/character-store";
import { Plus } from "lucide-react";

export default function AttacksSpellcasting() {
  const { character, addAttack, updateAttack, removeAttack } = useCharacterStore();

  if (!character) return null;

  const handleAddAttack = () => {
    addAttack({ name: "", bonus: "", damage: "" });
  };

  return (
    <Card className="shadow-md">
      <CardContent className="p-4">
        <h2 className="text-xl font-header font-semibold text-primary mb-4">Attacks & Spellcasting</h2>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-gray-100">
              <TableRow>
                <TableHead className="p-2 text-left">Name</TableHead>
                <TableHead className="p-2 text-center">ATK Bonus</TableHead>
                <TableHead className="p-2 text-center">Damage/Type</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {character.attacks.map((attack, index) => (
                <TableRow key={index} className="border-b border-gray-200">
                  <TableCell className="p-2">
                    <Input
                      value={attack.name}
                      onChange={(e) => updateAttack(index, { name: e.target.value })}
                      className="w-full p-1 border border-gray-300 rounded"
                      placeholder="Weapon name"
                    />
                  </TableCell>
                  <TableCell className="p-2">
                    <Input
                      value={attack.bonus}
                      onChange={(e) => updateAttack(index, { bonus: e.target.value })}
                      className="w-full p-1 border border-gray-300 rounded text-center"
                      placeholder="+0"
                    />
                  </TableCell>
                  <TableCell className="p-2">
                    <Input
                      value={attack.damage}
                      onChange={(e) => updateAttack(index, { damage: e.target.value })}
                      className="w-full p-1 border border-gray-300 rounded text-center"
                      placeholder="1d8+0 slashing"
                    />
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={3} className="p-2">
                  <Button
                    variant="outline"
                    className="w-full p-1 text-primary border border-primary rounded hover:bg-primary hover:text-white transition-colors"
                    onClick={handleAddAttack}
                  >
                    <Plus className="h-4 w-4 mr-1" /> Add Attack
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
