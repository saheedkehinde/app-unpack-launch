import { useState, useRef, useEffect } from "react"
import { X, Send, CalendarDays, Utensils, MapPin, Phone, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import timakLogo from "@/assets/timak-logo.png"

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/timak-chat`

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
  content: "Welcome to TIMAK CENTRE! 🌟 I'm your personal AI assistant. How can I help you create something unforgettable today?",
}

async function streamChat({
  messages,
  onDelta,
  onDone,
  onError,
}: {
  messages: { role: string; content: string }[]
  onDelta: (text: string) => void
  onDone: () => void
  onError: (msg: string) => void
}) {
  const resp = await fetch(CHAT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
    },
    body: JSON.stringify({ messages }),
  })

  if (!resp.ok) {
    const data = await resp.json().catch(() => ({}))
    onError(data.error || "Something went wrong. Please try again.")
    return
  }

  if (!resp.body) {
    onError("No response from AI.")
    return
  }

  const reader = resp.body.getReader()
  const decoder = new TextDecoder()
  let buffer = ""

  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    buffer += decoder.decode(value, { stream: true })

    let idx: number
    while ((idx = buffer.indexOf("\n")) !== -1) {
      let line = buffer.slice(0, idx)
      buffer = buffer.slice(idx + 1)
      if (line.endsWith("\r")) line = line.slice(0, -1)
      if (line.startsWith(":") || line.trim() === "") continue
      if (!line.startsWith("data: ")) continue
      const json = line.slice(6).trim()
      if (json === "[DONE]") { onDone(); return }
      try {
        const parsed = JSON.parse(json)
        const content = parsed.choices?.[0]?.delta?.content
        if (content) onDelta(content)
      } catch {
        buffer = line + "\n" + buffer
        break
      }
    }
  }
  onDone()
}

export function AIChatButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([initialMessage])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => { scrollToBottom() }, [messages])

  const sendMessage = async (text: string) => {
    if (!text.trim()) return
    const userMsg: Message = { id: Date.now().toString(), role: "user", content: text }
    const updatedMessages = [...messages, userMsg]
    setMessages(updatedMessages)
    setInput("")
    setIsTyping(true)

    let assistantContent = ""
    const chatHistory = updatedMessages
      .filter((m) => m.id !== "welcome")
      .map((m) => ({ role: m.role, content: m.content }))

    try {
      await streamChat({
        messages: chatHistory,
        onDelta: (chunk) => {
          assistantContent += chunk
          const content = assistantContent
          setMessages((prev) => {
            const last = prev[prev.length - 1]
            if (last?.role === "assistant" && last.id !== "welcome") {
              return prev.map((m, i) => i === prev.length - 1 ? { ...m, content } : m)
            }
            return [...prev, { id: (Date.now() + 1).toString(), role: "assistant", content }]
          })
        },
        onDone: () => setIsTyping(false),
        onError: (msg) => {
          setIsTyping(false)
          toast({ title: "AI Error", description: msg, variant: "destructive" })
        },
      })
    } catch {
      setIsTyping(false)
      toast({ title: "Connection Error", description: "Could not reach the AI assistant.", variant: "destructive" })
    }
  }

  const handleQuickAction = (action: string) => {
    const actionMessages: Record<string, string> = {
      booking: "I'd like to book an event at TIMAK CENTRE",
      menu: "I want to reserve a table at the restaurant",
      location: "Where is TIMAK CENTRE located?",
    }
    if (action === "whatsapp") {
      window.open("https://api.whatsapp.com/send?phone=%2B2348061723069&text=Hello%20TIMAK%20CENTRE,%20I%27d%20like%20to%20make%20an%20inquiry.", "_blank")
      return
    }
    if (action === "gallery") {
      window.location.href = "/gallery"
      return
    }
    if (actionMessages[action]) sendMessage(actionMessages[action])
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-24 right-4 z-50 flex items-center justify-center w-16 h-16 rounded-full shadow-xl transition-all duration-300",
          "bg-gradient-to-br from-[#ffee9a] to-[#b88a2e] hover:scale-105 active:scale-95 animate-pulse-glow",
          isOpen && "rotate-180"
        )}
        aria-label={isOpen ? "Close chat" : "Open AI assistant"}
      >
        {isOpen ? <X className="w-5 h-5 text-[#1a0a0a]" /> : <img src={timakLogo} alt="Timak AI" className="w-11 h-11 object-contain" />}
      </button>

      <div
        className={cn(
          "fixed bottom-40 right-4 z-50 w-[calc(100vw-2rem)] max-w-[360px] bg-card rounded-2xl shadow-2xl border border-border overflow-hidden transition-all duration-300",
          isOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"
        )}
      >
        {/* Header */}
        <div className="bg-sidebar p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#ffee9a] to-[#b88a2e] flex items-center justify-center p-1">
              <img src={timakLogo} alt="Timak AI" className="w-9 h-9 object-contain" />
            </div>
            <div className="flex-1">
              <h3 className="font-serif text-base font-semibold text-sidebar-foreground">Timak AI</h3>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <p className="text-xs text-sidebar-foreground/70">Online - Ready to help</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="w-8 h-8 rounded-full hover:bg-sidebar-accent flex items-center justify-center transition-colors">
              <X className="w-4 h-4 text-sidebar-foreground/70" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="h-[280px] overflow-y-auto p-4 space-y-3 bg-background">
          {messages.map((message) => (
            <div key={message.id} className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}>
              <div className={cn(
                "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm whitespace-pre-wrap",
                message.role === "user" ? "bg-primary text-primary-foreground rounded-br-sm" : "bg-muted text-foreground rounded-bl-sm"
              )}>
                {message.content}
              </div>
            </div>
          ))}
          {isTyping && messages[messages.length - 1]?.role !== "assistant" && (
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
                  className="flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-[#ffee9a]/20 to-[#b88a2e]/20 border-[#b88a2e]/30 text-foreground hover:from-[#ffee9a] hover:to-[#b88a2e] hover:text-[#1a0a0a] rounded-full text-xs font-medium transition-all duration-200 whitespace-nowrap border active:scale-95 hover:scale-105"
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
              onKeyDown={(e) => e.key === "Enter" && !isTyping && sendMessage(input)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2.5 bg-muted rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              disabled={isTyping}
            />
            <Button onClick={() => sendMessage(input)} size="icon" className="rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground h-10 w-10" disabled={!input.trim() || isTyping}>
              <Send className="w-4 h-4" />
              <span className="sr-only">Send message</span>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
