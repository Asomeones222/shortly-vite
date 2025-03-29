import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Home() {
  const [validURL, setIsValidURL] = useState<boolean>(false);
  return (
    <Layout>
      <div className="grid items-center justify-items-center min-h-full mt-56">
        <h1 className="!mb-1">Shortly</h1>
        <p>A simple fast URL shortener</p>
        <div className="flex max-sm:flex-col gap-1 min-w-full justify-center px-5">
          <Input
            type="url"
            className="max-w-xl grow"
            placeholder="https://example.com/very/long/url/to/shorten"
            onChange={(e) => {
              setIsValidURL(e.target.checkVisibility());
            }}
          />
          <Button
            type="button"
            variant="default"
            className="cursor-pointer disabled:opacity-70"
            disabled={!validURL}
            onClick={() => {}}
          >
            Shorten
          </Button>
        </div>
      </div>
    </Layout>
  );
}
