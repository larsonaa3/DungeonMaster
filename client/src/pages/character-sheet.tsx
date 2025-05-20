import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import useCharacterStore from '@/store/character-store';

import CharacterInfo from '@/components/character-sheet/character-info';
import AbilityScores from '@/components/character-sheet/ability-scores';
import SavingThrows from '@/components/character-sheet/saving-throws';
import ProficiencyInspiration from '@/components/character-sheet/proficiency-inspiration';
import CombatStats from '@/components/character-sheet/combat-stats';
import AttacksSpellcasting from '@/components/character-sheet/attacks-spellcasting';
import Skills from '@/components/character-sheet/skills';
import EquipmentSnippet from '@/components/character-sheet/equipment-snippet';
import PersonalityBackground from '@/components/character-sheet/personality-background';
import SpellsTab from '@/components/character-sheet/spells-tab';
import InventoryTab from '@/components/character-sheet/inventory-tab';
import FeaturesTab from '@/components/character-sheet/features-tab';
import NotesTab from '@/components/character-sheet/notes-tab';

export default function CharacterSheet() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('main');
  const { 
    character, 
    createNewCharacter, 
    saveCharacter, 
    isLoading, 
    error
  } = useCharacterStore();

  useEffect(() => {
    if (!character) {
      createNewCharacter();
    }
  }, [character, createNewCharacter]);

  useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error,
      });
    }
  }, [error, toast]);

  const handleSaveCharacter = async () => {
    try {
      await saveCharacter();
      toast({
        title: "Success",
        description: "Character saved successfully",
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (!character) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Loading character sheet...</h2>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      <header className="mb-6">
        <h1 className="text-4xl font-header font-bold text-primary text-center">D&D 5e Character Sheet</h1>
      </header>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full mb-6 grid grid-cols-2 md:grid-cols-5 gap-1">
          <TabsTrigger value="main" className="font-semibold">Main</TabsTrigger>
          <TabsTrigger value="spells" className="font-semibold">Spells</TabsTrigger>
          <TabsTrigger value="inventory" className="font-semibold">Inventory</TabsTrigger>
          <TabsTrigger value="features" className="font-semibold">Features</TabsTrigger>
          <TabsTrigger value="notes" className="font-semibold">Notes</TabsTrigger>
        </TabsList>

        <TabsContent value="main" className="space-y-6">
          <CharacterInfo />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              <AbilityScores />
              <SavingThrows />
              <ProficiencyInspiration />
            </div>

            {/* Middle Column */}
            <div className="space-y-6">
              <CombatStats />
              <AttacksSpellcasting />
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <Skills />
              <EquipmentSnippet />
            </div>
          </div>

          <PersonalityBackground />
        </TabsContent>

        <TabsContent value="spells">
          <SpellsTab />
        </TabsContent>

        <TabsContent value="inventory">
          <InventoryTab />
        </TabsContent>

        <TabsContent value="features">
          <FeaturesTab />
        </TabsContent>

        <TabsContent value="notes">
          <NotesTab />
        </TabsContent>
      </Tabs>

      {/* Save Character Button */}
      <div className="mt-6 text-center">
        <Button 
          className="bg-primary text-white py-6 px-6 rounded-lg hover:bg-opacity-90 shadow-md text-lg font-semibold"
          onClick={handleSaveCharacter}
          disabled={isLoading}
        >
          <Save className="mr-2 h-5 w-5" />
          Save Character
        </Button>
      </div>
    </div>
  );
}
