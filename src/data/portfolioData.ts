// Node types for the portfolio
export type NodeType = 'Project' | 'Technology' | 'Skill' | 'Experience' | 'Topic';

export interface NodeImage {
  url: string;
  caption: string;
}

export interface NodeLink {
  url: string;
  label: string;
}

export interface PortfolioNode {
  id: string;
  name: string;
  type: NodeType;
  content: string;
  images?: NodeImage[];
  links?: NodeLink[];
}

export interface PortfolioEdge {
  source: string;
  target: string;
  relationship: string;
}

 // Sample portfolio data
export const portfolioNodes: PortfolioNode[] = [
  // Projects (from Obsidian vault cover letters)
  {
    id: "project-fullstack-rag",
    name: "Full Stack LLM App with RAG",
    type: "Project",
    content: "Internal conversational AI tool with RAG service integration for consultants. Features user authentication, flexible model providers, multi-user concurrency, and long-term memory. Designed and deployed to optimize internal information lookup.",
    images: [
      {
        url: "/placeholder.svg",
        caption: "RAG application architecture"
      }
    ],
    links: [
      {
        url: "https://obsidian.local/Personal/MS%20Cover%20Letter.md",
        label: "Source: MS Cover Letter (Obsidian)"
      }
    ]
  },
  {
    id: "project-synth-data-dtwins",
    name: "Synthetic Data Generation for Digital Twins",
    type: "Project",
    content: "Synthetic data pipeline using NVIDIA Omniverse to generate flexible CV datasets and loop AI inference back into simulations via OPC UA. Supports scenario randomization and data generation for data-scarce environments.",
    images: [
      {
        url: "/placeholder.svg",
        caption: "Synthetic data generation pipeline"
      }
    ],
    links: [
      {
        url: "https://obsidian.local/Personal/MS%20Cover%20Letter.md",
        label: "Source: MS Cover Letter (Obsidian)"
      }
    ]
  },
  {
    id: "project-gtm-mcp-app",
    name: "GTM Demo: MCP + LLM Integrated Portfolio App",
    type: "Project",
    content: "Go-to-market engineering demo showcasing Model Context Protocol (MCP) integrations with Obsidian vault and LLM-powered curation. Features: vault ingestion via MCP tools, topic extraction with sequential thinking, TypeScript data pipeline into a React UI, and CI/CD-ready structure.",
    images: [
      { url: "/placeholder.svg", caption: "MCP and LLM integration flow" }
    ],
    links: [
      { url: "https://obsidian.local/OBSIDIAN%20MCPS.md", label: "Vault: OBSIDIAN MCPS" }
    ]
  },
  {
    id: "project-piv-dust-monitoring",
    name: "Particle Image Velocimetry for Dust Monitoring",
    type: "Project",
    content: "Thesis project using Particle Image Velocimetry to estimate dust particle generation in ROCKWOOL manufacturing. Aimed at improving environmental cleanliness and worker health while informing process efficiency decisions.",
    images: [
      { url: "/placeholder.svg", caption: "PIV-based dust estimation concept" }
    ],
    links: [
      { url: "https://obsidian.local/Personal/Academic%20Projects/MSc%20Thesis%20Intern%2C%20ROCKWOOL%20(DTU).md", label: "Vault: MSc Thesis (DTU/ROCKWOOL)" }
    ]
  },

  // Technologies (tools mentioned in vault)
  {
    id: "tech-langchain",
    name: "LangChain",
    type: "Technology",
    content: "Framework used to build RAG agents and conversational AI workflows."
  },
  {
    id: "tech-docker",
    name: "Docker",
    type: "Technology",
    content: "Containerization used for deploying applications and ML services."
  },
  {
    id: "tech-opcua",
    name: "OPC UA",
    type: "Technology",
    content: "Industrial communication protocol used to integrate simulations and plant systems."
  },
  {
    id: "tech-mqtt",
    name: "MQTT",
    type: "Technology",
    content: "Lightweight pub/sub protocol used for real-time inference integration."
  },
  {
    id: "tech-omniverse",
    name: "NVIDIA Omniverse",
    type: "Technology",
    content: "Platform used to build synthetic environments for digital twins and CV data generation."
  },
  {
    id: "tech-python",
    name: "Python",
    type: "Technology",
    content: "Primary language for AI/ML, data processing, and backend services."
  },
  {
    id: "tech-react",
    name: "React",
    type: "Technology",
    content: "Frontend framework used for building operator and internal UIs."
  },

  // Skills (from vault narrative)
  {
    id: "skill-stakeholder-mgmt",
    name: "Stakeholder Management",
    type: "Skill",
    content: "Aligning interests and communicating at the right abstraction level across IT/OT and business stakeholders."
  },
  {
    id: "skill-product-ideation",
    name: "Product Ideation",
    type: "Skill",
    content: "Identifying opportunities, scoping value, and iterating fast from prototype to scalable solution."
  },
  {
    id: "skill-fullstack",
    name: "Full-stack Development",
    type: "Skill",
    content: "Building end-to-end systems across Python backends, React frontends, and infrastructure."
  },
  {
    id: "skill-gtm-engineering",
    name: "GTM Engineering",
    type: "Skill",
    content: "Go-to-market technical enablement: demos, integrations, and solution packaging to showcase value and drive adoption."
  },
  {
    id: "skill-data-pipelines",
    name: "Data Pipelines",
    type: "Skill",
    content: "Designing and operating ingestion, transformation, and orchestration for analytics and ML systems."
  },
  {
    id: "skill-cicd",
    name: "CI/CD",
    type: "Skill",
    content: "Building pipelines for testing, building, and deploying apps and ML services with reliability and speed."
  },
  {
    id: "skill-uiux",
    name: "UI/UX Awareness",
    type: "Skill",
    content: "Applying basic design principles to craft usable operator and demo interfaces."
  },
  {
    id: "skill-computer-vision",
    name: "Computer Vision",
    type: "Skill",
    content: "Experience in visual inspection, augmentation strategies, and PIV-based analysis for industrial processes."
  },
  {
    id: "skill-python",
    name: "Python",
    type: "Skill",
    content: "Primary programming language for data pipelines, ML, and backend services."
  },

  // Experience (orgs and roles)
  {
    id: "exp-projectbinder",
    name: "Data Science Specialist — ProjectBinder",
    type: "Experience",
    content: "Led AI initiatives bridging IT and OT in manufacturing; built RAG app, synthetic data pipelines, predictive maintenance, and alarm management assessments using ISA95, OPC UA, MQTT, and Kafka."
  },
  {
    id: "exp-rockwool",
    name: "Solutions Developer — ROCKWOOL",
    type: "Experience",
    content: "Explored AR with HoloLens 2 and Unity; trained PyTorch CV models; delivered Python/React UIs for thermal monitoring."
  },
  {
    id: "exp-drc",
    name: "System Administrator & BI Developer — Danish Refugee Council",
    type: "Experience",
    content: "Automated reporting with SQL and PowerBI; digitized fundraising operations; built monthly insights."
  },

  // Topics (expanded from vault research)
  {
    id: "topic-human-in-the-loop",
    name: "Human-in-the-loop AI in Manufacturing",
    type: "Topic",
    content: "Designing AI systems that augment operators and engineers, with oversight and collaboration to ensure trust, safety, and effectiveness on the shop floor."
  },
  {
    id: "topic-cv-quality",
    name: "Computer Vision for Quality Inspection",
    type: "Topic",
    content: "Visual inspection pipelines for repetitive tasks; robustness via augmentation; intuitive explainability through image-based detections."
  },
  {
    id: "topic-predictive-maintenance",
    name: "Predictive Maintenance & Condition-Based Monitoring",
    type: "Topic",
    content: "Multivariate time-series modeling to anticipate failures and schedule interventions, harmonized with plant standards and operations."
  },
  {
    id: "topic-alarm-intelligence",
    name: "Alarm Management Intelligence",
    type: "Topic",
    content: "Event correlation, root cause insights, and prioritization to reduce noise and increase operator clarity during complex plant events."
  },
  {
    id: "topic-industrial-data-infra",
    name: "Industrial Data Infrastructure",
    type: "Topic",
    content: "ISA-95 aligned architectures and IIoT messaging (OPC UA, MQTT, Kafka) to integrate simulations, equipment, and enterprise systems."
  },
  {
    id: "topic-digital-twins",
    name: "Digital Twins & Synthetic Data",
    type: "Topic",
    content: "Simulation-in-the-loop with Omniverse, synthetic datasets for data-scarce CV problems, and bidirectional loops between models and twins."
  },
  {
    id: "topic-enterprise-rag",
    name: "Enterprise RAG & Knowledge Ops",
    type: "Topic",
    content: "Confidential retrieval-augmented generation systems for internal knowledge, document extraction, and decision support."
  },
  {
    id: "topic-mlops-industrial",
    name: "MLOps in Industrial Settings",
    type: "Topic",
    content: "Governable model lifecycle from experimentation to production, with containerization, monitoring, and change management."
  },
  {
    id: "topic-sensor-fusion",
    name: "Multimodal Sensor Fusion & Signal Processing",
    type: "Topic",
    content: "Combining vision and non-vision signals to detect hidden defects and deliver robust diagnostics beyond superficial cues."
  },
  {
    id: "topic-digital-transformation",
    name: "Digital Transformation & IT/OT Convergence",
    type: "Topic",
    content: "Scaling beyond pilots, breaking silos, and aligning stakeholders to deliver value-adding Industry 4.0 solutions."
  }
];

export const portfolioEdges: PortfolioEdge[] = [
  // Project relationships
  { source: "project-fullstack-rag", target: "tech-langchain", relationship: "uses" },
  { source: "project-fullstack-rag", target: "tech-docker", relationship: "uses" },
  { source: "project-fullstack-rag", target: "tech-python", relationship: "uses" },
  { source: "project-fullstack-rag", target: "tech-react", relationship: "uses" },
  { source: "project-fullstack-rag", target: "topic-enterprise-rag", relationship: "related_to" },
  { source: "project-fullstack-rag", target: "topic-mlops-industrial", relationship: "related_to" },

  { source: "project-synth-data-dtwins", target: "tech-omniverse", relationship: "uses" },
  { source: "project-synth-data-dtwins", target: "tech-opcua", relationship: "uses" },
  { source: "project-synth-data-dtwins", target: "tech-mqtt", relationship: "uses" },
  { source: "project-synth-data-dtwins", target: "tech-python", relationship: "uses" },
  { source: "project-synth-data-dtwins", target: "topic-digital-twins", relationship: "related_to" },
  { source: "project-synth-data-dtwins", target: "topic-industrial-data-infra", relationship: "related_to" },
  { source: "project-synth-data-dtwins", target: "topic-sensor-fusion", relationship: "related_to" },

  // New project edges
  { source: "project-gtm-mcp-app", target: "topic-enterprise-rag", relationship: "related_to" },
  { source: "project-gtm-mcp-app", target: "topic-mlops-industrial", relationship: "related_to" },
  { source: "project-gtm-mcp-app", target: "skill-gtm-engineering", relationship: "applies" },
  { source: "project-gtm-mcp-app", target: "skill-data-pipelines", relationship: "applies" },
  { source: "project-gtm-mcp-app", target: "skill-cicd", relationship: "applies" },
  { source: "project-gtm-mcp-app", target: "skill-uiux", relationship: "applies" },
  { source: "project-gtm-mcp-app", target: "tech-react", relationship: "uses" },
  { source: "project-gtm-mcp-app", target: "tech-python", relationship: "uses" },

  { source: "project-piv-dust-monitoring", target: "topic-sensor-fusion", relationship: "related_to" },
  { source: "project-piv-dust-monitoring", target: "topic-cv-quality", relationship: "related_to" },
  { source: "project-piv-dust-monitoring", target: "skill-computer-vision", relationship: "applies" },
  { source: "project-piv-dust-monitoring", target: "skill-python", relationship: "applies" },

  // Experience relationships
  { source: "exp-projectbinder", target: "skill-fullstack", relationship: "applies" },
  { source: "exp-projectbinder", target: "skill-stakeholder-mgmt", relationship: "applies" },
  { source: "exp-projectbinder", target: "topic-digital-transformation", relationship: "related_to" },
  { source: "exp-rockwool", target: "tech-react", relationship: "uses" },
  { source: "exp-rockwool", target: "topic-cv-quality", relationship: "related_to" },
  { source: "exp-drc", target: "skill-product-ideation", relationship: "applies" },

  // Skill relationships
  { source: "skill-fullstack", target: "topic-mlops-industrial", relationship: "related_to" },
  { source: "skill-stakeholder-mgmt", target: "topic-digital-transformation", relationship: "related_to" },
  { source: "skill-product-ideation", target: "topic-human-in-the-loop", relationship: "related_to" },
  { source: "skill-gtm-engineering", target: "topic-enterprise-rag", relationship: "related_to" },
  { source: "skill-data-pipelines", target: "topic-industrial-data-infra", relationship: "related_to" },
  { source: "skill-cicd", target: "topic-mlops-industrial", relationship: "related_to" },
  { source: "skill-uiux", target: "topic-human-in-the-loop", relationship: "related_to" },
  { source: "skill-computer-vision", target: "topic-cv-quality", relationship: "related_to" }
];

// Helper function to get nodes by type
export const getNodesByType = (type: NodeType) => {
  return portfolioNodes.filter(node => node.type === type);
};
