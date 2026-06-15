import {
  useDesignSystem,
  DSColors,
  DS_TOKEN_KEYS,
} from "./DesignSystemContext";

/* ─── Design System Colors (Hi-Fi) ─── */
/* DS is a live mutable object synced by DesignSystemContext.
   Components that import DS and render inline styles will see
   updated values after the context triggers a re-render. */
const DS: DSColors & {
  radius: string;
  radiusSm: string;
  radiusLg: string;
  shadow: string;
  shadowMd: string;
} = {
  primary: "#6750A4",
  onPrimary: "#FFFFFF",
  primaryContainer: "#EADDFF",
  onPrimaryContainer: "#4F378B",
  secondary: "#625B71",
  onSecondary: "#FFFFFF",
  secondaryContainer: "#E8DEF8",
  onSecondaryContainer: "#4A4458",
  tertiary: "#7D5260",
  onTertiary: "#FFFFFF",
  tertiaryContainer: "#FFD8E4",
  onTertiaryContainer: "#633B48",
  success: "#1B873B",
  onSuccess: "#FFFFFF",
  successContainer: "#D4F5DC",
  onSuccessContainer: "#0D5E26",
  error: "#B3261E",
  onError: "#FFFFFF",
  errorContainer: "#F9DEDC",
  onErrorContainer: "#8C1D18",
  surface: "#FEF7FF",
  onSurface: "#1D1B20",
  surfaceVariant: "#E7E0EC",
  onSurfaceVariant: "#49454F",
  surfaceContainerHighest: "#E6E0E9",
  surfaceContainerHigh: "#ECE6F0",
  surfaceContainer: "#F3EDF7",
  surfaceContainerLow: "#F7F2FA",
  surfaceContainerLowest: "#FFFFFF",
  inverseSurface: "#322F35",
  inverseOnSurface: "#F5EFF7",
  surfaceTint: "#6750A4",
  surfaceTintColor: "#6750A4",
  outline: "#79747E",
  outlineVariant: "#CAC4D0",
  // Non-color tokens (not editable via color picker)
  radius: "12px",
  radiusSm: "8px",
  radiusLg: "16px",
  shadow: "0 2px 8px rgba(0,0,0,0.08)",
  shadowMd: "0 4px 16px rgba(0,0,0,0.12)",
};

/* Hook that syncs the DS object with context values and forces re-render */
export function useDSSync() {
  const { colors } = useDesignSystem();
  // Mutate the DS object so all references see updated values
  for (const key of DS_TOKEN_KEYS) {
    (DS as any)[key] = colors[key];
  }
  // Recompute shadows from primary
  DS.shadow = `0 2px 8px rgba(0,0,0,0.08)`;
  DS.shadowMd = `0 4px 16px rgba(0,0,0,0.12)`;
  return colors;
}

export { DS };
