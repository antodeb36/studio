// This is a server action.
'use server';

/**
 * @fileOverview This file defines a Genkit flow for automatically suggesting tags for an image.
 *
 * - `imageAutoTagging` -  A function that takes an image data URI as input and returns a list of suggested tags.
 * - `ImageAutoTaggingInput` - The input type for the `imageAutoTagging` function.
 * - `ImageAutoTaggingOutput` - The output type for the `imageAutoTagging` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ImageAutoTaggingInputSchema = z.object({
  imageDataUri: z
    .string()
    .describe(
      "A photo of a stock image, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type ImageAutoTaggingInput = z.infer<typeof ImageAutoTaggingInputSchema>;

const ImageAutoTaggingOutputSchema = z.object({
  tags: z.array(z.string()).describe('An array of suggested tags for the image.'),
});
export type ImageAutoTaggingOutput = z.infer<typeof ImageAutoTaggingOutputSchema>;

export async function imageAutoTagging(input: ImageAutoTaggingInput): Promise<ImageAutoTaggingOutput> {
  return imageAutoTaggingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'imageAutoTaggingPrompt',
  input: {schema: ImageAutoTaggingInputSchema},
  output: {schema: ImageAutoTaggingOutputSchema},
  prompt: `You are an expert in image recognition and tagging. Analyze the image provided and suggest relevant tags.

  Image: {{media url=imageDataUri}}

  Provide at least 5 tags that accurately describe the image.`,
});

const imageAutoTaggingFlow = ai.defineFlow(
  {
    name: 'imageAutoTaggingFlow',
    inputSchema: ImageAutoTaggingInputSchema,
    outputSchema: ImageAutoTaggingOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
