import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  User, 
  Mail, 
  Lock, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  KeyRound,
  ExternalLink,
  Shield
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface UserProfileModalProps {
  isOpen: boolean;
  initialTab?: 'profile' | 'security' | 'enquiries';
  onClose: () => void;
  onNavigateToAdmin?: () => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  initialTab = 'profile',
  onClose,
  onNavigateToAdmin
}) => {
  const { user, token } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'enquiries'>(initialTab);

  // Profile edit
  const [fullName, setFullName] = useState(user?.fullName || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Status & feedback
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // User enquiries list
  const [myEnquiries, setMyEnquiries] = useState<any[]>([]);
  const [loadingEnquiries, setLoadingEnquiries] = useState(false);

  useEffect(() => {
    if (isOpen && user) {
      setFullName(user.fullName);
      setActiveTab(initialTab);
      setMessage(null);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');

      // Fetch user's submitted enquiries
      if (token) {
        setLoadingEnquiries(true);
        fetch('/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` }
        })
          .then(res => res.json())
          .then(data => {
            if (data.enquiries) {
              setMyEnquiries(data.enquiries);
            }
          })
          .catch(() => {})
          .finally(() => setLoadingEnquiries(false));
      }
    }
  }, [isOpen, user, token, initialTab]);

  if (!isOpen || !user) return null;

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!fullName.trim()) {
      setMessage({ type: 'error', text: 'Full name cannot be empty' });
      return;
    }

    if (newPassword) {
      if (!currentPassword) {
        setMessage({ type: 'error', text: 'Current password is required to change password' });
        return;
      }
      if (newPassword.length < 6) {
        setMessage({ type: 'error', text: 'New password must be at least 6 characters' });
        return;
      }
      if (newPassword !== confirmPassword) {
        setMessage({ type: 'error', text: 'New passwords do not match' });
        return;
      }
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          fullName: fullName.trim(),
          currentPassword: currentPassword || undefined,
          newPassword: newPassword || undefined
        })
      });

      const data = await res.json();
      if (res.ok) {
        setMessage({ type: 'success', text: 'Account settings updated successfully' });
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to update profile' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Network connection error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/75 backdrop-blur-md"
        role="dialog"
        aria-modal="true"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-auto"
        >
          {/* Header */}
          <div className="px-6 pt-6 pb-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#101B35] text-white flex items-center justify-center font-bold text-sm">
                {user.fullName.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-slate-900">{user.fullName}</h3>
                  {user.role === 'admin' ? (
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-purple-100 text-purple-800 border border-purple-200">
                      SUPER ADMIN
                    </span>
                  ) : (
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      CLIENT ACCOUNT
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500">{user.email}</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-slate-100 bg-slate-50/50">
            <button
              type="button"
              onClick={() => setActiveTab('profile')}
              className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 ${
                activeTab === 'profile'
                  ? 'border-[#356DFF] text-[#356DFF] bg-white'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Profile
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('security')}
              className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 ${
                activeTab === 'security'
                  ? 'border-[#356DFF] text-[#356DFF] bg-white'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Security
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('enquiries')}
              className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 ${
                activeTab === 'enquiries'
                  ? 'border-[#356DFF] text-[#356DFF] bg-white'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              My Enquiries ({myEnquiries.length})
            </button>
          </div>

          {/* Content Area */}
          <div className="p-6 max-h-[70vh] overflow-y-auto">
            {message && (
              <div
                className={`mb-4 p-3.5 rounded-xl text-xs flex items-start gap-2.5 ${
                  message.type === 'success'
                    ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                    : 'bg-red-50 border border-red-200 text-red-700'
                }`}
              >
                {message.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                )}
                <span>{message.text}</span>
              </div>
            )}

            {/* TAB 1: Profile Details */}
            {activeTab === 'profile' && (
              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#356DFF] focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Registered Email (Read-Only)
                  </label>
                  <input
                    type="email"
                    value={user.email}
                    disabled
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-100 border border-slate-200 rounded-xl text-slate-500 cursor-not-allowed"
                  />
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    Contact your administrator to request a change of registered business email.
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-600">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Account Role:</span>
                    <span className="font-semibold text-slate-800 capitalize">{user.role}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Session Status:</span>
                    <span className="font-semibold text-emerald-600">Active &amp; Authenticated</span>
                  </div>
                </div>

                {user.role === 'admin' && onNavigateToAdmin && (
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onNavigateToAdmin();
                      }}
                      className="w-full py-2.5 px-4 bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-900 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
                    >
                      <Shield className="w-4 h-4 text-purple-600" />
                      <span>Launch Agency Super Admin Control Center</span>
                    </button>
                  </div>
                )}

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2.5 bg-[#101B35] hover:bg-[#356DFF] disabled:bg-slate-400 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm"
                  >
                    {isSubmitting ? 'Saving...' : 'Save Profile Changes'}
                  </button>
                </div>
              </form>
            )}

            {/* TAB 2: Security & Password */}
            {activeTab === 'security' && (
              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div className="text-xs text-slate-600 leading-relaxed">
                  To update your password, please confirm your current credentials and provide a strong new password.
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#356DFF] focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    New Password (Min. 6 characters)
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#356DFF] focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#356DFF] focus:bg-white transition-all"
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting || !newPassword}
                    className="px-6 py-2.5 bg-[#101B35] hover:bg-[#356DFF] disabled:bg-slate-400 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm"
                  >
                    {isSubmitting ? 'Updating Password...' : 'Change Password'}
                  </button>
                </div>
              </form>
            )}

            {/* TAB 3: User's Enquiries */}
            {activeTab === 'enquiries' && (
              <div className="space-y-3">
                {loadingEnquiries ? (
                  <div className="text-center py-8 text-xs text-slate-500">
                    Loading your enquiry records...
                  </div>
                ) : myEnquiries.length === 0 ? (
                  <div className="text-center py-8 text-xs text-slate-500 space-y-2">
                    <FileText className="w-8 h-8 text-slate-300 mx-auto" />
                    <p>No enquiries found associated with {user.email}.</p>
                    <p className="text-[11px] text-slate-400">
                      Build a custom bundle or submit an inbound consultation inquiry to track proposals here.
                    </p>
                  </div>
                ) : (
                  myEnquiries.map((enq) => (
                    <div
                      key={enq.id}
                      className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2 text-xs"
                    >
                      <div className="flex items-center justify-between pb-1.5 border-b border-slate-200">
                        <div className="font-bold text-slate-900 flex items-center gap-2">
                          <span>{enq.referenceId}</span>
                          <span className="text-[10px] text-[#356DFF] uppercase font-semibold">
                            {enq.type === 'custom_bundle' ? 'Custom Bundle' : 'Contact'}
                          </span>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase bg-blue-100 text-[#356DFF]">
                          {enq.status}
                        </span>
                      </div>

                      <div className="text-slate-600">
                        <strong>Company:</strong> {enq.companyName}
                      </div>

                      {enq.selectedServices && enq.selectedServices.length > 0 && (
                        <div>
                          <strong className="text-slate-700">Services ({enq.selectedServices.length}):</strong>
                          <div className="mt-1 flex flex-wrap gap-1">
                            {enq.selectedServices.map((s: any, idx: number) => (
                              <span
                                key={idx}
                                className="bg-white border border-slate-200 px-2 py-0.5 rounded text-[11px] text-slate-700"
                              >
                                {s.name} ({s.tier})
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {enq.finalPrice > 0 && (
                        <div className="pt-1 flex justify-between font-semibold text-slate-800">
                          <span>Estimated Price:</span>
                          <span className="text-[#356DFF]">${enq.finalPrice}/mo</span>
                        </div>
                      )}

                      <div className="text-[10px] text-slate-400 pt-1">
                        Submitted: {new Date(enq.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
