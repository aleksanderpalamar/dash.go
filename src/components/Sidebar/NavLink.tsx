import {
  Text,
  Link as ChakraLink,
  Icon,
  LinkProps as ChakraLinkProps,  
} from "@chakra-ui/react";
import { ActiveLink } from "../ActiveLink";
import { ElementType } from "react";

interface NavLinkProps extends ChakraLinkProps {
  icon?: ElementType;
  iconColor?: string;
  href: string;
}

export function NavLink ({ icon, children, href, ...rest }: NavLinkProps) {
  return (
    <ActiveLink href={href} passHref>
      <ChakraLink alignItems="center" {...rest}>        
        {icon && <Icon as={icon} fontSize="30" mt="4" mr="4"/>}              
        <Text  fontWeight="medium">
          {children}
        </Text>        
      </ChakraLink>
    </ActiveLink>
  )
}