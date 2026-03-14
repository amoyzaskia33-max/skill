export type ChatMode = 'chat' | 'agent';

export interface Message {
  role: 'user' | 'model';
  text?: string;
  audioData?: string; // Base64 string for audio playback
  imageData?: string; // NEW: Base64 string for image display
  timestamp: Date;
  isAction?: boolean; // To mark if this message resulted in a code change
}

export interface PlanItem {
  id: number;
  type: 'feature' | 'fix' | 'refactor';
  label: string; // Short title
  description: string; // Detailed logic explanation
}

// Structure of the JSON response we expect from Gemini
export interface AgentResponse {
  mode: 'chat' | 'code';      
  chatResponse: string;       
  codeCode: string;           
  terminalOutput: string;     
  browserHTML: string;        
  plan: PlanItem[];           // NEW: List of steps for user verification
}

export interface WorkspaceState {
  code: string;
  terminal: string[];
  browserContent: string;
}

export enum RecorderStatus {
  IDLE = 'IDLE',
  RECORDING = 'RECORDING',
  PROCESSING = 'PROCESSING'
}