import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function Contact() {
  return (
    <section className="pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold">Get in Touch</h1>
          <p className="mt-6 text-xl text-slate-300">
            We reply within 1 business hour (Nairobi time)
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Contact Info</h3>
              <p className="text-slate-400">Westlands, Nairobi, Kenya</p>
              <p className="text-teal-500 text-xl font-medium mt-2">
                +254 7XX XXX XXX
              </p>
              <p className="text-slate-400">hello@corbantech.co.ke</p>
            </div>
            <div>
              <Button
                asChild
                className="w-full bg-green-600 hover:bg-green-700"
              >
                <a href="https://wa.me/2547XXXXXXXX">Chat on WhatsApp</a>
              </Button>
            </div>
          </div>

          <form className="space-y-6">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="John Doe" className="mt-2" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@sacco.co.ke"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                rows={6}
                placeholder="Tell us about your project..."
                className="mt-2"
              />
            </div>
            <Button
              type="submit"
              size="lg"
              className="w-full bg-teal-600 hover:bg-teal-700"
            >
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
