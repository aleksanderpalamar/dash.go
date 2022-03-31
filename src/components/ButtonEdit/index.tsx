import { Button as ChakraButton, Icon, useBreakpointValue } from "@chakra-ui/react";
import Link from "next/link";

import { RiAddLine } from "react-icons/ri";

interface ButtonCreateProps {
  children: string;  
}

export function ButtonEdit({ children }: ButtonCreateProps) {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <Link href="/users/create" passHref>
      <ChakraButton 
       as="a"       
       cursor="pointer" 
       size="sm" 
       fontSize="sm" 
       colorScheme="purple"
       bg="purple.500"
       _hover={{ bg: "purple.600" }}
       color="white" 
       leftIcon={<Icon as={RiAddLine}/>}
      >
        {isWideVersion ? children : ''}
      </ChakraButton>
    </Link>
  )
}