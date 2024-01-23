import { mount } from '@vue/test-utils';
import Button from './Button.vue';

describe('Button', () => {
    it('renders the button text correctly', () => {
        const wrapper = mount(Button, {
            slots: {
                default: 'Submit',
            },
        });

        expect(wrapper.text()).toBe('Submit');
    });

    it('emits a click event when clicked', () => {
        const wrapper = mount(Button);

        wrapper.trigger('click');

        expect(wrapper.emitted('click')).toBeTruthy();
    });

    it('disables the button when disabled prop is true', () => {
        const wrapper = mount(Button, {
            props: {
                disabled: true,
            },
        });

        expect(wrapper.attributes('disabled')).toBe('');
    });
});
