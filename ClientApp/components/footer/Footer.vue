<template>
    <transition name="footer" appear>
        <footer class="footer py-2 bg-dark text-white">
            <div class="container text-center">
                <span>2018 <font-awesome-icon :icon="['far', 'copyright']" /> TodoApp</span>
            </div>
        </footer>
    </transition>
</template>

<style>
    .footer {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 50px;
        z-index: 1000;
        box-shadow: 0px 2px 17px black;
    }

    .footer-enter {
        bottom: -50px;
    }

    .footer-enter-to {
        bottom: 0px;
    }

    .footer-enter-active {
        transition: all 1000ms cubic-bezier(.24,.61,.49,.97);
    }
</style>