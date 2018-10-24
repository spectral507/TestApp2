import Vue from 'vue';
import Router from 'vue-router';
import ItemComponent from './components/item/Item.vue';
import ItemsComponent from './components/item/items/Items.vue';
import EditItemComponent from './components/item/edit-item/EditItem.vue';
import AboutComponent from './components/about/About.vue';
import store from './store';

Vue.use(Router);

export default new Router({
    mode: 'history',
    store,
    routes: [
        {
            path: '/',
            redirect: '/items/page-1'
        },
        {
            path: '/items',
            redirect: '/items/page-1'
        },
        {
            path: '/items',
            name: 'item',
            component: ItemComponent,
            beforeEnter: (to, from, next) => {
                if (!store.state.items) {
                    store.dispatch('loadItems')
                        .then(() => next())
                        .catch((error) => {
                            next(false);
                        });
                    return;
                }
                next();
            },
            children: [
                {
                    path: 'page-:page(\\d+)',
                    name: 'items',
                    component: ItemsComponent,
                    props: route => {
                        return {
                            page: parseInt(route.params.page) || undefined,
                            itemsPerPage: parseInt(route.query['items-per-page']) || undefined
                        };
                    }
                },
                {
                    path: 'create',
                    name: 'create',
                    component: EditItemComponent
                },
                {
                    path: 'edit/:id(\\d+)',
                    name: 'edit',
                    component: EditItemComponent
                }
            ]
        },
        {
            path: '/about',
            name: 'about',
            component: AboutComponent
        }
    ]
});