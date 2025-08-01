import { Request, Response } from "express";
import OpenAI from "openai";

// Initialize the OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// The system prompt that guides the AI to provide Quranic knowledge
const SYSTEM_PROMPT = `You are a knowledgeable assistant specialized in Islamic and Quranic studies. 
Provide helpful, respectful, and accurate information about the Quran, Islamic teachings, and practices.
Keep responses concise, informative, and suitable for learners at all levels.
If asked about controversial topics, present mainstream scholarly opinions without personal bias.
Always maintain a tone of respect when discussing religious matters.
If you don't know something or are uncertain, acknowledge that rather than providing potentially incorrect information.
`;

const MAX_INPUT_LENGTH = 500;

export async function getAIResponse(req: Request, res: Response) {
  const { message } = req.body;

  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "Message is required" });
  }

  if (message.length > MAX_INPUT_LENGTH) {
    return res.status(400).json({ error: `Message is too long. Max length is ${MAX_INPUT_LENGTH} characters.` });
  }
  
  try {
    // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: message }
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    return res.json({ 
      content: response.choices[0].message.content 
    });
  } catch (error) {
    console.error("Error getting AI response:", error);
    return res.status(500).json({ 
      error: "An error occurred while getting AI response",
      message: error.message 
    });
  }
}