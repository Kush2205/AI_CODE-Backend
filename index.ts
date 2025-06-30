import express, { text } from "express";
import { exec } from "node:child_process"
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv"
import { Message } from "./types/types";

dotenv.config();
const app = express();
console.log(process.env.GEMINI_API_KEY)
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.use(express.json())
const system_prompt = process.env.SYSTEM_PROMPT;

const port = process.env.PORT || 8080;

const messages: Message[] = [];


app.post("/generate", async (req, res) => {
    const { message } = req.body;
    if (!message) {
        res.send("No message received")
    }

    messages.push({ role: "user", parts: [{ text: message }] });

    const chat = ai.chats.create({
        model: "gemini-2.5-flash",
        history: messages,
        config: {
            systemInstruction: system_prompt,
            responseJsonSchema: {
                type: "object",
                properties: {
                    step: {
                        type: "string",
                        enum: ["Plan", "Query", "Action", "Reevaluate"]
                    },

                    content: {
                        type: "string"
                    }
                },
                required: ["step" , "content"],
            }
        }

    });
 while(true){
    const response = await chat.sendMessage({
        message 
    })
    
    try {
        if(response.text){
           messages.push({role:"model" , parts : [{text : response.text}]})
        
        
        let responseText = response.text.trim();
        let jsonText = responseText;
        
       
        if (responseText.startsWith('```json')) {
            jsonText = responseText.replace(/^```json\r?\n/, '').replace(/```$/, '');
        } else if (responseText.startsWith('```')) {
            jsonText = responseText.replace(/^```\r?\n?/, '').replace(/```$/, '');
        }
        
       
        let parsedRes;
        try {
            parsedRes = JSON.parse(jsonText);
        } catch (jsonError) {
            console.log("Error parsing JSON:", jsonError);
            console.log("Raw response:", responseText);
            
            
            const fixMessage = "Please provide your response in valid JSON format with 'step' and 'content' fields.";
            messages.push({ role: "user", parts: [{ text: fixMessage }] });
            continue; 
        }
        
        console.log(parsedRes);
        const {step, content} = parsedRes

            if(step == "linux"){
                exec(content , (err , output) => {
                    if(err){
                        console.log(err);
                        messages.push({ role: "user", parts: [{ text: output }] });
                        return;
                    }

                    messages.push({ role: "model", parts: [{ text: output }] });
                } )
            }
        } 
        
    } catch (error) {
        console.log(error)
    }
 }
    
    
        
 
        
})



app.listen(port, () => console.log(`Server started at port ${port}`));
