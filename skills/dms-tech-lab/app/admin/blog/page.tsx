"use client";

import { useState, useEffect, useMemo } from "react";
import { Newspaper, Save, RefreshCw, ChevronRight, FileText, Eye, Code, Columns, ChevronDown, FolderOpen } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface FileItem {
  path: string;
  name: string;
  title: string;
  series: string;
}

export default function AdminBlogPage() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [grouped, setGrouped] = useState<Record<string, FileItem[]>>({});
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [content, setContent] = useState<string>("");
  const [originalContent, setOriginalContent] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [viewMode, setViewMode] = useState<"split" | "code" | "preview">("split");
  const [expandedSeries, setExpandedSeries] = useState<Set<string>>(new Set());

  // Toggle series expansion
  const toggleSeries = (series: string) => {
    setExpandedSeries(prev => {
      const next = new Set(prev);
      if (next.has(series)) {
        next.delete(series);
      } else {
        next.add(series);
      }
      return next;
    });
  };

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
      // Pattern: <Image src="/path" ... /> or <Image src="/path" ... >
      body = body.replace(/<Image[\s\S]*?src=["']([^"']+)["'][\s\S]*?(?:\/>|>)/gi, '\n\n![image]($1)\n\n');
      // Pattern: <img src="/path" ... />
      body = body.replace(/<img[\s\S]*?src=["']([^"']+)["'][\s\S]*?(?:\/>|>)/gi, '\n\n![image]($1)\n\n');
      
      // Remove ALL JSX/HTML tags but preserve the text content inside them
      // First, handle self-closing tags (remove completely)
      body = body.replace(/<[A-Za-z][A-Za-z0-9]*[^>]*\/>/g, '');
      
      // Then remove opening tags (preserve content between opening and closing)
      body = body.replace(/<[A-Za-z][A-Za-z0-9]*[^>]*>/g, '');
      
      // Remove closing tags
      body = body.replace(/<\/[A-Za-z][A-Za-z0-9]*>/g, '');
      
      // Clean up JSX expressions like {/* comment */} and {variable}
      body = body.replace(/\{\/\*[\s\S]*?\*\/\}/g, '');
      body = body.replace(/\{[^}]*\}/g, '');
      
      // Clean up className and other attributes that might be leftover
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

  // Fetch blog MDX files
  const fetchFiles = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/blog/files");
      if (res.ok) {
        const data = await res.json();
        setFiles(data.files || []);
        setGrouped(data.grouped || {});
        // Expand all series by default
        setExpandedSeries(new Set(Object.keys(data.grouped || {})));
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
      const res = await fetch(`/api/admin/blog/read?path=${encodeURIComponent(filePath)}`);
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
      const res = await fetch("/api/admin/blog/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path: selectedFile, content }),
      });

      const contentType = res.headers.get("content-type");
      if (!contentType?.includes("application/json")) {
        throw new Error("세션이 만료되었습니다. 페이지를 새로고침 후 다시 로그인해주세요.");
      }

      const data = await res.json();
      if (res.ok && data.success) {
        setOriginalContent(content);
        setMessage({ type: "success", text: "저장되었습니다!" });
        setTimeout(() => setMessage(null), 3000);
      } else {
        throw new Error(data.error || "저장에 실패했습니다.");
      }
    } catch (error: any) {
      console.error("Failed to save file:", error);
      setMessage({ type: "error", text: error.message || "저장에 실패했습니다." });
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const hasChanges = content !== originalContent;

  // Series name mapping for display
  const seriesNames: Record<string, string> = {
    "ai-fantasy-life": "🌿 AI Fantasy Life",
    "today-me": "✨ Today Me",
    "기타": "📝 기타",
  };

  // Custom components matching actual blog styles
  const BlogPreviewComponents = {
    img: ({ src, alt, ...props }: any) => {
      if (!src) return null;
      const imageSrc = src.startsWith("/") ? src : `/${src}`;
      return (
        <span className="block my-8">
          <img
            src={imageSrc}
            alt={alt || ""}
            className="w-full h-auto rounded-xl shadow-2xl"
            {...props}
          />
        </span>
      );
    },
    h1: ({ children }: any) => <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 mt-12">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-3xl font-bold text-white mb-6 mt-12 flex items-center gap-3">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-2xl font-bold text-white mb-4 mt-8">{children}</h3>,
    p: ({ children }: any) => <p className="text-gray-300 leading-relaxed mb-6 text-lg">{children}</p>,
    ul: ({ children }: any) => <ul className="list-disc pl-6 text-gray-300 space-y-2 mb-6">{children}</ul>,
    ol: ({ children }: any) => <ol className="list-decimal pl-6 text-gray-300 space-y-2 mb-6">{children}</ol>,
    li: ({ children }: any) => <li className="text-gray-300">{children}</li>,
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-purple-500 pl-6 py-4 my-8 bg-purple-500/5 rounded-r-xl text-gray-300 italic text-lg">
        {children}
      </blockquote>
    ),
    pre: ({ children }: any) => (
      <pre className="bg-[#0A1124] p-6 rounded-xl overflow-x-auto my-8 border border-white/10">
        {children}
      </pre>
    ),
    code: ({ inline, className, children }: any) => 
      inline ? (
        <code className="bg-white/10 px-2 py-1 rounded text-purple-400 text-sm font-mono">{children}</code>
      ) : (
        <code className="text-sm text-gray-300 font-mono">{children}</code>
      ),
    a: ({ href, children }: any) => (
      <a href={href} className="text-purple-400 hover:text-purple-300 underline transition-colors">
        {children}
      </a>
    ),
    strong: ({ children }: any) => <strong className="font-bold text-white">{children}</strong>,
    em: ({ children }: any) => <em className="italic text-gray-200">{children}</em>,
    hr: () => <hr className="border-white/10 my-12" />,
  };

  return (
    <div className="h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Newspaper className="w-8 h-8 text-orange-400" />
            블로그 콘텐츠 관리
          </h1>
          <p className="text-white/50 mt-2">블로그 포스트의 MDX 파일을 직접 수정할 수 있습니다.</p>
        </div>
        <div className="flex items-center gap-3">
          {/* View Mode Toggle */}
          <div className="flex bg-white/5 rounded-lg p-1">
            <button
              onClick={() => setViewMode("code")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-sm transition-colors ${
                viewMode === "code" ? "bg-orange-500 text-white" : "text-white/60 hover:text-white"
              }`}
            >
              <Code className="w-4 h-4" /> 코드
            </button>
            <button
              onClick={() => setViewMode("split")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-sm transition-colors ${
                viewMode === "split" ? "bg-orange-500 text-white" : "text-white/60 hover:text-white"
              }`}
            >
              <Columns className="w-4 h-4" /> 분할
            </button>
            <button
              onClick={() => setViewMode("preview")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-sm transition-colors ${
                viewMode === "preview" ? "bg-orange-500 text-white" : "text-white/60 hover:text-white"
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
        {/* File List Sidebar - Grouped by Series */}
        <div className="w-72 bg-white/5 rounded-2xl border border-white/10 overflow-hidden flex flex-col shrink-0">
          <div className="p-4 border-b border-white/10">
            <h3 className="font-semibold text-white/80">시리즈별 파일</h3>
            <p className="text-xs text-white/40 mt-1">{files.length}개의 파일</p>
          </div>
          <div className="flex-1 overflow-auto p-2 space-y-1">
            {Object.entries(grouped).map(([series, seriesFiles]) => (
              <div key={series} className="mb-2">
                {/* Series Header */}
                <button
                  onClick={() => toggleSeries(series)}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-all text-sm hover:bg-white/5 text-white/80"
                >
                  <ChevronDown 
                    className={`w-4 h-4 shrink-0 transition-transform ${
                      expandedSeries.has(series) ? "" : "-rotate-90"
                    }`} 
                  />
                  <FolderOpen className="w-4 h-4 shrink-0 text-orange-400" />
                  <span className="font-medium truncate">
                    {seriesNames[series] || series}
                  </span>
                  <span className="ml-auto text-xs text-white/40 bg-white/10 px-2 py-0.5 rounded-full">
                    {seriesFiles.length}
                  </span>
                </button>

                {/* Series Files */}
                {expandedSeries.has(series) && (
                  <div className="ml-4 mt-1 space-y-0.5">
                    {seriesFiles.map((file) => (
                      <button
                        key={file.path}
                        onClick={() => loadFile(file.path)}
                        className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-all text-sm ${
                          selectedFile === file.path
                            ? "bg-orange-500/20 text-orange-400 border border-orange-500/30"
                            : "hover:bg-white/5 text-white/60 hover:text-white"
                        }`}
                      >
                        <FileText className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate text-xs">{file.title}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Editor + Preview Area */}
        <div className="flex-1 bg-white/5 rounded-2xl border border-white/10 overflow-hidden flex flex-col">
          {selectedFile ? (
            <>
              {/* Editor Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/10 shrink-0">
                <div>
                  <h3 className="font-semibold text-white/80">{selectedFile}</h3>
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
                        ? "bg-orange-500 hover:bg-orange-600 text-white"
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

                {/* Preview - Matching actual blog page styling */}
                {(viewMode === "preview" || viewMode === "split") && (
                  <div className={`${viewMode === "split" ? "w-1/2" : "w-full"} flex flex-col overflow-hidden`}>
                    <div className="px-4 py-2 bg-orange-500/10 text-xs text-orange-400 border-b border-white/10">
                      미리보기 (실제 페이지와 동일)
                    </div>
                    <div className="flex-1 overflow-auto bg-[#050B1B]">
                      {/* Blog Post Preview Container */}
                      <article className="max-w-4xl mx-auto px-8 py-12">
                        {/* Title Section */}
                        {parsedContent.frontmatter.title && (
                          <header className="mb-12">
                            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                              {parsedContent.frontmatter.title.replace(/"/g, '')}
                            </h1>
                            {parsedContent.frontmatter.subtitle && (
                              <p className="text-xl text-purple-400 font-medium">
                                {parsedContent.frontmatter.subtitle.replace(/"/g, '')}
                              </p>
                            )}
                            {parsedContent.frontmatter.excerpt && (
                              <p className="text-gray-400 mt-4 text-lg leading-relaxed">
                                {parsedContent.frontmatter.excerpt.replace(/"/g, '')}
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

                        {/* Body Content */}
                        <div className="prose-custom">
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={BlogPreviewComponents}
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
