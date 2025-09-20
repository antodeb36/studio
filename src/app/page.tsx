import { Header } from '@/components/header';
import { ImageGallery } from '@/components/image-gallery';
import { images as allImages } from '@/lib/images';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ImageGallery allImages={allImages} />
      </main>
    </div>
  );
}
