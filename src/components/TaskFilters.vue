<script setup lang="ts">
import { ref } from "vue";
import type { Author } from "@/types/Tasks";
import { useTasksStore } from "@/stores/TasksStore";

defineProps<{
   authors: Author[];
}>();

const searchValues = ref<{ title: string; author: number }>({
   title: "",
   author: 0,
});

const taskStore = useTasksStore();

const handleSubmit = () => {
   taskStore.filterTasks(searchValues.value);
};

const clearTitle = () => {
   searchValues.value.title = "";
};

const clearAuthor = () => {
   searchValues.value.author = 0;
};
</script>

<template>
   <form class="flex items-center gap-4" @submit.prevent="handleSubmit">
      <div class="relative w-48">
         <input
            type="text"
            placeholder="Search by title"
            v-model="searchValues.title"
            class="p-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
         />
         <button
            type="button"
            @click="clearTitle"
            class="absolute right-1 top-1/2 transform -translate-y-1/2 p-1 bg-gray-100 rounded-full hover:bg-gray-200 focus:ring-2 focus:ring-blue-300 focus:outline-none"
         >
            <svg
               xmlns="http://www.w3.org/2000/svg"
               class="h-4 w-4 text-gray-600"
               viewBox="0 0 24 24"
               fill="none"
               stroke="currentColor"
               stroke-width="2"
               stroke-linecap="round"
               stroke-linejoin="round"
            >
               <line x1="18" y1="6" x2="6" y2="18" />
               <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
         </button>
      </div>

      <div class="relative w-48">
         <select
            v-model="searchValues.author"
            class="p-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 bg-white"
         >
            <option :value="0" disabled>Filter by author</option>
            <option v-for="author in authors" :value="author.id" :key="author.id">
               {{ author.display_name }}
            </option>
         </select>
         <button
            type="button"
            @click="clearAuthor"
            class="absolute right-1 top-1/2 transform -translate-y-1/2 p-1 bg-gray-100 rounded-full hover:bg-gray-200 focus:ring-2 focus:ring-blue-300 focus:outline-none"
         >
            <svg
               xmlns="http://www.w3.org/2000/svg"
               class="h-4 w-4 text-gray-600"
               viewBox="0 0 24 24"
               fill="none"
               stroke="currentColor"
               stroke-width="2"
               stroke-linecap="round"
               stroke-linejoin="round"
            >
               <line x1="18" y1="6" x2="6" y2="18" />
               <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
         </button>
      </div>

      <button
         type="submit"
         class="py-2 px-4 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 focus:outline-none"
      >
         Search
      </button>
   </form>
</template>
