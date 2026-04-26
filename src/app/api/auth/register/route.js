import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { dbConnect, collections } from '@/lib/dbConnect';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ message: 'All fields are required.' }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ message: 'Password must be at least 6 characters long.' }, { status: 400 });
    }

    const emailLower = email.toLowerCase();
    const usersCollection = await dbConnect(collections.USERS);
    const existingUser = await usersCollection.findOne({ email: emailLower });

    if (existingUser) {
      return NextResponse.json({ message: 'Email is already registered.' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await usersCollection.insertOne({
      name,
      email: emailLower,
      password: hashedPassword,
      provider: 'credentials',
      image: null,
      emailVerified: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json({ message: 'Registration successful.' }, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ message: 'Unable to register. Please try again.' }, { status: 500 });
  }
}
