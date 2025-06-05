import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";
const websiteURL = import.meta.env.VITE_WEBSITE_URL;
export default function Home() {
  const [code, setCode] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setIsLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const url = code ? websiteURL + "/" + code : undefined;
  const inputRef = useRef<HTMLInputElement>(null);
  console.debug(import.meta.env);
  useEffect(() => {
    if (url && inputRef.current) inputRef.current.value = url;
  }, [url]);

  return (
    <Layout>
      <div className="grid items-center justify-items-center min-h-full mt-48">
        <h1 className="!mb-1">Shortly</h1>
        <p>A simple fast URL shortener</p>
        <form
          className="flex max-sm:flex-col gap-1 min-w-full justify-center px-5"
          onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            console.debug("form submit", e);
            const headers = new Headers();
            headers.set("Content-Type", "application/json");
            try {
              setIsLoading(true);
              const response = await fetch(
                `/create?url=${formData.get("url")}`,
                {
                  method: "POST",
                }
              );
              if (response.ok) {
                const body = await response.json();
                setCode(body.code);
              } else setError(response.statusText);
            } catch (error) {
              console.debug(error);
            } finally {
              setIsLoading(false);
            }
          }}
        >
          <Input
            type="url"
            ref={inputRef}
            name="url"
            autoComplete="off"
            required
            onChange={(e) => {
              if (url) {
                if (e.target.value.includes(url))
                  e.target.value = e.target.value.replace(url, "");
                else e.target.value = "";
              }
              setCode("");
            }}
            onClick={(e) => {
              if (url) (e.target as HTMLInputElement).select();
            }}
            className="max-w-xl grow"
            placeholder="https://example.com/very/long/url/to/shorten"
          />
          {!url ? (
            <Button
              type="submit"
              variant="default"
              className="cursor-pointer disabled:opacity-70"
              disabled={loading}
              onClick={() => {}}
            >
              {!loading ? "Shorten" : "Loading..."}
            </Button>
          ) : (
            <Button
              type="button"
              variant="default"
              className="cursor-pointer disabled:opacity-70"
              onClick={() => {
                navigator.clipboard.writeText(url).then().catch();
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 1500);
              }}
            >
              {!copied ? "Copy" : "Copied!"}
            </Button>
          )}
        </form>
        <p className="text-red-500">{error}</p>
      </div>
    </Layout>
  );
}
