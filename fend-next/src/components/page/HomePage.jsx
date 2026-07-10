import HomeHero from "../HomeHero";
import Logos from "../Logos";
import Research from "../Research";
import Experience from "../Experience";
import Contact from "../Contact";

import { config } from "../../utils/constants";

const HomePage = () => (
  <>
    <HomeHero />
   {config.settings.logos && <Logos />}
   {config.settings.research && <Research />}
   {config.settings.experience && <Experience />}
   <Contact />

    <div className="mb-[50px]"></div>
  </>
);

export default HomePage;
