"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "./ui/input";
import { useDebouncedCallback } from "use-debounce";
import { Suspense } from "react";
import Image from "next/image";

function SearchBar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("q", term);
    } else {
      params.delete("q");
    }
    replace(`/?${params.toString()}`);
  }, 300);

  return (
    <div className="relative w-full max-w-sm">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search images..."
        className="pl-9"
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get("q")?.toString()}
      />
    </div>
  );
}

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-auto">
          <Image src="https://drive.google.com/uc?export=download&id=1AG06J7S8dbVK-r27USyHKQd2sU5OQYR9" alt="E-Stock logo" width={120} height={40} />
        </Link>
        <div className="flex items-center justify-end space-x-4">
          {pathname === '/' && (
            <Suspense>
              <SearchBar />
            </Suspense>
          )}
        </div>
      </div>
    </header>
  );
}
