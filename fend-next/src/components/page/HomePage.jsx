import HomeHero from "../HomeHero";
import Logos from "../Logos";

import { config } from "../../utils/constants";

const HomePage = () => (
  <>
    <HomeHero />
   {config.settings.logos && <Logos />}

    <div className="mb-[50px]"></div>
  </>
);

export default HomePage;
