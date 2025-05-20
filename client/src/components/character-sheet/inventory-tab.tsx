import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter } from "@/components/ui/table";
import useCharacterStore from "@/store/character-store";
import { Plus, Trash2 } from "lucide-react";
import { getCarryingCapacity } from "@/utils/dnd-calculations";

export default function InventoryTab() {
  const { character, updateCurrency, addEquipment, updateEquipment, removeEquipment } = useCharacterStore();
  
  const [newItem, setNewItem] = useState({ name: "", quantity: 1, weight: "" });

  if (!character) return null;

  const currencies = [
    { key: 'copper', label: 'Copper (CP)' },
    { key: 'silver', label: 'Silver (SP)' },
    { key: 'electrum', label: 'Electrum (EP)' },
    { key: 'gold', label: 'Gold (GP)' },
    { key: 'platinum', label: 'Platinum (PP)' }
  ] as const;

  const handleAddItem = () => {
    if (newItem.name.trim()) {
      addEquipment({
        name: newItem.name,
        quantity: newItem.quantity,
        weight: newItem.weight
      });
      setNewItem({ name: "", quantity: 1, weight: "" });
    }
  };

  // Calculate total weight (assuming weight is stored as "X lb." format)
  const totalWeight = character.equipment.reduce((total, item) => {
    const weight = parseFloat(item.weight?.replace(/[^\d.-]/g, '') || "0");
    return total + (weight * item.quantity);
  }, 0);

  const carryingCapacity = getCarryingCapacity(character.abilities.strength);
  const encumberedThreshold = character.abilities.strength * 5;
  const heavilyEncumberedThreshold = character.abilities.strength * 10;

  return (
    <>
      <Card className="shadow-md mb-6">
        <CardContent className="p-4">
          <h2 className="text-xl font-header font-semibold text-primary mb-4">Currency</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {currencies.map(({ key, label }) => (
              <div key={key}>
                <Label className="block text-sm font-medium text-gray-700 mb-1">{label}</Label>
                <Input
                  type="number"
                  value={character.currency[key]}
                  onChange={(e) => updateCurrency(key, parseInt(e.target.value) || 0)}
                  className="w-full p-2 border border-gray-300 rounded"
                  min={0}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card className="shadow-md">
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-header font-semibold text-primary">Equipment</h2>
            <Button 
              variant="default"
              className="px-3 py-1 bg-primary text-white rounded hover:bg-opacity-90"
              onClick={handleAddItem}
            >
              <Plus className="mr-1 h-4 w-4" /> Add Item
            </Button>
          </div>
          
          {/* Add new item form */}
          <div className="mb-4 flex flex-wrap gap-2 items-end">
            <div className="flex-1">
              <Label htmlFor="item-name">Item Name</Label>
              <Input
                id="item-name"
                value={newItem.name}
                onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                placeholder="Enter item name"
              />
            </div>
            <div className="w-20">
              <Label htmlFor="item-quantity">Qty</Label>
              <Input
                id="item-quantity"
                type="number"
                value={newItem.quantity}
                onChange={(e) => setNewItem({...newItem, quantity: parseInt(e.target.value) || 1})}
                min={1}
              />
            </div>
            <div className="w-24">
              <Label htmlFor="item-weight">Weight</Label>
              <Input
                id="item-weight"
                value={newItem.weight}
                onChange={(e) => setNewItem({...newItem, weight: e.target.value})}
                placeholder="0 lb."
              />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-gray-100">
                <TableRow>
                  <TableHead className="p-2 text-left">Name</TableHead>
                  <TableHead className="p-2 text-center">Qty</TableHead>
                  <TableHead className="p-2 text-center">Weight</TableHead>
                  <TableHead className="p-2 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {character.equipment.map((item, index) => (
                  <TableRow key={index} className="border-b border-gray-200">
                    <TableCell className="p-2">
                      <Input
                        value={item.name}
                        onChange={(e) => updateEquipment(index, { name: e.target.value })}
                        className="w-full p-1 border border-gray-300 rounded"
                      />
                    </TableCell>
                    <TableCell className="p-2">
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateEquipment(index, { quantity: parseInt(e.target.value) || 1 })}
                        className="w-full p-1 border border-gray-300 rounded text-center"
                        min={1}
                      />
                    </TableCell>
                    <TableCell className="p-2">
                      <Input
                        value={item.weight || ""}
                        onChange={(e) => updateEquipment(index, { weight: e.target.value })}
                        className="w-full p-1 border border-gray-300 rounded text-center"
                        placeholder="0 lb."
                      />
                    </TableCell>
                    <TableCell className="p-2 text-right">
                      <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700" onClick={() => removeEquipment(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow className="bg-gray-50">
                  <TableCell className="p-2 font-semibold">Total</TableCell>
                  <TableCell className="p-2"></TableCell>
                  <TableCell className="p-2 text-center font-semibold">{totalWeight.toFixed(1)} lb.</TableCell>
                  <TableCell className="p-2"></TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
          
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label className="block text-sm font-medium text-gray-700 mb-1">Carrying Capacity</Label>
              <div className="flex items-center">
                <Input
                  value={`${carryingCapacity} lb.`}
                  className="w-full p-2 border border-gray-300 rounded text-center font-bold"
                  disabled
                />
                <span className="text-xs text-gray-500 ml-2">(STR × 15)</span>
              </div>
            </div>
            <div>
              <Label className="block text-sm font-medium text-gray-700 mb-1">Encumbered</Label>
              <div className="flex items-center">
                <Input
                  value={`${encumberedThreshold}+ lb.`}
                  className="w-full p-2 border border-gray-300 rounded text-center font-bold"
                  disabled
                />
                <span className="text-xs text-gray-500 ml-2">(STR × 5)</span>
              </div>
            </div>
            <div>
              <Label className="block text-sm font-medium text-gray-700 mb-1">Heavily Encumbered</Label>
              <div className="flex items-center">
                <Input
                  value={`${heavilyEncumberedThreshold}+ lb.`}
                  className="w-full p-2 border border-gray-300 rounded text-center font-bold"
                  disabled
                />
                <span className="text-xs text-gray-500 ml-2">(STR × 10)</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
