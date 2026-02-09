import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { BottomNavigation } from "@/components/BottomNavigation";
import { BackButton } from "@/components/BackButton";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { Clock, MapPin } from "lucide-react";

const menuHighlights = [
  { name: "Jollof Rice Special", description: "Signature Nigerian jollof with grilled chicken", price: "₦5,500" },
  { name: "Pepper Soup", description: "Spicy catfish pepper soup", price: "₦4,000" },
  { name: "Suya Platter", description: "Assorted grilled meat with spices", price: "₦6,500" },
  { name: "Continental Breakfast", description: "Eggs, toast, bacon & fresh juice", price: "₦4,500" },
];

export default function Restaurant() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <BackButton />
      <main className="pt-20 pb-24">
        <div className="max-w-lg mx-auto px-4">
          <SectionHeader title="Restaurant" />
          
          <div className="bg-card border border-border rounded-2xl p-5 mt-6">
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Clock className="w-4 h-4 text-accent" />
              <span>Open Daily: 8:00 AM - 10:00 PM</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground text-sm mt-2">
              <MapPin className="w-4 h-4 text-accent" />
              <span>Ground Floor, TIMAK Centre</span>
            </div>
          </div>

          <h3 className="font-semibold text-foreground mt-8 mb-4">Menu Highlights</h3>
          <div className="space-y-3">
            {menuHighlights.map((item) => (
              <div
                key={item.name}
                className="bg-card border border-border rounded-xl p-4 flex justify-between items-start"
              >
                <div>
                  <h4 className="font-medium text-foreground">{item.name}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                </div>
                <span className="text-accent font-semibold shrink-0">{item.price}</span>
              </div>
            ))}
          </div>

          <Button className="w-full mt-6 bg-accent hover:bg-accent/90 text-accent-foreground">
            Reserve a Table
          </Button>
        </div>
      </main>
      <Footer />
      <BottomNavigation />
    </div>
  );
}
