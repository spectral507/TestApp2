<template>
    <div id="app">
        <vue-progress-bar></vue-progress-bar>
        <navbar-component></navbar-component>
        <div class="container">
            <enter-leave-transition :name="transitionName" class="mb-4">
                <router-view />
            </enter-leave-transition>
        </div>
        <footer-component></footer-component>
    </div>
</template>

<script>
    import NavbarComponent from './components/navbar/Navbar.vue';
    import FooterComponent from './components/footer/Footer.vue';
    import EnterLeaveTransition from './components/enter-leave-transition/EnterLeaveTransition.vue';

    export default {
        name: 'AppComponent',
        components: {
            NavbarComponent,
            FooterComponent,
            EnterLeaveTransition
        },
        data: function () {
            return {
                transitionName: 'fade'
            };
        },
        watch: {
            '$route': function (to, from) {
                if (from.name === 'items') {
                    if (to.name === 'about') {
                        this.transitionName = 'slide-up';
                    }
                }
                else if (from.name === 'about') {
                    if (to.name === 'items') {
                        this.transitionName = 'slide-down';
                    }
                }
                else {
                    this.transitionName = 'fade';
                }
            }
        }
    };
</script>