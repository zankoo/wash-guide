import { defineConfig } from "vite";
import vinext from "vinext";
import { cloudflare } from "@cloudflare/vite-plugin";
import { staticAssetsAdapter } from "@vinext/cloudflare/cache/static-assets-adapter";

export default defineConfig({
  plugins: [
    vinext({
      react: { compiler: true },
      cache: { cdn: staticAssetsAdapter() },
      prerender: { routes: "*" },
    }),
    cloudflare({
      remoteBindings: false,
      persistState: process.env.WASH_LOCAL_STATE ? { path: process.env.WASH_LOCAL_STATE } : true,
      viteEnvironment: {
        name: "rsc",
        childEnvironments: ["ssr"],
      },
    }),
  ],
});
