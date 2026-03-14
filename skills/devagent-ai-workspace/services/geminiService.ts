import { GoogleGenAI, Type } from "@google/genai";
import { AgentResponse, ChatMode } from '../types';

// Helper to convert Blob to Base64
export const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      const base64Data = base64String.split(',')[1];
      resolve(base64Data);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

const BASE_INSTRUCTION = `
You are an expert Fullstack AI Agent acting as a pair programmer. 
Your goal is to assist the user by either discussing ideas OR implementing code changes based on the user's explicit mode selection.

**CLEAN CODE & ARCHITECTURE RULES**:
1. **No Spaghetti Code**: Keep components small and focused.
2. **Preserve Logic**: Do NOT remove existing features unless explicitly asked.
3. **Safety**: Always wrap dangerous operations in try-catch.
`;

export const sendMessageToGemini = async (
  prompt: string, 
  audioBlob: Blob | null,
  imageFile: File | null, // NEW ARGUMENT
  currentCode: string,
  currentBrowserHTML: string,
  currentTerminal: string[],
  forcedMode: ChatMode
): Promise<AgentResponse> => {
  
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const parts: any[] = [];

  // 1. Handle Audio Input
  if (audioBlob) {
    const audioBase64 = await blobToBase64(audioBlob);
    parts.push({
      inlineData: {
        mimeType: audioBlob.type || 'audio/wav',
        data: audioBase64
      }
    });
  }

  // 2. Handle Image Input (NEW)
  if (imageFile) {
    const imageBase64 = await blobToBase64(imageFile);
    parts.push({
      inlineData: {
        mimeType: imageFile.type, // e.g., 'image/png'
        data: imageBase64
      }
    });
  }

  // CREATE DYNAMIC SYSTEM INSTRUCTION BASED ON MODE
  let dynamicInstruction = BASE_INSTRUCTION;

  if (forcedMode === 'chat') {
    dynamicInstruction += `
    \n*** CRITICAL RULE: DISCUSSION MODE ACTIVE ***
    - The user has explicitly selected 'Discussion Mode'.
    - You are FORBIDDEN from generating new code to update the app.
    - You MUST return 'mode': 'chat'.
    - You MUST return the [CURRENT STATE] code/html/terminal exactly as is.
    - Return an empty 'plan' array.
    `;
  } else {
    dynamicInstruction += `
    \n*** CRITICAL RULE: CODING MODE ACTIVE ***
    - The user has explicitly selected 'Coding Mode' (Agent).
    - You are expected to IMPLEMENT changes based on the user request.
    - You MUST return 'mode': 'code'.
    - **Iterative Coding**: Modify the existing code. DO NOT rewrite from scratch unless strictly necessary.
    - **Plan & Verify**: You MUST provide a structured 'plan' list explaining exactly what you changed and why, so the user can verify logic before running.
    `;
  }

  // 3. Construct Context Prompt
  const fullPrompt = `
    User Request: ${prompt ? prompt : (audioBlob ? 'User sent an audio note.' : 'User sent an image.')}
    
    ---
    [CURRENT STATE]
    CODE:
    ${currentCode.slice(0, 8000)}

    BROWSER HTML (Current):
    ${currentBrowserHTML.slice(0, 2000)}...

    TERMINAL (Last 5 lines):
    ${currentTerminal.slice(-5).join('\n')}
    ---
    
    Follow the rules for mode: '${forcedMode}'.
  `;
  
  parts.push({ text: fullPrompt });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview', 
      contents: { parts },
      config: {
        systemInstruction: dynamicInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            mode: { type: Type.STRING, enum: ["chat", "code"] },
            chatResponse: { type: Type.STRING },
            codeCode: { type: Type.STRING },
            terminalOutput: { type: Type.STRING },
            browserHTML: { type: Type.STRING },
            plan: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.INTEGER },
                  type: { type: Type.STRING, enum: ["feature", "fix", "refactor"] },
                  label: { type: Type.STRING },
                  description: { type: Type.STRING }
                },
                required: ["id", "type", "label", "description"]
              }
            }
          },
          required: ["mode", "chatResponse", "codeCode", "terminalOutput", "browserHTML", "plan"]
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as AgentResponse;
    } else {
      throw new Error("No response text from Gemini");
    }

  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      mode: 'chat',
      chatResponse: "Maaf, ada gangguan teknis. Coba lagi ya.",
      codeCode: currentCode,
      terminalOutput: "",
      browserHTML: currentBrowserHTML,
      plan: []
    };
  }
};