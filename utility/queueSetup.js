import { Queue, Worker } from 'bullmq'

export const emailQueue = new Queue('emailsending')

export const reportQueue = new Queue('reportGeneration')


const redisOptions = {host :'localhost', port: 6379}
const myQueue = new Queue('myJobName', {
    connection:redisOptions
})


async function addJob(testJob) {
    await myQueue.add('myJobName', testJob)
    await myQueue.add('myJobName', {qux:'buz'})
}

await addJob()

async function initializeQueue(){
    await addJob({foo:'bar'})
}


initializeQueue()
export const worker = new Worker('myJobName', async job =>{
    console.log('inside the worker file',job.data),
    await myQueue.add('myJobName', {qux:'bar'})
    
}, {connection:redisOptions, concurrency:5, 
    limiter:{max:10, duration:1}
})  