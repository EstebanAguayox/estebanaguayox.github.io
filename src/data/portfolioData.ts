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
  // Projects
  {
    id: "project-portfolio-site",
    name: "Portfolio",
    type: "Project",
    content: "A modern portfolio website with knowledge graph visualization and dynamic content presentation.",
    images: [
      {
        url: "/placeholder.svg",
        caption: "Portfolio website interface"
      }
    ],
    links: [
      {
        url: "https://github.com/yourusername/portfolio",
        label: "GitHub Repository"
      }
    ]
  },
  {
    id: "project-ecommerce-platform",
    name: "E-Commerce Platform",
    type: "Project",
    content: "Full-stack e-commerce solution with React, Node.js, and MongoDB. Features include user authentication, payment processing, and inventory management.",
    images: [
      {
        url: "/placeholder.svg",
        caption: "E-commerce dashboard"
      }
    ],
    links: [
      {
        url: "https://github.com/yourusername/ecommerce",
        label: "GitHub Repository"
      }
    ]
  },
  {
    id: "project-data-visualization",
    name: "Data Visualization Dashboard",
    type: "Project",
    content: "Interactive dashboard for visualizing complex datasets using D3.js and React.",
    images: [
      {
        url: "/placeholder.svg",
        caption: "Data visualization dashboard"
      }
    ],
    links: [
      {
        url: "https://github.com/yourusername/dataviz",
        label: "GitHub Repository"
      }
    ]
  },

  // Technologies
  {
    id: "tech-react",
    name: "React",
    type: "Technology",
    content: "JavaScript library for building user interfaces. Expert-level knowledge in hooks, context, and performance optimization."
  },
  {
    id: "tech-typescript",
    name: "TypeScript",
    type: "Technology",
    content: "Strongly typed programming language that builds on JavaScript. Used in all modern projects for better code quality."
  },
  {
    id: "tech-nodejs",
    name: "Node.js",
    type: "Technology",
    content: "JavaScript runtime for building scalable server-side applications."
  },
  {
    id: "tech-python",
    name: "Python",
    type: "Technology",
    content: "High-level programming language used for data science, automation, and backend development."
  },

  // Skills
  {
    id: "skill-web-dev",
    name: "Web Development",
    type: "Skill",
    content: "Full-stack web development with modern frameworks and best practices."
  },
  {
    id: "skill-ui-ux",
    name: "UI/UX Design",
    type: "Skill",
    content: "User-centered design approach with wireframing and prototyping."
  },
  {
    id: "skill-data-science",
    name: "Data Science",
    type: "Skill",
    content: "Data analysis and visualization using Python libraries like Pandas and Matplotlib."
  },

  // Experience
  {
    id: "exp-senior-dev",
    name: "Senior Developer",
    type: "Experience",
    content: "Led development team of 5 developers, mentored junior developers, and architected scalable solutions."
  },
  {
    id: "exp-frontend-lead",
    name: "Frontend Lead",
    type: "Experience",
    content: "Responsible for frontend architecture and implementation of complex user interfaces."
  },

  // Topics
  {
    id: "topic-ai-ml",
    name: "AI & Machine Learning",
    type: "Topic",
    content: "Passionate about artificial intelligence and machine learning applications."
  },
  {
    id: "topic-web3",
    name: "Web3 & Blockchain",
    type: "Topic",
    content: "Exploring decentralized technologies and their applications."
  },
  {
    id: "topic-cloud-computing",
    name: "Cloud Computing",
    type: "Topic",
    content: "Expertise in cloud platforms and serverless architectures."
  }
];

export const portfolioEdges: PortfolioEdge[] = [
  // Project relationships
  {
    source: "project-portfolio-site",
    target: "tech-react",
    relationship: "uses"
  },
  {
    source: "project-portfolio-site",
    target: "tech-typescript",
    relationship: "uses"
  },
  {
    source: "project-portfolio-site",
    target: "topic-ai-ml",
    relationship: "related_to"
  },
  {
    source: "project-ecommerce-platform",
    target: "tech-nodejs",
    relationship: "uses"
  },
  {
    source: "project-ecommerce-platform",
    target: "skill-web-dev",
    relationship: "applies"
  },
  {
    source: "project-data-visualization",
    target: "skill-data-science",
    relationship: "applies"
  },
  {
    source: "project-data-visualization",
    target: "tech-python",
    relationship: "uses"
  },

  // Experience relationships
  {
    source: "exp-senior-dev",
    target: "skill-web-dev",
    relationship: "applies"
  },
  {
    source: "exp-frontend-lead",
    target: "tech-react",
    relationship: "uses"
  },

  // Skill relationships
  {
    source: "skill-ui-ux",
    target: "topic-web3",
    relationship: "related_to"
  },
  {
    source: "skill-data-science",
    target: "topic-ai-ml",
    relationship: "related_to"
  }
];

// Helper function to get nodes by type
export const getNodesByType = (type: NodeType) => {
  return portfolioNodes.filter(node => node.type === type);
};