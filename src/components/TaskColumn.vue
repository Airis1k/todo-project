<script setup lang="ts">
import draggable from "vuedraggable";
import IssueLogo from "@/assets/issue-logo.svg";
import { useTasksStore } from "@/stores/TasksStore";
import type { Task } from "@/types/Tasks";

const taskStore = useTasksStore();

defineProps<{
   logo: string;
   name: string;
   list: Task[];
}>();
</script>

<template>
   <li class="w-full min-h-[700px] bg-[#D5CCFF] p-6 rounded-2xl flex flex-col gap-y-6 pr-2.5">
      <div class="flex gap-x-4">
         <img :src="logo" alt="todo icon" />
         <h2 class="text-[32px] text-[#2B1887] font-bold">{{ name }}</h2>
      </div>
      <div class="h-[700px] overflow-auto">
         <draggable
            class="listGroup h-full flex flex-col gap-y-6 min-h-32 pr-1.5"
            :list="list"
            group="tasks"
            itemKey="name"
            :animation="200"
            ghost-class="ghostCard"
         >
            <template #item="{ element }">
               <div
                  class="listGroupItem bg-[#F4F2FF] p-6 rounded-xl flex flex-col gap-y-4 cursor-pointer"
               >
                  <h3 class="text-black text-base font-bold">{{ element.title }}</h3>
                  <div class="flex justify-between items-end">
                     <div class="flex gap-x-2.5 items-start">
                        <img :src="IssueLogo" alt="issue icon" />
                        <p class="text-[#2B1887]">#{{ element.id }}</p>
                     </div>
                     <p class="text-base text-[#2B1887]">
                        {{ taskStore.getAuthor(element.author_id) || "No Author" }}
                     </p>
                  </div>
               </div>
            </template>
         </draggable>
      </div>
   </li>
</template>

<style scoped>
.ghostCard {
   opacity: 0.5;
   background: #f7fafc;
   border: 1px solid #4299e1;
}
</style>
