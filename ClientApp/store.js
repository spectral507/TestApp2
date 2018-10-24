import Vue from 'vue';
import Vuex from 'vuex';
import instance from './instance';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        items: null
    },
    mutations: {
        setItems(state, value) {
            state.items = value;
        },
        deleteItem(state, id) {
            let index = state.items.findIndex(item => item.id === id);
            if (index !== -1) {
                state.items.splice(index, 1);
            }
        },
        doItem(state, id) {
            let item = state.items.find(i => i.id === id);
            if (item !== null) {
                item.done = true;
            }
        },
        createItem(state, item) {
            state.items.push(item);
        },
        editItem(state, item) {
            let targetItem = state.items.find(i => i.id === item.id);
            if (targetItem !== null) {
                targetItem.done = item.done;
                targetItem.description = item.description;
            }
        },
        clearItems(state) {
            state.items = null;
        }
    },
    actions: {
        loadItems(context) {
            return instance({
                url: '/items',
                method: 'GET',
                responseType: 'json'
            }).then(response => {
                context.commit('setItems', response.data);
            });
        },
        async deleteItem(context, id) {
            let response = await instance({
                url: `/items/${id}`,
                method: 'DELETE',
                data: {
                    id: id
                }
            }).then(response => {
                context.commit('deleteItem', id);
            });
        },
        async doItem(context, item) {
            return instance({
                url: `/items/${item.id}`,
                method: 'PUT',
                data: {
                    description: item.description,
                    done: true
                }
            }).then(response => {
                context.commit('doItem', item.id);
            });
        },
        async createItem(context, item) {
            return instance({
                url: `/items`,
                method: 'POST',
                responseType: 'text',
                data: {
                    description: item.description,
                    done: item.done
                }
            }).then(response => {
                if (typeof response.data === 'number') {
                    item.id = response.data;
                    context.commit('createItem', item);
                }
            });
        },
        async editItem(context, item) {
            return instance({
                url: `/items/${item.id}`,
                method: 'PUT',
                data: {
                    description: item.description,
                    done: item.done
                }
            }).then(response => {
                context.commit('editItem', item);
            });
        }
    }
});