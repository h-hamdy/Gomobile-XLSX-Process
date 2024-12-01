import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  Button,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { ArrowLeftIcon, SearchIcon, DownloadIcon } from "@chakra-ui/icons";

export const History = () => {
  const navigate = useNavigate();
  return (
    <Box className="flex flex-col gap-10 p-10 h-[100vh] ">
      <Text className="flex items-center justify-center font-extrabold text-4xl">
        History List{" "}
      </Text>
      <Box className="flex px-10 justify-between">
        <Button
          onClick={() => navigate("/")}
          border="1px"
          borderColor="#fcc05e"
          className="flex items-center justify-center gap-2"
        >
          <ArrowLeftIcon color={"gray"} fontSize={"xs"} />
          <Text className="text-gray-600">Back</Text>
        </Button>
        <InputGroup w="300px">
          <InputLeftElement
            pointerEvents="none"
            children={<SearchIcon color="gray.500" />}
          />
          <Input focusBorderColor="#fcc05e" placeholder="Search By File name" />
        </InputGroup>
      </Box>

      <Box h="100vh" className="px-10 pt-10 pb-10">
        <TableContainer
          borderColor="gray.200"
          className="w-full border-[1px] rounded-xl "
          overflowY="auto"
          maxH={"600px"}
          sx={{
            "&::-webkit-scrollbar": {
              display: "none",
            },
            scrollbarWidth: "none",
          }}
        >
          <Table>
            <Thead className="bg-gray-300 h-[30px] sticky top-0 z-10">
              <Tr sx={{ th: { fontSize: "15px" } }} h={"50px"}>
                <Th>Original File</Th>
                <Th>Valid Version</Th>
                <Th>InValid Version</Th>
                <Th isNumeric>Upload Date</Th>
              </Tr>
            </Thead>
            <Tbody>
            
              <Tr>
                <Td>Untitled spreadsheet.xlsx</Td>
                <Td>
                  <Text className="font-bold cursor-pointer flex items-center gap-1 text-[#fcc05e] hover:text-[#d1a400] hover:underline transition duration-200">
                    <DownloadIcon />
                    Valid
                  </Text>
                </Td>
                <Td>
                  <Text className="font-bold cursor-pointer flex items-center gap-1 text-red-600 hover:text-red-500 hover:underline transition duration-200">
                    <DownloadIcon />
                    Invalid
                  </Text>
                </Td>
                <Td isNumeric>July, 19,2024</Td>
              </Tr>

			  <Tr>
                <Td>Untitled spreadsheet.xlsx</Td>
                <Td>
                  <Text className="font-bold cursor-pointer flex items-center gap-1 text-[#fcc05e] hover:text-[#d1a400] hover:underline transition duration-200">
                    <DownloadIcon />
                    Valid
                  </Text>
                </Td>
                <Td>
                  <Text className="font-bold cursor-pointer flex items-center gap-1 text-red-600 hover:text-red-500 hover:underline transition duration-200">
                    <DownloadIcon />
                    Invalid
                  </Text>
                </Td>
                <Td isNumeric>July, 19,2024</Td>
              </Tr>
             


			  <Tr>
                <Td>Untitled spreadsheet.xlsx</Td>
                <Td>
                  <Text className="font-bold cursor-pointer flex items-center gap-1 text-[#fcc05e] hover:text-[#d1a400] hover:underline transition duration-200">
                    <DownloadIcon />
                    Valid
                  </Text>
                </Td>
                <Td>
                  <Text className="font-bold cursor-pointer flex items-center gap-1 text-red-600 hover:text-red-500 hover:underline transition duration-200">
                    <DownloadIcon />
                    Invalid
                  </Text>
                </Td>
                <Td isNumeric>July, 19,2024</Td>
              </Tr>
             
             
             
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};
