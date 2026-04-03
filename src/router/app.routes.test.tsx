import { describe, expect, test, vi } from "vitest";
import { appRouter } from "./app.routes";
import { render, screen } from "@testing-library/react";
import { createMemoryRouter, Outlet, RouterProvider, useParams } from "react-router";

vi.mock('@/heroes/layouts/HeroLayout', () => ({
    HeroLayout: () => <div data-testid='hero-layout'><Outlet /></div>
}));
vi.mock('@/heroes/pages/home/HomePage', () => ({
    HomePage: () => <div data-testid='home-page'></div>
}));
vi.mock('@/heroes/pages/hero/HeroPage', () => ({
    HeroPage: () => {
        const { idSlug = '' } = useParams();
        return (
            <div data-testid='home-page'>HeroPage - {idSlug}</div>
        );
    }
}));

vi.mock('@/heroes/pages/search/SearchPage', () => ({
    default: () => <div data-testid='search'></div>
}));

describe('appRouter', () => {
    test('should be configured as expect', () => {
        // console.log(appRouter.routes);
        expect(appRouter.routes).toMatchSnapshot();
    });

    // test('should render home page at root path', ()=>{
    //     render(<RouterProvider router={appRouter}/>)
    //     screen.debug();
    //     expect(screen.getByTestId('home-page')).toBeDefined();
    // });

    test('should render home page at root path', () => {
        const router = createMemoryRouter(appRouter.routes, {
            initialEntries: ['/']
        });
        render(<RouterProvider router={router} />)
        screen.debug();
        expect(screen.getByTestId('home-page')).toBeDefined();
    });

    test('should render home page at /heroes/:idSlug path', () => {
        const router = createMemoryRouter(appRouter.routes, {
            initialEntries: ['/heroes/superman']
        });
        render(<RouterProvider router={router} />)
        // screen.debug();
        expect(screen.getByTestId('home-page').innerHTML).toContain('superman');
    });

    test('should render search page at /search path', async () => { // Como es un componente perezoso, es asíncrono
        const router = createMemoryRouter(appRouter.routes, {
            initialEntries: ['/search']
        });
        render(<RouterProvider router={router} />)
        // expect(await screen.findByText('Búsqueda de Súperhéroes')).toBeDefined();
        expect(await screen.findByTestId('search')).toBeDefined();
        // screen.debug();

    });
   
    test('should redirect to home page for unknown routes', () => { // Como es un componente perezoso, es asíncrono
        const router = createMemoryRouter(appRouter.routes, {
            initialEntries: ['/pagina-rara']
        });
        render(<RouterProvider router={router} />)
        expect( screen.getByTestId('home-page')).toBeDefined();
        screen.debug();

    });
})