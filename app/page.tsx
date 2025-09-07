import LinkList from "@/components/LinkList";
import CreateLinkForm from "@/components/CreateLinkForm";
import QRGenerator from "@/components/QRGenerator";

export default function Home() {
  return (
    <main className="pt-10 space-y-6">
      <p className="text-sm text-foreground/70">
        Đăng nhập bằng Google để tạo liên kết rút gọn và sinh mã QR cho nhiều
        mục đích khác nhau: URL, văn bản, thông tin WiFi… Dễ dàng chia sẻ, quét
        nhanh và sử dụng thuận tiện trên mọi thiết bị.
      </p>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 space-y-6">
          <CreateLinkForm />
        </div>
        <div className="w-full lg:w-[420px]">
          <QRGenerator />
        </div>
      </div>
      <div>
        <LinkList />
      </div>
    </main>
  );
}
