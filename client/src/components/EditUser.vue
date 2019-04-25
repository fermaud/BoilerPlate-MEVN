<template>
    <div class="users">
        <h1>Edit User</h1>
        <div class="form">
            <div>
                Admin <input type="checkbox" name="admin" id="scale" v-model="admin">
            </div>
            <div>
                <input type="text" name="surname" placeholder="Prénom" v-model="surname">
            </div>
            <div>
                <input type="text" name="name" placeholder="Nom" v-model="name">
            </div>
            <div>
                <input type="text" name="mail" placeholder="Email" v-model="mail">
            </div>
            <div>
                <button class="app_user_btn" @click="updateUser">Update</button>
            </div>
        </div>
    </div>
</template>

<script>
import UsersService from '@/services/UsersService';

export default {
    name: 'edituser',
    data () {
        return {
            name: '',
            surname: '',
            mail: '',
            admin: null
        };
    },
    mounted () {
        this.getUser();
    },
    methods: {
        async getUser () {
            const response = await UsersService.getUser({
                id: this.$route.params.id
            });
            this.admin = response.data.admin;
            this.name = response.data.name;
            this.surname = response.data.surname;
            this.mail = response.data.mail;
        },
        async updateUser () {
            await UsersService.updateUser({
                id: this.$route.params.id,
                mail: this.mail,
                name: this.name,
                surname: this.surname,
                admin: this.admin
            });
            this.$swal(
                'Great!',
                `Your user has been updated!`,
                'success'
                );
            this.$router.push({ name: 'users' });
        }
    }
};

</script>

<style type="text/css">
.form input, .form textarea {
  width: 500px;
  padding: 10px;
  border: 1px solid #e0dede;
  outline: none;
  font-size: 12px;
}
.form div {
  margin: 20px;
}
.app_users_btn {
  background: #4d7ef7;
  color: #fff;
  padding: 10px 80px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
  width: 520px;
  border: none;
  cursor: pointer;
}
</style>

