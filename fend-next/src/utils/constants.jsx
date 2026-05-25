import { configRuhulDev } from "./ruhul-dev";
import { configRuhulDevBlockchain } from "./ruhul-dev-blockcahin";
import { configRuhulScholarship } from "./ruhul-scholarship";
import { configLisan } from "./lisan";

let config;
const environment = process.env.NEXT_PUBLIC_ENV;

if (environment === "ruhul-dev") {
  config = configRuhulDev;
} else if (environment === "ruhul-scholarship") {
  config = configRuhulScholarship;
} else if (environment === "ruhul-blockchain") {
  config = configRuhulDevBlockchain;
} else {
  // Default fallback to ruhul-dev config if environment is not set or doesn't match
  config = configLisan;
}

export { config };

export const DEEP_DARK_COLOR = "#2a303d";
export const LIGHT_DARK_COLOR = "#323a49";

export const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL;
