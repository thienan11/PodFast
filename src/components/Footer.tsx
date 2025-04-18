import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t py-6 bg-background">
      <div className="container flex flex-col items-center justify-center">
        <p className="text-center text-sm leading-loose text-muted-foreground">
          Built by
          <Link
            href="https://github.com/thienan11"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 font-medium text-primary hover:underline"
          >
            Thien An Tran
          </Link>
        </p>
      </div>
    </footer>
  );
}
