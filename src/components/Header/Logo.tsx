import { Text } from '@chakra-ui/react';

export function Logo() {
  return (
    <Text 
      fontSize={["2xl", "3xl"]} 
      fontWeight="bold" 
      letterSpacing="tight" 
      color="white"
    >
      Dash
    <Text as="span" color="pink.500">
      .
    </Text>Go</Text>
  )
}