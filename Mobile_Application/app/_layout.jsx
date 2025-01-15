import { Slot } from "expo-router";
import { SessionProvider } from "../authContext/ctx";

// Ref: https://docs.expo.dev/router/reference/authentication/

export default function RootLayout() {
  return (
    <SessionProvider>
      <Slot />
    </SessionProvider>
  );
}
