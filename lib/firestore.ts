import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  query,
  orderBy,
  limit,
  where,
  onSnapshot,
  serverTimestamp,
  type QueryConstraint,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export const COLLECTIONS = {
  team: "team",
  publications: "publications",
  projects: "projects",
  news: "news",
  announcements: "announcements",
  certificates: "certificates",
  resources: "resources",
  recruitment: "recruitmentApplications",
  contact: "contactMessages",
  newsletter: "newsletterSubscribers",
} as const;

function withId<T>(id: string, data: Record<string, unknown>): T {
  return { id, ...data } as T;
}

export async function fetchCollection<T>(
  name: string,
  constraints: QueryConstraint[] = []
): Promise<T[]> {
  const q = query(collection(db, name), ...constraints);
  const snap = await getDocs(q);
  return snap.docs.map((d) => withId<T>(d.id, d.data()));
}

export async function fetchDocByField<T>(
  name: string,
  field: string,
  value: string
): Promise<T | null> {
  const q = query(collection(db, name), where(field, "==", value), limit(1));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  return withId<T>(snap.docs[0].id, snap.docs[0].data());
}

export function subscribeCollection<T>(
  name: string,
  cb: (items: T[]) => void,
  constraints: QueryConstraint[] = [],
  onError?: (error: Error) => void
) {
  const q = query(collection(db, name), ...constraints);
  return onSnapshot(
    q,
    (snap) => {
      cb(snap.docs.map((d) => withId<T>(d.id, d.data())));
    },
    (error) => {
      console.error(`Firestore subscription error on "${name}":`, error.message);
      onError?.(error);
    }
  );
}

export async function createDoc(name: string, data: Record<string, unknown>) {
  const { id: _omit, ...rest } = data;
  const ref = await addDoc(collection(db, name), {
    ...rest,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateDocById(
  name: string,
  id: string,
  data: Record<string, unknown>
) {
  const { id: _omit, ...rest } = data;
  await updateDoc(doc(db, name, id), { ...rest, updatedAt: serverTimestamp() });
}

export async function deleteDocById(name: string, id: string) {
  await deleteDoc(doc(db, name, id));
}

export { orderBy, limit, where };
export type { QueryConstraint };
