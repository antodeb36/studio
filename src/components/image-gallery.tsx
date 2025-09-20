"use client";

import { Suspense, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { StockImage } from "@/lib/images";
import { ImageCard } from "./image-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ImageGalleryProps {
  allImages: StockImage[];
}

const colors = ["red", "orange", "yellow", "green", "cyan", "blue", "purple", "brown", "black", "white", "gray", "multi"];

function GalleryContents({ allImages }: ImageGalleryProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  
  const query = searchParams.get("q") ?? "";
  const color = searchParams.get("color") ?? "";
  const [sort, setSort] = useState("newest");
  
  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value && value !== 'all') {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const filteredImages = allImages.filter(image => {
    const searchMatch = query ? 
      image.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase())) ||
      image.description.toLowerCase().includes(query.toLowerCase())
      : true;
    
    const colorMatch = color ? image.color === color : true;

    return searchMatch && colorMatch;
  });

  const sortedImages = [...filteredImages].sort((a, b) => {
    if (sort === 'oldest') {
      return parseInt(a.id) - parseInt(b.id);
    }
    // Default to newest
    return parseInt(b.id) - parseInt(a.id);
  });
  
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Discover Images</h1>
        <div className="flex gap-4">
          <Select value={color} onValueChange={(value) => handleFilterChange('color', value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by color" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Colors</SelectItem>
              {colors.map((c) => (
                <SelectItem key={c} value={c} className="capitalize">{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {sortedImages.length > 0 ? (
        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {sortedImages.map((image) => (
            <ImageCard key={image.id} image={image} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold">No Images Found</h2>
          <p className="text-muted-foreground mt-2">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
}

export function ImageGallery(props: ImageGalleryProps) {
  return (
    <Suspense>
      <GalleryContents {...props} />
    </Suspense>
  )
}
