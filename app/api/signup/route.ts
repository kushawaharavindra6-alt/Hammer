import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password, role } = body;

    const dbUrl = process.env.DATABASE_URL;
    if (!dbUrl) {
      return NextResponse.json({ error: "DATABASE_URL missing" }, { status: 500 });
    }

    const sql = neon(dbUrl);

    await sql`
      INSERT INTO users (name, email, password, role) 
      VALUES (${name}, ${email}, ${password}, ${role})
    `;

    return NextResponse.json({ message: "Success" }, { status: 201 });
  } catch (error: any) {
    console.error("DB Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: "Signup API is active" });
}
