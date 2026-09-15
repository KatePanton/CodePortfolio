import type { BriefProjectDetail } from '../types'

const detail: BriefProjectDetail = {
  media: {
    kind: 'screenshots',
    screenshots: [
      {
        src: '/projects/button-pill-styling/button-pill-variations.png',
        alt: 'Grid of button and pill variants across every colour and style treatment',
        caption: 'Every solid/tonal/outline/ghost treatment across the full colour set, generated from the same two components',
      },
    ],
  },
  snippets: [
    {
      label: 'Colour-variant style maps',
      language: 'tsx',
      talkThrough:
        "Eight style dictionaries, each typed `Record<Colors, string>`, one per visual treatment (solid, tonal, outline, ghost, hover, pastel background, plain background, border). Every dictionary maps a colour name straight to the Tailwind utility classes for that treatment, pulling from the same named colour tokens (`brand-text`, `brand-solid-background`, etc.) defined in the theming set-up. `Button` and `Pill` don't contain any colour logic themselves — they just pick a dictionary based on the `variant` prop and index into it with the `color` prop.",
      code: `export const solidStyles = {
  brand: "bg-brand-solid-background text-brand-solid-text",
  secondary: "bg-secondary-solid-background text-secondary-solid-text",
  neutral: "bg-neutral-solid-background text-neutral-solid-text",
  black: "bg-black-solid-background text-black-solid-text",
  blue: "bg-blue-solid-background text-blue-solid-text",
  cyan: "bg-cyan-solid-background text-cyan-solid-text",
  "dark-green": "bg-dark-green-solid-background text-dark-green-solid-text",
  "light-green": "bg-light-green-solid-background text-light-green-solid-text",
  magenta: "bg-magenta-solid-background text-magenta-solid-text",
  orange: "bg-orange-solid-background text-orange-solid-text",
  pink: "bg-pink-solid-background text-pink-solid-text",
  purple: "bg-purple-solid-background text-purple-solid-text",
  red: "bg-red-solid-background text-red-solid-text",
  teal: "bg-teal-solid-background text-teal-solid-text",
  violet: "bg-violet-solid-background text-violet-solid-text",
  yellow: "bg-yellow-solid-background text-yellow-solid-text",
};

export const tonalStyles = {
  brand: "bg-brand-background text-brand-text",
  secondary: "bg-secondary-background text-secondary-text",
  neutral: "bg-neutral-background text-neutral-text",
  black: "bg-black-background text-black-text",
  blue: "bg-blue-background text-blue-text",
  cyan: "bg-cyan-background text-cyan-text",
  "dark-green": "bg-dark-green-background text-dark-green-text",
  "light-green": "bg-light-green-background text-light-green-text",
  magenta: "bg-magenta-background text-magenta-text",
  orange: "bg-orange-background text-orange-text",
  pink: "bg-pink-background text-pink-text",
  purple: "bg-purple-background text-purple-text",
  red: "bg-red-background text-red-text",
  teal: "bg-teal-background text-teal-text",
  violet: "bg-violet-background text-violet-text",
  yellow: "bg-yellow-background text-yellow-text",
};

export const outlineStyles = {
  brand: "bg-transparent text-brand-text border-2 border-brand-text",
  secondary:
    "bg-transparent text-secondary-text border-2 border-secondary-text",
  neutral: "bg-transparent text-neutral-text border-2 border-neutral-hover",
  black: "bg-transparent text-black-text border-2 border-black-text",
  blue: "bg-transparent text-blue-text border-2 border-blue-text",
  cyan: "bg-transparent text-cyan-text border-2 border-cyan-text",
  "dark-green":
    "bg-transparent text-dark-green-text border-2 border-dark-green-text",
  "light-green":
    "bg-transparent text-light-green-text border-2 border-light-green-text",
  magenta: "bg-transparent text-magenta-text border-2 border-magenta-text",
  orange: "bg-transparent text-orange-text border-2 border-orange-text",
  pink: "bg-transparent text-pink-text border-2 border-pink-text",
  purple: "bg-transparent text-purple-text border-2 border-purple-text",
  red: "bg-transparent text-red-text border-2 border-red-text",
  teal: "bg-transparent text-teal-text border-2 border-teal-text",
  violet: "bg-transparent text-violet-text border-2 border-violet-text",
  yellow: "bg-transparent text-yellow-text border-2 border-yellow-text",
};

export const ghostStyles = {
  brand: "bg-transparent text-brand-text",
  secondary: "bg-transparent text-secondary-text",
  neutral: "bg-transparent text-neutral-text",
  black: "bg-transparent text-black-text",
  blue: "bg-transparent text-blue-text",
  cyan: "bg-transparent text-cyan-text",
  "dark-green": "bg-transparent text-dark-green-text",
  "light-green": "bg-transparent text-light-green-text",
  magenta: "bg-transparent text-magenta-text",
  orange: "bg-transparent text-orange-text",
  pink: "bg-transparent text-pink-text",
  purple: "bg-transparent text-purple-text",
  red: "bg-transparent text-red-text",
  teal: "bg-transparent text-teal-text",
  violet: "bg-transparent text-violet-text",
  yellow: "bg-transparent text-yellow-text",
};

export const hoverStyles = {
  brand: "hover:text-brand-text hover:bg-brand-hover",
  secondary: "hover:text-secondary-text hover:bg-secondary-hover",
  neutral: "hover:text-neutral-text hover:bg-neutral-hover",
  black: "hover:text-black-text hover:bg-black-hover",
  blue: "hover:text-blue-text hover:bg-blue-hover",
  cyan: "hover:text-cyan-text hover:bg-cyan-hover",
  "dark-green": "hover:text-dark-green-text hover:bg-dark-green-hover",
  "light-green": "hover:text-light-green-text hover:bg-light-green-hover",
  magenta: "hover:text-magenta-text hover:bg-magenta-hover",
  orange: "hover:text-orange-text hover:bg-orange-hover",
  pink: "hover:text-pink-text hover:bg-pink-hover",
  purple: "hover:text-purple-text hover:bg-purple-hover",
  red: "hover:text-red-text hover:bg-red-hover",
  teal: "hover:text-teal-text hover:bg-teal-hover",
  violet: "hover:text-violet-text hover:bg-violet-hover",
  yellow: "hover:text-yellow-text hover:bg-yellow-hover",
};

export const pastelBackgroundStyles = {
  brand:
    "bg-brand-background-pastel text-brand-text border-1 border-brand-background-pastel",
  secondary:
    "bg-secondary-background-pastel text-secondary-text border-1 border-secondary-background-pastel",
  neutral:
    "bg-neutral-background-pastel text-neutral-text border-1 border-neutral-background-pastel",
  black:
    "bg-black-background-pastel text-black-text border-1 border-black-background-pastel",
  blue: "bg-blue-background-pastel text-blue-text border-1 border-blue-background-pastel",
  cyan: "bg-cyan-background-pastel text-cyan-text border-1 border-cyan-background-pastel",
  "dark-green":
    "bg-dark-green-background-pastel text-dark-green-text border-1 border-dark-green-background-pastel",
  "light-green":
    "bg-light-green-background-pastel text-light-green-text border-1 border-light-green-background-pastel",
  magenta:
    "bg-magenta-background-pastel text-magenta-text border-1 border-magenta-background-pastel",
  orange:
    "bg-orange-background-pastel text-orange-text border-1 border-orange-background-pastel",
  pink: "bg-pink-background-pastel text-pink-text border-1 border-pink-background-pastel",
  purple:
    "bg-purple-background-pastel text-purple-text border-1 border-purple-background-pastel",
  red: "bg-red-background-pastel text-red-text border-1 border-red-background-pastel",
  teal: "bg-teal-background-pastel text-teal-text border-1 border-teal-background-pastel",
  violet:
    "bg-violet-background-pastel text-violet-text border-1 border-violet-background-pastel",
  yellow:
    "bg-yellow-background-pastel text-yellow-text border-1 border-yellow-background-pastel",
};

export const plainBackgroundStyles = {
  brand: "text-brand-text border-1 bg-white border-border-subtle",
  secondary: "text-secondary-text border-1 bg-white border-border-subtle",
  neutral: "text-neutral-text border-1 bg-white border-border-subtle",
  black: "text-black-text border-1 bg-white border-border-subtle",
  blue: "text-blue-text border-1 bg-white border-border-subtle",
  cyan: "text-cyan-text border-1 bg-white border-border-subtle",
  "dark-green": "text-dark-green-text border-1 bg-white border-border-subtle",
  "light-green": "text-light-green-text border-1 bg-white border-border-subtle",
  magenta: "text-magenta-text border-1 bg-white border-border-subtle",
  orange: "text-orange-text border-1 bg-white border-border-subtle",
  pink: "text-pink-text border-1 bg-white border-border-subtle",
  purple: "text-purple-text border-1 bg-white border-border-subtle",
  red: "text-red-text border-1 bg-white border-border-subtle",
  teal: "text-teal-text border-1 bg-white border-border-subtle",
  violet: "text-violet-text border-1 bg-white border-border-subtle",
  yellow: "text-yellow-text border-1 bg-white border-border-subtle",
};

export const borderStyles = {
  brand: "border-brand-solid-background",
  secondary: "border-secondary-solid-background",
  neutral: "border-neutral-solid-background",
  black: "border-black-solid-background",
  blue: "border-blue-solid-background",
  cyan: "border-cyan-solid-background",
  "dark-green": "border-dark-green-solid-background",
  "light-green": "border-light-green-solid-background",
  magenta: "border-magenta-solid-background",
  orange: "border-orange-solid-background",
  pink: "border-pink-solid-background",
  purple: "border-purple-solid-background",
  red: "border-red-solid-background",
  teal: "border-teal-solid-background",
  violet: "border-violet-solid-background",
  yellow: "border-yellow-solid-background",
};
`,
    },
    {
      label: 'Button',
      language: 'tsx',
      talkThrough:
        'One `Button` replacing what had been several visually different but functionally identical button components. `dynamicColorVariantStyles` maps each `variant` to the matching style dictionary, so rendering just becomes `dynamicColorVariantStyles[variant](color)` — the same component produces a solid brand button, an outline red button, or a ghost neutral button purely from two props, with `tailwind-merge` resolving any class conflicts between the size, variant, and state styles.',
      code: `import { twMerge } from "tailwind-merge";
import {
  solidStyles,
  tonalStyles,
  outlineStyles,
  ghostStyles,
  hoverStyles,
} from "@CssColors/color-variants.styles";
import { Colors } from "@CssColors/colors.type";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type ButtonProps = React.ComponentProps<"button"> & {
  children?: React.ReactNode;
  iconLeft?: IconDefinition;
  iconRight?: IconDefinition;
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
  variant?: "solid" | "tonal" | "outline" | "ghost";
  color?: Colors;
  disabled?: boolean;
  focused?: boolean;
  onClick?: () => void;
};

const baseStyles =
  "font-semibold cursor-pointer inline-flex items-center justify-center gap-3 ";

const disabledStyles =
  "bg-tag-background-disabled text-disabled-text pointer-events-none";

const sizeStyles: Record<ButtonProps["size"], string> = {
  small: "rounded-sm py-4 px-6",
  medium: "rounded-md py-6 px-8",
  large: "rounded-lg p-8",
};

const dynamicColorVariantStyles: Record<
  NonNullable<ButtonProps["variant"]>,
  (color: Colors) => string
> = {
  solid: (color) => solidStyles[color],
  tonal: (color) => tonalStyles[color],
  outline: (color) => outlineStyles[color],
  ghost: (color) => ghostStyles[color],
};

const Button: React.FC<ButtonProps> = ({
  children,
  iconLeft,
  iconRight,
  size = "medium",
  fullWidth,
  variant = "solid",
  color = "brand",
  disabled = false,
  focused,
  onClick,
}) => {
  const buttonClasses = twMerge(
    \` \${baseStyles}
      \${sizeStyles[size]}
      \${disabled ? disabledStyles : dynamicColorVariantStyles[variant](color)}
      \${focused ? "border-border-focus border-4" : ""}
      hover:cursor-pointer \${hoverStyles[color]}
      \${fullWidth ? "w-full" : ""}
     \`
  );

  return (
    <button className={buttonClasses} disabled={disabled} onClick={onClick}>
      <div className="flex flex-row gap-4">
        {iconLeft && (
          <span className="flex items-center">
            <FontAwesomeIcon icon={iconLeft} />
          </span>
        )}
        {children && (
          <span className="flex flex-1 items-center justify-center">
            {children}
          </span>
        )}
        {iconRight && (
          <span className="flex items-center">
            <FontAwesomeIcon icon={iconRight} />
          </span>
        )}
      </div>
    </button>
  );
};

export default Button;
`,
    },
    {
      label: 'Pill',
      language: 'tsx',
      talkThrough:
        "Same pattern as `Button`, restricted to the three variants that make sense for a compact tag/status pill (solid, tonal, outline — no ghost, since a pill without any fill or border reads as plain text). Reusing `dynamicColorVariantStyles` and the same colour dictionaries means adding a colour once, in the theming set-up, is enough for it to show up correctly in both components without touching either one.",
      code: `import { twMerge } from "tailwind-merge";
import {
  solidStyles,
  tonalStyles,
  outlineStyles,
} from "@CssColors/color-variants.styles";
import { Colors } from "@CssColors/colors.type";

type PillProps = React.ComponentProps<"span"> & {
  text?: string;
  children?: React.ReactNode;
  size?: "large" | "medium" | "small" | "xsmall";
  variant: "solid" | "tonal" | "outline";
  color?: Colors;
  disabled?: boolean;
  focused?: boolean;
};

const disabledStyles =
  "bg-tag-background-disabled text-disabled-text pointer-events-none";

const sizeStyles: Record<PillProps["size"], string> = {
  xsmall: "px-4 py-2 text-sm min-w-[60px]",
  small: "px-4 py-4 text-sm min-w-[70px]",
  medium: "px-6 py-6 text-base min-w-[70px]",
  large: "px-8 py-8 text-base min-w-[80px]",
};

const dynamicColorVariantStyles: Record<
  NonNullable<PillProps["variant"]>,
  (color: Colors) => string
> = {
  solid: (color) => solidStyles[color],
  tonal: (color) => tonalStyles[color],
  outline: (color) => outlineStyles[color],
};

const Pill: React.FC<PillProps> = ({
  text,
  children,
  size = "medium",
  variant = "solid",
  color = "brand",
  disabled = false,
  focused = false,
}) => {
  const pillClasses = twMerge(
    \`tag flex w-fit items-center rounded-4xl font-bold text-center justify-center
      \${sizeStyles[size]}
      \${disabled ? disabledStyles : dynamicColorVariantStyles[variant](color)}
      \${focused ? "border-border-focus border-4" : ""}
    \`
  );

  return <span className={pillClasses}>{children ? children : text}</span>;
};

export default Pill;
`,
    },
  ],
}

export default detail
