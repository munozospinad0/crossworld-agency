import type {MetadataRoute} from 'next';
import {site} from '@/content/site';

/**
 * Un grupo general y grupos explícitos para los buscadores generativos.
 *
 * Con `User-agent: *` bastaría, pero varios de estos rastreadores leen primero el grupo que
 * lleva su nombre y algunos operadores los bloquean por defecto en plantillas ajenas: dejarlo
 * escrito evita dudas y sirve de constancia de que el sitio quiere ser citado por ellos.
 * El tráfico de este sitio depende del orgánico, así que se permite a todos los que responden
 * consultas (OpenAI, Anthropic, Perplexity, Google, Microsoft, Apple, Amazon, You.com).
 */
const AI_ANSWER_BOTS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-User',
  'Claude-SearchBot',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot',
  'Applebot-Extended',
  'Amazonbot',
  'YouBot',
  'Bingbot',
  'DuckAssistBot',
  'cohere-ai',
  'Meta-ExternalAgent',
];

export default function robots(): MetadataRoute.Robots {
  const disallow = ['/api/', '/keystatic', '/api/keystatic'];
  return {
    rules: [
      {userAgent: '*', allow: '/', disallow},
      ...AI_ANSWER_BOTS.map((userAgent) => ({userAgent, allow: '/', disallow})),
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
