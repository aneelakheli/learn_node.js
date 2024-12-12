import { Queue } from "bullmq";

const notificationQueue = new Queue('EMAIL-QUEUE')

async function init(){

    const res = await notificationQueue.add('email-to-queue', {
        email:'devpomegabpo@gmail.com',
        subject:"Bull mq test",
        body:"This is test data for email configurations"
    });
    console.log('job added to queue', res.id)
}

init()