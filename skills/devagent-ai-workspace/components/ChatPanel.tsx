import React, { useState, useRef, useEffect } from 'react';
import { Message, RecorderStatus, ChatMode } from '../types';
import { Mic, Send, StopCircle, Bot, MessageSquare, Code, Paperclip, X, Image as ImageIcon } from 'lucide-react';

interface ChatPanelProps {
  messages: Message[];
  onSendMessage: (text: string, audio: Blob | null, image: File | null) => void;
  status: RecorderStatus;
  isProcessing: boolean;
  currentMode: ChatMode;
  onModeChange: (mode: ChatMode) => void;
}

const ChatPanel: React.FC<ChatPanelProps> = ({ 
  messages, 
  onSendMessage, 
  status, 
  isProcessing,
  currentMode,
  onModeChange
}) => {
  const [inputText, setInputText] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const [localStatus, setLocalStatus] = useState<RecorderStatus>(RecorderStatus.IDLE);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isProcessing, imagePreview]);

  // Sync prop status
  useEffect(() => {
    if (status === RecorderStatus.IDLE) {
       setLocalStatus(RecorderStatus.IDLE);
    }
  }, [status]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        // Send audio + text + image (if any)
        onSendMessage(inputText, audioBlob, selectedImage);
        
        // Reset inputs
        setInputText('');
        clearImage();
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setLocalStatus(RecorderStatus.RECORDING);
    } catch (err) {
      console.error("Error accessing microphone:", err);
      alert("Tidak bisa akses mikrofon. Pastikan izin diberikan.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && localStatus === RecorderStatus.RECORDING) {
      mediaRecorderRef.current.stop();
      setLocalStatus(RecorderStatus.PROCESSING);
    }
  };

  const handleSendText = () => {
    if (!inputText.trim() && !selectedImage) return;
    onSendMessage(inputText, null, selectedImage);
    setInputText('');
    clearImage();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendText();
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 w-full relative z-10">
      {/* Header dengan Mode Switcher */}
      <div className="p-3 border-b border-slate-800 bg-slate-900/95 backdrop-blur sticky top-0 flex flex-col gap-3">
        
        {/* Title Row */}
        <div className="flex items-center space-x-2">
          <Bot className="text-indigo-400 w-4 h-4" />
          <span className="text-xs font-bold text-slate-300">AI Controller</span>
          <div className="flex-1" />
          <span className={`w-2 h-2 rounded-full ${isProcessing ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400'}`}></span>
        </div>

        {/* MODE TOGGLE SWITCH */}
        <div className="flex bg-slate-800 p-1 rounded-lg">
          <button 
            onClick={() => onModeChange('chat')}
            className={`flex-1 flex items-center justify-center py-1.5 px-2 rounded-md text-[10px] font-bold transition-all ${
              currentMode === 'chat' 
                ? 'bg-indigo-600 text-white shadow-md' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <MessageSquare size={12} className="mr-1.5" />
            DISKUSI
          </button>
          <button 
            onClick={() => onModeChange('agent')}
            className={`flex-1 flex items-center justify-center py-1.5 px-2 rounded-md text-[10px] font-bold transition-all ${
              currentMode === 'agent' 
                ? 'bg-orange-600 text-white shadow-md' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code size={12} className="mr-1.5" />
            CODING
          </button>
        </div>
        
        {/* Helper Text */}
        <div className="text-[10px] text-slate-500 text-center">
          {currentMode === 'chat' 
            ? "AI tidak akan mengubah kode." 
            : "AI diizinkan memodifikasi kode."}
        </div>

      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 scrollbar-hide">
        {messages.length === 0 && (
          <div className="text-center text-slate-600 mt-4 text-xs">
            <p>Upload gambar, kirim suara, atau ketik perintah.</p>
          </div>
        )}
        
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div 
              className={`max-w-[90%] rounded-2xl p-2.5 text-xs leading-relaxed shadow-sm flex flex-col gap-2 ${
                msg.role === 'user' 
                  ? 'bg-indigo-600 text-white rounded-br-none' 
                  : (msg.isAction 
                      ? 'bg-slate-800 border border-orange-500/30 text-slate-300 rounded-bl-none' 
                      : 'bg-slate-800 text-slate-300 rounded-bl-none border border-slate-700')
              }`}
            >
              {/* Image in Message */}
              {msg.imageData && (
                <div className="rounded-lg overflow-hidden border border-white/10 max-h-40">
                  <img src={`data:image/png;base64,${msg.imageData}`} alt="User upload" className="w-full h-full object-cover" />
                </div>
              )}

              {/* Text / Audio Info */}
              {msg.text && <span>{msg.text}</span>}
              {msg.audioData && (
                <span className="italic flex items-center gap-1 opacity-80 border-t border-white/20 pt-1 mt-1">
                  <Mic size={10}/> Pesan Suara
                </span> 
              )}
            </div>
          </div>
        ))}
        {isProcessing && (
          <div className="flex justify-start">
             <div className="bg-slate-800 text-slate-500 rounded-2xl rounded-bl-none p-2 text-[10px] animate-pulse">
               Thinking...
             </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-2 border-t border-slate-800 bg-slate-900">
        
        {/* Image Preview Overlay */}
        {imagePreview && (
          <div className="mb-2 relative inline-block">
            <div className="h-16 w-16 rounded-lg overflow-hidden border border-indigo-500/50 relative group">
              <img src={imagePreview} alt="Preview" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-black/40 hidden group-hover:flex items-center justify-center transition-all">
                <button 
                  onClick={clearImage}
                  className="bg-red-500 p-1 rounded-full text-white hover:bg-red-600"
                >
                  <X size={10} />
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="relative flex items-center gap-2">
          {/* File Input Hidden */}
          <input 
            type="file" 
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept="image/*"
            className="hidden"
          />
          
          {/* Attachment Button */}
          <button 
             onClick={() => fileInputRef.current?.click()}
             className={`h-9 w-9 flex items-center justify-center rounded-lg transition-all ${
               selectedImage ? 'text-indigo-400 bg-indigo-400/10' : 'text-slate-400 hover:text-white hover:bg-slate-800'
             }`}
             title="Upload Gambar"
          >
             {selectedImage ? <ImageIcon size={14} /> : <Paperclip size={14} />}
          </button>

          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
               selectedImage 
                 ? "Jelaskan gambar ini..." 
                 : (currentMode === 'chat' ? "Tanya sesuatu..." : "Perintahkan update kode...")
            }
            className="flex-1 bg-slate-800 text-white text-xs rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 resize-none h-9 max-h-20 scrollbar-hide"
            disabled={localStatus === RecorderStatus.RECORDING || isProcessing}
          />
          
          {localStatus === RecorderStatus.RECORDING ? (
             <button 
              onClick={stopRecording}
              className="h-9 w-9 flex items-center justify-center rounded-lg bg-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-all animate-pulse"
            >
              <StopCircle size={16} />
            </button>
          ) : (
            (inputText.trim() || selectedImage) ? (
              <button 
                onClick={handleSendText}
                disabled={isProcessing}
                className={`h-9 w-9 flex items-center justify-center rounded-lg text-white transition-all disabled:opacity-50 ${
                  currentMode === 'chat' ? 'bg-indigo-600 hover:bg-indigo-500' : 'bg-orange-600 hover:bg-orange-500'
                }`}
              >
                <Send size={14} />
              </button>
            ) : (
               <button 
                onClick={startRecording}
                disabled={isProcessing}
                className="h-9 w-9 flex items-center justify-center rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
              >
                <Mic size={14} />
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPanel;