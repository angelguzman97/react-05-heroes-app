import { createContext, useState, type PropsWithChildren } from "react";
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

export const FavoriteHeroProvider = ({ children }: PropsWithChildren) => {
    const [favorites, setFavorites] = useState<Hero[]>([]);

    const toggleFavorite = (hero: Hero) => {
        const heroExist = favorites.find(h => h.id === hero.id);

        if (heroExist) {
            const newFavorite = favorites.filter(h => h.id !== hero.id);
            setFavorites(newFavorite);
            return;
        }
        setFavorites([...favorites, hero])
    }

    return (
        <FavoriteHeroContext value={{
            // State
            favorite: [],
            favoriteCount: 0,

            //Methods
            isFavorite: (hero) => false,
            toggleFavorite: toggleFavorite

        }}>
            {children}
        </FavoriteHeroContext>
    )
}
