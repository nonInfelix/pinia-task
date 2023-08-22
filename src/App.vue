<template>
  <main>
    <header>
      <div class="img-container">
        <img src="./assets/pinia-logo.svg" alt="" />
      </div>
      <h1>Pinia Tasks</h1>
    </header>
    <TaskForm></TaskForm>
    <div class="btn-menu">
      <button class="btn" @click="taskStatus = 'all'">Show all Tasks</button>
      <button class="btn" @click="taskStatus = 'fav'">
        Show favorite Tasks
      </button>
      <div v-if="tasksStore.isLoading" class="loading">Loading Tasks</div>
    </div>
    <section v-if="taskStatus == 'all'" class="task-list">
      <p>You have {{ tasksStore.totalCount }} tasks</p>
      <div v-for="task in tasksStore.tasks" :key="task.id">
        <TaskDetails :task="task"></TaskDetails>
      </div>
    </section>

    <section v-if="taskStatus == 'fav'" class="task-list">
      <p>You have {{ tasksStore.favCount }} favorite tasks</p>
      <div v-for="task in tasksStore.fav" :key="task.id">
        <TaskDetails :task="task"></TaskDetails>
      </div>
    </section>
    <div v-if="tasksStore.tasks.length > 0" class="btn-container">
      <button class="btn btn-reset" @click="tasksStore.$reset">reset</button>
    </div>
  </main>
</template>

<script>
import { useTaskStore } from "./stores/TaskStore";
import { mapStores } from "pinia";
import TaskDetails from "./components/TaskDetails.vue";
import TaskForm from "./components/TaskForm.vue";

export default {
  components: {
    TaskDetails,
    TaskForm,
  },
  data() {
    return {
      taskStatus: "all",
    };
  },
  computed: {
    ...mapStores(useTaskStore),
  },
  created() {
    this.tasksStore.getTasks();
  },
};
</script>
<style>
@import url("./assets/main.css");
</style>
