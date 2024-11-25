<script setup lang="ts">
const props = defineProps<{
   popup: boolean;
}>();

const emit = defineEmits(["toggle-modal"]);

const toggle = () => {
   emit("toggle-modal", !props.popup);
};
</script>

<template>
   <div v-if="popup" class="modalOverlay" @click="toggle">
      <div class="modalContent" @click.stop>
         <slot name="content" />
      </div>
   </div>
</template>

<style scoped>
.modalOverlay {
   position: fixed;
   top: 0;
   left: 0;
   right: 0;
   bottom: 0;
   background-color: rgba(0, 0, 0, 0.5);
   display: flex;
   justify-content: center;
   align-items: center;
   z-index: 1000;
   backdrop-filter: blur(10px);
}

.modalContent {
   background-color: #e8e8e8;
   padding: 20px;
   border-radius: 10px;
   width: 400px;
   max-width: 100%;
}
</style>
