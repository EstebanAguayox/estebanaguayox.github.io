import { useState } from 'react';
import { portfolioNodes, PortfolioNode, NodeType } from '@/data/portfolioData';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronDown, X } from 'lucide-react';

interface CategoriesTreeProps {
  onNodeSelect?: (node: PortfolioNode) => void;
  selectedNode?: PortfolioNode | null;
}

const CategoriesTree = ({ onNodeSelect, selectedNode }: CategoriesTreeProps) => {
  const [expandedCategories, setExpandedCategories] = useState<Set<NodeType>>(new Set());
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  // Group nodes by type
  const nodesByType = portfolioNodes.reduce((acc, node) => {
    if (!acc[node.type]) {
      acc[node.type] = [];
    }
    acc[node.type].push(node);
    return acc;
  }, {} as Record<NodeType, PortfolioNode[]>);

  // Type colors mapping
  const typeColors: Record<NodeType, string> = {
    'Project': 'bg-green-500',
    'Technology': 'bg-purple-500',
    'Skill': 'bg-amber-500',
    'Experience': 'bg-red-500',
    'Topic': 'bg-cyan-500',
  };

  // Type icons mapping
  const typeIcons: Record<NodeType, string> = {
    'Project': '📁',
    'Technology': '⚙️',
    'Skill': '💡',
    'Experience': '💼',
    'Topic': '📚',
  };

  const toggleCategory = (type: NodeType) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(type)) {
      newExpanded.delete(type);
    } else {
      newExpanded.add(type);
    }
    setExpandedCategories(newExpanded);
  };

  const handleNodeClick = (node: PortfolioNode) => {
    setSelectedNodeId(node.id);
    if (onNodeSelect) {
      onNodeSelect(node);
    }
  };

  const handleCloseDetail = () => {
    setSelectedNodeId(null);
    if (onNodeSelect) {
      onNodeSelect(null as any);
    }
  };

  return (
    <div className="relative">
      <div className="mb-4">
        <p className="text-sm text-gray-400 text-center">
          EXPLORE KNOWLEDGE ORGANIZED BY CATEGORIES
        </p>
      </div>
      
      <div className="bg-gray-900/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
        <div className="space-y-2">
          {Object.entries(nodesByType).map(([type, nodes]) => {
            const nodeType = type as NodeType;
            const isExpanded = expandedCategories.has(nodeType);
            const color = typeColors[nodeType];
            const icon = typeIcons[nodeType];

            return (
              <div key={nodeType} className="border border-gray-700/50 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleCategory(nodeType)}
                  className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-800/50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{icon}</span>
                    <span className="font-semibold text-white">{nodeType.toUpperCase()}</span>
                    <span className="text-sm text-gray-400">({nodes.length})</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${color}`}></div>
                    {isExpanded ? (
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                </button>
                
                {isExpanded && (
                  <div className="px-4 pb-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                      {nodes.map((node) => (
                        <button
                          key={node.id}
                          onClick={() => handleNodeClick(node)}
                          className={`p-3 text-left rounded-lg border transition-all duration-200 ${
                            selectedNodeId === node.id
                              ? 'bg-gray-700/50 border-gray-500'
                              : 'bg-gray-800/30 border-gray-600/50 hover:bg-gray-700/30 hover:border-gray-500'
                          }`}
                        >
                          <div className="font-medium text-white text-sm">{node.name}</div>
                          <div className="text-xs text-gray-400 mt-1 line-clamp-2">
                            {node.content.substring(0, 60)}...
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {selectedNode && (
        <Card className="mt-6 bg-gray-800/80 border-gray-700/50 backdrop-blur-sm">
          <CardContent className="p-5">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-yellow-500 to-purple-500 bg-clip-text text-transparent">
                  {selectedNode.name.toUpperCase()}
                </h3>
                <span className="inline-block px-2.5 py-1 text-xs rounded-full bg-gray-700/50 mt-2 text-gray-200">
                  {selectedNode.type.toUpperCase()}
                </span>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleCloseDetail}
                className="text-gray-400 hover:text-white hover:bg-black hover:bg-gradient-to-r hover:from-purple-600 hover:to-orange-500 transition-all duration-300"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <p className="mt-4 text-gray-300 leading-relaxed">{selectedNode.content}</p>
            {selectedNode.images && selectedNode.images.length > 0 && (
              <div className="mt-4">
                <img 
                  src={selectedNode.images[0].url} 
                  alt={selectedNode.images[0].caption}
                  className="rounded-lg border border-gray-700/50 max-w-full h-auto shadow-lg"
                />
                <p className="text-sm text-gray-400 mt-2">{selectedNode.images[0].caption}</p>
              </div>
            )}
            {selectedNode.links && selectedNode.links.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {selectedNode.links.map((link: any, index: number) => (
                  <Button 
                    key={index} 
                    variant="outline" 
                    size="sm" 
                    className="bg-black border-black text-white hover:bg-gradient-to-r hover:from-purple-600 hover:to-orange-500 hover:border-transparent transition-all duration-300"
                    asChild
                  >
                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                      {link.label.toUpperCase()}
                    </a>
                  </Button>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CategoriesTree;
