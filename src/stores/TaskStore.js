import { defineStore } from "pinia";

// erstellt neuen Store, speichert in Variable und exportiert diesen
export const useTaskStore = defineStore("tasks", {
  state: () => ({
    // task state
    tasks: [],
    isLoading: false,
    name: "Pinia Tasks",
  }),
  getters: {
    fav(state) {
      return state.tasks.filter((t) => t.isFav);
    },
    favCount(state) {
      return state.tasks.reduce((p, c) => {
        return c.isFav ? p + 1 : p;
      }, 0);
    },
    totalCount(state) {
      return state.tasks.length;
    },
  },
  actions: {
    async getTasks() {
      this.isLoading = true;
      const res = await fetch("http://localhost:3000/api");
      const data = await res.json();

      this.tasks = data;
      this.isLoading = false;
    },
    async addTask(task) {
      this.tasks.push(task);

      const res = await fetch("http://localhost:3000/api", {
        method: "POST",
        body: JSON.stringify(task),
        headers: { "Content-Type": "application/json" },
      });
      if (res.error) {
        console.log(res.error);
      }
    },
    async deleteTask(task) {
      const index = this.tasks.indexOf(task);
      this.tasks.splice(index, 1);
      console.log(task.id);

      const res = await fetch(`http://localhost:3000/api/${task.id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        console.log("Fehler beim Löschen", res.statusText);
      }
    },
    async favTask(task) {
      const index = this.tasks.indexOf(task);
      this.tasks[index].isFav = !this.tasks[index].isFav;

      const res = await fetch(`http://localhost:3000/api/${task.id}`, {
        method: "PATCH",
        body: JSON.stringify({ isFav: task.isFav }),
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) {
        console.log("Fehler beim Aktualisieren von isFav", res.statusText);
      }
    },
  },
});
