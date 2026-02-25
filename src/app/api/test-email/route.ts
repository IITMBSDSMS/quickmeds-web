import { NextResponse } from "next/server";
import { sendEmail } from "../../lib/email";

export async function GET() {
  try {
    await sendEmail({
      to: "india@quickmedsofficial.com",
      subject: "QuickMeds Email Test 🚀",
      html: "<h1>Email system is working!</h1>",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error });
  }
}