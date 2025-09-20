"use client";

import { useState } from "react";
import { Download, Heart, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCollections } from "@/hooks/use-collections";
import type { StockImage } from "@/lib/images";
import { useToast } from "@/hooks/use-toast";
import { getAITags } from "./actions";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export function ImageDetailsClient({ image }: { image: StockImage }) {
  const { toast } = useToast();
  const { addToCollection, removeFromCollection, isInCollection } = useCollections();
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [suggestedTags, setSuggestedTags] = useState<string[]>([]);

  const inCollection = isInCollection(image.id);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const response = await fetch(image.imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `e-stock-image-${image.id}.jpg`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
      toast({
        title: "Download failed",
        description: "Could not download the image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const handleSuggestTags = async () => {
    setIsSuggesting(true);
    setSuggestedTags([]);
    try {
      const tags = await getAITags(image.imageUrl);
      if (tags) {
        setSuggestedTags(tags);
      } else {
        throw new Error("AI service did not return tags.");
      }
    } catch (error) {
      console.error("AI Tagging failed:", error);
      toast({
        title: "AI Tagging Failed",
        description: "Could not suggest tags for this image.",
        variant: "destructive",
      });
    } finally {
      setIsSuggesting(false);
    }
  };

  return (
    <>
      <div className="flex items-center space-x-2 mt-6">
        <Button onClick={handleDownload} disabled={isDownloading} className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground">
          {isDownloading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Download className="mr-2 h-4 w-4" />
          )}
          Download
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => (inCollection ? removeFromCollection(image.id) : addToCollection(image.id))}
        >
          <Heart className={inCollection ? "fill-primary text-primary" : ""} />
        </Button>
      </div>
      <Separator className="my-6" />
      <div>
        <h3 className="text-lg font-semibold mb-3">AI Tag Suggestions</h3>
        <Button onClick={handleSuggestTags} disabled={isSuggesting} variant="secondary">
          {isSuggesting ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="mr-2 h-4 w-4" />
          )}
          Suggest Tags
        </Button>
        {suggestedTags.length > 0 && (
          <div className="mt-4">
            <p className="text-sm text-muted-foreground mb-2">Suggested tags from our AI:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedTags.map((tag) => (
                <Badge key={tag} variant="outline" className="capitalize">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
