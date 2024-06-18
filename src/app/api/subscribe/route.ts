import { NextResponse } from 'next/server';
import mailchimp from '@mailchimp/mailchimp_marketing';

// Asegúrate de que las variables de entorno están definidas
const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY as string;
const MAILCHIMP_API_SERVER = process.env.MAILCHIMP_API_SERVER as string;
const MAILCHIMP_LIST_ID = process.env.MAILCHIMP_LIST_ID as string;

mailchimp.setConfig({
  apiKey: MAILCHIMP_API_KEY,
  server: MAILCHIMP_API_SERVER,
});

export async function POST(request: Request) {
  const { email } = await request.json();

  if (!email) {
    return NextResponse.json({ error: 'El correo electrónico es requerido' }, { status: 400 });
  }

  try {
    await mailchimp.lists.addListMember(MAILCHIMP_LIST_ID, {
      email_address: email,
      status: 'subscribed',
    });

    return NextResponse.json({ error: '' }, { status: 201 });
  } catch (error) {
    let errorMessage = 'Unknown error';
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === 'string') {
      errorMessage = error;
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
