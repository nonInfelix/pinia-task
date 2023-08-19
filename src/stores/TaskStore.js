import { defineStore } from "pinia";

// erstellt neuen Store, speichert in Variable und exportiert diesen
export const useTaskStore = defineStore("tasks", {
  state: () => ({
    // task state
    tasks: [
      { id: 1, title: "example task 1", isFav: false },
      { id: 2, title: "example task 2", isFav: true },
    ],
    name: "Pinia Tasks",
  }),
});
