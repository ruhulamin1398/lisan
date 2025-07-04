import { configRuhulDev } from "./ruhul-dev";
import { configRuhulDevBlockchain } from "./ruhul-dev-blockcahin";
import { configRuhulScholarship } from "./ruhul-scholarship";

let config;
const environment = import.meta.env.VITE_ENV;

if (environment === "ruhul-dev") {
  config = configRuhulDev;
} else if (environment === "ruhul-scholarship") {
  config = configRuhulScholarship;
} else if (environment === "ruhul-blockchain") {
  config = configRuhulDevBlockchain;
}

export { config };

export const DEEP_DARK_COLOR = "#2a303d";
export const LIGHT_DARK_COLOR = "#323a49";

export const API_URL = import.meta.env.VITE_API_URL;
export const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;
export const APP_URL = import.meta.env.VITE_APP_URL;
