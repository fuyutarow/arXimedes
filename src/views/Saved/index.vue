<template>
  <div>
    <EntryCard :entry="entry" v-for="(entry, $index) in entries" :key="$index" />
  </div>
</template>

<script lang='ts' src='./script'></script>

<style scoped lang="scss" src='./style.scss'></style>
