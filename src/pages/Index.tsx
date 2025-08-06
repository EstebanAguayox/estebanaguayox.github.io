"use client";

import { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { portfolioNodes, getNodesByType } from '@/data/portfolioData';
import ProjectCarousel from '@/components/ProjectCarousel';
import KnowledgeGraph from '@/components/KnowledgeGraph';
import ExperienceTimeline from '@/components/ExperienceTimeline';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Linkedin } from 'lucide-react';

// Utility function to shuffle array
const shuffleArray = (array: any[]) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [showBackground, setShowBackground] = useState(true);
  const [showNavbar, setShowNavbar] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [shuffledSkillRows, setShuffledSkillRows] = useState<any[][]>([]);
  
  // State now tracks the unique ID of the hovered instance
  const [hoveredSkillId, setHoveredSkillId] = useState<string | null>(null);
  // Ref to hold the mutable value
  const hoveredSkillRef = useRef<string | null>(null);

  useEffect(() => {
    // Update the ref whenever the state changes
    hoveredSkillRef.current = hoveredSkillId;
  }, [hoveredSkillId]);

  useEffect(() => {
    setIsVisible(true);
    
    const skillNodes = getNodesByType('Skill');
    const rows = Array.from({ length: 20 }).map(() => {
      const shuffled = shuffleArray(skillNodes);
      return [...shuffled, ...shuffled, ...shuffled, ...shuffled];
    });
    setShuffledSkillRows(rows);
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      setShowBackground(currentScrollY < window.innerHeight * 0.3);
      setShowNavbar(currentScrollY > window.innerHeight * 0.2);
    };

    const handleWindowMouseMove = (e: MouseEvent) => {
      const skillElements = document.querySelectorAll('.skill-word');
      let foundSkillId: string | null = null;
      
      skillElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        if (
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom
        ) {
          // Get the new unique ID from the data attribute
          foundSkillId = element.getAttribute('data-skill-id');
        }
      });

      if (foundSkillId !== hoveredSkillRef.current) {
        // Update state with the unique ID
        setHoveredSkillId(foundSkillId);
      }

      if (backgroundRef.current) {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        backgroundRef.current.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(100, 100, 100, 0.2) 0%, rgba(50, 50, 50, 0.1) 30%, transparent 70%)`;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleWindowMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleWindowMouseMove);
    };
  }, []); 

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Security checks
    const now = Date.now();
    const lastSubmission = localStorage.getItem('lastSubmission');
    const submissionCount = parseInt(localStorage.getItem('submissionCount') || '0');
    const lastSubmissionDate = localStorage.getItem('lastSubmissionDate');
    const today = new Date().toDateString();
    
    // Rate limiting: 1 submission per minute
    if (lastSubmission && now - parseInt(lastSubmission) < 60000) {
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 5000);
      return;
    }
    
    // Daily limit: 2 submissions per day
    if (lastSubmissionDate === today && submissionCount >= 2) {
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 5000);
      return;
    }
    
    // Basic honeypot check (hidden field)
    const honeypot = (e.target as HTMLFormElement).querySelector('[name="website"]') as HTMLInputElement;
    if (honeypot && honeypot.value) {
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 5000);
      return;
    }
    
    setFormStatus('sending');

    // EmailJS configuration - UPDATE THESE WITH YOUR ACTUAL VALUES
    const serviceId = 'service_clrslth'; // Replace with your EmailJS service ID
    const templateId = 'template_vze2rjb'; // Replace with your EmailJS template ID
    const publicKey = '78GHXnutC-UJWuG5B'; // Replace with your EmailJS public key
    
    // Your email address goes in the EmailJS template, not here
    emailjs.send(serviceId, templateId, {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
      to_name: 'Esteban Aguayo Lopez',
      reply_to: formData.email,
      // Add timestamp for additional security
      timestamp: new Date().toISOString(),
      user_agent: navigator.userAgent,
    }, publicKey)
    .then((response) => {
      // Update rate limiting storage
      localStorage.setItem('lastSubmission', now.toString());
      localStorage.setItem('lastSubmissionDate', today);
      if (lastSubmissionDate === today) {
        localStorage.setItem('submissionCount', (submissionCount + 1).toString());
      } else {
        localStorage.setItem('submissionCount', '1');
      }
      
      setFormStatus('sent');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setFormStatus('idle'), 5000);
    }, (error) => {
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 5000);
    });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-orange-900 to-yellow-900 text-white overflow-hidden relative">
      {/* Navigation Bar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${showNavbar ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'} bg-black/30 backdrop-blur-md border-b border-white/10`}>
        <div className="container mx-auto px-4 py-3 flex justify-between items-center pointer-events-auto">
          <div className="text-xl font-bold cursor-pointer" onClick={() => scrollToSection('landing')}>
            ESTEBAN AGUAYO LOPEZ
          </div>
          <div className="flex space-x-6">
            <button onClick={() => scrollToSection('experience')} className="hover:text-gray-300 transition-all pointer-events-auto">EXPERIENCE</button>
            <button onClick={() => scrollToSection('projects')} className="hover:text-gray-300 transition-all pointer-events-auto">PROJECTS</button>
            <button onClick={() => scrollToSection('knowledge')} className="hover:text-gray-300 transition-all pointer-events-auto">KNOWLEDGE</button>
            <button onClick={() => scrollToSection('contact')} className="hover:text-gray-300 transition-all pointer-events-auto">CONTACT</button>
          </div>
        </div>
      </nav>

      {/* Animated background with scroll effect */}
      <div 
        ref={backgroundRef}
        className="fixed inset-0 overflow-hidden transition-all duration-300"
        style={{ opacity: showBackground ? 1 : 0, transition: 'opacity 0.5s ease' }}
      >
        {shuffledSkillRows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="absolute whitespace-nowrap"
            style={{
              top: `${ rowIndex * 15}%`,
              left: '0%',
              width: '100%',
              fontSize: '2rem',
              letterSpacing: '0.05em',
            }}
          >
            <div 
              className="inline-block transition-all duration-200"
              style={{
                transform: `translateX(${rowIndex % 2 === 0 ? -scrollY * 0.2 : scrollY * 0.2}px)`,
                transition: 'transform 0.1s linear',
              }}
            >
              {row.map((skill: any, index: number) => (
                <span
                  // Use a unique key for each instance
                  key={`${skill.id}-${rowIndex}-${index}`}
                  className="inline-block mx-8 skill-word pointer-events-auto"
                  // Use a unique ID for each instance
                  data-skill-id={`${skill.id}-${rowIndex}-${index}`}
                >
                  <span
                    className={`inline-block transition-all duration-300 cursor-default text-gray-500/20 ${
                      // Compare against the unique ID
                      hoveredSkillId === `${skill.id}-${rowIndex}-${index}` ? 'text-gray-100/80 scale-125 drop-shadow-[0_0_15px_rgba(255,255,255,0.6)]' : ''
                    }`}
                  >
                    {skill.name.toUpperCase()} <span className="mx-3">·</span>
                  </span>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Landing section */}
        <section id="landing" className="min-h-screen flex flex-col items-center justify-center px-4 py-24 text-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 relative">
              <span className="relative z-10 hover:text-gray-300 transition-all duration-500">
                ESTEBAN AGUAYO LOPEZ
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/30 via-purple-500/30 to-orange-500/30 blur-xl rounded-full mx-auto w-3/4 h-16"></div>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-2xl mx-auto relative z-10">
              GENERALIST ENGINEER WITH A FLAIR FOR AUTOMATION AND BRIDGING HARDWARE AND SOFTWARE
            </p>
            
            {/* Liquid glass effect cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/15 backdrop-blur-lg rounded-xl p-6 border border-white/30 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 hover:bg-white/20">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-xl"></div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-2 hover:text-gray-300">EXPERIENCE</h3>
                  <p className="text-gray-200">ROLES AND TASKS I HAVE CARRIED OUT</p>
                </div>
              </div>
              <div className="bg-white/15 backdrop-blur-lg rounded-xl p-6 border border-white/30 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 hover:bg-white/20">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-xl"></div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-2 hover:text-gray-300">PROJECTS</h3>
                  <p className="text-gray-200"> SHOWCASES OF MY WORK</p>
                </div>
              </div>
              <div className="bg-white/15 backdrop-blur-lg rounded-xl p-6 border border-white/30 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 hover:bg-white/20">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-xl"></div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-2 hover:text-gray-300">KNOWLEDGE</h3>
                  <p className="text-gray-200">EXPLORE MY EXPERTISE GRAPH</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Timeline */}
        <section id="experience" className="py-16 px-4 bg-black/20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 hover:text-gray-300">PROFESSIONAL EXPERIENCE</h2>
            <ExperienceTimeline />
          </div>
        </section>

        {/* Project Carousel */}
        <section id="projects" className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 hover:text-gray-300">FEATURED PROJECTS</h2>
            <ProjectCarousel projects={portfolioNodes.filter(node => node.type === 'Project')} />
          </div>
        </section>

        {/* Knowledge Graph */}
        <section id="knowledge" className="py-16 px-4 bg-black/20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 hover:text-gray-300">KNOWLEDGE GRAPH</h2>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <KnowledgeGraph />
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 hover:text-gray-300">GET IN TOUCH</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  {/* Honeypot field - hidden from users but visible to bots */}
                  <div className="hidden">
                    <label htmlFor="website">Website</label>
                    <input
                      type="text"
                      id="website"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="name" className="block mb-2">Name</label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      required
                      minLength={2}
                      maxLength={50}
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block mb-2">Email</label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      required
                      maxLength={100}
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block mb-2">Message</label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleFormChange}
                      required
                      minLength={10}
                      maxLength={1000}
                      rows={5}
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                      placeholder="Your message here..."
                    />
                  </div>
                  <Button 
                    type="submit" 
                    disabled={formStatus === 'sending'}
                    className="w-full bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600 text-white border-none"
                  >
                    {formStatus === 'sending' ? 'SENDING...' : 'SEND MESSAGE'}
                  </Button>
                  {formStatus === 'sent' && (
                    <p className="text-green-400 text-center">Message sent successfully!</p>
                  )}
                  {formStatus === 'error' && (
                    <p className="text-red-400 text-center">
                      {localStorage.getItem('lastSubmission') && Date.now() - parseInt(localStorage.getItem('lastSubmission')!) < 60000 
                        ? 'Please wait a minute before sending another message.'
                        : localStorage.getItem('lastSubmissionDate') === new Date().toDateString() && parseInt(localStorage.getItem('submissionCount') || '0') >= 5
                        ? 'Daily message limit reached. Please try again tomorrow.'
                        : 'Failed to send message. Please try again.'}
                    </p>
                  )}
                </form>
              </div>
              <div className="flex flex-col justify-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                  <h3 className="text-2xl font-bold mb-6 hover:text-gray-300">CONTACT INFORMATION</h3>
                  <p className="text-gray-200 mb-8">
                    Feel free to reach out through the form or connect with me on LinkedIn.
                  </p>
                  <div className="space-y-4">
                    <a 
                      href="https://www.linkedin.com/in/esteban-aguayo-lopez" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-black hover:bg-gradient-to-r hover:from-purple-600 hover:to-orange-500 transition-all"
                    >
                      <Linkedin className="h-6 w-6 mr-4" />
                      <span>LinkedIn Profile</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;
