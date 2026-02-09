import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { BottomNavigation } from "@/components/BottomNavigation";
import { BackButton } from "@/components/BackButton";
import { SectionHeader } from "@/components/SectionHeader";

const galleryImages = [
  { id: 1, title: "Grand Hall", category: "Venue" },
  { id: 2, title: "Wedding Setup", category: "Events" },
  { id: 3, title: "Restaurant Interior", category: "Dining" },
  { id: 4, title: "Conference Room", category: "Corporate" },
  { id: 5, title: "Luxury Suite", category: "Lodging" },
  { id: 6, title: "Outdoor Garden", category: "Venue" },
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
            {galleryImages.map((image) => (
              <div
                key={image.id}
                className="aspect-square bg-card border border-border rounded-xl overflow-hidden relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <p className="text-xs text-accent font-medium">{image.category}</p>
                  <p className="text-sm text-white font-semibold">{image.title}</p>
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
