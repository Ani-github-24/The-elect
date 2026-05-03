import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are "The Elect Assistant", a friendly and knowledgeable election education chatbot. Your sole purpose is to help users understand the voting process, election terminology, voter registration, and civic engagement.

Rules:
- Only answer questions related to elections, voting, civic education, and government.
- If a user asks something unrelated, politely redirect them to election topics.
- Keep answers concise (2-3 sentences max) and in plain, accessible language.
- Do not express political opinions or endorse any candidate or party.
- If you don't know the answer, say so honestly and suggest official resources like vote.gov.`;

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return NextResponse.json(
        { error: "Message is required." },
        { status: 400 }
      );
    }

    // Sanitize input — limit length
    const sanitizedMessage = message.trim().slice(0, 500);

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          reply:
            "The Election Assistant is not configured yet. Please add a GEMINI_API_KEY to your .env.local file. You can get a free key at https://aistudio.google.com/apikey",
        },
        { status: 200 }
      );
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: `${SYSTEM_PROMPT}\n\nUser question: ${sanitizedMessage}` }],
            },
          ],
          generationConfig: {
            maxOutputTokens: 256,
            temperature: 0.7,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Gemini API error:", errorData);
      return NextResponse.json(
        { reply: "Sorry, I couldn't process your question right now. Please try again." },
        { status: 200 }
      );
    }

    const data = await response.json();
    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "I couldn't generate a response. Please try rephrasing your question.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { reply: "An unexpected error occurred. Please try again." },
      { status: 200 }
    );
  }
}
