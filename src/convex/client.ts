import { ConvexReactClient } from "convex/react";
import Constants from "expo-constants";

// For Expo, environment variables need to be prefixed with EXPO_PUBLIC_
// Access environment variables safely for React Native/Expo
declare const process: { env: Record<string, string | undefined> } | undefined;
declare const global: { [key: string]: any } | undefined;

const getEnvVar = (name: string): string | undefined => {
  // First try process.env (works for EAS builds and web/development)
  // EAS builds inject env vars from eas.json into process.env
  if (typeof process !== 'undefined' && process.env) {
    const envValue = process.env[name];
    if (envValue) return envValue;
  }
  
  // Try expo-constants (works for local native builds via app.json extra)
  if (typeof Constants !== 'undefined' && Constants.expoConfig?.extra) {
    const value = Constants.expoConfig.extra[name];
    if (value) return value as string;
  }
  
  // Try global (fallback)
  if (typeof global !== 'undefined' && global[name]) {
    return global[name];
  }
  
  return undefined;
};

const convexUrl = getEnvVar('EXPO_PUBLIC_CONVEX_URL');

if (!convexUrl || convexUrl === "<REPLACE_WITH_CONVEX_URL>") {
  throw new Error(
    "Missing CONVEX_URL environment variable. " +
    "Please set EXPO_PUBLIC_CONVEX_URL in your .env file or environment variables. " +
    "You can get your Convex URL by running 'npx convex dev' or from your Convex dashboard."
  );
}

export const client = new ConvexReactClient(convexUrl);
export default client;
