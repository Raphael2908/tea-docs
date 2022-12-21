<template>
  <div class="bg-stone-200 min-h-screen">
      <NuxtLoadingIndicator/>
      <NuxtPage class="container mx-auto"/>
  </div>
</template>


<style>
.page-enter-active{
  transition: all 0.4s ease-out;
}
.page-leave-active {
  transition: all 0.4s ease-in;
}

.page-enter-from{
  transform: translateY(200px);
  opacity: 0;
}
.page-leave-to {
  transform: translateY(200px);
  opacity: 0;
}
</style>
