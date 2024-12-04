import {
  TableContainer,
  Thead,
  Th,
  Tr,
  Tbody,
  Td,
  Table,
} from "@chakra-ui/react";
import { useContext } from "react";
import { UploadContext } from "../App";

export const TableData = () => {
  const context = useContext(UploadContext);
  if (!context) {
    console.error("UploadContext is not available");
    return null;
  }

  const { data } = context;
  return (
    <TableContainer className="rounded-sm">
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
  );
};
