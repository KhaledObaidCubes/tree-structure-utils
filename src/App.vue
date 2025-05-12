<template>
  <h1>TREE CONTROLLER</h1>
  <p><strong>YOU ARE ON:</strong> {{ $route.fullPath }}</p>
  <nav>
    <RouterLink class="link" to="/">Tree Manager</RouterLink>
    <RouterLink class="link" to="/Concept-I">Concept I</RouterLink>
    <RouterLink class="link" to="/Concept-II">Concept II</RouterLink>
    <RouterLink class="link" to="/Concept-III">Concept III</RouterLink>
    <RouterLink class="link" to="/Concept-IV">Concept IV</RouterLink>
    <RouterLink class="link" to="/Concept-V">Concept V</RouterLink>
    <hr />
  </nav>
  <main>
    <RouterView />
  </main>
</template>
<style lang="css" scoped>
.link {
  margin-left: 20px;
  color: aliceblue;
  text-decoration: none;
}
.link:hover {
  color: crimson;
}
</style>
