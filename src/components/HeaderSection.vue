<script setup lang="ts">
import MarkSign from "@/assets/mark-sign.svg";
import type { Author } from "@/types/Tasks";
import TaskFilters from "@/components/TaskFilters.vue";

const props = defineProps<{
   popup: boolean;
   authors: Author[];
}>();

const emit = defineEmits(["toggle-modal"]);

const toggle = () => {
   emit("toggle-modal", !props.popup);
};
</script>

<template>
   <header class="container mx-auto flex justify-end p-6 gap-x-5">
      <TaskFilters :authors="authors" />
      <button class="bg-[#D5CCFF] rounded-full p-2.5" @click="toggle">
         <img :src="MarkSign" class="block" />
      </button>
   </header>
</template>
