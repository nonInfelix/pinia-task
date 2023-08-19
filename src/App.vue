<template>
  <main>
    <!-- task header -->
    <header>
      <img src="./assets/pinia-logo.svg" alt="" />
      <h1>Pinia Tasks</h1>
    </header>

    <section class="task-list">
      <div v-for="task in tasksStore.tasks" :key="task.id">
        <TaskDetails :task="task"></TaskDetails>
      </div>
    </section>

    <section class="task-list">
      <div v-for="task in tasksStore.fav" :key="task.id">
        <TaskDetails :task="task"></TaskDetails>
      </div>
    </section>
  </main>
</template>

<script>
import { useTaskStore } from "./stores/TaskStore";
import { mapStores } from "pinia";
import TaskDetails from "./components/TaskDetails.vue";

export default {
  components: {
    TaskDetails,
  },
  computed: {
    ...mapStores(useTaskStore),
  },
};
</script>
<style>
@import url("./assets/main.css");
</style>
