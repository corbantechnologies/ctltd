import { OffersNotificationTemplate } from "@/components/templates/offers-notification-template";
import { OffersTemplate } from "@/components/templates/offers-template";

import {Resend} from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
