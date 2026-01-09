/**
 * Feature flags configuration
 * Use these flags to enable/disable features without removing code
 * 
 * To enable accessories:
 * 1. Set ACCESSORIES_ENABLED to true
 * 2. The navigation link will appear in the menu
 * 3. The /accessoires route will be accessible
 */

export const FEATURES = {
  // Set to true when accessories are ready to be displayed
  ACCESSORIES_ENABLED: false,
} as const;

