import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import SearchPage from "./SearchPage";
import { MemoryRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { searchHeroesAction } from "@/heroes/actions/search-heroes.action";
//Evaluar la action
vi.mock('@/heroes/actions/search-heroes.action');
vi.mock('@/components/custom/CustomJumbotron', () => ({
    CustomJumbotron: () => <div data-testid='custom-jumbotron'></div>
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
});