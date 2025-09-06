import LinkList from "@/components/LinkList";
import CreateLinkForm from "@/components/CreateLinkForm";
import QRGenerator from "@/components/QRGenerator";
import AuthButton from "@/components/AuthButton";

export default function Home() {
  return (
    <main className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold tracking-tight">Short & QR</h1>
        <AuthButton />
      </div>
      <p className="text-sm text-foreground/70">
        Login with Google, create short links and generate QR codes (URL, TEXT, WIFI).
      </p>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 space-y-6">
          <CreateLinkForm />
          <LinkList />
        </div>
        <div className="w-full lg:w-[420px]">
          <QRGenerator />
        </div>
      </div>
    </main>
  );
}
