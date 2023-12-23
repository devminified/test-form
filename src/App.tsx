import { Fragment } from "react";
import { ToastContainer } from "react-toastify";
import Home from "./page/Home";
import Header from "./components/Header";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

function App() {
  return (
    <Fragment>
      <Header />
      <Home />
      <ToastContainer limit={100000} />
    </Fragment>
  );
}

export default App;
