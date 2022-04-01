/* eslint-disable react/no-children-prop */
import { Box, Flex, Icon, Button as ChakraButton, Spinner, Text, Table as ChakraTable, Tbody, Td, Th, Thead, Tr, Checkbox, useBreakpointValue } from "@chakra-ui/react";
import Link from "next/link";
import { RiAddLine } from "react-icons/ri";
import { useQuery } from "react-query";

import { Heading } from "../../components/Heading";
import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";
import { ButtonEdit } from "../../components/ButtonEdit";

export default function UserList() {
  const { data, isLoading, error } = useQuery("users", async () => {
    const response = await fetch("/api/users");
    const data = await response.json()

    const users = data.users.map((user: { id: string; name: string; email: string; createdAt: string; }) => {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: new Date(user.createdAt).toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        }),
      };
    });

    return users;
  })

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  }); 

  return (
    <Box>
      <Header />
      <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
        <Sidebar />        
          <Box flex="1" p={["4", "8"]} bg="gray.800" borderRadius={8}>
            <Flex mb="8" justify="space-between" align="center">
              <Heading title="Lista de Usuários"/>
              <Link href="/users/create" passHref>
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
                Criar novo usuário
              </ChakraButton>
              </Link>
            </Flex>
            { isLoading ? (
              <Flex justify="center">
                <Spinner />
              </Flex>
            ) : error ? (
              <>
                <Flex justify="center">
                  <Text color="red.500">Falha ao obter dados dos usuários</Text>
                </Flex>
              </>
            ) : (
              <>
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
                      {data.map((user: { id: string; name: string; email: string; createdAt: string; })  => {
                        return (
                          <>
                            <Tr key={user.id}>
                              <Td px={["4", "4", "6"]}>
                                <Checkbox colorScheme="pink"/>
                              </Td>
                              <Td>
                              <Box>
                                <Text fontWeight="bold">{user.name}</Text>
                                <Text fontSize="sm" color="gray.300">{user.email}</Text>
                              </Box>
                              </Td>
                                {isWideVersion && <Td>{user.createdAt}</Td>}          
                              <Td>
                                <ButtonEdit children={"Editar"}/>
                              </Td>          
                            </Tr>
                          </>
                        )
                      })}
                    </Tbody>
                </ChakraTable>
                <Pagination />
              </>
            )}
          </Box>  
      </Flex>
    </Box>
  )
}