"use client";

import { useState, useEffect, useRef } from 'react';
import { portfolioNodes, portfolioEdges } from '@/data/portfolioData';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

const KnowledgeGraph = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);

  // Node positions (will be randomized)
  const nodePositions = useRef<any>({});
  const animationRef = useRef<number>(0);

  // Initialize node positions
  useEffect(() => {
    portfolioNodes.forEach(node => {
      nodePositions.current[node.id] = {
        x: Math.random() * 600 + 100,
        y: Math.random() * 400 + 100,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5
      };
    });
  }, []);

  // Draw the graph
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw edges
      ctx.strokeStyle = 'rgba(200, 200, 200, 0.4)';
      ctx.lineWidth = 1.5;
      
      portfolioEdges.forEach(edge => {
        const sourcePos = nodePositions.current[edge.source];
        const targetPos = nodePositions.current[edge.target];
        
        if (sourcePos && targetPos) {
          ctx.beginPath();
          ctx.moveTo(sourcePos.x, sourcePos.y);
          ctx.lineTo(targetPos.x, targetPos.y);
          ctx.stroke();
          
          // Draw relationship label
          const midX = (sourcePos.x + targetPos.x) / 2;
          const midY = (sourcePos.y + targetPos.y) / 2;
          
          ctx.fillStyle = 'rgba(220, 220, 220, 0.9)';
          ctx.font = '12px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(edge.relationship.toUpperCase(), midX, midY - 8);
        }
      });
      
      // Draw nodes
      portfolioNodes.forEach(node => {
        const pos = nodePositions.current[node.id];
        if (!pos) return;
        
        // Update position with physics
        pos.x += pos.vx;
        pos.y += pos.vy;
        
        // Boundary checks
        if (pos.x < 30) {
          pos.x = 30;
          pos.vx *= -0.8;
        } else if (pos.x > canvas.width - 30) {
          pos.x = canvas.width - 30;
          pos.vx *= -0.8;
        }
        
        if (pos.y < 30) {
          pos.y = 30;
          pos.vy *= -0.8;
        } else if (pos.y > canvas.height - 30) {
          pos.y = canvas.height - 30;
          pos.vy *= -0.8;
        }
        
        // Apply slight damping
        pos.vx *= 0.99;
        pos.vy *= 0.99;
        
        // Draw node
        const isSelected = selectedNode?.id === node.id;
        const radius = isSelected ? 28 : 22;
        
        // Node color based on type
        let color = '#3b82f6'; // Default blue
        switch (node.type) {
          case 'Project':
            color = '#10b981'; // Green
            break;
          case 'Technology':
            color = '#8b5cf6'; // Purple
            break;
          case 'Skill':
            color = '#f59e0b'; // Amber
            break;
          case 'Experience':
            color = '#ef4444'; // Red
            break;
          case 'Topic':
            color = '#06b6d4'; // Cyan
            break;
        }
        
        // Draw glow effect for selected node
        if (isSelected) {
          const gradient = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, radius * 2);
          gradient.addColorStop(0, `${color}80`);
          gradient.addColorStop(1, 'transparent');
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, radius * 2, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
        }
        
        // Draw node without outline
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = isSelected ? color : `${color}CC`;
        ctx.fill();
        
        // Node label without outline
        ctx.fillStyle = 'white';
        ctx.font = isSelected ? 'bold 14px sans-serif' : '13px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.name.toUpperCase(), pos.x, pos.y);
      });
      
      animationRef.current = requestAnimationFrame(draw);
    };
    
    animationRef.current = requestAnimationFrame(draw);
    
    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [selectedNode]);

  // Handle canvas resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  // Handle mouse events for interaction
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Check if clicked on a node
    for (const node of portfolioNodes) {
      const pos = nodePositions.current[node.id];
      if (!pos) continue;
      
      const distance = Math.sqrt((x - pos.x) ** 2 + (y - pos.y) ** 2);
      if (distance < 28) {
        setSelectedNode(node);
        setIsDragging(true);
        setDragStart({ x: x - pos.x, y: y - pos.y });
        return;
      }
    }
    
    // If not clicking on a node, deselect
    setSelectedNode(null);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging || !selectedNode) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const pos = nodePositions.current[selectedNode.id];
    if (pos) {
      pos.x = x - dragStart.x;
      pos.y = y - dragStart.y;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setScale(prev => Math.min(Math.max(prev * delta, 0.5), 3));
  };

  return (
    <div className="relative">
      <div className="mb-4 flex flex-wrap gap-2 justify-between items-center">
        <div className="flex flex-wrap gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-black border-black text-white hover:bg-gradient-to-r hover:from-purple-600 hover:to-orange-500 hover:border-transparent transition-all duration-300"
            onClick={() => setSelectedNode(null)}
          >
            RESET VIEW
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          <div className="flex items-center text-xs text-gray-300">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div> PROJECT
            <div className="w-3 h-3 rounded-full bg-purple-500 mr-1 ml-3"></div> TECHNOLOGY
            <div className="w-3 h-3 rounded-full bg-amber-500 mr-1 ml-3"></div> SKILL
            <div className="w-3 h-3 rounded-full bg-red-500 mr-1 ml-3"></div> EXPERIENCE
            <div className="w-3 h-3 rounded-full bg-cyan-500 mr-1 ml-3"></div> TOPIC
          </div>
        </div>
      </div>
      
      <div className="relative border border-gray-700/50 rounded-xl overflow-hidden bg-gray-900/30 backdrop-blur-sm">
        <canvas
          ref={canvasRef}
          className="w-full h-[500px] cursor-pointer"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onWheel={handleWheel}
        />
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
                onClick={() => setSelectedNode(null)}
                className="text-gray-400 hover:text-white hover:bg-black hover:bg-gradient-to-r hover:from-purple-600 hover:to-orange-500 transition-all duration-300"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <p className="mt-4 text-gray-300 leading-relaxed text-normal-no-outline">{selectedNode.content.toUpperCase()}</p>
            {selectedNode.images && selectedNode.images.length > 0 && (
              <div className="mt-4">
                <img 
                  src={selectedNode.images[0].url} 
                  alt={selectedNode.images[0].caption}
                  className="rounded-lg border border-gray-700/50 max-w-full h-auto shadow-lg"
                />
                <p className="text-sm text-gray-400 mt-2 text-normal-no-outline">{selectedNode.images[0].caption.toUpperCase()}</p>
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
      
      <div className="mt-4 text-sm text-gray-400 text-center text-normal-no-outline">
        <p>CLICK AND DRAG NODES TO INTERACT WITH THE GRAPH. SCROLL TO ZOOM.</p>
      </div>
    </div>
  );
};

export default KnowledgeGraph;
