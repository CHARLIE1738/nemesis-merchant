import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ShoppingCart, 
  Menu, 
  X, 
  Biohazard,
  ChevronRight,
  Server,
  Gamepad2,
  User,
  MessageCircle,
  Mail,
  Send,
  Check,
  Trash2,
  Plus,
  Minus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

interface CartItem {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  badge: string;
  features: string[];
  image: string;
  category: string;
}

interface ServerProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  specs: string[];
  badge: string;
}

interface VpsProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  specs: string[];
  badge: string;
}

interface VdsProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  specs: string[];
  locations?: string[];
  badge: string;
}

const products: Product[] = [
  {
    id: 'fortnite-busan',
    name: 'BUSAN',
    description: 'Fortnite Software',
    price: 29,
    badge: 'BEST SELLER',
    features: ['Aim assist', 'Stream proof', 'Low latency'],
    image: '/fortnite_keyboard.jpg',
    category: 'Fortnite'
  },
  {
    id: 'sot-aggressive',
    name: 'AGGRESSIVE',
    description: 'Sea Of Thieves Software',
    price: 24,
    badge: 'NEW',
    features: ['ESP', 'Speed adjust', 'Undetected'],
    image: '/sot_ship.jpg',
    category: 'Sea of Thieves'
  },
  {
    id: 'ow2-hakk',
    name: 'HAKK',
    description: 'Overwatch 2 Software',
    price: 22,
    badge: 'HOT',
    features: ['Triggerbot', 'Smooth aim', 'Quick toggle'],
    image: '/ow2_keyboard.jpg',
    category: 'Overwatch 2'
  },
  {
    id: 'spoofer-super',
    name: 'SUPERSPOOFER',
    description: 'FiveM HWID Spoofer (TEMP)',
    price: 35,
    badge: 'UTILITY',
    features: ['HWID reset', 'Temp clean', 'Fast launch'],
    image: '/spoofer_board.jpg',
    category: 'Spoofers'
  },
  {
    id: 'marvel-overdose',
    name: 'OVERDOSE',
    description: 'Marvel Rivals Software',
    price: 28,
    badge: 'NEW',
    features: ['Aimlock', 'Ability assist', 'Safe session'],
    image: '/marvel_throne.jpg',
    category: 'Marvel Rivals'
  },
  {
    id: 'accounts-fa',
    name: 'FULL ACCESS',
    description: 'Fresh Steam Accounts',
    price: 12,
    badge: 'IN STOCK',
    features: ['Fresh emails', 'Unranked', 'Instant delivery'],
    image: '/accounts_controller.jpg',
    category: 'Accounts'
  },
  {
    id: 'apex-busan',
    name: 'BUSAN',
    description: 'Apex Legends Software',
    price: 26,
    badge: 'TOP RATED',
    features: ['No recoil', 'Smooth tracking', 'HWID safe'],
    image: '/apex_keyboard.jpg',
    category: 'Apex Legends'
  },
  {
    id: 'cod-baimless',
    name: 'BAIMLESS',
    description: 'BO6 / BO7 / WZ Software',
    price: 32,
    badge: 'SALE',
    features: ['Aimbot', 'Wallhack', 'Stream safe'],
    image: '/cod_keyboard.jpg',
    category: 'Call of Duty'
  },
  {
    id: 'fivem-tzx',
    name: 'TZX MENU',
    description: 'FiveM External Menu',
    price: 19,
    badge: 'RP READY',
    features: ['Money loops', 'ESP', 'Troll options'],
    image: '/fivem_keyboard.jpg',
    category: 'FiveM'
  },
  {
    id: 'rust-busan',
    name: 'BUSAN',
    description: 'Rust Software',
    price: 30,
    badge: 'HARD CORE',
    features: ['Silent aim', 'Loot ESP', 'Builder assist'],
    image: '/rust_keyboard.jpg',
    category: 'Rust'
  },
  {
    id: 'gta-overdose',
    name: 'OVERDOSE',
    description: 'GTA V Enhanced Software',
    price: 34,
    badge: 'ENHANCED',
    features: ['Money drop', 'Vehicle mods', 'Recovery'],
    image: '/gta_keyboard.jpg',
    category: 'GTA'
  }
];

const serverProducts: ServerProduct[] = [
  {
    id: 'dedi-e2236',
    name: 'E-2236 3.4GHz Coffee Lake',
    description: 'Dedicated Server',
    price: 65,
    originalPrice: 129,
    specs: ['6 Cores / 12 Threads', '16GB Memory', '480GB SSD Storage', '20TB / 1Gbps Bandwidth'],
    badge: 'SALE'
  },
  {
    id: 'dedi-e3',
    name: 'E3-1230 v6 3.5Ghz Intel Xeon',
    description: 'Dedicated Server',
    price: 74,
    originalPrice: 114,
    specs: ['4 Cores / 8 Threads', '16GB Memory', '480GB + 1TB Storage', '20TB / 1Gbps Bandwidth'],
    badge: 'SALE'
  },
  {
    id: 'dedi-e2336',
    name: 'E-2336 2.9GHz Rocket Lake',
    description: 'Dedicated Server',
    price: 119,
    originalPrice: 151,
    specs: ['6 Cores / 12 Threads', '64GB Memory', '480GB SSD Storage', '20TB / 1Gbps Bandwidth'],
    badge: 'SALE'
  },
  {
    id: 'dedi-7413',
    name: '7413 2.65Ghz AMD EPYC',
    description: 'Dedicated Server',
    price: 174,
    originalPrice: 600,
    specs: ['24 Cores / 48 Threads', '256GB Memory', '480GB SSD + 1TB NVMe SSD + 2TB NVMe SSD', '20TB / 1Gbps Bandwidth'],
    badge: 'SALE'
  }
];

const vpsProducts: VpsProduct[] = [
  {
    id: 'vps-pro-sm',
    name: 'pro.sm.amd',
    description: 'VPS',
    price: 10,
    specs: ['2 vCPUs', '4GB Memory', '40GB NVMe SSD Storage', '10TB / 1Gbps Bandwidth'],
    badge: 'POPULAR'
  },
  {
    id: 'vps-pro-md',
    name: 'pro.md.amd',
    description: 'VPS',
    price: 15,
    originalPrice: 20,
    specs: ['4 vCPUs', '8GB Memory', '80GB NVMe SSD Storage', '10TB / 1Gbps Bandwidth'],
    badge: 'SALE'
  }
];

const vdsProducts: VdsProduct[] = [
  {
    id: 'vds-sm-intel',
    name: 'vds.sm.intel',
    description: 'VDS',
    price: 21,
    specs: ['2 vCPUs', '4GB Memory', '80GB Storage', '10TB / 1Gbps Port Bandwidth'],
    locations: ['Los Angeles 2', 'Tampa 2'],
    badge: 'INTEL'
  },
  {
    id: 'vds-md-intel',
    name: 'vds.md.intel',
    description: 'VDS',
    price: 37,
    originalPrice: 42,
    specs: ['4 vCPUs', '8GB Memory', '160GB Storage', '10TB / 1Gbps Port Bandwidth'],
    locations: ['Los Angeles 2', 'Tampa 2'],
    badge: 'SALE'
  },
  {
    id: 'vds-lg-intel',
    name: 'vds.lg.intel',
    description: 'VDS',
    price: 72,
    originalPrice: 81,
    specs: ['8 vCPUs', '16GB Memory', '320GB Storage', '10TB / 1Gbps Port Bandwidth'],
    locations: ['Los Angeles 2', 'Tampa 2'],
    badge: 'SALE'
  }
];

function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  
  const heroRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  const addToCart = (product: Product | ServerProduct | VpsProduct | VdsProduct) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, {
        id: product.id,
        name: product.name,
        description: 'specs' in product ? product.specs[0] : product.description,
        price: product.price,
        quantity: 1,
        category: 'category' in product ? product.category : 'Servers'
      }];
    });
    toast.success(`${product.name} added to cart`);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Order placed successfully! Check your email for details.');
    setCart([]);
    setIsCheckoutOpen(false);
    setEmail('');
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent! We will reply within 2 hours.');
    setEmail('');
    setMessage('');
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance animation
      const heroTl = gsap.timeline();
      heroTl
        .fromTo('.hero-glow', 
          { opacity: 0 }, 
          { opacity: 1, duration: 0.8 }
        )
        .fromTo('.hero-headline span', 
          { y: 40, opacity: 0, rotateX: 25 }, 
          { y: 0, opacity: 1, rotateX: 0, stagger: 0.06, ease: 'power3.out' }, 
          0.2
        )
        .fromTo('.hero-subheadline', 
          { y: 18, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 0.6 }, 
          0.5
        )
        .fromTo('.hero-cta', 
          { y: 12, scale: 0.96, opacity: 0 }, 
          { y: 0, scale: 1, opacity: 1, duration: 0.5 }, 
          0.6
        )
        .fromTo('.hero-scroll', 
          { y: 12, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 0.5 }, 
          0.7
        );

      // Hero scroll animation
      const heroScrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            gsap.set('.hero-headline, .hero-subheadline, .hero-cta, .hero-scroll', { 
              opacity: 1, y: 0, scale: 1 
            });
          }
        }
      });

      heroScrollTl
        .fromTo('.hero-headline', 
          { y: 0, opacity: 1, scale: 1 }, 
          { y: '-22vh', opacity: 0, scale: 0.92, ease: 'power2.in' }, 
          0.7
        )
        .fromTo('.hero-subheadline', 
          { y: 0, opacity: 1 }, 
          { y: '-15vh', opacity: 0, ease: 'power2.in' }, 
          0.7
        )
        .fromTo('.hero-cta', 
          { y: 0, opacity: 1 }, 
          { y: '10vh', opacity: 0, ease: 'power2.in' }, 
          0.7
        )
        .fromTo('.hero-scroll', 
          { y: 0, opacity: 1 }, 
          { y: '10vh', opacity: 0, ease: 'power2.in' }, 
          0.7
        );

      triggersRef.current.push(heroScrollTl.scrollTrigger!);

      // Product sections
      sectionsRef.current.forEach((section) => {
        if (!section) return;

        const headline = section.querySelector('.section-headline');
        const image = section.querySelector('.section-image');
        const badge = section.querySelector('.section-badge');
        const card = section.querySelector('.section-card');
        const price = section.querySelector('.section-price');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '+=130%',
            pin: true,
            scrub: 0.6,
          }
        });

        // Entrance
        tl.fromTo(headline, 
          { y: '-40vh', opacity: 0, scale: 1.08 }, 
          { y: 0, opacity: 1, scale: 1, ease: 'none' }, 
          0
        )
        .fromTo(image, 
          { y: '60vh', scale: 0.85, opacity: 0 }, 
          { y: 0, scale: 1, opacity: 1, ease: 'none' }, 
          0.06
        )
        .fromTo(badge, 
          { x: '20vw', opacity: 0, rotate: 6 }, 
          { x: 0, opacity: 1, rotate: 0, ease: 'none' }, 
          0.12
        )
        .fromTo(card, 
          { x: '-20vw', opacity: 0 }, 
          { x: 0, opacity: 1, ease: 'none' }, 
          0.14
        )
        .fromTo(price, 
          { x: '12vw', opacity: 0 }, 
          { x: 0, opacity: 1, ease: 'none' }, 
          0.18
        );

        // Exit
        tl.to(headline, 
          { y: '-18vh', opacity: 0, ease: 'power2.in' }, 
          0.7
        )
        .to(image, 
          { y: '-26vh', scale: 0.92, opacity: 0, ease: 'power2.in' }, 
          0.7
        )
        .to([badge, card, price], 
          { y: '8vh', opacity: 0, ease: 'power2.in', stagger: 0.02 }, 
          0.7
        );

        triggersRef.current.push(tl.scrollTrigger!);
      });

      // Global snap
      const allTriggers = triggersRef.current.filter(Boolean);
      if (allTriggers.length > 0) {
        ScrollTrigger.create({
          snap: {
            snapTo: (progress) => {
              const triggers = allTriggers.filter(st => st.vars.pin);
              if (!triggers.length) return progress;
              
              const positions = triggers.map(st => (st.start as number) / ScrollTrigger.maxScroll(window));
              const closest = positions.reduce((prev, curr) => 
                Math.abs(curr - progress) < Math.abs(prev - progress) ? curr : prev
              );
              return closest;
            },
            duration: { min: 0.15, max: 0.35 },
            delay: 0,
            ease: 'power2.out'
          }
        });
      }
    });

    return () => {
      triggersRef.current.forEach(st => st.kill());
      triggersRef.current = [];
      ctx.revert();
    };
  }, []);

  const scrollToSection = (index: number) => {
    const section = sectionsRef.current[index];
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const setSectionRef = (index: number) => (el: HTMLDivElement | null) => {
    sectionsRef.current[index] = el;
  };

  return (
    <div className="min-h-screen bg-[#0B0B0D] text-[#F4F4F5] font-sans overflow-x-hidden">
      {/* Grain overlay */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.06] mix-blend-overlay"
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` 
        }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between bg-gradient-to-b from-[#0B0B0D] to-transparent">
        <div className="flex items-center gap-3">
          <Biohazard className="w-8 h-8 text-[#D7FF3B]" />
          <span className="text-xl font-bold tracking-tight">NEMESIS</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <button onClick={() => scrollToSection(0)} className="text-sm text-[#A7A7AD] hover:text-[#F4F4F5] transition-colors">Store</button>
          <button onClick={() => scrollToSection(6)} className="text-sm text-[#A7A7AD] hover:text-[#F4F4F5] transition-colors">Servers</button>
          <button onClick={() => scrollToSection(4)} className="text-sm text-[#A7A7AD] hover:text-[#F4F4F5] transition-colors">Accounts</button>
          <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="text-sm text-[#A7A7AD] hover:text-[#F4F4F5] transition-colors">Support</button>
        </div>

        <div className="flex items-center gap-4">
          <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
            <SheetTrigger asChild>
              <button className="relative p-2 hover:bg-white/5 rounded-full transition-colors">
                <ShoppingCart className="w-5 h-5" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#D7FF3B] text-[#0B0B0D] text-xs font-bold rounded-full flex items-center justify-center">
                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </button>
            </SheetTrigger>
            <SheetContent className="bg-[#111114] border-[#222] w-full sm:max-w-md">
              <SheetHeader>
                <SheetTitle className="text-[#F4F4F5] flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  Your Cart
                </SheetTitle>
              </SheetHeader>
              <div className="mt-6 flex flex-col gap-4">
                {cart.length === 0 ? (
                  <p className="text-[#A7A7AD] text-center py-8">Your cart is empty</p>
                ) : (
                  <>
                    {cart.map(item => (
                      <div key={item.id} className="bg-[#16161A] rounded-2xl p-4 border border-white/5">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold">{item.name}</h4>
                            <p className="text-sm text-[#A7A7AD]">{item.description}</p>
                          </div>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="p-1 hover:bg-red-500/20 rounded transition-colors"
                          >
                            <Trash2 className="w-4 h-4 text-red-400" />
                          </button>
                        </div>
                        <div className="flex justify-between items-center mt-3">
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => updateQuantity(item.id, -1)}
                              className="p-1 hover:bg-white/10 rounded"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, 1)}
                              className="p-1 hover:bg-white/10 rounded"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <span className="font-mono text-[#D7FF3B]">${item.price * item.quantity}</span>
                        </div>
                      </div>
                    ))}
                    <div className="border-t border-white/10 pt-4 mt-4">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-[#A7A7AD]">Total</span>
                        <span className="text-2xl font-bold text-[#D7FF3B]">${cartTotal}</span>
                      </div>
                      <Button 
                        onClick={() => { setIsCartOpen(false); setIsCheckoutOpen(true); }}
                        className="w-full bg-[#D7FF3B] text-[#0B0B0D] hover:bg-[#c5ec35] font-semibold"
                      >
                        Checkout
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>

          <button 
            className="md:hidden p-2 hover:bg-white/5 rounded-full transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#0B0B0D]/95 backdrop-blur-lg pt-20 px-6 md:hidden">
          <div className="flex flex-col gap-6">
            <button onClick={() => { scrollToSection(0); setIsMobileMenuOpen(false); }} className="text-2xl font-semibold text-left">Store</button>
            <button onClick={() => { scrollToSection(6); setIsMobileMenuOpen(false); }} className="text-2xl font-semibold text-left">Servers</button>
            <button onClick={() => { scrollToSection(4); setIsMobileMenuOpen(false); }} className="text-2xl font-semibold text-left">Accounts</button>
            <button onClick={() => { document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); setIsMobileMenuOpen(false); }} className="text-2xl font-semibold text-left">Support</button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section ref={heroRef} className="relative w-full h-screen flex items-center justify-center overflow-hidden">
        {/* Glow */}
        <div className="hero-glow absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[800px] h-[800px] rounded-full"
            style={{ 
              background: 'radial-gradient(circle, rgba(215,255,59,0.18) 0%, rgba(182,108,255,0.12) 40%, rgba(0,0,0,0) 70%)' 
            }}
          />
        </div>

        <div className="relative z-10 text-center px-6">
          <div className="hero-headline mb-6">
            {'NEMESIS'.split('').map((char, i) => (
              <span 
                key={i} 
                className="inline-block text-[clamp(64px,15vw,160px)] font-black tracking-[-0.06em] leading-none"
                style={{ 
                  background: 'linear-gradient(135deg, #D7FF3B 0%, #B66CFF 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                {char}
              </span>
            ))}
          </div>
          <p className="hero-subheadline text-[clamp(16px,2vw,24px)] text-[#A7A7AD] max-w-xl mx-auto mb-8">
            Premium Game Enhancements & Infrastructure
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button 
              onClick={() => scrollToSection(0)}
              className="hero-cta bg-[#D7FF3B] text-[#0B0B0D] hover:bg-[#c5ec35] font-semibold px-8 py-6 text-lg rounded-full"
            >
              Enter Store
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>

        <div className="hero-scroll absolute bottom-8 left-6 text-sm text-[#A7A7AD]">
          Scroll to explore
        </div>
      </section>

      {/* Product Sections */}
      {products.map((product, idx) => (
        <section 
          key={product.id}
          ref={setSectionRef(idx)}
          className="relative w-full h-screen flex items-center justify-center overflow-hidden"
          style={{ zIndex: (idx + 2) * 10 }}
        >
          {/* Glow */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[600px] h-[600px] rounded-full"
              style={{ 
                background: idx % 2 === 0 
                  ? 'radial-gradient(circle, rgba(215,255,59,0.15) 0%, rgba(0,0,0,0) 65%)'
                  : 'radial-gradient(circle, rgba(182,108,255,0.15) 0%, rgba(0,0,0,0) 65%)'
              }}
            />
          </div>

          {/* Headline */}
          <h2 className="section-headline absolute top-[18vh] left-1/2 -translate-x-1/2 text-[clamp(48px,10vw,120px)] font-black tracking-[-0.04em] uppercase whitespace-nowrap">
            {product.category}
          </h2>

          {/* Image */}
          <div className="section-image absolute left-1/2 top-[56%] -translate-x-1/2 -translate-y-1/2 w-[78vw] max-w-[1100px]">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-auto rounded-3xl shadow-[0_28px_80px_rgba(0,0,0,0.55)]"
            />
          </div>

          {/* Badge */}
          <div className="section-badge absolute right-[6vw] top-[10vh] bg-[#16161A] border border-white/5 rounded-2xl px-4 py-2">
            <span className="text-xs font-mono tracking-widest uppercase" style={{ color: idx % 2 === 0 ? '#D7FF3B' : '#B66CFF' }}>
              {product.badge}
            </span>
          </div>

          {/* Info Card */}
          <div className="section-card absolute left-[6vw] bottom-[10vh] w-[320px] bg-[#16161A] border border-white/5 rounded-[28px] p-6">
            <h3 className="text-2xl font-bold mb-1">{product.name}</h3>
            <p className="text-sm text-[#A7A7AD] mb-4">{product.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {product.features.map((feature, i) => (
                <span key={i} className="text-xs bg-white/5 px-2 py-1 rounded-full text-[#A7A7AD]">
                  {feature}
                </span>
              ))}
            </div>
            <Button 
              onClick={() => addToCart(product)}
              className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/10"
            >
              Add to Cart
            </Button>
          </div>

          {/* Price Pill */}
          <div className="section-price absolute right-[6vw] bottom-[10vh] bg-[#D7FF3B] text-[#0B0B0D] rounded-full px-6 py-3">
            <span className="text-2xl font-black">${product.price}</span>
          </div>
        </section>
      ))}

      {/* Servers Section */}
      <section 
        ref={setSectionRef(6)}
        className="relative w-full min-h-screen py-20 px-6"
        style={{ zIndex: 80 }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-[clamp(48px,8vw,100px)] font-black tracking-[-0.04em] uppercase mb-4">
              SERVERS
            </h2>
            <p className="text-[#A7A7AD] text-lg">Premium dedicated hardware for your needs</p>
          </div>

          {/* Dedicated Servers */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Server className="w-6 h-6 text-[#D7FF3B]" />
              Dedicated Servers
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {serverProducts.map(server => (
                <div key={server.id} className="bg-[#16161A] border border-white/5 rounded-[28px] p-6 hover:border-[#D7FF3B]/30 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="text-xs font-mono tracking-widest text-[#D7FF3B] uppercase">{server.badge}</span>
                      <h4 className="text-xl font-bold mt-1">{server.name}</h4>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-black text-[#D7FF3B]">${server.price}<span className="text-sm font-normal text-[#A7A7AD]">/mo</span></div>
                      {server.originalPrice && (
                        <div className="text-sm text-[#A7A7AD] line-through">${server.originalPrice}/mo</div>
                      )}
                    </div>
                  </div>
                  <ul className="space-y-2 mb-6">
                    {server.specs.map((spec, i) => (
                      <li key={i} className="text-sm text-[#A7A7AD] flex items-center gap-2">
                        <Check className="w-4 h-4 text-[#D7FF3B]" />
                        {spec}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    onClick={() => addToCart(server)}
                    className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/10"
                  >
                    Configure
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* VPS */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Gamepad2 className="w-6 h-6 text-[#B66CFF]" />
              VPS
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {vpsProducts.map(vps => (
                <div key={vps.id} className="bg-[#16161A] border border-white/5 rounded-[28px] p-6 hover:border-[#B66CFF]/30 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="text-xs font-mono tracking-widest text-[#B66CFF] uppercase">{vps.badge}</span>
                      <h4 className="text-xl font-bold mt-1">{vps.name}</h4>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-black text-[#B66CFF]">${vps.price}<span className="text-sm font-normal text-[#A7A7AD]">/mo</span></div>
                      {vps.originalPrice && (
                        <div className="text-sm text-[#A7A7AD] line-through">${vps.originalPrice}/mo</div>
                      )}
                    </div>
                  </div>
                  <ul className="space-y-2 mb-6">
                    {vps.specs.map((spec, i) => (
                      <li key={i} className="text-sm text-[#A7A7AD] flex items-center gap-2">
                        <Check className="w-4 h-4 text-[#B66CFF]" />
                        {spec}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    onClick={() => addToCart(vps)}
                    className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/10"
                  >
                    Configure
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* VDS */}
          <div>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <User className="w-6 h-6 text-[#D7FF3B]" />
              VDS
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {vdsProducts.map(vds => (
                <div key={vds.id} className="bg-[#16161A] border border-white/5 rounded-[28px] p-6 hover:border-[#D7FF3B]/30 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="text-xs font-mono tracking-widest text-[#D7FF3B] uppercase">{vds.badge}</span>
                      <h4 className="text-xl font-bold mt-1">{vds.name}</h4>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-black text-[#D7FF3B]">${vds.price}<span className="text-sm font-normal text-[#A7A7AD]">/mo</span></div>
                      {vds.originalPrice && (
                        <div className="text-sm text-[#A7A7AD] line-through">${vds.originalPrice}/mo</div>
                      )}
                    </div>
                  </div>
                  <ul className="space-y-2 mb-4">
                    {vds.specs.map((spec, i) => (
                      <li key={i} className="text-sm text-[#A7A7AD] flex items-center gap-2">
                        <Check className="w-4 h-4 text-[#D7FF3B]" />
                        {spec}
                      </li>
                    ))}
                  </ul>
                  {vds.locations && (
                    <div className="flex gap-2 mb-4">
                      {vds.locations.map((loc, i) => (
                        <span key={i} className="text-xs bg-white/5 px-2 py-1 rounded-full text-[#A7A7AD]">
                          {loc}
                        </span>
                      ))}
                    </div>
                  )}
                  <Button 
                    onClick={() => addToCart(vds)}
                    className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/10"
                  >
                    Configure
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative w-full py-20 px-6 bg-[#111114]" style={{ zIndex: 90 }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-[clamp(36px,6vw,64px)] font-black tracking-[-0.04em] mb-12">
            Get in touch
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <a 
              href="https://t.me/nemesismerchant" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-[#16161A] border border-white/5 rounded-[28px] p-6 hover:border-[#D7FF3B]/30 transition-colors group"
            >
              <MessageCircle className="w-8 h-8 text-[#D7FF3B] mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-2">Telegram</h3>
              <p className="text-[#A7A7AD]">t.me/nemesismerchant</p>
            </a>

            <a 
              href="mailto:support@nemesismerchant.io"
              className="bg-[#16161A] border border-white/5 rounded-[28px] p-6 hover:border-[#B66CFF]/30 transition-colors group"
            >
              <Mail className="w-8 h-8 text-[#B66CFF] mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-2">Email</h3>
              <p className="text-[#A7A7AD]">support@nemesismerchant.io</p>
            </a>
          </div>

          <form onSubmit={handleContactSubmit} className="bg-[#16161A] border border-white/5 rounded-[28px] p-8">
            <h3 className="text-xl font-bold mb-6">Send a message</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-[#A7A7AD] mb-2 block">Email</label>
                <Input 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="bg-white/5 border-white/10 text-white placeholder:text-[#A7A7AD]/50"
                  required
                />
              </div>
              <div>
                <label className="text-sm text-[#A7A7AD] mb-2 block">Message</label>
                <Textarea 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we help?"
                  className="bg-white/5 border-white/10 text-white placeholder:text-[#A7A7AD]/50 min-h-[120px]"
                  required
                />
              </div>
              <Button 
                type="submit"
                className="w-full bg-[#D7FF3B] text-[#0B0B0D] hover:bg-[#c5ec35] font-semibold"
              >
                <Send className="w-4 h-4 mr-2" />
                Send message
              </Button>
            </div>
            <p className="text-sm text-[#A7A7AD] mt-4 text-center">
              Typical reply time: under 2 hours.
            </p>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-8 px-6 bg-[#0B0B0D] border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <Biohazard className="w-6 h-6 text-[#D7FF3B]" />
            <span className="font-bold">NEMESIS MERCHANT</span>
          </div>
          <p className="text-sm text-[#A7A7AD]">
            Premium Game Enhancements & Infrastructure
          </p>
          <p className="text-sm text-[#A7A7AD]">
            © 2026 NEMESIS MERCHANT. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Checkout Dialog */}
      <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
        <DialogContent className="bg-[#111114] border-[#222] max-w-md">
          <DialogHeader>
            <DialogTitle className="text-[#F4F4F5]">Checkout</DialogTitle>
            <DialogDescription className="text-[#A7A7AD]">
              Complete your order
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCheckout} className="space-y-4 mt-4">
            <div>
              <label className="text-sm text-[#A7A7AD] mb-2 block">Email</label>
              <Input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="bg-white/5 border-white/10 text-white placeholder:text-[#A7A7AD]/50"
                required
              />
            </div>
            <div className="bg-[#16161A] rounded-xl p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[#A7A7AD]">Items</span>
                <span>{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#A7A7AD]">Total</span>
                <span className="text-2xl font-bold text-[#D7FF3B]">${cartTotal}</span>
              </div>
            </div>
            <Button 
              type="submit"
              className="w-full bg-[#D7FF3B] text-[#0B0B0D] hover:bg-[#c5ec35] font-semibold"
            >
              Place Order
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default App;