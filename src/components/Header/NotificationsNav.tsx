import { HStack, Icon, useBreakpointValue } from "@chakra-ui/react";

import { RiUserAddLine, RiNotificationLine } from "react-icons/ri";

export function NotificationsNav() {
  const isMobileVersion = useBreakpointValue({
    base: false,
    lg: true,
  })

  return (
    <>
      {!isMobileVersion ? (
          <>
            <HStack spacing={2} mx="2" pr="2" py="1" color="gray.300" borderRightWidth={1} borderColor="gray.700">
              <Icon as={RiUserAddLine} fontSize="20"/>  
              <Icon as={RiNotificationLine} fontSize="20"/>
            </HStack>
          </>
        ) : (
          <>
            <HStack spacing={8} mx="8" pr="8" py="1" color="gray.300" borderRightWidth={1} borderColor="gray.700">
              <Icon as={RiUserAddLine} fontSize="20"/>  
              <Icon as={RiNotificationLine} fontSize="20"/>
            </HStack>
          </>
        )}
    </>
  )
}