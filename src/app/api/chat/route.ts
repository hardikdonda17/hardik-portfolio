import { NextResponse } from "next/server";
import { PORTFOLIO_KNOWLEDGE } from "@/data/portfolio-knowledge";

type ChatMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

const SYSTEM_PROMPT = `You are Hardik Donda's portfolio assistant on his personal website.
Answer ONLY using the portfolio knowledge below. Do not invent facts, employers, projects, skills, or contact details that are not listed.
If the user asks something unrelated or not covered in the knowledge, politely say you can only answer questions about Hardik's portfolio (experience, skills, projects, certifications, and contact).
Keep replies concise, friendly, and clear. Use short bullet points when listing items. You may use **bold** for emphasis.

## Portfolio knowledge
${PORTFOLIO_KNOWLEDGE}`;

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = process.env.GROQ_MODEL || "openai/gpt-oss-20b";
const MAX_HISTORY = 12;

export async function POST(request: Request) {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "Chat is not configured yet. Add GROQ_API_KEY to your environment.",
      },
      { status: 500 }
    );
  }

  let body: { messages?: ChatMessage[] };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const incoming = Array.isArray(body.messages) ? body.messages : [];
  const sanitized = incoming
    .filter(
      (m): m is ChatMessage =>
        !!m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim().length > 0
    )
    .map((m) => ({ role: m.role, content: m.content.trim() }))
    .slice(-MAX_HISTORY);

  if (sanitized.length === 0) {
    return NextResponse.json(
      { error: "At least one user message is required." },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(GROQ_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        temperature: 0.3,
        max_tokens: 512,
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...sanitized],
      }),
    });

    if (!response.ok) {
      const errText = await response.text().catch(() => "");
      console.error("Groq API error:", response.status, errText);
      return NextResponse.json(
        { error: "The assistant is temporarily unavailable. Please try again." },
        { status: 502 }
      );
    }

    const data = await response.json();
    const reply =
      data?.choices?.[0]?.message?.content?.trim() ||
      "Sorry, I could not generate a reply. Please try again.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat route error:", error);
    return NextResponse.json(
      { error: "Something went wrong while contacting the assistant." },
      { status: 500 }
    );
  }
}
