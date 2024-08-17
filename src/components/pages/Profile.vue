<template>
  <alert-box ref="alertBox"></alert-box>
  <div class="container">
    <div class="container m-3 p-3">
      <form class="grid">
        <h3>Личные данные</h3>
        <div class="mb-3 row">
          <div class="col-md-6 mb-2">
            <label>Имя</label>
            <input type="text" class="form-control" v-model="userData.first_name" required>
          </div>
          <div class="col-md-6 mb-2">
            <label>Фамилия</label>
            <input type="text" class="form-control" v-model="userData.last_name" required>
          </div>
        </div>
        <div class="mb-3 row">
          <div class="col-md-6 mb-2">
            <label>Никнейм</label>
            <input type="text" class="form-control" v-model="userData.username" required>
          </div>
          <div class="col-md-6 mb-2">
            <label>E-mail</label>
            <input type="email" class="form-control" v-model="userData.email" required>
          </div>
        </div>
        <div class="mb-3 row">
          <div class="col-md-6 mb-2">
            <button class="btn btn-primary col-md-6 w-auto mt-3" @click.prevent="updateUserData(userData.id, userData.first_name, userData.last_name, userData.email, userData.username)">Сохранить</button>
          </div>
        </div>
        <h3>Безопасность</h3>
        <div class="mb-3 row">
          <div class="col-md-6 mb-2">
            <button v-if="changePassword === false" class="btn btn-danger col-md-6 h-100 w-auto" @click.prevent="changePassword = true">Сменить пароль</button>
          </div>

          <form class="row" v-if="changePassword === true">
            <div class="col-md-6 mb-2">
              <label>Текущий пароль</label>
              <div class="input-group">
                <input :type="currentPassword.type" class="form-control" v-model="currentPassword.value" required>
                <button class="input-group-text" style="cursor: pointer;" @click.prevent="toggleShowPassword(currentPassword)">
                  <svg-icon v-if="!currentPassword.show" type="mdi" :path="icons.eyeOff"></svg-icon>
                  <svg-icon v-if="currentPassword.show" type="mdi" :path="icons.eye"></svg-icon>
                </button>
              </div>
            </div>
            <div class="col-md-6 mb-2"></div>
            <div class="col-md-6 mb-2">
              <label>Новый пароль</label>
              <div class="input-group">
                <input :type="newPassword.type" class="form-control" v-model="newPassword.value" required>
                <button class="input-group-text" style="cursor: pointer;" @click.prevent="toggleShowPassword(newPassword)">
                  <svg-icon v-if="!newPassword.show" type="mdi" :path="icons.eyeOff"></svg-icon>
                  <svg-icon v-if="newPassword.show" type="mdi" :path="icons.eye"></svg-icon>
                </button>
              </div>
            </div>
            <div class="col-md-6 mb-2">
              <label>Введите новый пароль повторно</label>
              <div class="input-group">
                <input :type="repeatPassword.type" class="form-control" v-model="repeatPassword.value" required>
                <button class="input-group-text" style="cursor: pointer;" @click.prevent="toggleShowPassword(repeatPassword)">
                  <svg-icon v-if="!repeatPassword.show" type="mdi" :path="icons.eyeOff"></svg-icon>
                  <svg-icon v-if="repeatPassword.show" type="mdi" :path="icons.eye"></svg-icon>
                </button>
              </div>
            </div>
            <div class="col-md-6 mb-2">
              <button v-if="changePassword === true" class="btn btn-primary col-md-6 w-auto mt-3" @click.prevent="setNewPassword(user.id, newPassword.value)">Сохранить</button>
            </div>
          </form>
        </div>
        <h3 class="mt-5 pt-5">Удаление аккаунта</h3>
        <div class="mb-3 row">
          <div class="col-md-6 mb-2">
            <button class="btn btn-danger col-md-6 w-auto mt-3" @click.prevent="removeUser(userData.id, '/api/remove-user')">Удалить аккаунт</button>
          </div>
        </div>
      </form>

    </div>
  </div>
  <!-- Deletion modal window -->
  <div class="modal fade" id="modalAccountDeleting" tabindex="-1" aria-labelledby="modalAccountDeletingLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <!--     Header of modal window     -->
          <h1 class="modal-title fs-5" id="modalAccountDeletingLabel">Удаление аккаунта</h1>
          <!--     Close button     -->
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
        </div>
        <div class="modal-body">
          <p class="text-danger">ПОДТВЕРДИТЕ ДЕЙСТВИЕ</p>
          <p>Вы действительно хотите удалить ваш аккаунт?</p>
          <p>После удаления, восстановить аккаунт будет уже невозможно!</p>
        </div>
        <div class="modal-footer">
          <button
              class="btn btn-danger col-md-6 w-auto mt-3"
              @click.prevent="removeUser(userData.id, '/api/remove-user')"
              data-bs-dismiss="modal"
          >
            Удалить аккаунт
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/components/router/router";
import AlertBox from "@/common/AlertBox.vue";
import bcrypt from "bcryptjs";
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiEye, mdiEyeOff } from '@mdi/js';

export default {
  components: {AlertBox, SvgIcon},
  props: {
    user: {
      required: true
    }
  },
  data() {
    return {
      userData: {
        id: -1,
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        date_stamp: '',
        hashed_password: ''
      },
      changePassword: false,
      currentPassword: {
        value: '',
        show: false,
        type: 'password'
      },
      newPassword: {
        value: '',
        show: false,
        type: 'password',
        hash: ''
      },
      repeatPassword: {
        value: '',
        show: false,
        type: 'password',
        hash: ''
      },
      icons: {
        eye: mdiEye,
        eyeOff: mdiEyeOff
      }
    }
  },
  methods: {
    checkUser() {
      if(this.user.username === 'guest') {
        router.push('/login')
      } else {
        this.userData = this.user;
      }
    },
    async setNewPassword(id, password) {
      try {
        console.log(`Setting new password for user id: ${id}. password: ${password}`)

        if(bcrypt.compareSync(this.currentPassword.value, this.userData.hashed_password)) {
          if(this.newPassword.value.length && this.repeatPassword.value.length) {

            if(this.newPassword.value === this.repeatPassword.value) {
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

              await generateHashedPassword(this.newPassword.value, saltRounds)
                  .then((hashedPassword) => {
                    console.log('Hashed password:', hashedPassword);
                    this.newPassword.hash = hashedPassword;
                  })
                  .catch((error) => {
                    console.error(error);
                  });

              const response = await fetch('http://localhost:3000/api/update-user-password', {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  id: id,
                  hashed_password: this.newPassword.hash
                })
              });

              if (!response.ok) {
                const errorMessage = await response.json();
                throw new Error(errorMessage.error);
              } else {
                //success
                this.userData.hashed_password = this.newPassword.hash;
                this.$emit('userLogin', this.userData);
                this.$refs.alertBox.alertMessage('Пароль успешно изменен', true)
              }

              const data = await response.json();
              if(data.length) {

              } else {
                console.log(`data.length false`)
              }
            } else {
              //Passwords do not match
              this.$refs.alertBox.alertMessage('Пароли не совпадают', false)
              console.log(`Passwords do not match`);
            }

          } else {
            //Fields are empty
            this.$refs.alertBox.alertMessage('Заполните все поля', false)
            console.log(`Fields are empty`);
          }
        } else {
          //Wrong current password
          this.$refs.alertBox.alertMessage('Неверный пароль', false)
          console.log(`Wrong current password`);
        }



      } catch (error) {
        console.error(error);
      }
    },
    async updateUserData(id, first_name, last_name, email, username ) {
      try {
        if(!this.userData.first_name.length || !this.userData.last_name.length || !this.userData.email.length || !this.userData.username.length) {
          //Not all fields are provided
          this.$refs.alertBox.alertMessage('Заполните все поля', false)
        } else {
          const response = await fetch('http://localhost:3000/api/update-user-data', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              id: id,
              first_name: first_name,
              last_name: last_name,
              email: email,
              username: username
            })
          });

          if (!response.ok) {
            //fail
            const errorMessage = await response.json();
            throw new Error(errorMessage.error);
          } else {
            //success
            this.$emit('userLogin', this.userData);
            this.$refs.alertBox.alertMessage('Данные обновлены', true)
          }
        }

      } catch (error) {
        console.error(error);
      }
    },
    removeUser(id, remove_url) {
      // Create the fetch request
      fetch(remove_url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      })
          .then((response) => {
            if (!response.ok) {
              this.$refs.alertBox.alertMessage(`Произошла ошибка. Не удалось удалить аккаунт. Попробуйте повторить.`, false);
              throw new Error('Failed to remove user from the database.');
            } else {
              //Warn user of success
              this.$refs.alertBox.alertMessage(`Ваш аккаунт был удален. Перенаправляем вас на главную страницу...`, true);
              //Reset user to guest
              this.userData = {
                id: -1,
                first_name: 'Гость',
                last_name: '',
                username: 'guest',
                email: '',
                date_stamp: '',
                hashed_password: ''
              }
              this.$emit('userLogin', this.userData);
              //Leave profile page after short timeout
              setTimeout(() => {
                router.push('/');
              }, 2000)
            }

          })
          .catch((error) => {
            console.error(error);
          });
    },
    toggleShowPassword(password) {
      password.show = !password.show;
      password.type = password.type === 'password' ? 'text' : 'password';
    }
  },
  beforeMount() {
    this.checkUser()
  },
  mounted() {
    document.getElementById('pageTitle').innerText = 'Профиль';
  }
}
</script>