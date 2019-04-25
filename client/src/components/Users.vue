<template>
    <div class="users">
        <h1>Utilisateurs</h1>
        <div v-if="users.length > 0" class="table-wrap">
            <div>
                <router-link v-bind:to="{ name: 'adduser' }" class="">Ajouter un utilisateur</router-link>
            </div>
            <table>
                <tr>
                    <td width="150">Nom</td>
                    <td width="100">Prénom</td>
                    <td width="100">Rôle</td>
                    <td width="250">Mail</td>
                    <td width="200" align="center">Action</td>
                </tr>
                <tr v-for="user in users">
                    <td>{{ user.name }}</td>
                    <td>{{ user.surname }}</td>
                    <td v-if='user.admin'>Admin</td>
                    <td v-else>Utilisateur</td>

                    <td>{{ user.mail }}</td>
                    <td align="center">
                        <router-link v-bind:to="{ name: 'edituser', params: { id: user._id } }">Modifier</router-link> |
                        <a href="#" @click="deleteUser(user._id)">Supprimer</a>
                    </td>
                </tr>
            </table>
        </div>
        <div v-else>
            There are no user. Lets add one now <br /><br />
            <router-link v-bind:to="{ name: 'adduser' }" class="add_user_link">Add User</router-link>
        </div>
    </div>
</template>

<script>
import UsersService from '@/services/UsersService';

export default {
    name: 'users',
    data () {
        return {
            users: []
        };
    },
    mounted () {
        this.getUsers();
    },
    methods: {
        async getUsers () {
            const response = await UsersService.fetchUsers();
            this.users = response.data.users;
        },
        async deleteUser (id) {
            const $this = this;
            $this.$swal({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then(function () {
                UsersService.deleteUser(id);
                $this.$router.go({
                    path: '/'
                });
            });
        }
    }
};

</script>

<style type="text/css">
.table-wrap {
    width: 60%;
    margin: 0 auto;
    text-align: center;
}
table th, table tr {
    text-align: left;
}
table thead {
    background: #f2f2f2;
}
table tr td {
    padding: 10px;
}
table tr:nth-child(odd) {
    background: #f2f2f2;
}
table tr:nth-child(1) {
    background: #4d7ef7;
    color: #fff;
}
a {
    color: #4d7ef7;
    text-decoration: none;
}
a.add_user_link {
    background: #4d7ef7;
    color: #fff;
    padding: 10px 80px;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: bold;
}
</style>
