import { use } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { FavoriteHeroContext, FavoriteHeroProvider } from "./FavoriteHeroContext";
import type { Hero } from "../types/hero.interface";

const mockHero = {
    id: '1',
    name: 'Bruce Wayne',
    alias: 'Batman'
} as Hero;

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
    test('should initial with defaul values', () => {
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
        expect(screen.getByTestId('hero-1').textContent).toBe('Batman');
        expect(localStorage.getItem('favorites')).toBe('[{"id":"1","name":"Bruce Wayne","alias":"Batman"}]')
    });
});