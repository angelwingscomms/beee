import { QdrantClient } from '@qdrant/js-client-rest';
import { get_secret } from '$lib/server/secrets';

let _client: QdrantClient | null = null;

export async function get_qdrant(): Promise<QdrantClient> {
  if (!_client) {
    _client = new QdrantClient({
      url: (await get_secret('QDRANT_URL')) || 'http://localhost:6333',
      apiKey: await get_secret('QDRANT_KEY')
    });
  }
  return _client;
}
