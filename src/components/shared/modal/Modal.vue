<template>
    <div :id="id" class="modal-background" v-show="modalActive" @click.stop="emit('click-outside')"></div>
    <Transition name="slide">
        <div class="modal" v-if="modalActive" @click.stop="handleClick">
            <div class="modal-wrapper" ref="modalRef">
                <div class="modal-header">
                    <slot name="header"></slot>
                    <button class="close-btn" @click.stop="emit('close')">
                        <span class="diag close-first-diag"></span>
                        <span class="diag close-sec-diag"></span>
                    </button>
                </div>
                <span class="divider"></span>
                <div class="modal-body">
                    <slot name="main"></slot>
                </div>
                <span class="divider"></span>
                <div class="modal-footer">
                    <slot name="footer"></slot>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script setup>
import { ref } from 'vue';

    
    const { modalActive } = defineProps({
        modalActive: Boolean,
        id: String
    })
    const modalRef = ref(null)

    const emit = defineEmits(['close', 'click-outside'])

    function handleClick(event) {
        if (!modalRef.value.contains(event.target)) {
            emit('click-outside')
        }
    }
</script>

<style scoped>
    .modal-background{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.553);
        backdrop-filter: blur(2px);
    }

    .modal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1000;

        transform: translateY(0%);
        transition: 0.5s ease;
    }

    .modal-wrapper {
        position: relative;
        margin: 0 auto;
        width: 60%;
        background-color: #1a1b1a;
        z-index: 1000;
        min-width: 300px;
    }

    .close-btn {
        border: none;
        cursor: pointer;
        position: relative;
        outline: none;
        height: 20px;
        width: 20px;
        background-color: transparent;
    }

    .close-btn .diag {
        position: absolute;
        display: block;
        height: 2px;
        width: 28px;
        top: 10px;
        left: 0;
        background-color: #2d966e;
    }

    .close-btn .close-first-diag {
        transform: translate(-3px, -2px) rotate(45deg);
    }

    .close-btn .close-sec-diag {
        transform: translate(-3px, -2px) rotate(-45deg);
    }

    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
    }

    .divider::after {
        content: "";
        display: block;
        width: 100%;
        height: 1px;
        background-color: #2d966e;
        margin: 4px 0px;
    }

    .modal-body {
        padding: 24px;
    }

    .modal-footer {
        padding: 12px;
    }

    .slide-enter-from {
        transform: translateY(-100%);
    }

    .slide-enter-to {
        transform: translateY(0%);
    }

    
    .slide-leave-from {
        transform: translateY(0%);
    }

    .slide-leave-to {
        transform: translateY(-100%);
    }
</style>