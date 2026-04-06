import { fireEvent, render, screen } from "@testing-library/react";
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

    test('should set input value when search param name is set', () => {
        renderWithRouter(['/?name=Batman']);
        const input = screen.getByPlaceholderText('Search heroes, villains, powers, teams...');
        // screen.debug(input);
        expect(input.getAttribute('value')).toBe('Batman');
    });

    test('should change params when input is changed and enter is pressed', () => {
        renderWithRouter(['/?name=Batman']);
        const input = screen.getByPlaceholderText('Search heroes, villains, powers, teams...');
        // screen.debug(input);
        expect(input.getAttribute('value')).toBe('Batman');

        fireEvent.change(input, { target: { value: 'Superman' } });
        fireEvent.keyDown(input, { key: 'Enter' });

        // screen.debug();
        expect(input.getAttribute('value')).toBe('Superman');
    });

    test('should change params strength when slider changed', () => {
        renderWithRouter(['/?name=Batman&active-accordion=advance-filters']);
        const slider = screen.getByRole('slider');
        expect(slider.getAttribute('aria-valuenow')).toBe('0');
        // screen.debug(slider);
        fireEvent.keyDown(slider, { key: 'ArrowRight' });
        expect(slider.getAttribute('aria-valuenow')).toBe('1');
        // screen.debug(slider);

    });
    test('should accordion be open when active-accordion param is set', () => {
        renderWithRouter(['/?name=Batman&active-accordion=advance-filters']);
        const accordion = screen.getByTestId('accordion');
        const accordionItem = accordion.querySelector('div');

        // screen.debug(accordionItem);
        expect(accordionItem?.getAttribute('data-state')).toBe('open');
    });
    test('should accordion be closed when active-accordion param is not set', () => {
        renderWithRouter(['/?name=Batman']);
        const accordion = screen.getByTestId('accordion');
        const accordionItem = accordion.querySelector('div');

        // screen.debug(accordionItem);
        expect(accordionItem?.getAttribute('data-state')).toBe('closed');
    });
});