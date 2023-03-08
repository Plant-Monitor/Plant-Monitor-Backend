import Expo from "expo-server-sdk";
import { Model } from "mongoose";
import { PushTokenRegistrationDocument } from "src/models/push/schemas/pushTokenRegistration.schema";


export const sendNotification = async (
    expo: Expo,
    token: string,
    body: string,
    data: Object,
) => {
    const message = {
        to: token,
        body: body,
        data: data
    };
    
    const chunks = expo.chunkPushNotifications([message]);
    await expo.sendPushNotificationsAsync(chunks[0]);
}

export const getPushToken = async (
    user_id: string,
    model: Model<PushTokenRegistrationDocument>
) : Promise<string | null> => {
    const tokenRegistrationDoc = await model.findOne({
        user_id: user_id,
    }, 'token').exec();

    if (tokenRegistrationDoc == null) {
        return null;
    }

    return tokenRegistrationDoc.token;
}