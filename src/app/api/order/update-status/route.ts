import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

import { sendWhatsAppMessage } from "@/lib/whatsapp";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string
);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { order_id, status } = body;

    if (!order_id || !status) {
      return NextResponse.json({ success: false }, { status: 400 });
    }

    // 1️⃣ Fetch existing order to get old status
    const { data: existingOrder, error: fetchError } = await supabase
      .from("orders")
      .select("*")
      .eq("order_id", order_id)
      .single();

    if (fetchError || !existingOrder) {
      return NextResponse.json({ success: false }, { status: 404 });
    }

    const old_status = existingOrder.status;

    // 2️⃣ Update order status
    const { data, error } = await supabase
      .from("orders")
      .update({ status })
      .eq("order_id", order_id)
      .select();

    if (error || !data?.length) {
      return NextResponse.json({ success: false }, { status: 400 });
    }

    const order = data[0];

    // 3️⃣ Insert log entry
   const { error: logError } = await supabase
  .from("order_logs")
  .insert({
    order_id: existingOrder.id,
    old_status: old_status,
    new_status: status,
    shop_id: existingOrder.shop_id,
    changed_by: null,
    created_at: new Date()
  });

if (logError) {
  console.error("Log insert failed:", logError);
}

    // 4️⃣ Send WhatsApp update to customer (non-blocking)
    try {
      await sendWhatsAppMessage(
        order.phone,
        order.name,
        order.order_id,
        status
      );
    } catch (waError) {
      console.error("WhatsApp failed:", waError);
    }

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error("Update status error:", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}