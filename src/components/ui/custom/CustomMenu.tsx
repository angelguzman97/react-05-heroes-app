import { cn } from '@/lib/utils';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, } from '../navigation-menu'
import { Link, useLocation } from 'react-router'

export const CustomMenu = () => {
    // Saber la ubicación donde se está ubicado
    const { pathname } = useLocation();

    const isActive = (path: string) => {
        return pathname === path;
    }
    return (
        <NavigationMenu className='py-5'>
            <NavigationMenuList>
                {/* Home */}
                <NavigationMenuItem>
                    <NavigationMenuLink asChild
                        className={cn(isActive('/') && 'bg-slate-200', 'rounded-md p-2')}
                    >
                        <Link to="/">Home</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>

                {/* Search */}
                <NavigationMenuItem>
                    <NavigationMenuLink asChild
                        className={cn(isActive('/search') && 'bg-slate-20', 'rounded-md p-2')}
                    >
                        <Link to="/search">Buscar superhéroes</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>

            </NavigationMenuList>
        </NavigationMenu>
    )
}
