import { writable } from 'svelte/store';

export function createLocalStorage(key: any, inital: any) {
    const value = typeof window !== 'undefined' && localStorage.getItem(key);
    const data = value ? JSON.parse(value) : inital;

    const store = writable(data);

    store.subscribe((value) => {
        if (typeof window !== 'undefined') {
            localStorage.setItem(key, JSON.stringify(value));
        }
    });

    return store;
}

