<script setup lang="ts">
import { onMounted } from "vue";
import { useTasks } from "@/composables/GetTasks";
import { useTasksStore } from "@/stores/TasksStore";
import TaskList from "@/components/TaskList.vue";

const { taskData, fetchTasks } = useTasks();

const tasksStore = useTasksStore();

onMounted(async () => {
   await fetchTasks();
   if (taskData.value) {
      tasksStore.storeTasks(taskData.value);
   }
});
</script>

<template>
   <div class="bg-[#2b1887] h-screen">
      <div class="container mx-auto pt-28">
         <TaskList v-if="tasksStore.taskData" />
      </div>
   </div>
</template>

<style scoped></style>
