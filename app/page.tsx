
import CreateLinkForm from "@/components/CreateLinkForm";
import QRGenerator from "@/components/QRGenerator";
export default function Home() {
  return (
    <main className="mt-10 space-y-6 rounded-md bg-white shadow-md bg-white">
      <div className="flex flex-col lg:flex-row">
        <div className="flex-1 space-y-6 bg-gray-100 p-10">
          <CreateLinkForm />
        </div>
        <div className="w-full lg:w-[420px] p-10">
          <QRGenerator />
        </div>
      </div>
    </main>
  );
}
