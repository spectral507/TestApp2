<template>
    <div v-bind:style="containerStyles" style="position:relative; box-sizing:border-box;">
        <transition :name="name" @before-leave="beforeLeave" @enter="enter" @after-enter="afterEnter">
            <slot></slot>
        </transition>
    </div>
</template>

<script>
    export default {
        name: 'EnterLeaveTransition',
        props: {
            name: {
                type: String,
                default: 'fade'
            }
        },
        data: function () {
            return {
                containerStyles: {
                    height: 'auto',
                    transition: 'none'
                }
            };
        },
        methods: {
            beforeLeave(el) {
                this.containerStyles.height = this.getOuterHeight(el);
                this.containerStyles.transition = 'height 500ms cubic-bezier(.24,.61,.49,.97)';
            },
            enter(el) {
                this.$nextTick(() => this.containerStyles.height = this.getOuterHeight(el));
            },
            afterEnter(el) {
                this.containerStyles.transition = 'none';
                this.containerStyles.height = 'auto';
            },
            getOuterHeight(el) {
                let elemHeight, elemMargin;
                elemHeight = parseInt(document.defaultView.getComputedStyle(el, '').getPropertyValue('height'));
                elemMargin = parseInt(document.defaultView.getComputedStyle(el, '').getPropertyValue('margin-top'))
                    + parseInt(document.defaultView.getComputedStyle(el, '').getPropertyValue('margin-bottom'));
                return `${elemHeight + elemMargin}px`;
            }
        }
    };
</script>

<style scoped>
    .slide-right-enter,
    .slide-left-leave-to {
        transform: translateX(-150%);
    }

    .slide-right-leave-to,
    .slide-left-enter {
        transform: translateX(150%);
    }

    .fade-enter,
    .fade-leave-to {
        opacity: 0;
    }

    .slide-left-enter-active,
    .slide-left-leave-active,
    .slide-right-enter-active,
    .slide-right-leave-active,
    .slide-up-enter-active,
    .slide-up-leave-active,
    .slide-down-enter-active,
    .slide-down-leave-active {
        position: absolute;
        width: 100%;
        transition: all 500ms ease-out;
    }

    .fade-leave-active {
        position: absolute;
        width: 100%;
        transition: all 250ms;
    }

    .fade-enter-active {
        position: absolute;
        width: 100%;
        transition: all 250ms;
        transition-delay: 250ms;
    }

    .slide-down-enter,
    .slide-up-leave-to {
        transform: translateY(-200vh);
    }

    .slide-up-enter,
    .slide-down-leave-to {
        transform: translateY(200vh);
    }

    .slide-down-enter-to,
    .slide-up-leave {
        transform: translateY(0%);
    }
</style>
