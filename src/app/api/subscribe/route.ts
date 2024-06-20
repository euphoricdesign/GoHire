import { NextRequest, NextResponse } from "next/server";
import mailchimp from "@mailchimp/mailchimp_marketing";

// Asegúrate de que las variables de entorno están definidas
const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY as string;
const MAILCHIMP_API_SERVER = process.env.MAILCHIMP_API_SERVER as string;
const MAILCHIMP_LIST_ID = process.env.MAILCHIMP_LIST_ID as string;

mailchimp.setConfig({
  apiKey: MAILCHIMP_API_KEY,
  server: MAILCHIMP_API_SERVER,
});

type Data = { error?: string; message?: string };

export const POST = async (req: NextRequest) => {
  if (req.method !== "POST") {
    const errorMessage = JSON.stringify({ error: "Method Not Allowed" });
    return new NextResponse(errorMessage, { status: 405 });
  }

  const { email = "" } = await req.json();

  if (!email) {
    const errorMessage = JSON.stringify({ error: "El correo electrónico es requerido" });
    return new NextResponse(errorMessage, { status: 400 });
  }

  try {
    await mailchimp.lists.addListMember(MAILCHIMP_LIST_ID, {
      email_address: email,
      status: "subscribed",
    });
    const successMessage = JSON.stringify({ message: "Te has suscrito correctamente" });
    return new NextResponse(successMessage, { status: 201 });
  } catch (error) {
    console.error("Error subscribing to Mailchimp:", error);
    const errorMessage = JSON.stringify({ error: "Ocurrió un error. Intenta de nuevo." });
    return new NextResponse(errorMessage, { status: 500 });
  }
};
