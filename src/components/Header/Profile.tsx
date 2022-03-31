import { Box, Flex, Text, Avatar } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({showProfileData}: ProfileProps) { 

  return (
    <Flex>
      {showProfileData && (
        <Box mr="4" textAlign="right">
        <Text>Aleksander Palamar</Text>
        <Text color="gray.300" fontSize="small">apalamar@live.com</Text>
      </Box>
      )}
        <Avatar border="3px solid #f5f5f5" size="md"  src={'https://github.com/aleksanderpalamar.png'}/>      
    </Flex>
  )
}