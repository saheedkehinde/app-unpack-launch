import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { BottomNavigation } from "@/components/BottomNavigation";
import { BackButton } from "@/components/BackButton";
import { SectionHeader } from "@/components/SectionHeader";
import { Sparkles, Users, Utensils, Building2 } from "lucide-react";

const services = [
  {
    icon: Sparkles,
    title: "Event Halls",
    description: "Elegant spaces for weddings, conferences, and celebrations",
  },
  {
    icon: Users,
    title: "Corporate Events",
    description: "Professional venues for meetings and business gatherings",
  },
  {
    icon: Utensils,
    title: "Fine Dining",
    description: "Exquisite culinary experiences for every occasion",
  },
  {
    icon: Building2,
    title: "Lodging",
    description: "Comfortable rooms for overnight stays",
  },
];

export default function Services() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <BackButton />
      <main className="pt-20 pb-24">
        <div className="max-w-lg mx-auto px-4">
          <SectionHeader title="Our Services" />
          <div className="grid gap-4 mt-6">
            {services.map((service) => (
              <div
                key={service.title}
                className="bg-card border border-border rounded-2xl p-6 flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center shrink-0">
                  <service.icon className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{service.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <BottomNavigation />
    </div>
  );
}
