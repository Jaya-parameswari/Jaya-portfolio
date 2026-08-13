const jayaKnowledge = {

    name: "Jaya",

    role: "AI Engineer / AI Tools Developer",

    education: "B.Sc. Computer Science",

    location: "India",

    focus: [
        "Artificial Intelligence",
        "AI automation",
        "Prompt Engineering",
        "AI tools",
        "Building practical AI applications"
    ],

    skills: [
        "Python",
        "JavaScript",
        "HTML",
        "CSS",
        "LLMs",
        "Prompt Engineering",
        "RAG",
        "Embeddings",
        "APIs",
        "Git",
        "GitHub",
        "Docker"
    ],

    aiTools: [
        "Gemini",
        "ChatGPT",
        "n8n",
        "Ollama"
    ],

    projects: [
        {
            name: "Digital Overload AI",
            description:
                "An AI-powered system designed to analyze daily tasks and help users prioritize their workload."
        },

        {
            name: "AutoApply AI",
            description:
                "An AI-powered application designed to simplify parts of the job application process."
        }
    ]

};



const chatButton =
    document.getElementById("chat-button");

const chatbot =
    document.getElementById("chatbot");

const closeChat =
    document.getElementById("close-chat");


chatButton.addEventListener("click", function () {

    chatbot.style.display = "flex";

});


closeChat.addEventListener("click", function () {

    chatbot.style.display = "none";

});
const chatInput =
    document.getElementById("chat-input");

const sendChat =
    document.getElementById("send-chat");

const chatMessages =
    document.getElementById("chat-messages");


function addMessage(message, type) {

    const messageDiv =
        document.createElement("div");

    messageDiv.classList.add(type);

    messageDiv.innerHTML = `<p>${message}</p>`;

    chatMessages.appendChild(messageDiv);

    chatMessages.scrollTop =
        chatMessages.scrollHeight;
}
async function handleChat() {

    const question = chatInput.value.trim();

    if (question === "") {
        return;
    }

    addMessage(question, "user-message");

    chatInput.value = "";

    addMessage("Thinking...", "bot-message");

    try {

        const response = await fetch("http://localhost:5000/chat", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                message: question
            })

        });

        const data = await response.json();

        const botMessages =
            chatMessages.querySelectorAll(".bot-message");

        const lastBotMessage =
            botMessages[botMessages.length - 1];

        lastBotMessage.innerHTML =
            `<p>${data.reply}</p>`;

    } catch (error) {

        console.error(error);

        const botMessages =
            chatMessages.querySelectorAll(".bot-message");

        const lastBotMessage =
            botMessages[botMessages.length - 1];

        lastBotMessage.innerHTML =
            `<p>Sorry, I couldn't connect to my AI assistant.</p>`;

    }
} 

sendChat.addEventListener(
    "click",
    handleChat
);


chatInput.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            handleChat();

        }

    }
);
const analyzeButton = document.getElementById("analyze-button");

const taskInput = document.getElementById("task-input");

const demoResult = document.getElementById("demo-result");


analyzeButton.addEventListener("click", function () {

    const tasks = taskInput.value.trim();


    if (tasks === "") {

        demoResult.innerHTML = `
            <p>Please enter some tasks first.</p>
        `;

        return;
    }


    demoResult.innerHTML = `
        <h4>Task analysis ready</h4>

        <p>
            Your tasks have been received.
            In the final version, the AI model will analyze
            deadlines, workload and priority to generate
            a personalized plan.
        </p>
    `;

});
const extractButton = document.getElementById("extract-button");

const jobInput = document.getElementById("job-input");

const jobResult = document.getElementById("job-result");


extractButton.addEventListener("click", function () {

    const jobDescription = jobInput.value.trim();


    if (jobDescription === "") {

        jobResult.innerHTML = `
            <p>Please enter a job description first.</p>
        `;

        return;
    }


    jobResult.innerHTML = `
        <h4>Job information detected</h4>

        <p>
            The AI system would now extract details such as
            job title, required skills, experience level and
            other relevant information from the provided input.
        </p>
    `;

});
const sendMessageButton =
    document.getElementById("send-message");

const contactStatus =
    document.getElementById("contact-status");


sendMessageButton.addEventListener("click", function () {

    const name =
        document.getElementById("name").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const message =
        document.getElementById("message").value.trim();


    if (name === "" || email === "" || message === "") {

        contactStatus.textContent =
            "Please fill in all fields.";

        return;
    }


    contactStatus.textContent =
        "Thanks! Your message is ready to be sent.";

});