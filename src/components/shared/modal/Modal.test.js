import { shallowMount } from '@vue/test-utils';
import Modal from './Modal.vue';
import { beforeEach } from 'vitest';

describe('Modal', () => {
    let wrapper = null;
    beforeEach(() => {
        wrapper = shallowMount(Modal, {
            props: {
                modalActive: true,
            },
        });
    });
    
    it('renders modal when modalActive is true', () => {
        expect(wrapper.find('.modal').exists()).toBe(true);
    });

    it('does not render modal when modalActive is false', async () => {
        await wrapper.setProps({
            modalActive: false,
        });
        
        expect(wrapper.find('.modal').exists()).toBe(false);
    });

    it('emits close event when close button is clicked', () => {
        wrapper.find('.close-btn').trigger('click');

        expect(wrapper.emitted('close')).toBeTruthy();
    });

    it('emits click-outside event when clicking outside the modal', () => {
        wrapper.find('.modal-background').trigger('click');

        expect(wrapper.emitted('click-outside')).toBeTruthy();
    });
});
