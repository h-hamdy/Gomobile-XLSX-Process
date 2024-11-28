import { Upload } from "./components/Upload";
import { History } from "./components/History";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
	return (
		<BrowserRouter>
		  <Routes>
		  <Route path="/" element={<Upload />}/>
		  <Route path="/history" element={<History />}/>
		  </Routes>
		</BrowserRouter>
	  );
}

export default App;
