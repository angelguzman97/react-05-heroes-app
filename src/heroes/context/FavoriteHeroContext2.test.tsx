import { use } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { FavoriteHeroContext, FavoriteHeroProvider } from "./FavoriteHeroContext";
import type { Hero } from "../types/hero.interface";

const mockHero = {
    id: '1',
    name: 'Bruce Wayne',
    alias: 'Batman'
} as Hero;

const localStorageMock = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    clear: vi.fn()
}; // Obj. para reemplzar algo que se encuentra en el ambiente global

Object.defineProperty(window, 'localStorage', {
    value: localStorageMock
});

const TestComponent = () => {
    const { favoriteCount, favorites, isFavorite, toggleFavorite } = use(FavoriteHeroContext);


    return (
        <div>
            <div data-testid='favorite-count'>{favoriteCount}</div>
            <div data-testid='favorite-list'>
                {favorites.map((hero) => (
                    <div key={hero.id} data-testid={`hero-${hero.id}`}>
                        {hero.alias}
                    </div>
                ))
                }</div>
            <button data-testid='toggle-favorite'
                onClick={() => toggleFavorite(mockHero)}>
                Toggle Favorite
            </button>
            <div data-testid='is-favorite'>
                {isFavorite(mockHero).toString()}
            </div>
        </div>
    );
}

const renderContextTest = () => {

    return render(
        <FavoriteHeroProvider>
            <TestComponent />
        </FavoriteHeroProvider>
    )
}

describe('FavoriteHeroContext', () => {
    // console.log(localStorage);
    beforeEach(() => {
        vi.clearAllMocks();
    })

    test('should initialize with defaul values', () => {
        renderContextTest();

        // screen.debug();
        expect(screen.getByTestId('favorite-count').textContent).toBe('0');
        expect(screen.getByTestId('favorite-list').children.length).toBe(0);
    });

    test('should add hero to favorites when toggleFavorite is called with new Hero', () => {
        renderContextTest();
        const button = screen.getByTestId('toggle-favorite');
        fireEvent.click(button);
        // screen.debug();
        expect(screen.getByTestId('favorite-count').textContent).toBe('1');
        expect(screen.getByTestId('is-favorite').textContent).toBe('true');
        expect(screen.getByTestId('hero-1').textContent).toBe('Batman');
        expect(localStorageMock.setItem).toHaveBeenCalled();
        expect(localStorageMock.setItem).toHaveBeenLastCalledWith(
            'favorites',
            '[{"id":"1","name":"Bruce Wayne","alias":"Batman"}]',
        );
        // expect(localStorage.getItem('favorites')).toBe('[{"id":"1","name":"Bruce Wayne","alias":"Batman"}]');
    });

    test('should remove hero from favorites when toggleFavorite is called', () => {
        // En caso que no funcione el beforeEach
        // localStorage.clear();
        // console.log(localStorage.getItem('favorites'));
        // localStorage.setItem('favorites', JSON.stringify([mockHero]));
        localStorageMock.getItem.mockReturnValue(JSON.stringify([mockHero]));

        renderContextTest();
        expect(screen.getByTestId('favorite-count').textContent).toBe('1');
        expect(screen.getByTestId('is-favorite').textContent).toBe('true');
        expect(screen.getByTestId('hero-1').textContent).toBe('Batman');

        const button = screen.getByTestId('toggle-favorite');
        // screen.debug();
        fireEvent.click(button);

        expect(screen.getByTestId('favorite-count').textContent).toBe('0');
        expect(screen.getByTestId('is-favorite').textContent).toBe('false');
        expect(screen.queryByTestId('hero-1')).toBeNull();
        expect(localStorageMock.setItem).toHaveBeenCalled();
        expect(localStorageMock.setItem).toHaveBeenCalledWith('favorites', '[]');
    });
});