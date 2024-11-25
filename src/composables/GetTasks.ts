import { readonly, ref } from "vue";
import { ApiService } from "@/services/ApiService";
import type { TaskData } from "@/types/Tasks";
import type { AxiosError } from "axios";

export function useTasks() {
   const taskData = ref<TaskData | null>(null);
   const error = ref<AxiosError | null>(null);
   const loading = ref(false);

   async function fetchTasks() {
      try {
         loading.value = true;

         const response = await ApiService.get("/api/frontend-task-data.json");

         taskData.value = {
            authors: response.data.authors,
            columns: response.data.columns,
            tasks: response.data.tasks,
         };
      } catch (err) {
         error.value = err as AxiosError;
      } finally {
         loading.value = false;
      }
   }

   return {
      taskData,
      error: readonly(error),
      loading: readonly(loading),
      fetchTasks,
   };
}
