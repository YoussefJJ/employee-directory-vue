import { mount } from '@vue/test-utils';
import Label from './Label.vue';

describe('Label', () => {
    it('renders slot content', () => {
        const wrapper = mount(Label, {
            slots: {
                default: 'Label text',
            },
        });

        expect(wrapper.text()).toContain('Label text');
    });
});
