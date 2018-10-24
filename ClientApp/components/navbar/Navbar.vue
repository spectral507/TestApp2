<template>
    <transition name="navbar" appear>
        <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
            <div class="container">
                <router-link class="navbar-brand m-auto" style="padding-left:46px;" to="/">TodoApp</router-link>
                <button class="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="icon-bar top-bar"></span>
                    <span class="icon-bar middle-bar"></span>
                    <span class="icon-bar bottom-bar"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav text-center">
                        <li class="nav-item">
                            <router-link class="nav-link" to="/items" @click.native="hide">Items</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" to="/about" @click.native="hide">About</router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </transition>
</template>

<script>
    export default {
        methods: {
            hide() {
                $('.navbar-collapse').collapse('hide');
            }
        }
    };
</script>

<style>
    .navbar {
        z-index: 1000;
        box-shadow: 0px -2px 17px black;
    }

    .navbar-dark .navbar-nav .nav-link.router-link-active {
        color: #fff;
    }

    .navbar-enter {
        top: -60px;
    }

    .navbar-enter-to {
        top: 0px;
    }

    .navbar-enter-active {
        transition: all 1000ms cubic-bezier(.24,.61,.49,.97);
        position: relative;
    }

    /* ===== START Hamburger button toggle animation ===== */
    .icon-bar {
        width: 22px;
        height: 2px;
        background-color: #B6B6B6;
        display: block;
        transition: all 0.2s;
        margin-top: 4px
    }

    .navbar-toggler {
        border: none;
        background: transparent !important;
    }

        .navbar-toggler:focus {
            outline: none;
        }

        .navbar-toggler .top-bar {
            transform: rotate(45deg);
            transform-origin: 10% 10%;
        }

        .navbar-toggler .middle-bar {
            opacity: 0;
        }

        .navbar-toggler .bottom-bar {
            transform: rotate(-45deg);
            transform-origin: 10% 90%;
        }

        .navbar-toggler.collapsed .top-bar {
            transform: rotate(0);
        }

        .navbar-toggler.collapsed .middle-bar {
            opacity: 1;
        }

        .navbar-toggler.collapsed .bottom-bar {
            transform: rotate(0);
        }
    /* ===== END Hamburger button toggle animation ===== */
</style>