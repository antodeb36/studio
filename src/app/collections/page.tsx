"use client";

import { Header } from "@/components/header";
import { ImageCard } from "@/components/image-card";
import { useCollections } from "@/hooks/use-collections";
import { images as allImages } from "@/lib/images";
import { Heart } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { StockImage } from "@/lib/images";

export default function CollectionsPage() {
  const { getCollection } = useCollections();
  const [collectedImages, setCollectedImages] = useState<StockImage[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const collectionIds = getCollection();
    const images = allImages.filter((image) => collectionIds.includes(image.id));
    setCollectedImages(images);
  }, [getCollection]);

  if (!isClient) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">Your Collections</h1>

        {collectedImages.length > 0 ? (
          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {collectedImages.map((image) => (
              <ImageCard key={image.id} image={image} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-card border rounded-lg">
            <Heart className="mx-auto h-12 w-12 text-muted-foreground" />
            <h2 className="mt-4 text-2xl font-semibold">Your collection is empty</h2>
            <p className="text-muted-foreground mt-2">
              Start exploring and add images you love to your collection.
            </p>
            <Link href="/">
              <div className="mt-6 inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90">
                Explore Images
              </div>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
