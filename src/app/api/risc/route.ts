import { NextResponse } from 'next/server';
import { JWT } from 'google-auth-library';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    // 1. service-account.key.json ගොනුව කියවා ගැනීම
    const keyPath = path.join(process.cwd(), 'service-account.key.json');
    const keyFile = JSON.parse(fs.readFileSync(keyPath, 'utf8'));

    // 2. JWT ක්ලාස් එක භාවිතයෙන් client එක සකස් කිරීම
    const client = new JWT({
      email: keyFile.client_email,
      key: keyFile.private_key,
      scopes: ['https://www.googleapis.com/auth/risc'],
    });

    // 3. authorize() හරහා Access Token එක ලබා ගැනීම
    const tokens = await client.authorize();
    const token = tokens.access_token;

    if (!token) {
      throw new Error('Access token එක ලබා ගැනීමට නොහැකි විය.');
    }

    // 4. RISC stream configuration API එක වෙත POST ඉල්ලීම යැවීම
    const response = await fetch('https://risc.googleapis.com/v1/stream/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        delivery: {
          method: 'https://schemas.openid.net/secevent/risc/delivery-method/push',
          url: 'https://pastpaperzone.lk/api/risc',
        },
      }),
    });

    const data = await response.json();
    return NextResponse.json({ success: true, data });

  } catch (error: any) {
    console.error('RISC Error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}