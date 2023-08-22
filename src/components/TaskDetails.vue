<template>
  <div class="task">
    <h3>{{ task.title }}</h3>
    <div class="icons">
      <i @click="tasksStore.deleteTask(task)" class="material-icons">delete</i>
      <i
        @click="tasksStore.favTask(task)"
        class="material-icons"
        :style="{ color: task.isFav ? 'red' : 'grey' }"
        >favorite
      </i>
    </div>
  </div>
</template>

<script>
import { useTaskStore } from "../stores/TaskStore";
import { mapStores } from "pinia";

export default {
  props: ["task"],
  computed: {
    ...mapStores(useTaskStore),
  },
};
</script>
