export type { TeamMember } from "@/lib/data/team";
export type { Publication } from "@/lib/data/publications";
export type { Project } from "@/lib/data/projects";
export type { NewsArticle, Announcement } from "@/lib/data/news";
export type { Resource } from "@/lib/data/resources";

export interface Certificate {
  id: string;
  certId: string;
  name: string;
  date: string;
  achievement: string;
}

export type RecruitmentStatus = "pending" | "reviewed" | "accepted" | "rejected";

export interface RecruitmentApplication {
  id: string;
  name: string;
  email: string;
  phone: string;
  university: string;
  degree: string;
  cgpa: string;
  batch: string;
  researchTrack: string;
  interests: string;
  experience: string;
  proposalTitle: string;
  proposalDesc: string;
  sop: string;
  status: RecruitmentStatus;
  submittedAt?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  submittedAt?: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribedAt?: string;
}
