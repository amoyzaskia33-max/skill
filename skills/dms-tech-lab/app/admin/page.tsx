"use client";

import { useState, useEffect } from "react";
import { Save, FileText, CheckCircle, AlertCircle, RefreshCw } from "lucide-react";

interface FileItem {
    path: string;
    name: string;
}

export default function AdminPage() {
    const [files, setFiles] = useState<FileItem[]>([]);
    const [selectedFile, setSelectedFile] = useState<string | null>(null);
    const [content, setContent] = useState<string>("");
    const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFiles();
    }, []);

    const fetchFiles = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/admin/files');
            const data = await res.json();
            setFiles(data.files || []);
        } catch (e) {
            console.error("Failed to load files", e);
        } finally {
            setLoading(false);
        }
    };

    const loadFile = async (filePath: string) => {
        setStatus("idle");
        setSelectedFile(filePath);
        try {
            // Re-using GET with a query param approach is safer, but for now we read via a separate call? 
            // Actually, let's just make a read API or use the list. 
            // Wait, I can just use a simple server action or another API route?
            // Let's create a quick read route or add a query param to the existing one?
            // For simplicity, let's assume I can read it:
            const res = await fetch(`/api/admin/read?path=${encodeURIComponent(filePath)}`);
            const data = await res.json();
            setContent(data.content);
        } catch (e) {
            alert("Failed to read file");
        }
    };

    const saveFile = async () => {
        if (!selectedFile) return;
        setStatus("saving");
        try {
            const res = await fetch('/api/admin/files', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ filePath: selectedFile, content })
            });
            
            if (res.ok) {
                setStatus("success");
                setTimeout(() => setStatus("idle"), 2000);
            } else {
                setStatus("error");
            }
        } catch (e) {
            setStatus("error");
        }
    };

    return (
        <div className="flex h-screen bg-[#050B1B] text-white font-sans overflow-hidden">
            {/* Sidebar */}
            <div className="w-80 border-r border-white/10 flex flex-col bg-[#0A1124]">
                <div className="p-6 border-b border-white/10 flex justify-between items-center">
                    <h1 className="font-bold text-xl">CMS Admin</h1>
                    <button onClick={fetchFiles} className="p-2 hover:bg-white/10 rounded-full">
                        <RefreshCw className="w-4 h-4" />
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-2">
                    {loading ? (
                        <div className="text-gray-500 text-center py-4">Loading...</div>
                    ) : (
                        files.map((file) => (
                            <button
                                key={file.path}
                                onClick={() => loadFile(file.path)}
                                className={`w-full text-left p-3 rounded-lg text-sm truncate transition-colors flex items-center gap-3
                                    ${selectedFile === file.path ? 'bg-blue-600 text-white' : 'hover:bg-white/5 text-gray-400'}`}
                            >
                                <FileText className="w-4 h-4 shrink-0" />
                                <span className="truncate" title={file.path}>
                                    {file.path}
                                </span>
                            </button>
                        ))
                    )}
                </div>
            </div>

            {/* Main Editor */}
            <div className="flex-1 flex flex-col h-full relative">
                {selectedFile ? (
                    <>
                        <div className="p-4 border-b border-white/10 flex justify-between items-center bg-[#0A1124]">
                            <div className="text-sm text-gray-400">
                                Editing: <span className="text-white font-mono ml-2">{selectedFile}</span>
                            </div>
                            <div className="flex items-center gap-4">
                                {status === "success" && <span className="text-green-400 text-sm flex items-center gap-2"><CheckCircle className="w-4 h-4" /> Saved!</span>}
                                {status === "error" && <span className="text-red-400 text-sm flex items-center gap-2"><AlertCircle className="w-4 h-4" /> Error!</span>}
                                
                                <button 
                                    onClick={saveFile}
                                    disabled={status === "saving"}
                                    className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-lg font-bold transition-all"
                                >
                                    <Save className="w-4 h-4" />
                                    {status === "saving" ? "Saving..." : "Save Changes"}
                                </button>
                            </div>
                        </div>
                        <div className="flex-1 p-0 overflow-hidden relative">
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="w-full h-full bg-[#050B1B] text-gray-200 p-8 font-mono text-sm resize-none focus:outline-none leading-relaxed"
                                spellCheck={false}
                            />
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
                        <FileText className="w-16 h-16 mb-4 opacity-20" />
                        <p>Select a file from the sidebar to edit</p>
                    </div>
                )}
            </div>
        </div>
    );
}
