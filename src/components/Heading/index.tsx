import { Heading as ChakraHeading } from "@chakra-ui/react"

interface ChakraHeadingProps {
  title: string;
}

export function Heading({ title }: ChakraHeadingProps) {  
  return (
    <ChakraHeading size="lg" fontWeight="normal">
      {title}      
    </ChakraHeading>
  )
}