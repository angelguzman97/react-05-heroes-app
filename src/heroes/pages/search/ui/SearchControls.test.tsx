import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { SearchControls } from "./SearchControls";
import { MemoryRouter } from "react-router";

// ResizeObserver es una funcion que viene dentro o utiliza shadcn.

if (typeof window.ResizeObserver) {
    class ResizeObserver {
        observe() { }
        unobserve() { }
        disconnect() { }
    }
    // sobreescribe en la consola el objeto para abrir el acordion.
    // No es animacion, es para que el contenido aparezca
    window.ResizeObserver = ResizeObserver;
};


const renderWithRouter = (initialEntries: string[] = ['/']) => {
    return render(
        <MemoryRouter initialEntries={initialEntries}>
            <SearchControls />
        </MemoryRouter>
    )
};

describe('SearchControls', () => {
    test('should render component', () => {
        const { container } = renderWithRouter();
        // screen.debug();
        expect(container).toMatchSnapshot();
    });
});