"use server";

import { imageAutoTagging } from '@/ai/flows/image-auto-tagging';

async function urlToDataUri(url: string): Promise<string> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch image: ${response.statusText}`);
  }
  const blob = await response.arrayBuffer();
  const contentType = response.headers.get('content-type') || 'image/jpeg';
  const base64 = Buffer.from(blob).toString('base64');
  return `data:${contentType};base64,${base64}`;
}

export async function getAITags(imageUrl: string): Promise<string[] | null> {
  try {
    const imageDataUri = await urlToDataUri(imageUrl);
    const result = await imageAutoTagging({ imageDataUri });
    return result.tags;
  } catch (error) {
    console.error("AI Tagging Server Action Error:", error);
    return null;
  }
}
