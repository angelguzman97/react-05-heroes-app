import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import SearchPage from "./SearchPage";
import { MemoryRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { searchHeroesAction } from "@/heroes/actions/search-heroes.action";
import { HeroGrid } from "@/heroes/components/HeroGrid";
import type { Hero } from "@/heroes/types/hero.interface";
//Evaluar la action
vi.mock('@/heroes/actions/search-heroes.action');
vi.mock('@/components/custom/CustomJumbotron', () => ({
    CustomJumbotron: () => <div data-testid='custom-jumbotron'></div>
}));

vi.mock('@/heroes/components/HeroGrid', () => ({
    HeroGrid: ({ heroes }: { heroes: Hero[] }) => <div data-testid='hero-grid'>
        {heroes.map((hero) => (
            <div key={hero.id}>{hero.name}</div>
        ))
        }</div>
}));

const mockSearchHeroesAction = vi.mocked(searchHeroesAction);

const queryClient = new QueryClient();

const renderSearchPage = (initialEntries: string[] = ['/']) => {
    return render(
        <MemoryRouter initialEntries={initialEntries}>
            <QueryClientProvider client={queryClient}>
                <SearchPage />
            </QueryClientProvider>
        </MemoryRouter>
    )
}

describe('SearchPage', () => {

    beforeEach(() => {
        vi.clearAllMocks();
    });

    test('should render SearchPage with default values', () => {
        // renderSearchPage();
        const { container } = renderSearchPage();
        expect(mockSearchHeroesAction).toHaveBeenCalledWith({
            "name": undefined,
            "strength": undefined,
        },);
        // screen.debug();
        expect(container).toMatchSnapshot();
    });

    test('should call search action with name parameter', () => {
        // renderSearchPage();
        const { container } = renderSearchPage(['/search?name=superman']);
        expect(mockSearchHeroesAction).toHaveBeenCalledWith({
            "name": 'superman',
            "strength": undefined,
        },);
        // screen.debug();
        expect(container).toMatchSnapshot();
    });

    test('should call search action with strength parameter', () => {
        // renderSearchPage();
        const { container } = renderSearchPage(['/search?strength=6']);
        expect(mockSearchHeroesAction).toHaveBeenCalledWith({
            "name": undefined,
            "strength": '6',
        },);
        // screen.debug();
        expect(container).toMatchSnapshot();
    });

    test('should call search action with name and strength parameter', () => {
        // renderSearchPage();
        const { container } = renderSearchPage(['/search?name=superman&strength=6']);
        expect(mockSearchHeroesAction).toHaveBeenCalledWith({
            "name": 'superman',
            "strength": '6',
        },);
        // screen.debug();
        expect(container).toMatchSnapshot();
    });
    test('should render HeroGrid with search result', async () => {
        const mockHero = [
            {
                id: '1',
                name: 'Clark Kent'
            } as unknown as Hero,
            {
                id: '2',
                name: 'Bruce Wayne'
            } as unknown as Hero,
        ];
        mockSearchHeroesAction.mockResolvedValue(mockHero);

        renderSearchPage();

        // Para que aparezca la data se usa el sync await y waitFor
        await waitFor(() => {
            expect(screen.getByText('Clark Kent')).toBeDefined();
            expect(screen.getByText('Bruce Wayne')).toBeDefined();
        });

        // screen.debug(screen.getByTestId('hero-grid'));
    });


});