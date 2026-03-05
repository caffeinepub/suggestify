import type React from "react";
import { createContext, useContext, useState } from "react";
import { MOCK_COMPLAINTS, MOCK_USERS } from "../data/mockData";
import type { Complaint, User } from "../types";

// ============================================================
// APP CONTEXT — manages auth state + complaints state
// TODO: Replace auth with Firebase Auth
// TODO: Replace complaints with Firestore real-time listeners
// ============================================================

interface AppContextType {
  // Auth
  currentUser: User | null;
  login: (email: string, password: string, role: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;

  // Complaints
  complaints: Complaint[];
  addComplaint: (
    complaint: Omit<Complaint, "id" | "date" | "status" | "comments">,
  ) => string;
  updateComplaintStatus: (id: string, status: Complaint["status"]) => void;
  getComplaintById: (id: string) => Complaint | undefined;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [complaints, setComplaints] = useState<Complaint[]>(MOCK_COMPLAINTS);

  // ============================================================
  // TODO: Replace with Firebase Auth - signInWithEmailAndPassword(auth, email, password)
  // TODO: Then fetch user profile from Firestore: getDoc(doc(db, 'users', uid))
  // ============================================================
  const login = (email: string, _password: string, role: string): boolean => {
    // Mock login: find user by role, or default to matching email
    const userByEmail = MOCK_USERS.find((u) => u.email === email);
    const userByRole = MOCK_USERS.find((u) => u.role === role);
    const user = userByEmail || userByRole;
    if (user) {
      setCurrentUser({ ...user, role: role as User["role"] });
      return true;
    }
    // Fallback: create a mock user for any email + role combo
    const fallbackUser: User = {
      id: `u_${Date.now()}`,
      name: email
        .split("@")[0]
        .replace(".", " ")
        .replace(/\b\w/g, (l) => l.toUpperCase()),
      email,
      role: role as User["role"],
      department: "General",
    };
    setCurrentUser(fallbackUser);
    return true;
  };

  // ============================================================
  // TODO: Replace with Firebase Auth - signOut(auth)
  // ============================================================
  const logout = () => {
    setCurrentUser(null);
  };

  // ============================================================
  // TODO: Replace with Firestore - addDoc(collection(db, 'complaints'), data)
  // ============================================================
  const addComplaint = (
    complaint: Omit<Complaint, "id" | "date" | "status" | "comments">,
  ): string => {
    const newId = `CMP-${String(complaints.length + 11).padStart(3, "0")}`;
    const newComplaint: Complaint = {
      ...complaint,
      id: newId,
      date: new Date().toISOString().split("T")[0],
      status: "pending",
      comments: [],
    };
    setComplaints((prev) => [newComplaint, ...prev]);
    return newId;
  };

  // ============================================================
  // TODO: Replace with Firestore - updateDoc(doc(db, 'complaints', id), { status })
  // ============================================================
  const updateComplaintStatus = (id: string, status: Complaint["status"]) => {
    setComplaints((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status } : c)),
    );
  };

  const getComplaintById = (id: string) => complaints.find((c) => c.id === id);

  return (
    <AppContext.Provider
      value={{
        currentUser,
        login,
        logout,
        isAuthenticated: !!currentUser,
        complaints,
        addComplaint,
        updateComplaintStatus,
        getComplaintById,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
