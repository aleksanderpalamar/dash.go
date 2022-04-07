/* eslint-disable react/no-children-prop */
import {
  Box,
  Checkbox,
  Table as ChakraTable,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  useBreakpointValue,
  Link,
} from "@chakra-ui/react";
import { useState } from "react";
import { api } from "../../services/api";
import { useUsers } from "../../services/hooks/useUsers";
import { queryClient } from "../../services/queryClient";
import { ButtonEdit } from "../ButtonEdit";

export function Table() {
  const [page, setPage] = useState(1);
  const { data } = useUsers(page);

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

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
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
                      <Link
                        color="purple.500"
                        onMouseEnter={() => handlePreferchUser(user.id)}
                      >
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
    </>
  );
}
