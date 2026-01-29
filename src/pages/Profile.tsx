import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Navigation } from "@/components/Navigation";
import { BottomNavigation } from "@/components/BottomNavigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { 
  User, 
  Mail, 
  Phone, 
  LogOut, 
  Calendar, 
  Clock, 
  Users,
  Sparkles,
  Edit2,
  Check,
  X
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Profile {
  display_name: string | null;
  phone: string | null;
  avatar_url: string | null;
}

interface Booking {
  id: string;
  booking_type: string;
  title: string;
  description: string | null;
  event_date: string;
  event_time: string | null;
  guest_count: number;
  status: string;
  total_amount: number | null;
  created_at: string;
}

const Profile = () => {
  const { user, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [profile, setProfile] = useState<Profile | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchBookings();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle();

    if (error) {
      console.error("Error fetching profile:", error);
    } else if (data) {
      setProfile(data);
      setDisplayName(data.display_name || "");
      setPhone(data.phone || "");
    }
    setLoading(false);
  };

  const fetchBookings = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .eq("user_id", user.id)
      .order("event_date", { ascending: true });

    if (error) {
      console.error("Error fetching bookings:", error);
    } else {
      setBookings(data || []);
    }
  };

  const handleUpdateProfile = async () => {
    if (!user) return;

    const { error } = await supabase
      .from("profiles")
      .update({
        display_name: displayName.trim() || null,
        phone: phone.trim() || null,
      })
      .eq("user_id", user.id);

    if (error) {
      toast({
        title: "Update Failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
      });
      setEditing(false);
      fetchProfile();
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
    toast({
      title: "Signed Out",
      description: "You have been signed out successfully.",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "cancelled":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "completed":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  if (authLoading || loading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-primary via-primary/90 to-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Sparkles className="w-12 h-12 text-accent animate-pulse" />
          <p className="text-white/60">Loading...</p>
        </div>
      </main>
    );
  }

  if (!user) return null;

  return (
    <main className="min-h-screen bg-gradient-to-b from-primary via-primary/90 to-background pb-20">
      <Navigation />
      
      <div className="pt-24 px-4">
        <div className="max-w-lg mx-auto space-y-6">
          {/* Profile Header */}
          <div className="bg-sidebar rounded-2xl p-6 border border-sidebar-border">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent to-amber-500 flex items-center justify-center">
                  <User className="w-8 h-8 text-accent-foreground" />
                </div>
                <div>
                  <h1 className="font-serif text-xl font-bold text-sidebar-foreground">
                    {displayName || "Guest User"}
                  </h1>
                  <p className="text-sm text-sidebar-foreground/60 flex items-center gap-1">
                    <Mail className="w-4 h-4" />
                    {user.email}
                  </p>
                </div>
              </div>
              {!editing && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setEditing(true)}
                  className="text-sidebar-foreground/60 hover:text-accent"
                >
                  <Edit2 className="w-5 h-5" />
                </Button>
              )}
            </div>

            {editing ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sidebar-foreground">Display Name</Label>
                  <Input
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Your name"
                    className="bg-sidebar-accent border-sidebar-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sidebar-foreground">Phone Number</Label>
                  <Input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+234 800 000 0000"
                    className="bg-sidebar-accent border-sidebar-border"
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleUpdateProfile} className="btn-book-now flex-1">
                    <Check className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                  <Button 
                    variant="ghost" 
                    onClick={() => {
                      setEditing(false);
                      setDisplayName(profile?.display_name || "");
                      setPhone(profile?.phone || "");
                    }}
                    className="flex-1"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-sm text-sidebar-foreground/60">
                <Phone className="w-4 h-4" />
                {phone || "No phone number added"}
              </div>
            )}
          </div>

          {/* Bookings Section */}
          <div className="bg-sidebar rounded-2xl p-6 border border-sidebar-border">
            <h2 className="font-serif text-lg font-semibold text-sidebar-foreground mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-accent" />
              My Bookings
            </h2>

            {bookings.length === 0 ? (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-sidebar-foreground/30 mx-auto mb-3" />
                <p className="text-sidebar-foreground/60 mb-4">No bookings yet</p>
                <Button 
                  onClick={() => navigate("/bookings")}
                  className="btn-book-now"
                >
                  Book an Event
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {bookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="bg-sidebar-accent rounded-xl p-4 border border-sidebar-border"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-sidebar-foreground">{booking.title}</h3>
                      <Badge className={getStatusColor(booking.status)}>
                        {booking.status}
                      </Badge>
                    </div>
                    <div className="space-y-1 text-sm text-sidebar-foreground/60">
                      <p className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {new Date(booking.event_date).toLocaleDateString("en-NG", {
                          weekday: "short",
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                      {booking.event_time && (
                        <p className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          {booking.event_time}
                        </p>
                      )}
                      <p className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        {booking.guest_count} guest{booking.guest_count !== 1 ? "s" : ""}
                      </p>
                    </div>
                    {booking.total_amount && (
                      <p className="mt-2 text-accent font-semibold">
                        ₦{booking.total_amount.toLocaleString()}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sign Out */}
          <Button
            onClick={handleSignOut}
            variant="ghost"
            className="w-full text-red-400 hover:text-red-300 hover:bg-red-500/10"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>

      <Footer />
      <BottomNavigation />
    </main>
  );
};

export default Profile;
