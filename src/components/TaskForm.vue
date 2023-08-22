<template>
  <div class="task-form">
    <form @submit.prevent="handleSubmit">
      <input type="text" placeholder="schreibe etwas.." v-model="newTask" />
      <button class="btn-submit">Add</button>
    </form>
  </div>
</template>

<script>
import { useTaskStore } from "../stores/TaskStore";
import { mapStores } from "pinia";

export default {
  data() {
    return {
      newTask: "",
    };
  },
  computed: {
    ...mapStores(useTaskStore),
  },
  methods: {
    handleSubmit() {
      if (this.newTask.length > 0) {
        this.tasksStore.addTask({
          id: this.tasksStore.totalCount + 1,
          title: this.newTask,
          isFav: false,
        });
      }
      this.newTask = "";
      console.log(this.tasksStore.tasks);
    },
  },
};
</script>
