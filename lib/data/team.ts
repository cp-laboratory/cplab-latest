export interface TeamMember {
  id: string;
  slug: string;
  name: string;
  memberType: "professor" | "student" | "alumni" | "scholar";
  designation: string;
  order: number;
  image?: string;
  bio: string;
  email?: string;
  github?: string;
  linkedin?: string;
  googleScholar?: string;
  researchInterests?: string[];
}

/**
 * Sorts by `order` ascending. Firestore's server-side `orderBy` silently
 * drops documents missing the field, so members without one (e.g. legacy
 * records saved before this field existed) would vanish from the list —
 * sort client-side instead and fall back to name so they still show up.
 */
export function sortByHierarchy<T extends { order?: number; name: string }>(members: T[]): T[] {
  return [...members].sort((a, b) => {
    if (a.order != null && b.order != null) return a.order - b.order;
    if (a.order != null) return -1;
    if (b.order != null) return 1;
    return a.name.localeCompare(b.name);
  });
}

export const teamMembers: TeamMember[] = [
  {
    id: "1",
    slug: "prof-abul-kashem",
    name: "Prof. Dr. Abul Kashem Mia",
    memberType: "professor",
    designation: "Professor & Lab Director",
    order: 1,
    bio: "Professor Dr. Abul Kashem Mia is the director of the Cyber Physical Laboratory with over 20 years of research experience in embedded systems, IoT, and cyber-physical systems. He has published 100+ research papers in top-tier journals and conferences.",
    email: "akmia@cplab.org",
    linkedin: "https://linkedin.com",
    googleScholar: "https://scholar.google.com",
    researchInterests: ["Cyber-Physical Systems", "IoT", "Embedded Systems", "Real-Time Systems"],
  },
  {
    id: "2",
    slug: "dr-ms-iqbal",
    name: "Dr. Md. Shahinul Islam Iqbal",
    memberType: "professor",
    designation: "Associate Professor",
    order: 2,
    bio: "Dr. Iqbal specializes in blockchain technology, distributed computing, and application security. His research bridges the gap between theoretical cryptography and practical blockchain implementations.",
    email: "ms.iqbal@cplab.org",
    linkedin: "https://linkedin.com",
    googleScholar: "https://scholar.google.com",
    researchInterests: ["Blockchain", "Distributed Systems", "Cryptography", "Security"],
  },
  {
    id: "3",
    slug: "md-rashed-kabir",
    name: "Md. Rashed Kabir",
    memberType: "student",
    designation: "PhD Researcher",
    order: 3,
    bio: "Working on federated learning and privacy-preserving machine learning for healthcare applications.",
    email: "rashed@cplab.org",
    github: "https://github.com",
    researchInterests: ["Federated Learning", "Machine Learning", "Privacy"],
  },
  {
    id: "4",
    slug: "fatema-tuz-zohra",
    name: "Fatema Tuz Zohra",
    memberType: "student",
    designation: "MSc Researcher",
    order: 4,
    bio: "Researching smart grid optimization using machine learning and IoT sensor networks.",
    email: "fatema@cplab.org",
    researchInterests: ["Smart Grid", "IoT", "Machine Learning"],
  },
  {
    id: "5",
    slug: "arif-hossen",
    name: "Arif Hossen",
    memberType: "student",
    designation: "BSc Thesis Student",
    order: 5,
    bio: "Working on blockchain-based supply chain traceability systems for the agricultural sector.",
    email: "arif@cplab.org",
    researchInterests: ["Blockchain", "Supply Chain", "DApps"],
  },
  {
    id: "6",
    slug: "nusrat-jahan",
    name: "Nusrat Jahan",
    memberType: "student",
    designation: "BSc Thesis Student",
    order: 6,
    bio: "Developing a real-time anomaly detection system for industrial IoT environments using deep learning.",
    email: "nusrat@cplab.org",
    researchInterests: ["Deep Learning", "IoT", "Anomaly Detection"],
  },
  {
    id: "7",
    slug: "tanzim-hossain",
    name: "Tanzim Hossain",
    memberType: "student",
    designation: "MSc Researcher",
    order: 7,
    bio: "Exploring decentralized identity management systems using blockchain for e-governance applications.",
    email: "tanzim@cplab.org",
    researchInterests: ["Blockchain", "Identity Management", "e-Governance"],
  },
  {
    id: "8",
    slug: "sumaiya-akter",
    name: "Sumaiya Akter",
    memberType: "student",
    designation: "BSc Thesis Student",
    order: 8,
    bio: "Researching energy-efficient protocols for wireless sensor networks in smart city applications.",
    email: "sumaiya@cplab.org",
    researchInterests: ["WSN", "Smart City", "Energy Efficiency"],
  },
  {
    id: "9",
    slug: "mahmudul-hasan-alumni",
    name: "Mahmudul Hasan",
    memberType: "alumni",
    designation: "Software Engineer @ Google",
    order: 9,
    bio: "Former lab researcher who worked on IoT-based precision agriculture. Now working at Google on infrastructure systems.",
    email: "mahmudul@alumni.cplab.org",
    linkedin: "https://linkedin.com",
  },
  {
    id: "10",
    slug: "rabeya-sultana-alumni",
    name: "Rabeya Sultana",
    memberType: "alumni",
    designation: "Data Scientist @ Microsoft",
    order: 10,
    bio: "Graduated with research on deep learning for medical image analysis. Currently at Microsoft Research.",
    email: "rabeya@alumni.cplab.org",
    linkedin: "https://linkedin.com",
  },
];
