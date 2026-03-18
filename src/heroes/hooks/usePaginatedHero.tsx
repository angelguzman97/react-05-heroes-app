import { useQuery } from "@tanstack/react-query";
import { getHeroesByPageAction } from "../actions/get-heroes-by-page.action";

export const usePaginatedHero = (page: number, limit: number, category = 'all', name = '') => {
    return useQuery({
        queryKey: ['heroes', { page, limit, category }],
        queryFn: () => getHeroesByPageAction(+page, +limit, category, name),
        staleTime: 1000 * 60 * 5
    });
}
