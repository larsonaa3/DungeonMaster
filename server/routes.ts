import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { CharacterSheet, insertCharacterSheetSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes for character sheets
  
  // Get all character sheets
  app.get("/api/characters", async (req, res) => {
    try {
      const characters = await storage.getAllCharacterSheets();
      res.json(characters);
    } catch (error) {
      console.error("Error fetching characters:", error);
      res.status(500).json({ message: "Failed to fetch characters" });
    }
  });

  // Get a single character sheet by ID
  app.get("/api/characters/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid character ID" });
      }

      const character = await storage.getCharacterSheet(id);
      if (!character) {
        return res.status(404).json({ message: "Character not found" });
      }

      res.json(character);
    } catch (error) {
      console.error("Error fetching character:", error);
      res.status(500).json({ message: "Failed to fetch character" });
    }
  });

  // Create a new character sheet
  app.post("/api/characters", async (req, res) => {
    try {
      // Validate request body
      const result = insertCharacterSheetSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ 
          message: "Invalid character data", 
          errors: result.error.format() 
        });
      }

      const character = await storage.createCharacterSheet(req.body as CharacterSheet);
      res.status(201).json(character);
    } catch (error) {
      console.error("Error creating character:", error);
      res.status(500).json({ message: "Failed to create character" });
    }
  });

  // Update an existing character sheet
  app.put("/api/characters/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid character ID" });
      }

      // Check if character exists
      const existingCharacter = await storage.getCharacterSheet(id);
      if (!existingCharacter) {
        return res.status(404).json({ message: "Character not found" });
      }

      // Validate partial updates
      const updateSchema = insertCharacterSheetSchema.partial();
      const result = updateSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ 
          message: "Invalid character data", 
          errors: result.error.format() 
        });
      }

      const updatedCharacter = await storage.updateCharacterSheet(id, req.body);
      res.json(updatedCharacter);
    } catch (error) {
      console.error("Error updating character:", error);
      res.status(500).json({ message: "Failed to update character" });
    }
  });

  // Delete a character sheet
  app.delete("/api/characters/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid character ID" });
      }

      // Check if character exists
      const existingCharacter = await storage.getCharacterSheet(id);
      if (!existingCharacter) {
        return res.status(404).json({ message: "Character not found" });
      }

      await storage.deleteCharacterSheet(id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting character:", error);
      res.status(500).json({ message: "Failed to delete character" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
