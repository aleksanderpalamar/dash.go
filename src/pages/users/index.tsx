/* eslint-disable react/no-children-prop */
import { Box, Flex, Icon, Button as ChakraButton } from "@chakra-ui/react";

import { Heading } from "../../components/Heading";
import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";
import { Table } from "../../components/Table";
import Link from "next/link";
import { RiAddLine } from "react-icons/ri";

export default function UserList() { 
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
            <Table />
            <Pagination />
          </Box>  
      </Flex>
    </Box>
  )
}