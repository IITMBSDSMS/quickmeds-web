import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendWhatsAppMessage, sendAdminNotification } from "@/lib/whatsapp";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    return NextResponse.json(
      { success: false, message: "Supabase connection is not defined." },
      { status: 500 }
    );
  }
  
  const supabase = createClient(url, key);

  try {
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;
    const address = formData.get("address") as string;
    const city = formData.get("city") as string;
    const pincode = formData.get("pincode") as string;
    const medicines = JSON.parse(
      (formData.get("medicines") as string) || "[]"
    );
    const file = formData.get("prescription") as File | null;

    if (!name || !phone || !address || !city || !pincode) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const normalizedPincode = String(pincode).trim();
    const normalizedPhone = String(phone).trim();

    // 🔍 Auto-assign shop by pincode
    const { data: shop, error: shopError } = await supabase
      .from("shops")
      .select("id")
      .eq("pincode", normalizedPincode)
      .maybeSingle();

    if (shopError || !shop) {
      return NextResponse.json(
        { success: false, message: "No pharmacy available for this pincode" },
        { status: 400 }
      );
    }

    // 📤 Upload prescription (if provided)
    let prescriptionPath: string | null = null;

    if (file) {
      const fileName = `public/order-${Date.now()}-${file.name}`;

      const { data: uploadData, error: uploadError } =
        await supabase.storage
          .from("prescriptions")
          .upload(fileName, file);

      if (uploadError) {
        console.error("Upload error:", uploadError);
        return NextResponse.json(
          { success: false, message: "Prescription upload failed", error: uploadError.message },
          { status: 400 }
        );
      } else {
        prescriptionPath = uploadData.path;
      }
    }

    // 📝 Insert order
    const { data, error } = await supabase
      .from("orders")
      .insert([
        {
          order_id: crypto.randomUUID(),
          name,
          phone: normalizedPhone,
          address,
          city,
          pincode: normalizedPincode,
          medicines,
          prescription_url: prescriptionPath,
          payment_method: "COD",
          status: "Pending",
          shop_id: shop.id,
        },
      ])
      .select()
      .single();

    if (error || !data) {
      console.error("Order insert error:", error);
      return NextResponse.json(
        { success: false, message: "Order creation failed", error: error?.message },
        { status: 400 }
      );
    }

    // ✅ Send customer message
    await sendWhatsAppMessage(
      normalizedPhone,
      name,
      data.order_id,
      "Pending"
    );

    // ✅ Send admin notification
    await sendAdminNotification(
      name,
      normalizedPhone,
      city,
      normalizedPincode,
      data.order_id
    );

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}