<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useTasks } from "./composables/GetTasks";
import { useTasksStore } from "./stores/TasksStore";
import { RouterView } from "vue-router";
import HeaderSection from "@/components/HeaderSection.vue";
import ModalComponent from "./components/ModalComponent.vue";
import CreateTaskForm from "./components/CreateTaskForm.vue";

const { taskData, fetchTasks } = useTasks();

const tasksStore = useTasksStore();

onMounted(async () => {
   await fetchTasks();
   if (taskData.value) {
      tasksStore.storeTasks(taskData.value);
   }
});

const showPopup = ref(false);

const toggle = (on: boolean) => {
   showPopup.value = on;
};

const createTask = (formValues: { title: string; author: number }) => {
   tasksStore.addTask(formValues);
   toggle(false);
};
</script>

<template>
   <div v-if="tasksStore.taskData" class="bg-[#2b1887]">
      <HeaderSection
         :popup="showPopup"
         :authors="tasksStore.taskData.authors"
         @toggle-modal="toggle"
      />

      <main>
         <RouterView />
      </main>

      <ModalComponent :popup="showPopup" @toggle-modal="toggle">
         <template #content>
            <CreateTaskForm :authors="tasksStore.taskData.authors" @create-task="createTask" />
         </template>
      </ModalComponent>
   </div>
</template>
