<template>
  <alert-box ref="alertBox"></alert-box>
  <div class="container-fluid h-auto d-flex align-items-center justify-content-center py-3">
    <div class="container col-md-6 col-lg-4 col-xl-3 mt-2 bg-light-subtle shadow rounded p-3">
      <form class="d-flex flex-column ">
        <h3>Регистрация</h3>

        <div class="mb-3">
          <label>Имя:</label>
          <input type="text" class="form-control" placeholder="Ваше имя" v-model="new_user.first_name">
        </div>

        <div class="mb-3">
          <label>Фамилия:</label>
          <input type="text" class="form-control" placeholder="Ваша фамилия" v-model="new_user.last_name">
        </div>

        <div class="mb-3">
          <label>Никнейм:</label>
          <input type="text" class="form-control" placeholder="Ваш никнейм" v-model="new_user.username">
        </div>

        <div class="mb-3">
          <label>Почта (e-mail):</label>
          <input type="email" class="form-control" placeholder="example@mail.com" v-model="new_user.email">
        </div>

        <div class="mb-3">
          <label>Пароль:</label>
          <input type="password" class="form-control" placeholder="Придумайте пароль" v-model="new_user.password">
        </div>

        <div class="mb-3">
          <label>Повторите пароль:</label>
          <input type="password" class="form-control" placeholder="Повторите пароль" v-model="new_user.passwordRepeat">
        </div>

        <button class="btn btn-primary mb-3" @click.prevent="registerUser">Зарегистрироваться</button>

        <div class="mb-3 text-center">
          <span>Уже зарегистрированы? </span>
          <a href="/login">Войти</a>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import router from "@/components/router/router";
import bcrypt from "bcryptjs";
import AlertBox from "@/common/AlertBox.vue";

export default {
  components: {AlertBox},
  props: {
    user: {
      required: true
    }
  },
  data() {
    return {
      new_user: {
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        password: '',
        passwordRepeat: '',
        hashed_password: ''
      }
    }
  },
  methods: {
    async registerUser() {
      if(this.new_user.last_name.length && this.new_user.first_name.length && this.new_user.email.length && this.new_user.username.length && this.new_user.password.length && this.new_user.passwordRepeat.length) {

        if(this.new_user.password === this.new_user.passwordRepeat) {

          const saltRounds = 10;
          const generateHashedPassword = (plaintextPassword, saltRounds) => {
            return new Promise((resolve, reject) => {
              bcrypt.genSalt(saltRounds, (err, salt) => {
                bcrypt.hash(plaintextPassword, salt, (err, hash) => {
                  if (err) {
                    reject(err);
                  } else {
                    resolve(hash);
                  }
                });
              });
            });
          };

          await generateHashedPassword(this.new_user.password, saltRounds)
              .then((hashedPassword) => {
                this.new_user.hashed_password = hashedPassword;
              })
              .catch((error) => {
                console.error(error);
              });

          await fetch('/api/register-user', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: this.new_user.email,
              username: this.new_user.username,
              hashed_password: this.new_user.hashed_password,
              first_name: this.new_user.first_name,
              last_name: this.new_user.last_name,
              admin: false
            })
          })
              .then(res => {
                if (!res.ok) {
                  this.$refs.alertBox.alertMessage(`Не удалось зарегистрировать нового пользователя`, false);
                } else {
                  this.$refs.alertBox.alertMessage(`Регистрация прошла успешно, перенаправляем на страницу входа...`, true);
                  res.json(); // Parse the response as JSON
                  setTimeout(() => {
                    router.push('/login')
                  }, 2000)
                }
              })
              .catch((err) => {
                this.$refs.alertBox.alertMessage(err.message, false);
              });

        } else {
          this.$refs.alertBox.alertMessage(`Пароли не совпадают.`, false);
        }

      } else {
        this.$refs.alertBox.alertMessage(`Не все поля заполнены.`, false);
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
    document.getElementById('pageTitle').innerText = 'Регистрация';
  }
}
</script>