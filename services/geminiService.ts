import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// Initialize the Gemini AI client
// Note: We use process.env.API_KEY as per the requirements.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
You are Nova, an advanced AI financial analyst for NOVA Financial.
Your tone is professional, sophisticated, yet accessible. 
You provide concise insights about market trends, wealth management concepts, and financial planning.
Keep responses under 100 words unless asked for a detailed report.
Focus on "future-forward" terminology.
Do not provide specific financial advice (buy/sell recommendations); instead, provide educational context and market analysis.
`;

export const generateFinancialInsight = async (prompt: string): Promise<string> => {
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      }
    });
    
    return response.text || "I apologize, but I couldn't generate an insight at this moment.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Our secure connection to the market core is currently re-calibrating. Please try again shortly.";
  }
};
