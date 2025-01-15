import { Redirect } from "expo-router";
import { useSession } from "../../authContext/ctx";

export default function Index() {
  const { session, signOut } = useSession();
  // signOut();
  const user = JSON.parse(session);
  switch (user.role) {
    case "collecting-agent":
      // router.navigate("/c-agent");
      return <Redirect href="/c-agent" />;
    case "verification-agent":
      return <Redirect href="/v-agent" />;
    case "farmer":
      return <Redirect href="/farmer" />;
    default:
      return <Redirect href="/welcome" />;
  }
}
