"use client";
import { QRCodeStyling } from "@liquid-js/qr-code-styling";
import { useEffect, useRef, useState } from "react";

const QRCodePage = ({ patientID }) => {
  const ref = useRef(null);

  const [qrCode] = useState(() => {
    const baseUrl =
      typeof window !== "undefined"
        ? window.location.origin
        : "http://localhost:3000"; // Fallback pour SSR
    const options = {
      data: `${baseUrl}/dashboard/view/patient/${patientID.patientID}`,
      image: "/images/logo/logo_1.svg",
      dotsOptions: {
        color: "#0F5CEC",
        size: 4,
        type: "small-square",
      },
      backgroundOptions: {
        color: "#e9ebee",
        margin: 1,
      },
      imageOptions: {
        crossOrigin: "anonymous",
        margin: 1,
        imageSize: 0.5,
      },
      cornersSquareOptions: {
        color: "#0D54D8",
        type: "extra-rounded",
      },
      cornersDotOptions: {
        color: "#F50C0C",
        type: "dot",
      },
    };

    return new QRCodeStyling(options);
  });

  useEffect(() => {
    if (ref.current) {
      qrCode.append(ref.current);
    }
  }, [qrCode, ref]);

  return <div ref={ref} className="p-1 rounded border m-2"></div>;
};

export default QRCodePage;
