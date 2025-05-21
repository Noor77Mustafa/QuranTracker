import OpenAI from "openai";

// Initialize the OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Note: In production, API calls should go through server-side
});

// The system prompt that guides the AI to provide Quranic knowledge
const SYSTEM_PROMPT = `You are a knowledgeable assistant specialized in Islamic and Quranic studies. 
Provide helpful, respectful, and accurate information about the Quran, Islamic teachings, and practices.
Keep responses concise, informative, and suitable for learners at all levels.
If asked about controversial topics, present mainstream scholarly opinions without personal bias.
Always maintain a tone of respect when discussing religious matters.
If you don't know something or are uncertain, acknowledge that rather than providing potentially incorrect information.
`;

export async function getQuranAIResponse(userMessage: string): Promise<string> {
  try {
    // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userMessage }
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    return response.choices[0].message.content || "I'm sorry, I couldn't process your question. Could you please try again?";
  } catch (error) {
    console.error("Error getting AI response:", error);
    return "I apologize, but I encountered an error while processing your question. Please try again later.";
  }
}

export async function getQuranKnowledge(topic: string): Promise<{title: string, content: string}[]> {
  try {
    // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { 
          role: "system", 
          content: `${SYSTEM_PROMPT}
          When asked about a Quranic topic, provide 2-3 key points of knowledge in JSON format.
          Each point should have a title and content that is brief but informative.
          Format your response as a JSON array of objects with "title" and "content" properties.`
        },
        { 
          role: "user", 
          content: `Provide key knowledge about this Quranic topic: ${topic}`
        }
      ],
      max_tokens: 800,
      temperature: 0.5,
      response_format: { type: "json_object" }
    });

    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error("Empty response from API");
    }
    
    const parsed = JSON.parse(content);
    return parsed.points || [];
  } catch (error) {
    console.error("Error getting Quran knowledge:", error);
    return [
      {
        title: "Error Retrieving Information",
        content: "We apologize, but we couldn't retrieve information about this topic. Please try again later."
      }
    ];
  }
}

export default {
  getQuranAIResponse,
  getQuranKnowledge
};