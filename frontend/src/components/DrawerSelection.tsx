import {
  Drawer,
  Button,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  RadioGroup,
  Stack,
  Radio,
  Box,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";

export const DrawerSelection = ({
  onClose,
  isOpen,
  selectedRows,
  setSelectedRows,
  handleUpload,
  chunckData,
}: any) => {
  console.log(selectedRows);

  console.log(chunckData);
  return (
    <Drawer onClose={onClose} isOpen={isOpen} size={"xl"}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader>Select Your Columns File Format</DrawerHeader>
        <DrawerCloseButton />
        <DrawerBody className="flex flex-col gap-5">
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  {chunckData[0]?.map((header: any, index: any) => (
                    <Th key={index} isNumeric={index === 2}>
                      {header}
                    </Th>
                  ))}
                </Tr>
              </Thead>
              <Tbody>
                {chunckData?.slice(1).map((row : any, rowIndex : any) => (
                  <Tr key={rowIndex}>
                    {row.map((cell : any, cellIndex: any) => (
                      <Td className="text-xs" key={cellIndex} isNumeric={cellIndex === 2}>
                        {cell}
                      </Td>
                    ))}
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
		  <Text className="flex items-center justify-center text-xs text-gray-500">Snipped From the file you just uploaded</Text>
          <Box className="flex flex-col gap-8 pt-10">
            <RadioGroup
              value={selectedRows.telephone.toString()}
              onChange={(value) =>
                setSelectedRows({
                  ...selectedRows,
                  telephone: parseInt(value),
                })
              }
            >
              <Stack direction="column">
                <Box className="text-gray-600 font-semibold tracking-wider text-sm">
                  Telephone
                </Box>
                <Box className="flex gap-4">
                  <Radio colorScheme="yellow" value="1">
                    <Text className="text-sm">Row 1</Text>
                  </Radio>

                  <Radio colorScheme="yellow" value="2">
                    <Text className="text-sm">Row 2</Text>
                  </Radio>

                  <Radio colorScheme="yellow" value="3">
                    <Text className="text-sm">Row 3</Text>
                  </Radio>
                </Box>
              </Stack>
            </RadioGroup>

            <RadioGroup
              value={selectedRows.amount.toString()}
              onChange={(value) =>
                setSelectedRows({
                  ...selectedRows,
                  amount: parseInt(value),
                })
              }
            >
              <Stack direction="column">
                <Box className="text-gray-600 font-semibold tracking-wider text-sm">
                  Amount
                </Box>
                <Box className="flex gap-4">
                  <Radio colorScheme="yellow" value="1">
                    <Text className="text-sm">Row 1</Text>
                  </Radio>

                  <Radio colorScheme="yellow" value="2">
                    <Text className="text-sm">Row 2</Text>
                  </Radio>

                  <Radio colorScheme="yellow" value="3">
                    <Text className="text-sm">Row 3</Text>
                  </Radio>
                </Box>
              </Stack>
            </RadioGroup>

            <RadioGroup
              value={selectedRows.agent.toString()}
              onChange={(value) =>
                setSelectedRows({
                  ...selectedRows,
                  agent: parseInt(value),
                })
              }
            >
              <Stack direction="column">
                <Box className="text-gray-600 font-semibold tracking-wider text-sm">
                  Agent
                </Box>
                <Box className="flex gap-4">
                  <Radio colorScheme="yellow" value="1">
                    <Text className="text-sm">Row 1</Text>
                  </Radio>

                  <Radio colorScheme="yellow" value="2">
                    <Text className="text-sm">Row 2</Text>
                  </Radio>

                  <Radio colorScheme="yellow" value="3">
                    <Text className="text-sm">Row 3</Text>
                  </Radio>
                </Box>
              </Stack>
            </RadioGroup>
          </Box>
        </DrawerBody>
        <DrawerFooter className="flex gap-4">
          <Button
            onClick={() => {
              onClose();
            }}
          >
            Close
          </Button>
          <Button
            className="flex gap-1 items-center justify-center bg-[#fcc05e]"
            colorScheme="#fcc05e"
            onClick={() => {
              onClose(), handleUpload();
            }}
          >
            {" "}
            <img
              className="w-[18px]"
              src="/src/assets/process.png"
              alt="Process file"
            />{" "}
            Process
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
