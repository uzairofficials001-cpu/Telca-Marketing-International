import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
  confirmPasswordReset,
  sendEmailVerification,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db, googleProvider, handleFirestoreError, OperationType } from '../firebase';
import firebaseConfig from '../../firebase-applet-config.json';

export const FIREBASE_PROJECT_ID = firebaseConfig.projectId;
const OWNER_ADMIN_EMAIL = 'uzairofficials001@gmail.com';
export const FIREBASE_STATIC_TOKEN = 'firebase-static-session';

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  role: 'admin' | 'user';
  isOwner?: boolean;
  status?: 'active' | 'suspended';
  createdAt?: string;
}

interface AuthResult {
  success: boolean;
  error?: string;
  errorCode?: string;
  isAdmin?: boolean;
  verificationSent?: boolean;
}

interface ForgotResult {
  success: boolean;
  resetToken?: string;
  viaEmail?: boolean;
  message?: string;
  error?: string;
  errorCode?: string;
}

interface ResetResult {
  success: boolean;
  message?: string;
  error?: string;
  errorCode?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  token: string | null;
  isLoading: boolean;
  isStaticCloudAuth: boolean;
  login: (email: string, password: string) => Promise<AuthResult>;
  loginWithGoogle: () => Promise<AuthResult>;
  register: (fullName: string, email: string, password: string) => Promise<AuthResult>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<ForgotResult>;
  resetPassword: (resetToken: string, newPassword: string) => Promise<ResetResult>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

async function safeFetchJson(
  url: string,
  options?: RequestInit
): Promise<{ ok: boolean; status: number; backendOffline: boolean; data: any }> {
  try {
    const res = await fetch(url, options);
    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      return { ok: false, status: res.status, backendOffline: true, data: null };
    }
    const data = await res.json();
    return { ok: res.ok, status: res.status, backendOffline: false, data };
  } catch {
    return { ok: false, status: 0, backendOffline: true, data: null };
  }
}

async function syncFirestoreUser(
  fbUser: FirebaseUser,
  authProvider: 'google' | 'password'
): Promise<'admin' | 'user'> {
  const normalizedEmail = (fbUser.email || '').trim().toLowerCase();
  const isOwnerEmail = normalizedEmail === OWNER_ADMIN_EMAIL && fbUser.emailVerified;
  let resolvedRole: 'admin' | 'user' = isOwnerEmail ? 'admin' : 'user';

  if (!fbUser.emailVerified) {
    return resolvedRole;
  }

  try {
    const adminRef = doc(db, 'admins', fbUser.uid);
    const adminSnap = await getDoc(adminRef);
    if (adminSnap.exists()) {
      resolvedRole = 'admin';
    }
  } catch {
    // Non-admin read or offline; ignore gracefully
  }

  const userPath = `users/${fbUser.uid}`;
  try {
    const userRef = doc(db, 'users', fbUser.uid);
    const existingSnap = await getDoc(userRef);

    if (!existingSnap.exists()) {
      await setDoc(userRef, {
        uid: fbUser.uid,
        fullName: (fbUser.displayName || normalizedEmail.split('@')[0] || 'Telca User').slice(0, 120),
        email: normalizedEmail,
        role: resolvedRole,
        authProvider,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    } else {
      const existingData = existingSnap.data();
      if (existingData?.role === 'admin') {
        resolvedRole = 'admin';
      }
      await setDoc(
        userRef,
        {
          fullName: (fbUser.displayName || existingData?.fullName || normalizedEmail.split('@')[0]).slice(0, 120),
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );
    }
  } catch (err) {
    try {
      handleFirestoreError(err, OperationType.WRITE, userPath);
    } catch {
      // Logged structured error via handleFirestoreError; keep auth usable
    }
  }

  return resolvedRole;
}

function buildFirebaseUserProfile(fbUser: FirebaseUser, role: 'admin' | 'user'): UserProfile {
  const email = (fbUser.email || '').trim().toLowerCase();
  const isOwner = email === OWNER_ADMIN_EMAIL && fbUser.emailVerified;
  return {
    id: fbUser.uid,
    fullName: fbUser.displayName || email.split('@')[0] || 'User',
    email,
    role: isOwner ? 'admin' : role,
    isOwner,
    status: 'active',
    createdAt: fbUser.metadata?.creationTime || new Date().toISOString(),
  };
}

function formatFirebaseAuthError(err: any, fallbackMsg: string): string {
  const code = err?.code || '';
  if (code === 'auth/popup-closed-by-user') {
    return 'Google sign-in popup was closed before completing.';
  }
  if (code === 'auth/popup-blocked') {
    return 'Popup blocked by browser. Please allow popups for this site and click Continue with Google again.';
  }
  if (code === 'auth/unauthorized-domain') {
    const host = typeof window !== 'undefined' ? window.location.hostname : 'this domain';
    return `Domain "${host}" is not authorized yet in Firebase Auth. Add "${host}" under Firebase Console -> Authentication -> Settings -> Authorized domains, or sign in via the backend server.`;
  }
  if (code === 'auth/operation-not-allowed') {
    return 'Email/Password sign-in is not enabled in Firebase Console for static hosting. Click "Continue with Google" above to sign in immediately, or enable Email/Password provider in Firebase Console.';
  }
  if (
    code === 'auth/invalid-credential' ||
    code === 'auth/user-not-found' ||
    code === 'auth/wrong-password'
  ) {
    return 'Incorrect email/password, or this account is not yet registered in Firebase Auth. Click "Continue with Google" or use Register / Reset Password.';
  }
  if (code === 'auth/too-many-requests') {
    return 'Too many attempts. Please wait a moment or reset your password.';
  }
  if (code === 'auth/email-already-in-use') {
    return 'An account with this email already exists. Try signing in or using Google Sign-In.';
  }
  return err?.message || fallbackMsg;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('telca_auth_token'));
  const [isLoading, setIsLoading] = useState(true);

  const isStaticCloudAuth = token === FIREBASE_STATIC_TOKEN;

  // Validate existing JWT session OR restore Firebase Auth session
  useEffect(() => {
    let active = true;

    async function verifySession() {
      if (!token || token === FIREBASE_STATIC_TOKEN) {
        if (auth.currentUser && active) {
          const role = await syncFirestoreUser(
            auth.currentUser,
            auth.currentUser.providerData.some((p) => p.providerId === 'google.com')
              ? 'google'
              : 'password'
          );
          if (active) {
            setUser(buildFirebaseUserProfile(auth.currentUser, role));
            setToken(FIREBASE_STATIC_TOKEN);
            localStorage.setItem('telca_auth_token', FIREBASE_STATIC_TOKEN);
          }
        }
        if (active) setIsLoading(false);
        return;
      }

      const result = await safeFetchJson('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!active) return;

      if (result.ok && result.data?.user) {
        setUser(result.data.user);
      } else if (result.backendOffline) {
        if (auth.currentUser) {
          const role = await syncFirestoreUser(auth.currentUser, 'google');
          if (active) {
            setUser(buildFirebaseUserProfile(auth.currentUser, role));
            setToken(FIREBASE_STATIC_TOKEN);
            localStorage.setItem('telca_auth_token', FIREBASE_STATIC_TOKEN);
          }
        }
      } else {
        localStorage.removeItem('telca_auth_token');
        setToken(null);
        setUser(null);
      }

      if (active) setIsLoading(false);
    }

    verifySession();

    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      if (!active) return;
      const storedToken = localStorage.getItem('telca_auth_token');
      if (fbUser && (!storedToken || storedToken === FIREBASE_STATIC_TOKEN)) {
        const providerType = fbUser.providerData.some((p) => p.providerId === 'google.com')
          ? 'google'
          : 'password';
        const role = await syncFirestoreUser(fbUser, providerType);
        if (active) {
          localStorage.setItem('telca_auth_token', FIREBASE_STATIC_TOKEN);
          setToken(FIREBASE_STATIC_TOKEN);
          setUser(buildFirebaseUserProfile(fbUser, role));
          setIsLoading(false);
        }
      }
    });

    return () => {
      active = false;
      unsubscribe();
    };
  }, [token]);

  const login = async (email: string, password: string): Promise<AuthResult> => {
    const result = await safeFetchJson('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!result.backendOffline) {
      if (!result.ok) {
        return { success: false, error: result.data?.error || 'Failed to sign in' };
      }
      localStorage.setItem('telca_auth_token', result.data.token);
      setToken(result.data.token);
      setUser(result.data.user);
      return { success: true, isAdmin: result.data.user?.role === 'admin' };
    }

    // Fallback to Firebase Auth on static deployments (e.g., Netlify)
    try {
      const cred = await signInWithEmailAndPassword(auth, email.trim(), password);
      const role = await syncFirestoreUser(cred.user, 'password');
      const profile = buildFirebaseUserProfile(cred.user, role);
      localStorage.setItem('telca_auth_token', FIREBASE_STATIC_TOKEN);
      setToken(FIREBASE_STATIC_TOKEN);
      setUser(profile);
      return { success: true, isAdmin: profile.role === 'admin' };
    } catch (err: any) {
      return {
        success: false,
        errorCode: err?.code,
        error: formatFirebaseAuthError(
          err,
          'Could not connect to backend server. Use "Continue with Google" for instant cloud authentication.'
        ),
      };
    }
  };

  const loginWithGoogle = async (): Promise<AuthResult> => {
    try {
      const cred = await signInWithPopup(auth, googleProvider);
      const idToken = await cred.user.getIdToken();

      // Try exchanging token with Express backend when available
      const result = await safeFetchJson('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken }),
      });

      if (!result.backendOffline) {
        if (!result.ok) {
          return { success: false, error: result.data?.error || 'Google authentication failed' };
        }
        void syncFirestoreUser(cred.user, 'google');
        localStorage.setItem('telca_auth_token', result.data.token);
        setToken(result.data.token);
        setUser(result.data.user);
        return { success: true, isAdmin: result.data.user?.role === 'admin' };
      }

      // Static hosting mode (Netlify): verified directly by Firebase Auth
      const role = await syncFirestoreUser(cred.user, 'google');
      const profile = buildFirebaseUserProfile(cred.user, role);
      localStorage.setItem('telca_auth_token', FIREBASE_STATIC_TOKEN);
      setToken(FIREBASE_STATIC_TOKEN);
      setUser(profile);
      return { success: true, isAdmin: profile.role === 'admin' };
    } catch (err: any) {
      return {
        success: false,
        errorCode: err?.code,
        error: formatFirebaseAuthError(err, 'Google Sign-In failed. Please try again.'),
      };
    }
  };

  const register = async (
    fullName: string,
    email: string,
    password: string
  ): Promise<AuthResult> => {
    const result = await safeFetchJson('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fullName, email, password }),
    });

    if (!result.backendOffline) {
      if (!result.ok) {
        return { success: false, error: result.data?.error || 'Failed to create account' };
      }
      localStorage.setItem('telca_auth_token', result.data.token);
      setToken(result.data.token);
      setUser(result.data.user);
      return { success: true, isAdmin: result.data.user?.role === 'admin' };
    }

    try {
      const cred = await createUserWithEmailAndPassword(auth, email.trim(), password);
      if (fullName.trim()) {
        await updateProfile(cred.user, { displayName: fullName.trim() });
      }
      let verificationSent = false;
      if (!cred.user.emailVerified) {
        try {
          await sendEmailVerification(cred.user);
          verificationSent = true;
        } catch {
          // Non-fatal if email verification rate-limited
        }
      }
      const role = await syncFirestoreUser(cred.user, 'password');
      const profile = buildFirebaseUserProfile(cred.user, role);
      localStorage.setItem('telca_auth_token', FIREBASE_STATIC_TOKEN);
      setToken(FIREBASE_STATIC_TOKEN);
      setUser(profile);
      return { success: true, isAdmin: profile.role === 'admin', verificationSent };
    } catch (err: any) {
      return {
        success: false,
        errorCode: err?.code,
        error: formatFirebaseAuthError(err, 'Could not complete registration. Try Google Sign-In.'),
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('telca_auth_token');
    setToken(null);
    setUser(null);
    void signOut(auth).catch(() => {});
  };

  const forgotPassword = async (email: string): Promise<ForgotResult> => {
    const result = await safeFetchJson('/api/auth/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    if (!result.backendOffline) {
      if (!result.ok) {
        return { success: false, error: result.data?.error || 'Request failed' };
      }
      return {
        success: true,
        resetToken: result.data.resetToken,
        message: result.data.message,
      };
    }

    // Static hosting mode: use Firebase email password recovery
    try {
      await sendPasswordResetEmail(auth, email.trim());
      return {
        success: true,
        viaEmail: true,
        message: 'A password reset link has been emailed to your inbox. Check your email (and Spam folder), or paste your reset code below.',
      };
    } catch (err: any) {
      return {
        success: false,
        errorCode: err?.code,
        error: formatFirebaseAuthError(
          err,
          'Could not send password reset email. Ensure Email/Password auth is enabled in Firebase Console or use Google Sign-In.'
        ),
      };
    }
  };

  const resetPassword = async (resetToken: string, newPassword: string): Promise<ResetResult> => {
    const result = await safeFetchJson('/api/auth/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ resetToken, newPassword }),
    });

    if (!result.backendOffline) {
      if (!result.ok) {
        return { success: false, error: result.data?.error || 'Failed to reset password' };
      }
      return { success: true, message: result.data.message };
    }

    // Static hosting mode: apply Firebase oobCode reset token
    try {
      await confirmPasswordReset(auth, resetToken.trim(), newPassword);
      return {
        success: true,
        message: 'Password updated! You can now sign in with your new password.',
      };
    } catch (err: any) {
      return {
        success: false,
        errorCode: err?.code,
        error: formatFirebaseAuthError(err, 'Invalid or expired password reset code.'),
      };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isStaticCloudAuth,
        login,
        loginWithGoogle,
        register,
        logout,
        forgotPassword,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
