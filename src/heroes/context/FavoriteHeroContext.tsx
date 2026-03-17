import { createContext, useEffect, useState, type PropsWithChildren } from "react";
import type { Hero } from "../types/hero.interface";

interface FavoriteHeroContext {
    // State
    favorite: Hero[];
    favoriteCount: number;

    // Methods
    isFavorite: (hero: Hero) => boolean;
    toggleFavorite: (hero: Hero) => void;
}

export const FavoriteHeroContext = createContext({} as FavoriteHeroContext);

const getFavoritesFromLocalStorage = (): Hero[] => {
    const favorites = localStorage.getItem('favorites');

    return favorites ? JSON.parse('favorites') : [];
}

export const FavoriteHeroProvider = ({ children }: PropsWithChildren) => {
    const [favorites, setFavorites] = useState<Hero[]>(getFavoritesFromLocalStorage);

    const toggleFavorite = (hero: Hero) => {
        const heroExist = favorites.find(h => h.id === hero.id);

        if (heroExist) {
            const newFavorite = favorites.filter(h => h.id !== hero.id);
            setFavorites(newFavorite);
            return;
        }
        setFavorites([...favorites, hero])
    }

    const isFavorite = (hero: Hero) => {

        return favorites.some(h => h.id === hero.id);
    }

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites])



    return (
        <FavoriteHeroContext value={{
            // State
            favorite: favorites,
            favoriteCount: favorites.length,

            //Methods
            isFavorite: isFavorite,
            toggleFavorite: toggleFavorite

        }}>
            {children}
        </FavoriteHeroContext>
    )
}
