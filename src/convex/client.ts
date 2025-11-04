import { ConvexReactClient } from "convex/react";

// For Expo, environment variables need to be prefixed with EXPO_PUBLIC_
// Access environment variables safely for React Native/Expo
declare const process: { env: Record<string, string | undefined> } | undefined;
declare const global: { [key: string]: any } | undefined;

const getEnvVar = (name: string): string | undefined => {
  if (typeof process !== 'undefined' && process.env) {
    return process.env[name];
  }
  if (typeof global !== 'undefined' && global[name]) {
    return global[name];
  }
  return undefined;
};

const convexUrl = 
  getEnvVar('EXPO_PUBLIC_CONVEX_URL') || 
  getEnvVar('CONVEX_URL') || 
  (typeof global !== 'undefined' ? global['CONVEX_URL'] : undefined);

if (!convexUrl || convexUrl === "<REPLACE_WITH_CONVEX_URL>") {
  throw new Error(
    "Missing CONVEX_URL environment variable. " +
    "Please set EXPO_PUBLIC_CONVEX_URL in your .env file or environment variables. " +
    "You can get your Convex URL by running 'npx convex dev' or from your Convex dashboard."
  );
}

export const client = new ConvexReactClient(convexUrl);
export default client;
