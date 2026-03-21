import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { BottomNavigation } from "@/components/BottomNavigation";
import { BackButton } from "@/components/BackButton";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <BackButton />
      <main className="pt-20 pb-24">
        <div className="max-w-lg mx-auto px-4">
          <SectionHeader title="Contact Us" />
          
          <div className="space-y-3 mt-6">
            <a href="tel:+2348061723069" className="flex items-center gap-3 bg-card border border-border rounded-xl p-4">
              <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                <Phone className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Call Us</p>
                <p className="font-medium text-foreground">08061723069</p>
              </div>
            </a>
            <a href="mailto:info.timakcentre@gmail.com" className="flex items-center gap-3 bg-card border border-border rounded-xl p-4">
              <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                <Mail className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email Us</p>
                <p className="font-medium text-foreground">info.timakcentre@gmail.com</p>
              </div>
            </a>
            <div className="flex items-center gap-3 bg-card border border-border rounded-xl p-4">
              <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Visit Us</p>
              <p className="font-medium text-foreground">ITA-ALAMU, Ajase-Ipo Road, Ilorin</p>
              </div>
            </div>

            {/* Google Map Embed */}
            <div className="mt-6 rounded-2xl overflow-hidden border border-border">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3946.0!2d4.55!3d8.49!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOCswMCcwMC4wIk4gNCswMCcwMC4wIkU!5e0!3m2!1sen!2sng!4v1"
                width="100%"
                height="220"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="TIMAK CENTRE Location"
              />
              <a
                href="https://maps.app.goo.gl/7rZSzuf8GNTPWXgP6"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 bg-card text-accent font-medium text-sm hover:bg-accent/10 transition-colors"
              >
                <MapPin className="w-4 h-4" />
                Open in Google Maps
              </a>
            </div>
          </div>

          <h3 className="font-semibold text-foreground mt-8 mb-4">Send a Message</h3>
          <form className="space-y-4">
            <Input placeholder="Your Name" className="bg-card border-border" />
            <Input type="email" placeholder="Your Email" className="bg-card border-border" />
            <Textarea placeholder="Your Message" rows={4} className="bg-card border-border" />
            <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
              Send Message
            </Button>
          </form>
        </div>
      </main>
      <Footer />
      <BottomNavigation />
    </div>
  );
}
