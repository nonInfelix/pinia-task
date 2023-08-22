const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const supabaseUrl = process.env.VUE_APP_SUPABASE_URL;
const supabaseKey = process.env.VUE_APP_ANON_KEY;
console.log(supabaseKey, supabaseUrl);
const supabase = createClient(supabaseUrl, supabaseKey);

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.get("/api", async (req, res) => {
  try {
    const { data, error } = await supabase.from("tasks").select("*");
    if (error) {
      throw error;
    }
    res.status(200).json(data);
  } catch (error) {
    console.error("Fehler beim Abrufen der Daten:", error);
    res.status(500).json({ error: "Fehler beim Abrufen der Daten" });
  }
});

app.post("/api", async (req, res) => {
  try {
    const { error } = await supabase
      .from("tasks")
      .insert({ title: req.body.title, isFav: req.body.isFav });
    if (error) {
      throw error;
    }
    // erfolgreiche Antwort
    res.status(201).json({ message: "Eintrag wurde erfolgreich hinzugefügt" });
  } catch (error) {
    console.log("Fehler beim Post", error);
    //Fehlerantwort
    res.status(500).json({ error: "Fehler beim Hinzufügen des Eintrags" });
  }
});

app.delete("/api/:id", async (req, res) => {
  try {
    const { id } = req.params; // ID aus URL-Parametern erhalten
    const { error } = await supabase.from("tasks").delete().eq("id", id); // Annahme, dass der Primärschlüssel "id" ist
    if (error) {
      throw error;
    }
    // erfolgreiche Antwort
    res.status(200).json({ message: "Eintrag wurde erfolgreich gelöscht" });
  } catch (error) {
    console.log("Fehler beim Löschen", error);
    // Fehlerantwort
    res.status(500).json({ error: "Fehler beim Löschen des Eintrags" });
  }
});

app.patch("/api/:id", async (req, res) => {
  try {
    const { id } = req.params; // ID aus URL-Parametern erhalten
    const { isFav } = req.body; // Neuen Wert für isFav aus dem Body holen

    const { error } = await supabase
      .from("tasks")
      .update({ isFav })
      .eq("id", id);
    if (error) {
      throw error;
    }
    // erfolgreiche Antwort
    res.status(200).json({ message: "isFav wurde erfolgreich aktualisiert" });
  } catch (error) {
    console.log("Fehler beim Aktualisieren von isFav", error);
    // Fehlerantwort
    res.status(500).json({ error: "Fehler beim Aktualisieren von isFav" });
  }
});

app.listen(3000, () => {
  console.log("Server gestartet auf Port 3000");
});
