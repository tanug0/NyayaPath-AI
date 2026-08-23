# ⚖️ NyayaPath AI

### AI-Powered Civic Rights & Action Navigator

> **From “I have a problem” → to “I know my next step.”**

NyayaPath AI is an AI-powered civic and legal guidance platform designed to help citizens understand everyday civic/legal problems in simple, accessible language.

Instead of searching through complex legal information and multiple government portals, users can describe their problem in natural language and receive a structured understanding, actionable roadmap, relevant authorities, supporting sources, and document-generation assistance.

---

## 🚀 Live Prototype

🌐 **[Visit NyayaPath AI](https://nyayapath-ai.vercel.app/)**

## 🎥 Demo Video

▶️ **[Watch Hackathon Demo](https://youtu.be/yBD66sQQrSs?si=VrP-qkCw_ABQ8Fj_)**

## 📂 GitHub Repository

🔗 **[NyayaPath AI – GitHub](https://github.com/tanug0/NyayaPath-AI)**

---

## 👥 Team

### Team Name: NexaMind

- **Tanu Gupta** — Team Leader
- **Taru Srivastava** — Team Member
- **Tarun Srivastava** — Team Member

---

## 🏆 Hackathon

**OOSC 4.0 Hackathon**

**Problem Statement:** AI for Civic and Legal Empowerment

NyayaPath AI is a functional MVP developed to improve citizens' access to understandable, actionable and source-supported civic and legal guidance.

---

# 🚨 Problem Statement

For many citizens, accessing legal and civic information is difficult because:

- Legal language is complex and difficult to understand.
- People often do not know which authority or department to approach.
- Finding the correct next step may require searching through multiple sources.
- Citizens may not know what documents or evidence they should prepare.
- Relevant legal and civic information is fragmented across different platforms.
- Language barriers make legal information less accessible.

This creates a gap between:

> **“I have a problem” → “I know exactly what to do next.”**

NyayaPath AI aims to bridge this gap.

---

# 💡 Our Solution

NyayaPath AI converts a citizen's problem into a structured and actionable guidance path.

### User Journey

**Describe Problem → AI Analysis → Category Detection → Problem Explanation → Action Roadmap → Authority Identification → Supporting Sources → Document Assistance**

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

The current prototype presents a **5-step pre-litigation action roadmap**.

---

## 🏛️ Authority Finder

Helps users identify the relevant government authority, department, forum, or organization associated with their issue.

This reduces the uncertainty of:

> **“Where should I complain?”**

The prototype also provides jurisdiction/context fields such as state and city.

---

## 📚 Verified Sources Directory

The platform provides supporting civic and legal sources related to the generated guidance.

The prototype includes sources such as:

- National Consumer Helpline
- RTI Online Portal
- National Legal Services Authority
- CPGRAMS
- Model Tenancy Act reference
- e-Daakhil Portal

This allows users to explore the underlying information instead of relying only on an AI-generated response.

---

## 📄 Document Generation

NyayaPath AI can generate structured formal documents based on the user's problem.

The current prototype demonstrates document assistance for scenarios such as:

- Tenant security deposit demand
- Consumer grievance notice
- RTI Section 6(1) application

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

## 📍 Location-Aware Guidance

Users can provide:

- State / Union Territory
- City / District

This allows the system to consider the user's location while generating relevant guidance and identifying appropriate authorities.

---

## 🛡️ Fallback Mechanism

NyayaPath AI includes a fallback response mechanism.

If the external AI service is unavailable or fails, the application can still provide structured predefined guidance for supported scenarios.

This improves prototype reliability and user experience.

---

## ⚠️ Safety & Legal Disclaimer

The platform clearly communicates that its output is informational guidance and should not be treated as professional legal advice.

Users are encouraged to verify important legal information and consult a qualified professional where necessary.

---

# 🔄 Core Workflow

1. **User describes a civic/legal problem**
2. **System captures context such as category, state, city and language**
3. **AI analyzes and categorizes the problem**
4. **Relevant information is converted into simple language**
5. **A structured 5-step action roadmap is generated**
6. **Relevant authorities and escalation channels are identified**
7. **Supporting sources are presented**
8. **A formal document can be generated**
9. **User can edit, copy, download or print the document**

This transforms a fragmented information-search process into a guided action journey.

---

# 🏗️ System Architecture

```text
                         ┌─────────────────────────┐
                         │       USER INPUT        │
                         │                         │
                         │ Problem + Language      │
                         │ State + City            │
                         └────────────┬────────────┘
                                      │
                                      ▼
                         ┌─────────────────────────┐
                         │     REACT FRONTEND      │
                         │        + VITE            │
                         │                         │
                         │ User Interface           │
                         │ Analysis UI              │
                         │ Roadmap UI               │
                         │ Authority Finder         │
                         │ Documents UI             │
                         └────────────┬────────────┘
                                      │
                                      │ REST API
                                      ▼
                         ┌─────────────────────────┐
                         │    EXPRESS BACKEND      │
                         │                         │
                         │       REST APIs         │
                         └────────────┬────────────┘
                                      │
                         ┌────────────┴────────────┐
                         │                         │
                         ▼                         ▼
              ┌─────────────────────┐   ┌─────────────────────┐
              │     AI SERVICE      │   │   FALLBACK SYSTEM   │
              │                     │   │                     │
              │ Problem Analysis    │   │ Predefined          │
              │ Structured Output   │   │ Guidance            │
              │ Document Generation │   │                     │
              └──────────┬──────────┘   └──────────┬──────────┘
                         │                         │
                         └────────────┬────────────┘
                                      ▼
                         ┌─────────────────────────┐
                         │   STRUCTURED RESPONSE   │
                         │                         │
                         │ • Category              │
                         │ • Summary               │
                         │ • Action Roadmap        │
                         │ • Authorities            │
                         │ • Sources                │
                         │ • Document Assistance    │
                         └────────────┬────────────┘
                                      │
                                      ▼
                         ┌─────────────────────────┐
                         │     USER INTERFACE      │
                         │                         │
                         │ Clear, actionable and   │
                         │ accessible guidance     │
                         └─────────────────────────┘