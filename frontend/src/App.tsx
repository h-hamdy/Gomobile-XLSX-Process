import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { History } from "./components/History";
import { Upload } from "./components/Upload";
interface Data {
  OriginalFile: File | null;
  InvalidFile: any[];
  ValidFile: any[];
  ChunkedFile: any[];
  SelectedRows: { [key: string]: number };
}

interface UploadContextData {
  data: Data;
  setData: Dispatch<SetStateAction<Data>>;
}

const initialSelectedRows = {
  telephone: 1,
  amount: 2,
  agent: 3,
};

export const UploadContext = createContext<UploadContextData | undefined>(
  undefined
);

function App() {
  const [data, setData] = useState<Data>({
    OriginalFile: null,
    InvalidFile: [],
    ValidFile: [],
    ChunkedFile: [],
    SelectedRows: initialSelectedRows,
  });

  return (
    <UploadContext.Provider value={{ data, setData }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Upload />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </BrowserRouter>
    </UploadContext.Provider>
  );
}

export default App;
