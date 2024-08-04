// app/api/classify/route.js
import { ImageAnnotatorClient } from "@google-cloud/vision";

const client = new ImageAnnotatorClient();

export async function POST(req) {
  const { image } = await req.json(); // Expecting base64 image data

  try {
    const [result] = await client.labelDetection({
      image: { content: image },
    });
    const labels = result.labelAnnotations.map((label) => label.description);
    return new Response(JSON.stringify({ labels }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to classify image" }), {
      status: 500,
    });
  }
}
