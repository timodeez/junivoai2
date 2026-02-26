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
      platform: "Our Platform",
      product: "Product",
      receptionist: "AI Receptionist",
      salesAgent: "Sales Agent",
      chatbot: "Human Chatbot",
      analytics: "Conversation Intelligence",
      solutions: "Solutions",
      pricing: "Pricing",
      login: "Client Login",
      bookDemo: "Book Consultation",
      getStarted: "Get Started"
    },
    hero: {
      status: "24/7 INTELLIGENT RECEPTION",
      headline: "Never miss a call, a sale, or a lead.",
      headlineHighlight: "Work while you sleep.",
      subheadline: "Elevate your business with a premium AI workforce. Answer every inquiry instantly, schedule appointments, and provide a flawless client experience — day or night.",
      demoInputPlaceholder: "(555) 123-4567",
      callMe: "Experience It",
      dialing: "Connecting...",
      connected: "Connected",
      tryDemo: "Enter your number for a live demonstration.",
      agentCalling: "Our AI Coordinator is calling you now...",
      selectAgent: "Try our med spa consultation agent live",
      startCall: "Start Live Demo",
      endCall: "End Conversation",
      connecting: "Connecting...",
      liveCall: "Live Conversation",
      callEnded: "Conversation Ended",
      tapToTry: "Talk to our med spa AI agent — live, right here in your browser.",
      tryAgain: "Try Again",
      agentSpeaking: "Agent is speaking...",
      listening: "Listening...",
      micRequired: "Microphone access is required for the live demo.",
      errorOccurred: "Something went wrong. Please try again.",
    },
    product: {
        title: "Every Conversation. Recorded. Analyzed. Optimized.",
        subtitle: "Every call is automatically recorded, transcribed, and analyzed by AI. Know exactly what's being said, how your customers feel, and where revenue is being lost — in real time.",
        features: [
            { title: "Full Call Recording & Transcripts", desc: "Every conversation is recorded and transcribed with high accuracy. Review any call instantly — no detail is ever lost." },
            { title: "AI-Powered Sentiment Analysis", desc: "Real-time sentiment scoring detects caller frustration, satisfaction, and intent. Know how every interaction lands — not just what was said, but how it felt." },
            { title: "Post-Call AI Analysis", desc: "Automated summaries, outcome tagging, and conversion tracking on every call. Surface patterns across hundreds of conversations in seconds." }
        ]
    },
    solutions: {
        title: "Built for Your Industry",
        subtitle: "JuniVo isn't a one-size-fits-all tool. Each AI agent is pre-trained on the specific workflows, compliance requirements, and customer journeys of your industry.",
        tabs: ["Medical & Med Spa", "Legal", "Home Services", "Real Estate"],
        cta: "See how JuniVo works for your business",
        content: {
            Medical: {
                title: "The AI Patient Coordinator",
                desc: "Purpose-built for clinics, med spas, dental offices, and specialty practices. Handles the entire patient journey from first inquiry to booked appointment.",
                color: "blue",
                stat: "62%",
                statLabel: "of patients who reach voicemail hang up and call a competitor",
                source: "Medical Practice Phone Statistics, AgentZap 2024",
                painPoint: "Your front desk closes at 5 PM. Your patients don't. When callers hit voicemail, 62% won't leave a message — they'll book with whoever answers next.",
                points: [
                    "HIPAA-compliant call handling & data storage",
                    "Books consultations & appointments to your calendar",
                    "Answers treatment questions (pricing, prep, recovery)",
                    "Pre-op & post-op instruction delivery",
                    "After-hours emergency triage & smart escalation",
                    "EMR/EHR integration (DrChrono, Athena, & more)",
                    "Insurance verification & eligibility questions",
                    "Automated appointment reminders & no-show follow-up"
                ],
                conversation: {
                    ai1: "Thank you for calling Glow Aesthetics! Are you looking to schedule a consultation, or do you have questions about a specific treatment?",
                    user: "I'm interested in Botox but not sure about pricing or downtime.",
                    ai2: "Great question! Botox starts at $12/unit, and most patients see no downtime — just avoid heavy exercise for 24 hours. I'd love to book you a free consultation so our provider can create a personalized plan. I have Thursday at 3 PM open — would that work?"
                }
            },
            Legal: {
                title: "The Virtual Intake Specialist",
                desc: "Built for law firms, solo attorneys, and legal practices. Captures every potential client, qualifies cases, and keeps your calendar full — without adding headcount.",
                color: "purple",
                stat: "42%",
                statLabel: "of potential clients call outside business hours",
                source: "After-Hours Legal Lead Capture Statistics, Talk24 2026",
                painPoint: "A prospective client calls at 7 PM about a car accident. They get voicemail. By morning, they've already retained another attorney. That case is gone.",
                points: [
                    "24/7 confidential client intake on every call",
                    "Case type qualification & conflict of interest screening",
                    "Retainer agreement & engagement letter dispatch",
                    "Court date, deposition & consultation reminders",
                    "Captures case details, contact info & urgency level",
                    "Routes high-priority cases to attorneys immediately",
                    "Follows up on web inquiries & consultation no-shows",
                    "Multilingual intake for diverse client demographics"
                ],
                conversation: {
                    ai1: "Thank you for calling Mitchell & Associates. I can help you get started. Can you briefly tell me what type of legal matter you need assistance with?",
                    user: "I was in a car accident last week and the other driver's insurance is lowballing me.",
                    ai2: "I'm sorry to hear about your accident. That sounds like a personal injury case, and our firm handles those. Let me get some quick details and schedule a free consultation with one of our attorneys. What day works best for you this week?"
                }
            },
            HomeServices: {
                title: "The AI Dispatcher",
                desc: "Designed for HVAC, plumbing, electrical, cleaning, and general contracting businesses. Never lose a job to a missed call or slow quote again.",
                color: "amber",
                stat: "78%",
                statLabel: "of customers hire the first company to respond",
                source: "Lead Response Time Statistics, Rapport Agent 2024",
                painPoint: "A homeowner's AC breaks at 2 PM on a Saturday. They call three companies. The one that answers first gets the $8,000 replacement job. The average HVAC company takes 4+ hours to respond — by then, the job is gone.",
                points: [
                    "Instant quote generation & service qualification",
                    "Intelligent technician dispatching & scheduling",
                    "Emergency call handling with priority routing",
                    "Captures job details, photos & site information",
                    "Automated follow-up for estimates & pending jobs",
                    "Post-service review & feedback collection",
                    "Seasonal campaign support (AC tune-ups, winterization)",
                    "Handles warranty questions & repeat service booking"
                ],
                conversation: {
                    ai1: "Thanks for calling Comfort Pro HVAC! Are you calling about a repair, maintenance, or a new installation?",
                    user: "My AC just stopped working and it's 95 degrees. I need someone out here today if possible.",
                    ai2: "I completely understand the urgency. Let me get you on our emergency schedule. I have a technician available between 2-4 PM today. Can I get your address and the make/model of your unit so our tech arrives prepared?"
                }
            },
            RealEstate: {
                title: "The AI Inside Sales Agent",
                desc: "Built for brokerages, teams, and solo agents. Responds to every lead instantly, qualifies buyers and sellers, and keeps your pipeline full 24/7.",
                color: "emerald",
                stat: "78%",
                statLabel: "of leads go to the agent who responds first",
                source: "NAR Home Buyers & Sellers Generational Trends Report, 2025",
                painPoint: "A buyer submits an inquiry on Zillow at 10 PM. If you respond in 5 minutes, you have a 78% chance of converting. Respond in 30 minutes, and that drops to 10%.",
                points: [
                    "Instant lead response on every web inquiry",
                    "Buyer & seller prequalification (budget, timeline, motivation)",
                    "Automated showing scheduling & confirmation",
                    "Open house follow-up sequences & drip campaigns",
                    "Mortgage partner warm handoff & pre-approval routing",
                    "Neighborhood & property FAQ handling",
                    "Re-engages cold leads with personalized outreach",
                    "CRM sync (Follow Up Boss, KvCORE, Salesforce)"
                ],
                conversation: {
                    ai1: "Hi! Thanks for your interest in the listing on 425 Oak Street. I'm the AI assistant for the Sarah Chen Team. Are you currently working with an agent, or can I help you learn more?",
                    user: "I'm not working with anyone yet. What's the HOA fee and is the seller flexible on price?",
                    ai2: "Great questions! The HOA is $285/month and covers water, trash, and pool access. The seller is motivated — they've had two price reductions. I can get you scheduled for a private showing this weekend. Are you pre-approved for a mortgage, or would you like a referral to our lending partner?"
                }
            }
        }
    },
    pricing: {
        title: "Simple, ROI-Positive Pricing",
        subtitle: "Most businesses recover their monthly investment within the first week of deployment.",
        mostPopular: "Most Popular",
        chooseCta: "Choose {plan}",
        enterpriseTitle: "Need a Custom Enterprise Build?",
        enterpriseDesc: "We architect custom AI models and integrations for high-compliance medical groups, legal networks, and large franchises.",
        enterpriseCta: "Contact Enterprise Sales",
        tiers: [
            { name: "Receptionist", price: "$500", period: "/mo", desc: "Your 24/7 AI receptionist that never misses a call.", features: ["AI Receptionist (Voice)", "Unlimited Inbound Calls", "Call Recording & Transcripts", "Appointment Scheduling", "Business Knowledge Training", "Standard Support"] },
            { name: "Receptionist + Chat", price: "$750", period: "/mo", desc: "Voice + website chat for total coverage.", features: ["Everything in Receptionist", "AI Website Chatbot", "Chat Trained on Your Knowledge Base", "Lead Capture & Qualification", "Multilingual Support (20+ Languages)", "Priority Support"] },
            { name: "Full Suite", price: "$1,000", period: "/mo", desc: "Add an AI sales agent to close more deals.", features: ["Everything in Receptionist + Chat", "AI Sales Director Agent", "Outbound Lead Follow-up", "AI Sentiment & Conversion Analytics", "Dedicated Account Manager", "Custom Voice & Persona"] }
        ]
    },
    features: {
      title: "Voice. Chat. Trained on Your Business.",
      subtitle: "Every business gets a custom AI that actually knows your services, your pricing, and your brand — deployed across voice and chat so you never miss a lead.",
      cards: [
        {
          title: "The Receptionist",
          description: "Your 24/7 AI front desk. Answers every call with a custom voice trained on your business — books appointments, handles FAQs, and never puts anyone on hold.",
          features: [
            "Custom voice tailored to your brand",
            "Trained on your services, pricing & FAQs",
            "Books directly to your calendar",
            "Seamless handoff to live staff when needed"
          ]
        },
        {
          title: "The Sales Director",
          description: "An AI sales agent that follows up on every lead, qualifies prospects, and closes bookings — so your team only talks to people ready to buy.",
          features: [
            "Outbound follow-up on every lead",
            "Qualifies prospects by intent & budget",
            "Handles objections with trained responses",
            "Conversion tracking & sentiment analysis"
          ]
        },
        {
          title: "The Human Chatbot",
          description: "A website chat assistant that feels human. Trained on your entire knowledge base, it answers questions, captures leads, and books appointments 24/7.",
          features: [
            "Trained on your docs, FAQs & service menus",
            "Natural, human-like conversation flow",
            "Captures lead info & books appointments",
            "Multilingual — 20+ languages supported"
          ]
        }
      ]
    },
    roi: {
        title: "The Cost of Missed Opportunities",
        subtitle: "Calculate the revenue left on the table due to missed calls, voicemail drop-offs, and delayed follow-ups.",
        missedCalls: "Missed Calls Per Week",
        dealValue: "Average Patient/Client Value",
        yearlyLossLabel: "Potential Annual Revenue Lost",
        disclaimer1: "Calculated based on a standard 52-week operating year.",
        disclaimer2: "JuniVo is designed to recover 100% of this lost revenue."
    },
    tech: {
        title: "Enterprise-Grade Security & Intelligence",
        multilingualTitle: "Multilingual Fluency",
        multilingualDesc: "Instantly detects and switches between English, Spanish, French, and 20+ other languages mid-conversation.",
        humanLoopTitle: "Human-In-The-Loop Escalation",
        humanLoopDesc: "Real-time sentiment monitoring flags sensitive or complex calls for immediate human intervention.",
        integrationTitle: "Seamless Integration",
        integrationDesc: "Secure, two-way sync with leading EMRs, Salesforce, HubSpot, and practice management software.",
        transcriptTitle: "SECURE TRANSCRIPT LOG",
        activeStatus: "ENCRYPTED & ACTIVE",
        aiLabel: "AI",
        userLabel: "Patient",
        aiText1: "Thank you for calling Summit Dental. Are you looking to schedule a new cleaning or adjust an existing appointment?",
        userText1: "I need to book a cleaning, but do you accept Delta Dental?",
        aiText2: "Yes, we certainly accept Delta Dental. I have an opening this Thursday at 2:00 PM. Would you like me to reserve that for you?",
        tagBooking: "INTENT: SCHEDULING",
        tagInsurance: "VERIFICATION: INSURANCE"
    },
    cta: {
        title: "Ready to elevate your practice?",
        subtitle: "Join the industry leaders saving 20+ administrative hours a week while significantly increasing their booking rates.",
        btnStrategy: "Schedule a Consultation"
    },
    trust: {
      trustedBy: "TRUSTED BY PREMIUM PRACTICES & FIRMS IN",
      niches: ['Medical Aesthetics', 'Legal Services', 'Specialty Clinics', 'Luxury Real Estate']
    },
    legal: {
      lastUpdated: "Last updated: February 2026",
      privacy: {
        title: "Privacy Policy",
        s1Title: "1. Information We Collect",
        s1Body: "We collect information you provide directly, including name, email, phone number, and business details when you sign up, request a demo, or contact us. We also collect call recordings, transcripts, and analytics data generated through the use of our AI agents on your behalf.",
        s2Title: "2. How We Use Your Information",
        s2Body: "We use your information to provide and improve our services, process transactions, communicate with you, and generate AI-powered call analytics. Call data is processed to deliver transcripts, sentiment analysis, and conversation summaries to your dashboard.",
        s3Title: "3. Data Storage & Security",
        s3Body: "All data is encrypted in transit (TLS 1.2+) and at rest (AES-256). Call recordings and transcripts are stored on secure, access-controlled infrastructure. We implement industry-standard security practices including regular audits, role-based access controls, and intrusion detection.",
        s4Title: "4. HIPAA Compliance",
        s4Body: "For healthcare and med spa clients, JuniVo operates as a HIPAA-compliant Business Associate. We execute Business Associate Agreements (BAAs) and maintain administrative, physical, and technical safeguards required under HIPAA regulations.",
        s5Title: "5. Data Sharing",
        s5Body: "We do not sell your data. We share information only with service providers necessary to deliver our platform (cloud hosting, telephony providers) under strict data processing agreements. We may disclose data if required by law or to protect our legal rights.",
        s6Title: "6. Data Retention",
        s6Body: "Call recordings and transcripts are retained for the duration of your subscription plus 30 days. You may request deletion of your data at any time by contacting us. Upon account termination, all data is permanently deleted within 90 days.",
        s7Title: "7. Your Rights",
        s7Body: "You have the right to access, correct, or delete your personal data. For GDPR-covered individuals, you may also exercise rights to data portability and restriction of processing. Contact us at privacy@junivoai.com to exercise any of these rights.",
        s8Title: "8. Contact",
        s8BodyPrefix: "For privacy-related inquiries, contact us at",
        s8Email: "privacy@junivoai.com"
      },
      terms: {
        title: "Terms of Service",
        s1Title: "1. Acceptance of Terms",
        s1Body: "By accessing or using JuniVo Ai's services, you agree to be bound by these Terms of Service. If you do not agree, you may not use the platform. These terms apply to all users, including businesses and their authorized representatives.",
        s2Title: "2. Description of Service",
        s2Body: "JuniVo Ai provides AI-powered voice agents, chat agents, and conversation analytics tools designed for business use. Our platform handles inbound/outbound calls, website chat, appointment scheduling, lead qualification, and call analysis on behalf of subscribing businesses.",
        s3Title: "3. Account Responsibilities",
        s3Body: "You are responsible for maintaining the security of your account credentials and for all activities under your account. You agree to provide accurate business and contact information and to update it as needed. You must be at least 18 years old to use our services.",
        s4Title: "4. Acceptable Use",
        s4Body: "You may not use JuniVo for any unlawful purpose, to harass or deceive individuals, to make unsolicited robocalls in violation of TCPA or equivalent regulations, or to process data in violation of applicable privacy laws. We reserve the right to suspend accounts that violate these terms.",
        s5Title: "5. Billing & Subscriptions",
        s5Body: "Subscriptions are billed monthly. You authorize us to charge your payment method on file for all applicable fees. Subscriptions renew automatically unless cancelled before the next billing cycle. Refunds are handled on a case-by-case basis at our discretion.",
        s6Title: "6. Intellectual Property",
        s6Body: "All platform technology, AI models, branding, and content are the property of JuniVo Ai. You retain ownership of your business data, call recordings, and transcripts. You grant us a limited license to process this data solely to provide and improve our services.",
        s7Title: "7. Limitation of Liability",
        s7Body: "JuniVo Ai is provided \"as is.\" We are not liable for indirect, incidental, or consequential damages arising from your use of the platform, including but not limited to lost revenue, missed calls due to service interruptions, or AI agent errors. Our total liability shall not exceed the fees paid by you in the 12 months preceding the claim.",
        s8Title: "8. Termination",
        s8Body: "Either party may terminate at any time. Upon termination, your access to the platform will cease and your data will be deleted within 90 days, unless retention is required by law. We may immediately terminate accounts that violate these terms.",
        s9Title: "9. Governing Law",
        s9Body: "These terms are governed by the laws of the State of California, United States. Any disputes shall be resolved through binding arbitration in Los Angeles County, California.",
        s10Title: "10. Contact",
        s10BodyPrefix: "For questions about these terms, contact us at",
        s10Email: "legal@junivoai.com"
      }
    },
    footer: {
        desc: "The premier autonomous front office for high-end service businesses. Capture, qualify, and close with elegance.",
        product: "Platform",
        legal: "Legal",
        links: {
            receptionist: "AI Receptionist",
            sales: "Sales Director",
            chat: "Human Chatbot",
            analytics: "Conversation Intelligence",
            privacy: "Privacy Policy",
            terms: "Terms of Service"
        },
        rights: "© 2026 JuniVo Ai. All rights reserved.",
        compliance: ["HIPAA Compliant", "GDPR Compliant"]
    }
  },
  ko: {
    nav: {
      platform: "플랫폼",
      product: "제품",
      receptionist: "AI 리셉셔니스트",
      salesAgent: "세일즈 에이전트",
      chatbot: "휴먼 챗봇",
      analytics: "대화 인텔리전스",
      solutions: "솔루션",
      pricing: "요금제",
      login: "고객 로그인",
      bookDemo: "상담 예약",
      getStarted: "시작하기"
    },
    hero: {
      status: "24/7 지능형 리셉션",
      headline: "전화, 매출, 리드를 놓치지 마세요.",
      headlineHighlight: "당신이 잠든 사이에도 일합니다.",
      subheadline: "프리미엄 AI 인력으로 귀하의 비즈니스를 격상시키세요. 주야간 상관없이 모든 문의에 즉시 응답하고, 일정을 예약하며, 완벽한 고객 경험을 제공합니다.",
      demoInputPlaceholder: "010-1234-5678",
      callMe: "직접 체험하기",
      dialing: "연결 중...",
      connected: "연결됨",
      tryDemo: "라이브 데모를 위해 전화번호를 입력하세요.",
      agentCalling: "AI 코디네이터가 지금 전화를 걸고 있습니다...",
      selectAgent: "메디스파 상담 에이전트를 직접 체험해 보세요",
      startCall: "라이브 데모 시작",
      endCall: "대화 종료",
      connecting: "연결 중...",
      liveCall: "라이브 대화",
      callEnded: "대화 종료됨",
      tapToTry: "메디스파 AI 에이전트와 브라우저에서 바로 대화해 보세요.",
      tryAgain: "다시 시도",
      agentSpeaking: "에이전트가 말하고 있습니다...",
      listening: "듣고 있습니다...",
      micRequired: "라이브 데모를 위해 마이크 액세스가 필요합니다.",
      errorOccurred: "문제가 발생했습니다. 다시 시도해 주세요.",
    },
    product: {
        title: "모든 대화. 녹음. 분석. 최적화.",
        subtitle: "모든 통화가 자동으로 녹음, 전사, AI 분석됩니다. 무슨 말이 오갔는지, 고객이 어떻게 느꼈는지, 어디서 매출이 빠지는지 — 실시간으로 파악하세요.",
        features: [
            { title: "전체 통화 녹음 및 전사", desc: "모든 대화가 높은 정확도로 녹음 및 전사됩니다. 어떤 통화든 즉시 검토 — 단 하나의 디테일도 놓치지 않습니다." },
            { title: "AI 기반 감정 분석", desc: "실시간 감정 점수가 발신자의 불만, 만족도, 의도를 감지합니다. 모든 상호작용이 어떻게 전달되었는지 파악하세요." },
            { title: "통화 후 AI 분석", desc: "모든 통화에 대한 자동 요약, 결과 태깅, 전환 추적. 수백 건의 대화에서 패턴을 몇 초 만에 파악하세요." }
        ]
    },
    solutions: {
        title: "귀하의 업계를 위해 설계",
        subtitle: "JuniVo는 범용 도구가 아닙니다. 각 AI 에이전트는 귀하의 업계 고유 워크플로우, 규정 준수 요구 사항, 고객 여정에 맞춰 사전 학습됩니다.",
        tabs: ["의료 & 메디스파", "법률", "홈 서비스", "부동산"],
        cta: "JuniVo가 귀하의 비즈니스에서 어떻게 작동하는지 확인하세요",
        content: {
            Medical: {
                title: "AI 환자 코디네이터",
                desc: "클리닉, 메디스파, 치과, 전문 진료소를 위해 설계. 첫 문의부터 예약까지 전체 환자 여정을 처리합니다.",
                color: "blue",
                stat: "62%",
                statLabel: "의 환자가 음성 사서함에 메시지를 남기지 않고 경쟁사에 전화합니다",
                source: "Medical Practice Phone Statistics, AgentZap 2024",
                painPoint: "프론트 데스크는 오후 5시에 문을 닫습니다. 환자는 그렇지 않습니다. 발신자가 음성 사서함에 도달하면 62%는 메시지를 남기지 않고 다음에 응답하는 곳에 예약합니다.",
                points: [
                    "HIPAA 준수 통화 처리 및 데이터 저장",
                    "캘린더에 상담 및 예약 직접 등록",
                    "시술 관련 질문 답변 (가격, 준비, 회복)",
                    "시술 전후 안내 전달",
                    "업무 외 시간 응급 분류 및 스마트 에스컬레이션",
                    "EMR/EHR 통합 (DrChrono, Athena 등)",
                    "보험 확인 및 자격 질문 처리",
                    "자동 예약 알림 및 노쇼 팔로업"
                ],
                conversation: {
                    ai1: "글로우 에스테틱에 전화해 주셔서 감사합니다! 상담 예약에 관심이 있으신가요, 아니면 특정 시술에 대해 궁금한 점이 있으신가요?",
                    user: "보톡스에 관심이 있는데 가격과 회복 기간이 어떻게 되나요?",
                    ai2: "좋은 질문이세요! 보톡스는 유닛당 $12부터 시작하며 대부분의 환자분들은 회복 기간이 없습니다 — 24시간 동안 격한 운동만 피하시면 됩니다. 전문의가 맞춤 계획을 세울 수 있도록 무료 상담을 예약해 드릴까요? 목요일 오후 3시에 가능합니다 — 괜찮으신가요?"
                }
            },
            Legal: {
                title: "가상 인테이크 전문가",
                desc: "법률 사무소, 개인 변호사를 위해 설계. 모든 잠재 의뢰인을 확보하고, 사건을 자격 심사하며, 인원 추가 없이 캘린더를 채웁니다.",
                color: "purple",
                stat: "42%",
                statLabel: "의 잠재 의뢰인이 업무 시간 외에 전화합니다",
                source: "After-Hours Legal Lead Capture Statistics, Talk24 2026",
                painPoint: "잠재 의뢰인이 오후 7시에 교통사고로 전화합니다. 음성 사서함이 응답합니다. 아침이 되면 이미 다른 변호사를 선임했습니다.",
                points: [
                    "모든 전화에서 24/7 기밀 유지 의뢰인 접수",
                    "사건 유형 자격 심사 및 이해 상충 스크리닝",
                    "수임 계약서 및 위임장 발송",
                    "법원 기일, 증언, 상담 알림",
                    "사건 세부 정보, 연락처 및 긴급도 확보",
                    "고우선 사건을 변호사에게 즉시 라우팅",
                    "웹 문의 및 상담 노쇼 팔로업",
                    "다양한 의뢰인을 위한 다국어 접수"
                ],
                conversation: {
                    ai1: "Mitchell & Associates에 전화해 주셔서 감사합니다. 시작을 도와드릴 수 있습니다. 어떤 유형의 법률 문제에 대해 도움이 필요하신지 간단히 말씀해 주시겠어요?",
                    user: "지난주에 교통사고가 났는데 상대방 보험사가 보상을 너무 적게 제안하고 있어요.",
                    ai2: "사고 소식을 듣게 되어 유감입니다. 인신 상해 사건으로 보이며, 저희 사무소에서 전문적으로 다루고 있습니다. 간단한 정보를 받고 변호사와의 무료 상담을 잡아드리겠습니다. 이번 주에 어떤 날이 좋으신가요?"
                }
            },
            HomeServices: {
                title: "AI 배차 관리자",
                desc: "HVAC, 배관, 전기, 청소, 종합 건설 비즈니스를 위해 설계. 부재중 전화나 늦은 견적으로 더 이상 일을 놓치지 마세요.",
                color: "amber",
                stat: "78%",
                statLabel: "의 고객이 가장 먼저 응답하는 업체에 의뢰합니다",
                source: "Lead Response Time Statistics, Rapport Agent 2024",
                painPoint: "주택 소유자의 에어컨이 토요일 오후 2시에 고장납니다. 세 곳에 전화합니다. 먼저 응답한 곳이 $8,000 교체 작업을 따냅니다. 평균 HVAC 업체 응답 시간은 4시간 이상 — 그때쯤이면 일은 이미 사라졌습니다.",
                points: [
                    "즉시 견적 생성 및 서비스 자격 확인",
                    "지능형 기술자 배차 및 일정 관리",
                    "우선 라우팅으로 긴급 통화 처리",
                    "작업 세부 정보, 사진 및 현장 정보 확보",
                    "견적 및 대기 중인 작업 자동 팔로업",
                    "서비스 후 리뷰 및 피드백 수집",
                    "시즌 캠페인 지원 (에어컨 점검, 겨울 준비)",
                    "보증 질문 및 재방문 예약 처리"
                ],
                conversation: {
                    ai1: "Comfort Pro HVAC에 전화해 주셔서 감사합니다! 수리, 유지보수, 또는 새 설치에 대해 문의하시나요?",
                    user: "에어컨이 방금 꺼졌는데 기온이 35도예요. 오늘 가능하면 누군가 와주셨으면 해요.",
                    ai2: "긴급한 상황이시군요. 응급 일정에 바로 넣어드리겠습니다. 오늘 오후 2-4시 사이에 기술자가 가능합니다. 주소와 에어컨 제조사/모델을 알려주시면 기술자가 준비해서 방문하겠습니다."
                }
            },
            RealEstate: {
                title: "AI 내부 영업 에이전트",
                desc: "중개업체, 팀, 개인 에이전트를 위해 설계. 모든 리드에 즉시 응답하고, 매수자와 매도자를 자격 심사하며, 24/7 파이프라인을 채웁니다.",
                color: "emerald",
                stat: "78%",
                statLabel: "의 리드가 가장 먼저 응답하는 에이전트에게 갑니다",
                source: "NAR Home Buyers & Sellers Generational Trends Report, 2025",
                painPoint: "매수자가 밤 10시에 Zillow에서 문의합니다. 5분 안에 응답하면 전환 확률 78%. 30분이면 10%로 떨어집니다.",
                points: [
                    "모든 웹 문의에 즉시 리드 응답",
                    "매수자 & 매도자 사전 자격 심사 (예산, 일정, 동기)",
                    "자동 쇼잉 일정 잡기 및 확인",
                    "오픈 하우스 후속 조치 시퀀스 및 드립 캠페인",
                    "모기지 파트너 따뜻한 인계 및 사전 승인 라우팅",
                    "지역 및 매물 FAQ 처리",
                    "개인화된 아웃리치로 냉각된 리드 재참여",
                    "CRM 동기화 (Follow Up Boss, KvCORE, Salesforce)"
                ],
                conversation: {
                    ai1: "안녕하세요! 425 Oak Street 매물에 관심을 가져주셔서 감사합니다. Sarah Chen 팀의 AI 어시스턴트입니다. 현재 에이전트와 함께 하고 계신가요, 아니면 더 알아보시는 걸 도와드릴까요?",
                    user: "아직 에이전트 없이 알아보고 있어요. HOA 비용이 얼마인지, 매도자가 가격 협상이 가능한지 궁금합니다.",
                    ai2: "좋은 질문입니다! HOA는 월 $285이며 수도, 쓰레기, 수영장 이용이 포함됩니다. 매도자는 적극적입니다 — 이미 두 번 가격을 인하했습니다. 이번 주말에 프라이빗 쇼잉을 잡아드릴까요? 모기지 사전 승인을 받으셨나요, 아니면 저희 대출 파트너를 소개해 드릴까요?"
                }
            }
        }
    },
    pricing: {
        title: "단순하고 ROI가 확실한 요금제",
        subtitle: "대부분의 비즈니스가 도입 첫 주 안에 월 투자 비용을 회수합니다.",
        mostPopular: "가장 인기",
        chooseCta: "{plan} 선택",
        enterpriseTitle: "엔터프라이즈 맞춤 구축이 필요하신가요?",
        enterpriseDesc: "엄격한 규정 준수가 필요한 의료 그룹, 법률 네트워크, 대형 프랜차이즈를 위해 맞춤 AI 모델과 통합을 설계합니다.",
        enterpriseCta: "엔터프라이즈 세일즈 문의",
        tiers: [
            { name: "리셉셔니스트", price: "$500", period: "/월", desc: "전화를 놓치지 않는 24/7 AI 리셉셔니스트.", features: ["AI 리셉셔니스트 (음성)", "무제한 수신 통화", "통화 녹음 및 전사", "예약 일정 관리", "비즈니스 지식 학습", "표준 지원"] },
            { name: "리셉셔니스트 + 채팅", price: "$750", period: "/월", desc: "음성 + 웹사이트 채팅으로 완벽한 커버리지.", features: ["리셉셔니스트 포함 전체", "AI 웹사이트 챗봇", "지식 기반 학습 채팅", "리드 캡처 및 자격 심사", "다국어 지원 (20개 이상)", "우선 지원"] },
            { name: "풀 스위트", price: "$1,000", period: "/월", desc: "AI 세일즈 에이전트로 더 많은 거래를 성사시키세요.", features: ["리셉셔니스트 + 채팅 포함 전체", "AI 세일즈 디렉터 에이전트", "아웃바운드 리드 팔로업", "AI 감정 및 전환 분석", "전담 계정 관리자", "커스텀 음성 및 페르소나"] }
        ]
    },
     trust: {
      trustedBy: "프리미엄 병원 및 기업들이 신뢰합니다",
      niches: ['의료 미용', '법률 서비스', '전문 클리닉', '고급 부동산']
    },
    features: {
      title: "음성. 채팅. 귀사의 비즈니스에 맞춘 AI.",
      subtitle: "모든 비즈니스가 자사의 서비스, 가격, 브랜드를 정확히 아는 맞춤형 AI를 제공받습니다 — 음성과 채팅으로 배포되어 단 하나의 리드도 놓치지 않습니다.",
      cards: [
        {
          title: "리셉셔니스트",
          description: "24/7 AI 프론트 데스크. 귀사의 비즈니스에 학습된 맞춤 음성으로 모든 전화에 응답 — 예약, FAQ 처리, 대기 시간 제로.",
          features: [
            "브랜드에 맞춘 커스텀 음성",
            "서비스, 가격, FAQ 기반 학습",
            "캘린더에 직접 예약",
            "필요 시 실시간 직원 연결"
          ]
        },
        {
          title: "세일즈 디렉터",
          description: "모든 리드를 팔로업하고, 잠재 고객을 자격 심사하며, 예약을 성사시키는 AI 세일즈 에이전트 — 팀은 구매 준비가 된 고객만 상대합니다.",
          features: [
            "모든 리드에 대한 아웃바운드 팔로업",
            "의도 및 예산별 잠재 고객 자격 심사",
            "학습된 응대로 이의 처리",
            "전환 추적 및 감정 분석"
          ]
        },
        {
          title: "휴먼 챗봇",
          description: "사람처럼 느껴지는 웹사이트 채팅 어시스턴트. 귀사의 전체 지식 기반으로 학습되어 질문 답변, 리드 확보, 24/7 예약을 처리합니다.",
          features: [
            "문서, FAQ, 서비스 메뉴 기반 학습",
            "자연스럽고 사람 같은 대화 흐름",
            "리드 정보 확보 및 예약 접수",
            "다국어 지원 — 20개 이상 언어"
          ]
        }
      ]
    },
    roi: {
        title: "놓친 기회의 비용",
        subtitle: "부재중 전화, 음성 사서함 이탈, 늦은 후속 조치로 인해 손실된 수익을 계산해 보세요.",
        missedCalls: "주당 부재중 전화",
        dealValue: "평균 환자/고객 가치",
        yearlyLossLabel: "예상 연간 매출 손실",
        disclaimer1: "표준 52주 운영 연도를 기준으로 계산되었습니다.",
        disclaimer2: "JuniVo는 이 손실된 수익을 100% 회복하도록 설계되었습니다."
    },
    tech: {
        title: "엔터프라이즈급 보안 및 지능",
        multilingualTitle: "다국어 유창성",
        multilingualDesc: "대화 중 영어, 스페인어, 프랑스어 및 기타 20개 이상의 언어를 즉시 감지하고 전환합니다.",
        humanLoopTitle: "휴먼 인 더 루프 (HITL) 에스컬레이션",
        humanLoopDesc: "실시간 감정 모니터링을 통해 민감하거나 복잡한 통화를 식별하여 즉시 상담원 개입을 요청합니다.",
        integrationTitle: "원활한 통합",
        integrationDesc: "주요 EMR, Salesforce, HubSpot 및 업무 관리 소프트웨어와의 안전한 양방향 동기화.",
        transcriptTitle: "보안 스크립트 로그",
        activeStatus: "암호화 및 활성화됨",
        aiLabel: "AI",
        userLabel: "환자",
        aiText1: "서밋 치과에 전화해 주셔서 감사합니다. 새로운 스케일링 예약을 하시겠습니까, 아니면 기존 예약을 변경하시겠습니까?",
        userText1: "스케일링 예약을 하고 싶은데, 델타 덴탈 보험 되나요?",
        aiText2: "네, 델타 덴탈 보험을 적용해 드립니다. 이번 주 목요일 오후 2시에 시간이 비어 있습니다. 예약해 드릴까요?",
        tagBooking: "의도: 일정 예약",
        tagInsurance: "확인: 보험"
    },
    cta: {
        title: "비즈니스를 한 단계 격상시킬 준비가 되셨나요?",
        subtitle: "예약률을 크게 높이면서 주당 20시간 이상의 관리 시간을 절약하고 있는 업계 리더들과 함께하세요.",
        btnStrategy: "상담 예약하기"
    },
    legal: {
      lastUpdated: "최종 업데이트: 2026년 2월",
      privacy: {
        title: "개인정보 처리방침",
        s1Title: "1. 수집하는 정보",
        s1Body: "회원가입, 데모 요청 또는 문의 시 귀하가 직접 제공하는 이름, 이메일, 전화번호, 사업 관련 정보 등을 수집합니다. 또한 귀사를 대신하여 AI 에이전트를 사용하는 과정에서 생성되는 통화 녹음, 전사(대화 기록), 분석 데이터도 수집합니다.",
        s2Title: "2. 정보의 이용 목적",
        s2Body: "수집한 정보는 서비스 제공 및 개선, 결제 처리, 커뮤니케이션, AI 기반 통화 분석 제공을 위해 사용됩니다. 통화 데이터는 대시보드에서 전사, 감정 분석, 대화 요약을 제공하기 위해 처리됩니다.",
        s3Title: "3. 데이터 저장 및 보안",
        s3Body: "모든 데이터는 전송 중(TLS 1.2+) 및 저장 시(AES-256) 암호화됩니다. 통화 녹음과 전사는 접근이 통제된 안전한 인프라에 저장됩니다. 정기 감사, 역할 기반 접근 제어, 침입 탐지 등 업계 표준 보안 관행을 적용합니다.",
        s4Title: "4. HIPAA 준수",
        s4Body: "헬스케어 및 메디스파 고객의 경우, JuniVo는 HIPAA 준수 비즈니스 어소시에이트(BA)로 운영됩니다. 비즈니스 어소시에이트 계약(BAA)을 체결하고 HIPAA 규정에서 요구하는 관리적·물리적·기술적 보호조치를 유지합니다.",
        s5Title: "5. 데이터 공유",
        s5Body: "당사는 귀하의 데이터를 판매하지 않습니다. 플랫폼 제공에 필요한 서비스 제공업체(클라우드 호스팅, 통신 사업자 등)와는 엄격한 데이터 처리 계약 하에 필요한 범위에서만 정보를 공유합니다. 법령상 요구되거나 법적 권리 보호를 위해 필요한 경우 데이터를 공개할 수 있습니다.",
        s6Title: "6. 데이터 보관",
        s6Body: "통화 녹음 및 전사는 구독 기간 동안 및 종료 후 30일 동안 보관됩니다. 귀하는 언제든지 당사에 연락하여 데이터 삭제를 요청할 수 있습니다. 계정 종료 시 모든 데이터는 90일 이내에 영구 삭제됩니다.",
        s7Title: "7. 귀하의 권리",
        s7Body: "귀하는 개인정보에 대한 열람, 정정 또는 삭제를 요청할 권리가 있습니다. GDPR 적용 대상자의 경우 데이터 이동권 및 처리 제한 등 추가 권리를 행사할 수 있습니다. 권리 행사를 위해 privacy@junivoai.com 으로 연락해 주세요.",
        s8Title: "8. 문의",
        s8BodyPrefix: "개인정보 관련 문의는 다음으로 연락해 주세요:",
        s8Email: "privacy@junivoai.com"
      },
      terms: {
        title: "이용 약관",
        s1Title: "1. 약관의 동의",
        s1Body: "JuniVo Ai 서비스를 이용하거나 접근함으로써 귀하는 본 이용 약관에 동의하고 이에 구속됩니다. 동의하지 않는 경우 플랫폼을 이용할 수 없습니다. 본 약관은 기업 및 그 권한 있는 대표자를 포함한 모든 사용자에게 적용됩니다.",
        s2Title: "2. 서비스의 내용",
        s2Body: "JuniVo Ai는 비즈니스 사용을 위해 설계된 AI 기반 음성 에이전트, 채팅 에이전트 및 대화 분석 도구를 제공합니다. 당사 플랫폼은 구독 기업을 대신하여 수신/발신 통화, 웹사이트 채팅, 일정 예약, 리드 자격 심사 및 통화 분석을 수행합니다.",
        s3Title: "3. 계정 책임",
        s3Body: "귀하는 계정 자격 증명의 보안을 유지하고 귀하의 계정에서 발생하는 모든 활동에 대해 책임을 집니다. 정확한 사업 및 연락처 정보를 제공하고 필요 시 업데이트하는 데 동의합니다. 서비스 이용을 위해서는 만 18세 이상이어야 합니다.",
        s4Title: "4. 허용되는 사용",
        s4Body: "불법 목적, 개인에 대한 괴롭힘 또는 기만, TCPA 또는 이에 준하는 규정을 위반하는 무단 로보콜, 관련 개인정보 보호법을 위반하는 데이터 처리 등에는 JuniVo를 사용할 수 없습니다. 당사는 본 약관을 위반하는 계정을 정지할 권리를 보유합니다.",
        s5Title: "5. 결제 및 구독",
        s5Body: "구독은 월 단위로 청구됩니다. 귀하는 등록된 결제 수단으로 모든 해당 요금을 청구하는 것에 동의합니다. 구독은 다음 결제 주기 이전에 취소하지 않는 한 자동 갱신됩니다. 환불은 당사의 재량에 따라 개별 사안별로 처리됩니다.",
        s6Title: "6. 지식재산권",
        s6Body: "플랫폼 기술, AI 모델, 브랜드, 콘텐츠 등은 JuniVo Ai의 재산입니다. 귀하는 귀사의 비즈니스 데이터, 통화 녹음 및 전사에 대한 소유권을 유지합니다. 귀하는 당사가 서비스 제공 및 개선을 위해서만 해당 데이터를 처리할 수 있도록 제한적 라이선스를 부여합니다.",
        s7Title: "7. 책임의 제한",
        s7Body: "JuniVo Ai는 \"있는 그대로\" 제공됩니다. 서비스 중단으로 인한 매출 손실, 부재중 통화, AI 에이전트 오류 등을 포함하여 플랫폼 사용으로 발생하는 간접적·부수적·결과적 손해에 대해 당사는 책임을 지지 않습니다. 당사의 총 책임은 청구 발생 전 12개월 동안 귀하가 지불한 수수료를 초과하지 않습니다.",
        s8Title: "8. 해지",
        s8Body: "어느 당사자든 언제든지 해지할 수 있습니다. 해지 시 플랫폼 접근 권한은 종료되며, 법령상 보관 의무가 없는 한 데이터는 90일 이내에 삭제됩니다. 당사는 본 약관을 위반하는 계정을 즉시 해지할 수 있습니다.",
        s9Title: "9. 준거법",
        s9Body: "본 약관은 미국 캘리포니아주 법률의 적용을 받습니다. 모든 분쟁은 캘리포니아주 로스앤젤레스 카운티에서 구속력 있는 중재를 통해 해결됩니다.",
        s10Title: "10. 문의",
        s10BodyPrefix: "본 약관에 대한 문의는 다음으로 연락해 주세요:",
        s10Email: "legal@junivoai.com"
      }
    },
    footer: {
        desc: "하이엔드 서비스 비즈니스를 위한 최고의 자율 프론트 오피스. 우아하게 리드를 포착, 자격 심사, 마감하세요.",
        product: "플랫폼",
        legal: "법적 고지",
        links: {
            receptionist: "AI 리셉셔니스트",
            sales: "세일즈 디렉터",
            chat: "휴먼 챗봇",
            analytics: "대화 인텔리전스",
            privacy: "개인정보 처리방침",
            terms: "이용 약관"
        },
        rights: "© 2026 JuniVo Ai. All rights reserved.",
        compliance: ["HIPAA 준수", "GDPR 준수"]
    }
  }
};

// --- Reusable Components ---

const Navbar = ({ lang, setLang, t, currentPage, setCurrentPage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [platformOpen, setPlatformOpen] = useState(false);
  const [mobilePlatformOpen, setMobilePlatformOpen] = useState(false);

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

  const platformPages = ['receptionist', 'sales-agent', 'chatbot'];
  const isPlatformActive = platformPages.includes(currentPage);

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
          {/* Our Platform Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setPlatformOpen(true)}
            onMouseLeave={() => setPlatformOpen(false)}
          >
            <button className={`flex items-center gap-1 cursor-pointer transition-colors font-medium text-sm ${isPlatformActive ? 'text-slate-900 font-semibold' : 'text-slate-500 hover:text-slate-900'}`}>
              {t.nav.platform}
              <svg className={`w-3.5 h-3.5 transition-transform ${platformOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
            {platformOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-56">
                <div className="bg-white border border-slate-200 rounded-xl shadow-xl p-2 space-y-1">
                  <button onClick={() => { setCurrentPage('receptionist'); setPlatformOpen(false); }} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-600 hover:bg-blue-50 hover:text-blue-700 transition-colors text-left">
                    <Phone size={16} /> {t.nav.receptionist}
                  </button>
                  <button onClick={() => { setCurrentPage('sales-agent'); setPlatformOpen(false); }} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-600 hover:bg-teal-50 hover:text-teal-700 transition-colors text-left">
                    <Zap size={16} /> {t.nav.salesAgent}
                  </button>
                  <button onClick={() => { setCurrentPage('chatbot'); setPlatformOpen(false); }} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-600 hover:bg-indigo-50 hover:text-indigo-700 transition-colors text-left">
                    <MessageSquare size={16} /> {t.nav.chatbot}
                  </button>
                </div>
              </div>
            )}
          </div>
          <button onClick={() => setCurrentPage('solutions')} className={navLinkClass('solutions')}>{t.nav.solutions}</button>
          <button onClick={() => setCurrentPage('product')} className={navLinkClass('product')}>{t.nav.product}</button>
        </div>

        <div className="hidden md:flex items-center gap-5">
           <button 
            onClick={toggleLang}
            className="flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors px-2 py-1 rounded-md border border-slate-200 bg-white"
           >
             <Globe className="w-3 h-3" />
             {lang === 'en' ? 'KR' : 'EN'}
           </button>

           <a href="https://dashboard.junivoai.com/login" target="_blank" rel="noopener noreferrer" className="text-slate-600 text-sm font-medium hover:text-blue-600 transition-colors">
            {t.nav.login}
          </a>
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
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-200 p-6 flex flex-col gap-3 shadow-xl">
          <button onClick={() => setMobilePlatformOpen(!mobilePlatformOpen)} className="text-slate-900 font-semibold text-left flex items-center justify-between">
            {t.nav.platform}
            <svg className={`w-4 h-4 transition-transform ${mobilePlatformOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </button>
          {mobilePlatformOpen && (
            <div className="pl-4 flex flex-col gap-3 border-l-2 border-blue-100">
              <button onClick={() => { setCurrentPage('receptionist'); setMobileMenuOpen(false); }} className="text-slate-600 hover:text-slate-900 text-left font-medium flex items-center gap-2"><Phone size={14} /> {t.nav.receptionist}</button>
              <button onClick={() => { setCurrentPage('sales-agent'); setMobileMenuOpen(false); }} className="text-slate-600 hover:text-slate-900 text-left font-medium flex items-center gap-2"><Zap size={14} /> {t.nav.salesAgent}</button>
              <button onClick={() => { setCurrentPage('chatbot'); setMobileMenuOpen(false); }} className="text-slate-600 hover:text-slate-900 text-left font-medium flex items-center gap-2"><MessageSquare size={14} /> {t.nav.chatbot}</button>
            </div>
          )}
          <button onClick={() => { setCurrentPage('solutions'); setMobileMenuOpen(false); }} className="text-slate-600 hover:text-slate-900 text-left font-medium">{t.nav.solutions}</button>
          <button onClick={() => { setCurrentPage('product'); setMobileMenuOpen(false); }} className="text-slate-600 hover:text-slate-900 text-left font-medium">{t.nav.product}</button>
          <a href="https://dashboard.junivoai.com/login" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-slate-900 text-left font-medium">{t.nav.login}</a>
          <a href={CALENDAR_URL} target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white w-full py-3 rounded-xl font-medium shadow-md text-center">{t.nav.getStarted}</a>
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

const CALENDAR_URL = 'https://cal.com/junivoai/30min';

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

// --- Product Pages ---

const ReceptionistPage = ({ t }) => (
  <div className="pt-32 pb-20 px-6">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-xs font-bold text-blue-700 mb-6 uppercase tracking-wider">
          <Phone size={12} /> AI Voice Agent
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-slate-900 tracking-tight">The AI Receptionist</h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">Your 24/7 front desk that never calls in sick. Answers every call with a custom voice trained on your med spa — books consultations, handles treatment questions, and never puts a prospect on hold.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-20">
        {[
          { icon: Phone, title: "Every Call Answered", desc: "No more voicemail. No more missed consultations. Your AI receptionist picks up instantly — nights, weekends, and holidays." },
          { icon: Calendar, title: "Books to Your Calendar", desc: "Qualifies callers by treatment interest, checks availability, and books consultations directly to your calendar in real time." },
          { icon: Globe, title: "20+ Languages", desc: "Serves every patient demographic fluently. Detects language automatically and switches mid-conversation without missing a beat." }
        ].map((feature, i) => (
          <div key={i} className="bg-white border border-slate-200 p-10 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 text-blue-600">
              <feature.icon size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-900">{feature.title}</h3>
            <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
          </div>
        ))}
      </div>

      <div className="relative bg-white border border-slate-200 rounded-3xl overflow-hidden p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-blue-50/50 to-transparent pointer-events-none"></div>
        <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-slate-900">Sounds Human. Thinks Like Your Best Employee.</h2>
            <p className="text-slate-600 mb-8 leading-relaxed text-lg">
              Your AI receptionist is trained on your <strong>treatment menu, pricing, pre/post-care instructions, and brand voice</strong>. When a prospect calls asking about Botox pricing or filler packages, the AI responds with the same warmth and knowledge as your top front desk coordinator.
            </p>
            <ul className="space-y-5">
              {["Custom voice that matches your brand personality", "Trained on your exact treatments, pricing & policies", "Handles scheduling, rescheduling & cancellations", "Warm handoff to your team for complex cases", "Every call recorded, transcribed & analyzed by AI"].map((item, i) => (
                <li key={i} className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600"><CheckCircle2 size={18} /></div>
                  <span className="text-slate-700 font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-8 shadow-sm">
            <div className="text-slate-500 mb-6 font-semibold uppercase tracking-wider text-xs">Live Call Preview</div>
            <div className="space-y-4 text-sm">
              <div className="flex gap-3">
                <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold shrink-0">AI</div>
                <div className="bg-white border border-slate-100 p-3 rounded-2xl rounded-tl-sm text-slate-700 shadow-sm">Thank you for calling Glow Aesthetics! Are you looking to book a consultation, or do you have questions about a treatment?</div>
              </div>
              <div className="flex gap-3 flex-row-reverse">
                <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 text-xs font-bold shrink-0">P</div>
                <div className="bg-blue-600 text-white p-3 rounded-2xl rounded-tr-sm">I want to learn more about your lip filler options and pricing.</div>
              </div>
              <div className="flex gap-3">
                <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold shrink-0">AI</div>
                <div className="bg-white border border-slate-100 p-3 rounded-2xl rounded-tl-sm text-slate-700 shadow-sm">Great choice! Our lip filler treatments start at $650 per syringe. I'd love to book you a free consultation with one of our providers — they'll create a personalized treatment plan. I have availability this Thursday at 3 PM. Would that work?</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const SalesAgentPage = ({ t }) => (
  <div className="pt-32 pb-20 px-6">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-xs font-bold text-teal-700 mb-6 uppercase tracking-wider">
          <Zap size={12} /> AI Sales Agent
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-slate-900 tracking-tight">The Sales Director</h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">An AI closer that follows up on every single lead — web inquiries, missed calls, abandoned chats. It handles pricing objections, creates urgency, and converts hesitant prospects into committed consultations.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-20">
        {[
          { icon: Zap, title: "Instant Follow-up", desc: "Contacts every new lead within seconds — not hours. Speed-to-lead is the #1 predictor of med spa conversion rates." },
          { icon: UserCheck, title: "Qualifies Every Lead", desc: "Asks the right questions about treatment interest, budget, and timeline. Your team only talks to prospects ready to commit." },
          { icon: BarChart3, title: "Conversion Intelligence", desc: "Tracks every lead from first touch to booked consultation. Know your cost-per-consult, conversion rate, and top objections." }
        ].map((feature, i) => (
          <div key={i} className="bg-white border border-slate-200 p-10 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-teal-50 rounded-2xl flex items-center justify-center mb-6 text-teal-600">
              <feature.icon size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-900">{feature.title}</h3>
            <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
          </div>
        ))}
      </div>

      <div className="relative bg-white border border-slate-200 rounded-3xl overflow-hidden p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-teal-50/50 to-transparent pointer-events-none"></div>
        <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-slate-900">Turns "I'll Think About It" Into "Book Me In."</h2>
            <p className="text-slate-600 mb-8 leading-relaxed text-lg">
              Most med spas lose 60% of leads to slow follow-up. Your AI Sales Director <strong>contacts every lead instantly</strong>, handles the most common objections (pricing, timing, fear), and creates urgency around limited availability to drive consultation bookings.
            </p>
            <ul className="space-y-5">
              {["Follows up on every web form, missed call & chat lead", "Overcomes pricing objections with trained scripts", "Creates urgency around limited consultation slots", "Re-engages no-shows and cancelled appointments", "Sentiment analysis flags high-intent leads for your team"].map((item, i) => (
                <li key={i} className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600"><CheckCircle2 size={18} /></div>
                  <span className="text-slate-700 font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-8 shadow-sm">
            <div className="text-slate-500 mb-6 font-semibold uppercase tracking-wider text-xs">Lead Follow-up Preview</div>
            <div className="space-y-4 text-sm">
              <div className="flex gap-3">
                <div className="w-7 h-7 rounded-full bg-teal-600 flex items-center justify-center text-white text-xs font-bold shrink-0">AI</div>
                <div className="bg-white border border-slate-100 p-3 rounded-2xl rounded-tl-sm text-slate-700 shadow-sm">Hi Sarah! I noticed you were looking at our Botox packages on our website. I'd love to help answer any questions and get you booked for a free consultation. Do you have a few minutes?</div>
              </div>
              <div className="flex gap-3 flex-row-reverse">
                <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 text-xs font-bold shrink-0">S</div>
                <div className="bg-teal-600 text-white p-3 rounded-2xl rounded-tr-sm">I'm interested but the pricing seems high compared to other places.</div>
              </div>
              <div className="flex gap-3">
                <div className="w-7 h-7 rounded-full bg-teal-600 flex items-center justify-center text-white text-xs font-bold shrink-0">AI</div>
                <div className="bg-white border border-slate-100 p-3 rounded-2xl rounded-tl-sm text-slate-700 shadow-sm">I completely understand — that's a great question. Our pricing reflects the expertise of our board-certified providers and premium products. Many patients actually save money long-term with our approach. We have a special this month — would you like me to reserve a consultation spot this week? Availability is limited.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ChatbotPage = ({ t }) => (
  <div className="pt-32 pb-20 px-6">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-bold text-indigo-700 mb-6 uppercase tracking-wider">
          <MessageSquare size={12} /> AI Chat Assistant
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-slate-900 tracking-tight">The Human Chatbot</h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">A website chat assistant so natural, visitors think they're talking to your staff. Trained on your entire knowledge base — treatments, pricing, before/afters — it answers questions and books consultations 24/7.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-20">
        {[
          { icon: MessageSquare, title: "Feels Human, Not Robotic", desc: "Natural conversation flow trained on real med spa interactions. No canned responses, no dead ends — just helpful, warm dialogue." },
          { icon: Calendar, title: "Books Consultations 24/7", desc: "Captures lead information and books consultations directly from your website — even at 2 AM when your competitor's chat is offline." },
          { icon: Cpu, title: "Trained on Your Knowledge", desc: "Upload your treatment menu, FAQs, pricing, and brand guidelines. The chatbot becomes an extension of your front desk team." }
        ].map((feature, i) => (
          <div key={i} className="bg-white border border-slate-200 p-10 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 text-indigo-600">
              <feature.icon size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-900">{feature.title}</h3>
            <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
          </div>
        ))}
      </div>

      <div className="relative bg-white border border-slate-200 rounded-3xl overflow-hidden p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-indigo-50/50 to-transparent pointer-events-none"></div>
        <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-slate-900">Your Website's Best Conversion Tool.</h2>
            <p className="text-slate-600 mb-8 leading-relaxed text-lg">
              <strong>68% of med spa website visitors leave without taking action.</strong> The Human Chatbot engages visitors the moment they land, answers their treatment questions with expert knowledge, and guides them to a booked consultation — all while feeling like a real conversation with your staff.
            </p>
            <ul className="space-y-5">
              {["Engages visitors proactively based on page behavior", "Answers treatment questions with trained expertise", "Captures name, email, phone & treatment interest", "Books consultations directly to your calendar", "Syncs all context with your voice & sales agents"].map((item, i) => (
                <li key={i} className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600"><CheckCircle2 size={18} /></div>
                  <span className="text-slate-700 font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-8 shadow-sm">
            <div className="text-slate-500 mb-6 font-semibold uppercase tracking-wider text-xs">Website Chat Preview</div>
            <div className="space-y-4 text-sm">
              <div className="flex gap-3">
                <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-bold shrink-0">AI</div>
                <div className="bg-white border border-slate-100 p-3 rounded-2xl rounded-tl-sm text-slate-700 shadow-sm">Hi there! I see you're looking at our laser treatments. Would you like to know more about pricing, or are you ready to book a free consultation?</div>
              </div>
              <div className="flex gap-3 flex-row-reverse">
                <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 text-xs font-bold shrink-0">V</div>
                <div className="bg-indigo-600 text-white p-3 rounded-2xl rounded-tr-sm">What's the difference between IPL and fractional laser? And how much downtime?</div>
              </div>
              <div className="flex gap-3">
                <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-bold shrink-0">AI</div>
                <div className="bg-white border border-slate-100 p-3 rounded-2xl rounded-tl-sm text-slate-700 shadow-sm">Great question! IPL targets pigmentation and redness with minimal downtime (1-2 days), while fractional laser goes deeper for texture and scarring with 3-5 days of recovery. Both get amazing results — a consultation with our provider will help determine which is best for your goals. Want me to book one for you?</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

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

    const colorMap = {
        blue: { bg: 'bg-blue-50', border: 'border-blue-100', text: 'text-blue-700', accent: 'bg-blue-600', light: 'bg-blue-100', dot: 'bg-blue-500', statBg: 'bg-blue-600' },
        purple: { bg: 'bg-purple-50', border: 'border-purple-100', text: 'text-purple-700', accent: 'bg-purple-600', light: 'bg-purple-100', dot: 'bg-purple-500', statBg: 'bg-purple-600' },
        amber: { bg: 'bg-amber-50', border: 'border-amber-100', text: 'text-amber-700', accent: 'bg-amber-600', light: 'bg-amber-100', dot: 'bg-amber-500', statBg: 'bg-amber-600' },
        emerald: { bg: 'bg-emerald-50', border: 'border-emerald-100', text: 'text-emerald-700', accent: 'bg-emerald-600', light: 'bg-emerald-100', dot: 'bg-emerald-500', statBg: 'bg-emerald-600' },
    };

    const content = t.solutions.content[activeTab];
    const colors = colorMap[content.color] || colorMap.blue;
    const ActiveIcon = Object.values(tabs).find(t => t.key === activeTab) ? Object.entries(tabs).find(([,v]) => v.key === activeTab)?.[1]?.icon : Stethoscope;

    return (
        <div className="pt-32 pb-20 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-slate-900 tracking-tight">{t.solutions.title}</h1>
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">{t.solutions.subtitle}</p>
                </div>

                {/* Industry Tabs */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {Object.entries(tabs).map(([label, config]) => {
                         const Icon = config.icon;
                         const tabColor = colorMap[t.solutions.content[config.key]?.color] || colorMap.blue;
                         return (
                            <button
                                key={label}
                                onClick={() => setActiveTab(config.key)}
                                className={`flex items-center gap-2.5 px-6 py-4 rounded-2xl text-sm font-semibold transition-all border ${
                                    activeTab === config.key 
                                    ? `${tabColor.accent} text-white border-transparent shadow-lg` 
                                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900 hover:shadow-md'
                                }`}
                            >
                                <Icon size={20} />
                                {t.solutions.tabs[Object.keys(tabs).indexOf(label)]}
                            </button>
                        );
                    })}
                </div>

                {/* Stat + Pain Point Hero */}
                <div className={`${colors.bg} ${colors.border} border rounded-3xl p-8 md:p-12 mb-8`}>
                    <div className="grid md:grid-cols-2 gap-10 items-center">
                        <div>
                            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${colors.bg} ${colors.border} border text-xs font-bold ${colors.text} mb-4 uppercase tracking-wider`}>
                                <span className={`w-2 h-2 rounded-full ${colors.dot}`}></span>
                                Industry Insight
                            </div>
                            <p className="text-slate-800 text-lg md:text-xl leading-relaxed font-medium">
                                {content.painPoint}
                            </p>
                        </div>
                        <div className="flex justify-center">
                            <div className="text-center">
                                <div className={`text-7xl md:text-8xl font-black ${colors.text} tracking-tight`}>{content.stat}*</div>
                                <p className="text-slate-600 font-medium mt-2 text-sm max-w-xs mx-auto">{content.statLabel}</p>
                                {content.source && (
                                    <p className="text-slate-400 text-xs mt-3 italic">* {content.source}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Title + Description + Capabilities */}
                <div className="bg-white border border-slate-200 rounded-3xl p-8 md:p-12 shadow-sm mb-8">
                    <div className="flex items-start gap-5 mb-10">
                        <div className={`w-16 h-16 rounded-2xl ${colors.light} ${colors.text} flex items-center justify-center shrink-0`}>
                            <ActiveIcon size={32} />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900 mb-2">{content.title}</h2>
                            <p className="text-lg text-slate-600 leading-relaxed">{content.desc}</p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        {content.points.map((point, i) => (
                            <div key={i} className="flex items-start gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-sm transition-shadow">
                                <div className={`w-8 h-8 rounded-full ${colors.light} ${colors.text} flex items-center justify-center shrink-0 mt-0.5`}>
                                    <CheckCircle2 size={16} />
                                </div>
                                <span className="text-slate-700 font-medium">{point}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sample Conversation */}
                {content.conversation && (
                    <div className="bg-white border border-slate-200 rounded-3xl p-8 md:p-12 shadow-sm">
                        <div className="mb-8">
                            <div className="flex items-center gap-2 mb-2">
                                <span className={`w-2 h-2 rounded-full ${colors.dot} animate-pulse`}></span>
                                <span className={`text-xs font-bold ${colors.text} uppercase tracking-widest`}>Sample Conversation</span>
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900">See how JuniVo handles a real call</h3>
                        </div>
                        <div className="max-w-2xl space-y-5">
                            <div className="flex gap-4">
                                <div className={`w-9 h-9 rounded-full ${colors.accent} flex items-center justify-center text-white text-xs font-bold shrink-0`}>AI</div>
                                <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl rounded-tl-sm text-[15px] text-slate-700 leading-relaxed">{content.conversation.ai1}</div>
                            </div>
                            <div className="flex gap-4 flex-row-reverse">
                                <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 text-xs font-bold shrink-0">C</div>
                                <div className={`${colors.accent} text-white p-4 rounded-2xl rounded-tr-sm text-[15px] leading-relaxed`}>{content.conversation.user}</div>
                            </div>
                            <div className="flex gap-4">
                                <div className={`w-9 h-9 rounded-full ${colors.accent} flex items-center justify-center text-white text-xs font-bold shrink-0`}>AI</div>
                                <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl rounded-tl-sm text-[15px] text-slate-700 leading-relaxed">{content.conversation.ai2}</div>
                            </div>
                        </div>
                    </div>
                )}
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
                                {t.pricing.mostPopular}
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
                            {t.pricing.chooseCta.replace('{plan}', tier.name)}
                        </button>
                    </div>
                ))}
            </div>
            
            <div className="mt-20 text-center bg-slate-50 rounded-3xl p-10 border border-slate-200 max-w-4xl mx-auto">
                <div className="w-16 h-16 bg-white border border-slate-200 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-600 shadow-sm">
                    <Building size={24} />
                </div>
                <h4 className="text-2xl font-bold mb-4 text-slate-900">{t.pricing.enterpriseTitle}</h4>
                <p className="text-slate-600 mb-8 text-lg">{t.pricing.enterpriseDesc}</p>
                <button className="text-blue-600 font-bold hover:text-blue-800 flex items-center gap-2 mx-auto bg-blue-50 px-6 py-3 rounded-full transition-colors">
                    {t.pricing.enterpriseCta} <ArrowRight size={18} />
                </button>
            </div>
        </div>
    </div>
);

const PrivacyPage = ({ t }) => (
  <div className="pt-32 pb-20 px-6">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-extrabold mb-4 text-slate-900">{t.legal.privacy.title}</h1>
      <p className="text-slate-500 mb-10 text-sm">{t.legal.lastUpdated}</p>
      <div className="prose prose-slate max-w-none space-y-8 text-slate-700 leading-relaxed">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">{t.legal.privacy.s1Title}</h2>
          <p>{t.legal.privacy.s1Body}</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">{t.legal.privacy.s2Title}</h2>
          <p>{t.legal.privacy.s2Body}</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">{t.legal.privacy.s3Title}</h2>
          <p>{t.legal.privacy.s3Body}</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">{t.legal.privacy.s4Title}</h2>
          <p>{t.legal.privacy.s4Body}</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">{t.legal.privacy.s5Title}</h2>
          <p>{t.legal.privacy.s5Body}</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">{t.legal.privacy.s6Title}</h2>
          <p>{t.legal.privacy.s6Body}</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">{t.legal.privacy.s7Title}</h2>
          <p>{t.legal.privacy.s7Body}</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">{t.legal.privacy.s8Title}</h2>
          <p>
            {t.legal.privacy.s8BodyPrefix}{' '}
            <a href={`mailto:${t.legal.privacy.s8Email}`} className="text-blue-600 hover:underline">
              {t.legal.privacy.s8Email}
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  </div>
);

const TermsPage = ({ t }) => (
  <div className="pt-32 pb-20 px-6">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-extrabold mb-4 text-slate-900">{t.legal.terms.title}</h1>
      <p className="text-slate-500 mb-10 text-sm">{t.legal.lastUpdated}</p>
      <div className="prose prose-slate max-w-none space-y-8 text-slate-700 leading-relaxed">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">{t.legal.terms.s1Title}</h2>
          <p>{t.legal.terms.s1Body}</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">{t.legal.terms.s2Title}</h2>
          <p>{t.legal.terms.s2Body}</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">{t.legal.terms.s3Title}</h2>
          <p>{t.legal.terms.s3Body}</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">{t.legal.terms.s4Title}</h2>
          <p>{t.legal.terms.s4Body}</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">{t.legal.terms.s5Title}</h2>
          <p>{t.legal.terms.s5Body}</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">{t.legal.terms.s6Title}</h2>
          <p>{t.legal.terms.s6Body}</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">{t.legal.terms.s7Title}</h2>
          <p>{t.legal.terms.s7Body}</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">{t.legal.terms.s8Title}</h2>
          <p>{t.legal.terms.s8Body}</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">{t.legal.terms.s9Title}</h2>
          <p>{t.legal.terms.s9Body}</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">{t.legal.terms.s10Title}</h2>
          <p>
            {t.legal.terms.s10BodyPrefix}{' '}
            <a href={`mailto:${t.legal.terms.s10Email}`} className="text-blue-600 hover:underline">
              {t.legal.terms.s10Email}
            </a>
            .
          </p>
        </section>
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

const PAGE_ROUTES = {
  home: '/',
  product: '/product',
  receptionist: '/receptionist',
  'sales-agent': '/sales-agent',
  chatbot: '/chatbot',
  solutions: '/solutions',
  pricing: '/pricing',
  privacy: '/privacy',
  terms: '/terms',
};

const getPageFromPath = (path) => {
  const entry = Object.entries(PAGE_ROUTES).find(([, route]) => route === path);
  return entry ? entry[0] : 'home';
};

const App = () => {
  const [lang, setLang] = useState('en');
  const [currentPage, setCurrentPage] = useState(() => getPageFromPath(window.location.pathname));
  const t = translations[lang];

  const setPage = useCallback((page) => {
    setCurrentPage(page);
    const path = PAGE_ROUTES[page] || '/';
    window.history.pushState({ page }, '', path);
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handlePopState = (e) => {
      const page = e.state?.page || getPageFromPath(window.location.pathname);
      setCurrentPage(page);
      window.scrollTo(0, 0);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Component to render based on current page state
  const renderPage = () => {
      switch(currentPage) {
          case 'product': return <ProductPage t={t} />;
          case 'receptionist': return <ReceptionistPage t={t} />;
          case 'sales-agent': return <SalesAgentPage t={t} />;
          case 'chatbot': return <ChatbotPage t={t} />;
          case 'solutions': return <SolutionsPage t={t} />;
          case 'pricing': return <PricingPage t={t} />;
          case 'privacy': return <PrivacyPage t={t} />;
          case 'terms': return <TermsPage t={t} />;
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
                    <div className="flex justify-center relative z-10">
                      <a href={CALENDAR_URL} target="_blank" rel="noopener noreferrer" className="bg-white text-slate-900 px-10 py-4 rounded-full font-bold hover:bg-slate-50 transition-all shadow-lg transform hover:-translate-y-1 text-center">
                        {t.cta.btnStrategy}
                      </a>
                    </div>
                  </div>
                </section>
            </>
          );
      }
  };

  return (
    <div className={`min-h-screen bg-slate-50 font-sans overflow-x-hidden ${lang === 'ko' ? 'font-sans-kr' : ''}`}>
      <Navbar lang={lang} setLang={setLang} t={t} currentPage={currentPage} setCurrentPage={setPage} />

      {/* Render Active Page Content */}
      <main className="bg-white">
        {renderPage()}
      </main>

      {/* FOOTER */}
      <footer className="py-16 px-6 bg-slate-950 border-t border-slate-900">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6 cursor-pointer" onClick={() => setPage('home')}>
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
              <li><button onClick={() => setPage('receptionist')} className="hover:text-blue-400 transition-colors">{t.footer.links.receptionist}</button></li>
              <li><button onClick={() => setPage('sales-agent')} className="hover:text-blue-400 transition-colors">{t.footer.links.sales}</button></li>
              <li><button onClick={() => setPage('chatbot')} className="hover:text-blue-400 transition-colors">{t.footer.links.chat}</button></li>
              <li><button onClick={() => setPage('product')} className="hover:text-blue-400 transition-colors">{t.footer.links.analytics}</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">{t.footer.legal}</h4>
            <ul className="space-y-3 text-sm text-slate-400 font-medium">
              <li><button onClick={() => setPage('privacy')} className="hover:text-blue-400 transition-colors">{t.footer.links.privacy}</button></li>
              <li><button onClick={() => setPage('terms')} className="hover:text-blue-400 transition-colors">{t.footer.links.terms}</button></li>
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