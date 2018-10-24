<template>
    <div>
        <v-touch @panstart="onPanStart" @panmove="onPanMove" @panend="onPanEnd">
            <div :style="divStyles">
                <table-transition :name="transitionName" :leaveTransform="leaveTransform">
                    <div v-if="items" :key="page" :style="containerStyle" style="padding-bottom:1px;">
                        <transition-group tag="div" name="list" style="position:relative;">
                            <div v-for="(item, index) in items" :key="item.id" class="card mb-1">
                                <div class="row">
                                    <div class="col-sm-5 col-md-6 text-center text-sm-left d-flex align-items-center justify-content-center">
                                        <span>{{item.description}}</span>
                                    </div>
                                    <div class="col-sm-2 text-center d-flex align-items-center justify-content-center" style="vertical-align:middle;">
                                        <transition mode="out-in" enter-active-class="animated fadeIn" leave-active-class="animated hinge">
                                            <span v-if="item.done" key="0" class="badge badge-success text-white px-2 pb-2 m-1" :style="{ 'z-index': 1040 - index }" style="font-size:0.9em;">Done</span>
                                            <span v-else key="1" class="badge badge-warning text-white px-2 pb-2 m-1" :style="{ 'z-index': 1040 - index }" style="font-size:0.9em;">Pending</span>
                                        </transition>
                                    </div>
                                    <div class="col-sm-5 col-md-4 text-white d-flex align-items-center justify-content-center">
                                        <transition-group name="button">
                                            <a class="btn btn-success m-1" v-if="!item.done" @click="doItem(item)" key="0"><font-awesome-icon :icon="['fas', 'check']" /></a>
                                            <router-link :to="{ name: 'edit', params: { id: item.id }, query: { return: '/items/page-' + page }}" class="btn btn-warning my-1 text-white" key="1"><font-awesome-icon :icon="['fas', 'edit']" /></router-link>
                                            <a class="btn btn-danger my-1 ml-3" @click="deleteItem(item)" key="2"><font-awesome-icon :icon="['fas', 'trash']" /></a>
                                        </transition-group>
                                    </div>
                                </div>
                            </div>
                        </transition-group>
                    </div>
                </table-transition>
            </div>
        </v-touch>
    </div>
</template>

<script>
    import TableTransition from '../../../table-transition/TableTransition';
    import TWEEN from '@tweenjs/tween.js';
    import swal from 'sweetalert';

    export default {
        name: 'ItemListComponent',
        props: ['items', 'transitionName', 'page', 'totalPages'],
        components: {
            TableTransition
        },
        data: function () {
            return {
                x: { value: 0 },
                prevX: 0,
                tween: null,
                leaveTransform: null,
                navAllowed: true,
                containerStyle: {
                    height: 'auto',
                    transition: null
                }
            };
        },
        computed: {
            divStyles() {
                return {
                    transform: `translateX(${this.x.value}px)`
                };
            },
        },
        watch: {
            items(value, oldValue) {
                if (value.length === 0 && this.page > 1) {
                    this.$router.push({ name: 'items', params: { page: this.page - 1 } });
                }
            }
        },
        created() {
            this.tween = new TWEEN.Tween(this.x);
            this.tween.easing(TWEEN.Easing.Elastic.Out);
            this.tween.to({ value: 0 }, 500);

            document.addEventListener('keydown', (e) => {
                if (e.keyCode === 37) {
                    if (this.page > 1 && this.navAllowed) {
                        this.navAllowed = false;
                        this.$router.push({ name: 'items', params: { page: this.page - 1 } });
                        setTimeout(() => {
                            this.navAllowed = true;
                        }, 200);
                    }
                }
                else if (e.keyCode === 39) {
                    if (this.page < this.totalPages && this.navAllowed) {
                        this.navAllowed = false;
                        this.$router.push({ name: 'items', params: { page: this.page + 1 } });
                        setTimeout(() => {
                            this.navAllowed = true;
                        }, 200);
                    }
                }
            });
        },
        methods: {
            onPanStart(e) {
                if (this.tween.isPlaying()) {
                    this.tween.stop();
                }
                this.prevX = e.center.x;
            },
            onPanMove(e) {
                e.preventDefault();

                let deltaX = e.center.x - this.prevX;
                this.prevX = e.center.x;
                this.x.value = this.x.value + deltaX;
            },
            onPanEnd(e) {
                if (this.x.value < -200) {
                    if (this.page === this.totalPages) {
                        this.tween.easing(TWEEN.Easing.Elastic.Out);
                        this.tween.start();
                        this.animate();
                    }
                    else {
                        this.leaveTransform = `translateX(${this.x.value}px)`;
                        this.x.value = 0;
                        this.$router.push({ name: 'items', params: { page: this.page + 1 } });
                    }
                }
                else if (this.x.value > 200) {
                    if (this.page === 1) {
                        this.tween.easing(TWEEN.Easing.Elastic.Out);
                        this.tween.start();
                        this.animate();
                    }
                    else {
                        this.leaveTransform = `translateX(${this.x.value}px)`;
                        this.x.value = 0;
                        this.$router.push({ name: 'items', params: { page: this.page - 1 } });
                    }
                }
                else {
                    this.tween.easing(TWEEN.Easing.Elastic.Out);
                    this.tween.start();
                    this.animate();
                }
            },
            async deleteItem(item) {
                let value = await swal({
                    title: 'Remove the todo?',
                    text: `${item.description}`,
                    icon: 'warning',
                    dangerMode: true,
                    buttons: {
                        cancel: {
                            text: "Cancel",
                            value: null,
                            visible: true,
                            className: "btn btn-outline-primary",
                            closeModal: true,
                        },
                        confirm: {
                            text: "OK",
                            value: true,
                            visible: true,
                            className: "btn btn-primary",
                            closeModal: true
                        }
                    }
                });
                if (value) {
                    await this.$store.dispatch('deleteItem', item.id);
                    swal({
                        title: 'Todo removed',
                        icon: 'success',
                        buttons: {
                            confirm: {
                                text: "OK",
                                value: true,
                                visible: true,
                                className: "btn btn-primary",
                                closeModal: true
                            }
                        }
                    });
                }
            },
            async doItem(item) {
                await this.$store.dispatch('doItem', item);
            },
            animate() {
                if (TWEEN.update()) {
                    requestAnimationFrame(this.animate);
                }
            }
        }
    };
</script>

<style scoped>
    .btn.btn-warning:active {
        color: white;
    }

    .list-enter-active {
        transition: all 1000ms;
    }

    .list-leave-active {
        transition: all 200ms;
    }

    .list-enter,
    .list-leave-to {
        opacity: 0;
    }

    .list-move {
        transition: all 500ms;
    }

    .list-leave-active {
        position: absolute;
        width: 100%;
    }

    .button-enter-active {
        transition: all 1000ms;
    }

    .button-leave-active {
        transition: all 200ms;
    }

    .button-enter,
    .button-leave-to {
        opacity: 0;
    }

    .button-move {
        transition: all 500ms;
    }

    .button-leave-active {
        position: absolute;
    }
</style>