export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedDate: string;
  category: string;
  tags: string[];
  featured: boolean;
}

export const newsArticles: NewsArticle[] = [
  {
    id: "1",
    slug: "icml-2024-paper-accepted",
    title: "CPLAB Research Accepted at ICML 2024 — Top ML Conference",
    excerpt: "Our paper on privacy-preserving federated learning for medical diagnosis has been accepted at the International Conference on Machine Learning (ICML) 2024, one of the most prestigious AI venues globally.",
    content: `We are thrilled to announce that our research on "Privacy-Preserving Federated Learning for Medical Diagnosis in Resource-Constrained Edge Devices" has been accepted at ICML 2024.

This work, led by PhD researcher Md. Rashed Kabir under the supervision of Prof. Abul Kashem Mia, presents a breakthrough approach to collaborative AI training that protects patient privacy. The framework enables hospitals to jointly train diagnostic models without sharing raw data.

Key results include a 68% reduction in communication overhead and 97.3% diagnostic accuracy — performance comparable to centralized training with full privacy guarantees.

The paper will be presented in Vienna, Austria in July 2024.`,
    author: "CPLAB Communications",
    publishedDate: "2024-03-15",
    category: "Research Achievement",
    tags: ["Machine Learning", "Federated Learning", "ICML", "Healthcare"],
    featured: true,
  },
  {
    id: "2",
    slug: "new-blockchain-lab-equipment",
    title: "CPLAB Receives High-Performance Computing Grant for Blockchain Research",
    excerpt: "The lab has been awarded a BDT 50 lakh research grant to upgrade computing infrastructure for blockchain and distributed systems research.",
    content: `Cyber Physical Laboratory is proud to announce a major infrastructure upgrade funded by a BDT 50 lakh research grant from the University Grants Commission (UGC).

The grant will be used to procure a high-performance computing cluster with 8x NVIDIA A100 GPUs, dedicated to training large-scale machine learning models and running blockchain simulation experiments at scale.

New equipment will be operational by Q2 2024 and will be available to all active researchers in the lab.`,
    author: "Prof. Abul Kashem Mia",
    publishedDate: "2024-02-20",
    category: "Lab News",
    tags: ["Infrastructure", "Blockchain", "Funding"],
    featured: false,
  },
  {
    id: "3",
    slug: "agritrace-pilot-launch",
    title: "AgriTrace Pilot Launched in Dinajpur District — Connecting 200 Farmers",
    excerpt: "Our blockchain-based agricultural supply chain platform has completed its first real-world pilot with 200 farmers in Dinajpur, achieving full traceability from field to market.",
    content: `AgriTrace, our blockchain-powered agricultural supply chain platform, has successfully launched its pilot program in Dinajpur district, connecting 200 farmers with buyers and consumers.

During the 3-month pilot, the platform processed 15,000+ transactions with 100% uptime and sub-2-second finality. Farmers reported a 15% increase in fair pricing due to increased transparency.

The project, led by Dr. Iqbal and researcher Arif Hossen, demonstrates blockchain's practical impact in developing economies.`,
    author: "Arif Hossen",
    publishedDate: "2024-01-10",
    category: "Project Update",
    tags: ["Blockchain", "AgriTrace", "Pilot", "Community Impact"],
    featured: true,
  },
  {
    id: "4",
    slug: "student-recruitment-2024",
    title: "CPLAB Opens Applications for 2024 Research Cohort — 10 Positions Available",
    excerpt: "We are recruiting motivated undergraduate and graduate students passionate about AI, blockchain, and IoT research for our 2024 research cohort.",
    content: `Cyber Physical Laboratory is now accepting applications for the 2024 research cohort. We have 10 open positions across three research tracks:

**Track 1: Machine Learning & AI** (4 positions)
Focus areas include federated learning, computer vision, and NLP for resource-constrained devices.

**Track 2: Blockchain & Distributed Systems** (3 positions)
Focus on DeFi protocols, smart contract security, and decentralized identity.

**Track 3: IoT & Embedded Systems** (3 positions)
Focus on edge computing, wireless protocols, and smart city applications.

Applications close March 31, 2024. Strong candidates will be contacted for an interview.`,
    author: "CPLAB Recruitment",
    publishedDate: "2023-12-01",
    category: "Recruitment",
    tags: ["Recruitment", "Research", "Students"],
    featured: false,
  },
  {
    id: "5",
    slug: "govid-municipality-pilot",
    title: "GovID System Enters Pilot Phase with Local Municipality",
    excerpt: "Our decentralized identity management system is being piloted with a local municipality to provide privacy-preserving digital citizen services.",
    content: `The GovID project has entered a pilot phase in collaboration with the Dinajpur Municipality. The system currently enables 500 registered citizens to access 3 government services using self-sovereign identity credentials.

Pilot metrics show 98% user satisfaction and zero data breaches in the first 60 days of operation. ZK-proof verifications complete in under 300ms on mid-range smartphones.

Full deployment is expected by Q3 2024 if the pilot continues to succeed.`,
    author: "Tanzim Hossain",
    publishedDate: "2023-11-15",
    category: "Project Update",
    tags: ["Blockchain", "Identity", "e-Governance", "GovID"],
    featured: false,
  },
  {
    id: "6",
    slug: "ieee-iot-journal-publication",
    title: "Smart Grid Research Published in IEEE IoT Journal — 45 Citations in First Month",
    excerpt: "Our smart grid optimization paper has been published in the prestigious IEEE Internet of Things Journal and has already garnered 45 citations within the first month.",
    content: `The paper "Real-Time Smart Grid Optimization Using IoT Sensor Networks and Reinforcement Learning" by Fatema Tuz Zohra and Prof. Abul Kashem Mia has been published in the IEEE Internet of Things Journal.

The work presents a breakthrough in smart grid efficiency using multi-agent reinforcement learning and IoT sensor integration. The 23% energy waste reduction demonstrated in field trials has generated significant academic and industry interest.

The paper has already been cited 45 times since publication, underscoring its impact on the smart energy research community.`,
    author: "Fatema Tuz Zohra",
    publishedDate: "2023-10-05",
    category: "Research Achievement",
    tags: ["Smart Grid", "IoT", "IEEE", "Publication"],
    featured: false,
  },
];

export const announcements = [
  {
    id: "1",
    title: "Lab Meeting — Every Tuesday 4:00 PM",
    description: "Weekly lab meeting in Room 302, CSE Building. All members must attend.",
    date: "2024-01-15",
  },
  {
    id: "2",
    title: "Recruitment 2024 — Applications Open",
    description: "Apply now for BSc/MSc/PhD research positions. Deadline: March 31, 2024.",
    link: "/recruitment",
    date: "2024-01-10",
  },
  {
    id: "3",
    title: "CPLAB Workshop: Intro to Blockchain",
    description: "Free 2-day workshop on blockchain fundamentals and Solidity programming. Feb 15-16.",
    date: "2024-01-05",
  },
  {
    id: "4",
    title: "IEEE CPS 2024 — Paper Submission Deadline",
    description: "Reminder: Full paper submission deadline for IEEE CPS 2024 is February 28, 2024.",
    date: "2023-12-28",
  },
  {
    id: "5",
    title: "New GPU Cluster Coming Q2 2024",
    description: "The lab will receive 8x NVIDIA A100 GPU cluster for ML and blockchain research.",
    date: "2023-12-20",
  },
];
