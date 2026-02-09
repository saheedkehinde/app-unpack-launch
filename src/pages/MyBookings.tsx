import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { BottomNavigation } from "@/components/BottomNavigation";
import { BackButton } from "@/components/BackButton";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { CalendarDays, Clock, Users, Utensils, PartyPopper, LogIn } from "lucide-react";
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

export default function MyBookings() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loadingBookings, setLoadingBookings] = useState(true);

  useEffect(() => {
    if (user) {
      fetchBookings();
    } else if (!loading) {
      setLoadingBookings(false);
    }
  }, [user, loading]);

  const fetchBookings = async () => {
    try {
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .order("event_date", { ascending: true });

      if (error) throw error;
      setBookings(data || []);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoadingBookings(false);
    }
  };

  const getBookingIcon = (type: string) => {
    switch (type) {
      case "restaurant":
        return <Utensils className="w-5 h-5" />;
      case "event":
        return <PartyPopper className="w-5 h-5" />;
      default:
        return <CalendarDays className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500/20 text-green-400";
      case "cancelled":
        return "bg-red-500/20 text-red-400";
      default:
        return "bg-accent/20 text-accent";
    }
  };

  if (loading || loadingBookings) {
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

          {!user ? (
            <div className="mt-8 text-center space-y-6">
              <div className="w-20 h-20 mx-auto rounded-full bg-accent/20 flex items-center justify-center">
                <LogIn className="w-10 h-10 text-accent" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-foreground">Sign in to view your bookings</h3>
                <p className="text-muted-foreground text-sm max-w-xs mx-auto">
                  Register with your email to access all your event bookings, restaurant reservations, and more.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <Button
                  onClick={() => navigate("/login")}
                  className="bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  Sign In
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate("/signup")}
                  className="border-accent/50 text-accent hover:bg-accent/10"
                >
                  Create Account
                </Button>
              </div>
            </div>
          ) : bookings.length === 0 ? (
            <div className="mt-8 text-center space-y-6">
              <div className="w-20 h-20 mx-auto rounded-full bg-accent/20 flex items-center justify-center">
                <CalendarDays className="w-10 h-10 text-accent" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-foreground">No bookings yet</h3>
                <p className="text-muted-foreground text-sm max-w-xs mx-auto">
                  Start exploring our services and book your first event or reservation.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <Button
                  onClick={() => navigate("/bookings")}
                  className="bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  Book an Event
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate("/restaurant")}
                  className="border-accent/50 text-accent hover:bg-accent/10"
                >
                  Reserve a Table
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4 mt-6">
              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="bg-card border border-border rounded-2xl p-5 space-y-3"
                >
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

                  {booking.description && (
                    <p className="text-sm text-muted-foreground">{booking.description}</p>
                  )}

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
                      <span className="text-accent font-semibold">
                        ₦{booking.total_amount.toLocaleString()}
                      </span>
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
