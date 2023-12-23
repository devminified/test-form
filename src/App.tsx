import { useState } from "react";
import Home from "./page/Home";
import Header from "./components/Header";
import './index.css'

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <Home />
    </>
  );
}

export default App;
