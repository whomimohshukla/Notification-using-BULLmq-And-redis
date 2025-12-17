# 📬 Notification Service (BullMQ + Redis + TypeScript)

A scalable background notification system built using Node.js, TypeScript, BullMQ, Redis, Nodemailer (Email), and Twilio WhatsApp.

---

## 🚀 Features

- Background job processing using BullMQ
- Redis-backed queues
- Email notifications (Nodemailer)
- WhatsApp notifications (Twilio)
- Automatic retries with exponential backoff
- Dead Letter Queue (DLQ) for failed jobs
- Fully written in TypeScript
- Scalable worker concurrency

---

## 🧠 Architecture

Client / API  
→ Producer (add job)  
→ Redis (queue storage)  
→ Worker (process job)  
→ Email / WhatsApp  
→ Failure → Retry → DLQ  

---

## 📁 Project Structure

