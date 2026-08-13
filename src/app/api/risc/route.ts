import { NextResponse } from 'next/server';
import { GoogleAuth } from 'google-auth-library';

export async function POST(request: Request) {
  try {
    // 1. Google Auth හරහා OIDC ටෝකන් එක ලබා ගැනීම
    const auth = new GoogleAuth({
      keyFile: 'path.join(process.cwd(), "service-account.key.json")', // ඔබේ සේවා ගිණුමේ JSON ෆයිල් එකේ නිවැරදි මාර්ගය (path) මෙතනට දෙන්න
      scopes: ['https://www.googleapis.com/auth/risc'],
    });

    const client = await auth.getIdTokenClient('https://risc.googleapis.com/');
    const token = client.credentials.id_token;

    // 2. RISC stream configuration API එක වෙත POST ඉල්ලීම යැවීම
    const riscResponse = await fetch('https://risc.googleapis.com/v1beta/stream:update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        delivery: {
          delivery_method: 'https://schemas.openid.net/secevent/risc/delivery-method/push',
          url: 'https://pastpaperzone.lk/risc', // ඔබේ සැබෑ වෙබ් අඩවි එන්ඩ්පොයින්ට් එක මෙතනට දාන්න
        },
        events_requested: [
          'https://schemas.openid.net/secevent/risc/event-type/account-disabled',
          'https://schemas.openid.net/secevent/risc/event-type/account-enabled',
        ],
      }),
    });

    if (!riscResponse.ok) {
      const errorData = await riscResponse.json();
      return NextResponse.json({ success: false, error: errorData }, { status: riscResponse.status });
    }

    const data = await riscResponse.json();
    return NextResponse.json({ success: true, data });

  } catch (error: any) {
    console.error('Error configuring RISC stream:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}