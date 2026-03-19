import { Minus, Plus, ShoppingCart, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export interface CartItem {
  name: string;
  price: string;
  priceNum: number;
  quantity: number;
  image: string;
}

interface CartDrawerProps {
  cart: CartItem[];
  onUpdateQuantity: (name: string, delta: number) => void;
  onRemove: (name: string) => void;
  onClear: () => void;
}

export function CartDrawer({ cart, onUpdateQuantity, onRemove, onClear }: CartDrawerProps) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [placing, setPlacing] = useState(false);
  const [open, setOpen] = useState(false);
  const [notes, setNotes] = useState("");

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cart.reduce((sum, item) => sum + item.priceNum * item.quantity, 0);

  const handlePlaceOrder = async () => {
    if (!user) {
      toast({ title: "Please sign in", description: "You need to be signed in to place an order." });
      navigate("/login");
      return;
    }

    setPlacing(true);
    try {
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          user_id: user.id,
          total_amount: totalAmount,
          status: "pending",
          notes: notes.trim() || null,
        })
        .select()
        .single();

      if (orderError) throw orderError;

      const orderItems = cart.map((item) => ({
        order_id: order.id,
        item_name: item.name,
        item_price: item.priceNum,
        quantity: item.quantity,
      }));

      const { error: itemsError } = await supabase.from("order_items").insert(orderItems);
      if (itemsError) throw itemsError;

      toast({ title: "Order placed! 🎉", description: `Your order of ₦${totalAmount.toLocaleString()} has been placed.` });
      onClear();
      setOpen(false);
    } catch (err: any) {
      toast({ title: "Order failed", description: err.message, variant: "destructive" });
    } finally {
      setPlacing(false);
    }
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <button className="fixed bottom-20 right-4 z-40 bg-accent text-accent-foreground w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
          <ShoppingCart className="w-6 h-6" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[85vh]">
        <DrawerHeader className="flex items-center justify-between">
          <DrawerTitle className="text-lg font-bold">Your Order</DrawerTitle>
          <DrawerClose asChild>
            <button className="text-muted-foreground hover:text-foreground">
              <X className="w-5 h-5" />
            </button>
          </DrawerClose>
        </DrawerHeader>

        <div className="px-4 overflow-y-auto max-h-[50vh]">
          {cart.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">
              <ShoppingCart className="w-12 h-12 mx-auto mb-3 opacity-40" />
              <p className="font-medium">Your cart is empty</p>
              <p className="text-sm mt-1">Add items from the menu</p>
            </div>
          ) : (
            <AnimatePresence>
              {cart.map((item) => (
                <motion.div
                  key={item.name}
                  layout
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center gap-3 py-3 border-b border-border"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-lg object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm text-foreground truncate">{item.name}</h4>
                    <p className="text-accent font-bold text-sm">{item.price}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onUpdateQuantity(item.name, -1)}
                      className="w-7 h-7 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:bg-muted"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-sm font-bold w-5 text-center text-foreground">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.name, 1)}
                      className="w-7 h-7 rounded-full border border-accent bg-accent/10 flex items-center justify-center text-accent hover:bg-accent/20"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => onRemove(item.name)}
                      className="w-7 h-7 rounded-full flex items-center justify-center text-destructive hover:bg-destructive/10 ml-1"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>

        {cart.length > 0 && (
          <DrawerFooter>
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted-foreground font-medium">Total</span>
              <span className="text-xl font-bold text-foreground">₦{totalAmount.toLocaleString()}</span>
            </div>
            <Button
              onClick={handlePlaceOrder}
              disabled={placing}
              className="w-full bg-gradient-to-r from-[hsl(var(--accent))] to-[hsl(40,60%,35%)] text-white font-semibold rounded-full hover:opacity-90"
            >
              {placing ? "Placing Order..." : "Place Order"}
            </Button>
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  );
}
