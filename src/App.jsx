import React, { useState, useEffect, useRef, useCallback } from 'react';
import { RetellWebClient } from 'retell-client-js-sdk';
import { 
  Phone, 
  PhoneOff,
  Mic,
  MicOff,
  MessageSquare, 
  UserCheck, 
  Calendar, 
  Zap, 
  Globe, 
  ShieldCheck, 
  Headphones, 
  ArrowRight,
  CheckCircle2,
  Clock,
  Play,
  BarChart3,
  Users,
  X,
  Menu,
  Stethoscope,
  Scale,
  Wrench,
  Building,
  Cpu,
  Activity,
  Server,
  Lock
} from 'lucide-react';

// --- Translations ---

const translations = {
  en: {
    nav: {
      product: "Product",
      solutions: "Solutions",
      pricing: "Pricing",
      login: "Client Login",
      bookDemo: "Book Consultation",
      getStarted: "Get Started"
    },
    hero: {
      status: "BUILT FOR MED SPAS",
      headline: "Every missed call is a consultation that never happened.",
      headlineHighlight: "We fix that.",
      subheadline: "JuniVo is an AI receptionist built specifically for med spas. It answers every call, qualifies every lead, and books consultations on your calendar — 24/7, with a voice that sounds like your best front desk coordinator.",
      demoInputPlaceholder: "(555) 123-4567",
      callMe: "Experience It",
      dialing: "Connecting...",
      connected: "Connected",
      tryDemo: "Enter your number for a live demonstration.",
      agentCalling: "Our AI Coordinator is calling you now...",
      selectAgent: "Choose an agent to experience live",
      startCall: "Start Live Demo",
      endCall: "End Conversation",
      connecting: "Connecting...",
      liveCall: "Live Conversation",
      callEnded: "Conversation Ended",
      tapToTry: "Talk to our AI — live, right here in your browser.",
      tryAgain: "Try Again",
      agentSpeaking: "Agent is speaking...",
      listening: "Listening...",
      micRequired: "Microphone access is required for the live demo.",
      errorOccurred: "Something went wrong. Please try again.",
    },
    product: {
        title: "Every Conversation. Recorded. Analyzed. Optimized.",
        subtitle: "Every call to your med spa is automatically recorded, transcribed, and analyzed by AI. Know exactly what prospects are asking, how they feel about pricing, and which calls convert to booked consultations.",
        features: [
            { title: "Full Call Recording & Transcripts", desc: "Every patient conversation is captured and transcribed with high accuracy. Review any call instantly — see exactly what was said about Botox, fillers, laser treatments, and more." },
            { title: "AI-Powered Sentiment Analysis", desc: "Real-time sentiment scoring detects hesitation, excitement, and buying intent. Know which callers are ready to book and which need nurturing — before they hang up." },
            { title: "Consultation Conversion Tracking", desc: "Automated tracking on every call: who booked, who didn't, and why. Surface the patterns that turn inquiries into $3,000+ consultation commitments." }
        ]
    },
    solutions: {
        title: "Built for the Med Spa Industry",
        subtitle: "JuniVo isn't a generic AI assistant. It's trained on how med spas actually operate — consultations, treatment menus, pricing objections, and the patient journey from first call to booked appointment.",
        tabs: ["Consultations", "Treatments", "Follow-ups", "After Hours"],
        content: {
            Medical: {
                title: "Consultation Booking Engine",
                points: ["Qualifies callers by treatment interest & budget", "Books consultations directly to your calendar", "Handles pricing questions with trained responses", "Confirms appointments via SMS follow-up"]
            },
            Legal: {
                title: "Treatment Knowledge Expert",
                points: ["Trained on your full treatment menu & pricing", "Answers questions about Botox, fillers, laser & more", "Explains pre & post-treatment care instructions", "Recommends treatments based on patient concerns"]
            },
            HomeServices: {
                title: "Lead Follow-up & Nurturing",
                points: ["Follows up on every web inquiry within seconds", "Re-engages no-shows and cancelled consultations", "Sends personalized treatment recommendations", "Tracks conversion from lead to booked consultation"]
            },
            RealEstate: {
                title: "24/7 After-Hours Coverage",
                points: ["Answers calls nights, weekends & holidays", "Books consultations while your team sleeps", "Handles urgent questions with empathy & accuracy", "Never puts a high-value prospect on hold"]
            }
        }
    },
    pricing: {
        title: "Simple, ROI-Positive Pricing",
        subtitle: "Most businesses recover their monthly investment within the first week of deployment.",
        tiers: [
            { name: "Receptionist", price: "$500", period: "/mo", desc: "Your 24/7 AI receptionist that never misses a call.", features: ["AI Receptionist (Voice)", "Unlimited Inbound Calls", "Call Recording & Transcripts", "Appointment Scheduling", "Business Knowledge Training", "Standard Support"] },
            { name: "Receptionist + Chat", price: "$750", period: "/mo", desc: "Voice + website chat for total coverage.", features: ["Everything in Receptionist", "AI Website Chatbot", "Chat Trained on Your Knowledge Base", "Lead Capture & Qualification", "Multilingual Support (20+ Languages)", "Priority Support"] },
            { name: "Full Suite", price: "$1,000", period: "/mo", desc: "Add an AI sales agent to close more deals.", features: ["Everything in Receptionist + Chat", "AI Sales Director Agent", "Outbound Lead Follow-up", "AI Sentiment & Conversion Analytics", "Dedicated Account Manager", "Custom Voice & Persona"] }
        ]
    },
    features: {
      title: "Three AI Agents. One Goal: Booked Consultations.",
      subtitle: "Voice, sales, and chat — all trained on your med spa's treatments, pricing, and brand voice. Every interaction is designed to move prospects closer to a committed consultation.",
      cards: [
        {
          title: "The Receptionist",
          description: "Your AI front desk that never calls in sick. Answers every call with warmth and expertise, knows your treatment menu cold, and books consultations directly to your calendar.",
          features: [
            "Custom voice that matches your brand",
            "Trained on your treatments, pricing & FAQs",
            "Books consultations directly to your calendar",
            "Warm handoff to your team when needed"
          ]
        },
        {
          title: "The Sales Director",
          description: "An AI closer that follows up on every single lead. Handles pricing objections, creates urgency around limited availability, and converts hesitant callers into committed consultations.",
          features: [
            "Follows up on every web inquiry & missed call",
            "Overcomes pricing objections with trained scripts",
            "Qualifies leads by treatment interest & budget",
            "Tracks every lead from first call to booked consult"
          ]
        },
        {
          title: "The Human Chatbot",
          description: "A website chat assistant so natural, visitors think they're talking to your staff. Answers treatment questions, shares before/afters context, and books consultations 24/7.",
          features: [
            "Trained on your full treatment menu & knowledge",
            "Natural conversation — not robotic replies",
            "Captures lead info & books consultations",
            "Multilingual — serves every patient demographic"
          ]
        }
      ]
    },
    roi: {
        title: "How Much Revenue Are You Losing?",
        subtitle: "Every missed call is a potential $2,000–$10,000 treatment package. Calculate what unanswered calls and slow follow-ups are actually costing your med spa.",
        missedCalls: "Missed Calls Per Week",
        dealValue: "Average Consultation Value",
        yearlyLossLabel: "Potential Annual Revenue Lost",
        disclaimer1: "Calculated based on a standard 52-week operating year.",
        disclaimer2: "JuniVo is built to recover this revenue — starting day one."
    },
    tech: {
        title: "Enterprise-Grade Security & Intelligence",
        multilingualTitle: "Multilingual Fluency",
        multilingualDesc: "Serves every patient demographic. Instantly detects and switches between English, Spanish, Korean, and 20+ other languages mid-conversation.",
        humanLoopTitle: "Human-In-The-Loop Escalation",
        humanLoopDesc: "Real-time sentiment monitoring flags high-value or hesitant callers for immediate human follow-up from your team.",
        integrationTitle: "Seamless Integration",
        integrationDesc: "Syncs with your booking system, CRM, and patient management software — consultations go straight to your calendar.",
        transcriptTitle: "SECURE TRANSCRIPT LOG",
        activeStatus: "ENCRYPTED & ACTIVE",
        aiLabel: "AI",
        userLabel: "Patient",
        aiText1: "Thank you for calling Glow Aesthetics! Are you interested in scheduling a consultation, or do you have questions about a specific treatment?",
        userText1: "I'm interested in Botox but I'm not sure about pricing. Do you offer any packages?",
        aiText2: "Great question! We offer several Botox packages starting at $12/unit. I'd love to get you booked for a free consultation so our provider can create a personalized plan. I have openings this Thursday — would afternoon work for you?",
        tagBooking: "INTENT: CONSULTATION BOOKING",
        tagInsurance: "TREATMENT: BOTOX"
    },
    cta: {
        title: "Stop losing consultations to voicemail.",
        subtitle: "Med spas using JuniVo book 3x more consultations from the same call volume. Your AI receptionist starts working the moment you turn it on.",
        btnStrategy: "Book a Free Demo",
        btnPricing: "See Pricing"
    },
    trust: {
      trustedBy: "TRUSTED BY PREMIUM MED SPAS ACROSS",
      niches: ['Medical Aesthetics', 'Dermatology', 'Plastic Surgery', 'Wellness & Anti-Aging']
    },
    footer: {
        desc: "The AI front office built for med spas. Answer every call, book every consultation, and grow your practice — on autopilot.",
        product: "Platform",
        company: "Company",
        links: {
            receptionist: "AI Receptionist",
            sales: "Sales Director",
            chat: "Human Chatbot",
            integrations: "Integrations",
            about: "Our Story",
            careers: "Careers",
            privacy: "Privacy & HIPAA Policy",
            terms: "Terms of Service"
        },
        rights: "© 2026 JuniVo Ai. All rights reserved.",
        compliance: ["SOC2 Type II Certified", "HIPAA Compliant", "GDPR Compliant"]
    }
  },
  ko: {
    nav: {
      product: "제품",
      solutions: "솔루션",
      pricing: "요금제",
      login: "고객 로그인",
      bookDemo: "상담 예약",
      getStarted: "시작하기"
    },
    hero: {
      status: "메디스파 전용 AI",
      headline: "놓친 전화 한 통이 성사되지 못한 상담입니다.",
      headlineHighlight: "저희가 해결합니다.",
      subheadline: "JuniVo는 메디스파 전용 AI 리셉셔니스트입니다. 모든 전화에 응답하고, 모든 리드를 자격 심사하며, 상담을 캘린더에 예약합니다 — 24/7, 최고의 프론트 데스크 직원 같은 음성으로.",
      demoInputPlaceholder: "010-1234-5678",
      callMe: "직접 체험하기",
      dialing: "연결 중...",
      connected: "연결됨",
      tryDemo: "라이브 데모를 위해 전화번호를 입력하세요.",
      agentCalling: "AI 코디네이터가 지금 전화를 걸고 있습니다...",
      selectAgent: "체험할 에이전트를 선택하세요",
      startCall: "라이브 데모 시작",
      endCall: "대화 종료",
      connecting: "연결 중...",
      liveCall: "라이브 대화",
      callEnded: "대화 종료됨",
      tapToTry: "브라우저에서 바로 AI와 대화해 보세요.",
      tryAgain: "다시 시도",
      agentSpeaking: "에이전트가 말하고 있습니다...",
      listening: "듣고 있습니다...",
      micRequired: "라이브 데모를 위해 마이크 액세스가 필요합니다.",
      errorOccurred: "문제가 발생했습니다. 다시 시도해 주세요.",
    },
    product: {
        title: "모든 대화. 녹음. 분석. 최적화.",
        subtitle: "메디스파의 모든 통화가 자동으로 녹음, 전사, AI 분석됩니다. 잠재 고객이 무엇을 묻는지, 가격에 대해 어떻게 느끼는지, 어떤 통화가 상담 예약으로 전환되는지 정확히 파악하세요.",
        features: [
            { title: "전체 통화 녹음 및 전사", desc: "모든 환자 대화가 높은 정확도로 캡처 및 전사됩니다. 보톡스, 필러, 레이저 시술 등에 대해 정확히 무슨 말이 오갔는지 즉시 확인하세요." },
            { title: "AI 기반 감정 분석", desc: "실시간 감정 점수가 망설임, 흥분, 구매 의도를 감지합니다. 누가 예약 준비가 되었고 누가 육성이 필요한지 — 전화를 끊기 전에 파악하세요." },
            { title: "상담 전환 추적", desc: "모든 통화에 대한 자동 추적: 누가 예약했고, 누가 하지 않았고, 왜 그런지. 문의를 고가 상담 예약으로 전환하는 패턴을 발견하세요." }
        ]
    },
    solutions: {
        title: "메디스파 업계를 위해 설계",
        subtitle: "JuniVo는 일반 AI가 아닙니다. 메디스파의 실제 운영 방식 — 상담, 시술 메뉴, 가격 이의, 첫 통화에서 예약까지의 환자 여정에 맞춰 학습되었습니다.",
        tabs: ["상담", "시술", "팔로업", "업무 외 시간"],
        content: {
            Medical: {
                title: "상담 예약 엔진",
                points: ["시술 관심사 및 예산별 발신자 자격 심사", "캘린더에 직접 상담 예약", "학습된 응답으로 가격 문의 처리", "SMS 팔로업으로 예약 확인"]
            },
            Legal: {
                title: "시술 지식 전문가",
                points: ["전체 시술 메뉴 및 가격 학습", "보톡스, 필러, 레이저 등 질문 답변", "시술 전후 관리 지침 설명", "환자 고민에 맞춘 시술 추천"]
            },
            HomeServices: {
                title: "리드 팔로업 및 육성",
                points: ["모든 웹 문의에 몇 초 내 팔로업", "노쇼 및 취소된 상담 재참여", "개인화된 시술 추천 발송", "리드에서 상담 예약까지 전환 추적"]
            },
            RealEstate: {
                title: "24/7 업무 외 시간 커버리지",
                points: ["야간, 주말, 공휴일 전화 응답", "팀이 쉬는 동안 상담 예약", "공감과 정확성으로 긴급 질문 처리", "고가치 잠재 고객을 절대 대기시키지 않음"]
            }
        }
    },
    pricing: {
        title: "단순하고 ROI가 확실한 요금제",
        subtitle: "대부분의 비즈니스가 도입 첫 주 안에 월 투자 비용을 회수합니다.",
        tiers: [
            { name: "리셉셔니스트", price: "$500", period: "/월", desc: "전화를 놓치지 않는 24/7 AI 리셉셔니스트.", features: ["AI 리셉셔니스트 (음성)", "무제한 수신 통화", "통화 녹음 및 전사", "예약 일정 관리", "비즈니스 지식 학습", "표준 지원"] },
            { name: "리셉셔니스트 + 채팅", price: "$750", period: "/월", desc: "음성 + 웹사이트 채팅으로 완벽한 커버리지.", features: ["리셉셔니스트 포함 전체", "AI 웹사이트 챗봇", "지식 기반 학습 채팅", "리드 캡처 및 자격 심사", "다국어 지원 (20개 이상)", "우선 지원"] },
            { name: "풀 스위트", price: "$1,000", period: "/월", desc: "AI 세일즈 에이전트로 더 많은 거래를 성사시키세요.", features: ["리셉셔니스트 + 채팅 포함 전체", "AI 세일즈 디렉터 에이전트", "아웃바운드 리드 팔로업", "AI 감정 및 전환 분석", "전담 계정 관리자", "커스텀 음성 및 페르소나"] }
        ]
    },
     trust: {
      trustedBy: "프리미엄 메디스파들이 신뢰합니다",
      niches: ['의료 미용', '피부과', '성형외과', '웰니스 & 안티에이징']
    },
    features: {
      title: "3개의 AI 에이전트. 하나의 목표: 상담 예약.",
      subtitle: "음성, 세일즈, 채팅 — 모두 메디스파의 시술, 가격, 브랜드 음성으로 학습됩니다. 모든 상호작용이 잠재 고객을 상담 예약에 더 가까이 이끌도록 설계되었습니다.",
      cards: [
        {
          title: "리셉셔니스트",
          description: "절대 결근하지 않는 AI 프론트 데스크. 따뜻함과 전문성으로 모든 전화에 응답하고, 시술 메뉴를 완벽히 파악하며, 캘린더에 직접 상담을 예약합니다.",
          features: [
            "브랜드에 맞춘 커스텀 음성",
            "시술, 가격, FAQ 기반 학습",
            "캘린더에 직접 상담 예약",
            "필요 시 팀에 따뜻한 인계"
          ]
        },
        {
          title: "세일즈 디렉터",
          description: "모든 리드를 팔로업하는 AI 클로저. 가격 이의를 처리하고, 제한된 가용성으로 긴박감을 조성하며, 망설이는 발신자를 상담 예약으로 전환합니다.",
          features: [
            "모든 웹 문의 및 부재중 전화 팔로업",
            "학습된 스크립트로 가격 이의 극복",
            "시술 관심사 및 예산별 리드 자격 심사",
            "첫 통화에서 상담 예약까지 모든 리드 추적"
          ]
        },
        {
          title: "휴먼 챗봇",
          description: "방문자가 직원과 대화한다고 생각할 정도로 자연스러운 웹사이트 채팅 어시스턴트. 시술 질문에 답하고 24/7 상담을 예약합니다.",
          features: [
            "전체 시술 메뉴 및 지식 기반 학습",
            "로봇 같지 않은 자연스러운 대화",
            "리드 정보 확보 및 상담 예약",
            "다국어 — 모든 환자 인구 통계 대응"
          ]
        }
      ]
    },
    roi: {
        title: "얼마나 많은 매출을 잃고 있나요?",
        subtitle: "놓친 전화 한 통은 잠재적으로 200만~1,000만원의 시술 패키지입니다. 응답하지 않은 전화와 느린 팔로업이 메디스파에 실제로 얼마의 비용을 초래하는지 계산해 보세요.",
        missedCalls: "주당 부재중 전화",
        dealValue: "평균 상담 가치",
        yearlyLossLabel: "예상 연간 매출 손실",
        disclaimer1: "표준 52주 운영 연도를 기준으로 계산되었습니다.",
        disclaimer2: "JuniVo는 이 매출을 회복하도록 설계되었습니다 — 첫날부터."
    },
    tech: {
        title: "엔터프라이즈급 보안 및 지능",
        multilingualTitle: "다국어 유창성",
        multilingualDesc: "모든 환자 인구 통계를 대응합니다. 대화 중 영어, 스페인어, 한국어 및 20개 이상의 언어를 즉시 감지하고 전환합니다.",
        humanLoopTitle: "휴먼 인 더 루프 에스컬레이션",
        humanLoopDesc: "실시간 감정 모니터링이 고가치 또는 망설이는 발신자를 식별하여 팀의 즉각적인 인적 팔로업을 요청합니다.",
        integrationTitle: "원활한 통합",
        integrationDesc: "예약 시스템, CRM, 환자 관리 소프트웨어와 동기화 — 상담이 바로 캘린더에 들어갑니다.",
        transcriptTitle: "보안 스크립트 로그",
        activeStatus: "암호화 및 활성화됨",
        aiLabel: "AI",
        userLabel: "환자",
        aiText1: "글로우 에스테틱에 전화해 주셔서 감사합니다! 상담 예약에 관심이 있으신가요, 아니면 특정 시술에 대해 궁금한 점이 있으신가요?",
        userText1: "보톡스에 관심이 있는데 가격이 어떻게 되나요? 패키지가 있나요?",
        aiText2: "좋은 질문이세요! 보톡스 패키지는 유닛당 $12부터 시작합니다. 전문의가 맞춤 계획을 세울 수 있도록 무료 상담을 예약해 드릴까요? 이번 주 목요일에 시간이 있습니다 — 오후가 괜찮으신가요?",
        tagBooking: "의도: 상담 예약",
        tagInsurance: "시술: 보톡스"
    },
    cta: {
        title: "음성 사서함에 상담을 빼앗기지 마세요.",
        subtitle: "JuniVo를 사용하는 메디스파는 동일한 통화량에서 3배 더 많은 상담을 예약합니다. AI 리셉셔니스트는 켜는 순간부터 작동합니다.",
        btnStrategy: "무료 데모 예약",
        btnPricing: "요금제 보기"
    },
    footer: {
        desc: "메디스파를 위한 AI 프론트 오피스. 모든 전화에 응답하고, 모든 상담을 예약하고, 자동으로 성장하세요.",
        product: "플랫폼",
        company: "회사",
        links: {
            receptionist: "AI 리셉셔니스트",
            sales: "세일즈 디렉터",
            chat: "휴먼 챗봇",
            integrations: "통합",
            about: "우리의 이야기",
            careers: "채용",
            privacy: "개인정보 보호 및 HIPAA 정책",
            terms: "이용 약관"
        },
        rights: "© 2026 JuniVo Ai. All rights reserved.",
        compliance: ["SOC2 Type II 인증", "HIPAA 준수", "GDPR 준수"]
    }
  }
};

// --- Reusable Components ---

const Navbar = ({ lang, setLang, t, currentPage, setCurrentPage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLang = () => {
    setLang(lang === 'en' ? 'ko' : 'en');
  };

  const navLinkClass = (page) => 
    `cursor-pointer transition-colors font-medium text-sm ${currentPage === page ? 'text-slate-900 font-semibold' : 'text-slate-500 hover:text-slate-900'}`;

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md border-b border-slate-200 py-4 shadow-sm' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setCurrentPage('home')}
        >
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-md">
            <Zap className="text-white w-5 h-5 fill-current" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">JuniVo<span className="text-blue-600"> Ai</span></span>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          <button onClick={() => setCurrentPage('product')} className={navLinkClass('product')}>{t.nav.product}</button>
          <button onClick={() => setCurrentPage('solutions')} className={navLinkClass('solutions')}>{t.nav.solutions}</button>
        </div>

        <div className="hidden md:flex items-center gap-5">
           {/* Language Toggle */}
           <button 
            onClick={toggleLang}
            className="flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors px-2 py-1 rounded-md border border-slate-200 bg-white"
           >
             <Globe className="w-3 h-3" />
             {lang === 'en' ? 'KR' : 'EN'}
           </button>

           <button className="text-slate-600 text-sm font-medium hover:text-blue-600 transition-colors">
            {t.nav.login}
          </button>
          <a href={CALENDAR_URL} target="_blank" rel="noopener noreferrer" className="bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-slate-800 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
            {t.nav.bookDemo}
          </a>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
            <button 
                onClick={toggleLang}
                className="flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors px-2 py-1 rounded border border-slate-200 bg-white"
            >
                {lang === 'en' ? 'KR' : 'EN'}
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-slate-900">
            {mobileMenuOpen ? <X /> : <Menu />}
            </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-200 p-6 flex flex-col gap-4 shadow-xl">
          <button onClick={() => { setCurrentPage('product'); setMobileMenuOpen(false); }} className="text-slate-600 hover:text-slate-900 text-left font-medium">{t.nav.product}</button>
          <button onClick={() => { setCurrentPage('solutions'); setMobileMenuOpen(false); }} className="text-slate-600 hover:text-slate-900 text-left font-medium">{t.nav.solutions}</button>
          <button className="bg-blue-600 text-white w-full py-3 rounded-xl font-medium shadow-md">{t.nav.getStarted}</button>
        </div>
      )}
    </nav>
  );
};

const FeatureCard = ({ icon: Icon, title, description, features, colorClass }) => {
  // Map our old gradient classes to clean background colors for icons
  const bgColors = {
    "from-blue-600 to-blue-400": "bg-blue-50 text-blue-600",
    "from-purple-600 to-pink-400": "bg-teal-50 text-teal-600",
    "from-green-500 to-emerald-400": "bg-indigo-50 text-indigo-600"
  };
  const iconStyle = bgColors[colorClass] || "bg-blue-50 text-blue-600";

  return (
    <div className={`group relative p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-500 hover:-translate-y-1 overflow-hidden`}>
      <div className={`w-14 h-14 rounded-2xl ${iconStyle} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
        <Icon className="w-7 h-7" />
      </div>
      
      <h3 className="text-2xl font-bold text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-600 mb-8 leading-relaxed h-20">{description}</p>
      
      <ul className="space-y-4 pt-4 border-t border-slate-100">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-3 text-sm text-slate-700 font-medium">
            <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const CallVisualizer = () => (
    <div className="relative inline-flex items-center justify-center w-full">
        {/* Soft elegant glow */}
        <div className="absolute inset-0 bg-blue-50 blur-xl rounded-full opacity-60"></div>
        
        <div className="relative w-full bg-white border border-slate-200 px-6 py-5 rounded-2xl flex items-center gap-5 shadow-sm">
            {/* Phone Icon Circle */}
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center relative shrink-0">
                <div className="absolute inset-0 rounded-full border border-blue-200 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
                <Phone className="w-5 h-5 text-blue-600 fill-current" />
            </div>
            
            <div className="flex flex-col gap-1.5 flex-1">
                <div className="flex items-center justify-between w-full">
                    <span className="text-[10px] font-bold text-slate-500 tracking-widest uppercase">Secure Voice Active</span>
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_#10b981]"></span>
                </div>
                
                {/* Soundwave Bars - Clinical Blue/Teal */}
                <div className="flex items-end gap-1 h-6 w-full justify-between">
                    {[0.4, 0.7, 1, 0.6, 0.3, 0.8, 0.5, 1, 0.7, 0.4, 0.9, 0.5].map((startScale, i) => (
                        <div
                            key={i}
                            className="flex-1 max-w-[4px] bg-gradient-to-t from-blue-600 to-teal-400 rounded-full"
                            style={{
                                animation: 'wave 1.2s ease-in-out infinite',
                                animationDelay: `${i * 0.1}s`,
                                height: '100%'
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
        <style>{`
            @keyframes wave {
                0%, 100% { transform: scaleY(0.3); opacity: 0.5; }
                50% { transform: scaleY(1); opacity: 1; }
            }
        `}</style>
    </div>
);

const CALENDAR_URL = 'https://cal.com/junivoai/consultation';

const AGENTS = [
  { id: 'agent_b102f121a6b37b2e6a4b4a1f79', name: 'EN', label: '🇺🇸 English' },
  { id: 'agent_05f11e21300b9eed83d7b4a89e', name: 'KR', label: '🇰🇷 한국어' },
];

const useRetellCall = () => {
  const clientRef = useRef(null);
  const [callStatus, setCallStatus] = useState('idle');
  const [agentTalking, setAgentTalking] = useState(false);
  const [transcript, setTranscript] = useState([]);

  useEffect(() => {
    const client = new RetellWebClient();
    clientRef.current = client;

    client.on('call_started', () => setCallStatus('active'));
    client.on('call_ended', () => { setCallStatus('ended'); setAgentTalking(false); });
    client.on('agent_start_talking', () => setAgentTalking(true));
    client.on('agent_stop_talking', () => setAgentTalking(false));
    client.on('error', (error) => {
      console.error('Retell error:', error);
      setCallStatus('error');
      setAgentTalking(false);
    });
    client.on('update', (update) => {
      if (update.transcript) {
        setTranscript(update.transcript);
      }
    });

    return () => { client.stopCall(); };
  }, []);

  const startCall = useCallback(async (agentId) => {
    if (!clientRef.current) return;
    setCallStatus('connecting');
    setTranscript([]);
    setAgentTalking(false);

    try {
      const res = await fetch('/api/create-web-call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ agent_id: agentId }),
      });
      if (!res.ok) {
        const errorBody = await res.json().catch(() => ({}));
        console.error('API error:', res.status, errorBody);
        throw new Error(errorBody.error || `Server returned ${res.status}`);
      }
      const { access_token } = await res.json();
      if (!access_token) throw new Error('No access token received');
      await clientRef.current.startCall({ accessToken: access_token, sampleRate: 24000 });
    } catch (err) {
      console.error('Call failed:', err);
      setCallStatus('error');
    }
  }, []);

  const endCall = useCallback(() => {
    if (clientRef.current) {
      clientRef.current.stopCall();
    }
    setCallStatus('idle');
    setAgentTalking(false);
  }, []);

  const reset = useCallback(() => {
    setCallStatus('idle');
    setTranscript([]);
    setAgentTalking(false);
  }, []);

  return { callStatus, agentTalking, transcript, startCall, endCall, reset };
};

const AudioWave = ({ active, speaking, className = '' }) => (
  <div className={`flex items-end justify-center gap-[3px] h-10 ${className}`}>
    {Array.from({ length: 28 }).map((_, i) => (
      <div
        key={i}
        className={`w-[3px] rounded-full transition-colors duration-300 ${
          active
            ? speaking
              ? 'bg-gradient-to-t from-blue-600 to-teal-400'
              : 'bg-gradient-to-t from-blue-400 to-blue-300'
            : 'bg-slate-200'
        }`}
        style={{
          animation: active
            ? speaking
              ? `waveActive 0.8s ease-in-out infinite`
              : `waveIdle 1.8s ease-in-out infinite`
            : 'none',
          animationDelay: `${i * 0.05}s`,
          height: active ? '100%' : '20%',
          transformOrigin: 'bottom',
        }}
      />
    ))}
    <style>{`
      @keyframes waveActive {
        0%, 100% { transform: scaleY(0.25); }
        50% { transform: scaleY(1); }
      }
      @keyframes waveIdle {
        0%, 100% { transform: scaleY(0.15); }
        50% { transform: scaleY(0.4); }
      }
    `}</style>
  </div>
);

const LiveCallCard = ({ t, lang, callStatus, agentTalking }) => {
  const isActive = callStatus === 'active';
  const isConnecting = callStatus === 'connecting';

  return (
    <div className="relative w-full max-w-md bg-white/60 backdrop-blur-2xl border border-slate-200/60 p-8 rounded-[2rem] shadow-[0_20px_60px_rgb(0,0,0,0.05)]">
      {/* Header */}
      <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]' : isConnecting ? 'bg-amber-400 animate-pulse' : 'bg-slate-300'}`}></span>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            {isActive ? t.hero.liveCall : isConnecting ? t.hero.connecting : 'Live Agent Demo'}
          </span>
        </div>
        {isActive && (
          <span className="text-xs font-mono text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100">LIVE</span>
        )}
      </div>

      {/* Central Mic Orb */}
      <div className="flex flex-col items-center justify-center py-6">
        <div className={`relative w-28 h-28 rounded-full flex items-center justify-center transition-all duration-500 ${
          isActive
            ? 'bg-gradient-to-br from-blue-600 to-teal-500 shadow-[0_0_40px_rgba(59,130,246,0.4)]'
            : isConnecting
              ? 'bg-gradient-to-br from-amber-400 to-orange-400 shadow-[0_0_30px_rgba(251,191,36,0.3)]'
              : 'bg-gradient-to-br from-slate-200 to-slate-300'
        }`}>
          {isActive && (
            <>
              <div className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-20"></div>
              <div className="absolute -inset-3 rounded-full border-2 border-blue-300 opacity-30 animate-pulse"></div>
            </>
          )}
          {isConnecting && (
            <div className="absolute inset-0 rounded-full bg-amber-300 animate-ping opacity-20"></div>
          )}
          <Mic className={`w-10 h-10 relative z-10 ${isActive || isConnecting ? 'text-white' : 'text-slate-500'}`} />
        </div>

        {/* Status Text */}
        <div className="mt-6 text-center">
          {isActive && (
            <p className={`text-sm font-semibold transition-all ${agentTalking ? 'text-blue-600' : 'text-slate-500'}`}>
              {agentTalking ? t.hero.agentSpeaking : t.hero.listening}
            </p>
          )}
          {isConnecting && (
            <p className="text-sm font-semibold text-amber-600 animate-pulse">{t.hero.connecting}</p>
          )}
          {!isActive && !isConnecting && (
            <p className="text-sm font-medium text-slate-400">{t.hero.tapToTry}</p>
          )}
        </div>
      </div>

      {/* Audio Waveform */}
      <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
        <AudioWave active={isActive} speaking={agentTalking} />
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2 text-center">
          {isActive ? 'Secure Voice Active' : 'Secure Voice Channel'}
        </p>
      </div>
    </div>
  );
};

const ROICalculator = ({ t }) => {
  const [missedCalls, setMissedCalls] = useState(5);
  const [dealValue, setDealValue] = useState(500);
  
  const weeklyLoss = missedCalls * dealValue;
  const yearlyLoss = weeklyLoss * 52;

  return (
    <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden">
      {/* Background Soft Element */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>

      <div className="grid md:grid-cols-2 gap-12 relative z-10">
        <div>
          <h3 className="text-3xl font-bold text-slate-900 mb-2">{t.roi.title}</h3>
          <p className="text-slate-600 mb-10">{t.roi.subtitle}</p>
          
          <div className="space-y-10">
            <div>
              <div className="flex justify-between text-sm mb-3">
                <span className="text-slate-700 font-medium">{t.roi.missedCalls}</span>
                <span className="text-blue-600 font-bold text-lg">{missedCalls}</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="50" 
                value={missedCalls} 
                onChange={(e) => setMissedCalls(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-3">
                <span className="text-slate-700 font-medium">{t.roi.dealValue}</span>
                <span className="text-teal-600 font-bold text-lg">${dealValue}</span>
              </div>
              <input 
                type="range" 
                min="100" 
                max="5000" 
                step="100"
                value={dealValue} 
                onChange={(e) => setDealValue(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center bg-slate-50 rounded-2xl p-8 border border-slate-100">
          <span className="text-slate-500 text-sm uppercase tracking-widest font-bold mb-3 text-center">{t.roi.yearlyLossLabel}</span>
          <div className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-4 tracking-tight">
            ${yearlyLoss.toLocaleString()}
          </div>
          <p className="text-slate-500 text-sm text-center leading-relaxed">
            {t.roi.disclaimer1} <br/>
            <span className="text-blue-600 mt-2 block font-semibold">{t.roi.disclaimer2}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

// --- Page Components ---

const ProductPage = ({ t }) => (
    <div className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
             <div className="text-center mb-20">
                <h1 className="text-5xl font-bold mb-6 text-slate-900 tracking-tight">{t.product.title}</h1>
                <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">{t.product.subtitle}</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mb-20">
                {t.product.features.map((feature, i) => (
                    <div key={i} className="bg-white border border-slate-200 p-10 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 text-blue-600">
                           {i === 0 ? <Headphones size={28}/> : i === 1 ? <Activity size={28}/> : <BarChart3 size={28}/>}
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-slate-900">{feature.title}</h3>
                        <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
                    </div>
                ))}
            </div>

            {/* Deep Dive - Conversation Intelligence */}
            <div className="relative bg-white border border-slate-200 rounded-3xl overflow-hidden p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-blue-50/50 to-transparent pointer-events-none"></div>
                <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
                    <div>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-xs font-bold text-blue-700 mb-6 uppercase tracking-wider">
                            <Lock size={12} /> Conversation Intelligence
                        </div>
                        <h2 className="text-3xl font-bold mb-6 text-slate-900">Stop Guessing. Start Knowing.</h2>
                        <p className="text-slate-600 mb-8 leading-relaxed text-lg">
                            Customers who wait more than <strong>1 second</strong> for a voice agent response hang up <strong>40% more often</strong>. JuniVo responds in under 800ms — and every word of every conversation is captured, transcribed, and scored so you never fly blind again.
                        </p>
                        <ul className="space-y-5">
                            <li className="flex items-center gap-4">
                                <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600"><CheckCircle2 size={18} /></div>
                                <span className="text-slate-700 font-medium">100% call recording — every second captured</span>
                            </li>
                            <li className="flex items-center gap-4">
                                <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600"><CheckCircle2 size={18} /></div>
                                <span className="text-slate-700 font-medium">Real-time sentiment alerts when callers are frustrated</span>
                            </li>
                            <li className="flex items-center gap-4">
                                <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600"><CheckCircle2 size={18} /></div>
                                <span className="text-slate-700 font-medium">AI summaries & outcome tags on every call — automatically</span>
                            </li>
                        </ul>
                    </div>
                    
                    {/* Analytics Dashboard Mockup */}
                    <div className="bg-slate-50 rounded-2xl border border-slate-200 p-8 shadow-sm relative">
                        <div className="absolute top-4 right-4 flex gap-2">
                             <span className="w-3 h-3 rounded-full bg-slate-200"></span>
                             <span className="w-3 h-3 rounded-full bg-slate-200"></span>
                             <span className="w-3 h-3 rounded-full bg-slate-200"></span>
                        </div>
                        <div className="text-slate-500 mb-6 font-semibold uppercase tracking-wider text-xs">Call Analytics Dashboard</div>
                        <div className="space-y-4 text-sm">
                            <div className="flex justify-between items-center"><span className="text-slate-600 font-medium">Calls Recorded Today</span> <span className="px-2 py-1 bg-white border border-slate-200 rounded text-slate-900 font-bold">147</span></div>
                            <div className="flex justify-between items-center"><span className="text-slate-600 font-medium">Avg Response Latency</span> <span className="px-2 py-1 bg-emerald-50 border border-emerald-200 rounded text-emerald-700 font-bold">780ms</span></div>
                            <div className="flex justify-between items-center"><span className="text-slate-600 font-medium">Positive Sentiment Rate</span> <span className="px-2 py-1 bg-blue-50 border border-blue-200 rounded text-blue-700 font-bold">94.2%</span></div>
                            <div className="flex justify-between items-center"><span className="text-slate-600 font-medium">Calls Needing Review</span> <span className="px-2 py-1 bg-amber-50 border border-amber-200 rounded text-amber-700 font-bold">3</span></div>
                            <div className="flex justify-between items-center border-t border-slate-200 pt-4 mt-2">
                                <span className="text-slate-900 font-bold uppercase tracking-wide text-xs">Booking Conversion Rate</span> 
                                <span className="text-emerald-600 font-bold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">68.4%</span>
                            </div>
                        </div>
                        <div className="mt-6 pt-4 border-t border-slate-200">
                            <div className="text-slate-500 font-semibold uppercase tracking-wider text-[10px] mb-3">Latest AI Call Summary</div>
                            <div className="bg-white rounded-lg p-3 border border-slate-100 text-xs text-slate-600 leading-relaxed">
                                Caller inquired about availability for a consultation next week. <span className="text-emerald-600 font-semibold">Sentiment: Positive.</span> Appointment booked for Thursday at 2:00 PM. Insurance verified.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const SolutionsPage = ({ t }) => {
    const [activeTab, setActiveTab] = useState('Medical');
    const tabs = {
        Medical: { icon: Stethoscope, key: 'Medical' },
        Legal: { icon: Scale, key: 'Legal' },
        'Home Services': { icon: Wrench, key: 'HomeServices' },
        'Real Estate': { icon: Building, key: 'RealEstate' }
    };

    return (
        <div className="pt-32 pb-20 px-6">
            <div className="max-w-7xl mx-auto">
                 <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold mb-6 text-slate-900 tracking-tight">{t.solutions.title}</h1>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">{t.solutions.subtitle}</p>
                </div>

                {/* Industry Tabs */}
                <div className="flex flex-wrap justify-center gap-3 mb-16">
                    {Object.entries(tabs).map(([label, config]) => {
                         const Icon = config.icon;
                         return (
                            <button
                                key={label}
                                onClick={() => setActiveTab(config.key)}
                                className={`flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold transition-all border ${
                                    activeTab === config.key 
                                    ? 'bg-blue-600 text-white border-blue-600 shadow-md' 
                                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900'
                                }`}
                            >
                                <Icon size={18} />
                                {t.solutions.tabs[Object.keys(tabs).indexOf(label)]}
                            </button>
                        );
                    })}
                </div>

                {/* Tab Content */}
                <div className="bg-white border border-slate-200 rounded-3xl p-8 md:p-16 shadow-sm animate-fade-in">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div>
                             <h2 className="text-3xl font-bold mb-8 text-slate-900">{t.solutions.content[activeTab].title}</h2>
                             <div className="space-y-5">
                                {t.solutions.content[activeTab].points.map((point, i) => (
                                    <div key={i} className="flex items-center gap-5 p-5 rounded-2xl bg-slate-50 border border-slate-100">
                                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                                            <CheckCircle2 size={20} />
                                        </div>
                                        <span className="text-lg text-slate-700 font-medium">{point}</span>
                                    </div>
                                ))}
                             </div>
                        </div>
                        <div className="relative h-full min-h-[350px] bg-slate-50 rounded-2xl border border-slate-200 p-8 flex items-center justify-center overflow-hidden">
                             {/* Abstract Visualization */}
                             <div className="absolute inset-0 bg-blue-50/50"></div>
                             <div className="relative z-10 text-center bg-white p-10 rounded-full shadow-lg border border-slate-100">
                                 <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600 animate-pulse">
                                     {activeTab === 'Medical' && <Stethoscope size={48} />}
                                     {activeTab === 'Legal' && <Scale size={48} />}
                                     {activeTab === 'HomeServices' && <Wrench size={48} />}
                                     {activeTab === 'RealEstate' && <Building size={48} />}
                                 </div>
                                 <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                                     {activeTab === 'Medical' ? 'HIPAA SECURE CHANNEL' : 'ENCRYPTED DATA STREAM'}
                                 </p>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const PricingPage = ({ t }) => (
    <div className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
             <div className="text-center mb-20">
                <h1 className="text-5xl font-bold mb-6 text-slate-900 tracking-tight">{t.pricing.title}</h1>
                <p className="text-xl text-slate-600 max-w-2xl mx-auto">{t.pricing.subtitle}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {t.pricing.tiers.map((tier, i) => (
                    <div 
                        key={i} 
                        className={`relative p-10 rounded-3xl border flex flex-col bg-white ${
                            i === 1 
                            ? 'border-blue-600 ring-4 ring-blue-600/10 shadow-xl scale-[1.02] z-10' 
                            : 'border-slate-200 shadow-sm'
                        }`}
                    >
                        {i === 1 && (
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                                Most Popular
                            </div>
                        )}
                        <h3 className="text-2xl font-bold mb-3 text-slate-900">{tier.name}</h3>
                        <p className="text-slate-500 mb-8 text-sm h-10">{tier.desc}</p>
                        <div className="mb-8">
                            <span className="text-5xl font-extrabold text-slate-900">{tier.price}</span>
                            <span className="text-slate-500 font-medium">{tier.period}</span>
                        </div>
                        
                        <div className="flex-grow space-y-5 mb-10">
                            {tier.features.map((feat, k) => (
                                <div key={k} className="flex items-center gap-3 text-sm text-slate-700 font-medium">
                                    <CheckCircle2 size={18} className="text-blue-600 shrink-0" />
                                    <span>{feat}</span>
                                </div>
                            ))}
                        </div>
                        
                        <button className={`w-full py-4 rounded-xl font-bold transition-all shadow-sm ${
                            i === 1 
                            ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                            : 'bg-white border border-slate-300 hover:bg-slate-50 text-slate-900'
                        }`}>
                            Choose {tier.name}
                        </button>
                    </div>
                ))}
            </div>
            
            <div className="mt-20 text-center bg-slate-50 rounded-3xl p-10 border border-slate-200 max-w-4xl mx-auto">
                <div className="w-16 h-16 bg-white border border-slate-200 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-600 shadow-sm">
                    <Building size={24} />
                </div>
                <h4 className="text-2xl font-bold mb-4 text-slate-900">Need a Custom Enterprise Build?</h4>
                <p className="text-slate-600 mb-8 text-lg">We architect custom AI models and integrations for high-compliance medical groups, legal networks, and large franchises.</p>
                <button className="text-blue-600 font-bold hover:text-blue-800 flex items-center gap-2 mx-auto bg-blue-50 px-6 py-3 rounded-full transition-colors">
                    Contact Enterprise Sales <ArrowRight size={18} />
                </button>
            </div>
        </div>
    </div>
);

// --- Main App ---

const HeroSection = ({ t, lang }) => {
  const [selectedAgent, setSelectedAgent] = useState(AGENTS[0]?.id || '');
  const { callStatus, agentTalking, transcript, startCall, endCall, reset } = useRetellCall();
  const isActive = callStatus === 'active';
  const isConnecting = callStatus === 'connecting';
  const isEnded = callStatus === 'ended';
  const isError = callStatus === 'error';
  const isIdle = callStatus === 'idle';

  return (
    <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 px-6 overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-blue-50 to-transparent -z-10"></div>
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-teal-50/50 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-2 gap-16 items-center">
        <div className="text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-bold text-slate-600 mb-8 shadow-sm animate-fade-in-up uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            {t.hero.status}
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-8 leading-[1.15] text-slate-900 break-keep">
            {t.hero.headline} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-teal-500">
              {t.hero.headlineHighlight}
            </span>
          </h1>

          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed break-keep">
            {t.hero.subheadline}
          </p>

          <div className="flex flex-col items-center lg:items-start gap-4">
            {/* Agent Selector */}
            {AGENTS.length > 1 && (isIdle || isEnded || isError) && (
              <div className="mb-1 w-full max-w-md lg:mx-0 mx-auto">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">{t.hero.selectAgent}</p>
                <div className="flex gap-2 flex-wrap justify-center lg:justify-start">
                  {AGENTS.map((agent) => (
                    <button
                      key={agent.id}
                      onClick={() => setSelectedAgent(agent.id)}
                      className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all border ${
                        selectedAgent === agent.id
                          ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      {agent.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Call Controls */}
            {(isIdle || isEnded || isError) && (
              <div className="flex flex-col items-center lg:items-start gap-3">
                <button
                  onClick={() => startCall(selectedAgent)}
                  disabled={!selectedAgent}
                  className="group relative inline-flex items-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-base hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="absolute -inset-1 bg-blue-400 rounded-full blur opacity-30 group-hover:opacity-50 transition"></div>
                  <Mic className="w-5 h-5 relative z-10" />
                  <span className="relative z-10">{isEnded ? t.hero.tryAgain : t.hero.startCall}</span>
                </button>
                {isError && <p className="text-red-500 text-sm font-medium">{t.hero.errorOccurred}</p>}
                {isIdle && <p className="text-sm text-slate-500 font-medium">{t.hero.tapToTry}</p>}
              </div>
            )}

            {isConnecting && (
              <div className="flex items-center gap-3 text-blue-600 font-semibold animate-pulse">
                <div className="w-3 h-3 bg-blue-600 rounded-full animate-ping"></div>
                {t.hero.connecting}
              </div>
            )}

            {isActive && (
              <div className="flex items-center gap-4">
                <button
                  onClick={endCall}
                  className="inline-flex items-center gap-2 bg-red-500 text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-red-600 transition-all shadow-md"
                >
                  <PhoneOff className="w-4 h-4" />
                  {t.hero.endCall}
                </button>
                <span className="text-sm font-medium text-emerald-600 flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                  {agentTalking ? t.hero.agentSpeaking : t.hero.listening}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Right Visualizer / Live Call Card */}
        <div className="relative flex justify-center lg:justify-end animate-fade-in-up delay-200 mt-8 lg:mt-0">
          <div className="absolute inset-0 bg-blue-100/60 blur-[100px] rounded-full"></div>
          <LiveCallCard
            t={t}
            lang={lang}
            callStatus={callStatus}
            agentTalking={agentTalking}
          />
        </div>
      </div>
    </section>
  );
};

const App = () => {
  const [lang, setLang] = useState('en');
  const [currentPage, setCurrentPage] = useState('home');
  const t = translations[lang];

  // Component to render based on current page state
  const renderPage = () => {
      switch(currentPage) {
          case 'product': return <ProductPage t={t} />;
          case 'solutions': return <SolutionsPage t={t} />;
          case 'pricing': return <PricingPage t={t} />;
          default: return (
            <>
                <HeroSection t={t} lang={lang} />

                {/* TRUST LOGOS */}
                <section className="py-12 border-y border-slate-200 bg-slate-50">
                    <div className="max-w-7xl mx-auto px-6">
                    <p className="text-center text-xs font-bold tracking-widest text-slate-400 mb-8 uppercase">{t.trust.trustedBy}</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                        {t.trust.niches.map((niche) => (
                        <div key={niche} className="flex items-center justify-center text-lg font-bold text-slate-800 text-center px-4">
                            {niche}
                        </div>
                        ))}
                    </div>
                    </div>
                </section>

                {/* 3 PILLARS SECTION */}
                <section id="features" className="py-28 px-6 relative bg-white">
                  <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                      <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-slate-900 tracking-tight break-keep">{t.features.title}</h2>
                      <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed break-keep">
                        {t.features.subtitle}
                      </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                      {t.features.cards.map((card, index) => (
                          <FeatureCard 
                          key={index}
                          icon={[Phone, Zap, MessageSquare][index]}
                          title={card.title}
                          description={card.description}
                          colorClass={["from-blue-600 to-blue-400", "from-purple-600 to-pink-400", "from-green-500 to-emerald-400"][index]}
                          features={card.features}
                          />
                      ))}
                    </div>
                  </div>
                </section>

                {/* ROI CALCULATOR SECTION */}
                <section id="roi" className="py-28 px-6 bg-slate-50 border-y border-slate-200">
                  <div className="max-w-5xl mx-auto">
                    <ROICalculator t={t} />
                  </div>
                </section>

                {/* TECH/SECURITY SECTION */}
                <section className="py-28 px-6 bg-white">
                  <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
                    <div>
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 border border-blue-100 text-sm font-bold text-blue-700 mb-8">
                        <ShieldCheck className="w-5 h-5" /> HIPAA COMPLIANT
                      </div>
                      <h2 className="text-4xl md:text-5xl font-extrabold mb-8 text-slate-900 tracking-tight break-keep">{t.tech.title}</h2>
                      <div className="space-y-8">
                        <div className="flex gap-5">
                          <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
                            <Globe className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="text-xl font-bold text-slate-900 mb-2">{t.tech.multilingualTitle}</h4>
                            <p className="text-slate-600 leading-relaxed break-keep">{t.tech.multilingualDesc}</p>
                          </div>
                        </div>
                        
                        <div className="flex gap-5">
                          <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
                            <Headphones className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="text-xl font-bold text-slate-900 mb-2">{t.tech.humanLoopTitle}</h4>
                            <p className="text-slate-600 leading-relaxed break-keep">{t.tech.humanLoopDesc}</p>
                          </div>
                        </div>

                        <div className="flex gap-5">
                          <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
                            <Calendar className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="text-xl font-bold text-slate-900 mb-2">{t.tech.integrationTitle}</h4>
                            <p className="text-slate-600 leading-relaxed break-keep">{t.tech.integrationDesc}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="relative">
                      {/* Clean Clinical Transcript UI */}
                      <div className="relative z-10 bg-white border border-slate-200 rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-5 mb-6">
                          <span className="text-xs font-bold text-slate-400 tracking-widest uppercase">{t.tech.transcriptTitle}</span>
                          <span className="text-xs font-bold text-emerald-600 flex items-center gap-1.5 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100">
                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                            {t.tech.activeStatus}
                          </span>
                        </div>
                        <div className="space-y-6 text-[15px] leading-relaxed">
                          {/* AI Message */}
                          <div className="flex gap-4">
                            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white shrink-0 text-xs font-bold">{t.tech.aiLabel}</div>
                            <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl rounded-tl-sm text-slate-700">
                              {t.tech.aiText1}
                            </div>
                          </div>
                          {/* User Message */}
                          <div className="flex gap-4 flex-row-reverse">
                            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 shrink-0 text-xs font-bold">{t.tech.userLabel[0]}</div>
                            <div className="bg-blue-600 text-white p-4 rounded-2xl rounded-tr-sm">
                              {t.tech.userText1}
                            </div>
                          </div>
                           {/* AI Message */}
                           <div className="flex gap-4">
                            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white shrink-0 text-xs font-bold">{t.tech.aiLabel}</div>
                            <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl rounded-tl-sm text-slate-700">
                              {t.tech.aiText2}
                            </div>
                          </div>
                          
                          <div className="pt-4 flex items-center gap-2 flex-wrap border-t border-slate-100">
                             <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-lg border border-emerald-200">{t.tech.tagBooking}</span>
                             <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-lg border border-blue-200">{t.tech.tagInsurance}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Subtle Background decoration */}
                      <div className="absolute -inset-6 bg-gradient-to-tr from-blue-50 to-teal-50 rounded-[2.5rem] -z-10"></div>
                    </div>
                  </div>
                </section>

                {/* CTA SECTION - Premium Dark Blue */}
                <section className="py-24 px-6 bg-white">
                  <div className="max-w-5xl mx-auto bg-slate-900 rounded-[2.5rem] p-12 md:p-20 text-center shadow-2xl relative overflow-hidden">
                    {/* Abstract curves for elegance */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600 rounded-full blur-[120px] opacity-20 -translate-y-1/2 translate-x-1/3"></div>
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-500 rounded-full blur-[100px] opacity-20 translate-y-1/2 -translate-x-1/3"></div>

                    <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-white relative z-10 break-keep tracking-tight">{t.cta.title}</h2>
                    <p className="text-slate-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto relative z-10 break-keep leading-relaxed">
                      {t.cta.subtitle}
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
                      <a href={CALENDAR_URL} target="_blank" rel="noopener noreferrer" className="bg-white text-slate-900 px-8 py-4 rounded-full font-bold hover:bg-slate-50 transition-all shadow-lg transform hover:-translate-y-1 text-center">
                        {t.cta.btnStrategy}
                      </a>
                      <button onClick={() => setCurrentPage('pricing')} className="bg-transparent border border-slate-600 text-white px-8 py-4 rounded-full font-bold hover:bg-white/5 transition-all">
                        {t.cta.btnPricing}
                      </button>
                    </div>
                  </div>
                </section>
            </>
          );
      }
  };

  return (
    <div className={`min-h-screen bg-slate-50 font-sans overflow-x-hidden ${lang === 'ko' ? 'font-sans-kr' : ''}`}>
      <Navbar lang={lang} setLang={setLang} t={t} currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {/* Render Active Page Content */}
      <main className="bg-white">
        {renderPage()}
      </main>

      {/* FOOTER - Deep Navy Premium Feel */}
      <footer className="py-16 px-6 bg-slate-950 border-t border-slate-900">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6 cursor-pointer" onClick={() => setCurrentPage('home')}>
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                <Zap className="text-white w-4 h-4 fill-current" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">JuniVo<span className="text-blue-500"> Ai</span></span>
            </div>
            <p className="text-slate-400 text-sm max-w-sm break-keep leading-relaxed font-medium">
              {t.footer.desc}
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">{t.footer.product}</h4>
            <ul className="space-y-3 text-sm text-slate-400 font-medium">
              <li><button onClick={() => setCurrentPage('product')} className="hover:text-blue-400 transition-colors">{t.footer.links.receptionist}</button></li>
              <li><button onClick={() => setCurrentPage('product')} className="hover:text-blue-400 transition-colors">{t.footer.links.sales}</button></li>
              <li><button onClick={() => setCurrentPage('product')} className="hover:text-blue-400 transition-colors">{t.footer.links.chat}</button></li>
              <li><button onClick={() => setCurrentPage('product')} className="hover:text-blue-400 transition-colors">{t.footer.links.integrations}</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">{t.footer.company}</h4>
            <ul className="space-y-3 text-sm text-slate-400 font-medium">
              <li><a href="#" className="hover:text-blue-400 transition-colors">{t.footer.links.about}</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">{t.footer.links.careers}</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">{t.footer.links.privacy}</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">{t.footer.links.terms}</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-slate-500">
          <p>{t.footer.rights}</p>
          <div className="flex flex-wrap justify-center gap-6">
            {t.footer.compliance.map((item, idx) => (
                <span key={idx} className="flex items-center gap-1.5">
                    <ShieldCheck size={14} className="text-blue-500"/> {item}
                </span>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;