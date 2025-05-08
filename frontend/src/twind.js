// frontend/src/twind.js
import { setup } from "@twind/core";
import presetTailwind from "@twind/preset-tailwind";

export const twind = setup({
  presets: [presetTailwind()],
  theme: {
    extend: {
      spacing: {
        15: "3.75rem", // 60px
        30: "7.5rem",  // 120px
      },
      width: {
        30: "7.5rem",  // 120px
      },
    },
  },
});
