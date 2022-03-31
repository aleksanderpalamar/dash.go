/* eslint-disable @next/next/link-passhref */
import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack } from "@chakra-ui/react";
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';


import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { Input } from "../../components/Form/Input";
import Link from "next/link";

type CreateUserFormData = {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

const createUserFormSchema = yup.object().shape({
  name: yup.string().required("Nome obrigatório"),
  email: yup.string().email("E-mail inválido").required("E-mail obrigatório"),
  password: yup.string().required("Senha obrigatória").min(6, "No mínimo 6 caracteres").max(12, "No máximo 12 caracteres"),
  passwordConfirmation: yup.string().oneOf([yup.ref('password'), null], 'As senhas não conferem')
});


export default function CreateUser() {
  const {register, handleSubmit, formState } = useForm<CreateUserFormData>({
    resolver: yupResolver(createUserFormSchema)
  });

  const { errors } = formState;

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (values) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log(values);
  }

  return (
    <Box>
      <Header />
      <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
        <Sidebar />
        <Box 
          as="form" 
          flex="1" 
          borderRadius={8} 
          bg="gray.800" 
          p={["6", "8"]} 
          onSubmit={handleSubmit(handleCreateUser)}
        >
          <Heading size="lg" fontWeight="normal">
            Criar novo usuário
          </Heading>
          <Divider my="6" borderColor="gray.600"/>
          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input 
                id="name" 
                label={"Nome"}
                error={errors.name}
                {...register("name")}
              />
              <Input 
                id="Email" 
                type="email" 
                label={"Email"}
                error={errors.email}
                {...register("email")}
              />
            </SimpleGrid>
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input 
                id="Password" 
                type="password" 
                label={"Senha"}
                error={errors.password}
                {...register("password")}
              />
              <Input 
                id="passwordConfirmation" 
                type="password" 
                label={"Confirmação da senha"}
                error={errors.passwordConfirmation}
                {...register("passwordConfirmation")}
              />
            </SimpleGrid>            
          </VStack>
          <Flex mt="8" justify="flex-end">
            <HStack spacing={4}>
              <Link href="/users" passHref>
              <Button as="a" colorScheme="whiteAlpha" bg="gray.500" _hover={{ bg: "gray.600" }} color="white">Cancelar</Button>
              </Link>
              <Button 
                colorScheme="pink" 
                bg="pink.500" 
                _hover={{ bg: "pink.600" }} 
                color="white"
                type="submit"
                isLoading={formState.isSubmitting}
              >
                Salvar
              </Button>              
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  )
}