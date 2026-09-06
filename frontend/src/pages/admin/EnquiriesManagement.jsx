import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaEnvelope,
  FaCheck,
  FaClock,
  FaArrowLeft,
  FaInbox,
  FaUserCheck,
  FaSearch,
  FaDownload,
  FaTrash,
  FaWhatsapp,
  FaTimes,
  FaPaperPlane,
  FaCheckCircle,
  FaExclamationCircle,
} from 'react-icons/fa';
import API from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import { AdminEnquiriesSkeleton } from '../../components/SkeletonLoaders';

const EnquiriesManagement = () => {
  const { admin, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [emailSubject, setEmailSubject] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [emailSending, setEmailSending] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (!authLoading && !admin) {
      navigate('/admin/login');
      return;
    }
    if (admin) {
      fetchEnquiries();
    }
  }, [admin, authLoading, navigate]);

  const showToast = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      const res = await API.get('/enquiry/all');
      setEnquiries(res.data?.data || []);
    } catch (error) {
      console.error('Failed to load enquiries:', error);
      showToast('error', 'Failed to load customer enquiries.');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const res = await API.put(`/enquiry/${id}`, { status });
      if (res.data?.success) {
        showToast('success', `Status marked as ${status}`);
        setEnquiries((prev) =>
          prev.map((e) => (e._id === id ? { ...e, status } : e))
        );
      }
    } catch (error) {
      showToast('error', error.response?.data?.message || 'Unable to update status');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this enquiry?')) return;

    try {
      const res = await API.delete(`/enquiry/${id}`);
      if (res.data?.success) {
        showToast('success', 'Enquiry deleted.');
        setEnquiries((prev) => prev.filter((e) => e._id !== id));
      }
    } catch (error) {
      showToast('error', error.response?.data?.message || 'Unable to delete enquiry');
    }
  };

  const openEmailModal = (enquiry) => {
    setSelectedEnquiry(enquiry);
    setEmailSubject(`Elevatura Studio • Response to your Interior Design Inquiry`);
    setEmailMessage(
      `Hello ${enquiry.name},\n\nThank you for reaching out to Elevatura Design Studio regarding your project.\n\nWe would love to schedule a preliminary design discovery session to review your spatial layout, timeline, and aesthetic preferences.\n\nPlease let us know what day and time works best for an introductory consultation.\n\nWarm regards,\nTeam Elevatura`
    );
  };

  const handleSendEmail = async (e) => {
    e.preventDefault();
    if (!emailMessage.trim()) return;

    setEmailSending(true);
    try {
      const res = await API.post('/admin/send-email', {
        enquiryId: selectedEnquiry._id,
        subject: emailSubject,
        message: emailMessage,
      });

      if (res.data?.success) {
        showToast('success', `Email sent to ${selectedEnquiry.name}!`);
        setSelectedEnquiry(null);
        fetchEnquiries();
      }
    } catch (error) {
      showToast('error', error.response?.data?.message || 'Failed to send email. Ensure SMTP credentials are set in .env.');
    } finally {
      setEmailSending(false);
    }
  };

  const exportToCSV = () => {
    if (enquiries.length === 0) {
      showToast('error', 'No enquiries to export.');
      return;
    }

    const headers = ['Name', 'Email', 'Phone', 'Status', 'Date', 'Message'];
    const rows = enquiries.map((e) => [
      `"${e.name || ''}"`,
      `"${e.email || ''}"`,
      `"${e.phone || ''}"`,
      `"${e.status || 'Pending'}"`,
      `"${e.createdAt ? new Date(e.createdAt).toISOString() : ''}"`,
      `"${(e.message || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `elevatura_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('success', 'Leads exported to CSV successfully!');
  };

  const openWhatsApp = (enquiry) => {
    const rawPhone = (enquiry.phone || '').replace(/[^0-9]/g, '');
    const phoneWithCountry = rawPhone.length === 10 ? `91${rawPhone}` : rawPhone;
    const greeting = encodeURIComponent(
      `Hello ${enquiry.name}, this is Elevatura Interior Design Studio. Thank you for your inquiry regarding your project!`
    );
    window.open(`https://wa.me/${phoneWithCountry}?text=${greeting}`, '_blank');
  };

  const filteredEnquiries = enquiries.filter((enquiry) => {
    const matchesStatus = statusFilter === 'All' || (enquiry.status || 'Pending') === statusFilter;
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch =
      enquiry.name?.toLowerCase().includes(searchLower) ||
      enquiry.email?.toLowerCase().includes(searchLower) ||
      enquiry.phone?.toLowerCase().includes(searchLower) ||
      enquiry.message?.toLowerCase().includes(searchLower);
    return matchesStatus && matchesSearch;
  });

  const pendingCount = enquiries.filter((e) => (e.status || 'Pending') === 'Pending').length;
  const contactedCount = enquiries.filter((e) => e.status === 'Contacted').length;

  if (authLoading || loading) {
    return <AdminEnquiriesSkeleton />;
  }

  return (
    <div className="pt-20 lg:pt-6 bg-[#FCF9F7] min-h-screen text-[#2B1E16] pb-16">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-24 right-6 z-50 px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 text-sm font-semibold border ${
              notification.type === 'success'
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                : 'bg-red-50 text-red-800 border-red-200'
            }`}
          >
            {notification.type === 'success' ? <FaCheckCircle className="text-emerald-600 text-lg" /> : <FaExclamationCircle className="text-red-600 text-lg" />}
            <span>{notification.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C6A15B]" />
              <p className="text-xs uppercase tracking-[0.2em] text-[#C6A15B] font-bold">Client Intake CRM</p>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-1">Client Enquiries</h1>
            <p className="text-gray-500 text-sm mt-1">Track consultation leads, send custom email replies, and connect via WhatsApp</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={exportToCSV}
              className="inline-flex items-center gap-2 bg-white border border-[#eadfce] hover:bg-[#F8F1E6] text-[#2B1E16] px-4 py-2.5 rounded-full text-xs font-bold transition shadow-sm cursor-pointer"
            >
              <FaDownload className="text-[#C6A15B]" /> Export CSV
            </button>
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="inline-flex items-center gap-2 bg-[#2B1E16] text-white px-4 py-2.5 rounded-full text-xs font-bold hover:bg-neutral-800 transition shadow-sm cursor-pointer"
            >
              <FaArrowLeft className="text-[10px]" /> Dashboard
            </button>
          </div>
        </div>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white border border-[#eadfce] rounded-3xl p-5 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Total Enquiries</p>
              <p className="text-3xl font-extrabold text-[#2B1E16] mt-1">{enquiries.length}</p>
            </div>
            <span className="w-12 h-12 rounded-2xl bg-[#F7EEDC] text-[#C6A15B] flex items-center justify-center text-xl">
              <FaInbox />
            </span>
          </div>

          <div className="bg-white border border-[#eadfce] rounded-3xl p-5 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Awaiting Response</p>
              <p className="text-3xl font-extrabold text-[#2B1E16] mt-1">{pendingCount}</p>
            </div>
            <span className="w-12 h-12 rounded-2xl bg-yellow-100 text-yellow-700 flex items-center justify-center text-xl">
              <FaClock />
            </span>
          </div>

          <div className="bg-white border border-[#eadfce] rounded-3xl p-5 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Successfully Contacted</p>
              <p className="text-3xl font-extrabold text-[#2B1E16] mt-1">{contactedCount}</p>
            </div>
            <span className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-xl">
              <FaUserCheck />
            </span>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white rounded-3xl border border-[#eadfce] p-4 sm:p-5 mb-6 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            <input
              type="text"
              placeholder="Search by client name, email, phone or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#C6A15B] outline-none text-xs"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {['All', 'Pending', 'Contacted'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition whitespace-nowrap ${
                  statusFilter === status
                    ? 'bg-[#C6A15B] text-white shadow-sm'
                    : 'bg-[#FCF9F7] text-[#2B1E16] hover:bg-[#F8F1E6]'
                }`}
              >
                {status} ({status === 'All' ? enquiries.length : enquiries.filter((e) => (e.status || 'Pending') === status).length})
              </button>
            ))}
          </div>
        </div>

        {/* Enquiries Table */}
        <div className="bg-white rounded-3xl border border-[#eadfce] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] text-left text-sm">
              <thead className="bg-[#2B1E16] text-white text-xs uppercase tracking-wider">
                <tr>
                  <th className="p-4 pl-6">Client Name</th>
                  <th className="p-4">Contact Info</th>
                  <th className="p-4">Brief / Project Scope</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Received</th>
                  <th className="p-4 pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0ebe4]">
                {filteredEnquiries.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="p-12 text-center text-gray-400 text-sm">
                      No matching client enquiries found.
                    </td>
                  </tr>
                ) : (
                  filteredEnquiries.map((enquiry) => (
                    <tr key={enquiry._id} className="hover:bg-[#FCF9F7] transition align-top">
                      <td className="p-4 pl-6 font-bold text-[#2B1E16]">
                        {enquiry.name}
                      </td>

                      <td className="p-4 text-xs">
                        <div className="font-semibold text-gray-700">{enquiry.email}</div>
                        <div className="text-[#C6A15B] font-bold mt-0.5">{enquiry.phone}</div>
                      </td>

                      <td className="p-4 max-w-sm text-xs text-gray-600">
                        <p className="line-clamp-3 leading-relaxed">{enquiry.message}</p>
                      </td>

                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                          enquiry.status === 'Contacted'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {enquiry.status === 'Contacted' ? <FaCheck className="text-[10px]" /> : <FaClock className="text-[10px]" />}
                          {enquiry.status || 'Pending'}
                        </span>
                      </td>

                      <td className="p-4 text-xs text-gray-400">
                        {enquiry.createdAt
                          ? new Date(enquiry.createdAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })
                          : 'Recent'}
                      </td>

                      <td className="p-4 pr-6 text-right">
                        <div className="flex items-center justify-end gap-1.5 flex-wrap">
                          
                          {/* WhatsApp Direct */}
                          <button
                            onClick={() => openWhatsApp(enquiry)}
                            title="Chat on WhatsApp"
                            className="w-8 h-8 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-600 flex items-center justify-center text-sm transition shadow-sm cursor-pointer"
                          >
                            <FaWhatsapp />
                          </button>

                          {/* Email In-App Reply */}
                          <button
                            onClick={() => openEmailModal(enquiry)}
                            title="Send Email Reply"
                            className="w-8 h-8 rounded-xl bg-[#F7EEDC] hover:bg-[#F0E1BA] text-[#2B1E16] flex items-center justify-center text-sm transition shadow-sm cursor-pointer"
                          >
                            <FaEnvelope />
                          </button>

                          {/* Toggle Status */}
                          <button
                            onClick={() => updateStatus(enquiry._id, enquiry.status === 'Contacted' ? 'Pending' : 'Contacted')}
                            title={enquiry.status === 'Contacted' ? 'Revert to Pending' : 'Mark as Contacted'}
                            className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                              enquiry.status === 'Contacted'
                                ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                : 'bg-[#C6A15B] text-white hover:bg-[#b08d4a]'
                            }`}
                          >
                            <FaCheck className="text-[10px]" />
                            {enquiry.status === 'Contacted' ? 'Pending' : 'Contacted'}
                          </button>

                          {/* Delete Lead */}
                          <button
                            onClick={() => handleDelete(enquiry._id)}
                            title="Delete Lead"
                            className="w-8 h-8 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 flex items-center justify-center text-xs transition cursor-pointer"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* In-App Email Response Modal */}
      <AnimatePresence>
        {selectedEnquiry && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl border border-[#eadfce]"
            >
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
                <div>
                  <span className="text-[#C6A15B] text-xs font-bold uppercase tracking-wider">Direct Studio Response</span>
                  <h3 className="text-xl font-bold text-[#2B1E16] mt-0.5">
                    Email to {selectedEnquiry.name}
                  </h3>
                  <p className="text-xs text-gray-400">{selectedEnquiry.email}</p>
                </div>
                <button
                  onClick={() => setSelectedEnquiry(null)}
                  className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition"
                >
                  <FaTimes />
                </button>
              </div>

              <form onSubmit={handleSendEmail} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                    Subject Line
                  </label>
                  <input
                    type="text"
                    required
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C6A15B] outline-none text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                    Message Body
                  </label>
                  <textarea
                    required
                    rows="8"
                    value={emailMessage}
                    onChange={(e) => setEmailMessage(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C6A15B] outline-none text-sm resize-none font-sans"
                  />
                </div>

                <div className="p-3 bg-[#FCF9F7] rounded-xl border border-[#eadfce] text-xs text-gray-500">
                  <strong>Original Brief:</strong> {selectedEnquiry.message}
                </div>

                <div className="flex items-center justify-end gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setSelectedEnquiry(null)}
                    className="px-5 py-2.5 rounded-full border border-gray-200 text-gray-600 text-sm font-semibold hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={emailSending}
                    className="px-6 py-2.5 rounded-full bg-[#C6A15B] text-white text-sm font-bold hover:bg-[#b08d4a] transition flex items-center gap-2 shadow-md disabled:opacity-70 cursor-pointer"
                  >
                    {emailSending ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <span>Dispatch Email</span>
                        <FaPaperPlane className="text-xs" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default EnquiriesManagement;

