<template>
  <div>
    
  </div>
</template>

<script>
import Cookies from 'js-cookie'

export default {
  mounted() {
    console.log(window.opener)
    //this.$store.dispatch("auth/setToken", this.$route.query.token);
    //this.$router.push('/');
    const token = Cookies.get('jwt-token')
    this.$store.dispatch("auth/setToken", token);
    this.$router.push('/admin');
  }
}
</script>

<style lang="scss" scoped>
.page-wrap {
  width: 500px;
}

.mr {
  margin-right: 2rem;
}
</style>

