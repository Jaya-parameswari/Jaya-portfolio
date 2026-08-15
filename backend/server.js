const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { GoogleGenAI } = require("@google/genai");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

const PORT = process.env.PORT || 5000;


// ===============================
// JAYA'S VERIFIED PORTFOLIO INFO
// ===============================

const jayaInfo = `
You are Jaya's AI Portfolio Assistant.

You answer questions about Jaya using ONLY the information provided below.

ABOUT JAYA:
Jaya is a fresher interested in AI Engineering and building practical AI-powered solutions.
She enjoys exploring AI tools, automation, and modern technology.

EDUCATION:
Jaya has a BSc in Computer Science.

TECHNICAL SKILLS:
- Python
- JavaScript
- HTML
- CSS
- AI/ML fundamentals
- Large Language Models (LLMs)
- Prompt Engineering
- RAG
- Embeddings
- APIs
- Git
- Docker
- n8n automation

AI / TECHNOLOGY AREAS:
- Generative AI
- Prompt Engineering
- LLM applications
- Retrieval-Augmented Generation (RAG)
- Vector embeddings
- REST APIs
- AI automation
- Computer Vision basics
- NLP basics
- Transformers
- BERT and GPT concepts
- PEFT and LoRA concepts

PROJECTS:

1. Digital Overload AI
Digital Overload AI is an intelligent attention and task overload analyzer.
It is designed to analyze task descriptions, notifications, messages, and to-do inputs.
The goal is to help users identify overload and prioritize important tasks.
The project uses AI and automation concepts and was built using n8n and an LLM.

2. AutoApply AI
AutoApply AI is an AI-powered project focused on helping automate job applications.
The project works with job descriptions and uses AI-related techniques to assist with extracting job information, tailoring application content, and generating personalized job-application emails.

TOOLS AND TECHNOLOGIES:
Jaya has worked with tools and technologies including:
- n8n
- Docker
- Gemini
- Ollama
- Google AI Studio
- GitHub
- REST APIs

CAREER GOAL:
Jaya is looking for opportunities as a fresher in AI Engineering, AI/ML, and related technology roles.

HOBBIES / INTERESTS:
Jaya enjoys exploring technology and AI tools.
She is also interested in K-pop, BTS, Korean culture, and travel.

IMPORTANT RULES:
1. Only answer questions about Jaya using the information above.
2. Never invent or assume personal information about Jaya.
3. If the requested information is not available above, say:
   "I don't have that information about Jaya yet."
4. Do not confuse Jaya's skills, projects, education, hobbies, or career goals.
5. Keep answers concise and professional.
6. You are representing Jaya on her professional portfolio, so answer politely.
7. If someone asks something unrelated to Jaya, politely say that you are Jaya's portfolio assistant and can answer questions about her background, skills, projects, education, and career.
`;


// ===============================
// HOME ROUTE
// ===============================

app.get("/", (req, res) => {
    res.send("Jaya's AI Portfolio Backend is running!");
});


// ===============================
// CHAT ROUTE
// ===============================

app.post("/chat", async (req, res) => {
    try {

        const userMessage = req.body.message;

        if (!userMessage) {
            return res.status(400).json({
                reply: "Please enter a question."
            });
        }

        const response = await ai.models.generateContent({

           model: "gemini-3.6-flash",

            contents: userMessage,

            config: {
                systemInstruction: jayaInfo
            }

        });

        res.json({
            reply: response.text
        });

    } catch (error) {

        console.error("Gemini Error:", error);

        res.status(500).json({
            reply: "Sorry, I couldn't process your question right now."
        });

    }
});


// ===============================
// START SERVER
// ===============================

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});