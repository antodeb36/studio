import { notFound } from "next/navigation";
import Image from "next/image";
import { getImageById, images as allImages } from "@/lib/images";
import { Header } from "@/components/header";
import { Badge } from "@/components/ui/badge";
import { ImageDetailsClient } from "./image-details-client";
import { ImageCard } from "@/components/image-card";
import { Separator } from "@/components/ui/separator";

export default function PhotoPage({ params }: { params: { id: string } }) {
  const image = getImageById(params.id);

  if (!image) {
    notFound();
  }

  // Get 4 related images (shuffle and take 4, excluding the current one)
  const relatedImages = allImages
    .filter(img => img.id !== image.id)
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="lg:col-span-2 bg-card p-4 rounded-lg shadow-sm flex items-center justify-center">
              <Image
                src={image.imageUrl}
                alt={image.description}
                width={image.width}
                height={image.height}
                className="max-h-[80vh] w-auto h-auto object-contain rounded-md"
                priority
              />
            </div>
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <h1 className="text-2xl font-bold leading-tight mb-2">Photo by Pexels</h1>
                <p className="text-muted-foreground mb-4">{image.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {image.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="capitalize">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <ImageDetailsClient image={image} />
              </div>
            </div>
          </div>
          
          <Separator className="my-12" />

          <div>
            <h2 className="text-2xl font-bold mb-6">Related Photos</h2>
            <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {relatedImages.map((img) => (
                <ImageCard key={img.id} image={img} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
