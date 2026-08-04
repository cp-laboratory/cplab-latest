import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { COLLECTIONS } from "@/lib/firestore";
import { teamMembers } from "@/lib/data/team";
import { publications } from "@/lib/data/publications";
import { projects } from "@/lib/data/projects";
import { newsArticles, announcements } from "@/lib/data/news";

const mockCertificates = [
  { id: "1", certId: "CPLAB-2024-001", name: "Md. Rashed Kabir", date: "January 15, 2024", achievement: "Excellence in Machine Learning Research" },
  { id: "2", certId: "CPLAB-2023-042", name: "Fatema Tuz Zohra", date: "December 10, 2023", achievement: "Best Student Project — Smart Grid IoT" },
  { id: "3", certId: "CPLAB-2023-019", name: "Arif Hossen", date: "November 5, 2023", achievement: "Blockchain Development Certification" },
];

async function seedCollection<T extends { id: string }>(name: string, items: T[]) {
  for (const item of items) {
    const { id, ...rest } = item as unknown as { id: string } & Record<string, unknown>;
    await setDoc(
      doc(db, name, id),
      { ...rest, createdAt: serverTimestamp(), updatedAt: serverTimestamp() },
      { merge: true }
    );
  }
}

export async function seedAllData() {
  await seedCollection(COLLECTIONS.team, teamMembers);
  await seedCollection(COLLECTIONS.publications, publications);
  await seedCollection(COLLECTIONS.projects, projects);
  await seedCollection(COLLECTIONS.news, newsArticles);
  await seedCollection(COLLECTIONS.announcements, announcements);
  await seedCollection(COLLECTIONS.certificates, mockCertificates);
}
