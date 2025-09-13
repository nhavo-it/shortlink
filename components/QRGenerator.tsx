"use client";
import React, { useEffect, useRef, useState, ChangeEvent } from "react";
import QRCodeStyling, { Options, FileExtension } from "qr-code-styling";

export default function QRGenerator({ value }: { value: string }) {
  const [options, setOptions] = useState<Options>({
    width: 380,
    height: 380,
    type: "svg",
    data: value || " ",
    margin: 10,
    qrOptions: {
      typeNumber: 0,
      mode: "Byte",
      errorCorrectionLevel: "Q",
    },
    imageOptions: {
      hideBackgroundDots: true,
      imageSize: 0.4,
      margin: 20,
      crossOrigin: "anonymous",
      saveAsBlob: true,
    },
    dotsOptions: {
      color: "#222222",
    },
    backgroundOptions: {
      color: "#FFF",
    },
  });

  const [fileExt, setFileExt] = useState<FileExtension>("svg");
  const [qrCode, setQrCode] = useState<QRCodeStyling>();
  const ref = useRef<HTMLDivElement>(null);

  // Khởi tạo QRCodeStyling
  useEffect(() => {
    const qr = new QRCodeStyling(options);
    setQrCode(qr);
  }, []);

  // Append QR vào DOM
  useEffect(() => {
    if (ref.current && qrCode) {
      qrCode.append(ref.current);
    }
  }, [qrCode]);

  // Cập nhật QR code khi options đổi
  useEffect(() => {
    if (qrCode) {
      qrCode.update(options);
    }
  }, [qrCode, options]);

  // 🚀 Debounce update khi value đổi
  useEffect(() => {
    if (!value) return;

    const handler = setTimeout(() => {
      setOptions((prev) => ({
        ...prev,
        data: value,
      }));
    }, 500); // ⏱ 300ms sau khi ngừng gõ

    return () => clearTimeout(handler); // cleanup nếu user tiếp tục gõ
  }, [value]);

  const onExtensionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setFileExt(event.target.value as FileExtension);
  };

  const onDownloadClick = () => {
    if (!qrCode) return;
    qrCode.download({
      extension: fileExt,
    });
  };

  return (
    <div>
      <div ref={ref} className="flex items-center justify-center bg-white" />

      <div className="mt-6 flex items-center gap-3">
        <select
          onChange={onExtensionChange}
          value={fileExt}
          className="w-28 rounded-sm text-gray-700 border border-gray-300 px-2 py-1 text-sm shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-400"
        >
          <option value="svg">SVG</option>
          <option value="png">PNG</option>
          <option value="jpeg">JPEG</option>
          <option value="webp">WEBP</option>
        </select>

        <button
          onClick={onDownloadClick}
          className="w-full rounded-sm bg-green-500 px-4 py-2 text-lg font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm"
        >
          TẢI XUỐNG
        </button>
      </div>
    </div>
  );
}
