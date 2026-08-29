# ⚖️ NyayaPath AI

### AI-Powered Civic Rights & Action Navigator

> **From “I have a problem” → to “I know my next step.”**

NyayaPath AI is an AI-powered civic and legal guidance platform designed to help citizens understand everyday civic/legal problems in simple, accessible language.

Instead of searching through complex legal information and multiple government portals, users can describe their problem in natural language and receive a structured understanding, actionable roadmap, relevant authorities, supporting sources, and document-generation assistance.

---

## 🚀 Live Prototype

🌐 **[Visit NyayaPath AI](https://nyayapath-ai.vercel.app/)**

## 📂 GitHub Repository

🔗 **[NyayaPath AI – GitHub](https://github.com/tanug0/NyayaPath-AI)**

## 📌 Project Status

NyayaPath AI is an evolving prototype focused on making civic and legal information more understandable, actionable, and jurisdiction-aware.

The current implementation demonstrates AI-assisted problem analysis, action roadmaps, authority guidance, verified-source discovery, fallback support, and document assistance.

The architecture is designed to support additional problem categories, jurisdictions, authorities, sources, and document workflows over time.


---

# 🚨 Problem 

For many citizens, accessing legal and civic information is difficult because:

- Legal language is often complex and difficult to understand.
- People may not know which authority, department, forum, or channel to approach.
- Relevant information is distributed across multiple government and legal sources.
- Citizens may not know what documents or evidence they should prepare.
- Finding information does not always explain the practical next step.
- Procedures and authorities may vary depending on the jurisdiction.
- Language barriers can make formal legal information less accessible.

This creates a major gap between:

> **Understanding a problem**  
> and  
> **Knowing the appropriate next action.**

NyayaPath AI aims to reduce this gap through a structured, action-oriented guidance workflow.

---

# 💡 Solution

NyayaPath AI converts a citizen's problem into a structured and actionable guidance path.

### User Journey

**Describe Problem → AI Analysis → Category Detection → Jurisdiction Context → Problem Explanation → Action Roadmap → Authority Identification → Supporting Sources → Document Assistance**

The platform is designed to make civic and legal guidance:

- 🧠 Simple
- 🗺️ Action-oriented
- 🏛️ Authority-aware
- 📚 Source-supported
- 🌐 Multilingual
- 📍 Context-aware
- 🛡️ Resilient through fallback support

---

# 🎯 Why NyayaPath AI?

Many existing platforms provide individual pieces of the solution — such as legal information, grievance portals, government links, or document templates.

NyayaPath AI focuses on connecting these pieces into a single guided workflow.

### Information → Understanding → Action

The platform does not simply tell citizens what a problem is.

It helps them understand:

**What happened → What matters → What evidence to collect → What to do next → Where to go → What document to prepare**

---

# ✨ Key Features

## 🧠 AI-Powered Problem Analysis

Users can describe their legal or civic issue in natural language.

The system analyzes the problem and generates a structured response including the relevant category, summary, and recommended actions.

---

## 🗺️ Action Roadmap

NyayaPath AI goes beyond simply explaining a legal issue.

It provides a structured, step-by-step roadmap so users can understand:

- What to do first
- What evidence/documents may be useful
- Which authority to approach
- What action can be taken next

The current prototype provides a structured, step-by-step action roadmap for supported problem categories.

---

## 🏛️ Authority Finder

Helps users identify the relevant government authority, department, forum, or organization associated with their issue.

This reduces the uncertainty of:

> **“Where should I complain?”**

The prototype uses jurisdiction/context fields such as State/UT and City/District to support jurisdiction-aware guidance.

The authority-matching architecture is designed to support configurable mappings across different jurisdictions rather than assuming a single state or city.

---

## 📚 Verified Sources Directory

The platform provides available verified or official sources related to the generated guidance.

The prototype demonstrates source support through resources such as:

- Government portals
- Official judiciary resources
- National and State grievance platforms
- Legal-aid resources
- Consumer grievance resources
- RTI resources
- Applicable legal and regulatory frameworks
- Other verified public sources

This allows users to explore the underlying information instead of relying only on an AI-generated response.

---

## 📄 Document Generation

NyayaPath AI can generate structured formal documents based on the user's problem.

The current prototype demonstrates document assistance for supported civic and legal scenarios, including examples such as:

- Tenant-related communication
- Consumer grievance notices
- RTI applications

**Document templates and supported scenarios can be expanded as the platform evolves.**

Users can:

- Edit the document
- Copy the content
- Download the document
- Print the document

The generated content is intended as a starting point and should be reviewed before submission.

---

## 🌐 Multilingual Interaction

The platform is designed to support interaction in:

- English
- Hindi
- Hinglish

This improves accessibility for users who may not be comfortable with formal legal English.

---

## 📍 Jurisdiction-Aware Guidance

Users can provide:

- State / Union Territory
- City / District

This allows the system to consider the selected jurisdiction while generating relevant guidance and identifying potentially appropriate authorities.

---

## 🛡️ Fallback Mechanism

NyayaPath AI includes a fallback response mechanism.

If the external AI service is unavailable or fails, the application can still provide structured predefined guidance for supported scenarios.

This improves prototype reliability and user experience.

---

## ⚠️ Safety & Legal Disclaimer

The platform clearly communicates that its output is informational guidance and should not be treated as professional legal advice.

Applicable authorities, procedures and legal frameworks may vary based on jurisdiction and the specific facts of the matter.

Users are encouraged to verify important legal information and consult a qualified professional where necessary.

---

# 🔄 Core Workflow

1. **User describes a civic/legal problem**
2. **System captures context such as category, State/UT, City/District and language**
3. **AI analyzes and categorizes the problem**
4. **Relevant information is converted into simple language**
5. **A structured, jurisdiction-aware action roadmap is generated**
6. **Relevant authorities and escalation channels are identified**
7. **Supporting sources are presented**
8. **A formal document can be generated**
9. **User can edit, copy, download or print the document**

This transforms a fragmented information-search process into a guided action journey.

---

# 🏗️ System Architecture

```text
┌──────────────────────────────────────────────┐
│                  USER INPUT                  │
│                                              │
│  Problem + Category + Language               │
│  State / UT + City / District                │
└──────────────────────┬───────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────┐
│              REACT + VITE FRONTEND           │
│                                              │
│  • User Interface                            │
│  • Problem Analysis                          │
│  • Roadmap                                   │
│  • Authority Finder                          │
│  • Verified Sources                          │
│  • Documents                                 │
└──────────────────────┬───────────────────────┘
                       │
              ┌────────┴────────┐
              │                 │
              ▼                 ▼
┌──────────────────────┐  ┌──────────────────────┐
│    EXPRESS BACKEND   │  │  CLIENT-SIDE LOGIC   │
│                      │  │                      │
│    REST APIs         │  │  Dynamic Analysis    │
│    AI Requests       │  │  Jurisdiction Logic │
│    Server Services   │  │  Fallback Guidance  │
└──────────┬───────────┘  └──────────┬───────────┘
           │                         │
           ▼                         │
┌──────────────────────┐             │
│      AI SERVICE      │             │
│                      │             │
│ • Problem Analysis   │             │
│ • Categorization     │             │
│ • Structured Output  │             │
│ • Roadmap Generation │             │
│ • Document Assistance│             │
└──────────┬───────────┘             │
           │                         │
           └────────────┬────────────┘
                        ▼
┌──────────────────────────────────────────────┐
│       JURISDICTION-AWARE PROCESSING          │
│                                              │
│  Problem Category + State/UT + City/District │
│                    ↓                         │
│          Configurable Mappings               │
│                    ↓                         │
│       Relevant Authority / Framework         │
└──────────────────────┬───────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────┐
│            STRUCTURED RESPONSE               │
│                                              │
│  • Problem Category                          │
│  • Problem Summary                           │
│  • Action Roadmap                            │
│  • Relevant Authority / Channel              │
│  • Applicable Framework                      │
│  • Verified / Official Sources               │
│  • Document Assistance                       │
└──────────────────────┬───────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────┐
│                 USER OUTPUT                  │
│                                              │
│  Clear • Actionable • Accessible Guidance    │
│                                              │
│  Understand → Identify → Act → Escalate      │
└──────────────────────────────────────────────┘


# 🧩 Technology Stack

## Frontend

- React.js
- Vite
- Tailwind CSS
- Lucide React

## Backend

- Node.js
- Express.js
- REST APIs
- CORS
- Environment-based configuration

## AI & Intelligence Layer

- Natural-language problem analysis
- Problem categorization
- Structured response generation
- Action-roadmap generation
- Document-generation assistance
- Jurisdiction-aware mappings

## Reliability

- AI-service fallback
- Predefined guidance
- Jurisdiction verification fallback
- Informational-use disclaimer


# 🚀 Future Scope

Potential future enhancements include:

- Expanded India-wide jurisdiction mappings
- More verified government-source integrations
- Real-time source validation
- Additional regional languages
- Voice-based problem input
- Improved accessibility features
- Personalized action tracking
- Secure document storage
- More document templates
- Authority/contact verification
- Advanced escalation workflows
- Mobile application support