//@ts-nocheck
import React, { useCallback, useState } from "react";
import QrScanner from "react-qr-scanner";
import { TakeAttendanceByQRCode } from "@/lib/actions/attendance.action";

const QRScannerComponent = () => {
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleScan = useCallback(async (data: string | null) => {
    if (data) {
      setResult(data);
      setLoading(true);
      setError(null);
      setSuccessMessage(null);

      try {
        const response = await TakeAttendanceByQRCode(data?.text);
        if (response.success) {
          setSuccessMessage("Attendance recorded successfully!");
        } else {
          setError(response.message || "Failed to record attendance.");
        }
      } catch (err) {
        console.error(err);
        setError("An error occurred while processing your request.");
      } finally {
        setLoading(false);
      }
    }
  }, []);

  const handleError = (err: any) => {
    console.error(err);
    setError("Error reading QR code.");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Scan QR Code</h1>
      <div className="w-full max-w-md">
        <QrScanner
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ width: "100%" }}
        />
      </div>
      {loading && <p className="mt-4 text-lg">Processing...</p>}
      {error && <p className="mt-4 text-lg text-red-500">{error}</p>}
      {successMessage && <p className="mt-4 text-lg text-green-500">{successMessage}</p>}
    </div>
  );
};

export default QRScannerComponent;
