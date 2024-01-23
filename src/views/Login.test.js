import { mount } from '@vue/test-utils';
import Login from './Login.vue';
import { beforeEach, vi } from 'vitest';

describe('Login', () => {
    beforeEach(() => {
        // Mock useAuthStore
        vi.mock('@/stores/authStore', () => ({
            useAuthStore: () => ({
                loginUser: vi.fn(),
                checkLogin: vi.fn()
            })
        }));
        // Mock router
        vi.mock('@/routers/router', () => ({
            push: vi.fn()
        }));
    })
    it('renders the login form correctly', async () => {
        const wrapper = mount(Login);
        
        // Assert that the login form is rendered
        expect(wrapper.find('.login-form').exists()).toBe(true);
        
        // Assert that the header is rendered correctly
        expect(wrapper.find('.header').text()).toBe('Login');
        
        // Assert that the username input field is rendered
        expect(wrapper.find('input[name="username"]').exists()).toBe(true);
        
        // Assert that the password input field is rendered
        expect(wrapper.find('input[name="password"]').exists()).toBe(true);
                
        // Assert that the login button is rendered
        expect(wrapper.find('button').text()).toBe('Login');
    });
    
    it('submits the form on button click', async () => {
        const wrapper = mount(Login, {
            attachTo: document.body
        });
        
        // Set the username and password values
        await wrapper.find('input[name="username"]').setValue('testuser');
        await wrapper.find('input[name="password"]').setValue('testpassword');
        
        // Click the login button
        await wrapper.find('form').trigger('submit.prevent');

        // Assert that the form is submitted
        expect(wrapper.emitted('submit')).toBeTruthy();
        
        // Assert that the correct username and password values are passed to the submit event
        expect(wrapper.vm.form).toEqual({
            username: 'testuser',
            password: 'testpassword',
            rememberMe: false
        });
    });
    
    it('displays an error message when login fails', async () => {
        const wrapper = mount(Login, {
            attachTo: document.body
        });
        
        // Set the username and password values
        await wrapper.find('input[name="username"]').setValue('testuser');
        await wrapper.find('input[name="password"]').setValue('wrongpassword');
        
        // Click the login button
        await wrapper.find('button').trigger('click');
        
        // Wait for the error message to be displayed
        await wrapper.vm.$nextTick();
        
        // Assert that the error message is displayed
        expect(wrapper.find('.err-msg').exists()).toBe(true);
        
        // Assert that the error message text is correct
        expect(wrapper.find('.err-msg').text()).toBe('Invalid credentials');
    });
});
