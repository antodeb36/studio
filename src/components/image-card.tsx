import Link from "next/link";
import Image from "next/image";
import type { StockImage } from "@/lib/images";
import { Card, CardContent } from "@/components/ui/card";

interface ImageCardProps {
  image: StockImage;
}

export function ImageCard({ image }: ImageCardProps) {
  return (
    <Link href={`/photos/${image.id}`} className="group block">
      <Card className="overflow-hidden transition-all duration-300 ease-in-out group-hover:shadow-xl group-hover:-translate-y-1">
        <CardContent className="p-0">
          <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
            <Image
              src={image.imageUrl}
              alt={image.description}
              width={image.width}
              height={image.height}
              className="w-full h-full object-cover object-center transition-transform duration-300 ease-in-out group-hover:scale-105"
              data-ai-hint={image.imageHint}
            />
          </div>
        </CardContent>
      </Card>
      <div className="mt-2">
        <p className="mt-1 text-sm text-muted-foreground truncate">{image.description}</p>
      </div>
    </Link>
  );
}
