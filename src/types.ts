export interface Announcement {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  publishedAt: string;
  expiresAt?: string;
  ctaText?: string;
  ctaUrl?: string;
  views: number;
  clicks: number;
  status: 'draft' | 'published' | 'scheduled';
}

export interface Comment {
  id: string;
  announcementId: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: string;
}
