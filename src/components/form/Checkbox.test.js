import { mount } from '@vue/test-utils';
import Checkbox from './Checkbox.vue';

describe('Checkbox', () => {
    it('renders correctly', () => {
        const wrapper = mount(Checkbox);
        expect(wrapper.exists()).toBe(true);
    });

    it('toggles the model value when clicked', async () => {
        const wrapper = mount(Checkbox, {
            attachTo: document.body,
        });
        const input = wrapper.find('input');

        expect(wrapper.vm.model).toBe(false);

        await input.trigger('click');

        expect(wrapper.vm.model).toBe(true);

        await input.trigger('click');

        expect(wrapper.vm.model).toBe(false);
    });
});
