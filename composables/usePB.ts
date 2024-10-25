import PocketBase from 'pocketbase';

export const usePB = (): PocketBase => {
    return new PocketBase('https://abrir.pockethost.io/');
};