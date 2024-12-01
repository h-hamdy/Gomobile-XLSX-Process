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
} from "@chakra-ui/react";
import { useContext } from "react";
import { UploadContext } from "../App";
import axios from "axios";
import { RadioComponent } from "./RadioComponent";
import { TableData } from "./TableData";
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
          <TableData/>
          <Text className="flex items-center justify-center text-xs text-gray-500">
            Snipped From the file you just uploaded
          </Text>
          <RadioComponent/>
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
