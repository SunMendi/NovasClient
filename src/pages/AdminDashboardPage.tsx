import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { NovasLogo } from "../components/common/NovasLogo";
import { Button } from "../components/ui/button";
import { authService, AuthUser } from "../services/auth";
import { API_BASE_URL } from "../services/api";
import {
  ShieldCheck,
  Cloud,
  UploadCloud,
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
  Layers,
  Ship,
  Briefcase,
  Database,
  Plus,
  Trash2,
  RefreshCw,
  LogOut,
  AlertCircle,
  Eye,
  Server,
  FileText,
  Search,
  Sparkles,
  ArrowRight
} from "lucide-react";

export const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [activeTab, setActiveTab] = useState<"media" | "products" | "vessels" | "projects" | "system">("media");

  // Authentication guard
  useEffect(() => {
    const user = authService.getCurrentUser();
    if (!user || !authService.isAuthenticated()) {
      navigate("/login", { replace: true });
    } else {
      setCurrentUser(user);
    }
  }, [navigate]);

  const handleLogout = () => {
    authService.logout();
    navigate("/login", { replace: true });
  };

  // --- 1. MEDIA UPLOADER STATE ---
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);
  const [uploadFolder, setUploadFolder] = useState("novas/products");
  const [uploading, setUploading] = useState(false);
  const [uploadSuccessUrl, setUploadSuccessUrl] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [recentUploads, setRecentUploads] = useState<string[]>(() => {
    const saved = localStorage.getItem("novas_recent_uploads");
    return saved ? JSON.parse(saved) : [];
  });
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadFile(file);
      setUploadPreview(URL.createObjectURL(file));
      setUploadSuccessUrl(null);
      setUploadError(null);
    }
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFile) return;

    setUploading(true);
    setUploadError(null);

    try {
      const url = await authService.uploadImage(uploadFile, uploadFolder);
      setUploadSuccessUrl(url);
      setUploadFile(null);
      setUploadPreview(null);
      const updated = [url, ...recentUploads.filter((u) => u !== url)].slice(0, 12);
      setRecentUploads(updated);
      localStorage.setItem("novas_recent_uploads", JSON.stringify(updated));
    } catch (err: any) {
      setUploadError(err.message || "Failed to upload image to Cloudinary.");
    } finally {
      setUploading(false);
    }
  };

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2500);
  };

  // --- 2. PRODUCTS STATE ---
  const [products, setProducts] = useState<any[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [productSearch, setProductSearch] = useState("");
  const [showProductModal, setShowProductModal] = useState(false);
  const [productForm, setProductForm] = useState({
    sku: "",
    slug: "",
    name: "",
    category_slug: "defense-tactical",
    sector_id: "defence",
    tagline: "",
    description: "",
    featured: false,
    lead_time: "4-6 Weeks",
    origin: "Sweden / NATO",
    warranty: "3 Years",
    image_url: "",
  });
  const [creatingProduct, setCreatingProduct] = useState(false);
  const [productMessage, setProductMessage] = useState<string | null>(null);

  const fetchProducts = async () => {
    setLoadingProducts(true);
    try {
      const res = await fetch(`${API_BASE_URL}/catalog/products/`);
      if (res.ok) {
        const json = await res.json();
        setProducts(json.data || []);
      }
    } catch (err) {
      console.warn("Failed to fetch products:", err);
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    if (activeTab === "products") {
      fetchProducts();
    }
  }, [activeTab]);

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreatingProduct(true);
    setProductMessage(null);

    const token = authService.getToken();
    try {
      const res = await fetch(`${API_BASE_URL}/catalog/products/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
          Accept: "application/json",
        },
        body: JSON.stringify(productForm),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to create product");
      }

      setProductMessage("Product created successfully!");
      setShowProductModal(false);
      fetchProducts();
      setProductForm({
        sku: "",
        slug: "",
        name: "",
        category_slug: "defense-tactical",
        sector_id: "defence",
        tagline: "",
        description: "",
        featured: false,
        lead_time: "4-6 Weeks",
        origin: "Sweden / NATO",
        warranty: "3 Years",
        image_url: "",
      });
    } catch (err: any) {
      setProductMessage(err.message || "Error creating product");
    } finally {
      setCreatingProduct(false);
    }
  };

  if (!currentUser) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#f8f9fc] text-[#133057]">
      {/* Top Admin Navigation Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200/90 bg-white shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center">
              <NovasLogo variant="navy" height={36} showSubtitle={false} />
            </Link>
            <span className="hidden sm:inline-block h-5 w-px bg-slate-200" />
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#133057]/5 text-xs font-bold text-[#133057]">
              <ShieldCheck className="size-3.5 text-[#ed145b]" />
              <span>Admin Console</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* View Live Site */}
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-[#133057] px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <span>View Website</span>
              <ExternalLink className="size-3.5" />
            </a>

            {/* User Chip */}
            <div className="flex items-center gap-2 pl-3 border-l border-slate-200">
              <div className="size-8 rounded-full bg-[#133057] text-white flex items-center justify-center font-bold text-xs">
                {currentUser.username.charAt(0).toUpperCase()}
              </div>
              <div className="hidden md:block text-left text-xs">
                <p className="font-bold text-[#133057] truncate max-w-[140px]">{currentUser.username}</p>
                <p className="text-[10px] text-emerald-600 font-semibold uppercase">Superuser</p>
              </div>
            </div>

            {/* Logout Button */}
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="gap-1.5 border-slate-200 text-slate-600 hover:text-rose-600 hover:bg-rose-50 hover:border-rose-200 text-xs font-bold rounded-lg h-9 px-3"
            >
              <LogOut className="size-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Admin Workspace Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3 mb-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab("media")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all whitespace-nowrap ${
              activeTab === "media"
                ? "bg-[#133057] text-white shadow-md shadow-[#133057]/20"
                : "text-slate-600 hover:bg-slate-200/60"
            }`}
          >
            <Cloud className="size-4" />
            <span>Cloudinary Media Center</span>
          </button>

          <button
            onClick={() => setActiveTab("products")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all whitespace-nowrap ${
              activeTab === "products"
                ? "bg-[#133057] text-white shadow-md shadow-[#133057]/20"
                : "text-slate-600 hover:bg-slate-200/60"
            }`}
          >
            <Layers className="size-4" />
            <span>Products & Equipment</span>
          </button>

          <button
            onClick={() => setActiveTab("system")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all whitespace-nowrap ${
              activeTab === "system"
                ? "bg-[#133057] text-white shadow-md shadow-[#133057]/20"
                : "text-slate-600 hover:bg-slate-200/60"
            }`}
          >
            <Server className="size-4" />
            <span>System & Cloud CMS</span>
          </button>
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: CLOUDINARY MEDIA CENTER                                            */}
        {/* ========================================================================= */}
        {activeTab === "media" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Upload Box */}
            <div className="lg:col-span-6 space-y-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-xs">
                <div className="flex items-center gap-2.5 text-[#133057] mb-2">
                  <div className="size-9 rounded-lg bg-[#ed145b]/10 text-[#ed145b] flex items-center justify-center font-bold">
                    <UploadCloud className="size-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-black text-[#133057]">Upload Media to Cloudinary</h2>
                    <p className="text-xs text-slate-500">
                      Images are instantly stored on Cloudinary CDN and deliverable to your site
                    </p>
                  </div>
                </div>

                {uploadSuccessUrl && (
                  <div className="mt-4 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 space-y-2">
                    <div className="flex items-center gap-2 font-bold text-sm">
                      <CheckCircle2 className="size-4.5 text-emerald-600" />
                      <span>Upload Successful!</span>
                    </div>
                    <p className="text-xs text-emerald-700 break-all font-mono bg-white/70 p-2 rounded border border-emerald-200">
                      {uploadSuccessUrl}
                    </p>
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => handleCopyUrl(uploadSuccessUrl)}
                      className="gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs h-8"
                    >
                      {copiedUrl === uploadSuccessUrl ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                      <span>{copiedUrl === uploadSuccessUrl ? "Copied URL!" : "Copy Cloudinary URL"}</span>
                    </Button>
                  </div>
                )}

                {uploadError && (
                  <div className="mt-4 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-start gap-2.5">
                    <AlertCircle className="size-5 text-rose-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold">Upload Failed</p>
                      <p className="text-xs mt-0.5">{uploadError}</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleUploadSubmit} className="mt-6 space-y-5">
                  {/* Folder Selector */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Target Cloudinary Folder
                    </label>
                    <select
                      value={uploadFolder}
                      onChange={(e) => setUploadFolder(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm font-semibold text-[#133057] focus:border-[#ed145b] focus:outline-none focus:ring-2 focus:ring-[#ed145b]/20"
                    >
                      <option value="novas/products">novas/products (Equipment & Gear)</option>
                      <option value="novas/vessels">novas/vessels (Naval Ships & Workboats)</option>
                      <option value="novas/projects">novas/projects (Turnkey Projects)</option>
                      <option value="novas/banners">novas/banners (Homepage & Page Slides)</option>
                      <option value="novas/company">novas/company (Leadership & Profile)</option>
                    </select>
                  </div>

                  {/* Drag and Drop File Input */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Choose Image File
                    </label>
                    <div className="relative border-2 border-dashed border-slate-300 hover:border-[#ed145b] rounded-2xl p-6 text-center transition-colors bg-slate-50/50 hover:bg-[#ed145b]/5">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      {uploadPreview ? (
                        <div className="space-y-3">
                          <img
                            src={uploadPreview}
                            alt="Upload preview"
                            className="max-h-48 mx-auto rounded-lg object-contain border border-slate-200 shadow-sm"
                          />
                          <p className="text-xs font-bold text-[#133057]">{uploadFile?.name}</p>
                          <span className="text-[11px] text-slate-400">Click to pick a different image</span>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <div className="size-12 rounded-full bg-white shadow-xs border border-slate-200 flex items-center justify-center mx-auto text-slate-400">
                            <UploadCloud className="size-6 text-[#ed145b]" />
                          </div>
                          <p className="text-sm font-bold text-[#133057]">
                            Drop your image here, or <span className="text-[#ed145b]">browse</span>
                          </p>
                          <p className="text-xs text-slate-400">PNG, JPG, WebP, SVG supported</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Upload Action */}
                  <Button
                    type="submit"
                    disabled={!uploadFile || uploading}
                    className="w-full gap-2 bg-[#ed145b] hover:bg-[#d00f4e] text-white font-bold h-11 rounded-xl shadow-md shadow-[#ed145b]/20"
                  >
                    {uploading ? (
                      <div className="flex items-center gap-2">
                        <RefreshCw className="size-4 animate-spin" />
                        <span>Uploading to Cloudinary CDN...</span>
                      </div>
                    ) : (
                      <>
                        <UploadCloud className="size-4.5" />
                        <span>Upload to Cloudinary</span>
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>

            {/* Right: Media History */}
            <div className="lg:col-span-6 space-y-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-black text-[#133057]">Recent Cloudinary Uploads</h3>
                  <span className="text-xs text-slate-400 font-semibold">{recentUploads.length} images saved</span>
                </div>

                {recentUploads.length === 0 ? (
                  <div className="text-center py-12 px-4 border border-dashed border-slate-200 rounded-xl">
                    <Cloud className="size-10 text-slate-300 mx-auto mb-2" />
                    <p className="text-sm font-bold text-slate-600">No uploads recorded yet</p>
                    <p className="text-xs text-slate-400 mt-1">
                      Uploaded images will appear here with one-click copy links
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {recentUploads.map((url, i) => (
                      <div
                        key={i}
                        className="group relative rounded-xl border border-slate-200 overflow-hidden bg-slate-50 hover:shadow-md transition-all"
                      >
                        <img src={url} alt={`Upload ${i}`} className="w-full h-28 object-cover" />
                        <div className="p-2 bg-white flex items-center justify-between">
                          <button
                            type="button"
                            onClick={() => handleCopyUrl(url)}
                            className="w-full flex items-center justify-center gap-1.5 text-[11px] font-bold py-1 px-2 rounded bg-slate-100 hover:bg-[#ed145b] hover:text-white transition-colors"
                          >
                            {copiedUrl === url ? <Check className="size-3" /> : <Copy className="size-3" />}
                            <span>{copiedUrl === url ? "Copied!" : "Copy URL"}</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: PRODUCTS MANAGER                                                   */}
        {/* ========================================================================= */}
        {activeTab === "products" && (
          <div className="space-y-6">
            {/* Header / Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200">
              <div className="relative flex-1 max-w-md">
                <Search className="size-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search products by SKU, name, or description..."
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 pl-10 pr-4 py-2 text-sm focus:border-[#ed145b] focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <Button
                  onClick={fetchProducts}
                  variant="outline"
                  size="sm"
                  className="gap-1.5 border-slate-200 text-xs font-bold"
                >
                  <RefreshCw className={`size-3.5 ${loadingProducts ? "animate-spin" : ""}`} />
                  <span>Refresh</span>
                </Button>

                <Button
                  onClick={() => setShowProductModal(true)}
                  className="gap-1.5 bg-[#ed145b] hover:bg-[#d00f4e] text-white text-xs font-bold"
                >
                  <Plus className="size-4" />
                  <span>Add Product</span>
                </Button>
              </div>
            </div>

            {/* Products Table */}
            <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-bold">
                    <tr>
                      <th className="px-6 py-3.5">Equipment / Item</th>
                      <th className="px-6 py-3.5">SKU / Identifier</th>
                      <th className="px-6 py-3.5">Category</th>
                      <th className="px-6 py-3.5">Origin / Lead Time</th>
                      <th className="px-6 py-3.5">Cloudinary Image</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {products
                      .filter(
                        (p) =>
                          p.name?.toLowerCase().includes(productSearch.toLowerCase()) ||
                          p.sku?.toLowerCase().includes(productSearch.toLowerCase())
                      )
                      .map((product) => (
                        <tr key={product.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              {product.image_url ? (
                                <img
                                  src={product.image_url}
                                  alt={product.name}
                                  className="size-10 rounded-lg object-cover border border-slate-200"
                                />
                              ) : (
                                <div className="size-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400">
                                  <Layers className="size-5" />
                                </div>
                              )}
                              <div>
                                <span className="font-bold text-[#133057] block">{product.name}</span>
                                <span className="text-xs text-slate-400 truncate max-w-xs block">
                                  {product.tagline || product.description?.slice(0, 50)}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 font-mono text-xs font-bold text-slate-700">{product.sku}</td>
                          <td className="px-6 py-4 text-xs font-semibold text-slate-600">
                            {product.category?.name || "General"}
                          </td>
                          <td className="px-6 py-4 text-xs text-slate-600">
                            <span className="block font-medium">{product.origin || "International"}</span>
                            <span className="text-slate-400 text-[11px]">{product.lead_time || "In stock"}</span>
                          </td>
                          <td className="px-6 py-4 text-xs font-mono">
                            {product.image_url ? (
                              <button
                                onClick={() => handleCopyUrl(product.image_url)}
                                className="flex items-center gap-1.5 text-xs text-[#ed145b] hover:underline"
                              >
                                <Copy className="size-3" />
                                <span>Copy URL</span>
                              </button>
                            ) : (
                              <span className="text-slate-400">No Image</span>
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Modal: Add New Product */}
        {showProductModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 overflow-y-auto">
            <div className="w-full max-w-xl bg-white rounded-2xl p-6 sm:p-8 shadow-2xl space-y-5 my-8">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h3 className="text-lg font-black text-[#133057]">Add New Catalog Product</h3>
                <button
                  onClick={() => setShowProductModal(false)}
                  className="text-slate-400 hover:text-slate-700 text-lg font-bold"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateProduct} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">SKU *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. DEF-RAD-009"
                      value={productForm.sku}
                      onChange={(e) => setProductForm({ ...productForm, sku: e.target.value })}
                      className="w-full rounded-xl border border-slate-300 p-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Slug *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. tactical-radar-system"
                      value={productForm.slug}
                      onChange={(e) => setProductForm({ ...productForm, slug: e.target.value })}
                      className="w-full rounded-xl border border-slate-300 p-2 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Product Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Multi-Beam Coastal Surveillance Radar"
                    value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 p-2 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Tagline</label>
                  <input
                    type="text"
                    placeholder="e.g. High-frequency surveillance with 40NM detection"
                    value={productForm.tagline}
                    onChange={(e) => setProductForm({ ...productForm, tagline: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 p-2 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Description *</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Detailed tactical and mission specifications..."
                    value={productForm.description}
                    onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 p-2 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Cloudinary Image URL (or paste any URL)
                  </label>
                  <input
                    type="url"
                    placeholder="https://res.cloudinary.com/..."
                    value={productForm.image_url}
                    onChange={(e) => setProductForm({ ...productForm, image_url: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 p-2 text-sm"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    Tip: Upload in the Cloudinary tab first, copy the URL, and paste it here!
                  </p>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowProductModal(false)}
                    className="text-xs font-bold"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={creatingProduct}
                    className="bg-[#ed145b] hover:bg-[#d00f4e] text-white font-bold text-xs"
                  >
                    {creatingProduct ? "Creating..." : "Save Product"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: SYSTEM & CLOUD STATUS                                              */}
        {/* ========================================================================= */}
        {activeTab === "system" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4">
              <h3 className="text-lg font-black text-[#133057]">Infrastructure Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-xs font-bold text-slate-600">PostgreSQL Database</span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                    <CheckCircle2 className="size-3.5" />
                    Railway Production
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-xs font-bold text-slate-600">Media CDN Storage</span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                    <CheckCircle2 className="size-3.5" />
                    Cloudinary Active
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-xs font-bold text-slate-600">API Endpoint</span>
                  <span className="text-xs font-mono text-slate-500">railway.app</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4">
              <h3 className="text-lg font-black text-[#133057]">Full Database Backstage</h3>
              <p className="text-xs text-slate-500">
                You can also access the full Django CMS to manage raw database tables, users, and permissions.
              </p>
              <a
                href="https://novas-backend-production.up.railway.app/admin/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#133057] text-white font-bold text-xs hover:bg-[#0e2442] transition-colors"
              >
                <span>Open Django Backstage CMS</span>
                <ExternalLink className="size-3.5" />
              </a>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
