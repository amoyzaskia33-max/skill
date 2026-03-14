import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Globe, Code2, Maximize2, Minimize2, GripVertical, GripHorizontal, X, ChevronDown, ChevronUp } from 'lucide-react';
import { WorkspaceState } from '../types';

interface CodeWorkspaceProps {
  state: WorkspaceState;
}

const CodeWorkspace: React.FC<CodeWorkspaceProps> = ({ state }) => {
  // --- STATE VISIBILITY ---
  const [showCode, setShowCode] = useState(true);
  const [showBrowser, setShowBrowser] = useState(true);
  const [showTerminal, setShowTerminal] = useState(true);

  // --- STATE DIMENSI ---
  // Lebar Code Editor dalam Persen (default 50%)
  const [codeWidthPercent, setCodeWidthPercent] = useState(50);
  // Tinggi Terminal dalam Pixel (DEFAULT KECIL: 120px) agar web lebih lega
  const [terminalHeight, setTerminalHeight] = useState(120);
  
  // State untuk tracking drag
  const [isResizingCode, setIsResizingCode] = useState(false);
  const [isResizingTerminal, setIsResizingTerminal] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // --- LOGIC RESIZE ---
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isResizingCode && containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        let newPercent = ((e.clientX - containerRect.left) / containerRect.width) * 100;
        newPercent = Math.max(10, Math.min(90, newPercent));
        setCodeWidthPercent(newPercent);
      }

      if (isResizingTerminal) {
        // Hitung tinggi dari bawah
        const newHeight = window.innerHeight - e.clientY;
        // Constraint: Minimal 32px (header size), Maksimal 80% layar
        const constrainedHeight = Math.max(32, Math.min(window.innerHeight * 0.8, newHeight));
        setTerminalHeight(constrainedHeight);
      }
    };

    const handleMouseUp = () => {
      setIsResizingCode(false);
      setIsResizingTerminal(false);
    };

    if (isResizingCode || isResizingTerminal) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizingCode, isResizingTerminal]);

  // Kalkulasi lebar dinamis
  const activeCodeWidth = !showBrowser ? 100 : (!showCode ? 0 : codeWidthPercent);

  return (
    <div 
      ref={containerRef}
      className="flex-1 flex flex-col h-full overflow-hidden bg-slate-950 relative select-none"
    >
      {/* OVERLAY saat dragging agar iframe tidak menelan event mouse */}
      {(isResizingCode || isResizingTerminal) && (
        <div className="absolute inset-0 z-50 cursor-grabbing bg-transparent" />
      )}

      {/* --- AREA UTAMA (CODE & BROWSER) --- */}
      <div className="flex-1 flex flex-row min-h-0 overflow-hidden relative">
        
        {/* PANEL KIRI: CODE */}
        {showCode && (
          <div 
            style={{ width: `${activeCodeWidth}%` }} 
            className="flex flex-col border-r border-slate-800 min-w-0"
          >
            <div className="h-9 flex items-center justify-between px-3 bg-slate-900 border-b border-slate-800 shrink-0 group">
              <div className="flex items-center space-x-2 text-slate-400 text-xs font-medium">
                <Code2 size={14} className="text-indigo-400" />
                <span>App.tsx</span>
              </div>
              <button onClick={() => setShowCode(false)} title="Minimize Editor" className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Minimize2 size={12} />
              </button>
            </div>
            <div className="flex-1 overflow-auto bg-[#0d1117] p-4 text-sm font-mono leading-relaxed text-slate-300">
              <pre className="whitespace-pre-wrap">
                <code>{state.code || '// Ready to code...'}</code>
              </pre>
            </div>
          </div>
        )}

        {/* RESIZER VERTIKAL */}
        {showCode && showBrowser && (
          <div 
            className="w-1 bg-slate-900 hover:bg-indigo-600 cursor-col-resize flex items-center justify-center transition-colors z-20 relative"
            onMouseDown={() => setIsResizingCode(true)}
          >
            <GripVertical size={12} className="text-slate-600" />
          </div>
        )}

        {/* PANEL KANAN: BROWSER */}
        {showBrowser && (
          <div className="flex-1 flex flex-col bg-white min-w-0">
            <div className="h-9 flex items-center justify-between px-3 bg-slate-100 border-b border-slate-200 shrink-0 group">
              <div className="flex items-center space-x-2">
                <Globe size={14} className="text-blue-500" />
                <span className="text-xs font-medium text-slate-600">localhost:3000</span>
              </div>
              <div className="flex items-center gap-1">
                 {!showCode && (
                   <button onClick={() => setShowCode(true)} className="p-1 hover:bg-slate-200 rounded text-slate-500 text-[10px] flex items-center gap-1">
                     <Maximize2 size={10} /> Show Code
                   </button>
                 )}
                 <button onClick={() => setShowBrowser(false)} title="Minimize Browser" className="p-1 hover:bg-slate-200 rounded text-slate-500 hover:text-slate-800 opacity-0 group-hover:opacity-100 transition-opacity">
                   <Minimize2 size={12} />
                 </button>
              </div>
            </div>
            <div className="flex-1 relative bg-white overflow-hidden">
               <iframe 
                 srcDoc={state.browserContent}
                 className={`w-full h-full border-none ${(isResizingCode || isResizingTerminal) ? 'pointer-events-none' : ''}`}
                 title="Preview"
                 sandbox="allow-scripts" 
               />
            </div>
          </div>
        )}

        {/* Fallback jika semua ditutup */}
        {!showCode && !showBrowser && (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-500">
             <div className="flex gap-2">
               <button onClick={() => setShowCode(true)} className="px-3 py-1 bg-indigo-600 text-white rounded text-sm">Open Editor</button>
               <button onClick={() => setShowBrowser(true)} className="px-3 py-1 bg-blue-500 text-white rounded text-sm">Open Browser</button>
             </div>
          </div>
        )}
      </div>

      {/* RESIZER HORIZONTAL (Untuk Terminal) */}
      {showTerminal && (
        <div 
          className="h-1 bg-slate-900 hover:bg-indigo-600 cursor-row-resize flex justify-center items-center transition-colors z-20 relative"
          onMouseDown={() => setIsResizingTerminal(true)}
        >
          <GripHorizontal size={12} className="text-slate-600" />
        </div>
      )}

      {/* --- AREA BAWAH (TERMINAL) --- */}
      {showTerminal ? (
        <div 
          style={{ height: terminalHeight }} 
          className="flex flex-col border-t border-slate-800 bg-black shrink-0 relative transition-all duration-75 ease-out"
        >
          <div className="h-8 flex items-center justify-between px-3 bg-slate-900 border-b border-slate-800 shrink-0 group">
            <div className="flex items-center">
               <Terminal size={14} className="text-emerald-400 mr-2" />
               <span className="text-xs font-mono text-slate-400">Terminal Output</span>
            </div>
            <button 
              onClick={() => setShowTerminal(false)} 
              className="p-1 hover:bg-slate-800 rounded text-slate-500 hover:text-white"
            >
              <ChevronDown size={14} />
            </button>
          </div>
          <div className="flex-1 p-3 overflow-y-auto font-mono text-xs text-emerald-500 space-y-1">
            {state.terminal.length === 0 ? (
               <div className="opacity-50">_ Ready...</div>
            ) : (
              state.terminal.map((line, i) => (
                <div key={i} className="break-all whitespace-pre-wrap">
                  <span className="text-slate-500 mr-2 select-none">$</span>
                  {line}
                </div>
              ))
            )}
            <div className="animate-pulse">_</div>
          </div>
        </div>
      ) : (
        /* MINIMIZED TERMINAL (Klik untuk expand) */
        <div 
          onClick={() => setShowTerminal(true)}
          className="h-6 border-t border-slate-800 bg-slate-900 flex items-center justify-between px-3 cursor-pointer hover:bg-slate-800 transition-colors shrink-0"
        >
          <div className="flex items-center opacity-70">
             <Terminal size={12} className="text-slate-400 mr-2" />
             <span className="text-[10px] font-mono text-slate-500">Terminal Output</span>
          </div>
          <ChevronUp size={12} className="text-slate-500" />
        </div>
      )}

    </div>
  );
};

export default CodeWorkspace;