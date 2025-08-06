"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, ExternalLink, Github } from 'lucide-react';
import { PortfolioNode } from '@/data/portfolioData';

interface ProjectCarouselProps {
  projects: PortfolioNode[];
}

const ProjectCarousel = ({ projects }: ProjectCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextProject = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length);
  };

  // Auto-advance carousel
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      nextProject();
    }, 7000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, projects.length]);

  if (projects.length === 0) {
    return <div className="text-center py-12 text-outline">NO PROJECTS AVAILABLE</div>;
  }

  const currentProject = projects[currentIndex];

  return (
    <div 
      className="relative max-w-5xl mx-auto"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="overflow-hidden rounded-2xl">
        <Card className="bg-gradient-to-br from-gray-700/80 to-gray-900/80 border border-gray-800/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <span className="bg-gradient-to-r from-yellow-500 to-purple-500 bg-clip-text text-transparent font-bold transition-all duration-300">
                {currentProject.name.toUpperCase()}
              </span>
              <div className="flex flex-wrap gap-2">
                {currentProject.links?.map((link, index) => (
                  <Button 
                    key={index} 
                    variant="outline" 
                    size="sm" 
                    className="bg-black border-black text-white hover:bg-gradient-to-r hover:from-purple-600 hover:to-orange-500 hover:border-transparent transition-all duration-300"
                    asChild
                  >
                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                      {link.label.includes('GitHub') ? <Github className="w-4 h-4 mr-2" /> : <ExternalLink className="w-4 h-4 mr-2" />}
                      {link.label.toUpperCase()}
                    </a>
                  </Button>
                ))}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="lg:w-1/2">
                {currentProject.images && currentProject.images.length > 0 ? (
                  <div className="rounded-xl overflow-hidden border border-gray-700 shadow-2xl">
                    <img 
                      src={currentProject.images[0].url} 
                      alt={currentProject.images[0].caption}
                      className="w-full h-64 object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <p className="text-sm text-gray-400 p-3 bg-gray-800/50 text-normal-no-outline">
                      {currentProject.images[0].caption.toUpperCase()}
                    </p>
                  </div>
                ) : (
                  <div className="bg-gray-800/50 border border-gray-700 rounded-xl h-64 flex items-center justify-center shadow-2xl">
                    <span className="text-gray-500 text-normal-no-outline<">NO IMAGE AVAILABLE</span>
                  </div>
                )}
              </div>
              <div className="lg:w-1/2">
                <p className="text-gray-300 mb-6 leading-relaxed text-normal-no-outline">{currentProject.content.toUpperCase()}</p>
                <div className="flex flex-wrap gap-2">
                  {projects.map((project, index) => (
                    <button
                      key={project.id}
                      onClick={() => setCurrentIndex(index)}
                      className={`px-3 py-1.5 rounded-full text-sm transition-all duration-300 text-normal-no-outline ${
                        index === currentIndex 
                          ? 'bg-gradient-to-r from-yellow-500 to-purple-500 shadow-lg hover:text-normal-no-outline' 
                          : 'bg-gray-700/50 hover:bg-gray-600/50 border border-gray-600'
                      }`}
                    >
                      {project.name.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Navigation buttons */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-black border-black text-white hover:bg-gradient-to-r hover:from-purple-600 hover:to-orange-500 hover:border-transparent transition-all duration-300"
        onClick={prevProject}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-black border-black text-white hover:bg-gradient-to-r hover:from-purple-600 hover:to-orange-500 hover:border-transparent transition-all duration-300"
        onClick={nextProject}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Indicators */}
      <div className="flex justify-center mt-8 space-x-2">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-gradient-to-r from-yellow-500 to-purple-500 scale-125' : 'bg-black hover:bg-gradient-to-r hover:from-purple-600 hover:to-orange-500'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectCarousel;
