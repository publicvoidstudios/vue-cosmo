<template>
  <div class="container-fluid d-flex align-items-center justify-content-center py-3">
    <div class="container col-md-6 col-lg-4 col-xl-3 mt-2 bg-light-subtle shadow rounded p-3">
      <form class="d-flex flex-column ">
        <h3 class="text-center text-uppercase">Вход в аккаунт</h3>
        <p v-if="warningMessage.length" class="text-danger text-center">{{warningMessage}}</p>
        <div class="mb-3">
          <label>Пользователь (адрес почты):</label>
          <input type="text" class="form-control" placeholder="Имя пользователя или адрес почты" v-model="username">
        </div>

        <div class="mb-3">
          <label>Пароль:</label>
          <input type="password" class="form-control" placeholder="Пароль" v-model="password">
        </div>

        <div class="mb-3" v-if="loginStatus.fail">
          <p class="text-danger">{{ loginStatus.message }}</p>
        </div>

        <button class="btn btn-primary mb-3" @click.prevent="authenticateUser">Войти</button>

        <div class="mb-3 text-center">
          <span>Ещё нет аккаунта? </span>
          <a href="/signup">Зарегистрироваться</a>
        </div>
      </form>
    </div>
  </div>


</template>

<script>
import bcrypt from "bcryptjs";
import router from "@/components/router/router";

export default {
  name: 'login',
  props: {
    warningMessage: {
      type: String
    },
    user: {
      required: true
    }
  },
  data() {
    return {
      username: '',
      password: '',
      loginStatus: {
        fail: false,
        message: ''
      }
    }
  },
  methods: {
    async authenticateUser() {
      const users = await fetch('http://localhost:3000/api/load-users', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({})
      })
          .then(res => res.json())

      const user = users.find(user => user.username === this.username || user.email === this.username);

      //If user found
      if(user !== undefined) {
        //Compare hashed password and input password
        if(bcrypt.compareSync(this.password, user.hashed_password)) {
          this.loginStatus.fail = false;
          this.loginStatus.message = '';
          this.$emit('userLogin', user);
          await router.push('/');
        } else {
          this.loginStatus.fail = true;
          this.loginStatus.message = 'Проверьте правильность введенных данных.';
        }
      } else {
        this.loginStatus.fail = true;
        this.loginStatus.message = 'Пользователь с таким именем/почтой не найден';
      }
    }
  },
  beforeMount() {
    //Check if user already logged in
    if(this.user.id !== -1) {
      //User already logged in
      router.push('/');
    }
  },
  mounted() {
    document.getElementById('pageTitle').innerText = 'Вход';
  }
}
</script>

<style scoped>

</style>