import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Announcement, Comment } from '../types';

interface NovedadesContextType {
  announcements: Announcement[];
  comments: Comment[];
  globalWebViews: number;
  addAnnouncement: (announcement: Omit<Announcement, 'id' | 'views' | 'clicks'>) => void;
  updateAnnouncement: (id: string, announcement: Partial<Announcement>) => void;
  deleteAnnouncement: (id: string) => void;
  addComment: (comment: Omit<Comment, 'id' | 'createdAt'>) => void;
  deleteComment: (id: string) => void;
  trackWebView: () => void;
  trackView: (id: string) => void;
  trackClick: (id: string) => void;
  resetAllStats: () => void;
}

const NovedadesContext = createContext<NovedadesContextType | undefined>(undefined);

const ANNOUNCEMENTS_STORAGE_KEY = 'hedam_announcements';
const COMMENTS_STORAGE_KEY = 'hedam_comments';
const WEB_VIEWS_STORAGE_KEY = 'hedam_web_views';

export const NovedadesProvider = ({ children }: { children: ReactNode }) => {
  // Empty clean start for production
  const [announcements, setAnnouncements] = useState<Announcement[]>(() => {
    try {
      const saved = localStorage.getItem(ANNOUNCEMENTS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [comments, setComments] = useState<Comment[]>(() => {
    try {
      const saved = localStorage.getItem(COMMENTS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [globalWebViews, setGlobalWebViews] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(WEB_VIEWS_STORAGE_KEY);
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(ANNOUNCEMENTS_STORAGE_KEY, JSON.stringify(announcements));
  }, [announcements]);

  useEffect(() => {
    localStorage.setItem(COMMENTS_STORAGE_KEY, JSON.stringify(comments));
  }, [comments]);

  useEffect(() => {
    localStorage.setItem(WEB_VIEWS_STORAGE_KEY, globalWebViews.toString());
  }, [globalWebViews]);

  // Contabilizar visitas a la web en general (Única por sesión de navegación)
  const trackWebView = () => {
    const sessionVisited = sessionStorage.getItem('hedam_visited_session');
    if (!sessionVisited) {
      sessionStorage.setItem('hedam_visited_session', 'true');
      setGlobalWebViews(prev => prev + 1);
    }
  };

  // Contabilizar visitas específicas a una novedad (Única por sesión para evitar inflación artificial)
  const trackView = (id: string) => {
    const sessionSeenKey = `hedam_seen_novelty_${id}`;
    const alreadySeen = sessionStorage.getItem(sessionSeenKey);
    if (!alreadySeen) {
      sessionStorage.setItem(sessionSeenKey, 'true');
      setAnnouncements(prev => prev.map(a => a.id === id ? { ...a, views: a.views + 1 } : a));
    }
  };

  // Contabilizar clics en el botón CTA de la novedad
  const trackClick = (id: string) => {
    setAnnouncements(prev => prev.map(a => a.id === id ? { ...a, clicks: a.clicks + 1 } : a));
  };

  const addAnnouncement = (announcement: Omit<Announcement, 'id' | 'views' | 'clicks'>) => {
    const newAnnouncement: Announcement = {
      ...announcement,
      id: 'ann_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
      views: 0,
      clicks: 0
    };
    setAnnouncements(prev => [newAnnouncement, ...prev]);
  };

  const updateAnnouncement = (id: string, data: Partial<Announcement>) => {
    setAnnouncements(prev => prev.map(a => a.id === id ? { ...a, ...data } : a));
  };

  const deleteAnnouncement = (id: string) => {
    setAnnouncements(prev => prev.filter(a => a.id !== id));
    // Also cleanup comments related to this announcement
    setComments(prev => prev.filter(c => c.announcementId !== id));
  };

  const addComment = (comment: Omit<Comment, 'id' | 'createdAt'>) => {
    const newComment: Comment = {
      ...comment,
      id: 'comm_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
      createdAt: new Date().toISOString()
    };
    setComments(prev => [...prev, newComment]);
  };

  const deleteComment = (id: string) => {
    setComments(prev => prev.filter(c => c.id !== id));
  };

  const resetAllStats = () => {
    setGlobalWebViews(0);
    setAnnouncements(prev => prev.map(a => ({ ...a, views: 0, clicks: 0 })));
    localStorage.removeItem(WEB_VIEWS_STORAGE_KEY);
  };

  return (
    <NovedadesContext.Provider value={{
      announcements,
      comments,
      globalWebViews,
      addAnnouncement,
      updateAnnouncement,
      deleteAnnouncement,
      addComment,
      deleteComment,
      trackWebView,
      trackView,
      trackClick,
      resetAllStats
    }}>
      {children}
    </NovedadesContext.Provider>
  );
};

export const useNovedades = () => {
  const context = useContext(NovedadesContext);
  if (context === undefined) {
    throw new Error('useNovedades must be used within a NovedadesProvider');
  }
  return context;
};
