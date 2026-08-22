# ⚖️ NyayaPath AI

### AI-Powered Legal Guidance & Civic Rights Navigation Platform

NyayaPath AI is an AI-powered legal guidance platform designed to help citizens understand their everyday legal and civic problems in simple, accessible language.

Instead of searching through complex legal information, users can describe their problem in natural language and receive a structured explanation, actionable roadmap, relevant authorities, supporting sources, and document-generation assistance.

> **Note:** NyayaPath AI provides informational guidance and is not a substitute for professional legal advice.

---

## 🚨 Problem

For many citizens, accessing legal and civic information is difficult because:

- Legal language is complex and difficult to understand.
- People often do not know which authority or department to approach.
- Finding the correct next step can require searching through multiple sources.
- Citizens may not know what documents or evidence they should prepare.
- Existing legal information is often fragmented across different platforms.
- Language barriers make legal information less accessible.

This creates a gap between **knowing that a problem exists** and **knowing what to do next**.

---

## 💡 Our Solution

NyayaPath AI converts a citizen's problem into a structured action plan.

### User Flow

**Describe Problem → AI Analysis → Legal/Civic Category → Explanation → Action Roadmap → Relevant Authority → Supporting Sources → Document Assistance**

The platform is designed to make legal and civic guidance:

- Simple
- Action-oriented
- Accessible
- Localized
- Multilingual

---

## ✨ Key Features

### 🧠 AI-Powered Problem Analysis
Users can describe their issue in natural language.

The system identifies the relevant category and generates a structured understanding of the problem.

### 🗺️ Action Roadmap
Instead of only explaining the issue, NyayaPath AI provides step-by-step actions that a citizen can follow.

### 🏛️ Authority Finder
Helps users identify the relevant authority or department for their issue.

### 📚 Sources Directory
Provides supporting legal/civic sources related to the generated guidance.

### 📄 Document Generation
The platform can generate structured documents based on the user's problem and selected language.

### 🌐 Multilingual Interaction
Supports user inputs in:

- English
- Hindi
- Hinglish

### 📍 Location-Aware Guidance
The platform accepts state and city information to make guidance more context-aware.

### 🛡️ Fallback Mechanism
A fallback response system is included so that the application can continue providing structured guidance when AI services are unavailable.

### ⚠️ Legal Disclaimer
The platform clearly communicates that its output is informational guidance and should not be treated as professional legal advice.

---

## 🏗️ System Architecture

```text
                    ┌──────────────────────┐
                    │      User Input      │
                    │ Problem + Language   │
                    │ State + City         │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │   React Frontend     │
                    │       + Vite         │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │   Express Backend    │
                    │      REST APIs       │
                    └──────────┬───────────┘
                               │
                 ┌─────────────┴─────────────┐
                 │                           │
                 ▼                           ▼
       ┌──────────────────┐       ┌──────────────────┐
       │   AI Analysis    │       │ Fallback System  │
       │     Service      │       │                  │
       └────────┬─────────┘       └────────┬─────────┘
                │                          │
                └────────────┬─────────────┘
                             ▼
                  ┌──────────────────────┐
                  │ Structured Response  │
                  │                      │
                  │ • Category           │
                  │ • Summary            │
                  │ • Roadmap            │
                  │ • Authorities        │
                  │ • Sources            │
                  │ • Documents          │
                  └──────────┬───────────┘
                             │
                             ▼
                  ┌──────────────────────┐
                  │    User Interface    │
                  └──────────────────────┘