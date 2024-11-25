import { defineStore } from "pinia";
import { ref } from "vue";
import type { TaskData, Task } from "@/types/Tasks";

export const useTasksStore = defineStore("tasks", () => {
   const taskData = ref<TaskData | null>(null);
   const tasksByColumn = ref<Map<string, Task[]>>(new Map());

   function storeTasks(tasksData: TaskData) {
      taskData.value = { ...tasksData };
      initializeTaskMap();
   }

   function initializeTaskMap() {
      if (!taskData.value) return;

      tasksByColumn.value = new Map(taskData.value.columns.map((column) => [column, []]));
      filterTasks();
   }

   function filterTasks() {
      if (!taskData.value) return;

      for (const task of taskData.value.tasks) {
         const columnTasks = tasksByColumn.value.get(task.current_column);
         if (columnTasks) {
            columnTasks.push(task);
         }
      }
   }

   function getAuthor(authorId: number) {
      if (authorId) {
         const result = taskData.value?.authors.find((author) => author.id === authorId);
         return result?.display_name;
      }

      return null;
   }

   return {
      taskData,
      tasksByColumn,
      storeTasks,
      getAuthor,
   };
});
