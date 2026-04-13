import twilio from "twilio";

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!
);

// Format Indian number properly
function formatIndianNumber(phone: string) {
  const cleaned = phone.replace(/\D/g, "");

  if (cleaned.startsWith("91")) {
    return `+${cleaned}`;
  }

  return `+91${cleaned}`;
}

// 🔹 Send message to customer
export async function sendWhatsAppMessage(
  to: string,
  name: string,
  orderId: string,
  status?: string
) {
  try {
    const formattedNumber = formatIndianNumber(to);

    let message = "";

    if (!status || status === "Pending") {
      message = `Hi ${name} 👋

Your QuickMeds order has been received.
Order ID: ${orderId}

Our pharmacist is verifying your prescription.`;
    } else {
      message = `Hi ${name} 👋

Your QuickMeds order status has been updated.

Order ID: ${orderId}
New Status: ${status}

Thank you for choosing QuickMeds 💚`;
    }

    await client.messages.create({
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
      to: `whatsapp:${formattedNumber}`,
      body: message,
    });

  } catch (error) {
    console.error("Customer WhatsApp Error:", error);
  }
}

// 🔹 Send message to admin
export async function sendAdminNotification(
  name: string,
  phone: string,
  city: string,
  pincode: string,
  orderId: string
) {
  try {
    const formattedNumber = formatIndianNumber(phone);

    await client.messages.create({
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
      to: `whatsapp:${formattedNumber}`,
      body: `🚨 New Order Received

Name: ${name}
Phone: ${phone}
City: ${city}
Pincode: ${pincode}
Order ID: ${orderId}`,
    });

  } catch (error) {
    console.error("Admin WhatsApp Error:", error);
  }
}