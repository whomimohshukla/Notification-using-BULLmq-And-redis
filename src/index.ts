import express from "express";
// import { sendNotification } from ".
// /producer/notification.producer";

import { sendNotification } from "./producer/notification.producer";

// import { sendNotification } from "./producer/notification.producer";
// import { sendNotification } from "./producer/notification.producer.js";
const app = express();
app.use(express.json());

app.post("/signup", async (req, res) => {
	const { email, phone, name } = req.body;

	await sendNotification({
		type: "EMAIL",
		to: email,
		subject: "Welcome 🎉",
		html: `<h1>Hello ${name}</h1><p>Welcome to our app!</p>`,
	});

	await sendNotification({
		type: "WHATSAPP",
		to: phone,
		body: `Hi ${name}, welcome to our platform 🚀`,
	});

	res.json({ message: "Signup successful" });
});

app.listen(3000, () => console.log("🚀 Server running"));
