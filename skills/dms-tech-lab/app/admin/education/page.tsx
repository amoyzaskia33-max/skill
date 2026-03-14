"use client";

import { useState, useEffect, useMemo } from "react";
import { BookOpen, Save, RefreshCw, ChevronRight, FileText, Eye, Code, Columns } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface FileItem {
  path: string;
  name: string;
}

export default function AdminEducationPage() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [content, setContent] = useState<string>("");
  const [originalContent, setOriginalContent] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [viewMode, setViewMode] = useState<"split" | "code" | "preview">("split");

  // Parse frontmatter and content
  const parsedContent = useMemo(() => {
    // Handle both LF and CRLF line endings
    const frontmatterMatch = content.match(/^---[\r\n]+([\s\S]*?)[\r\n]+---[\r\n]+([\s\S]*)$/);
    if (frontmatterMatch) {
      const frontmatterText = frontmatterMatch[1];
      const frontmatter: Record<string, string> = {};
      frontmatterText.split(/\r?\n/).forEach(line => {
        const match = line.match(/^(\w+):\s*["']?(.+?)["']?\s*$/);
        if (match) {
          frontmatter[match[1]] = match[2];
        }
      });
      
      // Clean JSX from body for preview
      let body = frontmatterMatch[2];
      
      // Extract images from JSX Image tags with various formats
      body = body.replace(/<Image[\s\S]*?src=["']([^"']+)["'][\s\S]*?(?:\/>|>)/gi, '\n\n![image]($1)\n\n');
      body = body.replace(/<img[\s\S]*?src=["']([^"']+)["'][\s\S]*?(?:\/>|>)/gi, '\n\n![image]($1)\n\n');
      
      // Remove ALL JSX/HTML tags but preserve the text content inside them
      body = body.replace(/<[A-Za-z][A-Za-z0-9]*[^>]*\/>/g, '');
      body = body.replace(/<[A-Za-z][A-Za-z0-9]*[^>]*>/g, '');
      body = body.replace(/<\/[A-Za-z][A-Za-z0-9]*>/g, '');
      
      // Clean up JSX expressions
      body = body.replace(/\{\/\*[\s\S]*?\*\/\}/g, '');
      body = body.replace(/\{[^}]*\}/g, '');
      
      // Clean up className attributes
      body = body.replace(/className="[^"]*"/g, '');
      
      // Clean up multiple spaces and newlines
      body = body.replace(/\n{3,}/g, '\n\n');
      body = body.replace(/  +/g, ' ');
      
      return {
        frontmatter,
        frontmatterRaw: frontmatterText,
        body: body.trim(),
      };
    }
    return { frontmatter: {}, frontmatterRaw: "", body: content };
  }, [content]);

  // Fetch education MDX files
  const fetchFiles = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/education/files");
      if (res.ok) {
        const data = await res.json();
        setFiles(data.files || []);
      }
    } catch (error) {
      console.error("Failed to fetch files:", error);
    } finally {
      setLoading(false);
    }
  };

  // Load file content
  const loadFile = async (filePath: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/education/read?path=${encodeURIComponent(filePath)}`);
      if (res.ok) {
        const data = await res.json();
        setContent(data.content || "");
        setOriginalContent(data.content || "");
        setSelectedFile(filePath);
        setMessage(null);
      }
    } catch (error) {
      console.error("Failed to load file:", error);
      setMessage({ type: "error", text: "파일을 불러오는데 실패했습니다." });
    } finally {
      setLoading(false);
    }
  };

  // Save file content
  const saveFile = async () => {
    if (!selectedFile) return;
    setSaving(true);
    try {
      const res = await fetch("/api/admin/education/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path: selectedFile, content }),
      });
      if (res.ok) {
        setOriginalContent(content);
        setMessage({ type: "success", text: "저장되었습니다!" });
        setTimeout(() => setMessage(null), 3000);
      } else {
        throw new Error("Save failed");
      }
    } catch (error) {
      console.error("Failed to save file:", error);
      setMessage({ type: "error", text: "저장에 실패했습니다." });
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const hasChanges = content !== originalContent;

  // Custom components for markdown rendering
  const MarkdownComponents = {
    img: ({ src, alt, ...props }: any) => {
      if (!src) return null;
      const imageSrc = src.startsWith("/") ? src : `/${src}`;
      return (
        <span className="block my-4">
          <img
            src={imageSrc}
            alt={alt || ""}
            className="max-w-full h-auto rounded-lg"
            {...props}
          />
        </span>
      );
    },
    h1: ({ children }: any) => <h1 className="text-3xl font-bold mt-8 mb-4 text-white">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-2xl font-bold mt-6 mb-3 text-white border-b border-white/10 pb-2">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-xl font-bold mt-4 mb-2 text-white">{children}</h3>,
    p: ({ children }: any) => <p className="text-gray-300 leading-relaxed mb-4">{children}</p>,
    ul: ({ children }: any) => <ul className="list-disc pl-5 text-gray-300 space-y-1 mb-4">{children}</ul>,
    ol: ({ children }: any) => <ol className="list-decimal pl-5 text-gray-300 space-y-1 mb-4">{children}</ol>,
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-teal-500 pl-4 py-2 my-4 bg-white/5 rounded-r text-gray-300 italic">
        {children}
      </blockquote>
    ),
    pre: ({ children }: any) => (
      <pre className="bg-slate-900 p-4 rounded-lg overflow-x-auto my-4">
        {children}
      </pre>
    ),
    code: ({ inline, children }: any) => 
      inline ? (
        <code className="bg-white/10 px-1.5 py-0.5 rounded text-teal-400 text-sm">{children}</code>
      ) : (
        <code className="text-sm text-gray-300">{children}</code>
      ),
    a: ({ href, children }: any) => (
      <a href={href} className="text-teal-400 hover:underline" target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
  };

  return (
    <div className="h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-teal-400" />
            교육 콘텐츠 관리
          </h1>
          <p className="text-white/50 mt-2">교육 레슨의 MDX 파일을 직접 수정할 수 있습니다.</p>
        </div>
        <div className="flex items-center gap-3">
          {/* View Mode Toggle */}
          <div className="flex bg-white/5 rounded-lg p-1">
            <button
              onClick={() => setViewMode("code")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-sm transition-colors ${
                viewMode === "code" ? "bg-teal-500 text-white" : "text-white/60 hover:text-white"
              }`}
            >
              <Code className="w-4 h-4" /> 코드
            </button>
            <button
              onClick={() => setViewMode("split")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-sm transition-colors ${
                viewMode === "split" ? "bg-teal-500 text-white" : "text-white/60 hover:text-white"
              }`}
            >
              <Columns className="w-4 h-4" /> 분할
            </button>
            <button
              onClick={() => setViewMode("preview")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-sm transition-colors ${
                viewMode === "preview" ? "bg-teal-500 text-white" : "text-white/60 hover:text-white"
              }`}
            >
              <Eye className="w-4 h-4" /> 미리보기
            </button>
          </div>
          <button
            onClick={fetchFiles}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      <div className="flex gap-4 h-[calc(100vh-200px)]">
        {/* File List Sidebar */}
        <div className="w-72 bg-white/5 rounded-2xl border border-white/10 overflow-hidden flex flex-col shrink-0">
          <div className="p-4 border-b border-white/10">
            <h3 className="font-semibold text-white/80">파일 목록</h3>
            <p className="text-xs text-white/40 mt-1">{files.length}개의 파일</p>
          </div>
          <div className="flex-1 overflow-auto p-2 space-y-1">
            {files.map((file) => (
              <button
                key={file.path}
                onClick={() => loadFile(file.path)}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-all text-sm ${
                  selectedFile === file.path
                    ? "bg-teal-500/20 text-teal-400 border border-teal-500/30"
                    : "hover:bg-white/5 text-white/70 hover:text-white"
                }`}
              >
                <FileText className="w-4 h-4 shrink-0" />
                <span className="truncate">{file.name.replace(".mdx", "")}</span>
              </button>
            ))}
            {files.length === 0 && !loading && (
              <div className="text-center py-8 text-white/40 text-sm">
                파일이 없습니다.
              </div>
            )}
          </div>
        </div>

        {/* Editor + Preview Area */}
        <div className="flex-1 bg-white/5 rounded-2xl border border-white/10 overflow-hidden flex flex-col">
          {selectedFile ? (
            <>
              {/* Editor Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/10 shrink-0">
                <div>
                  <h3 className="font-semibold text-white/80 truncate max-w-md">
                    {selectedFile.split("/").pop()}
                  </h3>
                  <p className="text-xs text-white/40 mt-1 truncate max-w-lg">{selectedFile}</p>
                </div>
                <div className="flex items-center gap-3">
                  {message && (
                    <span className={`text-sm ${message.type === "success" ? "text-green-400" : "text-red-400"}`}>
                      {message.text}
                    </span>
                  )}
                  <button
                    onClick={saveFile}
                    disabled={!hasChanges || saving}
                    className={`flex items-center gap-2 px-5 py-2 rounded-lg font-semibold transition-all ${
                      hasChanges
                        ? "bg-teal-500 hover:bg-teal-600 text-white"
                        : "bg-white/10 text-white/40 cursor-not-allowed"
                    }`}
                  >
                    <Save className="w-4 h-4" />
                    {saving ? "저장 중..." : "저장"}
                  </button>
                </div>
              </div>

              {/* Split View Content */}
              <div className="flex-1 flex overflow-hidden">
                {/* Code Editor */}
                {(viewMode === "code" || viewMode === "split") && (
                  <div className={`${viewMode === "split" ? "w-1/2 border-r border-white/10" : "w-full"} flex flex-col`}>
                    <div className="px-4 py-2 bg-slate-800/50 text-xs text-white/40 border-b border-white/10">
                      MDX 코드
                    </div>
                    <textarea
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className="flex-1 w-full bg-slate-900 text-slate-100 font-mono text-sm p-4 focus:outline-none resize-none leading-relaxed"
                      placeholder="파일 내용이 여기에 표시됩니다..."
                      spellCheck={false}
                    />
                  </div>
                )}

                {/* Preview */}
                {(viewMode === "preview" || viewMode === "split") && (
                  <div className={`${viewMode === "split" ? "w-1/2" : "w-full"} flex flex-col overflow-hidden`}>
                    <div className="px-4 py-2 bg-teal-500/10 text-xs text-teal-400 border-b border-white/10">
                      미리보기
                    </div>
                    <div className="flex-1 overflow-auto bg-[#050B1B]">
                      <article className="max-w-4xl mx-auto px-8 py-12">
                        {/* Title Section */}
                        {parsedContent.frontmatter.title && (
                          <header className="mb-12">
                            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                              {parsedContent.frontmatter.title.replace(/"/g, '')}
                            </h1>
                            {parsedContent.frontmatter.desc && (
                              <p className="text-gray-400 mt-4 text-lg leading-relaxed">
                                {parsedContent.frontmatter.desc.replace(/"/g, '')}
                              </p>
                            )}
                          </header>
                        )}

                        {/* Cover Image */}
                        {parsedContent.frontmatter.coverImage && (
                          <div className="mb-12 rounded-2xl overflow-hidden">
                            <img 
                              src={parsedContent.frontmatter.coverImage.replace(/"/g, '')}
                              alt=""
                              className="w-full h-auto"
                            />
                          </div>
                        )}

                        {/* Body Preview */}
                        <div className="prose-custom">
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={MarkdownComponents}
                          >
                            {parsedContent.body}
                          </ReactMarkdown>
                        </div>
                      </article>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-white/30">
              <div className="text-center">
                <FileText className="w-16 h-16 mx-auto mb-4 opacity-30" />
                <p>왼쪽에서 파일을 선택하세요</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
