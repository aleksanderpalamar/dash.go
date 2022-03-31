import { Stack } from '@chakra-ui/react';
import { RiDashboardLine, RiGitMergeLine, RiInputMethodFill, RiInputMethodLine, RiUserLine } from 'react-icons/ri';

import { NavSection } from './NavSection';
import { NavLink } from './NavLink';

export function SidebarNav() {
  return (
      <Stack spacing={12} align="flex-start">
        <NavSection title="GERAL">      
          <NavLink href="/dashboard" icon={RiDashboardLine}>Dashboard</NavLink>            
          <NavLink href="/users" icon={RiUserLine}>Usuários</NavLink>               
        </NavSection>        
        <NavSection title="AUTOMAÇÂO">
          <NavLink href="/automation/automation" icon={RiGitMergeLine}>Automação</NavLink>
          <NavLink href="/automation/schedules" icon={RiInputMethodLine}>Formulários</NavLink>
          <NavLink href="/automation/inputs" icon={RiInputMethodFill}>Entradas</NavLink>
        </NavSection>
      </Stack>
  )
}