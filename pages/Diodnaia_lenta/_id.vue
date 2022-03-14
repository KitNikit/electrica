<template>
  <div>
    <h1>{{ $route.params.id }}</h1>
    <h1>{{ $store.state.diodnaia_lenta.items[$route.params.id] }}</h1>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
