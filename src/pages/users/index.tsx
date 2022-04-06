/* eslint-disable react/no-children-prop */
import {
  Box,
  Flex,
  Icon,
  Button as ChakraButton,
  Spinner,
  Text,
  Table as ChakraTable,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Checkbox,
  useBreakpointValue,
  Button,
  Link
} from "@chakra-ui/react";
import NextLink from "next/link";
import { RiAddLine } from "react-icons/ri";

import { Heading } from "../../components/Heading";
import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";
import { ButtonEdit } from "../../components/ButtonEdit";
import { useUsers } from "../../services/hooks/useUsers";
import { useState } from "react";
import { queryClient } from "../../services/queryClient";
import { api } from "../../services/api";

export default function UserList() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isFetching, error, refetch } = useUsers(page);

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  async function handlePreferchUser(userId: number) {
    await queryClient.prefetchQuery(['user', userId], async () => {
      const response = await api.get(`users/${userId}`)

      return response.data
    }, {
      staleTime: 1000 * 60 * 10 // 10 minutes
    })
  }

  return (
    <Box>
      <Header />
      <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
        <Sidebar />
        <Box flex="1" p={["4", "8"]} bg="gray.800" borderRadius={8}>
          <Flex mb="8" justify="space-between" align="center">
            <Heading title="Lista de Usuários" />
            <Button
              onClick={() => refetch()}
              cursor="pointer"
              size="sm"
              fontSize="sm"
              colorScheme="pink"
              bg="pink.500"
              _hover={{ bg: "pink.600" }}
              color="white"
            >
              Atualizar Pagina
              {!isLoading && isFetching && (
                <Spinner size="sm" color="gray.500" ml="4" />
              )}
            </Button>
            <NextLink href="/users/create" passHref>
              <ChakraButton
                as="a"
                cursor="pointer"
                size="sm"
                fontSize="sm"
                colorScheme="pink"
                bg="pink.500"
                _hover={{ bg: "pink.600" }}
                color="white"
                leftIcon={<Icon as={RiAddLine} />}
              >
                Criar novo usuário
              </ChakraButton>
            </NextLink>
          </Flex>
          {isLoading ? (
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
                      <Checkbox colorScheme="pink" />
                    </Th>
                    <Th>Usuário</Th>
                    {isWideVersion && <Th>Data de cadastro</Th>}
                    <Th w="8"></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data.users.map((user: any) => {
                    return (
                      <>
                        <Tr key={user.id}>
                          <Td px={["4", "4", "6"]}>
                            <Checkbox colorScheme="pink" />
                          </Td>
                          <Td>
                            <Box>
                              <Link color="purple.500" onMouseEnter={() => handlePreferchUser(user.id)}>
                                <Text fontWeight="bold">{user.name}</Text>
                              </Link>
                              <Text fontSize="sm" color="gray.300">
                                {user.email}
                              </Text>
                            </Box>
                          </Td>
                          {isWideVersion && <Td>{user.createdAt}</Td>}
                          <Td>
                            <ButtonEdit children={"Editar"} />
                          </Td>
                        </Tr>
                      </>
                    );
                  })}
                </Tbody>
              </ChakraTable>
              <Pagination
                totalCountOfRegisters={200}
                currentPage={page}
                onPageChange={setPage}
              />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}
