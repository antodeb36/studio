import { notFound } from "next/navigation";
import Image from "next/image";
import { getImageById } from "@/lib/images";
import { Header } from "@/components/header";
import { Badge } from "@/components/ui/badge";
import { ImageDetailsClient } from "./image-details-client";

export default function PhotoPage({ params }: { params: { id: string } }) {
  const image = getImageById(params.id);

  if (!image) {
    notFound();
  }

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
                <h1 className="text-2xl font-bold leading-tight mb-2">{image.description}</h1>
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
        </div>
      </main>
    </div>
  );
}
