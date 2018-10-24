<template>
    <div>
        <enter-leave-transition :name="transitionName">
            <router-view></router-view>
        </enter-leave-transition>
    </div>
</template>

<script>
    import ItemsComponent from './items/Items.vue';
    import ItemEditComponent from './edit-item/EditItem.vue';
    import EnterLeaveTransition from '../enter-leave-transition/EnterLeaveTransition';

    export default {
        name: 'ItemComponent',
        data: function () {
            return {
                transitionName: 'fade'
            };
        },
        components: {
            ItemsComponent,
            ItemEditComponent,
            EnterLeaveTransition
        },
        watch: {
            '$route'(to, from) {
                if (from.name === 'items') {
                    if (to.name === 'edit' || to.name === 'create') {
                        this.transitionName = 'slide-left';
                    }
                }
                if (from.name === 'edit' || from.name === 'create') {
                    if (to.name === 'items') {
                        this.transitionName = 'slide-right';
                    }
                }
            }
        }
    };
</script>