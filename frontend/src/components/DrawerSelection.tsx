import {
  Drawer,
  Button,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useToast,
  Text,
  Select,
  Box,
} from "@chakra-ui/react";
import { useContext } from "react";
import { UploadContext } from "../App";
import axios from "axios";
import { TableData } from "./TableData";
import { useNavigate } from "react-router-dom";
export const DrawerSelection = ({ onClose, isOpen }: any) => {
  const navigate = useNavigate();
  const context = useContext(UploadContext);
  if (!context) {
    console.error("UploadContext is not available");
    return null;
  }

  const { data, setData } = context;

  const toast = useToast();

  const handleChange = (item: any, value: any) => {
    setData((prevData: any) => ({
      ...prevData,
      selectedOptions: {
        ...prevData.selectedOptions,
        [item]: value,
      },
    }));
  };


  const handleUpload = async () => {
    if (!data.OriginalFile) return;

    const formData = new FormData();
    formData.append("file", data.OriginalFile);
    formData.append("selectedOptions", JSON.stringify(data.selectedOptions));

    console.log(data.selectedOptions);

    try {
      await axios.post("http://localhost:5000/process_excel", formData);

	  const resetData ={
		OriginalFile: null,
		InvalidFile: [],
		ValidFile: [],
		ChunkedFile: [],
		selectedOptions: {},
	  }

	  setData(resetData);
      navigate("/");

      toast({
        title: "File Processed successfully",
        position: "top-right",
        status: "success",
        isClosable: true,
      });
    } catch (error: any) {
      toast({
        title: "File Upload Failed",
        position: "top-right",
        description: error.message,
        status: "error",
        isClosable: true,
      });
    }
  };

  const options = ["telephone", "montant", "agent", "other"];

  return (
    <Drawer onClose={onClose} isOpen={isOpen} size={"xl"}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader>Select Your Columns File Format</DrawerHeader>
        <DrawerCloseButton />

        <DrawerBody className="flex flex-col gap-5">
          <TableData/>
          <Text className="flex items-center justify-center text-xs text-gray-500">
            Snipped From the file you just uploaded
          </Text>
          <Box className="flex flex-wrap shrink-0 w-full gap-5  pt-10">
            {data.ChunkedFile[0].map((item: any, index: number) => (
              <>
                <Box className="flex flex-col gap-1">
                  <Text className="font-bold text-gray-600 text-xs">
                    {item}
                  </Text>
                  <Select
                    onChange={(e) => handleChange(item, e.target.value)}
                    borderRadius={"8px"}
					fontSize={'sm'}
                    size={"sm"}
                    className="text-sm"
                    key={index}
					minWidth={'150px'}
                  >
                    {options.map((nestedItem: string, index: number) => (
						<option
	                    key={index}
                        className="text-sm p-5 rounded-md"
						>
                        {nestedItem}
                      </option>
                    )) }
                  </Select>
                </Box>
              </>
            ))}
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
