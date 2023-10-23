import { Configuration, OpenAIApi } from "openai";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = 8000;

app.use(bodyParser.json());
app.use(cors());

let apiKey; 

app.post('/set-api-key', (req, res) => {
  apiKey = req.body.apiKey;
  res.sendStatus(200); 
});

app.post("/", async (req, res) => {
  // OpenAI code 
  
  const { chats } = req.body;

  const configuration = new Configuration({
    apiKey: apiKey,
  });

  // const configuration = new Configuration({
  //   apiKey: "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",
  // });

  const openai = new OpenAIApi(configuration);

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo", 
    messages: chats
  });
  
  res.json({
    output: completion.data.choices[0].message
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`); 
});