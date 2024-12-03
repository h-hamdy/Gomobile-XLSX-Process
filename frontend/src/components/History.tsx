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
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon, SearchIcon, DownloadIcon } from "@chakra-ui/icons";
import axios from "axios";
import { useEffect, useState } from "react";

export const History = () => {
  const [historyData, setHistoryData] = useState<any[]>([]);
  const toast = useToast();

  const historyList = async () => {
    try {
      const response = await axios.get("http://localhost:3000/history");
      console.log(response);
      setHistoryData(response.data);
    } catch {
      toast({
        title: "No data to download",
        position: "top-right",
        status: "warning",
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    historyList();
  }, []);

  const navigate = useNavigate();
  return (
    <Box className="flex flex-col gap-10 p-10 h-[100vh] ">
      <Text className="flex items-center justify-center font-extrabold text-4xl">
        History List{" "}
      </Text>
      <Box className="flex lg:px-10 justify-between">
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

      <Box h="100vh" className="lg:px-10 pt-10 pb-10">
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
            <Thead className=" bg-gray-300 h-[30px] sticky top-0 z-10">
              <Tr sx={{ th: { fontSize: "15px" } }} h={"50px"}>
                <Th>Original File</Th>
                <Th>Upload Date</Th>
                <Th>Valid Version</Th>
                <Th>InValid Version</Th>
              </Tr>
            </Thead>
            <Tbody>
              {historyData.map((item, index) => (
                <Tr key={index}>
                  <Td className="text-sm">{item.FileName}</Td>{" "}
                  <Td className="text-sm">
                    {new Date(item.createdAt)
                      .toLocaleString("en-GB", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hour12: false,
                      })
                      .replace(",", "")
                      .replace(" ", ":")}
                  </Td>
                  <Td>
                    <DownloadIcon
                      color={"#fcc05e"}
                      className="font-bold cursor-pointer flex items-center gap-1 text-[#fcc05e] hover:text-[#d1a400] hover:underline transition duration-200"
                    />
                  </Td>
                  <Td>
                    <DownloadIcon
                      color={"red.600"}
                      className="font-bold cursor-pointer flex items-center gap-1 text-red-600 hover:text-red-500 hover:underline transition duration-200"
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};
