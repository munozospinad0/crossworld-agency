import {handleUpload, type HandleUploadBody} from '@vercel/blob/client';

/** Token de subida directa al Blob privado (adjuntos de formularios). Sin BLOB_READ_WRITE_TOKEN responde 503. */
export async function POST(req: Request) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return new Response('uploads disabled', {status: 503});
  const body = (await req.json()) as HandleUploadBody;
  try {
    const json = await handleUpload({
      body,
      request: req,
      onBeforeGenerateToken: async () => ({
        access: 'private',
        allowedContentTypes: ['application/pdf', 'image/jpeg', 'image/png'],
        maximumSizeInBytes: 10 * 1024 * 1024,
        addRandomSuffix: true,
      }),
      onUploadCompleted: async () => {},
    });
    return Response.json(json);
  } catch (e) {
    return Response.json({error: (e as Error).message}, {status: 400});
  }
}
