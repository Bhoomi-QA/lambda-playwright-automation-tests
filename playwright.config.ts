// // playwright.config.ts
// import { defineConfig } from "@playwright/test";

// const username = process.env.LT_USERNAME || "";
// const accessKey = process.env.LT_ACCESS_KEY || "";

// console.log(process.env.LT_USERNAME, process.env.LT_ACCESS_KEY);

// const capabilities = {
//   browserName: "Chrome", // Chrome | MicrosoftEdge
//   browserVersion: "latest", // or a specific version
//   "LT:Options": {
//     platform: "Windows 11", // e.g., 'macOS Ventura', 'Windows 10'
//     build: "PW-LT Local Run", // visible group name on the dashboard
//     name: "Sample Playwright test",
//     user: username,
//     accessKey: accessKey,
//     network: true,
//     video: true,
//     console: true,
//   },
// };

// // IMPORTANT: always encode the JSON for the ws URL
// const wsEndpoint = `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(
//   JSON.stringify(capabilities)
// )}`;

// export default defineConfig({
//   testDir: "./tests",
//   timeout: 60_000,
//   use: {
//     // Tell Playwright Test to connect to LT instead of launching locally
//     connectOptions: { wsEndpoint },
//     trace: "retain-on-failure",
//     video: "retain-on-failure",
//     screenshot: "only-on-failure",
//     baseURL: "https://www.lambdatest.com/selenium-playground",
//   },
//   // you can add more projects later if you want parallel cross-browser
// });

import "dotenv/config";
import { defineConfig } from "@playwright/test";

const capabilities = {
  browserName: "Chrome",
  browserVersion: "latest",
  "LT:Options": {
    user: "BhoomiD",
    accessKey: "LT_eVpyNm8U4hxuD8VUUt2gBakPXWMP8oLqERNX2B6K5uwJe9X",
    platform: "Windows 11",
    build: "Playwright LambdaTest Build",
    name: "Sample Test",
    network: true,
    video: true,
    console: true,
  },
};
const defaultUse: any = {
  headless: false,
  trace: "retain-on-failure",
  video: "retain-on-failure",
  screenshot: "only-on-failure",
  baseURL: "https://www.lambdatest.com/selenium-playground",
};

const wsEndpoint = `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(
  JSON.stringify(capabilities)
)}`;

export default defineConfig({
  use: {
    connectOptions: {
      wsEndpoint: wsEndpoint,
    },
  },
});
