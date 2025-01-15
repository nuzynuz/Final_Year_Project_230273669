import { useEffect } from "react";
import * as Notifications from "expo-notifications";

import expoPushTokensApi from "../api/expoPushTokens";

export default useNotifications = (notificationListner) => {
  useEffect(() => {
    registerForPushNotifications();

    // Notifications.addListener((notifiation) => {
    if (notificationListner)
      Notifications.addNotificationReceivedListener(notificationListner);
  }, []);

  const registerForPushNotifications = async () => {
    try {
      // const permission = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      const permission = await Notifications.getPermissionsAsync();
      if (!permission.granted) return;

      const token = await Notifications.getExpoPushTokenAsync();
      expoPushTokensApi.register(token);
      console.log(token);
    } catch (error) {
      console.log("error getting a push token.", error);
    }
  };
};
