import "dotenv/config";
import { defineConfig } from "@playwright/test";

// Read credentials from env (recommended; do NOT hardcode secrets)
const LT_USERNAME = process.env.LT_USERNAME ?? "BhoomiD";
const LT_ACCESS_KEY =
  process.env.LT_ACCESS_KEY ??
  "LT_eVpyNm8U4hxuD8VUUt2gBakPXWMP8oLqERNX2B6K5uwJe9X";

// LambdaTest Grid options — enable all artifacts (Instruction #6)
const ltOptionsBase = {
  user: LT_USERNAME,
  accessKey: LT_ACCESS_KEY,
  build: "Playwright LambdaTest Build",
  project: "LambdaTest Certification",
  name: "Input Form Submit",
  platform: "Windows 11",

  // === Artifacts & logs enabled via LT:Options ===
  network: true, // network logs
  video: true, // LT grid-side video recording
  console: true, // console logs
  visual: true, // screenshots on LT side
  // ===============================================
};

// Capabilities for each cloud browser (use correct LT names)
const cloudCaps = (browserName: "chrome" | "pw-firefox" | "pw-webkit") => ({
  browserName,
  browserVersion: "latest",
  "LT:Options": {
    ...ltOptionsBase,
    tags: ["certification", "playwright", "hyperexecute"],
  },
});

// Build wsEndpoint for LambdaTest CDP connect
const wsEndpointForCaps = (caps: any) =>
  `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(
    JSON.stringify(caps)
  )}`;

const useLT = !!(process.env.LT_USERNAME && process.env.LT_ACCESS_KEY);

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  timeout: useLT ? 120_000 : 60_000,
  workers: useLT ? 1 : 4,
  retries: useLT ? 1 : 0,

  reporter: [
    ["list"],
    ["html", { outputFolder: "playwright-report", open: "never" }],
  ],

  // Global defaults
  use: {
    baseURL: "https://www.lambdatest.com/selenium-playground",
    headless: true,

    // Playwright artifacts on our side
    trace: "retain-on-failure",
    screenshot: "only-on-failure",

    // IMPORTANT: disable Playwright's own video for cloud runs (avoid ffmpeg error).
    // LT grid video is already enabled via LT:Options.video = true.
    video: "off",

    actionTimeout: 10_000,
    navigationTimeout: 30_000,
  },

  projects: [
    // ---- Cloud: Chrome (Chromium) ----
    {
      name: "cloud-chromium",
      use: {
        connectOptions: {
          wsEndpoint: wsEndpointForCaps(cloudCaps("chrome")),
        },
      },
    },
  ],
});
