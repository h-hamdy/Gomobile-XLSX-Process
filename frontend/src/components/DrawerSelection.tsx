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
  useToast,
} from "@chakra-ui/react";
import { useContext } from "react";
import { UploadContext } from "../App";
import axios from "axios";

export const DrawerSelection = ({ onClose, isOpen, setDownload }: any) => {
  const context = useContext(UploadContext);
  if (!context) {
    console.error("UploadContext is not available");
    return null;
  }

  const { data, setData } = context;
  const toast = useToast();

  const handleUpload = async () => {
    if (!data.OriginalFile) return;

    const formData = new FormData();
    formData.append("file", data.OriginalFile);
    formData.append("selectedRows", JSON.stringify(data.SelectedRows));

    try {
      const response = await axios.post(
        "http://localhost:3000/upload",
        formData
      );
      const { jsonData, invalidData } = response.data;

      setData((prevData: any) => ({
        ...prevData,
        ValidFile: jsonData,
        InvalidFile: invalidData,
      }));

      setDownload(true);

      toast({
        title: "File Processed successfully",
        position: "top-right",
        status: "success",
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "File Upload Failed",
        position: "top-right",
        description: "Please upload a valid file XLSX.",
        status: "error",
        isClosable: true,
      });
    }
  };

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
                  {data?.ChunkedFile[0]?.map((header: any, index: any) => (
                    <Th key={index} isNumeric={index === 2}>
                      {header}
                    </Th>
                  ))}
                </Tr>
              </Thead>
              <Tbody>
                {data.ChunkedFile?.slice(1).map((row: any, rowIndex: any) => (
                  <Tr key={rowIndex}>
                    {row.map((cell: any, cellIndex: any) => (
                      <Td
                        className="text-xs"
                        key={cellIndex}
                        isNumeric={cellIndex === 2}
                      >
                        {cell}
                      </Td>
                    ))}
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
          <Text className="flex items-center justify-center text-xs text-gray-500">
            Snipped From the file you just uploaded
          </Text>
          <Box className="flex flex-col gap-8 pt-10">
            <RadioGroup
              value={data.SelectedRows.telephone.toString()}
              onChange={(value) =>
                setData((prevData: any) => ({
                  ...prevData,
                  SelectedRows: {
                    ...prevData.SelectedRows,
                    telephone: parseInt(value),
                  },
                }))
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
              value={data.SelectedRows.amount.toString()}
              onChange={(value) =>
                setData((prevData: any) => ({
                  ...prevData,
                  SelectedRows: {
                    ...prevData.SelectedRows,
                    amount: parseInt(value),
                  },
                }))
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
              value={data.SelectedRows.agent.toString()}
              onChange={(value) =>
                setData((prevData: any) => ({
                  ...prevData,
                  SelectedRows: {
                    ...prevData.SelectedRows,
                    agent: parseInt(value),
                  },
                }))
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
