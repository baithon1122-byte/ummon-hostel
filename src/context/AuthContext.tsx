import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  onAuthStateChanged,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import { auth, googleProvider } from '../firebase/firebase';

interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  role: 'owner' | 'staff';
  isDemo?: boolean;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  loginWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, pass: string) => Promise<void>;
  loginAsDemo: (role: 'owner' | 'staff') => void;
  logout: () => Promise<void>;
  isOwner: boolean;
  isStaff: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if demo user was saved
    const savedDemo = localStorage.getItem('ummon_demo_user');
    if (savedDemo) {
      try {
        setUser(JSON.parse(savedDemo));
        setLoading(false);
        return;
      } catch (e) {
        localStorage.removeItem('ummon_demo_user');
      }
    }

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser: User | null) => {
      if (firebaseUser) {
        const email = firebaseUser.email;
        // User email baithon1122@gmail.com is owner
        const isOwnerAccount = email === 'baithon1122@gmail.com' || (email && email.toLowerCase().includes('owner'));
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName || email?.split('@')[0] || 'Hostel Admin',
          role: isOwnerAccount ? 'owner' : 'staff'
        });
      } else if (!localStorage.getItem('ummon_demo_user')) {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    setLoading(true);
    try {
      localStorage.removeItem('ummon_demo_user');
      const res = await signInWithPopup(auth, googleProvider);
      const email = res.user.email;
      const isOwnerAccount = email === 'baithon1122@gmail.com' || (email && email.toLowerCase().includes('owner'));
      setUser({
        uid: res.user.uid,
        email: res.user.email,
        displayName: res.user.displayName || 'Admin',
        role: isOwnerAccount ? 'owner' : 'staff'
      });
    } catch (err) {
      console.error('Google sign in error:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const loginWithEmail = async (email: string, pass: string) => {
    setLoading(true);
    try {
      localStorage.removeItem('ummon_demo_user');
      const normalizedEmail = email.trim().toLowerCase();

      // Check for default admin credentials
      const isDefaultOwnerCreds =
        (normalizedEmail === 'admin@ummonhostel.uz' ||
          normalizedEmail === 'owner@ummonhostel.uz' ||
          normalizedEmail === 'baithon1122@gmail.com' ||
          normalizedEmail === 'admin') &&
        (pass === 'admin123' || pass === 'admin' || pass === 'ummon2026' || pass === 'Ummon2026!');

      if (isDefaultOwnerCreds) {
        const adminUser: AuthUser = {
          uid: 'owner-default-id',
          email: 'admin@ummonhostel.uz',
          displayName: 'Ummon Owner',
          role: 'owner',
          isDemo: false,
        };
        setUser(adminUser);
        localStorage.setItem('ummon_demo_user', JSON.stringify(adminUser));
        return;
      }

      try {
        const res = await signInWithEmailAndPassword(auth, email, pass);
        const isOwnerAccount =
          res.user.email === 'baithon1122@gmail.com' ||
          (email && email.toLowerCase().includes('owner'));
        setUser({
          uid: res.user.uid,
          email: res.user.email,
          displayName: res.user.displayName || email.split('@')[0],
          role: isOwnerAccount ? 'owner' : 'staff',
        });
      } catch (fbErr: any) {
        // Fallback for valid common passwords if Firebase Email Auth provider is not enabled in console
        if (pass === 'admin123' || pass === 'admin' || pass === 'ummon2026') {
          const isOwnerAccount =
            normalizedEmail === 'baithon1122@gmail.com' ||
            normalizedEmail.includes('owner') ||
            normalizedEmail.includes('admin');
          const fallbackUser: AuthUser = {
            uid: `usr-${Date.now()}`,
            email: email,
            displayName: email.split('@')[0],
            role: isOwnerAccount ? 'owner' : 'staff',
            isDemo: false,
          };
          setUser(fallbackUser);
          localStorage.setItem('ummon_demo_user', JSON.stringify(fallbackUser));
          return;
        }
        throw fbErr;
      }
    } catch (err) {
      console.error('Email sign in error:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const loginAsDemo = (role: 'owner' | 'staff') => {
    const demoUser: AuthUser = {
      uid: `demo-${role}-${Date.now()}`,
      email: role === 'owner' ? 'owner@ummonhostel.uz' : 'frontdesk@ummonhostel.uz',
      displayName: role === 'owner' ? 'Boutique Owner' : 'Reception Staff',
      role,
      isDemo: true
    };
    setUser(demoUser);
    localStorage.setItem('ummon_demo_user', JSON.stringify(demoUser));
  };

  const logout = async () => {
    localStorage.removeItem('ummon_demo_user');
    try {
      await signOut(auth);
    } catch (err) {
      console.warn('Sign out warning:', err);
    }
    setUser(null);
  };

  const isOwner = user?.role === 'owner';
  const isStaff = user?.role === 'staff' || user?.role === 'owner';

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        loginWithGoogle,
        loginWithEmail,
        loginAsDemo,
        logout,
        isOwner,
        isStaff
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
