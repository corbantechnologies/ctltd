import { NextResponse } from "next/server";
import { OffersNotificationTemplate } from "@/components/templates/offers-notification-template";
import { OffersTemplate } from "@/components/templates/offers-template";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const BUSINESS_EMAIL = process.env.BUSINESS_EMAIL || "";
const FROM_EMAIL = process.env.FROM_EMAIL || "";
const ALTERNATE_EMAIL = process.env.ALTERNATE_EMAIL || "";

export async function POST(req: Request) {
  try {
    const { userName, phone, whatsapp, email, offerTitle, offerSlug } = await req.json();

    // 1. Send notification to Business Team
    await resend.emails.send({
      from: `Offers Portal <${FROM_EMAIL}>`,
      to: [BUSINESS_EMAIL, ALTERNATE_EMAIL],
      subject: `New Offer Claim: ${offerTitle} from ${userName}`,
      react: OffersNotificationTemplate({
        userName,
        phone,
        whatsapp,
        email,
        offerTitle,
        offerSlug,
      }),
    });

    // 2. Send acknowledgement to User (if email provided)
    if (email) {
      await resend.emails.send({
        from: `Corban Technologies <${FROM_EMAIL}>`,
        to: [email],
        subject: `We've received your claim for: ${offerTitle}`,
        react: OffersTemplate({
          userName,
          offerTitle,
        }),
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Resend API Error:", error);
    return NextResponse.json(
      { error: "Failed to send notification" },
      { status: 500 }
    );
  }
}
