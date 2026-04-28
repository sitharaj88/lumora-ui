import plugin from "tailwindcss/plugin";
import {
  type LumoraTheme,
  defaultThemeName,
  lumoraThemes,
  tokensToCssVariables
} from "@lumora-ui/themes";
import { lumoraComponents } from "./components";

export {
  lumoraAccessibilityGuidelines,
  lumoraAccessibilityTarget,
  lumoraKeyboardPatterns
} from "./accessibility";
export type { LumoraAccessibilityGuideline } from "./accessibility";
export { lumoraComponents } from "./components";
export {
  defaultThemeName,
  getLumoraTheme,
  lumoraThemes,
  requiredThemeTokens,
  tokensToCssVariables
} from "@lumora-ui/themes";
export type { LumoraTheme, LumoraThemeMode, LumoraThemeToken } from "@lumora-ui/themes";

export type LumoraDensity = "compact" | "comfortable" | "spacious";

export type LumoraCoreOptions = {
  themes?: LumoraTheme[];
  defaultTheme?: string;
  defaultDensity?: LumoraDensity;
};

const densityValues: Record<LumoraDensity, string> = {
  compact: "0.88",
  comfortable: "1",
  spacious: "1.14"
};

const keyframes = {
  "@keyframes lm-spin": {
    to: { transform: "rotate(360deg)" }
  },
  "@keyframes lm-pulse": {
    "0%, 100%": { opacity: "1" },
    "50%": { opacity: "0.45" }
  },
  "@keyframes lm-fade": {
    from: { opacity: "0" },
    to: { opacity: "1" }
  },
  "@keyframes lm-pop": {
    from: { opacity: "0", transform: "scale(0.96) translateY(-4px)" },
    to: { opacity: "1", transform: "scale(1) translateY(0)" }
  },
  "@keyframes lm-scale-in": {
    from: { opacity: "0", transform: "scale(0.94)" },
    to: { opacity: "1", transform: "scale(1)" }
  },
  "@keyframes lm-slide-in-right": {
    from: { opacity: "0", transform: "translateX(12px)" },
    to: { opacity: "1", transform: "translateX(0)" }
  },
  "@keyframes lm-slide-in-left": {
    from: { opacity: "0", transform: "translateX(-12px)" },
    to: { opacity: "1", transform: "translateX(0)" }
  },
  "@keyframes lm-shimmer": {
    from: { backgroundPosition: "200% 0" },
    to: { backgroundPosition: "-200% 0" }
  }
};

export function createLumoraBaseStyles(
  themes: LumoraTheme[],
  defaultTheme: string,
  defaultDensity?: LumoraDensity
) {
  const fallbackTheme = themes.find((theme) => theme.name === defaultTheme) ?? themes[0];
  const base: Record<string, Record<string, string>> = {
    ":root": {
      ...tokensToCssVariables(fallbackTheme),
      ...(defaultDensity ? { "--lm-density": densityValues[defaultDensity] } : {})
    },
    "html, body": {
      backgroundColor: "var(--lm-color-bg)",
      color: "var(--lm-color-text)"
    },
    "[data-lm-density='compact']": { "--lm-density": densityValues.compact },
    "[data-lm-density='comfortable']": { "--lm-density": densityValues.comfortable },
    "[data-lm-density='spacious']": { "--lm-density": densityValues.spacious }
  };

  for (const theme of themes) {
    base[`[data-lm-theme="${theme.name}"]`] = {
      ...tokensToCssVariables(theme),
      colorScheme: theme.mode
    };
  }

  return {
    ...keyframes,
    ...base,
    "@media (prefers-reduced-motion: reduce)": {
      "*, *::before, *::after": {
        animationDuration: "0.01ms !important",
        animationIterationCount: "1 !important",
        scrollBehavior: "auto !important",
        transitionDuration: "0.01ms !important"
      }
    }
  };
}

const lumoraPlugin: ReturnType<typeof plugin.withOptions<LumoraCoreOptions>> =
  plugin.withOptions<LumoraCoreOptions>(
    (options = {}) =>
      (api) => {
        const { addBase, addComponents } = api;
        const themes = options.themes?.length ? options.themes : lumoraThemes;
        const defaultTheme = options.defaultTheme ?? defaultThemeName;
        const defaultDensity = options.defaultDensity;

        addBase({
          ...createLumoraBaseStyles(themes, defaultTheme, defaultDensity)
        });
        addComponents(lumoraComponents);
      },
    () => ({
      theme: {
        extend: {}
      }
    })
  );

export default lumoraPlugin;
