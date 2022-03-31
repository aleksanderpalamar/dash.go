import { Button, Flex, Stack, Text } from '@chakra-ui/react';
import { Input } from '../components/Form/Input';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

type SignInFormData = {
  email: string;
  password: string;
}

const signInFormSchema = yup.object().shape({
  email: yup.string().email("E-mail inválido").required("E-mail obrigatório"),
  password: yup.string().required("Senha obrigatória")
});

export default function SignIn() {
  const { register, handleSubmit, formState } = useForm<SignInFormData>({
    resolver: yupResolver(signInFormSchema)
  })

  const { errors } = formState;

  const handleSignIn: SubmitHandler<SignInFormData> = async (values) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log(values);
  }

  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Flex 
        as="form" 
        w="100%" 
        maxW={360} 
        bg="gray.800" 
        borderRadius={8} 
        p="8" 
        flexDirection="column"
        onSubmit={handleSubmit(handleSignIn)}
      >        
        <Text d="flex" fontSize={["2xl", "3xl"]} fontWeight="bold" color="white" mb="4" justifyContent="center">Dash<Text color="pink.500">.</Text>Go</Text>
        <Stack spacing={6}>        
          <Input
            id="email"            
            type="email" 
            label={'Email'}
            error={errors.email}
            {...register("email")}
          />                         
          <Input
            id="password"             
            type="password" 
            label={'Senha'}
            error={errors.password}
            {...register("password")}
          />          
        </Stack>        
        <Button 
          type="submit" 
          mt="6" 
          colorScheme="purple" 
          bg="purple.500" 
          _hover={{ bg: "purple.600"}} 
          borderRadius={8} 
          color="gray.100" 
          size="lg"
          isLoading={formState.isSubmitting}
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  )
}
