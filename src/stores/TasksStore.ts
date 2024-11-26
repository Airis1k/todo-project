import { defineStore } from "pinia";
import { ref } from "vue";
import type { TaskData, Task, Column } from "@/types/Tasks";

export const useTasksStore = defineStore("tasks", () => {
   const taskData = ref<TaskData | null>(null);
   const tasksByColumn = ref<Map<string, Task[]>>(new Map());

   function storeTasks(tasksData: TaskData) {
      taskData.value = { ...tasksData };
      initializeTaskMap();
      filterTasksByColumn();
   }

   function initializeTaskMap() {
      if (!taskData.value) return;

      tasksByColumn.value = new Map(taskData.value.columns.map((column) => [column, []]));
   }

   function filterTasksByColumn() {
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

   function addTask(taskParam: { title: string; author: number }) {
      if (taskData.value) {
         const id = taskData.value.tasks.length + 1;
         const rawData = {
            id: id,
            title: taskParam.title,
            author_id: taskParam.author,
            date_created: "2024-11-25",
            current_column: "To do" as Column,
         };
         tasksByColumn.value.get("To do")?.push(rawData);
         taskData.value.tasks.push(rawData);
      }
   }

   function filterTasks(search: { title: string; author: number }) {
      if (!taskData.value) return;

      initializeTaskMap();

      for (const task of taskData.value.tasks) {
         const matchesTitle = search.title
            ? task.title.toLowerCase().includes(search.title.toLowerCase())
            : true;
         const matchesAuthor = search.author ? task.author_id === search.author : true;

         if (matchesTitle && matchesAuthor) {
            const columnTasks = tasksByColumn.value.get(task.current_column);
            if (columnTasks) {
               columnTasks.push(task);
            }
         }
      }
   }

   return {
      taskData,
      tasksByColumn,
      storeTasks,
      getAuthor,
      addTask,
      filterTasks,
   };
});
