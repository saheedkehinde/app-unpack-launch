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
