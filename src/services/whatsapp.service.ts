import twilio from "twilio";

const client = twilio(process.env.TWILIO_SID!, process.env.TWILIO_AUTH_TOKEN!);

export async function sendWhatsApp(to: string, message: string) {
	await client.messages.create({
		from: "whatsapp:+14155238886", // Twilio sandbox
		to: `whatsapp:${to}`,
		body: message,
	});

	console.log(`📱 WhatsApp sent to ${to}`);
}
