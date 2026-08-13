import { NextResponse } from 'next/server';
import { GoogleAuth } from 'google-auth-library';
import path from 'path';

export async function POST(request: Request) {
  try {
    // 1. Google Auth හරහා service account එක පාවිච්චි කරලා access token එක ලබා ගැනීම
    const auth = new GoogleAuth({
      keyFile: path.join(process.cwd(), 'service-account.key.json'),
      scopes: ['https://www.googleapis.com/auth/risc'],
    });

    const client = await auth.getClient();
    
    // OAuth 2.0 access token එක ලබා ගැනීම
    const accessTokenResponse = await client.getAccessToken();
    const token = accessTokenResponse.token;

    if (!token) {
      throw new Error('Access token එක ලබා ගැනීමට නොහැකි විය.');
    }

    // 2. RISC stream configuration API එක වෙත POST ඉල්ලීම යැවීම
    const riscResponse = await fetch('https://risc.googleapis.com/v1/stream/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        // ඔයාගේ delivery configuration මෙතනට දාන්න
        delivery: {
          method: 'https://schemas.openid.net/secevent/risc/delivery-method/push',
          url: 'https://pastpaperzone.lk/api/risc',
        },
      }),
    });

    const data = await riscResponse.json();
    return NextResponse.json({ success: true, data });

  } catch (error: any) {
    console.error('RISC Error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}