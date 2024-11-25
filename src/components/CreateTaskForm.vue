<script setup lang="ts">
import { ref } from "vue";
import type { Author } from "@/types/Tasks";

defineProps<{
   authors: Author[];
}>();

const emit = defineEmits(["create-task"]);

const formValues = ref<{ title: string; author: number }>({
   title: "",
   author: 0,
});

const handleSubmit = () => {
   emit("create-task", formValues.value);
   formValues.value = {
      title: "",
      author: 0,
   };
};
</script>

<template>
   <form
      class="w-full max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 space-y-4"
      @submit.prevent="handleSubmit"
   >
      <div>
         <label for="title" class="block text-sm font-medium text-gray-700 mb-1">Title</label>
         <input
            type="text"
            name="title"
            id="title"
            placeholder="Enter a title"
            v-model="formValues.title"
            class="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-700"
         />
      </div>

      <div>
         <label for="author-select" class="block text-sm font-medium text-gray-700 mb-1"
            >Author</label
         >
         <select
            name="authors"
            id="author-select"
            v-model="formValues.author"
            class="w-full p-2 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 text-gray-700"
         >
            <option :value="0" disabled>--Please choose an Author--</option>
            <option v-for="author in authors" :value="author.id" :key="author.id">
               {{ author.display_name }}
            </option>
         </select>
      </div>

      <div>
         <input
            type="submit"
            value="Submit"
            class="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 focus:outline-none cursor-pointer"
         />
      </div>
   </form>
</template>
