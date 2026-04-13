import OpenAI from "openai";

// Make sure to set OPENAI_API_KEY in your .env.local
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

export async function processWhatsAppMessage(
  messageText: string,
  senderPhone: string,
  handleOrderPlacement: (details: { medicines: string[]; name: string; address: string; city: string; pincode: string }) => Promise<string>
) {
  const systemPrompt = `
You are the AI Assistant for QuickMeds, a healthcare pharmacy app.
Your features:
1. When a user describes their symptoms, suggest possible non-prescriptive, over-the-counter (OTC) medicines.
2. ALWAYS include a disclaimer that you are not a doctor, and they should consult a healthcare professional for serious conditions.
3. If the user wants to order a suggested medicine, you MUST ask for their: Name, Address, City, and Pincode if they haven't provided them.
4. Once you have the medicine name(s), user Name, Address, City, and Pincode, you MUST call the "place_order" tool to finalize the order.
5. Provide a helpful, clear, and polite conversational response.
`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Using gpt-4o-mini for cost-effective speed
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: messageText },
      ],
      tools: [
        {
          type: "function",
          function: {
            name: "place_order",
            description: "Places an order for medicines once all user details are collected.",
            parameters: {
              type: "object",
              properties: {
                medicines: {
                  type: "array",
                  items: { type: "string" },
                  description: "List of medicines to order",
                },
                name: { type: "string", description: "Customer's full name" },
                address: { type: "string", description: "Delivery address" },
                city: { type: "string", description: "Delivery city" },
                pincode: { type: "string", description: "Delivery pincode" },
              },
              required: ["medicines", "name", "address", "city", "pincode"],
            },
          },
        },
      ],
      tool_choice: "auto",
    });

    const completionMessage = response.choices[0].message;

    // Check if the AI decided to call a tool (place_order)
    if (completionMessage.tool_calls && completionMessage.tool_calls.length > 0) {
      const toolCall = completionMessage.tool_calls[0];
      if (toolCall.function.name === "place_order") {
        const orderDetails = JSON.parse(toolCall.function.arguments);
        
        // Execute the mock or actual order placement logic passed from the webhook
        const orderStatusMessage = await handleOrderPlacement(orderDetails);
        
        return `✅ *Order Processed*\n${orderStatusMessage}\n\nOur team will be in touch! Is there anything else you need?`;
      }
    }

    // Default return of standard text chat
    return completionMessage.content || "I'm sorry, I couldn't process your request right now. Please try again later.";
  } catch (error) {
    console.error("OpenAI Error:", error);
    return "I'm experiencing some technical difficulties right now. Please try again later or contact our support team.";
  }
}
