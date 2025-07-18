import { Box, Button, useToast, Text, useDisclosure } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import Dropzone from "react-dropzone";
import * as XLSX from "xlsx";
import { DrawerSelection } from "./DrawerSelection";
import { Link } from "react-router-dom";
import { UploadContext } from "../App";

export const Upload = () => {
  const toast = useToast();

  const context = useContext(UploadContext);

  if (!context) {
    console.error("UploadContext is not available");
    return null;
  }

  const { data, setData } = context;
  //   const initialselectedOptions = {
  //     telephone: 1,
  //     amount: 2,
  //     agent: 3,
  //   };

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    console.log("Updated selectedOptions:", data.selectedOptions);
  }, [data.selectedOptions]);

  const handleFileChange = async (file: File) => {
    if (!file) return;

    const mimeType = file.type;
    if (
      mimeType !==
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      toast({
        title: "File Upload Failed",
        position: "top-right",
        description: "Please upload a valid file XLSX.",
        status: "error",
        isClosable: true,
      });
      return;
    }

    setData((prevData: any) => ({
      ...prevData,
      OriginalFile: file,
    }));

    if (!data) return;

    setData((prevData: any) => ({
      ...prevData,
      OriginalFile: file,
    }));

    const reader = new FileReader();
    reader.onload = (e) => {
      const buffer = e.target?.result;
      const workbook = XLSX.read(buffer, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      const chunkedData: any[] = [];

      XLSX.utils.sheet_to_json(sheet, { header: 1 }).forEach((row, index) => {
        if (index < 6) {
          chunkedData.push(row);
        }
      });

      setData((prevData: any) => ({
        ...prevData,
        ChunkedFile: chunkedData,
      }));
      console.log(chunkedData);
      onOpen();
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <>
      <Box className="flex flex-col gap-5 h-screen items-center justify-center md:bg-gray-100">
        <img
          className="w-[300px] pb-10 pt-10 lg:pt-0"
          src="/src/assets/logo.png"
        ></img>
        <Box className="flex flex-col items-center p-5 pb-10  bg-white rounded-3xl shadow-lg md:w-[520px] md:h-[460px] w-full h-screen">
          <Text className="text-gray-600 font-semibold tracking-wide hidden md:flex">
            Choose File
          </Text>
          <Dropzone
            onDrop={(acceptedFiles) => {
              if (acceptedFiles.length > 0) {
                handleFileChange(acceptedFiles[0]);
              }
            }}
          >
            {({ getRootProps, getInputProps }) => (
              <section className="flex w-full p-10 pb-5 h-full">
                <div
                  className="flex flex-col w-full items-center justify-center "
                  {...getRootProps()}
                >
                  <input {...getInputProps()} />
                  <Button
                    cursor={"pointer"}
                    as="label"
                    variant="outline"
                    width="100%"
                    height="full"
                    className="flex flex-col w-full bg-white items-center justify-center gap-1"
                    sx={{
                      borderStyle: "dashed",
                      borderWidth: "1px",
                      borderColor: "#cccccc",
                      transition: "all 0.2s ease-in-out",
                    }}
                  >
                    <Box className="flex flex-col items-center justify-center gap-3 p-4">
                      <img
                        className="w-[35px]"
                        src="/src/assets/xls-file.png"
                        alt="Upload icon"
                      />
                      <Text className="text-[#fcc05e] text-sm">
                        Drag and Drop here
                      </Text>
                      <Text className="text-gray-400 text-xs">- Or -</Text>
                      <Button
                        onClick={() =>
                          setData((prevData: any) => ({
                            ...prevData,
                          }))
                        }
                        className="bg-[#fcc05e] flex items-center justify-center gap-2 font-light"
                        as="label"
                        fontSize="sm"
                        colorScheme="#fcc05e"
                        size="md"
                        sx={{
                          transition: "all 0.2s ease-in-out",
                          _hover: {
                            backgroundColor: "#ffd070",
                            transform: "scale(1.05)",
                          },
                        }}
                      >
                        <img
                          className="w-[16px]"
                          src="/src/assets/upload.png"
                          alt="Browse file"
                        />
                        Browse File
                      </Button>
                    </Box>
                  </Button>
                </div>
              </section>
            )}
          </Dropzone>
          <Link className="flex w-full px-10" to="/">
            <Button
              border="1px"
              borderColor="#fcc05e"
              fontSize={"sm"}
              textColor={"gray-600"}
              className="flex text-gray-600 w-full"
            >
              History
            </Button>
          </Link>
        </Box>
      </Box>
      {isOpen ? <DrawerSelection onClose={onClose} isOpen={isOpen} /> : null}
    </>
  );
};
