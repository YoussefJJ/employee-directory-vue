import { mount } from '@vue/test-utils';
import ListItem from './ListItem.vue';

describe('ListItem', () => {
    it('renders slot content', () => {
        const wrapper = mount(ListItem, {
            slots: {
                default: 'Test Content',
            },
        });

        expect(wrapper.text()).toContain('Test Content');
    });

    it('emits a click event when clicked', async () => {
        const wrapper = mount(ListItem);

        await wrapper.trigger('click');

        expect(wrapper.emitted('click')).toBeTruthy();
    });

    it('applies "selected" class when selected prop is true', () => {
        const wrapper = mount(ListItem, {
            props: {
                selected: true,
            },
        });

        expect(wrapper.classes()).toContain('selected');
    });

    it('does not apply "selected" class when selected prop is false', () => {
        const wrapper = mount(ListItem, {
            props: {
                selected: false,
            },
        });

        expect(wrapper.classes()).not.toContain('selected');
    });
});
