
import React, { useState } from 'react';
import {
  ArrowRightIcon,
  CheckIcon,
  TargetIcon,
  ZapIcon,
  MousePointer2Icon,
  TrendingUpIcon,
  UserCheckIcon,
  Building2Icon,
  RocketIcon,
  LayersIcon,
  ShieldCheckIcon,
  ClockIcon,
  MailIcon,
  SmartphoneIcon,
  SparklesIcon
} from 'lucide-react';

const App: React.FC = () => {
  // Razorpay Payment Button Component
  const RazorpayButton = () => {
    const formRef = React.useRef<HTMLFormElement>(null);

    React.useEffect(() => {
      if (!formRef.current) return;
      if (formRef.current.querySelector('script')) return;

      const script = document.createElement('script');
      script.src = "https://checkout.razorpay.com/v1/payment-button.js";
      script.dataset.payment_button_id = "pl_RvRYBi59ep8Zj1";
      script.async = true;

      formRef.current.appendChild(script);
    }, []);

    return <form ref={formRef}></form>;
  };

  const [showPoliciesModal, setShowPoliciesModal] = useState(false);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900 antialiased overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-xl border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-black tracking-tighter text-xl cursor-pointer flex items-center gap-2" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-6 h-6 bg-slate-900 rounded flex items-center justify-center text-white text-[10px]">SA</div>
            SCRIPT ARCHITECT
          </div>
          <div className="hidden md:flex items-center gap-8 text-xs font-black uppercase tracking-widest text-slate-400">
            <button onClick={() => scrollToSection('why')} className="hover:text-slate-900 transition-colors">Why</button>
            <button onClick={() => scrollToSection('inside')} className="hover:text-slate-900 transition-colors">Inside</button>
            <div className="scale-75 origin-right">
              <RazorpayButton />
            </div>
          </div>
          <div className="md:hidden scale-75 origin-right">
            <RazorpayButton />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-20 pb-10 md:pt-28 md:pb-16 px-6">
        {/* Subtle background element */}
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-50/50 blur-[120px] rounded-full -z-10"></div>
        <div className="absolute bottom-[10%] left-[-10%] w-[40%] h-[40%] bg-emerald-50/50 blur-[120px] rounded-full -z-10"></div>

        <div className="max-w-4xl mx-auto text-center font-sans tracking-tight">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-[10px] font-black tracking-[0.2em] text-indigo-600 mb-6 uppercase animate-fade-in">
            <SparklesIcon className="w-3 h-3" />
            Script Architect
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter mb-4 leading-[0.95] animate-fade-in text-slate-950">
            Clarity for creators who <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-800">take content seriously.</span>
          </h1>
          <p className="text-base md:text-xl text-slate-500 mb-8 leading-relaxed animate-fade-in max-w-2xl mx-auto font-medium">
            Stop guessing what to say. Write high-performing scripts for Reels and Shorts using a clear structure that keeps people watching.
          </p>
          <div className="flex flex-col items-center gap-4 animate-fade-in relative z-20">
            <div className="hover:translate-y-[-2px] hover:shadow-2xl hover:shadow-indigo-200 transition-all">
              <RazorpayButton />
            </div>
            <div className="text-slate-400 font-bold text-[10px] tracking-widest uppercase">
              ₹999 · One-time access
            </div>
          </div>
        </div>
      </header>

      {/* Practical System Quote */}
      <section className="pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="p-6 md:p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100 text-slate-700 italic text-lg md:text-xl leading-relaxed text-center shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <LayersIcon className="w-24 h-24 text-slate-900" />
            </div>
            "This is not theory. It’s a practical system for turning ideas into scripts &mdash; fast."
          </div>
        </div>
      </section>

      {/* Why this works */}
      <section id="why" className="py-12 md:py-16 bg-slate-950 text-white px-6 rounded-[3rem] md:mx-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <div className="text-indigo-400 font-black text-xs tracking-[0.3em] uppercase mb-4">The Philosophy</div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4 leading-none italic uppercase">Why this works</h2>
            <p className="text-xl md:text-2xl font-bold text-white mb-4 tracking-tight">Clarity beats cleverness. Every time.</p>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium">
              Most creators don’t fail because of the algorithm. They fail because their message is unclear.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {[
              { icon: TargetIcon, color: "text-indigo-400 bg-indigo-400/10", title: "Instant Structure", desc: "Turn scattered thoughts into clean, ready-to-shoot scripts." },
              { icon: ZapIcon, color: "text-emerald-400 bg-emerald-400/10", title: "Stronger Openings", desc: "Capture attention without sounding forced or fake." },
              { icon: MousePointer2Icon, color: "text-blue-400 bg-blue-400/10", title: "Natural Flow", desc: "Guide the viewer from first line to action &mdash; smoothly." }
            ].map((item, i) => (
              <div key={i} className="p-8 rounded-[2rem] bg-white/5 border border-white/10 hover:border-white/20 transition-all group">
                <div className={`w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                  <item.icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-black mb-3 tracking-tight">{item.title}</h3>
                <p className="text-slate-400 leading-relaxed font-medium">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 pt-10 border-t border-white/10">
            <p className="text-center text-xl md:text-2xl font-bold text-indigo-100 italic">
              SCRIPT ARCHITECT gives you a repeatable way to write with intent.
            </p>
          </div>
        </div>
      </section>

      {/* What you can do */}
      <section className="py-16 md:py-20 bg-white px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-slate-400 font-bold text-[10px] tracking-[0.3em] uppercase mb-4 text-center">Utility Matrix</div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 text-center">What you can do with it</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "Start scripts without staring at a blank screen",
              "Maintain consistency across all your content",
              "Write faster without sacrificing quality",
              "Scale output without burning out"
            ].map((text, i) => (
              <div key={i} className="group p-8 rounded-3xl border border-slate-100 bg-slate-50 hover:bg-white hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-50 transition-all flex gap-4 items-start">
                <div className="w-6 h-6 rounded-full bg-indigo-50 flex items-center justify-center shrink-0 mt-1">
                  <CheckIcon className="w-3 h-3 text-indigo-600" />
                </div>
                <span className="font-bold text-slate-800 text-lg leading-snug">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who it's built for */}
      <section className="py-16 md:py-20 bg-white px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="text-left">
              <div className="text-indigo-600 font-black text-xs tracking-[0.3em] uppercase mb-6">Audience Log</div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-8 leading-[1.1]">Who it&rsquo;s built for</h2>
              <p className="text-xl text-slate-500 mb-10 font-medium">Creators who value precision over luck.</p>

              <div className="space-y-4 font-bold">
                {[
                  { icon: RocketIcon, label: "Founders sharing their thinking online" },
                  { icon: TrendingUpIcon, label: "Creators who want consistency, not randomness" },
                  { icon: Building2Icon, label: "Marketers who need scripts that just work" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-200 transition-all group">
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <span className="text-slate-800">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 p-12 rounded-[4rem] text-white text-center shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-32 h-32 bg-indigo-500/20 blur-[80px] rounded-full -z-0"></div>
              <div className="relative z-10">
                <div className="text-4xl md:text-5xl font-black mb-8 leading-tight italic uppercase tracking-tighter">
                  "If you want noise, <br />this isn&rsquo;t for you."
                </div>
                <div className="h-px bg-white/10 w-20 mx-auto mb-8"></div>
                <div className="text-xl md:text-2xl font-bold text-indigo-400">
                  If you want clarity, it is.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's inside */}
      <section id="inside" className="py-12 md:py-16 bg-slate-50 px-6 border-y border-slate-100">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <div className="text-slate-400 font-bold text-[10px] tracking-[0.3em] uppercase mb-2">Inventory</div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4 leading-none italic uppercase">What&rsquo;s inside</h2>
            <p className="text-lg text-slate-500 font-medium">Everything you need &mdash; nothing you don&rsquo;t.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {[
              { icon: LayersIcon, title: "The Architect System", desc: "The proven core logic for high-retention writing." },
              { icon: ZapIcon, title: "Execution Masterclass", desc: "How to turn the system into finished content &mdash; fast." },
              { icon: RocketIcon, title: "Viral Frameworks", desc: "Ready-to-use structures for every type of creator." }
            ].map((item, i) => (
              <div key={i} className="p-8 bg-white border border-slate-200 rounded-3xl shadow-sm hover:border-indigo-300 transition-all group">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                  <item.icon className="w-6 h-6" />
                </div>
                <h4 className="font-black text-xl mb-2 tracking-tight">{item.title}</h4>
                <p className="text-slate-500 text-sm font-medium">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
            <div className="flex flex-col items-center gap-3">
              <div className="w-1 bg-slate-200 h-8"></div>
              No subscriptions.
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="w-1 bg-slate-200 h-8"></div>
              No complicated setup.
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="w-1 bg-slate-200 h-8"></div>
              No fluff.
            </div>
          </div>
        </div>
      </section>

      {/* Access */}
      <section id="access" className="py-16 md:py-24 bg-white px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block px-4 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 text-[10px] font-black tracking-widest uppercase mb-8 animate-pulse">
            Secure Entry Path
          </div>
          <h2 className="text-5xl md:text-[100px] font-black tracking-tighter mb-12 leading-none italic uppercase">Access</h2>

          <div className="relative p-1 rounded-[4rem] bg-gradient-to-br from-indigo-100 via-white to-emerald-100 shadow-2xl shadow-slate-200/50">
            <div className="relative bg-white border border-slate-100 p-8 md:p-16 rounded-[3.9rem] overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/50 rounded-full translate-x-20 translate-y-[-80px] blur-[100px]"></div>

              <div className="relative z-10 flex flex-col items-center">
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-3xl md:text-5xl text-slate-300 font-black">₹</span>
                  <span className="text-8xl md:text-[140px] font-black tracking-tighter text-slate-950 leading-none">999</span>
                </div>
                <div className="text-lg md:text-2xl font-black text-slate-400 uppercase tracking-[0.2em] mb-12">One-time payment &middot; Lifetime access</div>

                <div className="w-full h-px bg-slate-100 mb-12"></div>

                <div className="w-full max-w-md mb-12 flex justify-center hover:scale-[1.03] transition-all relative z-10">
                  <RazorpayButton />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                  {[
                    { icon: MailIcon, label: "Immediate Access", sub: "Delivered to your inbox" },
                    { icon: SmartphoneIcon, label: "Everything Included", sub: "System + Masterclass + Video" },
                    { icon: ShieldCheckIcon, label: "Premium Support", sub: "Lifetime access & updates" }
                  ].map((item, i) => (
                    <div key={i} className="flex flex-col items-center gap-2">
                      <item.icon className="w-5 h-5 text-indigo-600 mb-2" />
                      <div className="text-sm font-black uppercase tracking-widest text-slate-900">{item.label}</div>
                      <div className="text-[10px] font-bold text-slate-400 italic">{item.sub}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 flex items-center justify-center gap-3 opacity-30">
            <ShieldCheckIcon className="w-5 h-5 text-emerald-600" />
            <div className="text-[10px] font-black tracking-[0.3em] uppercase">Verified & Encrypted Transaction Gate</div>
          </div>
        </div>
      </section>


      {/* Footer */}
      <footer className="py-16 px-6 bg-slate-950 text-white border-t border-white/10">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="text-left">
            <div className="font-black tracking-tighter text-3xl mb-4 italic underline decoration-indigo-600 underline-offset-8 transition-all hover:decoration-white">
              SCRIPT ARCHITECT
            </div>
            <p className="text-slate-500 font-bold text-sm italic tracking-tight">
              Clarity for creators who think long-term. <span className="text-indigo-500">Made by Stillprofit.</span>
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-8">
            <div className="flex gap-12 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
              <button onClick={() => setShowPoliciesModal(true)} className="hover:text-white transition-colors">Privacy</button>
              <button onClick={() => setShowPoliciesModal(true)} className="hover:text-white transition-colors">Terms</button>
              <button onClick={() => setShowPoliciesModal(true)} className="hover:text-white transition-colors">Contact</button>
            </div>
            <p className="text-slate-700 text-[10px] font-mono tracking-widest">
              &copy; 2025 STILLPROFIT. ALL_RIGHTS_RESERVED.
            </p>
          </div>
        </div>
      </footer>

      {/* Policies Modal */}
      {showPoliciesModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] backdrop-blur-sm p-6" onClick={() => setShowPoliciesModal(false)}>
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl relative" onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowPoliciesModal(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-900">
              <span className="sr-only">Close</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>

            <div className="mb-8">
              <div className="text-indigo-600 font-black text-xs tracking-[0.2em] uppercase mb-4">Legal & Support</div>
              <h3 className="text-3xl font-black mb-6 tracking-tight">Terms & Contact</h3>

              <div className="space-y-6 text-slate-600 font-medium">
                <div>
                  <h4 className="text-slate-900 font-black text-sm uppercase tracking-widest mb-2">Refund Policy</h4>
                  <p>Due to the digital nature of this product, <span className="text-rose-600 font-bold">no refunds will be provided</span> once access has been granted. Please ensure this is the right product for you before purchasing.</p>
                </div>

                <div>
                  <h4 className="text-slate-900 font-black text-sm uppercase tracking-widest mb-2">Support</h4>
                  <p>For any questions or support, please contact us at:</p>
                  <a href="mailto:support@stillprofit.com" className="text-indigo-600 font-bold hover:underline">support@stillprofit.com</a>
                </div>

                <div>
                  <h4 className="text-slate-900 font-black text-sm uppercase tracking-widest mb-2">Privacy</h4>
                  <p className="text-sm">We respect your privacy. Your email usage is strictly for product delivery and updates.</p>
                </div>
              </div>
            </div>

            <button onClick={() => setShowPoliciesModal(false)} className="w-full bg-slate-900 text-white py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-slate-800 transition-all">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
