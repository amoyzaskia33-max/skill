import React, { useState, useEffect } from 'react';
import { AgentResponse } from '../types';
import { AlertCircle, CheckCircle, XCircle, CheckSquare, Square, FileCode } from 'lucide-react';

interface ApprovalPanelProps {
  data: AgentResponse;
  onApprove: () => void;
  onReject: () => void;
}

const ApprovalPanel: React.FC<ApprovalPanelProps> = ({ data, onApprove, onReject }) => {
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const [isAllChecked, setIsAllChecked] = useState(false);

  const planItems = data.plan || [];

  // Logic: Check if all items are verified
  useEffect(() => {
    if (planItems.length > 0 && checkedItems.length === planItems.length) {
      setIsAllChecked(true);
    } else {
      setIsAllChecked(false);
    }
  }, [checkedItems, planItems]);

  const toggleItem = (id: number) => {
    if (checkedItems.includes(id)) {
      setCheckedItems(prev => prev.filter(item => item !== id));
    } else {
      setCheckedItems(prev => [...prev, id]);
    }
  };

  const toggleAll = () => {
    if (isAllChecked) {
      setCheckedItems([]);
    } else {
      setCheckedItems(planItems.map(i => i.id));
    }
  };

  return (
    <div className="absolute inset-0 bg-slate-900 p-4 flex flex-col animate-fadeIn z-20">
      <div className="flex items-center gap-2 mb-4 text-amber-400 border-b border-slate-800 pb-3">
        <AlertCircle size={18} />
        <span className="font-bold text-sm">Verifikasi Logika AI</span>
      </div>
      
      <div className="flex-1 overflow-y-auto mb-4 pr-1">
        <div className="mb-3">
          <p className="text-xs text-slate-400 mb-2">
            Silakan review rencana perubahan di bawah ini. Centang poin untuk menyetujui logika tersebut.
          </p>
          
          {/* Header Select All */}
          <div 
            onClick={toggleAll}
            className="flex items-center gap-3 p-2 rounded hover:bg-slate-800 cursor-pointer mb-2 border-b border-slate-800/50"
          >
             {isAllChecked ? (
               <CheckSquare size={16} className="text-emerald-400" />
             ) : (
               <Square size={16} className="text-slate-500" />
             )}
             <span className="text-xs font-bold text-slate-300">Pilih Semua</span>
          </div>
        </div>

        <div className="space-y-2">
          {planItems.map((item) => {
             const isChecked = checkedItems.includes(item.id);
             return (
               <div 
                  key={item.id}
                  onClick={() => toggleItem(item.id)}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    isChecked 
                      ? 'bg-indigo-900/20 border-indigo-500/50' 
                      : 'bg-slate-800/50 border-slate-700 hover:border-slate-600'
                  }`}
               >
                 <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      {isChecked ? (
                        <CheckSquare size={16} className="text-indigo-400" />
                      ) : (
                        <Square size={16} className="text-slate-500" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase ${
                          item.type === 'fix' ? 'bg-red-500/20 text-red-400' :
                          item.type === 'refactor' ? 'bg-blue-500/20 text-blue-400' :
                          'bg-emerald-500/20 text-emerald-400'
                        }`}>
                          {item.type}
                        </span>
                        <span className={`text-xs font-bold ${isChecked ? 'text-indigo-200' : 'text-slate-300'}`}>
                          {item.label}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                 </div>
               </div>
             );
          })}
        </div>

        {/* File Indicator */}
        <div className="mt-4 px-2 pt-4 border-t border-slate-800">
            <div className="text-[10px] text-slate-500 mb-2 uppercase tracking-wider">File Impact:</div>
            <div className="flex items-center text-xs text-slate-400 font-mono bg-slate-800 p-2 rounded">
              <FileCode size={12} className="mr-2"/> App.tsx
            </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3 mt-auto pt-2 border-t border-slate-800">
        <button 
          onClick={onReject}
          className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 py-2.5 rounded-lg text-xs font-bold transition-all"
        >
          <XCircle size={14} />
          Revisi / Batal
        </button>
        <button 
          onClick={onApprove}
          disabled={!isAllChecked}
          className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-bold shadow-lg transition-all ${
            isAllChecked 
              ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-900/20 cursor-pointer' 
              : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
          }`}
        >
          <CheckCircle size={14} />
          {isAllChecked ? 'Jalankan Perubahan' : 'Verifikasi Dulu'}
        </button>
      </div>
    </div>
  );
};

export default ApprovalPanel;