import { CustomBreadcrumbs } from '@/components/ui/custom/CustomBreadcrumbs'
import { useParams } from 'react-router'

export const HeroPage = () => {
  const { idSlug = '' } = useParams(); // idSlueg proviene del app.routes.tsx y 
  // el valor del parámetro viende de HeroGridCard

  console.log({ idSlug });


  return (
    <>
      <CustomBreadcrumbs currentPage='Heroes' />
      <div>HeroPage</div>
    </>
  )
}
