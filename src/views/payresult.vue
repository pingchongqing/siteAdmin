<template lang="html">
  <div class="app-container">

  </div>
</template>

<script>
export default {
  created() {
    this.$alert('支付成功', '提示', {
      confirmButtonText: '确定',
      type: 'success',
      callback: action => {
        this.$router.push('/')
      }
    })
  }
}
</script>

<style lang="css">
</style>
