import { //createBrowserRouter,
    createHashRouter, Navigate } from "react-router";
import { AdminLayout } from "@/admin/layouts/AdminLayout";
import { AdminPage } from "@/admin/pages/AdminPage";
import { HeroLayout } from "@/heroes/layouts/HeroLayout";
import { HeroPage } from "@/heroes/pages/hero/HeroPage";
import { HomePage } from "@/heroes/pages/home/HomePage";
import { lazy } from "react";
// import { SearchPage } from "@/heroes/pages/search/SearchPage";

const SearchPage = lazy(() => import('@/heroes/pages/search/SearchPage'));

// export const appRouter = createBrowserRouter([
export const appRouter = createHashRouter([ //Hasshear la ruta

    // Si queremos que ciertas paginas tengan la misma estructura,
    // Como son componentes hijos, ya no se les coloca el "/" al path, porque el componente padre, ya esta puesto
    {
        path: '/',
        element: <HeroLayout />,
        children: [
            {
                index: true, // Este como es la pagina principal. Solo se le coloca index para que entre directamente
                element: <HomePage />
            },
            {
                path: 'heroes/:idSlug', // Después de los : se le da nombre al parámetro
                element: <HeroPage />
            },
            {
                path: 'search',
                element: <SearchPage />
            },
            {
                path: '*',
                // element: <h1>404</h1>
                element: <Navigate to={'/'} />
            },
        ]
    },
    // Pagina con distinta estructura
    {
        path: '/admin',
        element: <AdminLayout />,
        children: [
            {
                index: true,
                element: <AdminPage />
            },
        ]
    }

])