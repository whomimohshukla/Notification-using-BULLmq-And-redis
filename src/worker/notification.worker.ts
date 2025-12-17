import {Worker } from 'bullmq';

import { dlqQueue } from '../queue/dlq.queue';

import { redis } from "../config/redis";

// import {sendEmail} from '../services/email.service.js';
import { sendEmail } from '../services/email.service.js';
import { sendWhatsApp } from '../services/whatsapp.service.js';

// import {sendWhatsAppMessage} from '../services/whatsapp.service.js';

new Worker(
    "notificationQueue",
    async (job) => {
        const data=job.data;

        if(data.type==="EMAIL"){
            await sendEmail(data.to, data.subject, data.html);
        }else if(data.type==="WHATSAPP"){
            await sendWhatsApp(data.to, data.body);
        }else{
            throw new Error("Unsupported notification type");
        }
    },
    {
        connection: redis,
        concurrency: 10,//scale up if you have more jobs
        // timeout: 5000,
    }
).on("failed", async (job, err) => {
  if (!job) {
    console.error("❌ Job is undefined in failed handler", err);
    return;
  }

  if (job.attemptsMade >= (job.opts.attempts ?? 1)) {
    await dlqQueue.add("dead-notification", {
      originalJobId: job.id,
      queue: job.queueName,
      data: job.data,
      error: err.message,
      failedAt: new Date().toISOString(),
    });

    console.error("☠️ Job moved to DLQ:", job.id);
  }
});
