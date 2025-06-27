import { OpenAIStream, StreamingTextResponse } from "ai";
import openai, { getEmbedding } from "@/lib/embedding";
import { lowonganIndex } from "@/lib/db/pinecone";
import { ChatCompletionUserMessageParam } from "openai/resources/index.mjs";

export async function POST(req: Request) {
  const { messages } = await req.json();
  const latestMessage = messages[messages.length - 1];
  const question = latestMessage.content;

  // Buat embedding untuk pertanyaan user
  const embedding = await getEmbedding(question);

  // Query Pinecone untuk mencari konteks
  const result = await lowonganIndex.query({
    vector: embedding,
    topK: 5,
    includeMetadata: true,
  });

  // Gabungkan hasil menjadi konteks prompt
  const contexts =
    result.matches?.map((m) => m.metadata?.pageContent).filter(Boolean) ?? [];
  const contextString = contexts.join("\n\n");

  const systemPrompt = `Kamu adalah asisten yang menjawab pertanyaan berdasarkan data lowongan kerja berikut:\n\n${contextString}`;

  // 💬 Tambahan contoh user messages untuk memperkuat konteks LLM
  const userMessages: ChatCompletionUserMessageParam[] = [
    { role: "user", content: "Apa saja lowongan kerja yang masih tersedia?" },
    {
      role: "user",
      content: "Lowongan mana yang memiliki prioritas tinggi atau mendesak?",
    },
    { role: "user", content: "Tampilkan daftar lowongan yang sudah ditutup." },
    {
      role: "user",
      content: "Ringkas semua lowongan dengan prioritas rendah.",
    },
    { role: "user", content: "Lowongan apa yang harus segera diisi?" },
    {
      role: "user",
      content:
        "Tampilkan lowongan yang aktif dan urutkan berdasarkan prioritas.",
    },
    { role: "user", content: "Lowongan apa saja yang tersedia minggu ini?" },
    {
      role: "user",
      content:
        "Tampilkan semua lowongan yang dikategorikan berdasarkan jenis pekerjaan.",
    },
    {
      role: "user",
      content:
        "Lowongan mana saja yang bersifat mendesak atau prioritas tinggi?",
    },
    {
      role: "user",
      content: "Lowongan apa saja yang sedang dalam proses rekrutmen?",
    },
    { role: "user", content: "Berapa banyak lowongan yang belum terisi?" },
    {
      role: "user",
      content: "Daftar semua lowongan yang baru saja diposting.",
    },
    { role: "user", content: "Lowongan mana yang ditutup minggu lalu?" },
    {
      role: "user",
      content:
        "Apa langkah selanjutnya untuk melamar posisi 'Frontend Developer'?",
    },
    {
      role: "user",
      content: "Apakah ada lowongan yang dikategorikan sebagai kritikal?",
    },
    {
      role: "user",
      content: "Tampilkan lowongan kerja yang tersedia untuk akhir pekan.",
    },
    {
      role: "user",
      content: "Lowongan dengan prioritas rendah tapi belum terisi apa saja?",
    },
    {
      role: "user",
      content: "Tampilkan hanya lowongan yang berhubungan dengan 'Project X'.",
    },
    {
      role: "user",
      content: "Berapa banyak lowongan dengan batas waktu bulan ini?",
    },
    {
      role: "user",
      content: "Daftar semua lowongan yang sudah melewati tenggat waktu.",
    },

    // Versi Bahasa Inggris
    { role: "user", content: "What job openings are currently available?" },
    {
      role: "user",
      content: "Which job postings have high or urgent priority?",
    },
    { role: "user", content: "List the job openings that are already closed." },
    { role: "user", content: "Summarize all job vacancies with low priority." },
    { role: "user", content: "Which openings need to be filled immediately?" },
    { role: "user", content: "Show active job vacancies sorted by priority." },
    { role: "user", content: "Which jobs are available this week?" },
    { role: "user", content: "List all job postings categorized by job type." },
    { role: "user", content: "Which openings are urgent or critical?" },
    {
      role: "user",
      content: "Which positions are currently in recruitment process?",
    },
    { role: "user", content: "How many positions are still vacant?" },
    { role: "user", content: "Show newly posted job vacancies." },
    { role: "user", content: "Which jobs were closed last week?" },
    {
      role: "user",
      content: "What are the next steps to apply for 'Frontend Developer'?",
    },
    { role: "user", content: "Are there any positions marked as critical?" },
    { role: "user", content: "Show job opportunities available this weekend." },
    { role: "user", content: "Which low-priority jobs are still unfilled?" },
    { role: "user", content: "Show job postings related to 'Project X' only." },
    { role: "user", content: "How many jobs have deadlines this month?" },
    { role: "user", content: "List all overdue job postings." },
  ];

  // Gabungkan pesan sistem, userMessages, dan chat terakhir user
  const fullMessages = [
    { role: "system", content: systemPrompt },
    ...userMessages,
    ...messages,
  ];

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    stream: true,
    messages: fullMessages,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const stream = OpenAIStream(response as any);
  return new StreamingTextResponse(stream);
}
