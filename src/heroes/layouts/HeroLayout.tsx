
import { CustomMenu } from '@/components/ui/custom/CustomMenu'
import { Outlet } from 'react-router'

export const HeroLayout = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
            <div className="max-w-7xl mx-auto p-6">

                <CustomMenu />

                {/* Para visualizar los componentes hijos del app.routes */}
                <Outlet />
            </div>
        </div>

    )
}

// El lazy se utiliza para cuando se llamen paginas que no son muy necesarias llamar y asi no haya una sobrecarga de componentes innecesarios
