import { createServerFn } from "@tanstack/react-start";

const GATEWAY_URL = "https://ai.gateway.lovable.dev/v1/chat/completions";

async function callAI(system: string, user: string): Promise<string> {
  const key = process.env.LOVABLE_API_KEY;
  if (!key) throw new Error("LOVABLE_API_KEY is not configured");

  const res = await fetch(GATEWAY_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash",
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
    }),
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`AI gateway error [${res.status}]: ${txt}`);
  }
  const data = (await res.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  return data.choices?.[0]?.message?.content?.trim() ?? "";
}

export const bautizarNinoPerdido = createServerFn({ method: "POST" })
  .inputValidator((d: { name: string }) => {
    const name = String(d?.name ?? "").slice(0, 80).trim();
    if (!name) throw new Error("Necesito tu nombre mortal");
    return { name };
  })
  .handler(async ({ data }) => {
    const system =
      "Eres el espíritu de Nunca Jamás, narrador místico de la banda de rock 'Niños Perdidos' (versiones rock de canciones de Disney y dibujos de los 90). Bautizas a un mortal con una nueva identidad en Nunca Jamás. Responde SIEMPRE en español, en 2-3 frases breves, con tono épico, travieso y poético. Devuelve un nuevo nombre de niño perdido (inventado, evocador, infantil-pirata) y una pequeña descripción de su papel en la tripulación. NO uses listas ni markdown.";
    const content = await callAI(system, `Mi nombre mortal es: ${data.name}`);
    return { text: content };
  });

export const consultarOraculo = createServerFn({ method: "POST" })
  .inputValidator((d: { prompt: string }) => {
    const prompt = String(d?.prompt ?? "").slice(0, 200).trim();
    if (!prompt) throw new Error("Sugiere algo al Capitán");
    return { prompt };
  })
  .handler(async ({ data }) => {
    const system =
      "Eres el Capitán Garfio, oráculo de la banda 'Niños Perdidos' que versiona al rock canciones míticas de Disney y dibujos animados de los 90 y 2000. Un mortal te sugiere una canción, película o dibujo para el repertorio. Decides si es DIGNA o INDIGNA del repertorio de Nunca Jamás. Responde SIEMPRE en español, en 2-3 frases, con voz arrogante, teatral y graciosa de villano. Empieza con '⚓ DIGNA:' o '⚓ INDIGNA:' y explica por qué encajaría (o no) como himno rock para toda la familia. NO uses markdown ni listas.";
    const content = await callAI(system, data.prompt);
    return { text: content };
  });
