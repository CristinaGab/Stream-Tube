import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateVideoMetadata = async (topic: string): Promise<{ title: string; description: string }> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Generate a catchy YouTube video title and a short 2-sentence description for a video about: "${topic}". 
      Return the result in JSON format with keys "title" and "description".`,
      config: {
        responseMimeType: "application/json"
      }
    });

    const text = response.text || "{}";
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      title: `Video about ${topic}`,
      description: "Automatically generated description failed."
    };
  }
};

export const askCreatorSupport = async (query: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are a support agent for StreamTube. We take a strictly enforced 5% commission on all creator earnings. 
      The user is asking: "${query}". 
      Explain the 5% policy politely but firmly in the context of their question. Keep it under 50 words.`,
    });
    return response.text || "Support is currently unavailable.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Unable to contact support AI.";
  }
};