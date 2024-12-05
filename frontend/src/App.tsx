import { createContext, Dispatch, SetStateAction, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { History } from "./components/History";
import { Upload } from "./components/Upload";
interface Data {
  OriginalFile: File | null;
  InvalidFile: any[];
  ValidFile: any[];
  ChunkedFile: any[];
  selectedOptions: { [key: string]: number };
}

interface UploadContextData {
  data: Data;
  setData: Dispatch<SetStateAction<Data>>;
}

export const UploadContext = createContext<UploadContextData | undefined>(
  undefined
);

function App() {
  const [data, setData] = useState<Data>({
    OriginalFile: null,
    InvalidFile: [],
    ValidFile: [],
    ChunkedFile: [],
    selectedOptions: {},
  });

  return (
    <UploadContext.Provider value={{ data, setData }}>
      <BrowserRouter>
        <Routes>
          <Route path="/upload" element={<Upload />} />
          <Route path="/" element={<History />} />
        </Routes>
      </BrowserRouter>
    </UploadContext.Provider>
  );
}

export default App;
