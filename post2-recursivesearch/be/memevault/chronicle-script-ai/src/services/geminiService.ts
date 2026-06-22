import { GoogleGenAI, Type } from "@google/genai";

/**
 * Interface for a single scene in the script.
 */
export interface Scene {
  imagePrompt: string;
  contentText: string;
}

/**
 * Interface for the full structured script response.
 */
export interface ScriptResponse {
  title: string;
  hook: string;
  scenes: Scene[];
}

/**
 * Service to interact with the Gemini API to generate historical scripts.
 */
export class HistoricalScriptService {
  private ai: any;

  constructor(apiKey: string) {
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is required to initialize the service.");
    }
    this.ai = new GoogleGenAI({ apiKey });
  }

  /**
   * Generates a 30-second historical script in structured JSON format.
   * @returns A promise that resolves to a ScriptResponse object.
   */
  async generateScript(): Promise<ScriptResponse> {
    const response = await this.ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Generate a 30-second historical script (roughly 5-7 scenes). Pick an extremely interesting, lesser-known, or dramatic historical event. Focus on vivid storytelling.",
      config: {
        systemInstruction: "You are a professional historical short-form video scriptwriter. Your output must be compelling, accurate yet dramatic, and suitable for a 30-second vertical video. Each scene must have a highly detailed 'imagePrompt' that is photographic, cinematic, and historically accurate (ultra-realistic, 8k, period details), and 'contentText' which is the narration or text-on-screen.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: "The title of the historical story." },
            hook: { type: Type.STRING, description: "A catchy hook to start the video." },
            scenes: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  imagePrompt: { type: Type.STRING, description: "A detailed realistic AI image prompt for the scene." },
                  contentText: { type: Type.STRING, description: "The narration or text overlay for the scene." }
                },
                required: ["imagePrompt", "contentText"]
              }
            }
          },
          required: ["title", "hook", "scenes"]
        }
      }
    });

    try {
      const text = response.text || "{}";
      return JSON.parse(text) as ScriptResponse;
    } catch (error) {
      console.error("Failed to parse Gemini response:", error);
      throw new Error("Invalid response format from AI model.");
    }
  }
}
