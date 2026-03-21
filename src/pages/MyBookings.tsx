import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { BottomNavigation } from "@/components/BottomNavigation";
import { BackButton } from "@/components/BackButton";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { CalendarDays, Clock, Users, Utensils, PartyPopper, ShoppingBag } from "lucide-react";
import { format } from "date-fns";

interface Booking {
  id: string;
  title: string;
  description: string | null;
  booking_type: "event" | "restaurant" | "hall";
  event_date: string;
  event_time: string | null;
  guest_count: number | null;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  total_amount: number | null;
  created_at: string;
}

interface Order {
  id: string;
  total_amount: number;
  status: string;
  notes: string | null;
  created_at: string;
  order_items: { item_name: string; item_price: number; quantity: number }[];
}

export default function MyBookings() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      const [bookingsRes, ordersRes] = await Promise.all([
        supabase.from("bookings").select("*").order("created_at", { ascending: false }),
        supabase.from("orders").select("*, order_items(item_name, item_price, quantity)").order("created_at", { ascending: false }),
      ]);

      setBookings(bookingsRes.data || []);
      setOrders(ordersRes.data as any || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getBookingIcon = (type: string) => {
    switch (type) {
      case "restaurant": return <Utensils className="w-5 h-5" />;
      case "event": return <PartyPopper className="w-5 h-5" />;
      default: return <CalendarDays className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "bg-green-500/20 text-green-400";
      case "cancelled": return "bg-red-500/20 text-red-400";
      case "completed": return "bg-blue-500/20 text-blue-400";
      default: return "bg-accent/20 text-accent";
    }
  };

  const hasContent = bookings.length > 0 || orders.length > 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <BackButton />
      <main className="pt-20 pb-24">
        <div className="max-w-lg mx-auto px-4">
          <SectionHeader title="My Bookings" />
          <p className="text-muted-foreground text-xs text-center -mt-2 mb-4">
            Orders & bookings are visible for 24 hours
          </p>

          {!hasContent ? (
            <div className="mt-8 text-center space-y-6">
              <div className="w-20 h-20 mx-auto rounded-full bg-accent/20 flex items-center justify-center">
                <CalendarDays className="w-10 h-10 text-accent" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-foreground">No bookings yet</h3>
                <p className="text-muted-foreground text-sm max-w-xs mx-auto">
                  Start exploring our services and book your first event or order food.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <Button onClick={() => navigate("/bookings")} className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  Book an Event
                </Button>
                <Button variant="outline" onClick={() => navigate("/restaurant")} className="border-accent/50 text-accent hover:bg-accent/10">
                  Order Food
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4 mt-4">
              {/* Food Orders */}
              {orders.map((order) => (
                <div key={order.id} className="bg-card border border-border rounded-2xl p-5 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center text-accent">
                        <ShoppingBag className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">Food Order</h3>
                        <p className="text-xs text-muted-foreground">
                          {format(new Date(order.created_at), "MMM dd, yyyy · h:mm a")}
                        </p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>

                  <div className="space-y-1">
                    {order.order_items?.map((item, i) => (
                      <div key={i} className="flex justify-between text-sm text-muted-foreground">
                        <span>{item.quantity}x {item.item_name}</span>
                        <span>₦{(item.item_price * item.quantity).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>

                  {order.notes && <p className="text-sm text-muted-foreground italic">Note: {order.notes}</p>}

                  <div className="pt-2 border-t border-border">
                    <span className="text-accent font-semibold">₦{order.total_amount.toLocaleString()}</span>
                  </div>
                </div>
              ))}

              {/* Bookings */}
              {bookings.map((booking) => (
                <div key={booking.id} className="bg-card border border-border rounded-2xl p-5 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center text-accent">
                        {getBookingIcon(booking.booking_type)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{booking.title}</h3>
                        <p className="text-xs text-muted-foreground capitalize">{booking.booking_type}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </div>

                  {booking.description && <p className="text-sm text-muted-foreground">{booking.description}</p>}

                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <CalendarDays className="w-4 h-4 text-accent" />
                      {format(new Date(booking.event_date), "MMM dd, yyyy")}
                    </span>
                    {booking.event_time && (
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-accent" />
                        {booking.event_time}
                      </span>
                    )}
                    {booking.guest_count && (
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-accent" />
                        {booking.guest_count} guests
                      </span>
                    )}
                  </div>

                  {booking.total_amount && (
                    <div className="pt-2 border-t border-border">
                      <span className="text-accent font-semibold">₦{booking.total_amount.toLocaleString()}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
      <BottomNavigation />
    </div>
  );
}
