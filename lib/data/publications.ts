export interface Publication {
  id: string;
  slug: string;
  title: string;
  authors: string[];
  type: "journal" | "conference" | "book-chapter" | "workshop";
  venue: string;
  year: number;
  abstract: string;
  keywords: string[];
  doi?: string;
  arxiv?: string;
  pdfUrl?: string;
  citations?: number;
}

export const publications: Publication[] = [
  {
    id: "1",
    slug: "blockchain-supply-chain-2024",
    title: "A Decentralized Blockchain Framework for Transparent Supply Chain Management in Developing Economies",
    authors: ["Md. Shahinul Islam Iqbal", "Arif Hossen", "Abul Kashem Mia"],
    type: "journal",
    venue: "IEEE Transactions on Industrial Informatics",
    year: 2024,
    abstract:
      "This paper proposes a decentralized blockchain framework for supply chain transparency, focusing on agricultural goods in developing economies. Our system achieves sub-second transaction finality while maintaining full traceability from farm to consumer.",
    keywords: ["Blockchain", "Supply Chain", "Decentralization", "Agriculture", "Traceability"],
    doi: "10.1109/tii.2024.001",
    citations: 12,
  },
  {
    id: "2",
    slug: "federated-learning-healthcare-2024",
    title: "Privacy-Preserving Federated Learning for Medical Diagnosis in Resource-Constrained Edge Devices",
    authors: ["Md. Rashed Kabir", "Abul Kashem Mia", "Fatema Tuz Zohra"],
    type: "conference",
    venue: "International Conference on Machine Learning (ICML) 2024",
    year: 2024,
    abstract:
      "We present a novel federated learning framework that enables privacy-preserving medical diagnosis on edge devices with limited computational resources. Our approach reduces communication overhead by 68% while maintaining 97.3% diagnostic accuracy.",
    keywords: ["Federated Learning", "Privacy", "Healthcare", "Edge Computing", "Deep Learning"],
    doi: "10.1109/icml.2024.002",
    citations: 28,
  },
  {
    id: "3",
    slug: "iot-smart-grid-2023",
    title: "Real-Time Smart Grid Optimization Using IoT Sensor Networks and Reinforcement Learning",
    authors: ["Fatema Tuz Zohra", "Abul Kashem Mia"],
    type: "journal",
    venue: "IEEE Internet of Things Journal",
    year: 2023,
    abstract:
      "This research presents a real-time optimization framework for smart grid management leveraging a dense IoT sensor network and reinforcement learning agents. Field trials demonstrate 23% reduction in energy wastage.",
    keywords: ["Smart Grid", "IoT", "Reinforcement Learning", "Energy Optimization"],
    doi: "10.1109/jiot.2023.003",
    citations: 45,
  },
  {
    id: "4",
    slug: "anomaly-detection-iot-2023",
    title: "Deep Learning-Based Anomaly Detection in Industrial IoT: A Comparative Study",
    authors: ["Nusrat Jahan", "Md. Rashed Kabir", "Abul Kashem Mia"],
    type: "conference",
    venue: "IEEE International Conference on Internet of Things (IoTCon) 2023",
    year: 2023,
    abstract:
      "We conduct a comprehensive comparative study of deep learning architectures for anomaly detection in industrial IoT environments. Our evaluation on 5 real-world datasets shows transformer-based models achieve 99.1% detection accuracy.",
    keywords: ["Anomaly Detection", "Industrial IoT", "Deep Learning", "Transformers"],
    citations: 31,
  },
  {
    id: "5",
    slug: "blockchain-identity-2023",
    title: "Decentralized Identity Management for e-Governance Using Blockchain and Zero-Knowledge Proofs",
    authors: ["Tanzim Hossain", "Md. Shahinul Islam Iqbal"],
    type: "conference",
    venue: "ACM CCS 2023 (Workshop on Blockchain Security)",
    year: 2023,
    abstract:
      "We propose a decentralized identity management system for e-governance services that leverages blockchain and zero-knowledge proofs for privacy-preserving verification, enabling citizens to prove attributes without revealing sensitive data.",
    keywords: ["Blockchain", "Identity Management", "Zero-Knowledge Proofs", "e-Governance"],
    citations: 19,
  },
  {
    id: "6",
    slug: "wsn-energy-efficiency-2022",
    title: "Energy-Efficient Clustering Protocol for Wireless Sensor Networks in Smart City Applications",
    authors: ["Sumaiya Akter", "Abul Kashem Mia"],
    type: "journal",
    venue: "Sensors Journal (MDPI)",
    year: 2022,
    abstract:
      "This paper introduces an energy-efficient clustering protocol that extends the network lifetime of wireless sensor networks by 40% compared to existing protocols, validated in a real smart city pilot deployment.",
    keywords: ["WSN", "Energy Efficiency", "Smart City", "Clustering Protocol"],
    doi: "10.3390/s2022001",
    citations: 67,
  },
  {
    id: "7",
    slug: "cyber-physical-review-2022",
    title: "Cyber-Physical Systems: A Survey of Recent Advances, Challenges, and Future Directions",
    authors: ["Abul Kashem Mia", "Md. Shahinul Islam Iqbal"],
    type: "journal",
    venue: "ACM Computing Surveys",
    year: 2022,
    abstract:
      "A comprehensive survey of recent developments in cyber-physical systems covering architectures, communication protocols, security challenges, and emerging application domains including healthcare, transportation, and manufacturing.",
    keywords: ["Cyber-Physical Systems", "Survey", "IoT", "Security", "Architecture"],
    doi: "10.1145/csur.2022.001",
    citations: 142,
  },
  {
    id: "8",
    slug: "ml-precision-agriculture-2021",
    title: "Machine Learning for Precision Agriculture: From Sensor Data to Actionable Insights",
    authors: ["Mahmudul Hasan", "Abul Kashem Mia"],
    type: "book-chapter",
    venue: "Advances in Smart Agriculture Systems, Springer",
    year: 2021,
    abstract:
      "This book chapter presents machine learning pipelines for precision agriculture, detailing data collection from IoT sensors, feature engineering, model training, and deployment on resource-constrained farm devices.",
    keywords: ["Machine Learning", "Precision Agriculture", "IoT", "Feature Engineering"],
    citations: 89,
  },
];
