/* eslint-disable react/no-children-prop */
import {
  Box,
  Flex,
  Icon,
  Button as ChakraButton,
  Spinner,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { RiAddLine } from "react-icons/ri";

import { Heading } from "../../components/Heading";
import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";
import { useUsers } from "../../services/hooks/useUsers";
import { useState } from "react";
import { queryClient } from "../../services/queryClient";
import { api } from "../../services/api";
import { Table } from "../../components/Table";

export default function UserList() {
  const [page, setPage] = useState(1);
  const { isLoading, error } = useUsers(page);

  async function handlePreferchUser(userId: number) {
    await queryClient.prefetchQuery(
      ["user", userId],
      async () => {
        const response = await api.get(`users/${userId}`);

        return response.data;
      },
      {
        staleTime: 1000 * 60 * 10, // 10 minutes
      }
    );
  }

  return (
    <Box>
      <Header />
      <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
        <Sidebar />
        <Box flex="1" p={["4", "8"]} bg="gray.800" borderRadius={8}>
          <Flex mb="8" justify="space-between" align="center">
            <Heading title="Lista de Usuários" />
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
              <Table />
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
