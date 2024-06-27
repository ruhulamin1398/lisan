import { Navbar, Welcome, Footer, Services, Transactions, Hero } from "./components";

const App = () => (
  <div className="min-h-screen">
    <div className="gradient-bg-welcome">
      <Navbar />
      <Hero />
    </div>

    {/* <Welcome /> */}
    {/* <Services /> */}
    {/* <Transactions /> */}
    <Footer />
  </div>
);

export default App;
