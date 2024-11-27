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
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

export const ModalSelection = ({
  onClose,
  isOpen,
  selectedRows,
  setSelectedRows,
  setIsProcessing,
  handleUpload,
}: any) => {
  console.log(selectedRows);
  return (
    <Drawer onClose={onClose} isOpen={isOpen} size={"xl"}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader>Select Your Columns File Format</DrawerHeader>
        <DrawerCloseButton />
        <DrawerBody className="flex flex-col gap-5">
          <TableContainer>
            <Table variant="simple">
              <TableCaption>
                Snipped From the file you just uploaded
              </TableCaption>
              <Thead>
                <Tr>
                  <Th>To convert</Th>
                  <Th>into</Th>
                  <Th isNumeric>multiply by</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>inches</Td>
                  <Td>millimetres (mm)</Td>
                  <Td isNumeric>25.4</Td>
                </Tr>
                <Tr>
                  <Td>feet</Td>
                  <Td>centimetres (cm)</Td>
                  <Td isNumeric>30.48</Td>
                </Tr>
                <Tr>
                  <Td>yards</Td>
                  <Td>metres (m)</Td>
                  <Td isNumeric>0.91444</Td>
                </Tr>
                <Tr>
                  <Td>yards</Td>
                  <Td>metres (m)</Td>
                  <Td isNumeric>0.91444</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
          <Box className="flex flex-col gap-8 pt-10">
            <RadioGroup
              value={selectedRows.telephone.toString()} // Controlled value
              onChange={(value) =>
                setSelectedRows({
                  ...selectedRows,
                  telephone: parseInt(value), // Convert the value back to a number
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
              value={selectedRows.amount.toString()} // Controlled value
              onChange={(value) =>
                setSelectedRows({
                  ...selectedRows,
                  amount: parseInt(value), // Convert the value back to a number
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
              value={selectedRows.agent.toString()} // Controlled value
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
              setIsProcessing(false), onClose();
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

// const formData = new FormData();
//     formData.append("file", file);

//     formData.append("selectedRows", JSON.stringify(selectedRows));

//     Setspinner(true);

//     try {
//       const response = await axios.post(
//         "http://localhost:3000/upload",
//         formData
//       );

//       const { jsonData, invalidData } = response.data;
//       setFileName(file.name);

//       SetjsonData(jsonData);
//       SetInvalidData(invalidData);

//       Setspinner(false);
//       setDownload(!download);
//       toast({
//         title: "File Processed successful",
//         position: "top-right",
//         status: "success",
//         isClosable: true,
//       });
//       setIsProcessing(false);
//     } catch (error) {
//       Setspinner(false);
//       toast({
//         title: "File Upload Failed",
//         position: "top-right",
//         description: "Please upload a valid file XLSX.",
//         status: "error",
//         isClosable: true,
//       });
//       setIsProcessing(false);
//     }
