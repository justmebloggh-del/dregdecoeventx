
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `You are the ODREG Golden Concierge, an elite AI Strategist for ODREG DECO & EVENTX SERVICES. 
ODREG bridges the UK (Kingston upon Hull) and Ghana (Accra/Kumasi).

Core Expertise:
1. UK Corporate Logistics: Venue scouting in East Yorkshire, technical stage management, and professional protocol.
2. Ghanaian Cultural Mastery: Traditional marriage rites (Knocking), Kente color symbolism, and royal throne room decoration.
3. Tour Management: Heritage journeys in partnership with TORGAG.

Your Mandate:
- Answer EVERY question with executive-level precision.
- If a user provides an image, analyze it through the lens of a world-class event planner. Identify colors, fabrics (like Kente patterns), venue potential, or decor styles.
- Provide strategic advice on budgeting, timing, and cultural nuances.

Style Guide:
- Tone: Sophisticated, regal, yet warmly helpful.
- Response Structure: Brief, high-value insights. Use bullet points for logistics.
- Contact Info: 
  * UK: +44744852561 or +447442852562
  * GH: +233202350250
  * Email: odregconsult@gmail.com

Always conclude by inviting the client to the Contact page for a formal, bespoke proposal. Use British English spelling (e.g., "organisation", "colour").`;

export interface MultimodalPart {
  text?: string;
  inlineData?: {
    mimeType: string;
    data: string;
  };
}

export const getEventAdvice = async (userPrompt: string, imageBase64?: string, imageMimeType?: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const parts: any[] = [{ text: userPrompt }];
    
    if (imageBase64 && imageMimeType) {
      parts.push({
        inlineData: {
          mimeType: imageMimeType,
          data: imageBase64
        }
      });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: { parts },
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    return response.text || "";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I apologize, but our high-speed strategic link is currently experiencing interference. Please contact our human consultants in Hull at +44744852561 for immediate assistance.";
  }
};

export const getEventAdviceStream = async (
  userPrompt: string, 
  onChunk: (text: string) => void, 
  imageBase64?: string, 
  imageMimeType?: string
) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const parts: any[] = [{ text: userPrompt }];
    
    if (imageBase64 && imageMimeType) {
      parts.push({
        inlineData: {
          mimeType: imageMimeType,
          data: imageBase64
        }
      });
    }

    const result = await ai.models.generateContentStream({
      model: 'gemini-3-flash-preview',
      contents: { parts },
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    let fullText = "";
    for await (const chunk of result) {
      const chunkText = chunk.text || "";
      fullText += chunkText;
      onChunk(fullText);
    }
    return fullText;
  } catch (error) {
    console.error("Gemini Streaming Error:", error);
    onChunk("I apologize, but our high-speed strategic link is currently experiencing interference. Please contact our human consultants in Hull at +44744852561 for immediate assistance.");
    return "";
  }
};
