
export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  isOnline: boolean;
}

export interface Conference {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  host: User;
  participants: User[];
  maxParticipants: number;
}

export interface Feedback {
  id: string;
  rating: number;
  comment: string;
  from: User;
  to: User;
  createdAt: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  error: string | null;
}
