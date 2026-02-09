import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { BottomNavigation } from "@/components/BottomNavigation";
import { BackButton } from "@/components/BackButton";
import { SectionHeader } from "@/components/SectionHeader";

// Gallery images - add more images here as needed
import eventHall1 from "@/assets/gallery/event-hall-1.jpg";
import eventHall2 from "@/assets/gallery/event-hall-2.jpg";
import eventHall3 from "@/assets/gallery/event-hall-3.jpg";
import birthdayStage from "@/assets/gallery/birthday-stage.jpg";
import ceilingDecor from "@/assets/gallery/ceiling-decor.jpg";
import hallOverview from "@/assets/gallery/hall-overview.jpg";
import chandelier from "@/assets/gallery/chandelier.jpg";
import weddingSetup1 from "@/assets/gallery/wedding-setup-1.jpg";
import weddingSetup2 from "@/assets/gallery/wedding-setup-2.jpg";

const galleryImages = [
  { id: 1, title: "Grand Hall Setup", category: "Events", image: eventHall1 },
  { id: 2, title: "Red Carpet Aisle", category: "Events", image: eventHall2 },
  { id: 3, title: "Birthday Celebration", category: "Birthday", image: birthdayStage },
  { id: 4, title: "Elegant Seating", category: "Events", image: eventHall3 },
  { id: 5, title: "Ceiling Ambiance", category: "Venue", image: ceilingDecor },
  { id: 6, title: "Hall Overview", category: "Venue", image: hallOverview },
  { id: 7, title: "Crystal Chandelier", category: "Venue", image: chandelier },
  { id: 8, title: "Wedding Reception", category: "Wedding", image: weddingSetup1 },
  { id: 9, title: "Wedding Venue", category: "Wedding", image: weddingSetup2 },
];

export default function Gallery() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <BackButton />
      <main className="pt-20 pb-24">
        <div className="max-w-lg mx-auto px-4">
          <SectionHeader title="Gallery" />
          <div className="grid grid-cols-2 gap-3 mt-6">
            {galleryImages.map((item) => (
              <div
                key={item.id}
                className="aspect-square bg-card border border-border rounded-xl overflow-hidden relative group"
              >
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-xs text-accent font-medium">{item.category}</p>
                  <p className="text-sm text-white font-semibold truncate">{item.title}</p>
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
