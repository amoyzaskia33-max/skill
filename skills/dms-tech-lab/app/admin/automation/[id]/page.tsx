"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Loader2, Plus, Trash2, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { upload } from '@vercel/blob/client';

// Helper for dynamic fields
interface DynamicField {
    title: string;
    description: string;
}

export default function EditAutomationPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // Upload loading states
  const [uploadingImage, setUploadingImage] = useState(false);
  const [progressImage, setProgressImage] = useState(0);
  const [uploadingResource, setUploadingResource] = useState(false);
  const [progressResource, setProgressResource] = useState(0);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [progressVideo, setProgressVideo] = useState(0);

  // Main Form State
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Marketing", // Default
  });

  // Detailed Info State (JSON)
  const [howItWorks, setHowItWorks] = useState("");
  const [features, setFeatures] = useState<DynamicField[]>([]);
  const [prerequisites, setPrerequisites] = useState<DynamicField[]>([]);
  const [steps, setSteps] = useState<DynamicField[]>([]);
  const [links, setLinks] = useState({
      jsonUrl: "",
      videoUrl: "",
      previewImage: ""
  });

  // Fetch Existing Data
  useEffect(() => {
    const fetchData = async () => {
        try {
            const res = await fetch(`/api/admin/automation/${id}`);
            if (!res.ok) throw new Error("Failed to fetch");
            const data = await res.json();
            
            setFormData({
                title: data.title,
                description: data.description,
                category: data.category
            });

            const detail = data.detail || {};
            setHowItWorks(detail.howItWorks || "");
            setFeatures(detail.keyFeatures || []);
            setPrerequisites(detail.prerequisites || []);
            setSteps(detail.steps || []);
            setLinks({
                jsonUrl: detail.jsonUrl || "",
                videoUrl: detail.videoUrl || "",
                previewImage: detail.previewImage || ""
            });
        } catch (error) {
            console.error(error);
            alert("불러오기 실패");
            router.push("/admin/automation");
        } finally {
            setFetching(false);
        }
    };
    fetchData();
  }, [id, router]);

  // Handler for adding dynamic fields
  const addField = (setter: React.Dispatch<React.SetStateAction<DynamicField[]>>) => {
      setter(prev => [...prev, { title: "", description: "" }]);
  };

  // Handler for updating dynamic fields
  const updateField = (
      index: number, 
      field: keyof DynamicField, 
      value: string, 
      setter: React.Dispatch<React.SetStateAction<DynamicField[]>>,
      current: DynamicField[]
  ) => {
      const updated = [...current];
      updated[index] = { ...updated[index], [field]: value };
      setter(updated);
  };

  const removeField = (
      index: number,
      setter: React.Dispatch<React.SetStateAction<DynamicField[]>>
  ) => {
      setter(prev => prev.filter((_, i) => i !== index));
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const detailData = {
        howItWorks,
        keyFeatures: features,
        prerequisites,
        steps,
        jsonUrl: links.jsonUrl,
        videoUrl: links.videoUrl,
        previewImage: links.previewImage
    };

    try {
      const res = await fetch(`/api/admin/automation/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            ...formData,
            detail: detailData
        }),
      });

      if (!res.ok) throw new Error("Failed to update automation");
      
      router.push("/admin/automation");
      router.refresh();
    } catch (error) {
      alert("수정 실패");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
      if (!confirm("정말 삭제하시겠습니까? 복구할 수 없습니다.")) return;
       setLoading(true);
      try {
          const res = await fetch(`/api/admin/automation/${id}`, { method: "DELETE" });
          if (!res.ok) throw new Error("Failed to delete");
          router.push("/admin/automation");
          router.refresh();
      } catch (error) {
          alert("삭제 실패");
          console.error(error);
          setLoading(false);
      }
  };

  if (fetching) {
      return (
          <div className="w-full h-screen flex items-center justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-neon-sky" />
          </div>
      );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-32">
       {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
            <Link href="/admin/automation" className="p-3 hover:bg-white/10 rounded-full text-white/50 transition-colors">
                <ArrowLeft className="w-6 h-6" />
            </Link>
            <div>
                <h1 className="text-3xl font-bold text-white">자동화 수정</h1>
                <p className="text-white/50 text-sm">Edit existing automation workflow template.</p>
            </div>
        </div>
        <button 
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className="px-4 py-2 bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded-xl flex items-center gap-2 transition-colors disabled:opacity-50"
        >
            <Trash2 className="w-4 h-4" />
            Delete Template
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Basic Info */}
        <section className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 space-y-6">
            <h2 className="text-xl font-bold text-white border-b border-white/10 pb-4">기본 정보</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-white/70 text-sm">Title</label>
                    <input 
                        required
                        className="w-full p-3 bg-black/20 border border-white/10 rounded-xl text-white outline-none focus:border-neon-sky/50"
                        value={formData.title}
                        onChange={e => setFormData({...formData, title: e.target.value})}
                        placeholder="e.g. 숏폼 자동화(Shorts Automation)"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-white/70 text-sm">Category</label>
                    <select 
                        className="w-full p-3 bg-black/20 border border-white/10 rounded-xl text-white outline-none focus:border-neon-sky/50"
                        value={formData.category}
                        onChange={e => setFormData({...formData, category: e.target.value})}
                    >
                        <option value="Marketing">Marketing</option>
                        <option value="Development">Development</option>
                        <option value="Content">Content</option>
                        <option value="Business">Business</option>
                        <option value="Sales">Sales</option>
                        <option value="Support">Support</option>
                        <option value="Comfyui">Comfyui</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="col-span-full space-y-2">
                    <label className="text-white/70 text-sm">Description (Short)</label>
                    <input 
                        required
                        className="w-full p-3 bg-black/20 border border-white/10 rounded-xl text-white outline-none focus:border-neon-sky/50"
                        value={formData.description}
                        onChange={e => setFormData({...formData, description: e.target.value})}
                        placeholder="Short description for the card view"
                    />
                </div>
            </div>
        </section>

        {/* Media & Links */}
        <section className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 space-y-6">
            <h2 className="text-xl font-bold text-white border-b border-white/10 pb-4">미디어 & 링크</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {/* Image Upload */}
                 <div className="space-y-2">
                    <label className="text-white/70 text-sm flex items-center gap-2">
                        <ImageIcon className="w-4 h-4" /> Main Preview Image (Diagram)
                    </label>
                    <div className="flex gap-2">
                        <input 
                            className="flex-1 p-3 bg-black/20 border border-white/10 rounded-xl text-white outline-none focus:border-neon-sky/50 text-sm"
                            value={links.previewImage}
                            onChange={e => setLinks({...links, previewImage: e.target.value})}
                            placeholder="Image URL..."
                        />
                    </div>
                    {/* Simple File Upload Helper */}
                    <div className="relative overflow-hidden inline-block mt-2">
                        <button type="button" disabled={uploadingImage} className="bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded text-xs disabled:opacity-50">
                            {uploadingImage ? `Uploading... ${progressImage}%` : "Upload File"}
                        </button>
                        <input 
                            type="file" 
                            accept="image/*"
                            disabled={uploadingImage}
                            className="absolute inset-0 opacity-0 cursor-pointer disabled:cursor-not-allowed"
                            onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if(!file) return;
                                setUploadingImage(true);
                                setProgressImage(0);
                                try {
                                    const newBlob = await upload(file.name, file, {
                                        access: 'public',
                                        handleUploadUrl: '/api/upload',
                                        onUploadProgress: (progress) => setProgressImage(progress.percentage),
                                    });
                                    setLinks(prev => ({...prev, previewImage: newBlob.url}));
                                } catch(err: any) { 
                                    alert(`Upload failed: ${err.message}`); 
                                    console.error(err);
                                } finally {
                                    setUploadingImage(false);
                                }
                            }}
                        />
                    </div>
                </div>

                <div className="space-y-4">
                     <div className="space-y-2">
                        <label className="text-white/70 text-sm flex items-center gap-2">
                           Resource Download URL <span className="text-neon-sky text-xs">(Direct Link or Upload)</span>
                        </label>
                        <div className="flex gap-2">
                            <input 
                                className="flex-1 p-3 bg-black/20 border border-white/10 rounded-xl text-white outline-none focus:border-neon-sky/50"
                                value={links.jsonUrl}
                                onChange={e => setLinks({...links, jsonUrl: e.target.value})}
                                placeholder="Paste Google Drive/Dropbox/etc. Link Here"
                            />
                        </div>
                         {/* Resource File Upload Helper */}
                         <div className="relative overflow-hidden inline-block mt-2">
                            <button type="button" disabled={uploadingResource} className="bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded text-xs disabled:opacity-50">
                                {uploadingResource ? `Uploading... ${progressResource}%` : "Upload Resource File"}
                            </button>
                            <input 
                                type="file" 
                                accept=".json,.zip,.rar,.7z,.pdf,.csv,.txt,.xml,.yaml"
                                disabled={uploadingResource}
                                className="absolute inset-0 opacity-0 cursor-pointer disabled:cursor-not-allowed"
                                onChange={async (e) => {
                                    const file = e.target.files?.[0];
                                    if(!file) return;
                                    setUploadingResource(true);
                                    setProgressResource(0);
                                    try {
                                        const newBlob = await upload(file.name, file, {
                                            access: 'public',
                                            handleUploadUrl: '/api/upload',
                                            onUploadProgress: (progress) => setProgressResource(progress.percentage),
                                        });
                                        setLinks(prev => ({...prev, jsonUrl: newBlob.url}));
                                    } catch(err: any) { 
                                        alert(`Upload failed: ${err.message}`); 
                                        console.error(err);
                                    } finally {
                                        setUploadingResource(false);
                                    }
                                }}
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-white/70 text-sm">Video Demo URL</label>
                        <div className="flex gap-2">
                            <input 
                                className="w-full p-3 bg-black/20 border border-white/10 rounded-xl text-white outline-none focus:border-neon-sky/50"
                                value={links.videoUrl}
                                onChange={e => setLinks({...links, videoUrl: e.target.value})}
                                placeholder="Paste YouTube Link or Upload Video"
                            />
                        </div>
                        {/* Video File Upload Helper */}
                        <div className="relative overflow-hidden inline-block mt-2">
                            <button type="button" disabled={uploadingVideo} className="bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded text-xs disabled:opacity-50">
                                {uploadingVideo ? `Uploading... ${progressVideo}%` : "Upload Video File"}
                            </button>
                            <input 
                                type="file" 
                                accept="video/mp4,video/webm"
                                disabled={uploadingVideo}
                                className="absolute inset-0 opacity-0 cursor-pointer disabled:cursor-not-allowed"
                                onChange={async (e) => {
                                    const file = e.target.files?.[0];
                                    if(!file) return;
                                    setUploadingVideo(true);
                                    setProgressVideo(0);
                                    try {
                                        const newBlob = await upload(file.name, file, {
                                            access: 'public',
                                            handleUploadUrl: '/api/upload',
                                            onUploadProgress: (progress) => setProgressVideo(progress.percentage),
                                        });
                                        setLinks(prev => ({...prev, videoUrl: newBlob.url}));
                                    } catch(err: any) { 
                                        alert(`Upload failed: ${err.message}`); 
                                        console.error(err);
                                    } finally {
                                        setUploadingVideo(false);
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
            {links.previewImage && (
                <div className="mt-4 rounded-xl overflow-hidden border border-white/10 bg-black/40 h-48 w-full relative">
                    <img src={links.previewImage} alt="preview" className="w-full h-full object-contain" />
                </div>
            )}
        </section>

        {/* How It Works */}
        <section className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 space-y-6">
            <h2 className="text-xl font-bold text-white border-b border-white/10 pb-4">How it works</h2>
            <textarea 
                className="w-full p-4 bg-black/20 border border-white/10 rounded-xl text-white min-h-[150px] outline-none focus:border-neon-sky/50 leading-relaxed"
                value={howItWorks}
                onChange={e => setHowItWorks(e.target.value)}
                placeholder="Explain the workflow process..."
            />
        </section>

        {/* Key Features */}
        <section className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 space-y-6">
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <h2 className="text-xl font-bold text-white">Key Features</h2>
                <button 
                    type="button"
                    onClick={() => addField(setFeatures)}
                    className="px-3 py-1 bg-neon-sky/20 text-neon-sky rounded-lg text-sm hover:bg-neon-sky/30 transition-colors"
                >
                    + Add Feature
                </button>
            </div>
            <div className="space-y-4">
                {features.map((item, idx) => (
                    <div key={idx} className="flex gap-4 items-start p-4 bg-black/20 rounded-xl border border-white/5">
                        <div className="flex-1 space-y-2">
                            <input 
                                className="w-full p-2 bg-transparent border-b border-white/10 text-white font-bold placeholder-white/20 outline-none focus:border-neon-sky"
                                placeholder="Feature Title"
                                value={item.title}
                                onChange={e => updateField(idx, 'title', e.target.value, setFeatures, features)}
                            />
                            <textarea 
                                className="w-full p-2 bg-transparent text-white/70 text-sm placeholder-white/10 outline-none resize-none"
                                placeholder="Feature Description"
                                rows={2}
                                value={item.description}
                                onChange={e => updateField(idx, 'description', e.target.value, setFeatures, features)}
                            />
                        </div>
                        <button type="button" onClick={() => removeField(idx, setFeatures)} className="p-2 text-red-400 hover:bg-red-400/10 rounded">
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                ))}
            </div>
        </section>

        {/* Prerequisites */}
        <section className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 space-y-6">
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <h2 className="text-xl font-bold text-white">Prerequisites (선행 지식)</h2>
                <button 
                    type="button"
                    onClick={() => addField(setPrerequisites)}
                    className="px-3 py-1 bg-neon-sky/20 text-neon-sky rounded-lg text-sm hover:bg-neon-sky/30 transition-colors"
                >
                    + Add Item
                </button>
            </div>
            <div className="space-y-4">
                {prerequisites.map((item, idx) => (
                    <div key={idx} className="flex gap-4 items-start p-4 bg-black/20 rounded-xl border border-white/5">
                        <div className="flex-1 space-y-2">
                             <input 
                                className="w-full p-2 bg-transparent border-b border-white/10 text-white font-bold placeholder-white/20 outline-none focus:border-neon-sky"
                                placeholder="Item Title (e.g. Google Account)"
                                value={item.title}
                                onChange={e => updateField(idx, 'title', e.target.value, setPrerequisites, prerequisites)}
                            />
                            <textarea 
                                className="w-full p-2 bg-transparent text-white/70 text-sm placeholder-white/10 outline-none resize-none"
                                placeholder="Description"
                                rows={2}
                                value={item.description}
                                onChange={e => updateField(idx, 'description', e.target.value, setPrerequisites, prerequisites)}
                            />
                        </div>
                        <button type="button" onClick={() => removeField(idx, setPrerequisites)} className="p-2 text-red-400 hover:bg-red-400/10 rounded">
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                ))}
            </div>
        </section>

        {/* Step-by-Step */}
        <section className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 space-y-6">
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <h2 className="text-xl font-bold text-white">Step-by-step Guide</h2>
                <button 
                    type="button"
                    onClick={() => addField(setSteps)}
                    className="px-3 py-1 bg-neon-sky/20 text-neon-sky rounded-lg text-sm hover:bg-neon-sky/30 transition-colors"
                >
                    + Add Step
                </button>
            </div>
            <div className="space-y-4">
                {steps.map((item, idx) => (
                    <div key={idx} className="flex gap-4 items-start p-4 bg-black/20 rounded-xl border border-white/5">
                        <div className="pt-2 text-neon-sky font-bold font-mono text-lg w-8 text-center">{idx + 1}</div>
                        <div className="flex-1 space-y-2">
                             <input 
                                className="w-full p-2 bg-transparent border-b border-white/10 text-white font-bold placeholder-white/20 outline-none focus:border-neon-sky"
                                placeholder="Step Title"
                                value={item.title}
                                onChange={e => updateField(idx, 'title', e.target.value, setSteps, steps)}
                            />
                            <textarea 
                                className="w-full p-2 bg-transparent text-white/70 text-sm placeholder-white/10 outline-none resize-none"
                                placeholder="Step Description"
                                rows={2}
                                value={item.description}
                                onChange={e => updateField(idx, 'description', e.target.value, setSteps, steps)}
                            />
                        </div>
                        <button type="button" onClick={() => removeField(idx, setSteps)} className="p-2 text-red-400 hover:bg-red-400/10 rounded">
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                ))}
            </div>
        </section>

         {/* Actions */}
        <div className="flex items-center justify-end gap-4 pt-6 border-t border-white/10 sticky bottom-8 z-30">
            <button 
                type="submit" 
                disabled={loading}
                className="px-8 py-4 bg-gradient-to-r from-neon-sky to-blue-600 text-[#050B1B] rounded-xl hover:opacity-90 disabled:opacity-50 flex items-center gap-2 font-bold shadow-lg shadow-neon-sky/20 transition-all hover:-translate-y-0.5"
            >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                Update Automation
            </button>
        </div>

      </form>
    </div>
  );
}
