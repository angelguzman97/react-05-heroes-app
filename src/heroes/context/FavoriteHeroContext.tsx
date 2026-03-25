import { createContext, useEffect, useState, type PropsWithChildren } from "react";
import type { Hero } from "../types/hero.interface";
import * as z from "zod";

interface FavoriteHeroContext {
    // State
    favorites: Hero[];
    favoriteCount: number;

    // Methods
    isFavorite: (hero: Hero) => boolean;
    toggleFavorite: (hero: Hero) => void;
}

// El schema debe de tener la misma forma que el objeto almacenado en el localStorage
const HeroSchema = z.object({
    id: z.string(),
    name: z.string(),
    slug: z.string(),
    alias: z.string(),
    description: z.string(),
    durability: z.number(),
    firstAppearance: z.string(),
    image: z.string(),
    intelligence: z.number(),
    powers: z.array(z.string()),
    speed: z.number(),
    status: z.string(),
    strength: z.number(),
    team: z.string(),
    universe: z.string(),
    category: z.string(),
});

const FavoriteSchema = z.array(HeroSchema);

export const FavoriteHeroContext = createContext({} as FavoriteHeroContext);

const getFavoritesFromLocalStorage = (): Hero[] => {
    const favorites = localStorage.getItem('favorites');

    // Procesamos lo que tenemos guardado en local storage utilizando Zod
    // para poder validar que el schema no fue manipulado
    if (!favorites) return [];

    const result = FavoriteSchema.safeParse(JSON.parse(favorites));

    if (!result.success) {
        console.log('Invalid facorites data', result.error);

        try {
            return JSON.parse(favorites)
        } catch (error) {
            
            return [];
        }
    }

    return result.data;
}

export const FavoriteHeroProvider = ({ children }: PropsWithChildren) => {
    const [favorites, setFavorites] = useState<Hero[]>(getFavoritesFromLocalStorage);

    const toggleFavorite = (hero: Hero) => {
        const heroExist = favorites.find((h) => h.id === hero.id);

        if (heroExist) {
            const newFavorites = favorites.filter((h) => h.id !== hero.id);
            setFavorites(newFavorites);
            return;
        }
        setFavorites([...favorites, hero])
    }

    const isFavorite = (hero: Hero) => {

        return favorites.some((h) => h.id === hero.id);
    }

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites])



    return (
        <FavoriteHeroContext
            value={{
                // State
                favoriteCount: favorites.length,
                favorites: favorites,

                //Methods
                isFavorite: isFavorite,
                toggleFavorite: toggleFavorite

            }}>
            {children}
        </FavoriteHeroContext>
    )
}
