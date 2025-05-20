import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import useCharacterStore from "@/store/character-store";
import { Save, PlusCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function NotesTab() {
  const { character, updateCharacter, saveCharacter } = useCharacterStore();
  const { toast } = useToast();
  const [newTag, setNewTag] = useState("");
  const [noteTags, setNoteTags] = useState<string[]>(["Quest", "NPC", "Location", "Item", "Lore"]);

  if (!character) return null;

  const handleSaveNotes = async () => {
    try {
      await saveCharacter();
      toast({
        title: "Success",
        description: "Notes saved successfully",
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddTag = () => {
    if (newTag.trim() && !noteTags.includes(newTag.trim())) {
      setNoteTags([...noteTags, newTag.trim()]);
      setNewTag("");
    }
  };

  const getBadgeColor = (tag: string) => {
    const colors: Record<string, string> = {
      "Quest": "bg-primary bg-opacity-10 text-primary",
      "NPC": "bg-green-100 text-green-800",
      "Location": "bg-blue-100 text-blue-800",
      "Item": "bg-yellow-100 text-yellow-800",
      "Lore": "bg-purple-100 text-purple-800"
    };
    
    return colors[tag] || "bg-gray-100 text-gray-800";
  };

  return (
    <Card className="shadow-md">
      <CardContent className="p-4">
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-header font-semibold text-primary">Character Notes</h2>
            <Button
              variant="default"
              className="px-3 py-1 bg-primary text-white rounded hover:bg-opacity-90"
              onClick={handleSaveNotes}
            >
              <Save className="mr-1 h-4 w-4" /> Save
            </Button>
          </div>
          <Textarea
            value={character.notes}
            onChange={(e) => updateCharacter({ notes: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded h-64 font-mono"
            placeholder="Use this area for campaign notes, personal thoughts, or anything else you want to remember about your character or the world they inhabit."
          />
        </div>
        
        <h3 className="text-lg font-semibold mb-2">Note Tags</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {noteTags.map((tag) => (
            <Badge key={tag} className={`px-2 py-1 rounded text-sm ${getBadgeColor(tag)}`}>
              {tag}
            </Badge>
          ))}
          
          <div className="flex items-center gap-1">
            <Input
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              className="w-24 h-8 text-sm"
              placeholder="New tag"
              onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
            />
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-gray-500 hover:text-primary"
              onClick={handleAddTag}
            >
              <PlusCircle className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
