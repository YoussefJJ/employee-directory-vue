import { flushPromises, mount, shallowMount } from '@vue/test-utils';
import DirectoryManager from './DirectoryManager.vue';
import { expect, vi } from 'vitest';

describe('DirectoryManager', () => {
    it('renders correctly', () => {
        const wrapper = shallowMount(DirectoryManager);
        expect(wrapper.exists()).toBe(true);
    });

    it('opens and closes modal-1 when handleEmployeeaddForm is called', async () => {
        const wrapper = mount(DirectoryManager, {
            attachTo: document.body
        });
        const modal1 = wrapper.findComponent({name: 'modal'});
        expect(modal1.props('modalActive')).toBe(false);

        wrapper.vm.handleEmployeeaddForm();
        await wrapper.vm.$nextTick();
        expect(modal1.props('modalActive')).toBe(true);

        wrapper.vm.handleEmployeeaddForm();
        await wrapper.vm.$nextTick();
        expect(modal1.props('modalActive')).toBe(false);
    });

    it('should call addEmployee when new employee form is submitted', async () => {
        const wrapper = mount(DirectoryManager, {
            attachTo: document.body
        });
        const spy = vi.spyOn(wrapper.vm, 'handleEmployeeAdd');
        const modal1 = wrapper.findComponent({ name: 'modal' });
        
        wrapper.vm.handleEmployeeaddForm();
        await wrapper.vm.$nextTick();
        const input = wrapper.findComponent({ ref: 'newEmpInputRef' });
        await input.setValue('John Doe');
        const modalButton = modal1.findComponent('.form-btn');
        await modalButton.trigger('click');

        expect(spy).toHaveBeenCalled();
    });

    it('should opens modal-2 when handleDeleteAction is called', async () => {
        const wrapper = mount(DirectoryManager);
        const modal2 = wrapper.findAllComponents({
            name: 'modal'
        })[1];

        expect(modal2.props('modalActive')).toBe(false);
        wrapper.vm.handleDeleteAction('employee');
        await wrapper.vm.$nextTick();
        expect(modal2.props('modalActive')).toBe(true);
    });

    it('should call executeDelete on delete confirm button click', async () => {
        const wrapper = mount(DirectoryManager, {
            attachTo: document.body
        });
        const spy = vi.spyOn(wrapper.vm, 'executeDelete');
        const modal2 = wrapper.findAllComponents({ name: 'modal' })[1];

        wrapper.vm.handleDeleteAction();
        await wrapper.vm.$nextTick();
        expect(modal2.props('modalActive')).toBe(true);

        const modalButton = modal2.findComponent('.form-btn');
        await modalButton.trigger('click');
        expect(spy).toHaveBeenCalled();
        await wrapper.vm.$nextTick();

        expect(modal2.props('modalActive')).toBe(false);
    });
});
