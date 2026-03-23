import { useState, useCallback } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { BottomNavigation } from "@/components/BottomNavigation";
import { BackButton } from "@/components/BackButton";
import { SectionHeader } from "@/components/SectionHeader";
import { Clock, MapPin, Star, ChevronRight, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { CartDrawer, type CartItem } from "@/components/CartDrawer";
import { toast } from "@/hooks/use-toast";

import pepperedSnails from "@/assets/food/peppered-snails.jpg";
import grilledPrawns from "@/assets/food/grilled-prawns.jpg";
import jollofRice from "@/assets/food/jollof-rice.jpg";
import poundedYam from "@/assets/food/pounded-yam.jpg";
import suyaPlatter from "@/assets/food/suya-platter.jpg";
import bbqRibs from "@/assets/food/bbq-ribs.jpg";
import mixedGrill from "@/assets/food/mixed-grill.jpg";
import freshJuice from "@/assets/food/fresh-juice.jpg";
import chapman from "@/assets/food/chapman.jpg";
import pepperSoup from "@/assets/food/pepper-soup.jpg";

type Category = "all" | "starters" | "main" | "grills" | "drinks";

interface MenuItem {
  name: string;
  description: string;
  price: string;
  priceNum: number;
  image: string;
  category: Category[];
  popular?: boolean;
}

const menuItems: MenuItem[] = [
  { name: "Peppered Snails", description: "Spicy pan-fried snails in rich pepper sauce", price: "₦4,500", priceNum: 4500, image: pepperedSnails, category: ["starters"], popular: true },
  { name: "Grilled Prawns", description: "Succulent prawns in garlic butter sauce", price: "₦6,500", priceNum: 6500, image: grilledPrawns, category: ["starters"], popular: true },
  { name: "Jollof Rice & Chicken", description: "Classic Nigerian party jollof with grilled chicken", price: "₦5,500", priceNum: 5500, image: jollofRice, category: ["main"], popular: true },
  { name: "Pounded Yam & Egusi", description: "Traditional pounded yam with egusi soup", price: "₦4,500", priceNum: 4500, image: poundedYam, category: ["main"], popular: true },
  { name: "Pepper Soup", description: "Spicy catfish pepper soup", price: "₦4,000", priceNum: 4000, image: pepperSoup, category: ["starters", "main"] },
  { name: "Suya Platter", description: "Spiced grilled beef skewers", price: "₦4,000", priceNum: 4000, image: suyaPlatter, category: ["grills"], popular: true },
  { name: "BBQ Ribs", description: "Tender ribs with signature BBQ sauce", price: "₦8,500", priceNum: 8500, image: bbqRibs, category: ["grills"], popular: true },
  { name: "Mixed Grill", description: "Selection of grilled meats and vegetables", price: "₦12,000", priceNum: 12000, image: mixedGrill, category: ["grills"] },
  { name: "Fresh Juice", description: "Orange, pineapple, or watermelon", price: "₦1,500", priceNum: 1500, image: freshJuice, category: ["drinks"] },
  { name: "Chapman", description: "Classic Nigerian cocktail mocktail", price: "₦2,500", priceNum: 2500, image: chapman, category: ["drinks"], popular: true },
];

const categories: { id: Category; label: string }[] = [
  { id: "all", label: "All" },
  { id: "starters", label: "Starters" },
  { id: "main", label: "Main Course" },
  { id: "grills", label: "Grills" },
  { id: "drinks", label: "Drinks" },
];

const popularItems = menuItems.filter((item) => item.popular);

export default function Restaurant() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [cart, setCart] = useState<CartItem[]>([]);

  const filteredItems = activeCategory === "all"
    ? menuItems
    : menuItems.filter((item) => item.category.includes(activeCategory));

  const addToCart = useCallback((item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.name === item.name);
      if (existing) {
        return prev.map((c) =>
          c.name === item.name ? { ...c, quantity: c.quantity + 1 } : c
        );
      }
      return [...prev, { name: item.name, price: item.price, priceNum: item.priceNum, quantity: 1, image: item.image }];
    });
    toast({ title: `${item.name} added`, description: "Item added to your order" });
  }, []);

  const updateQuantity = useCallback((name: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((c) => (c.name === name ? { ...c, quantity: c.quantity + delta } : c))
        .filter((c) => c.quantity > 0)
    );
  }, []);

  const removeFromCart = useCallback((name: string) => {
    setCart((prev) => prev.filter((c) => c.name !== name));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const getItemQuantity = (name: string) => cart.find((c) => c.name === name)?.quantity || 0;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <BackButton />
      <main className="pt-20 pb-24">
        <div className="max-w-lg mx-auto px-4">
          <SectionHeader title="Restaurant" />

          {/* Info Bar */}
          <div className="bg-card border border-border rounded-2xl p-4 mt-4 flex items-center gap-4">
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Clock className="w-4 h-4 text-accent" />
              <span>8AM - 10PM</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <MapPin className="w-4 h-4 text-accent" />
              <span>Ground Floor</span>
            </div>
          </div>

          {/* Popular Section */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-accent fill-accent" />
                <h3 className="font-bold text-lg gradient-text">Popular</h3>
              </div>
              <button className="text-accent text-sm font-medium flex items-center gap-1 hover:underline">
                View All <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="flex gap-3 overflow-x-auto pb-3 hide-scrollbar -mx-4 px-4">
              {popularItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                  className="min-w-[140px] max-w-[140px] shrink-0"
                >
                  <div className="relative rounded-xl overflow-hidden aspect-square">
                    <img src={item.image} alt={item.name} loading="lazy" className="w-full h-full object-cover" />
                    <div className="absolute top-2 right-2 bg-accent text-accent-foreground text-xs font-bold px-2 py-0.5 rounded-full">
                      {item.price}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    {/* Add button */}
                    <button
                      onClick={() => addToCart(item)}
                      className="absolute bottom-2 right-2 w-7 h-7 rounded-full bg-accent text-accent-foreground flex items-center justify-center shadow-md hover:scale-110 transition-transform"
                    >
                      {getItemQuantity(item.name) > 0 ? (
                        <span className="text-xs font-bold">{getItemQuantity(item.name)}</span>
                      ) : (
                        <Plus className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  <h4 className="font-semibold text-foreground text-sm mt-2 truncate">{item.name}</h4>
                  <p className="text-xs text-muted-foreground truncate">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 mt-6 hide-scrollbar -mx-4 px-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 border",
                  activeCategory === cat.id
                    ? "bg-accent text-accent-foreground border-accent"
                    : "bg-card text-muted-foreground border-border hover:border-accent/50"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Menu List */}
          <div className="mt-4 space-y-3">
            {filteredItems.map((item, index) => {
              const qty = getItemQuantity(item.name);
              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-card border border-border rounded-2xl p-3 flex items-center gap-4"
                >
                  <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
                    <img src={item.image} alt={item.name} loading="lazy" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-foreground truncate">{item.name}</h4>
                      {item.popular && (
                        <span className="text-[10px] font-bold bg-accent/20 text-accent px-2 py-0.5 rounded-full shrink-0">
                          Popular
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{item.description}</p>
                    <span className="text-accent font-bold text-sm">{item.price}</span>
                  </div>
                  {/* Add / quantity controls */}
                  <div className="shrink-0">
                    {qty > 0 ? (
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => updateQuantity(item.name, -1)}
                          className="w-7 h-7 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:bg-muted"
                        >
                          <span className="text-sm font-bold">−</span>
                        </button>
                        <span className="text-sm font-bold w-5 text-center text-foreground">{qty}</span>
                        <button
                          onClick={() => updateQuantity(item.name, 1)}
                          className="w-7 h-7 rounded-full bg-accent text-accent-foreground flex items-center justify-center hover:opacity-80"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => addToCart(item)}
                        className="w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center shadow hover:scale-110 transition-transform"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </main>

      {/* Cart Drawer */}
      <CartDrawer
        cart={cart}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
        onClear={clearCart}
      />

      <Footer />
      <BottomNavigation />
    </div>
  );
}
