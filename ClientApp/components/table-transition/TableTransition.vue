<template>
    <div :style="styles" style="position:relative; box-sizing:content-box;">
        <transition :name="name" appear-class="appear" appear-active-class="appear-active" appear-to-class="appear-to"
                    @before-leave="beforeLeave" @leave="leave" @after-leave="afterLeave" @enter="enter" @after-enter="afterEnter">
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
            },
            leaveTransform: {
                type: String,
                default: 'translateX(0px)'
            }
        },
        data: function () {
            return {
                styles: {
                    height: 'auto',
                    transition: 'none'
                }
            };
        },
        methods: {
            beforeLeave(el) {
                this.styles.height = this.getOuterHeight(el);
                this.styles.transition = 'height 500ms cubic-bezier(.15,.58,.46,.96)';

                if (this.name === 'fade') return;

                el.style.transform = this.leaveTransform;
                el.style.position = 'absolute';
                el.style.width = '100%';
            },
            leave(el, done) {
                requestAnimationFrame(() => {
                    let handler = () => {
                        done();
                        el.removeEventListener('transitionend', handler);
                    };
                    el.addEventListener('transitionend', handler);

                    if (this.name === 'slide-left') {
                        el.style.transition = 'all 500ms cubic-bezier(.14,.72,.29,.99)';
                        el.style.transform = 'translateX(-150%)';
                    }
                    else if (this.name === 'slide-right') {
                        el.style.transition = 'all 500ms cubic-bezier(.14,.72,.29,.99)';
                        el.style.transform = 'translateX(150%)';
                    }
                });
            },
            afterLeave(el) {
                if (this.name === 'fade') return;

                el.style.transform = null;
                el.style.transition = null;
                el.style.position = null;
                el.style.width = null;
            },
            enter(el) {
                this.$nextTick(() => this.styles.height = this.getOuterHeight(el));
            },
            afterEnter(el) {
                this.styles.transition = 'none';
                this.styles.height = 'auto';
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
    .slide-right-enter {
        transform: translateX(-150%);
    }

    .slide-left-enter {
        transform: translateX(150%);
    }

    .slide-left-enter-active,
    .slide-right-enter-active {
        position: absolute;
        width: 100%;
        transition: all 500ms cubic-bezier(.15,.58,.46,.96);
    }

    .fade-enter,
    .fade-leave-to {
        opacity: 0;
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

    .appear /deep/ div.card:nth-of-type(even) {
        transform: translateX(400%);
    }

    .appear /deep/ div.card:nth-of-type(odd) {
        transform: translateX(-400%);
    }

    .appear-active {
        transition: all 1000ms cubic-bezier(.07,.82,.39,.98);
    }

        .appear-active /deep/ div.card {
            transition: all 1000ms cubic-bezier(.07,.82,.39,.98);
        }

    .appear-to /deep/ div.card {
        transform: translateX(0%);
    }
</style>
