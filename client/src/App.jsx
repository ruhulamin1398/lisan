 
import { Outlet } from "react-router-dom";
import { Navbar, Welcome, Footer, Services, Transactions, Hero } from "./components";
import Research from "./components/Research";

const App = () =>{






  return (
    <>
     
    <div className="min-h-screen gradient-bg-welcome">
      <div className="gradient-bg-welcome">
        <Navbar /> 
     
    <Outlet/>
    </div>
       
      <Footer />
    </div> 
    </>
  );
} 

export default App;
