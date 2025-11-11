
import { GoogleGenAI, Type } from "@google/genai";
import { OracleFormData, Prediction } from '../types';

export const fetchPrediction = async (formData: OracleFormData): Promise<Prediction> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const systemInstruction = `You are a wise and insightful oracle, blending the ancient wisdom of Vedic astrology with the perspectives of modern Western astrology. Your predictions are nuanced, positive, and empowering. You do not give fatalistic or deterministic prophecies, but rather guidance on potential paths and energies. Provide a detailed prediction based on the user's birth details.`;

  const prompt = `A person named ${formData.name} was born on ${formData.dob} at ${formData.tob} in ${formData.pob}. Based on their astrological chart, combining both Vedic (Jyotish) and modern Western astrological principles, provide a detailed and insightful prediction about their future. Structure the response into three distinct sections: Career & Fortune, Relationships & Love, and Health & Wellness. Each section should be a comprehensive paragraph.`;

  const responseSchema = {
    type: Type.OBJECT,
    properties: {
      career: {
        type: Type.STRING,
        description: "A detailed prediction about the person's career, fortune, and financial prospects, blending Vedic and Western astrology."
      },
      relationships: {
        type: Type.STRING,
        description: "An insightful prediction about the person's love life, friendships, and family relationships, blending Vedic and Western astrology."
      },
      health: {
        type: Type.STRING,
        description: "Guidance and predictions regarding the person's physical and mental well-being, blending Vedic and Western astrology."
      }
    },
    required: ["career", "relationships", "health"]
  };

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.8,
        topP: 0.9,
      },
    });

    const jsonText = response.text.trim();
    const predictionData: Prediction = JSON.parse(jsonText);
    
    return predictionData;

  } catch (error) {
    console.error("Error fetching prediction from Gemini API:", error);
    throw new Error("Failed to get a response from the oracle.");
  }
};
