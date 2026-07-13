import { GoogleGenAI } from '@google/genai/node';
import { get_secret } from '$lib/server/secrets';

let _ai: GoogleGenAI | null = null;

async function get_ai(): Promise<GoogleGenAI> {
  if (!_ai) {
    _ai = new GoogleGenAI({
      vertexai: false,
      apiKey: await get_secret('GEMINI')
    });
  }
  return _ai;
}

export const embed = async (
  contents: string,
  query = true
): Promise<number[]> => {
  const ai = await get_ai();
  const embeddings = (
    await ai.models.embedContent({
      model: 'gemini-embedding-001',
      contents: [contents],
      config: { taskType: query ? 'RETRIEVAL_QUERY' : 'RETRIEVAL_DOCUMENT' }
    })
  ).embeddings;
  if (embeddings && embeddings[0].values) {
    return embeddings[0].values;
  } else {
    throw 'error getting embeddings';
  }
};
