/// <reference types="vitest" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
	// our main vite setup does not work, here
	plugins: [react()],
	test: {
		globals: true,
		environment: "jsdom",
		css: false,
	},
});
