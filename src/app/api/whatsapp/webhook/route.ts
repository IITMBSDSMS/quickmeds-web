import { NextResponse } from "next/server";
import { processWhatsAppMessage } from "@/lib/aiAssistant";

// 🔹 Webhook Verification (Required by Meta WhatsApp Cloud API)
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  const verifyToken = process.env.WHATSAPP_VERIFY_TOKEN;

  // Validate the token and return the challenge if they match
  if (mode === "subscribe" && token === verifyToken) {
    return new NextResponse(challenge, { status: 200 });
  }

  return new NextResponse("Forbidden", { status: 403 });
}

// 🔹 Incoming WhatsApp Messages handling
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Parse the payload based on Meta's WhatsApp Cloud API structure
    if (
      body.entry &&
      body.entry[0].changes &&
      body.entry[0].changes[0] &&
      body.entry[0].changes[0].value.messages &&
      body.entry[0].changes[0].value.messages[0]
    ) {
      const phoneNumberId = body.entry[0].changes[0].value.metadata.phone_number_id;
      const from = body.entry[0].changes[0].value.messages[0].from; // sender phone
      const msgBody = body.entry[0].changes[0].value.messages[0].text?.body;

      if (msgBody) {
        // Send to AI Assistant to process
        const replyText = await processWhatsAppMessage(msgBody, from, async (orderDetails) => {
          // This callback is triggered when the AI determines the user is placing an order
          // Since we are mocking order placement for the AI's MVP form:
          console.log(`[Order Intent Captured] Phone: ${from}`, orderDetails);
          
          return \`Order successfully processed for \${orderDetails.medicines.join(", ")}. It will be shipped to \${orderDetails.name} at \${orderDetails.address}, \${orderDetails.city} (\${orderDetails.pincode}).\`;
        });

        // 📤 Send response back to the user via WhatsApp Graph API
        const accessToken = process.env.WHATSAPP_CLOUD_ACCESS_TOKEN;
        const apiVersion = "v19.0"; // Adjust Meta Graph API version if necessary
        
        const res = await fetch(\`https://graph.facebook.com/\${apiVersion}/\${phoneNumberId}/messages\`, {
          method: "POST",
          headers: {
            "Authorization": \`Bearer \${accessToken}\`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messaging_product: "whatsapp",
            to: from,
            type: "text",
            text: { body: replyText }
          }),
        });

        if (!res.ok) {
          const errRes = await res.text();
          console.error("Failed to send WhatsApp message:", errRes);
        }
      }
    }

    // Always return 200 to acknowledge receipt of the message
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Webhook POST Error:", error);
    // Still return 200 so WhatsApp doesn't endlessly retry bad payloads
    return NextResponse.json({ success: false }, { status: 200 });
  }
}
