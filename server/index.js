import express from "express";
import cors from 'cors'
import * as dotenv from 'dotenv'
import { Configuration,OpenAIApi } from "openai";

const app = express()
app.use(express.json())
app.use(cors())
let port = 3000
dotenv.config()
const configuration = new Configuration({
    apiKey:process.env.OPENAI_API_KEY
})
// console.log(process.env.OPENAI_API_KEY)

const openai = new OpenAIApi(configuration)


app.get('/', async(req, res) => {
    res.status(200).send({"message":"Hello World!"})
  })
  
app.post('/',async(req,res)=>{
    try {
        const {prompt}=req.body
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${prompt}`,
            max_tokens: 3000,
            temperature: 0,
            top_p: 1,
            frequency_penalty:0.5,
            presence_penalty:0
          });
          res.status(200).send({
            bot:response.data.choices[0].text
          })
    } catch (error) {
        res.status(401).send(error)
    }
})


  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })