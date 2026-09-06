// src/pages/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { FaEnvelope, FaTrash, FaEdit, FaPlus } from 'react-icons/fa';

const AdminDashboard = () => {
  const { admin, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('enquiries');
  const [stats, setStats] = useState({
    totalEnquiries: 0,
    portfolioItems: 0,
    unreadMessages: 0,
    settings: 1,
  });
  const [enquiries, setEnquiries] = useState([]);
  const [posts, setPosts] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);

  // ---- Fetch Data ----
  useEffect(() => {
    if (!authLoading && !admin) {
      navigate('/admin/login');
      return;
    }
    fetchData();
  }, [activeTab, admin, authLoading]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const statsRes = await API.get('/admin/stats');
      setStats({
        totalEnquiries: statsRes.data?.data?.totalEnquiries || 0,
        portfolioItems: statsRes.data?.data?.portfolioItems || 0,
        unreadMessages: statsRes.data?.data?.unreadMessages || 0,
        settings: statsRes.data?.data?.settings || 1,
      });

      if (activeTab === 'enquiries') {
        const res = await API.get('/enquiry/all');
        setEnquiries(res.data.data);
      } else if (activeTab === 'posts') {
        const res = await API.get('/posts');
        setPosts(res.data.data);
      } else if (activeTab === 'gallery') {
        const res = await API.get('/gallery');
        setGallery(res.data.data);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
    setLoading(false);
  };

  // ---- Send Email ----
  const sendEmail = async (enquiryId, clientEmail, clientName) => {
    const message = prompt(`Send email to ${clientName} (${clientEmail}):\n\nType your message below:`);
    if (!message) return;
    try {
      await API.post('/admin/send-email', { enquiryId, subject: 'Response to your enquiry', message });
      alert('✅ Email sent successfully!');
      fetchData(); // Refresh
    } catch (error) {
      alert('❌ Failed to send email');
    }
  };

  // ---- Delete Post ----
  const deletePost = async (id) => {
    if (!window.confirm('Delete this post?')) return;
    await API.delete(`/posts/${id}`);
    fetchData();
  };

  // ---- Delete Gallery ----
  const deleteGallery = async (id) => {
    if (!window.confirm('Delete this image?')) return;
    await API.delete(`/gallery/${id}`);
    fetchData();
  };

  // ---- Add Post / Gallery (Modal Logic - Simplified) ----
  const [showPostModal, setShowPostModal] = useState(false);
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', slug: '', category: '', description: '', content: '', featuredImage: '' });
  const [newGallery, setNewGallery] = useState({ title: '', category: '', imageUrl: '' });

  const handleAddPost = async (e) => {
    e.preventDefault();
    await API.post('/posts', newPost);
    setShowPostModal(false);
    setNewPost({ title: '', slug: '', category: '', description: '', content: '', featuredImage: '' });
    fetchData();
  };

  const handleAddGallery = async (e) => {
    e.preventDefault();
    await API.post('/gallery', newGallery);
    setShowGalleryModal(false);
    setNewGallery({ title: '', category: '', imageUrl: '' });
    fetchData();
  };

  if (authLoading || loading) return <div className="pt-32 text-center">Loading...</div>;

  return (
    <div className="pt-24 px-4 sm:px-6 lg:px-8 bg-[#FCF9F7] min-h-screen w-full">
      <div className="w-full max-w-[1600px] mx-auto">
        <h1 className="text-3xl font-bold text-[#2B1E16] mb-2">Welcome, {admin?.name}!</h1>
        <p className="text-gray-500 mb-6">Manage your interior design website</p>

        {/* Tabs */}
        <div className="flex gap-4 border-b mb-6 pb-2">
          <button onClick={() => setActiveTab('enquiries')} className={`px-4 py-2 font-semibold ${activeTab === 'enquiries' ? 'text-[#C6A15B] border-b-2 border-[#C6A15B]' : 'text-gray-500'}`}>Enquiries</button>
          <button onClick={() => setActiveTab('posts')} className={`px-4 py-2 font-semibold ${activeTab === 'posts' ? 'text-[#C6A15B] border-b-2 border-[#C6A15B]' : 'text-gray-500'}`}>Blog Posts</button>
          <button onClick={() => setActiveTab('gallery')} className={`px-4 py-2 font-semibold ${activeTab === 'gallery' ? 'text-[#C6A15B] border-b-2 border-[#C6A15B]' : 'text-gray-500'}`}>Gallery</button>
        </div>

        {/* ========== ENQUIRIES TAB ========== */}
        {activeTab === 'enquiries' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white p-4 rounded-xl shadow">Total: {stats.totalEnquiries}</div>
              <div className="bg-white p-4 rounded-xl shadow">Pending: {enquiries.filter(e => e.status === 'Pending').length}</div>
              <div className="bg-white p-4 rounded-xl shadow">Contacted: {enquiries.filter(e => e.status === 'Contacted').length}</div>
            </div>
            <div className="bg-white rounded-xl shadow overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-[#2B1E16] text-white">
                  <tr>
                    <th className="p-4">Name</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Phone</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {enquiries.map((enq) => (
                    <tr key={enq._id} className="border-b hover:bg-gray-50">
                      <td className="p-4 font-medium">{enq.name}</td>
                      <td className="p-4">{enq.email}</td>
                      <td className="p-4">{enq.phone}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${enq.status === 'Pending' ? 'bg-yellow-200 text-yellow-800' : enq.status === 'Contacted' ? 'bg-green-200 text-green-800' : 'bg-blue-200 text-blue-800'}`}>
                          {enq.status}
                        </span>
                      </td>
                      <td className="p-4 flex gap-2">
                        <button onClick={() => sendEmail(enq._id, enq.email, enq.name)} className="bg-[#C6A15B] text-white px-3 py-1 rounded flex items-center gap-1 text-sm hover:bg-[#A8874A]">
                          <FaEnvelope /> Contact
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========== POSTS TAB ========== */}
        {activeTab === 'posts' && (
          <div>
            <button onClick={() => setShowPostModal(true)} className="bg-[#2B1E16] text-white px-4 py-2 rounded-lg mb-4 flex items-center gap-2 hover:bg-[#C6A15B] transition">
              <FaPlus /> Add New Post
            </button>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {posts.map((post) => (
                <div key={post._id} className="bg-white rounded-xl shadow overflow-hidden">
                  <img src={post.featuredImage} alt={post.title} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="font-bold text-lg">{post.title}</h3>
                    <p className="text-sm text-gray-500">{post.category}</p>
                    <div className="flex justify-between mt-3">
                      <button className="text-blue-500"><FaEdit /></button>
                      <button onClick={() => deletePost(post._id)} className="text-red-500"><FaTrash /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Add Post Modal */}
            {showPostModal && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                  <h2 className="text-2xl font-bold mb-4">Add New Post</h2>
                  <form onSubmit={handleAddPost}>
                    <input className="w-full p-3 border rounded mb-3" placeholder="Title" value={newPost.title} onChange={(e) => setNewPost({...newPost, title: e.target.value})} required />
                    <input className="w-full p-3 border rounded mb-3" placeholder="Slug (e.g. modern-living-room)" value={newPost.slug} onChange={(e) => setNewPost({...newPost, slug: e.target.value})} required />
                    <input className="w-full p-3 border rounded mb-3" placeholder="Category" value={newPost.category} onChange={(e) => setNewPost({...newPost, category: e.target.value})} required />
                    <textarea className="w-full p-3 border rounded mb-3" placeholder="Description" rows="2" value={newPost.description} onChange={(e) => setNewPost({...newPost, description: e.target.value})} required />
                    <textarea className="w-full p-3 border rounded mb-3" placeholder="Full Content (HTML allowed)" rows="4" value={newPost.content} onChange={(e) => setNewPost({...newPost, content: e.target.value})} required />
                    <input className="w-full p-3 border rounded mb-3" placeholder="Image URL (Cloudinary / any URL)" value={newPost.featuredImage} onChange={(e) => setNewPost({...newPost, featuredImage: e.target.value})} required />
                    <div className="flex gap-3">
                      <button type="submit" className="bg-[#C6A15B] text-white px-6 py-2 rounded">Save</button>
                      <button type="button" onClick={() => setShowPostModal(false)} className="bg-gray-300 px-6 py-2 rounded">Cancel</button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========== GALLERY TAB ========== */}
        {activeTab === 'gallery' && (
          <div>
            <button onClick={() => setShowGalleryModal(true)} className="bg-[#2B1E16] text-white px-4 py-2 rounded-lg mb-4 flex items-center gap-2 hover:bg-[#C6A15B] transition">
              <FaPlus /> Add Image
            </button>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {gallery.map((item) => (
                <div key={item._id} className="bg-white rounded-xl shadow overflow-hidden group relative">
                  <img src={item.imageUrl} alt={item.title} className="w-full h-48 object-cover" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                    <button onClick={() => deleteGallery(item._id)} className="bg-red-500 text-white p-2 rounded-full">
                      <FaTrash />
                    </button>
                  </div>
                  <div className="p-2 text-center">
                    <p className="font-semibold text-sm">{item.title}</p>
                    <p className="text-xs text-gray-500">{item.category}</p>
                  </div>
                </div>
              ))}
            </div>
            {/* Add Gallery Modal */}
            {showGalleryModal && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-2xl w-full max-w-md">
                  <h2 className="text-2xl font-bold mb-4">Add Gallery Image</h2>
                  <form onSubmit={handleAddGallery}>
                    <input className="w-full p-3 border rounded mb-3" placeholder="Title" value={newGallery.title} onChange={(e) => setNewGallery({...newGallery, title: e.target.value})} required />
                    <input className="w-full p-3 border rounded mb-3" placeholder="Category (e.g. Modern, Luxury)" value={newGallery.category} onChange={(e) => setNewGallery({...newGallery, category: e.target.value})} required />
                    <input className="w-full p-3 border rounded mb-3" placeholder="Image URL" value={newGallery.imageUrl} onChange={(e) => setNewGallery({...newGallery, imageUrl: e.target.value})} required />
                    <div className="flex gap-3">
                      <button type="submit" className="bg-[#C6A15B] text-white px-6 py-2 rounded">Save</button>
                      <button type="button" onClick={() => setShowGalleryModal(false)} className="bg-gray-300 px-6 py-2 rounded">Cancel</button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;