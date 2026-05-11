import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export async function getWarriorAssessment(goals: string, experience: string, obstacles: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      config: {
        systemInstruction: "You are the 'Warrior Coach', an elite personal trainer with a focus on discipline and grit. Your style is direct, intense, yet profoundly inspiring. Use tough-love wisdom combined with tactical advice.",
      },
      contents: `
        Analyze this recruit's profile:
        Goals: ${goals}
        Experience: ${experience}
        Obstacle: ${obstacles}

        Response requirements (Markdown format):
        1. A Warrior Title (e.g., # THE UNBREAKABLE VANGUARD)
        2. "The Assessment": A raw, 3-sentence reality check of where they are and their potential.
        3. "Battle Orders": 3 specific, non-negotiable action items for the first 7 days.
        4. "The Oath": A one-sentence commitment for them to read aloud.
      `,
    });
    
    return response.text;
  } catch (error) {
    console.error("Warrior Coach Error:", error);
    throw new Error("The lines are down. Even a Warrior needs a backup plan. (Try again later)");
  }
}
