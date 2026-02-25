import { NextResponse } from "next/server";
import { sendEmail } from "../../lib/email";

export async function POST(req: Request) {
  try {
    const { name, phone, address, city, pincode, hasPrescription } =
      await req.json();

    await sendEmail({
      to: "india@quickmedsofficial.com",
      subject: "🚨 New Medicine Order",
      html: `
        <h2>New Order Received</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Address:</strong> ${address}</p>
        <p><strong>City:</strong> ${city}</p>
        <p><strong>Pincode:</strong> ${pincode}</p>
        <p><strong>Prescription Uploaded:</strong> ${
          hasPrescription ? "Yes" : "No"
        }</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false });
  }
}