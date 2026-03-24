import { describe, expect, test } from "vitest";
import { useHeroSummary } from "./useHeroSummary";
import { renderHook } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";

const tanStackCustomProvider = () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false // Para que no haga varios intentos
            }
        }
    })


    return ({ children }: PropsWithChildren) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
}

describe('useHeroSummary', () => {
    test('should return the initial state (isLoading)', () => {
        const { result } = renderHook(() => useHeroSummary(), {
            wrapper: tanStackCustomProvider()
        });
        // console.log(result.current);
        expect(result.current.isLoading).toBeTruthy();
        expect(result.current.isLoading).toBe(true);
        expect(result.current.isError).toBe(false);
        expect(result.current.data).toBe(undefined);
        expect(result.current.data).toBeUndefined();

    })
})