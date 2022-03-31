/* eslint-disable react/no-children-prop */
import { Box, Checkbox, Table as ChakraTable, Tbody, Td, Th, Thead, Tr, Text, useBreakpointValue } from "@chakra-ui/react";
import { ButtonEdit } from "../ButtonEdit";

export function Table() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  }); 

  return (
    <ChakraTable colorScheme="whiteAlpha">
      <Thead>
        <Tr>
          <Th px={["4", "4", "6"]} color="gray.300" w="8">
            <Checkbox colorScheme="pink"/>
          </Th>          
          <Th>Usuário</Th>
          {isWideVersion && <Th>Data de cadastro</Th>}
          <Th w="8"></Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td px={["4", "4", "6"]}>
            <Checkbox colorScheme="pink"/>
          </Td>
          <Td>
            <Box>
              <Text fontWeight="bold">Aleksander Palamar</Text>
              <Text fontSize="sm" color="gray.300">apalamar@live.com</Text>
            </Box>
          </Td>
          {isWideVersion && <Td>29/03/2022</Td>}          
            <Td>
              <ButtonEdit children={"Editar"}/>
            </Td>          
        </Tr>
      </Tbody>
    </ChakraTable>
  )
}