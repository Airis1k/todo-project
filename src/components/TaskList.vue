<script setup lang="ts">
import { useTasksStore } from "@/stores/TasksStore";
import TaskColumn from "@/components/TaskColumn.vue";
import TodoLogo from "@/assets/todo-logo.svg";

const taskStore = useTasksStore();
</script>

<template>
   <ul v-if="taskStore.tasksByColumn.size > 0" class="flex gap-x-10">
      <TaskColumn
         v-for="[key, value] in taskStore.tasksByColumn"
         :key="key"
         :logo="TodoLogo"
         :name="key"
         :list="value"
      />
   </ul>
</template>
