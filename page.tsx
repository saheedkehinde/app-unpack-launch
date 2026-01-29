"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { BottomNavigation } from "@/components/bottom-navigation"
import { TabNavigation } from "@/components/tab-navigation"
import { EventCard } from "@/components/event-card"
import { SectionHeader } from "@/components/section-header"
import { AIChatButton } from "@/components/ai-chat-button"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ReservationCard } from "@/components/reservation-card" // Import ReservationCard
import { 
  Key, 
  CalendarDays, 
  Utensils, 
  ChevronRight,
  Star,
  MapPin,
  Clock,
  Sparkles,
  Heart,
  Users,
  Building2,
  ArrowRight
} from "lucide-react"
import { cn } from "@/lib/utils"

const mainTabs = [
  { id: "events", label: "Find Events", icon: <Key className="w-4 h-4" /> },
  { id: "reserve", label: "Reserve Table", icon: <CalendarDays className="w-4 h-4" /> },
  { id: "chat", label: "Chat TimakAi", icon: <Sparkles className="w-4 h-4" /> },
]

const upcomingEvents = [
  {
    title: "Gala Dinner",
    date: "Sat, Dec 18",
    price: "From ₦25,000",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&auto=format&fit=crop",
    href: "/bookings",
  },
  {
    title: "Wedding Showcase",
    date: "Sun, Jan 5",
    price: "Free Entry",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&auto=format&fit=crop",
    href: "/bookings",
  },
]

const tableReservations = [
  {
    title: "Fine Dining Experience",
    subtitle: "2 Guests • Tomorrow, 7:00 PM",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop",
    href: "/restaurant",
  },
  {
    title: "Private Celebration",
    subtitle: "8 Guests • Next Saturday",
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&auto=format&fit=crop",
    href: "/restaurant",
  },
]

const services = [
  {
    icon: Building2,
    title: "Event Halls",
    description: "Elegant spaces for any occasion",
    href: "/services#halls",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&auto=format&fit=crop",
  },
  {
    icon: Heart,
    title: "Weddings",
    description: "Your dream celebration",
    href: "/services#weddings",
    image: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=400&auto=format&fit=crop",
  },
  {
    icon: Users,
    title: "Corporate",
    description: "Professional conferences",
    href: "/services#corporate",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=400&auto=format&fit=crop",
  },
  {
    icon: Utensils,
    title: "Restaurant",
    description: "Fine dining & catering",
    href: "/restaurant",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&auto=format&fit=crop",
  },
]

const stats = [
  { value: "500+", label: "Events Hosted" },
  { value: "15+", label: "Years Experience" },
  { value: "50K+", label: "Happy Guests" },
  { value: "5.0", label: "Star Rating" },
]

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("events")

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#730309] via-[#90030a] to-[#840309] pb-20">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-[75vh] flex flex-col">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1920&auto=format&fit=crop"
            alt="TIMAK CENTRE"
            fill
            className="object-cover"
            priority
          />
          {/* Multi-layer gradient for depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-sidebar" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex-1 flex flex-col justify-end px-4 pb-8 pt-24">
          <div className="max-w-lg mx-auto w-full">
            {/* Welcome Text */}
            <div className="mb-6 page-transition">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/20 border border-accent/30 backdrop-blur-sm mb-3">
                <Sparkles className="w-3.5 h-3.5 text-accent" />
                <span className="text-xs text-accent font-medium">Welcome to Luxury</span>
              </div>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-3 drop-shadow-lg">
                TIMAK CENTRE
              </h1>
              <p className="text-white/70 text-sm flex items-center gap-2">
                <MapPin className="w-4 h-4 text-accent" />
                Ilorin, Kwara State, Nigeria
              </p>
            </div>

            {/* Tab Navigation */}
            <TabNavigation
              tabs={mainTabs}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              className="w-full"
            />
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background via-white/5 to-transparent pointer-events-none z-10" />
      </section>

      {/* Dynamic Content Based on Tab */}
      <section className="px-4 py-6">
        <div className="max-w-lg mx-auto">
          {activeTab === "events" ? (
            <>
              {/* Upcoming Events */}
              <SectionHeader
                icon={<CalendarDays className="w-5 h-5" />}
                title="Upcoming Events"
                action={
                  <Link href="/bookings" className="text-sm text-accent font-medium flex items-center gap-1 hover:gap-2 transition-all">
                    View All <ChevronRight className="w-4 h-4" />
                  </Link>
                }
              />
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <EventCard
                    key={event.title}
                    title={event.title}
                    date={event.date}
                    price={event.price}
                    image={event.image}
                    href={event.href}
                    actionLabel="Book Now"
                    secondaryLabel="View Details"
                    secondaryHref="/services"
                  />
                ))}
              </div>
            </>
          ) : activeTab === "reserve" ? (
            <>
              {/* Table Reservations */}
              <SectionHeader
                icon={<Utensils className="w-5 h-5" />}
                title="Table Reservation"
                action={
                  <Link href="/restaurant" className="text-sm text-accent font-medium flex items-center gap-1 hover:gap-2 transition-all">
                    Book Table <ChevronRight className="w-4 h-4" />
                  </Link>
                }
              />
              <div className="space-y-3">
                {tableReservations.map((item, index) => (
                  <ReservationCard
                    key={index}
                    title={item.title}
                    subtitle={item.subtitle}
                    image={item.image}
                    href={item.href}
                    variant="horizontal"
                  />
                ))}
              </div>
            </>
          ) : (
            <>
              {/* Chat Section */}
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/30 to-accent/10 border border-accent/30 mb-4">
                  <Sparkles className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-white mb-2">
                  Timak AI Assistant
                </h3>
                <p className="text-sidebar-foreground/70 mb-6 max-w-xs mx-auto">
                  Have questions about events, reservations, or services? Our AI is here to help 24/7.
                </p>
                <Button className="btn-book-now">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Start Chatting
                </Button>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4 py-8">
        <div className="max-w-lg mx-auto">
          <div className="bg-sidebar rounded-2xl p-4 border border-sidebar-border">
            <div className="grid grid-cols-4 gap-3">
              {stats.map((stat, index) => (
                <div key={stat.label} className="text-center relative">
                  <p className="font-serif text-xl md:text-2xl font-bold text-accent">{stat.value}</p>
                  <p className="text-[10px] text-sidebar-foreground/60 mt-0.5">{stat.label}</p>
                  {index < stats.length - 1 && (
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-8 bg-sidebar-border" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="px-4 py-6 relative">
        <div className="max-w-lg mx-auto">
          <div className="bg-muted/50 backdrop-blur-sm rounded-3xl p-6 glow-shadow-dark border border-muted/30">
            <SectionHeader
              icon={<Sparkles className="w-5 h-5" />}
              title="Our Services"
              action={
                <Link href="/services" className="text-sm text-accent font-medium flex items-center gap-1 hover:gap-2 transition-all">
                  All Services <ChevronRight className="w-4 h-4" />
                </Link>
              }
            />
            <div className="grid grid-cols-2 gap-3">
              {services.map((service) => {
                const Icon = service.icon
                return (
                  <Link
                    key={service.title}
                    href={service.href}
                    className="group relative aspect-square rounded-2xl overflow-hidden card-hover"
                  >
                    <Image
                      src={service.image || "/placeholder.svg"}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Multi-layer gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-sidebar via-sidebar/40 to-transparent" />
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-500" />
                    
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="w-9 h-9 rounded-xl bg-accent/20 backdrop-blur-sm flex items-center justify-center mb-2 border border-accent/30 group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-4 h-4 text-accent" />
                      </div>
                      <h3 className="font-serif text-sm font-semibold text-white drop-shadow-md">{service.title}</h3>
                      <p className="text-[11px] text-white/70">{service.description}</p>
                    </div>
                    
                    {/* Corner accent */}
                    <div className="absolute top-3 right-3 w-6 h-6 border-t border-r border-accent/0 group-hover:border-accent/50 transition-colors duration-500" />
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Featured CTA - Plan Your Perfect Event */}
      <section className="px-4 py-6">
        <div className="max-w-lg mx-auto">
          <div className="relative rounded-2xl overflow-hidden group shadow-lg">
            {/* Background Image */}
            <Image
              src="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&auto=format&fit=crop"
              alt="Plan your event"
              width={800}
              height={400}
              className="w-full h-52 object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/60" />
            
            {/* Content */}
            <div className="absolute inset-0 flex items-center p-6">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-accent/20 backdrop-blur-sm mb-3">
                  <Sparkles className="w-3 h-3 text-accent" />
                  <span className="text-[10px] text-accent font-medium uppercase tracking-wider">Premium Service</span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-white mb-2 drop-shadow-lg">
                  Plan Your Perfect Event
                </h3>
                <p className="text-sm text-white/80 mb-4 max-w-xs">
                  Let our experts help you create unforgettable memories
                </p>
                <Button
                  asChild
                  size="sm"
                  className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full h-11 px-6 font-semibold shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  <Link href="/bookings">
                    Get Started
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
              </div>
              
              {/* Decorative sparkle icon */}
              <div className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-primary/80 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-accent" />
              </div>
            </div>
            
            {/* Decorative corner accent */}
            <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-accent/40 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </section>

      {/* AI Assistant Promo */}
      <section className="px-4 py-6">
        <div className="max-w-lg mx-auto">
          <div className="bg-sidebar rounded-2xl p-5 border border-accent relative overflow-hidden">
            {/* Decorative gradient */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            
            <div className="flex items-start gap-4 relative">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent/30 to-accent/10 flex items-center justify-center shrink-0 border border-accent/30">
                <Sparkles className="w-7 h-7 text-accent" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-serif text-lg font-semibold text-sidebar-foreground mb-1">
                  Meet Timak AI
                </h3>
                <p className="text-sm text-sidebar-foreground/60 mb-4">
                  Have questions? Our AI assistant is available 24/7 to help you plan your event.
                </p>
                <Button
                  size="sm"
                  onClick={() => setActiveTab("chat")}
                  className="btn-book-now"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Start Chat
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="px-4 py-6">
        <div className="max-w-lg mx-auto">
          <div className="bg-sidebar rounded-2xl p-5 border border-sidebar-border relative overflow-hidden">
            {/* Decorative gradient */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            
            {/* Quote mark decoration */}
            <div className="absolute -top-2 -left-2 text-6xl font-serif text-accent/10 leading-none">&ldquo;</div>
            
            <div className="relative">
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-sm text-sidebar-foreground/80 italic mb-4 leading-relaxed">
                &ldquo;TIMAK CENTRE made our wedding day absolutely perfect. The attention to detail and service was exceptional. Highly recommended!&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-accent/20 flex items-center justify-center border border-accent/30">
                  <span className="text-sm font-semibold text-accent">AO</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-sidebar-foreground">Aisha & Olumide</p>
                  <p className="text-xs text-sidebar-foreground/60">Wedding, December 2025</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Access */}
      <section className="px-4 py-6">
        <div className="max-w-lg mx-auto">
          <SectionHeader title="Quick Access" />
          <div className="grid grid-cols-3 gap-3">
            <Link href="/gallery" className="flex flex-col items-center gap-2 p-4 bg-sidebar rounded-xl border border-sidebar-border hover:bg-white hover:border-white transition-all duration-300 group">
              <div className="w-11 h-11 rounded-xl bg-accent/20 flex items-center justify-center group-hover:bg-[#840309]/20 group-hover:scale-110 transition-all duration-300">
                <svg className="w-5 h-5 text-accent group-hover:text-[#840309]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-xs font-medium text-sidebar-foreground group-hover:text-black transition-colors">Gallery</span>
            </Link>
            <Link href="/rooms" className="flex flex-col items-center gap-2 p-4 bg-sidebar rounded-xl border border-sidebar-border hover:bg-white hover:border-white transition-all duration-300 group">
              <div className="w-11 h-11 rounded-xl bg-accent/20 flex items-center justify-center group-hover:bg-[#840309]/20 group-hover:scale-110 transition-all duration-300">
                <svg className="w-5 h-5 text-accent group-hover:text-[#840309]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <span className="text-xs font-medium text-sidebar-foreground group-hover:text-black transition-colors">Rooms</span>
            </Link>
            <Link href="/contact" className="flex flex-col items-center gap-2 p-4 bg-sidebar rounded-xl border border-sidebar-border hover:bg-white hover:border-white transition-all duration-300 group">
              <div className="w-11 h-11 rounded-xl bg-accent/20 flex items-center justify-center group-hover:bg-[#840309]/20 group-hover:scale-110 transition-all duration-300">
                <MapPin className="w-5 h-5 text-accent group-hover:text-[#840309]" />
              </div>
              <span className="text-xs font-medium text-sidebar-foreground group-hover:text-black transition-colors">Location</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <BottomNavigation />
      <AIChatButton />
    </main>
  )
}
