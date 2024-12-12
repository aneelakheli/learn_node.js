import { Worker } from "bullmq";

const sendEmail = () =>new Promise((res, rej)=>setTimeout(()=>res()))

const redisOptions = {host :'localhost', port: 6379}
const worker = new Worker('email-to-queue', async(job)=>{
    console.log(`message red id: ${job.id}`)
    console.log("process message")
    console.log(`sending email to ${job.data.email}`)
    await sendEmail(
        console.log('email sent')
    )

}, {connection:redisOptions}).run()