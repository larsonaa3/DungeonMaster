// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// shared/schema.ts
import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var characterSheets = pgTable("character_sheets", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  race: text("race").notNull(),
  class: text("class").notNull(),
  level: integer("level").notNull().default(1),
  background: text("background").default(""),
  alignment: text("alignment").notNull().default("true-neutral"),
  experience: integer("experience").default(0),
  abilities: jsonb("abilities").notNull(),
  savingThrows: jsonb("saving_throws").notNull(),
  skills: jsonb("skills").notNull(),
  proficiencyBonus: integer("proficiency_bonus").notNull().default(2),
  inspiration: boolean("inspiration").default(false),
  armorClass: integer("armor_class").notNull().default(10),
  initiative: integer("initiative").default(0),
  speed: integer("speed").notNull().default(30),
  maxHitPoints: integer("max_hit_points").notNull().default(10),
  currentHitPoints: integer("current_hit_points").notNull().default(10),
  temporaryHitPoints: integer("temporary_hit_points").default(0),
  hitDiceType: text("hit_dice_type").notNull().default("d8"),
  maxHitDice: integer("max_hit_dice").notNull().default(1),
  currentHitDice: integer("current_hit_dice").notNull().default(1),
  deathSaves: jsonb("death_saves").notNull(),
  attacks: jsonb("attacks").notNull(),
  equipment: jsonb("equipment").notNull(),
  currency: jsonb("currency").notNull(),
  personalityTraits: text("personality_traits").default(""),
  ideals: text("ideals").default(""),
  bonds: text("bonds").default(""),
  flaws: text("flaws").default(""),
  features: jsonb("features").notNull(),
  spellcasting: jsonb("spellcasting").notNull(),
  spells: jsonb("spells").notNull(),
  notes: text("notes").default(""),
  userId: text("user_id")
  // Optional for multi-user support
});
var insertCharacterSheetSchema = createInsertSchema(characterSheets).omit({ id: true });
var defaultCharacterSheet = {
  name: "New Character",
  race: "human",
  class: "fighter",
  level: 1,
  background: "",
  alignment: "true-neutral",
  experience: 0,
  abilities: {
    strength: 10,
    dexterity: 10,
    constitution: 10,
    intelligence: 10,
    wisdom: 10,
    charisma: 10
  },
  savingThrows: {
    strength: { proficient: false },
    dexterity: { proficient: false },
    constitution: { proficient: false },
    intelligence: { proficient: false },
    wisdom: { proficient: false },
    charisma: { proficient: false }
  },
  skills: {
    acrobatics: { proficient: false },
    "animal-handling": { proficient: false },
    arcana: { proficient: false },
    athletics: { proficient: false },
    deception: { proficient: false },
    history: { proficient: false },
    insight: { proficient: false },
    intimidation: { proficient: false },
    investigation: { proficient: false },
    medicine: { proficient: false },
    nature: { proficient: false },
    perception: { proficient: false },
    performance: { proficient: false },
    persuasion: { proficient: false },
    religion: { proficient: false },
    "sleight-of-hand": { proficient: false },
    stealth: { proficient: false },
    survival: { proficient: false }
  },
  proficiencyBonus: 2,
  inspiration: false,
  armorClass: 10,
  initiative: 0,
  speed: 30,
  maxHitPoints: 10,
  currentHitPoints: 10,
  temporaryHitPoints: 0,
  hitDiceType: "d8",
  maxHitDice: 1,
  currentHitDice: 1,
  deathSaves: {
    successes: [false, false, false],
    failures: [false, false, false]
  },
  attacks: [],
  equipment: [],
  currency: {
    copper: 0,
    silver: 0,
    electrum: 0,
    gold: 0,
    platinum: 0
  },
  personalityTraits: "",
  ideals: "",
  bonds: "",
  flaws: "",
  features: [],
  spellcasting: {
    class: "none",
    ability: "none",
    spellSaveDC: 0,
    spellAttackBonus: 0,
    slots: {
      level1: 0,
      level2: 0,
      level3: 0,
      level4: 0,
      level5: 0,
      level6: 0,
      level7: 0,
      level8: 0,
      level9: 0
    },
    slotsUsed: {
      level1: 0,
      level2: 0,
      level3: 0,
      level4: 0,
      level5: 0,
      level6: 0,
      level7: 0,
      level8: 0,
      level9: 0
    }
  },
  spells: [],
  notes: ""
};

// server/storage.ts
var MemStorage = class {
  users;
  characterSheets;
  userId;
  characterId;
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.characterSheets = /* @__PURE__ */ new Map();
    this.userId = 1;
    this.characterId = 1;
    this.createCharacterSheet({
      ...defaultCharacterSheet,
      name: "Thorian Stormbreaker",
      race: "dwarf",
      class: "barbarian",
      level: 5,
      background: "Soldier",
      alignment: "chaotic-good",
      experience: 6500,
      abilities: {
        strength: 16,
        dexterity: 14,
        constitution: 16,
        intelligence: 10,
        wisdom: 12,
        charisma: 8
      },
      savingThrows: {
        strength: { proficient: true },
        dexterity: { proficient: false },
        constitution: { proficient: true },
        intelligence: { proficient: false },
        wisdom: { proficient: false },
        charisma: { proficient: false }
      },
      skills: {
        acrobatics: { proficient: false },
        "animal-handling": { proficient: false },
        arcana: { proficient: false },
        athletics: { proficient: true },
        deception: { proficient: false },
        history: { proficient: false },
        insight: { proficient: true },
        intimidation: { proficient: true },
        investigation: { proficient: false },
        medicine: { proficient: false },
        nature: { proficient: false },
        perception: { proficient: true },
        performance: { proficient: false },
        persuasion: { proficient: false },
        religion: { proficient: false },
        "sleight-of-hand": { proficient: false },
        stealth: { proficient: false },
        survival: { proficient: true }
      },
      proficiencyBonus: 3,
      armorClass: 16,
      speed: 25,
      maxHitPoints: 45,
      currentHitPoints: 38,
      hitDiceType: "d12",
      maxHitDice: 5,
      currentHitDice: 3,
      attacks: [
        { name: "Greataxe", bonus: "+6", damage: "1d12+3 slashing" },
        { name: "Handaxe", bonus: "+6", damage: "1d6+3 slashing" },
        { name: "Javelin", bonus: "+6", damage: "1d6+3 piercing" }
      ],
      equipment: [
        { name: "Greataxe", quantity: 1, weight: "7 lb." },
        { name: "Explorer's Pack", quantity: 1, weight: "10 lb." },
        { name: "Javelins", quantity: 4, weight: "8 lb." },
        { name: "Chain Mail", quantity: 1, weight: "55 lb." },
        { name: "Backpack", quantity: 1, weight: "5 lb." }
      ],
      currency: {
        copper: 15,
        silver: 30,
        electrum: 0,
        gold: 75,
        platinum: 0
      },
      personalityTraits: "I am always polite and respectful. But when battle starts, I become a force of nature.",
      ideals: "Honor. The way I fight is a reflection of who I am. (Lawful)",
      bonds: "I fight for those who cannot fight for themselves.",
      flaws: "I have trouble trusting strangers. Those who aren't part of my tribe might be waiting to stab me in the back.",
      features: [
        {
          name: "Rage",
          source: "Barbarian",
          description: "In battle, you fight with primal ferocity. On your turn, you can enter a rage as a bonus action. While raging, you gain advantage on STR checks and STR saving throws, +2 damage with melee weapons using STR, and resistance to bludgeoning, piercing, and slashing damage.",
          uses: "3/day"
        },
        {
          name: "Unarmored Defense",
          source: "Barbarian",
          description: "While you are not wearing any armor, your AC equals 10 + your Dexterity modifier + your Constitution modifier."
        },
        {
          name: "Reckless Attack",
          source: "Barbarian",
          description: "You can throw aside all concern for defense to attack with fierce desperation. When you make your first attack on your turn, you can decide to attack recklessly, giving you advantage on melee weapon attack rolls using Strength during this turn, but attack rolls against you have advantage until your next turn."
        },
        {
          name: "Darkvision",
          source: "Dwarf",
          description: "You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light."
        },
        {
          name: "Dwarven Resilience",
          source: "Dwarf",
          description: "You have advantage on saving throws against poison, and you have resistance against poison damage."
        }
      ]
    });
  }
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  async createUser(user) {
    const id = this.userId++;
    const newUser = { ...user, id };
    this.users.set(id, newUser);
    return newUser;
  }
  // Character Sheet Methods
  async getCharacterSheet(id) {
    return this.characterSheets.get(id);
  }
  async getAllCharacterSheets() {
    return Array.from(this.characterSheets.values());
  }
  async createCharacterSheet(character) {
    const id = this.characterId++;
    const newCharacter = { ...character, id };
    this.characterSheets.set(id, newCharacter);
    return newCharacter;
  }
  async updateCharacterSheet(id, updates) {
    const character = this.characterSheets.get(id);
    if (!character) return void 0;
    const updatedCharacter = { ...character, ...updates };
    this.characterSheets.set(id, updatedCharacter);
    return updatedCharacter;
  }
  async deleteCharacterSheet(id) {
    return this.characterSheets.delete(id);
  }
};
var storage = new MemStorage();

// server/routes.ts
async function registerRoutes(app2) {
  app2.get("/api/characters", async (req, res) => {
    try {
      const characters = await storage.getAllCharacterSheets();
      res.json(characters);
    } catch (error) {
      console.error("Error fetching characters:", error);
      res.status(500).json({ message: "Failed to fetch characters" });
    }
  });
  app2.get("/api/characters/:id", async (req, res) => {
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
  app2.post("/api/characters", async (req, res) => {
    try {
      const result = insertCharacterSheetSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({
          message: "Invalid character data",
          errors: result.error.format()
        });
      }
      const character = await storage.createCharacterSheet(req.body);
      res.status(201).json(character);
    } catch (error) {
      console.error("Error creating character:", error);
      res.status(500).json({ message: "Failed to create character" });
    }
  });
  app2.put("/api/characters/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid character ID" });
      }
      const existingCharacter = await storage.getCharacterSheet(id);
      if (!existingCharacter) {
        return res.status(404).json({ message: "Character not found" });
      }
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
  app2.delete("/api/characters/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid character ID" });
      }
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
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5e3;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
