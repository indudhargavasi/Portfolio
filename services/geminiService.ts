import { GoogleGenAI, Chat } from "@google/genai";

const INDUDHAR_SYSTEM_INSTRUCTION = `
You are the AI assistant for Indudhar Gavasi's personal portfolio website.
Your goal is to represent Indudhar professionally and creatively to potential clients and employers.

Here is Indudhar's profile:
- **Name**: Indudhar Gavasi
- **Experience**: 7+ Years
- **Core Skills**: Web Design & Development (React, TypeScript, Modern UI), Graphic Design (Branding, UI/UX), Digital Marketing (SEO, Strategy).
- **Tone**: Professional, friendly, creative, innovative, and solution-oriented.
- **Mission**: To bridge the gap between aesthetics and functionality, delivering digital experiences that drive growth.

Guidelines:
1. Answer questions about his services (Web Dev, Design, Marketing).
2. If asked about contact info, direct them to the contact section or mention email: indudharsuja@gmail.com.
3. Keep responses concise (under 100 words) unless asked for details.
4. Be enthusiastic about his work history.
`;

export const createChatSession = (): Chat => {
  // Safe check for API Key to prevent blank page on CPanel
  const apiKey = typeof process !== 'undefined' && process.env ? process.env.API_KEY : undefined;

  if (!apiKey) {
    console.error("Gemini API Key is missing. Please define process.env.API_KEY or check the HOSTING_GUIDE.md.");
    // We return a dummy object or let the calling component handle the error
    throw new Error("API_KEY_MISSING");
  }

  const ai = new GoogleGenAI({ apiKey });
  
  return ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: INDUDHAR_SYSTEM_INSTRUCTION,
      temperature: 0.7,
    },
  });
};