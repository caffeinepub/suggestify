export type Role = "student" | "staff" | "faculty" | "admin";

export type ComplaintStatus =
  | "pending"
  | "under_review"
  | "in_progress"
  | "resolved";

export type ComplaintCategory =
  | "Infrastructure"
  | "Cleanliness"
  | "Safety"
  | "IT"
  | "Academic"
  | "Other";

export type Priority = "Low" | "Medium" | "High" | "Critical";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  department?: string;
  avatar?: string;
}

export interface AIResolutionPlan {
  step1: string;
  step2: string;
  step3: string;
  generatedAt?: string;
}

export interface ComplaintComment {
  id: string;
  author: string;
  role: Role;
  text: string;
  date: string;
}

export interface Complaint {
  id: string;
  title: string;
  category: ComplaintCategory;
  location: string;
  priority: Priority;
  description: string;
  status: ComplaintStatus;
  submittedBy: string;
  submittedByRole: Role;
  submittedById: string;
  date: string;
  department?: string;
  aiPlan?: AIResolutionPlan;
  comments?: ComplaintComment[];
  attachment?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}
