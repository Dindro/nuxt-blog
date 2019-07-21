<template>
  <el-card shadow="hover" :body-style="{padding: 0}" class="post">
    <header slot="header" class="post-header">
      <h3>Post title</h3>
      <small>
        <i class="el-icon-time"></i>
        {{ new Date().toLocaleString() }}
      </small>
    </header>
    <div class="post-body">
      <img
        src="https://mirpozitiva.ru/uploads/posts/2016-08/medium/1472042903_31.jpg"
        alt="post image"
        class="post-img"
      />
    </div>
    <footer class="post-footer">
      <el-button round @click="openPost">Открыть</el-button>
      <span>
        <i class="el-icon-chat-square"></i>
        12
      </span>
    </footer>
  </el-card>
</template>

<script>
export default {
  methods: {
    openPost() {
      const id = 'test';
      this.$router.push(`/post/${id}`)
    }
  }
};
</script>

<style lang="scss" scoped>
.post {
  margin-bottom: 1.5rem;
}

.post-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.post-img {
  width: 100%;
  height: auto;
}

.post-body {
  
}

.post-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
}
</style>

