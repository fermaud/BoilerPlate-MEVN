<template>
    <div class="users">
        <h1>Créer un utilisateur</h1>
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
                <button class="app_user_btn" @click="addUser">Add</button>
            </div>
        </div>
    </div>
</template>

<script>
import UsersService from '@/services/UsersService';

export default {
    name: 'adduser',
    data () {
        return {
            name: '',
            surname: '',
            mail: '',
            admin: null
        };
    },
    methods: {
        async addUser () {
            await UsersService.addUser({
                name: this.name,
                surname: this.surname,
                mail: this.mail,
                admin: this.admin
            });
            this.$swal('Enregistré !', 'L\'utilisateur ' + this.mail + ' à été ajouté !', 'success');
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

.app_user_btn {
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

