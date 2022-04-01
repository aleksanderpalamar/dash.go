import { Box, Stack, Text } from "@chakra-ui/react";

import { PaginationItem } from "./PaginationItem";

export function Pagination() {
  return (
    <Stack
      direction={["column", "row"]}
      spacing={6}
      mt="8"
      justify="space-between"
      align="center"
    >
      <Box>
        <Text as="strong">0</Text> - <Text as="strong">10</Text> de <Text as="strong">100</Text>
      </Box>
      <Stack direction="row" spacing={2}>
        <PaginationItem number={1} isCurrent />
        <PaginationItem number={2} />
        <PaginationItem number={3} />
        <PaginationItem number={4} />
        <PaginationItem number={5} />        
      </Stack>
    </Stack>
  );
}