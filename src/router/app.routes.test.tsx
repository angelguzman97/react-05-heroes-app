import { describe, expect, test, vi } from "vitest";
import { appRouter } from "./app.routes";
import { render, screen } from "@testing-library/react";
import { Outlet, RouterProvider } from "react-router";

vi.mock('@/heroes/layouts/HeroLayout', ()=>({
    HeroLayout: ()=><div data-testid='hero-layout'><Outlet/></div>
}));
vi.mock('@/heroes/pages/home/HomePage', ()=>({
    HomePage: ()=><div data-testid='home-page'></div>
}));

describe('appRouter', () => {
    test('should be configured as expect', () => {
        // console.log(appRouter.routes);
        expect(appRouter.routes).toMatchSnapshot();
    });

    test('should render home page at root path', ()=>{
        render(<RouterProvider router={appRouter}/>)
        screen.debug();
        expect(screen.getByTestId('home-page')).toBeDefined();
    })
})