import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CustomJumbotron } from "@/components/ui/custom/CustomJumbotron"
import { HeroStats } from "@/heroes/components/HeroStats"
import { HeroGrid } from "@/heroes/components/HeroGrid"
import { useState } from "react"
import { CustomPagination } from "@/components/ui/custom/CustomPagination"
import { CustomBreadcrumbs } from "@/components/ui/custom/CustomBreadcrumbs"

export const HomePage = () => {
  const [activeTab, setActiveTab] = useState<
    "all" |
    "favorites" |
    "heroes" |
    "villains"
  >('all');


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
        <Tabs value={activeTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all"
              onClick={() => setActiveTab('all')}>All Characters (16)</TabsTrigger>
            <TabsTrigger value="favorites" className="flex items-center gap-2"
              onClick={() => setActiveTab('favorites')}>
              Favorites (3)
            </TabsTrigger>
            <TabsTrigger value="heroes"
              onClick={() => setActiveTab('heroes')}>Heroes (12)</TabsTrigger>
            <TabsTrigger value="villains"
              onClick={() => setActiveTab('villains')}>Villains (2)</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            {/* Character Grid. Mostrar todos los personajes */}
            <HeroGrid />
          </TabsContent>

          <TabsContent value="favorites">
            {/* Mostrar todos los personajes favoritos */}
            <h1>Favoritos</h1>
            <HeroGrid />
          </TabsContent>

          <TabsContent value="heroes">
            {/* Mostrar todos los héroes */}
            <h1>Héroes</h1>
            <HeroGrid />
          </TabsContent>

          <TabsContent value="villains">
            {/* Mostrar todos los villanos */}
            <h1>Villanos</h1>
            <HeroGrid />
          </TabsContent>
        </Tabs>

        {/* Pagination */}
        <CustomPagination totalPages={8} />
      </>
    </>
  )
}