import Vue from 'vue';
import Router from 'vue-router';
import users from '@/components/Users';
import adduser from '@/components/AddUser';
import edituser from '@/components/EditUser';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'users',
            component: users
        },
        {
            path: '/user/add',
            component: adduser,
            name: 'adduser'
        },
        {
            path: '/user/:id/edit',
            component: edituser,
            name: 'edituser'
        }
    ]
});
