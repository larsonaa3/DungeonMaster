import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import useCharacterStore from "@/store/character-store";
import { Eye } from "lucide-react";

export default function EquipmentSnippet() {
  const { character, updateEquipment, updateCurrency, setActiveTab } = useCharacterStore();

  if (!character) return null;

  const handleViewAllClick = () => {
    setActiveTab('inventory');
  };

  const currencies = [
    { key: 'copper', label: 'CP' },
    { key: 'silver', label: 'SP' },
    { key: 'electrum', label: 'EP' },
    { key: 'gold', label: 'GP' },
    { key: 'platinum', label: 'PP' }
  ] as const;

  return (
    <Card className="shadow-md">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-header font-semibold text-primary">Equipment</h2>
          <Button variant="link" className="text-sm text-primary hover:underline" onClick={handleViewAllClick}>
            <Eye className="h-4 w-4 mr-1" /> View All
          </Button>
        </div>

        <div className="mb-3">
          <div className="flex items-center mb-2">
            <div className="w-1/3">
              <Label className="text-sm font-medium text-gray-700">Currency</Label>
            </div>
            <div className="w-2/3 grid grid-cols-5 gap-1">
              {currencies.map(({ key, label }) => (
                <div key={key} className="text-center">
                  <Label className="text-xs">{label}</Label>
                  <Input
                    type="number"
                    value={character.currency[key]}
                    onChange={(e) => updateCurrency(key, parseInt(e.target.value) || 0)}
                    className="w-full p-1 border border-gray-300 rounded text-center text-sm"
                    min={0}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          {character.equipment.slice(0, 3).map((item, index) => (
            <div key={index} className="flex items-center text-sm">
              <Input
                value={item.name}
                onChange={(e) => updateEquipment(index, { name: e.target.value })}
                className="w-full p-1 border border-gray-300 rounded"
                placeholder="Item name"
              />
              <Input
                type="number"
                value={item.quantity}
                onChange={(e) => updateEquipment(index, { quantity: parseInt(e.target.value) || 1 })}
                className="ml-2 w-12 p-1 border border-gray-300 rounded text-center"
                min={1}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
