export interface Project {
  id: string;
  slug: string;
  title: string;
  type: "research" | "student" | "industry";
  status: "active" | "completed" | "ongoing";
  description: string;
  fullDescription: string;
  technologies: string[];
  team: string[];
  startDate: string;
  endDate?: string;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  researchArea: string;
}

export const projects: Project[] = [
  {
    id: "1",
    slug: "blockchain-agri-trace",
    title: "AgriTrace: Blockchain-Powered Agricultural Supply Chain",
    type: "research",
    status: "active",
    description: "A decentralized platform for tracking agricultural goods from farm to consumer using Ethereum-compatible blockchain technology.",
    fullDescription: "AgriTrace is a comprehensive research project that addresses food safety and fair trade challenges in developing economies by implementing a public blockchain-based traceability system. Farmers, distributors, and retailers interact with the platform via a mobile app, while consumers can verify product authenticity by scanning QR codes. The system processes 500+ transactions per second with sub-2-second finality.",
    technologies: ["Ethereum", "Solidity", "Next.js", "IPFS", "React Native", "Node.js"],
    team: ["Md. Shahinul Islam Iqbal", "Arif Hossen"],
    startDate: "2023-01",
    featured: true,
    researchArea: "Blockchain",
  },
  {
    id: "2",
    slug: "fedml-health",
    title: "FedMedAI: Privacy-Preserving Medical AI",
    type: "research",
    status: "active",
    description: "Federated learning framework enabling hospitals to collaboratively train AI diagnostic models without sharing patient data.",
    fullDescription: "FedMedAI tackles the fundamental tension between collaborative AI training and patient privacy in healthcare. By using federated learning with differential privacy, hospitals can contribute to a shared model without ever exposing raw patient records. The system has been piloted with 3 hospitals and achieves diagnostic accuracy within 1.5% of centralized training.",
    technologies: ["Python", "PyTorch", "Flower (flwr)", "Docker", "FastAPI", "React"],
    team: ["Md. Rashed Kabir", "Fatema Tuz Zohra", "Abul Kashem Mia"],
    startDate: "2023-06",
    featured: true,
    researchArea: "Machine Learning",
  },
  {
    id: "3",
    slug: "smart-grid-rl",
    title: "GridOptimizer: Reinforcement Learning for Smart Grids",
    type: "research",
    status: "completed",
    description: "Real-time energy optimization system using multi-agent reinforcement learning across an IoT-connected smart grid network.",
    fullDescription: "GridOptimizer deploys multi-agent RL agents at strategic nodes in a smart grid, enabling autonomous load balancing and peak shaving. The system integrates with 2,000+ IoT sensors for real-time monitoring and achieves 23% energy waste reduction in field trials.",
    technologies: ["Python", "TensorFlow", "MQTT", "InfluxDB", "Grafana", "Raspberry Pi"],
    team: ["Fatema Tuz Zohra", "Abul Kashem Mia"],
    startDate: "2022-03",
    endDate: "2023-12",
    featured: false,
    researchArea: "IoT",
  },
  {
    id: "4",
    slug: "decentral-id-gov",
    title: "GovID: Decentralized Identity for e-Governance",
    type: "research",
    status: "ongoing",
    description: "Self-sovereign identity system using blockchain and ZK-proofs for secure, privacy-preserving citizen authentication.",
    fullDescription: "GovID enables citizens to hold verifiable credentials (national ID, academic degrees, tax records) in a self-sovereign wallet. Zero-knowledge proofs allow selective disclosure — e.g., proving age >18 without revealing date of birth. A pilot is underway with a local municipality.",
    technologies: ["Hyperledger Indy", "snarkjs", "React Native", "Node.js", "PostgreSQL"],
    team: ["Tanzim Hossain", "Md. Shahinul Islam Iqbal"],
    startDate: "2023-09",
    featured: true,
    researchArea: "Blockchain",
  },
  {
    id: "5",
    slug: "iot-anomaly-detector",
    title: "InduSentinel: Real-Time IoT Anomaly Detection",
    type: "student",
    status: "completed",
    description: "Transformer-based anomaly detection system for industrial IoT that runs inference at the edge.",
    fullDescription: "InduSentinel is a lightweight transformer model optimized for edge deployment that detects operational anomalies in industrial equipment. The model runs on a Raspberry Pi 4 and achieves 99.1% detection accuracy while consuming <2W of power.",
    technologies: ["Python", "TensorFlow Lite", "MQTT", "C++", "Raspberry Pi", "React"],
    team: ["Nusrat Jahan", "Md. Rashed Kabir"],
    startDate: "2022-09",
    endDate: "2023-06",
    featured: false,
    researchArea: "IoT",
  },
  {
    id: "6",
    slug: "wsn-smart-city",
    title: "SmartCity WSN: Energy-Efficient Urban Sensing",
    type: "student",
    status: "completed",
    description: "Low-power wireless sensor network deployed across a university campus for air quality, noise, and traffic monitoring.",
    fullDescription: "A real-world deployment of 50+ wireless sensor nodes across campus, implementing our novel energy-efficient clustering protocol. The network has been running continuously for 18 months, with node battery life extended to 3 years (vs 1.5 years baseline).",
    technologies: ["C", "Contiki OS", "MQTT", "Grafana", "InfluxDB", "Python"],
    team: ["Sumaiya Akter", "Abul Kashem Mia"],
    startDate: "2022-01",
    endDate: "2023-09",
    featured: false,
    researchArea: "IoT",
  },
];
