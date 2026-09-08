export interface User {
  id: string;
  gmail: string;
  displayName: string;
  avatarUrl?: string;
  isOnline?: boolean;
  lastSeen?: Date;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  sender?: User;
  content: string;
  type: 'text' | 'voice_note' | 'image' | 'file';
  fileUrl?: string;
  duration?: number;
  isRead: boolean;
  createdAt: Date;
}

export interface Conversation {
  id: string;
  type: 'personal' | 'group';
  participants: User[];
  lastMessage?: Message;
  updatedAt: Date;
  groupName?: string;
  groupAvatar?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}