import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const MainRoute = () => {
  return (
    <div>
      <Navbar />
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default MainRoute;
