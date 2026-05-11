/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  Zap, 
  Target, 
  Flame, 
  ArrowRight, 
  Users, 
  ChevronRight,
  Menu,
  X
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { getWarriorAssessment } from './services/geminiService';

export default function App() {
  const [assessmentStep, setAssessmentStep] = useState(1);
  const [assessmentData, setAssessmentData] = useState({
    goals: '',
    experience: '',
    obstacles: ''
  });
  const [assessmentResult, setAssessmentResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleAssessmentSubmit = async () => {
    setIsLoading(true);
    try {
      const result = await getWarriorAssessment(
        assessmentData.goals,
        assessmentData.experience,
        assessmentData.obstacles
      );
      setAssessmentResult(result);
      setAssessmentStep(4);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-amber-500/30">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-amber-500 rounded-sm transform rotate-45 flex items-center justify-center">
                <Flame className="w-5 h-5 text-slate-950 -rotate-45" />
              </div>
              <span className="text-xl font-bold tracking-tighter text-white uppercase italic">
                Warrior<span className="text-amber-500">Coaching</span>
              </span>
            </div>
            
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
              <a href="#methodology" className="hover:text-white transition-colors">Methodology</a>
              <a href="#success" className="hover:text-white transition-colors">Success Stories</a>
              <a href="#assessment" className="hover:text-white transition-colors">Free Assessment</a>
              <Button className="bg-amber-500 text-slate-950 rounded-full font-bold hover:bg-amber-400 transition-all hover:scale-105 active:scale-95 px-6">
                Apply Now
              </Button>
            </div>

            <div className="md:hidden">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-400 hover:text-white transition-colors"
                id="mobile-menu-toggle"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-slate-900 border-b border-slate-800"
            >
              <div className="px-4 py-6 space-y-4">
                <a href="#methodology" className="block text-lg font-medium text-slate-300">Methodology</a>
                <a href="#success" className="block text-lg font-medium text-slate-300">Success Stories</a>
                <a href="#assessment" className="block text-lg font-medium text-slate-300">Free Assessment</a>
                <Button className="w-full bg-amber-500 text-slate-950 font-bold py-6">Apply Now</Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-20">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500 rounded-full blur-[128px]"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-600 rounded-full blur-[128px]"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-500 text-xs font-bold uppercase tracking-widest mb-8">
                  <span className="flex h-2 w-2 rounded-full bg-amber-500 animate-pulse"></span>
                  Accepting 4 New Dedicated Recruits
                </div>
                <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.1] mb-6 tracking-tight italic uppercase">
                  FORGE YOUR <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-600 drop-shadow-[0_0_15px_rgba(251,191,36,0.3)]">ELITE PHYSIQUE.</span>
                </h1>
                <p className="text-xl text-slate-400 mb-10 max-w-xl leading-relaxed">
                  The science-backed online training system for high-performers ready to reclaim their strength, discipline, and dominant vitality.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    size="lg" 
                    className="bg-white text-slate-950 hover:bg-slate-100 font-bold h-14 px-10 text-lg shadow-xl shadow-white/5 active:scale-95 transition-all"
                    onClick={() => document.getElementById('assessment')?.scrollIntoView({ behavior: 'smooth' })}
                    id="cta-start"
                  >
                    Start Transformation
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="border-slate-800 text-white hover:bg-slate-900 font-bold h-14 px-10 text-lg active:scale-95 transition-all"
                  >
                    Watch Case Studies
                  </Button>
                </div>

                <div className="mt-12 flex items-center gap-6">
                  <div className="flex -space-x-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-12 h-12 rounded-full border-4 border-slate-950 bg-slate-800 flex items-center justify-center overflow-hidden">
                        <img 
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 10}`} 
                          alt="Warrior" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                    <div className="w-12 h-12 rounded-full border-4 border-slate-950 bg-amber-500 flex items-center justify-center text-xs font-black text-slate-950">
                      +1.2k
                    </div>
                  </div>
                  <div className="text-slate-500 text-sm font-medium">
                    <span className="text-white font-bold italic">1,240+ Warriors</span> transformed globally
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-5 relative">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative z-10"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-orange-600 rounded-3xl blur opacity-20"></div>
                <Card className="bg-slate-900 border-slate-800 rounded-3xl overflow-hidden shadow-2xl relative">
                  <CardHeader className="bg-gradient-to-br from-amber-600 to-orange-700 p-8 border-none">
                    <CardTitle className="text-2xl font-black text-white tracking-tight italic uppercase">The Warrior Protocol</CardTitle>
                    <p className="text-amber-100/80 text-sm font-medium">Our Elite Training Architecture</p>
                  </CardHeader>
                  <CardContent className="p-8 space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-4" id="feature-1">
                        <div className="mt-1 p-1.5 bg-amber-500/10 rounded-lg text-amber-500">
                          <Target className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-white leading-none mb-1 text-base italic uppercase tracking-wider">Metabolic Architecture</h4>
                          <p className="text-slate-400 text-sm leading-relaxed">Custom macro-cycling & non-restrictive nutrition logic.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4" id="feature-2">
                        <div className="mt-1 p-1.5 bg-amber-500/10 rounded-lg text-amber-500">
                          <Zap className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-white leading-none mb-1 text-base italic uppercase tracking-wider">Form Warfare</h4>
                          <p className="text-slate-400 text-sm leading-relaxed">Weekly bi-directional HD video movement audits.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4" id="feature-3">
                        <div className="mt-1 p-1.5 bg-amber-500/10 rounded-lg text-amber-500">
                          <Users className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-white leading-none mb-1 text-base italic uppercase tracking-wider">Direct Comms</h4>
                          <p className="text-slate-400 text-sm leading-relaxed">24/7 priority access to Head Coach & Private Community.</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-6 border-t border-slate-800">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em]">Latest Intel</span>
                        <Badge variant="outline" className="bg-amber-500/10 border-amber-500/20 text-amber-500 text-[10px] font-bold">Incursion Success</Badge>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-800 overflow-hidden ring-2 ring-amber-500">
                          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus" alt="Client" />
                        </div>
                        <div>
                          <p className="text-sm font-black text-white italic">MARCUS R. <span className="text-amber-500">-22LBS</span></p>
                          <p className="text-[10px] text-slate-500 font-bold uppercase">12-Week Transformation</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Metrics Footer Bar */}
        <section className="bg-slate-900 border-y border-slate-800 py-10">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center group" id="metric-1">
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1 group-hover:text-amber-500 transition-colors">Avg BF% Loss</p>
              <p className="text-3xl lg:text-4xl font-black text-white italic">12.4%</p>
            </div>
            <div className="text-center group" id="metric-2">
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1 group-hover:text-amber-500 transition-colors">Success Rate</p>
              <p className="text-3xl lg:text-4xl font-black text-white italic">98.2%</p>
            </div>
            <div className="text-center group" id="metric-3">
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1 group-hover:text-amber-500 transition-colors">Active Recruits</p>
              <p className="text-3xl lg:text-4xl font-black text-white italic">48</p>
            </div>
            <div className="text-center group" id="metric-4">
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1 group-hover:text-amber-500 transition-colors">Total Warriors</p>
              <p className="text-3xl lg:text-4xl font-black text-white italic">1,240+</p>
            </div>
          </div>
        </section>

        {/* Warrior Assessment Section */}
        <section id="assessment" className="py-24 bg-slate-950 relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4 italic uppercase tracking-tight">The Warrior <span className="text-amber-500">Assessment</span></h2>
              <p className="text-slate-400 max-w-xl mx-auto leading-relaxed">Stop guessing. Get a tactical analysis of your current state and a battle plan for elite results. Powered by the Warrior Coach AI.</p>
            </div>

            <Card className="bg-slate-900 border-slate-800 p-8 md:p-12 rounded-3xl glow-orange" id="assessment-card">
              <AnimatePresence mode="wait">
                {assessmentStep === 1 && (
                  <motion.div 
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="space-y-4">
                      <label className="text-sm font-black text-slate-400 uppercase tracking-widest">Main Mission Goals</label>
                      <Input 
                        placeholder="e.g., Lose 20lbs, Bench 315, Run a marathon..."
                        className="bg-slate-950 border-slate-800 text-white placeholder:text-slate-600 h-14"
                        value={assessmentData.goals}
                        onChange={(e) => setAssessmentData({...assessmentData, goals: e.target.value})}
                        id="goal-input"
                      />
                    </div>
                    <Button 
                      className="w-full bg-amber-500 text-slate-950 font-black h-14 text-lg italic uppercase hover:bg-amber-400 transition-all active:scale-[0.98]"
                      onClick={() => setAssessmentStep(2)}
                      disabled={!assessmentData.goals}
                    >
                      Next Phase <ChevronRight className="ml-2 w-5 h-5" />
                    </Button>
                  </motion.div>
                )}

                {assessmentStep === 2 && (
                  <motion.div 
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="space-y-4">
                      <label className="text-sm font-black text-slate-400 uppercase tracking-widest">Years in the Trenches (Experience)</label>
                      <Input 
                        placeholder="e.g., Beginner, 5 years lifting, Ex-athlete..."
                        className="bg-slate-950 border-slate-800 text-white placeholder:text-slate-600 h-14"
                        value={assessmentData.experience}
                        onChange={(e) => setAssessmentData({...assessmentData, experience: e.target.value})}
                        id="experience-input"
                      />
                    </div>
                    <div className="flex gap-4">
                      <Button variant="ghost" className="text-slate-400 hover:text-white" onClick={() => setAssessmentStep(1)}>Back</Button>
                      <Button 
                        className="flex-1 bg-amber-500 text-slate-950 font-black h-14 text-lg italic uppercase hover:bg-amber-400 transition-all active:scale-[0.98]"
                        onClick={() => setAssessmentStep(3)}
                        disabled={!assessmentData.experience}
                      >
                        Next Phase <ChevronRight className="ml-2 w-5 h-5" />
                      </Button>
                    </div>
                  </motion.div>
                )}

                {assessmentStep === 3 && (
                  <motion.div 
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="space-y-4">
                      <label className="text-sm font-black text-slate-400 uppercase tracking-widest">The Primary Obstacle</label>
                      <Textarea 
                        placeholder="What's stopping you right now? (Time, Discipline, Injuries...)"
                        className="bg-slate-950 border-slate-800 text-white placeholder:text-slate-600 min-h-[120px]"
                        value={assessmentData.obstacles}
                        onChange={(e) => setAssessmentData({...assessmentData, obstacles: e.target.value})}
                        id="obstacle-input"
                      />
                    </div>
                    <div className="flex gap-4">
                      <Button variant="ghost" className="text-slate-400 hover:text-white" onClick={() => setAssessmentStep(2)}>Back</Button>
                      <Button 
                        className="flex-1 bg-white text-slate-950 font-black h-14 text-lg italic uppercase hover:bg-slate-100 transition-all active:scale-[0.98]"
                        onClick={handleAssessmentSubmit}
                        disabled={!assessmentData.obstacles || isLoading}
                        id="submit-assessment"
                      >
                        {isLoading ? (
                          <span className="flex items-center gap-2">Initiating Scan... <Flame className="w-5 h-5 animate-spin text-amber-500" /></span>
                        ) : (
                          "Analyze My Profile"
                        )}
                      </Button>
                    </div>
                  </motion.div>
                )}

                {assessmentStep === 4 && (
                  <motion.div 
                    key="result"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-8"
                  >
                    <div className="prose prose-invert max-w-none prose-h1:text-amber-500 prose-h1:italic prose-h1:font-black prose-p:text-slate-300 prose-li:text-slate-300">
                      <ReactMarkdown>{assessmentResult || ''}</ReactMarkdown>
                    </div>
                    <div className="pt-8 border-t border-slate-800 text-center">
                      <p className="text-slate-400 mb-6 italic font-medium">This is your tactical summary. Ready for the full protocol?</p>
                      <Button 
                        size="lg" 
                        className="bg-amber-500 text-slate-950 font-black h-16 px-12 text-xl italic uppercase shadow-xl shadow-amber-900/40 hover:scale-105 active:scale-95 transition-all"
                        id="claim-slot"
                      >
                        Claim My Coaching Slot
                      </Button>
                      <button 
                        className="block mx-auto mt-6 text-slate-500 hover:text-slate-300 underline text-xs font-bold uppercase tracking-widest transition-colors"
                        onClick={() => {
                          setAssessmentStep(1);
                          setAssessmentResult(null);
                        }}
                      >
                        Recalibrate Profile
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </div>
        </section>

        {/* Methodology / FAQ */}
        <section id="methodology" className="py-24 bg-slate-900">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-12 italic uppercase text-center tracking-tight">The Battle <span className="text-amber-500">Rules</span></h2>
            <Accordion className="w-full space-y-4">
              <AccordionItem value="item-1" className="border-slate-800 bg-slate-950/50 rounded-2xl px-6" id="faq-1">
                <AccordionTrigger className="hover:no-underline font-bold text-white uppercase italic tracking-wider py-6">Is this another generic PDF plan?</AccordionTrigger>
                <AccordionContent className="text-slate-400 leading-relaxed pb-6 pr-4">
                  Negative. You get a living, breathing architecture. Every set, every rep, and every meal is tracked, audited, and adjusted by the Coach personally. This is 1-on-1 mentorship at scale.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border-slate-800 bg-slate-950/50 rounded-2xl px-6" id="faq-2">
                <AccordionTrigger className="hover:no-underline font-bold text-white uppercase italic tracking-wider py-6">What equipment is required?</AccordionTrigger>
                <AccordionContent className="text-slate-400 leading-relaxed pb-6 pr-4">
                  Whether you have a full commercial gym or a single kettlebell in a basement, we build the protocol around your AO (Area of Operations). No excuses.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="border-slate-800 bg-slate-950/50 rounded-2xl px-6" id="faq-3">
                <AccordionTrigger className="hover:no-underline font-bold text-white uppercase italic tracking-wider py-6">How do we communicate?</AccordionTrigger>
                <AccordionContent className="text-slate-400 leading-relaxed pb-6 pr-4">
                  Through our private encrypted platform. You get direct message access to the Coach, weekly Loom video deep-dives of your training footage, and bi-weekly voice syncs.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 py-16 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-2">
            <Flame className="w-6 h-6 text-amber-500" />
            <span className="text-lg font-black tracking-tighter text-white uppercase italic">
              Warrior<span className="text-amber-500">Coaching</span>
            </span>
          </div>
          <div className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] flex flex-wrap justify-center gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Protocol</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Engagement</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
          <p className="text-slate-600 text-xs font-bold italic tracking-wide">
            © 2026 WarriorCoaching. No excuses. Just results.
          </p>
        </div>
      </footer>
    </div>
  );
}
