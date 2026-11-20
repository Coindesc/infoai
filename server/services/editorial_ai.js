import dotenv from 'dotenv';
dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Lista de modelos resilientes com fallback automático
const FALLBACK_MODELS = [
  'gemini-flash-lite-latest',
  'gemini-flash-latest',
  'gemini-2.5-flash'
];

/**
 * Higieniza strings JSON geradas por LLM removendo markdown e vírgulas sobressalentes
 */
function cleanJsonString(str) {
  if (!str) return '{}';
  let cleaned = str.replace(/```(?:json)?\s*/gi, '').replace(/```\s*$/gi, '').trim();
  // Remove trailing commas before } or ]
  cleaned = cleaned.replace(/,\s*([\]}])/g, '$1');
  return cleaned;
}

/**
 * Redige uma edição diária autônoma completa seguindo estritamente as 'regras_criação'
 */
export async function generateDailyEdition(targetDate = new Date().toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })) {
  if (!GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY não configurada no .env');
  }

  const systemInstruction = `Você é o Redator-Chefe Autônomo e Curador Sênior do portal de notícias INFOAI / VendeRápido News (https://venderapido.com.br).
Siga estritamente as seguintes regras de criação jornalística:
1. O portal cobre 7 editorias fundamentais:
   - politica (Política Nacional e Relações Institucionais)
   - economia (Mercados, Finanças, Câmbio e Contas Públicas)
   - mundo (Geopolítica, Diplomacia e Conflitos Globais)
   - tecnologia (Inteligência Artificial, Inovação e Comércio Agêntico)
   - esportes (Futebol Brasileiro e Cenário Esportivo Internacional)
   - ciencia_saude (Avanços Médicos, Biotecnologia, Espaço e Energia)
   - cultura (Cultura Pop, Cinema, Artes e Tendências Globais)
2. Para cada notícia:
   - Tom editorial sóbrio, analítico, ultra-limpo (estilo Bloomberg, FT e G1), SEM sensacionalismo, SEM exclamações exageradas e sem adjetivação vazia.
   - Sempre cruzar no mínimo 3 fontes conceituadas (ex: Reuters, Bloomberg, AP, Agência Brasil, Valor, BBC).
   - Indicar 'whyItMatters' (Por que isso importa em 2 a 3 frases densas).
   - Conteúdo de 2 a 3 parágrafos explicativos e aprofundados.
3. Formato WhatsApp (whatsAppPayload):
   - Formatação executiva de 2 minutos para leitura rápida.
   - Use emojis elegantes por seção (🏛️, 📈, 🌍, 💻, ⚽, 🔬, 🎭).
   - Destaque manchetes em negrito *ASSIM*.
   - Termine com link para o site: 'https://venderapido.com.br' e a nota: 'Responda PARAR para pausar os envios.'.
4. Responda ESTRITAMENTE em formato JSON válido, sem comentários e sem vírgulas sobrando antes de fechar colchetes ou chaves.`;

  const prompt = `Data da Edição: ${targetDate}.
Redija a edição diária número ${Math.floor(Date.now() / (1000 * 60 * 60 * 24)) - 20000}.
Retorne o JSON com o seguinte schema exato:
{
  "id": "edition-${new Date().toISOString().split('T')[0]}",
  "editionNumber": 1,
  "date": "${targetDate}",
  "systemStatus": "100% Operacional - Autônomo Gemini Flash",
  "coverPrompt": "Prompt descritivo em inglês para capa editorial minimalista",
  "whatsAppPayload": "Texto formatado para WhatsApp com emojis e 2 min de leitura",
  "leadArticle": {
    "id": "lead-materia-principal",
    "category": "tecnologia",
    "readTime": "3",
    "imageUrl": "/covers/cover_001.jpg",
    "sourcesCrossedCount": 4,
    "title": { "pt": "Título em PT", "en": "Title in EN", "es": "Título en ES", "fr": "Titre en FR", "de": "Titel in DE", "zh": "中文标题" },
    "whyItMatters": { "pt": "Por que importa em PT", "en": "Why it matters in EN", "es": "Por qué importa en ES", "fr": "Pourquoi c'est important", "de": "Warum es wichtig ist", "zh": "核心要点" },
    "content": {
      "pt": ["Parágrafo 1", "Parágrafo 2", "Parágrafo 3"]
    }
  },
  "articles": [
    {
      "id": "art-politica",
      "category": "politica",
      "readTime": "2",
      "imageUrl": "/covers/politica.jpg",
      "sourcesCrossedCount": 3,
      "title": { "pt": "Título", "en": "Title", "es": "Título", "fr": "Titre", "de": "Titel", "zh": "标题" },
      "whyItMatters": { "pt": "Impacto", "en": "Impact", "es": "Impacto", "fr": "Impact", "de": "Auswirkung", "zh": "影响" },
      "content": { "pt": ["Parágrafo 1", "Parágrafo 2"] }
    },
    {
      "id": "art-economia",
      "category": "economia",
      "readTime": "2",
      "imageUrl": "/covers/economia.jpg",
      "sourcesCrossedCount": 3,
      "title": { "pt": "Título", "en": "Title", "es": "Título", "fr": "Titre", "de": "Titel", "zh": "标题" },
      "whyItMatters": { "pt": "Impacto", "en": "Impact", "es": "Impacto", "fr": "Impact", "de": "Auswirkung", "zh": "影响" },
      "content": { "pt": ["Parágrafo 1", "Parágrafo 2"] }
    },
    {
      "id": "art-mundo",
      "category": "mundo",
      "readTime": "2",
      "imageUrl": "/covers/mundo.jpg",
      "sourcesCrossedCount": 3,
      "title": { "pt": "Título", "en": "Title", "es": "Título", "fr": "Titre", "de": "Titel", "zh": "标题" },
      "whyItMatters": { "pt": "Impacto", "en": "Impact", "es": "Impacto", "fr": "Impact", "de": "Auswirkung", "zh": "影响" },
      "content": { "pt": ["Parágrafo 1", "Parágrafo 2"] }
    },
    {
      "id": "art-esportes",
      "category": "esportes",
      "readTime": "2",
      "imageUrl": "/covers/esportes.jpg",
      "sourcesCrossedCount": 3,
      "title": { "pt": "Título", "en": "Title", "es": "Título", "fr": "Titre", "de": "Titel", "zh": "标题" },
      "whyItMatters": { "pt": "Impacto", "en": "Impact", "es": "Impacto", "fr": "Impact", "de": "Auswirkung", "zh": "影响" },
      "content": { "pt": ["Parágrafo 1", "Parágrafo 2"] }
    },
    {
      "id": "art-ciencia",
      "category": "ciencia_saude",
      "readTime": "2",
      "imageUrl": "/covers/ciencia.jpg",
      "sourcesCrossedCount": 3,
      "title": { "pt": "Título", "en": "Title", "es": "Título", "fr": "Titre", "de": "Titel", "zh": "标题" },
      "whyItMatters": { "pt": "Impacto", "en": "Impact", "es": "Impacto", "fr": "Impact", "de": "Auswirkung", "zh": "影响" },
      "content": { "pt": ["Parágrafo 1", "Parágrafo 2"] }
    },
    {
      "id": "art-cultura",
      "category": "cultura",
      "readTime": "2",
      "imageUrl": "/covers/cultura.jpg",
      "sourcesCrossedCount": 3,
      "title": { "pt": "Título", "en": "Title", "es": "Título", "fr": "Titre", "de": "Titel", "zh": "标题" },
      "whyItMatters": { "pt": "Impacto", "en": "Impact", "es": "Impacto", "fr": "Impact", "de": "Auswirkung", "zh": "影响" },
      "content": { "pt": ["Parágrafo 1", "Parágrafo 2"] }
    }
  ]
}`;

  let lastError = null;

  for (const model of FALLBACK_MODELS) {
    try {
      console.log(`🤖 Solicitando redação ao modelo: ${model}...`);
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `${systemInstruction}\n\n${prompt}` }] }],
          generationConfig: {
            responseMimeType: 'application/json',
            temperature: 0.2
          }
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.warn(`⚠️ Modelo ${model} retornou status ${response.status}. Tentando próximo fallback...`);
        lastError = new Error(`Erro na API (${response.status}): ${errorText}`);
        continue;
      }

      const result = await response.json();
      const rawText = result?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!rawText) {
        throw new Error('Resposta vazia da API do Gemini.');
      }

      const sanitizedJson = cleanJsonString(rawText);
      const parsedEdition = JSON.parse(sanitizedJson);
      console.log(`✨ Redação concluída com sucesso via ${model}!`);
      return parsedEdition;
    } catch (err) {
      console.warn(`⚠️ Falha no modelo ${model}: ${err.message}. Tentando próximo...`);
      lastError = err;
    }
  }

  throw lastError || new Error('Todos os modelos de fallback falharam.');
}
