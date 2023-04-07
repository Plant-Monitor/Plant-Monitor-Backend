import Expo from 'expo-server-sdk';
import { Model } from 'mongoose';
import { PushTokenRegistrationDocument } from 'src/models/push/schemas/pushTokenRegistration.schema';

// export const sendNotification = async (
//   expo: Expo,
//   title: string,
//   token: string,
//   body: string,
//   data: Object,
// ) => {
//   const message = {
//     to: token,
//     body: body,
//     data: data,
//   };
//
//   const chunks = expo.chunkPushNotifications([message]);
//   for (const chunk of chunks) {
//     try {
//       await expo.sendPushNotificationsAsync(chunk);
//     } catch (error) {
//       console.error(error);
//     }
//   }
// };

const SEND_NOTIF_URL = "https://exp.host/--/api/v2/push/send"
const GET_RECEIPT_URL = "https://exp.host/--/api/v2/push/getReceipts"

export const sendNotification = async (
  expo: Expo,
  title: string,
  token: string,
  body: string,
  data: Object,
) => {
  const message = {
    to: token,
    title: title,
    body: body,
    data: data,
  };

  // Trigger push notification
  const ticketResp = await fetch(SEND_NOTIF_URL, {
    method: 'POST',
    body: JSON.stringify(message),
    headers: { 'Content-type': 'application/json' },
  });
  const ticketRespBody = await ticketResp.json();

  // Get push notification receipt
  await fetch(GET_RECEIPT_URL, {
    method: 'POST',
    body: JSON.stringify({ ids: [ticketRespBody?.data.id] }),
    headers: { 'Content-type': 'application/json' },
  });
};

export const getPushToken = async (
  user_id: string,
  model: Model<PushTokenRegistrationDocument>,
): Promise<string | null> => {
  const tokenRegistrationDoc = await model
    .findOne(
      {
        user_id: user_id,
      },
      'token',
    )
    .exec();

  if (tokenRegistrationDoc == null) {
    return null;
  }

  return tokenRegistrationDoc.token;
};
