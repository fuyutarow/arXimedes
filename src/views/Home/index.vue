<template>
  <div>
    <EntryCard :entry="entry" v-for="(entry, $index) in entries" :key="$index" />
    <infinite-loading ref="infiniteLoading" spinner="spiral" @infinite="infiniteHandler"> </infinite-loading>
  </div>
</template>

<script lang='ts' src='./script'></script>

<style scoped lang="scss" src='./style.scss'></style>
