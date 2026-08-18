export interface Resource {
  id: string;
  slug: string;
  title: string;
  resourceType: "dataset" | "tool" | "code" | "paper";
  description: string;
  category: string;
  tags: string[];
  fileUrl?: string;
  externalUrl?: string;
  coverImage?: string;
  featured: boolean;
}

export const resources: Resource[] = [
  {
    id: "1",
    slug: "agritrace-supply-chain-dataset",
    title: "AgriTrace Supply Chain Transactions Dataset",
    resourceType: "dataset",
    description:
      "15,000+ anonymized blockchain transactions from the AgriTrace pilot in Dinajpur, covering farm-to-market produce traceability records.",
    category: "Blockchain",
    tags: ["Blockchain", "Supply Chain", "Agriculture"],
    externalUrl: "https://github.com",
    featured: true,
  },
  {
    id: "2",
    slug: "fedmedai-benchmark-suite",
    title: "FedMedAI Federated Learning Benchmark Suite",
    resourceType: "code",
    description:
      "Reference implementation and evaluation harness for privacy-preserving federated learning experiments on medical imaging data.",
    category: "Machine Learning",
    tags: ["Federated Learning", "Healthcare", "PyTorch"],
    externalUrl: "https://github.com",
    featured: true,
  },
  {
    id: "3",
    slug: "smart-grid-sensor-readings",
    title: "Smart Grid IoT Sensor Readings (2022-2023)",
    resourceType: "dataset",
    description:
      "Eighteen months of time-series sensor readings from a 2,000-node IoT-connected smart grid deployment used in the GridOptimizer project.",
    category: "IoT",
    tags: ["IoT", "Smart Grid", "Time Series"],
    externalUrl: "https://github.com",
    featured: false,
  },
];
