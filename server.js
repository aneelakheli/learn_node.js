import express from 'express'
// import { worker } from './config/queueSetup.js'
const app = express()
const port = 3000

// await worker.on('completed', job=>{
//     console.log(`${job.id} has completed!`)
// })


app.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
})