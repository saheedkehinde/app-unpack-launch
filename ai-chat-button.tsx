"use client"

import { useState, useRef, useEffect } from "react"
import { MessageCircle, X, Send, Sparkles, CalendarDays, Utensils, MapPin, Phone, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const quickActions = [
  { icon: CalendarDays, label: "Book Event", action: "booking" },
  { icon: Utensils, label: "Reserve Table", action: "menu" },
  { icon: ImageIcon, label: "View Gallery", action: "gallery" },
  { icon: MapPin, label: "Get Location", action: "location" },
  { icon: Phone, label: "Talk to Human", action: "whatsapp" },
]

interface Message {
  id: string
  role: "assistant" | "user"
  content: string
}

const initialMessage: Message = {
  id: "welcome",
  role: "assistant",
  content: "Welcome to TIMAK CENTRE! I'm your personal assistant. How can I help you create something unforgettable today?",
}

export function AIChatButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([initialMessage])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const responses: Record<string, string> = {
        booking: "I'd love to help you plan your event! At TIMAK CENTRE, we offer:\n\n• Small Hall: Perfect for intimate gatherings (50-100 guests)\n• Large Hall: Ideal for grand celebrations (200-500 guests)\n\nWedding packages start from ₦1.5M - ₦2M. Would you like to check availability for a specific date?",
        price: "Here are our current rates:\n\n🏛 Event Halls: ₦1.5M - ₦2M\n🛏 Hotel Rooms: ₦25,000 - ₦50,000/night\n🍽 Restaurant: ₦3,500 - ₦15,000/plate\n\nAll payments are made physically after booking confirmation.",
        location: "📍 TIMAK CENTRE\nITA-ALAMU, Ajase-Ipo Road\nIlorin, Kwara State, Nigeria\n\n📞 08061723069, 09155852386\n📧 info.timakcentre@gmail.com\n\nWould you like directions?",
        default: "I can assist you with:\n\n• Event bookings & hall availability\n• Room reservations\n• Restaurant menu & catering\n• Pricing information\n• Directions to our location\n\nWhat would you like to know more about?",
      }

      const lowerInput = userMessage.content.toLowerCase()
      let responseContent = responses.default

      if (lowerInput.includes("book") || lowerInput.includes("event") || lowerInput.includes("wedding") || lowerInput.includes("hall")) {
        responseContent = responses.booking
      } else if (lowerInput.includes("price") || lowerInput.includes("cost") || lowerInput.includes("how much") || lowerInput.includes("rate")) {
        responseContent = responses.price
      } else if (lowerInput.includes("location") || lowerInput.includes("where") || lowerInput.includes("address") || lowerInput.includes("direction")) {
        responseContent = responses.location
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: responseContent,
      }

      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)
    }, 1200)
  }

  const handleQuickAction = (action: string) => {
    const actionMessages: Record<string, string> = {
      booking: "I'd like to book an event",
      rooms: "Tell me about your rooms",
      menu: "I want to reserve a table",
      gallery: "Show me the gallery",
      location: "Where is TIMAK CENTRE located?",
      whatsapp: "Connect me to a human",
    }

    if (action === "whatsapp") {
      window.open("https://api.whatsapp.com/send?phone=%2B2348061723069&text=Hello%20TIMAK%20CENTRE,%20I%27d%20like%20to%20make%20an%20inquiry.", "_blank")
      return
    }

    if (action === "gallery") {
      window.location.href = "/gallery"
      return
    }

    setInput(actionMessages[action] || "")
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-24 right-4 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-xl transition-all duration-300",
          "bg-primary text-primary-foreground hover:scale-105 active:scale-95",
          isOpen && "rotate-180"
        )}
        aria-label={isOpen ? "Close chat" : "Open AI assistant"}
      >
        {isOpen ? <X className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
      </button>

      {/* Chat Window */}
      <div
        className={cn(
          "fixed bottom-40 right-4 z-50 w-[calc(100vw-2rem)] max-w-[360px] bg-card rounded-2xl shadow-2xl border border-border overflow-hidden transition-all duration-300",
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        )}
      >
        {/* Header */}
        <div className="bg-sidebar p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-sidebar" />
            </div>
            <div className="flex-1">
              <h3 className="font-serif text-base font-semibold text-sidebar-foreground">Timak AI</h3>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <p className="text-xs text-sidebar-foreground/70">Online - Ready to help</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full hover:bg-sidebar-accent flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4 text-sidebar-foreground/70" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="h-[280px] overflow-y-auto p-4 space-y-3 bg-background">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex",
                message.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm whitespace-pre-wrap",
                  message.role === "user"
                    ? "bg-primary text-primary-foreground rounded-br-sm"
                    : "bg-muted text-foreground rounded-bl-sm"
                )}
              >
                {message.content}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-muted rounded-2xl rounded-bl-sm px-4 py-3">
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        <div className="px-3 py-2.5 bg-muted/30 border-t border-border overflow-x-auto scrollbar-hide">
          <div className="flex gap-2">
            {quickActions.map((action) => {
              const Icon = action.icon
              return (
                <button
                  key={action.action}
                  onClick={() => handleQuickAction(action.action)}
                  className="flex items-center gap-1.5 px-3 py-2 light:bg-gray-100 light:border-primary/20 light:text-foreground light:hover:bg-primary light:hover:text-white dark:bg-card dark:border-border dark:text-foreground dark:hover:bg-primary dark:hover:text-primary-foreground rounded-full text-xs font-medium transition-all duration-200 whitespace-nowrap border active:scale-95 hover:scale-105"
                >
                  <Icon className="w-3.5 h-3.5" />
                  {action.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Input */}
        <div className="p-3 bg-card border-t border-border">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2.5 bg-muted rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <Button
              onClick={handleSend}
              size="icon"
              className="rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground h-10 w-10"
              disabled={!input.trim()}
            >
              <Send className="w-4 h-4" />
              <span className="sr-only">Send message</span>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
