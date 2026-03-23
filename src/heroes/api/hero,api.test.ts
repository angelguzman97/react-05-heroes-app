import { describe, expect, test } from 'vitest';
import { heroApi } from './hero.api';

const BASE_URL = import.meta.env.VITE_API_URL;

describe('HeroApi', () => {
    test('should be configure pointing to the testing server', () => {
        expect(heroApi).toBeDefined(); // API definida
        
        expect(heroApi.defaults.baseURL).toBe(`${BASE_URL}/api/heroes`); // Probar API
        // Comprobar que este en el puerto correcto
        expect(BASE_URL).toContain('3001');
    })
})