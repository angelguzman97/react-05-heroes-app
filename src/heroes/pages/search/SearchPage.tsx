import { CustomJumbotron } from '@/components/ui/custom/CustomJumbotron';
import { HeroStats } from '@/heroes/components/HeroStats';
import { SearchControls } from './ui/SearchControls';
import { CustomBreadcrumbs } from '@/components/ui/custom/CustomBreadcrumbs';

export const SearchPage = () => {
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
    </>
  )
}

export default SearchPage; //Se exporta por defecto para hacer uso del lazy load
