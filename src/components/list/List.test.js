import { mount } from '@vue/test-utils';
import List from './List.vue';
import { describe, expect, it } from 'vitest';

describe('List', () => {
    it('renders a list of items', () => {
        const items = ['Item 1', 'Item 2', 'Item 3'];
        const wrapper = mount(List, {
            slots: {
                default: items.map(item => `<li>${item}</li>`).join('')
            }
        });

        const listItems = wrapper.findAll('li');
        expect(listItems.length).toBe(items.length);

        listItems.forEach((item, index) => {
            expect(item.text()).toBe(items[index]);
        });
    });
});
