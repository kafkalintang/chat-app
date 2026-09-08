'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { useChatStore } from '@/store/chatStore';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, LogOut, User, MessageSquare } from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const { user, logout, isAuthenticated } = useAuthStore();
  const { conversations, setConversations } = useChatStore();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  // Data dummy buat testing
  const dummyConversations = [
    {
      id: '1',
      type: 'personal' as const,
      participants: [
        { id: '1', gmail: 'budi@gmail.com', displayName: 'Budi Santoso', isOnline: true },
        { id: '2', gmail: 'user@email.com', displayName: 'User' }
      ],
      updatedAt: new Date(),
      lastMessage: {
        id: '1',
        conversationId: '1',
        senderId: '1',
        content: 'Halo! Apa kabar?',
        type: 'text' as const,
        isRead: true,
        createdAt: new Date()
      }
    },
    {
      id: '2',
      type: 'personal' as const,
      participants: [
        { id: '3', gmail: 'siti@gmail.com', displayName: 'Siti Rahayu', isOnline: false },
        { id: '2', gmail: 'user@email.com', displayName: 'User' }
      ],
      updatedAt: new Date(),
      lastMessage: {
        id: '2',
        conversationId: '2',
        senderId: '3',
        content: 'Besok ketemu jam 10 ya',
        type: 'text' as const,
        isRead: false,
        createdAt: new Date()
      }
    }
  ];

  // Set data dummy pas pertama kali
  useEffect(() => {
    if (conversations.length === 0) {
      setConversations(dummyConversations);
    }
  }, []);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-96 border-r flex flex-col bg-background">
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={user?.avatarUrl} />
              <AvatarFallback className="bg-primary/10 text-primary">
                {user?.displayName?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{user?.displayName || 'User'}</p>
              <p className="text-sm text-muted-foreground">{user?.gmail || 'email@gmail.com'}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={handleLogout}>
            <LogOut className="h-5 w-5" />
          </Button>
        </div>

        {/* Search */}
        <div className="p-3">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari chat..."
              className="pl-9"
            />
          </div>
        </div>

        {/* List Chat */}
        <ScrollArea className="flex-1">
          {conversations.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
              <MessageSquare className="h-12 w-12 mb-2 opacity-50" />
              <p>Belum ada chat</p>
              <p className="text-sm">Cari kontak dengan Gmail</p>
            </div>
          ) : (
            conversations.map((conv) => {
              const otherUser = conv.participants.find(p => p.id !== user?.id);
              return (
                <div
                  key={conv.id}
                  className="flex items-center gap-3 p-3 hover:bg-accent cursor-pointer transition-colors"
                >
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {otherUser?.displayName?.charAt(0) || '?'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <p className="font-semibold truncate">
                        {otherUser?.displayName || 'Unknown'}
                      </p>
                      <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                        {conv.lastMessage?.createdAt ? 'tadi' : ''}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {conv.lastMessage?.content || 'Mulai percakapan...'}
                    </p>
                  </div>
                  {otherUser?.isOnline && (
                    <div className="w-2.5 h-2.5 bg-green-500 rounded-full" />
                  )}
                </div>
              );
            })
          )}
        </ScrollArea>
      </div>

      {/* Area Chat */}
      <div className="flex-1 flex items-center justify-center bg-muted/20">
        <div className="text-center">
          <MessageSquare className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
          <h2 className="text-2xl font-semibold mb-2">Chat App</h2>
          <p className="text-muted-foreground">Pilih chat untuk memulai percakapan</p>
        </div>
      </div>
    </div>
  );
}