import {
  BookOpen,
  Home,
  LayoutDashboard,
  Presentation,
  GraduationCap,
  Library,
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

import logo from '@/assets/logo.svg';
import { NavUser } from './NavUser';
import { cn } from '@/lib/utils';

// Menu items.
const items = [
  {
    title: 'Home',
    url: '/',
    icon: Home,
  },
  {
    title: 'Professores',
    url: '/teachers',
    icon: Presentation,
  },
  {
    title: 'Disciplinas',
    url: '/subjects',
    icon: BookOpen,
  },
  {
    title: 'Salas',
    url: '/rooms',
    icon: LayoutDashboard,
  },
  {
    title: 'Alunos',
    url: '/students',
    icon: GraduationCap,
  },
  {
    title: 'Cursos',
    url: '/courses',
    icon: Library,
  },
];

export function AppSidebar() {
  const pathname = window.location.pathname;
  console.log(pathname);
  return (
    <Sidebar>
      <SidebarHeader className='pt-8 px-6 '>
        <img src={logo} alt='Logo' className='w-36 h-10' />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          {/* <SidebarGroupLabel>Application</SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      pathname === item.url && 'bg-sidebar-accent *:text-white'
                    )}
                  >
                    <a href={item.url}>
                      <item.icon className={cn('size-6')} />
                      <span className='text-base  '>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{ name: 'John Doe', email: 'john@doe.com', avatar: '' }}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
