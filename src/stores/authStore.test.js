import { useAuthStore } from "./authStore";
import { setActivePinia, createPinia } from "pinia";

describe("Auth Store", () => {
    let authStore;

    beforeEach(() => {
        setActivePinia(createPinia())
        authStore = useAuthStore();
    });

    it("should have an initial state", () => {
        expect(authStore.isAuthenticated).toBe(false);
        expect(authStore.user).toBe(null);
    });

    it("should update the authentication state", () => {
        authStore.loginUser({ username: "John Doe" }, false);
        expect(authStore.isAuthenticated).toBe(true);

        authStore.logoutUser();
        expect(authStore.isAuthenticated).toBe(false);
    });

    it("should update the user", () => {
        const user = { username: "John Doe" };
        authStore.loginUser(user);
        expect(authStore.user.username).toEqual(user.username);

        authStore.logoutUser();
        expect(authStore.user).toBe(null);
    });

    it('should update localStorage when logging in', () => {
        const user = { username: "John Doe" };
        authStore.loginUser(user, true);
        expect(localStorage.getItem('user')).toEqual(JSON.stringify({...user, isAuthenticated: true}));
    });

    it('should update localStorage when logging out', () => {
        const user = { username: "John Doe" };
        authStore.loginUser(user, true);
        authStore.logoutUser();
        expect(localStorage.getItem('user')).toBe(null);
    });
});
