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
import { SearchIcon, DownloadIcon , AddIcon} from "@chakra-ui/icons";
import axios from "axios";
import { useEffect, useState } from "react";

export const History = () => {
  const [historyData, setHistoryData] = useState<any[]>([]);
  const [Searchvalue, SetsearchValue] = useState([]);
  const toast = useToast();

  const historyList = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:5000/get_all_file_excel"
      );
      setHistoryData(response.data);
	  console.log(response.data)
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
	

  const downloadFile = async (id: number, fileName: string, type: string) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/download_file?id=${id}&type=${type}`,
        {
          responseType: "blob",
        }
      );

      const blob = res.data;
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      if (!File || File.length === 0) {
        toast({
          title: "Error downloading file",
          description: "Please Check Your Original File",
          position: "top-right",
          status: "warning",
          isClosable: true,
        });
        return;
      }
    } catch (error: any) {
      toast({
        title: "Error downloading Original file",
        description: error.message,
        position: "top-right",
        status: "error",
        isClosable: true,
      });
    }
  };

  const handlechange = async (e: any) => {
	  SetsearchValue(e.target.value);
	  try {
		  const response = await axios.get(`http://localhost:5000/get_file_by_file_name?file_name=${Searchvalue}`);
		//   console.log("request send");
		console.log(response.data)
		  setHistoryData(response.data);
	  }
	  catch(error : any) {
		console.log(error.message)
	  }
  }

  useEffect(() => {
	console.log(Searchvalue);
  }, [Searchvalue])

  const navigate = useNavigate();
  return (
    <Box className="flex flex-col gap-10 p-10 h-[100vh] ">
      <Text className="flex items-center justify-center font-extrabold text-4xl">
        History List{" "}
      </Text>
      <Box className="flex lg:px-10 justify-between">
        <InputGroup className="shadow-sm" w="300px">
          <InputLeftElement
            pointerEvents="none"
            children={<SearchIcon color="gray.500" />}
          />
          <Input onChange={handlechange} focusBorderColor="#fcc05e" placeholder="Search By File name" />
        </InputGroup>
        <Button
          onClick={() => navigate("/upload")}
          border="1px"
		  backgroundColor={'#fcc05e'}
          borderColor="#fcc05e"
		  sx={{
			_hover: {
				backgroundColor: '#ffd070'
			}
		  }}
          className="flex items-center shadow-sm bg-green-400 hover:bg-green-600 justify-center gap-2"
        >
          <AddIcon color={'white'} />
        </Button>
      </Box>

      <Box h="100vh" className="lg:px-10 pt-10 pb-10">
        <TableContainer
          borderColor="gray.200"
          className="w-full shadow-sm border-[1px] rounded-xl "
          overflowY="auto"
          maxH={"600px"}
          sx={{
            "&::-webkit-scrollbar": {
              display: "none",
            },
            scrollbarWidth: "none",
          }}
        >
          <Table >
            <Thead className=" bg-gray-300 h-[30px] sticky top-0 z-10">
              <Tr sx={{ th: { fontSize: "15px" } }} h={"50px"}>
                <Th>Original File</Th>
                <Th>Size</Th>
                <Th>Upload Date</Th>
                <Th>Valid</Th>
                <Th>InValid</Th>
                <Th>Reason</Th>
              </Tr>
            </Thead>
            <Tbody>
              {historyData.map((item) => (
                <Tr key={item.id}>
                  <Td className="text-sm">{item.file_name}</Td>{" "}
				  <Td className="text-sm">{item.size}</Td>
                  <Td className="text-sm">
                    {new Date(item.uploaded_at)
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
				  {
					item.raison === null ?
					<>

					<Td>
                    <DownloadIcon
                      onClick={() =>
                        downloadFile(item.id, "Valid-" + item.file_name, "valid")
						}
                      color={"green.400"}
                      className="font-bold cursor-pointer flex items-center gap-1 hover:text-green-700 hover:underline transition duration-200"
                    />
                  </Td>
                  <Td>
                    <DownloadIcon
                      onClick={() =>
                        downloadFile(item.id, "Invalid-" + item.file_name, "invalid")
                      }
                      color={"red.600"}
                      className="font-bold cursor-pointer flex items-center gap-1 text-red-600 hover:text-red-500 hover:underline transition duration-200"
					  />
                  </Td>
					  </> : <>
						<Td></Td>
						<Td></Td>
					  </>
                  
				  }
				  <Td className="text-sm">{item.raison}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};
