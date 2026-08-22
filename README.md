# ⚖️ NyayaPath AI

### AI-Powered Legal Guidance & Civic Rights Navigation Platform

NyayaPath AI is an AI-powered legal guidance platform designed to help citizens understand their everyday legal and civic problems in simple, accessible language.

Instead of searching through complex legal information, users can describe their problem in natural language and receive a structured explanation, actionable roadmap, relevant authorities, supporting sources, and document-generation assistance.

> ⚠️ **Disclaimer:** NyayaPath AI provides informational and educational guidance only. It is not a substitute for professional legal advice.

---

## 🚨 Problem Statement

For many citizens, accessing legal and civic information is difficult because:

- Legal language is complex and difficult to understand.
- People often do not know which authority or department to approach.
- Finding the correct next step may require searching through multiple sources.
- Citizens may not know what documents or evidence they should prepare.
- Relevant legal and civic information is fragmented across different platforms.
- Language barriers make legal information less accessible.

This creates a gap between:

> **"I have a problem" → "I know exactly what to do next."**

NyayaPath AI aims to bridge this gap.

---

## 💡 Our Solution

NyayaPath AI converts a citizen's problem into a structured and actionable guidance path.

### User Journey

**Describe Problem → AI Analysis → Category Detection → Problem Explanation → Action Roadmap → Authority Identification → Supporting Sources → Document Assistance**

The platform is designed to make legal and civic guidance:

- 🧠 Simple
- 🗺️ Action-oriented
- 🏛️ Authority-aware
- 📚 Source-supported
- 🌐 Multilingual
- 📍 Context-aware
- 🛡️ Resilient through fallback support

---

## ✨ Key Features

### 🧠 AI-Powered Problem Analysis

Users can describe their legal or civic issue in natural language.

The system analyzes the problem and generates a structured response including the relevant category, summary, and recommended actions.

---

### 🗺️ Action Roadmap

NyayaPath AI goes beyond simply explaining a legal issue.

It provides a structured, step-by-step roadmap so users can understand:

- What to do first
- What evidence/documents may be useful
- Which authority to approach
- What action can be taken next

---

### 🏛️ Authority Finder

Helps users identify the relevant government authority, department, or organization associated with their issue.

This reduces the uncertainty of:

> **"Where should I complain?"**

---

### 📚 Sources Directory

The platform provides supporting legal and civic sources related to the generated guidance.

This helps users explore the underlying information instead of relying only on an AI-generated response.

---

### 📄 Document Generation

NyayaPath AI can generate structured documents based on the user's problem.

Potential use cases include:

- Complaint drafts
- Applications
- Requests
- Legal/civic representations

The generated content is intended as a starting point and should be reviewed before submission.

---

### 🌐 Multilingual Interaction

The platform supports interaction in:

- English
- Hindi
- Hinglish

This improves accessibility for users who may not be comfortable with formal legal English.

---

### 📍 Location-Aware Guidance

Users can provide:

- State
- City

This allows the system to consider the user's location while generating relevant guidance and identifying authorities.

---

### 🛡️ Fallback Mechanism

NyayaPath AI includes a fallback response mechanism.

If the external AI service is unavailable or fails, the application can still provide structured predefined guidance for supported scenarios.

This improves prototype reliability and user experience.

---

### ⚠️ Safety & Legal Disclaimer

The platform clearly communicates that its output is informational guidance and should not be treated as professional legal advice.

Users are encouraged to verify important legal information and consult a qualified professional where necessary.

---

# 🏗️ System Architecture

```text
                         ┌─────────────────────────┐
                         │       USER INPUT        │
                         │                         │
                         │  Problem + Language     │
                         │  State + City           │
                         └────────────┬────────────┘
                                      │
                                      ▼
                         ┌─────────────────────────┐
                         │     REACT FRONTEND      │
                         │        + VITE           │
                         │                         │
                         │  User Interface         │
                         │  Analysis UI            │
                         │  Roadmap UI             │
                         │  Authority Finder       │
                         │  Documents UI           │
                         └────────────┬────────────┘
                                      │
                                      │ REST API
                                      ▼
                         ┌─────────────────────────┐
                         │    EXPRESS BACKEND      │
                         │                         │
                         │      REST APIs          │
                         └────────────┬────────────┘
                                      │
                         ┌────────────┴────────────┐
                         │                         │
                         ▼                         ▼
              ┌─────────────────────┐   ┌─────────────────────┐
              │    AI SERVICE       │   │   FALLBACK SYSTEM   │
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
                         │ • Authorities           │
                         │ • Sources               │
                         │ • Document Assistance   │
                         └────────────┬────────────┘
                                      │
                                      ▼
                         ┌─────────────────────────┐
                         │     USER INTERFACE      │
                         │                         │
                         │ Clear, actionable and   │
                         │ accessible guidance     │
                         └─────────────────────────┘