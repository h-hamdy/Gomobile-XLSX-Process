import { Box, Radio, RadioGroup, Text, Stack } from '@chakra-ui/react'
import { useContext } from 'react'
import { UploadContext } from '../App';


export const RadioComponent = () => {
	const context = useContext(UploadContext);
  if (!context) {
    console.error("UploadContext is not available");
    return null;
  }

  const { data, setData } = context;
  return (
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
  )
}
