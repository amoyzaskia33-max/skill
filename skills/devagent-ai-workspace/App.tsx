import React, { useState } from 'react';
import ChatPanel from './components/ChatPanel';
import CodeWorkspace from './components/CodeWorkspace';
import ApprovalPanel from './components/ApprovalPanel'; // Extracted component
import { sendMessageToGemini, blobToBase64 } from './services/geminiService';
import { Message, WorkspaceState, RecorderStatus, AgentResponse, ChatMode } from './types';
import { Settings, Play, FileCode, ChevronDown, MessageSquare } from 'lucide-react';

// Initial placeholder code
const INITIAL_CODE = `
import React from 'react';

function App() {
  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Welcome to Agentic AI</h1>
      <p>Ask me to build something via chat!</p>
    </div>
  );
}

export default App;
`;

export default function App() {
  // Chat State
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Halo! Pilih mode "Diskusi" untuk tanya jawab, atau "Coding" untuk mulai membangun.', timestamp: new Date() }
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [recorderStatus, setRecorderStatus] = useState<RecorderStatus>(RecorderStatus.IDLE);
  const [chatMode, setChatMode] = useState<ChatMode>('chat');

  // Workspace State
  const [workspace, setWorkspace] = useState<WorkspaceState>({
    code: INITIAL_CODE,
    terminal: ['npm install', 'npm start', 'Server running at http://localhost:3000'],
    browserContent: `
      <html>
        <script src="https://cdn.tailwindcss.com"></script>
        <body class="bg-gray-50 flex items-center justify-center h-screen">
          <div class="text-center">
            <h1 class="text-4xl font-bold text-gray-800 mb-4">Welcome to Agentic AI</h1>
            <p class="text-gray-600">Ask me to build something via chat!</p>
          </div>
        </body>
      </html>
    `
  });

  // Pending State (Waiting for Approval)
  const [pendingUpdate, setPendingUpdate] = useState<{
    data: AgentResponse,
    workspaceState: WorkspaceState
  } | null>(null);

  const handleSendMessage = async (text: string, audioBlob: Blob | null, imageFile: File | null) => {
    if (pendingUpdate) {
      alert("Selesaikan konfirmasi perubahan sebelumnya dulu ya bos!");
      return;
    }

    setIsProcessing(true);
    setRecorderStatus(RecorderStatus.PROCESSING);

    // Prepare display message
    let imageDataBase64: string | undefined = undefined;
    if (imageFile) {
      imageDataBase64 = await blobToBase64(imageFile);
    }

    const newUserMsg: Message = {
      role: 'user',
      text: text,
      audioData: audioBlob ? 'Voice Note' : undefined,
      imageData: imageDataBase64,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newUserMsg]);

    try {
      const result = await sendMessageToGemini(
        text, 
        audioBlob,
        imageFile, // Pass image to service
        workspace.code,
        workspace.browserContent,
        workspace.terminal,
        chatMode 
      );

      if (result.mode === 'chat') {
        const newModelMsg: Message = {
          role: 'model',
          text: result.chatResponse,
          timestamp: new Date(),
          isAction: false
        };
        setMessages(prev => [...prev, newModelMsg]);
      } else {
        const newPendingState: WorkspaceState = {
          code: result.codeCode,
          terminal: [...workspace.terminal, ...result.terminalOutput.split('\n')],
          browserContent: result.browserHTML
        };

        setPendingUpdate({
          data: result,
          workspaceState: newPendingState
        });

        const newModelMsg: Message = {
          role: 'model',
          text: result.chatResponse,
          timestamp: new Date(),
          isAction: true
        };
        setMessages(prev => [...prev, newModelMsg]);
      }

    } catch (error) {
      console.error("Failed to process message:", error);
      setMessages(prev => [...prev, {
        role: 'model',
        text: "Maaf, terjadi kesalahan.",
        timestamp: new Date()
      }]);
    } finally {
      setIsProcessing(false);
      setRecorderStatus(RecorderStatus.IDLE);
    }
  };

  const handleApprove = () => {
    if (pendingUpdate) {
      setWorkspace(pendingUpdate.workspaceState);
      setMessages(prev => [...prev, {
        role: 'model',
        text: "✅ Perubahan diterapkan.",
        timestamp: new Date()
      }]);
      setPendingUpdate(null);
      setChatMode('chat'); // Auto-switch back to safe mode
    }
  };

  const handleReject = () => {
    setMessages(prev => [...prev, {
      role: 'model',
      text: "❌ Perubahan dibatalkan.",
      timestamp: new Date()
    }]);
    setPendingUpdate(null);
  };

  const currentViewWorkspace = pendingUpdate ? pendingUpdate.workspaceState : workspace;

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-black text-slate-200">
      
      {/* LEFT SIDEBAR */}
      <div className="w-80 flex flex-col border-r border-slate-800 bg-slate-900 shrink-0 relative z-20">
        
        {/* HEADER */}
        <div className="p-4 border-b border-slate-800 bg-slate-900">
          <div className="flex items-center justify-between mb-4">
            <h1 className="font-bold text-white text-sm tracking-wide">MY-PROJECT</h1>
            <Settings size={14} className="text-slate-500 hover:text-white cursor-pointer" />
          </div>
          <div className="flex gap-2">
            <button className="flex-1 bg-indigo-600/20 text-indigo-400 text-xs font-medium py-1.5 rounded flex items-center justify-center gap-2 border border-indigo-600/50 cursor-default">
              <Play size={12} /> Running
            </button>
          </div>
        </div>

        {/* MIDDLE: FILE EXPLORER / APPROVAL PANEL */}
        <div className="flex-1 overflow-y-auto border-b border-slate-800 bg-slate-900/50 relative">
          
          {pendingUpdate ? (
            // Menggunakan Komponen Approval Panel yang baru
            <ApprovalPanel 
              data={pendingUpdate.data} 
              onApprove={handleApprove} 
              onReject={handleReject} 
            />
          ) : (
            // File Explorer
            <div className="p-2">
              <div className="flex items-center text-xs font-bold text-slate-500 mb-2 px-2 uppercase tracking-wider">
                Explorer
              </div>
              <div className="space-y-0.5 font-mono text-sm opacity-60 hover:opacity-100 transition-opacity">
                <div className="flex items-center px-2 py-1 rounded text-slate-300">
                  <ChevronDown size={14} className="mr-1 text-slate-500" />
                  <span className="font-bold">src</span>
                </div>
                <div className="pl-6 flex items-center px-2 py-1 rounded text-indigo-400 bg-slate-800/30">
                  <FileCode size={14} className="mr-2" />
                  <span>App.tsx</span>
                </div>
              </div>
              
              <div className="mt-8 px-4 text-center">
                 {chatMode === 'chat' ? (
                    <>
                      <MessageSquare size={24} className="mx-auto text-slate-700 mb-2" />
                      <p className="text-[10px] text-slate-500">Mode Diskusi Aktif</p>
                    </>
                 ) : (
                    <>
                      <Play size={24} className="mx-auto text-orange-900 mb-2 opacity-50" />
                      <p className="text-[10px] text-orange-800">Mode Coding Siap</p>
                    </>
                 )}
              </div>
            </div>
          )}
        </div>

        {/* BOTTOM: CHAT */}
        <div className="h-[45%] flex flex-col min-h-[300px]">
          <ChatPanel 
            messages={messages} 
            onSendMessage={handleSendMessage}
            status={recorderStatus}
            isProcessing={isProcessing}
            currentMode={chatMode}
            onModeChange={setChatMode}
          />
        </div>
      </div>

      {/* RIGHT WORKSPACE */}
      <CodeWorkspace state={currentViewWorkspace} />
      
    </div>
  );
}