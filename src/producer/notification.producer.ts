// import { notificationQueue } from "../queues/notification.queue.js";
import { notificationQueue } from "../queue/notification.queue";
type EmailPayload = {
	type: "EMAIL";
	to: string;
	subject: string;
	html: string;
};

type whatsappPayLoad = {
	type: "WHATSAPP";
	to: string;
	body: string;
};

export async function sendNotification(
	payload: EmailPayload | whatsappPayLoad
) {
	await notificationQueue.add("sendNotification", payload);
}
