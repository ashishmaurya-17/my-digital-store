import Razorpay from "razorpay";
import { NextResponse } from "next/server";

export async function POST(request) {
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  const body = await request.json();

  const options = {
    amount: body.amount * 100, // Amount in paisa
    currency: "INR",
    receipt: "receipt_" + Math.random().toString(36).substring(7),
  };

  try {
    const order = await razorpay.orders.create(options);
    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}