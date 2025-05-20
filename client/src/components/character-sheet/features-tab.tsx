import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import useCharacterStore from "@/store/character-store";
import { Plus, Edit, Trash2 } from "lucide-react";

export default function FeaturesTab() {
  const { character, addFeature, updateFeature, removeFeature } = useCharacterStore();
  const [isAdding, setIsAdding] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [newFeature, setNewFeature] = useState({ name: "", source: "", description: "", uses: "" });

  if (!character) return null;

  const handleAddFeature = () => {
    if (newFeature.name && newFeature.source && newFeature.description) {
      addFeature(newFeature);
      setNewFeature({ name: "", source: "", description: "", uses: "" });
      setIsAdding(false);
    }
  };

  const handleUpdateFeature = (index: number) => {
    if (newFeature.name && newFeature.source && newFeature.description) {
      updateFeature(index, newFeature);
      setNewFeature({ name: "", source: "", description: "", uses: "" });
      setEditingIndex(null);
    }
  };

  const startEdit = (index: number) => {
    setEditingIndex(index);
    setNewFeature({ ...character.features[index] });
  };

  return (
    <Card className="shadow-md">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-header font-semibold text-primary">Features & Traits</h2>
          {!isAdding && editingIndex === null && (
            <Button 
              variant="default"
              className="px-3 py-1 bg-primary text-white rounded hover:bg-opacity-90"
              onClick={() => setIsAdding(true)}
            >
              <Plus className="mr-1 h-4 w-4" /> Add Feature
            </Button>
          )}
        </div>

        {/* Add/Edit Form */}
        {(isAdding || editingIndex !== null) && (
          <div className="border border-gray-200 rounded p-4 mb-4">
            <h3 className="font-semibold mb-2">
              {isAdding ? "Add New Feature" : "Edit Feature"}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
              <div>
                <Label htmlFor="feature-name">Name</Label>
                <Input
                  id="feature-name"
                  value={newFeature.name}
                  onChange={(e) => setNewFeature({...newFeature, name: e.target.value})}
                  placeholder="Feature name"
                />
              </div>
              <div>
                <Label htmlFor="feature-source">Source</Label>
                <Input
                  id="feature-source"
                  value={newFeature.source}
                  onChange={(e) => setNewFeature({...newFeature, source: e.target.value})}
                  placeholder="Class, Race, etc."
                />
              </div>
            </div>
            <div className="mb-3">
              <Label htmlFor="feature-description">Description</Label>
              <Textarea
                id="feature-description"
                value={newFeature.description}
                onChange={(e) => setNewFeature({...newFeature, description: e.target.value})}
                placeholder="Describe the feature..."
                className="min-h-[100px]"
              />
            </div>
            <div className="mb-3">
              <Label htmlFor="feature-uses">Uses (Optional)</Label>
              <Input
                id="feature-uses"
                value={newFeature.uses}
                onChange={(e) => setNewFeature({...newFeature, uses: e.target.value})}
                placeholder="e.g., 3/day, 1/short rest"
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => {
                  setIsAdding(false);
                  setEditingIndex(null);
                  setNewFeature({ name: "", source: "", description: "", uses: "" });
                }}
              >
                Cancel
              </Button>
              <Button
                variant="default"
                className="bg-primary hover:bg-primary/90"
                onClick={() => editingIndex !== null 
                  ? handleUpdateFeature(editingIndex) 
                  : handleAddFeature()
                }
              >
                {editingIndex !== null ? "Update" : "Add"}
              </Button>
            </div>
          </div>
        )}

        {/* Features List */}
        <div className="space-y-4">
          {character.features.map((feature, index) => (
            <div key={index} className="border border-gray-200 rounded p-3">
              <div className="flex justify-between mb-2">
                <div className="flex items-center">
                  <h3 className="font-semibold">{feature.name}</h3>
                  <Badge className="ml-2 text-xs bg-primary text-white px-2 py-0.5 rounded">
                    {feature.source}
                  </Badge>
                </div>
                <div className="flex">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-gray-500 hover:text-primary"
                    onClick={() => startEdit(index)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-red-500 hover:text-red-700 ml-2"
                    onClick={() => removeFeature(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <p className="text-sm text-gray-700">{feature.description}</p>
              {feature.uses && (
                <div className="mt-2 text-xs text-gray-500">
                  <span>Uses: {feature.uses}</span>
                </div>
              )}
            </div>
          ))}

          {character.features.length === 0 && !isAdding && (
            <div className="text-center py-6 text-gray-500">
              <h3 className="text-lg font-semibold mb-1">No Features Added</h3>
              <p className="text-sm">Click "Add Feature" to add class or racial traits.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
