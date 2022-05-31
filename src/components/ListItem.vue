<template>
<!-- <h3>{{item}}</h3> -->
{{item}}
<!-- <h3> {{ $store.state.lists }} </h3> -->

</template>
<script>

export default{
props: ['item']
  // { id, order, title, done, createdAt, updatedAt }
}
</script>