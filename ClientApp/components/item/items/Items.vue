<template>
    <div>
        <pagination-component :page="page" :total-pages="totalPages" :path-name="pathName"></pagination-component>
        <div class="form-check text-center mb-3">
            <label class="form-check-label">
                <input class="form-check-input" type="checkbox" v-model="showPending"> Show pending
            </label>
        </div>
        <item-list-component :items="paginatedItems" :transitionName="transitionName"
                             :page="page" :total-pages="totalPages"></item-list-component>
        <pagination-component class="mt-3" :page="page" :total-pages="totalPages" :path-name="pathName"></pagination-component>
        <div class="text-center pt-3">
            <router-link to="/items/create" class="btn btn-primary"><font-awesome-icon :icon="['fas', 'plus']" size="2x" /></router-link>
        </div>
    </div>
</template>

<script>
    import PaginationComponent from '../../pagination/Pagination.vue';
    import ItemListComponent from './item-list/ItemList.vue';

    export default {
        name: 'ItemsComponent',
        props: {
            page: {
                type: Number,
                default: 1
            },
            itemsPerPage: {
                type: Number,
                default: 10
            }
        },
        data: function () {
            return {
                pathName: 'items',
                transitionName: 'fade',
                showPending: false
            };
        },
        components: {
            PaginationComponent,
            ItemListComponent
        },
        created() {
            if (this.page < 1) {
                this.$router.push({
                    name: 'items',
                    params: { page: 1 },
                    query: this.$route.query
                });
            }
        },
        watch: {
            page: function (newValue, oldValue) {
                if (newValue < 1) {
                    this.$router.push({
                        name: 'items',
                        params: { page: 1 },
                        query: this.$route.query
                    });
                }
                if (newValue === oldValue + 1) {
                    this.transitionName = 'slide-left';
                }
                else if (newValue === oldValue - 1) {
                    this.transitionName = 'slide-right';
                }
                else {
                    this.transitionName = 'fade';
                }
            }
        },
        computed: {
            items() {
                let items;
                if (!this.showPending) {
                    items = this.$store.state.items;
                }
                else {
                    items = this.$store.state.items.filter(item => !item.done);
                }
                return items;
            },
            paginatedItems() {
                return this.items.slice(
                    (this.page - 1) * this.itemsPerPage, this.page * this.itemsPerPage);
            },
            totalPages() {
                let totalPages = Math.ceil(this.items.length / this.itemsPerPage);
                if (this.page > totalPages) {
                    this.$router.push({
                        name: 'items',
                        params: { page: totalPages },
                        query: this.$route.query
                    });
                }
                return totalPages;
            }
        }
    };
</script>