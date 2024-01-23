import { mount, shallowMount } from '@vue/test-utils';
import NavLink from './NavLink.vue';
import router from '@/routers/router';

describe('NavLink', () => {
    it('renders a router-link element', () => {
        const wrapper = shallowMount(NavLink);
        expect(wrapper.find('router-link').exists()).toBe(true);
    });

    it('applies the correct CSS classes', () => {
        const wrapper = shallowMount(NavLink);
        expect(wrapper.find('.nav-link').classes()).toContain('nav-link');
        expect(wrapper.find('.link-content').classes()).toContain('link-content');
    });
});
