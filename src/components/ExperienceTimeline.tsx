"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface TimelineEvent {
  id: string;
  period: string;
  title: string;
  location: string;
  description: string;
}

const ExperienceTimeline = () => {
  const [visibleEvents, setVisibleEvents] = useState<Set<string>>(new Set());

  // Sample experience data - replace with your actual experience
  const timelineEvents: TimelineEvent[] = [
    {
      id: "exp-1",
      period: "2024 - 2025",
      title: "Data Science Specialist",
      location: "ProjectBinder ApS, Copenhagen, DK",
      description: "Leaded the companies's AI-driven solutions. Proposed computer vision integrations for Digital Twins. Helped customers understand and drive decision making with data to increse systems inisght and OEE. Bridging IT/OT following ISA-95 principles and embracing an UNS-like open architecture."
    },
    {
      id: "exp-2",
      period: "2023 - 2024",
      title: "Solutions Developer",
      location: "ROCKWOOL ApS, Hedehusene, DK",
      description: "Developed machine learning pipelines to automate blue collar operator tasks within factories, empowering autonomous supervision of manufaturing processes."
    },
    {
      id: "exp-3",
      period: "2022 - 2023",
      title: "Software Engineer",
      location: "ROCKWOOL ApS, Hedehusene, DK",
      description: "Built custom solutions to enable streamlining of procedures and shared knowledged in the Group Technologies department. Integrated dataflows in Augmented Reality tools for operator training."
    },
    {
      id: "exp-4",
      period: "2021 - 2022",
      title: "BI Spceialist",
      location: "Danish Refugee Council, Copenhagen, DK",
      description: "Used BI to enable fundraise department and system administration to understand patterns and trend oer the underlying data of the NGO's ERP logs. Automated reporting and data sharing between departments to agilize internal processes. "
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleEvents(prev => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.5 }
    );

    timelineEvents.forEach(event => {
      const element = document.getElementById(`event-${event.id}`);
      if (element) observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, [timelineEvents]);

  return (
    <div className="relative">
      {/* Vertical timeline line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-purple-500 via-orange-500 to-yellow-500 z-0"></div>
      
      <div className="space-y-12 relative z-10">
        {timelineEvents.map((event, index) => (
          <div 
            key={event.id}
            id={`event-${event.id}`}
            className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center`}
          >
            {/* Timeline dot */}
            <div className="relative z-10 flex items-center justify-center w-full md:w-1/2">
              <div className={`flex items-center justify-center w-12 h-12 rounded-full border-4 border-white bg-gradient-to-r from-purple-600 to-orange-500 shadow-lg transition-all duration-500 ${visibleEvents.has(`event-${event.id}`) ? 'scale-110' : 'scale-90'}`}>
                <div className="w-3 h-3 rounded-full bg-white"></div>
              </div>
              <div className={`ml-4 md:ml-0 md:mr-4 transition-opacity duration-500 ${visibleEvents.has(`event-${event.id}`) ? 'opacity-100' : 'opacity-0'}`}>
                <span className="text-sm font-semibold bg-black/30 px-3 py-1 rounded-full">{event.period}</span>
              </div>
            </div>
            
            {/* Card */}
            <div className={`w-full md:w-1/2 mt-4 md:mt-0 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
              <Card className={`bg-white/10 backdrop-blur-sm border border-white/20 transition-all duration-500 hover:scale-[1.02] ${visibleEvents.has(`event-${event.id}`) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-1 text-gray-200">{event.title}</h3>
                  <p className="text-purple-300 mb-3">{event.location}</p>
                  <p className="text-gray-200">{event.description}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceTimeline;