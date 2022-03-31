import { Button as ChakraButton, Icon } from "@chakra-ui/react";

import { RiAddLine } from "react-icons/ri";

interface ButtonCreateProps {
  children: string;  
}

export function Button({ children }: ButtonCreateProps) {
  return (
    <ChakraButton 
      as="a"
      cursor="pointer" 
      size="sm" 
      fontSize="sm" 
      colorScheme="pink"
      bg="pink.500"
      _hover={{ bg: "pink.600" }}
      color="white" 
      leftIcon={<Icon as={RiAddLine}/>}
    >
      {children}
    </ChakraButton>
  )
}