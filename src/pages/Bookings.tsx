import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { BottomNavigation } from "@/components/BottomNavigation";
import { BackButton } from "@/components/BackButton";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { CalendarDays, Users, Clock } from "lucide-react";

const eventTypes = [
  { title: "Wedding Reception", capacity: "Up to 500 guests", price: "From ₦500,000" },
  { title: "Corporate Conference", capacity: "Up to 200 guests", price: "From ₦150,000" },
  { title: "Birthday Party", capacity: "Up to 100 guests", price: "From ₦80,000" },
  { title: "Private Dinner", capacity: "Up to 50 guests", price: "From ₦50,000" },
];

export default function Bookings() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <BackButton />
      <main className="pt-20 pb-24">
        <div className="max-w-lg mx-auto px-4">
          <SectionHeader title="Book an Event" />
          <div className="space-y-4 mt-6">
            {eventTypes.map((event) => (
              <div
                key={event.title}
                className="bg-card border border-border rounded-2xl p-5"
              >
                <h3 className="font-semibold text-foreground text-lg">{event.title}</h3>
                <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {event.capacity}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-accent font-semibold">{event.price}</span>
                  <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                    Book Now
                  </Button>
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
