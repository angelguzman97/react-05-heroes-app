import { CustomJumbotron } from '@/components/ui/custom/CustomJumbotron';
import { HeroStats } from '@/heroes/components/HeroStats';
import { SearchControls } from './ui/SearchControls';
import { CustomBreadcrumbs } from '@/components/ui/custom/CustomBreadcrumbs';
import { HeroGrid } from '@/heroes/components/HeroGrid';
import { useQuery } from '@tanstack/react-query';
import { searchHeroesAction } from '@/heroes/actions/search-heroes.action';
import { useSearchParams } from 'react-router';

export const SearchPage = () => {
  const [searchParams] = useSearchParams(); // Solo se necesita el parametro y no cambia de pantalla
  const name = searchParams.get('name') ?? undefined;
  const strength = searchParams.get('strength') ?? undefined;

  const { data: heroes = [] } = useQuery({
    queryKey: ['search', { name, strength }],
    queryFn: () => searchHeroesAction({ name, strength }), // Como vienen varias opciones se pone entre llaves
    staleTime: 1000 * 60 * 5
  });

  console.log("hero", heroes);

  return (
    <>
      {/* Header */}
      <CustomJumbotron title="Búsqueda de Súperhéroes"
        description="Descubre, explora y administra superhéroes y villanos" />

      <CustomBreadcrumbs currentPage='Buscador de héroes'
      // breadcrumbs={[
      //   {label: 'home1', to:'/'},
      //   {label: 'home1', to:'/'},
      //   {label: 'home1', to:'/'},
      // ]}
      />

      {/* Stats Dashboard */}
      <HeroStats />


      {/* Filter and Search */}
      <SearchControls />

      <HeroGrid heroes={heroes} />
    </>
  )
}

export default SearchPage; //Se exporta por defecto para hacer uso del lazy load
