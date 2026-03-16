import { useMemo } from "react"
import { useQuery } from "@tanstack/react-query"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CustomJumbotron } from "@/components/ui/custom/CustomJumbotron"
import { HeroStats } from "@/heroes/components/HeroStats"
import { HeroGrid } from "@/heroes/components/HeroGrid"
import { CustomPagination } from "@/components/ui/custom/CustomPagination"
import { CustomBreadcrumbs } from "@/components/ui/custom/CustomBreadcrumbs"
import { getHeroesByPageAction } from "@/heroes/actions/get-heroes-by-page.action"
import { useSearchParams } from "react-router"
import { useHeroSummary } from "@/heroes/hooks/useHeroSummary"
import { usePaginatedHero } from "@/heroes/hooks/usePaginatedHero"

export const HomePage = () => {

  const [searchParams, setSearchParams] = useSearchParams(); // Para colocar los parametros en la url

  const activeTab = searchParams.get('tab') ?? 'all'; // Peticion por categoria
  const page = searchParams.get('page') ?? '1'; // Peticion paginado
  const limit = searchParams.get('limit') ?? '6'; // Peticion limite
  const category = searchParams.get('category') ?? 'all';


  const selectedTab = useMemo(() => {
    const validTab = ["all", "favorites", "heroes", "villains"];

    return validTab.includes(activeTab) ? activeTab : 'all';

  }, [activeTab]); // Por si introducen o quieren manipular la url, no permitirá que se modifique, gracias al useMemo

  // const [activeTab, setActiveTab] = useState<
  //   "all" |
  //   "favorites" |
  //   "heroes" |
  //   "villains"
  // >('all');

  // useQuery pide 2 propiedades
  // 1.- queryKey que es como el espacio en memoria que se desea guardar
  // el resultado de la petición y se coloca como un arreglo.
  // Dentro de ese arreglo se define como se quiere que luzca ese key
  // 2. queryFn es la función que se desea disparar cuando eso suceda (es decir, la petición)
  // 3. statleTime sirve para indcarle a tanstack cuánto tiempo considara el reultado de la petición como fresca.

  // const { data: heroesResponse } = useQuery({
  // queryKey: ['heroes', 'page', page], // Para que modifique la data hay que cambiar la queryKey
  // tanstackQuery hace las peticiones http mediante los queryKey
  // queryKey: ['heroes', 'limit', limit, 'page', page], // Se manda el objeto porque si se pone por separado, es decir, ['heroes','pages', pages, 'limit', limit], 
  // puede ser que a futuro se modifique y se ponga de la siguiente manera ['heroes', 'limit', limit, 'pages', pages]
  // Y puede ser que tanStackQuery lo interprete de manera diferente
  //   queryKey: ['heroes', { page, limit }], // Por esa razon se manda un objeto
  //   queryFn: () => getHeroesByPageAction(+page, +limit),
  //   staleTime: 1000 * 60 * 5 // 5min
  // });

  const { data: heroesResponse } = usePaginatedHero(+page, +limit, category); // Se redujo a un hook

  // useEffect(() => {
  //   getHeroesByPage().then();
  // }, [])

  const { data: summary } = useHeroSummary();

  return (
    <>
      <>
        {/* Header */}
        <CustomJumbotron title="Universo de Súperhéroes"
          description="Descubre, explora y administra superhéroes y villanos" />

        <CustomBreadcrumbs currentPage="Superhéroes" />

        {/* Stats Dashboard */}
        <HeroStats />

        {/* Tabs */}
        <Tabs value={selectedTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all"
              onClick={() => setSearchParams((prev) => {
                prev.set('tab', 'all');
                prev.set('category', 'all');
                prev.set('page', '1');
                return prev;
              })}>All Characters ({summary?.totalHeroes})</TabsTrigger>
            <TabsTrigger value="favorites" className="flex items-center gap-2"
              onClick={() => setSearchParams((prev) => {
                prev.set('tab', 'favorites');
                // prev.set('category', 'favorites');
                return prev;
              })}>
              Favorites (3)
            </TabsTrigger>
            <TabsTrigger value="heroes"
              onClick={() => setSearchParams((prev) => {
                prev.set('tab', 'heroes');
                prev.set('category', 'hero');
                prev.set('page', '1');
                return prev;
              })}>Heroes ({summary?.heroCount})</TabsTrigger>
            <TabsTrigger value="villains"
              onClick={() => setSearchParams((prev) => {
                prev.set('tab', 'villains');
                prev.set('category', 'villain');
                prev.set('page', '1');
                return prev;
              })}>Villains ({summary?.villainCount})</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            {/* Character Grid. Mostrar todos los personajes */}
            <HeroGrid heroes={heroesResponse?.heroes ?? []} />
          </TabsContent>

          <TabsContent value="favorites">
            {/* Mostrar todos los personajes favoritos */}
            <h1>Favoritos</h1>
            <HeroGrid heroes={[]} />
          </TabsContent>

          <TabsContent value="heroes">
            {/* Mostrar todos los héroes */}
            <h1>Héroes</h1>
            <HeroGrid heroes={heroesResponse?.heroes ?? []} />
          </TabsContent>

          <TabsContent value="villains">
            {/* Mostrar todos los villanos */}
            <h1>Villanos</h1>
            <HeroGrid heroes={heroesResponse?.heroes ?? []} />
          </TabsContent>
        </Tabs>

        {/* Pagination */}
        <CustomPagination totalPages={heroesResponse?.pages ?? 1} />
      </>
    </>
  )
}