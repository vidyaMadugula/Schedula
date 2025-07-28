import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  if (email === 'vidya@email.com' && password === '12345') {
    return NextResponse.json({ token: 'mock-token' });
  }
  return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
}
