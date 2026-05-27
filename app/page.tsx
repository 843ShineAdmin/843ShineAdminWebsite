"use client";

import {
  ArrowRight,
  ArrowUpRight,
  CalendarCheck,
  Car,
  Check,
  Clock,
  MapPin,
  Menu,
  MessageCircle,
  ShieldCheck,
  Star,
  X,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

function BeforeAfterSlider() {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let dragging = false;

    const update = (clientX: number) => {
      const rect = el.getBoundingClientRect();
      const pct = ((clientX - rect.left) / rect.width) * 100;
      setPos(Math.max(0, Math.min(100, pct)));
    };

    const onDown = (e: MouseEvent) => {
      dragging = true;
      update(e.clientX);
    };
    const onMove = (e: MouseEvent) => {
      if (!dragging) return;
      update(e.clientX);
    };
    const onUp = () => {
      dragging = false;
    };
    const onTouchStart = (e: TouchEvent) => {
      dragging = true;
      update(e.touches[0].clientX);
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!dragging) return;
      update(e.touches[0].clientX);
    };
    const onTouchEnd = () => {
      dragging = false;
    };

    el.addEventListener("mousedown", onDown);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    return () => {
      el.removeEventListener("mousedown", onDown);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      el.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  return (
    <div ref={containerRef} className="ba-slider">
      <Image
        src="/Images/After.png"
        alt="Finished Charleston mobile detailing result"
        className="ba-img"
        fill
        sizes="(max-width: 1400px) 100vw, 1400px"
        draggable={false}
      />
      <div className="ba-before-wrap" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Image
          src="/Images/Before.png"
          alt="Vehicle before mobile detailing service"
          className="ba-img"
          fill
          sizes="(max-width: 1400px) 100vw, 1400px"
          draggable={false}
        />
      </div>
      <span className="ba-label ba-label-before">Before</span>
      <span className="ba-label ba-label-after">After</span>
      <div className="ba-divider" style={{ left: `${pos}%` }} aria-label="Drag to compare" />
    </div>
  );
}

const trustItems = [
  { icon: Star, value: "5-star rated" },
  { icon: Car, value: "150+ cars detailed" },
  { icon: MapPin, value: "Mobile service" },
  { icon: ShieldCheck, value: "Locally owned" },
  { icon: Clock, value: "Weekend" },
];

const packages = [
  {
    title: "Full Detail",
    description: "The complete reset for vehicles that need inside-out refinement.",
    price: "From $249",
    imageClass: "service-card-image-1",
    includes: [
      "Foam hand wash and wheel deep clean",
      "Interior vacuum, wipe down, and crevice work",
      "Leather, plastics, vents, glass, and door jambs",
      "Tire dressing and finishing inspection",
    ],
  },
  {
    title: "Interior Detail",
    description: "A focused cabin refresh for daily drivers, family cars, and weekend toys.",
    price: "From $149",
    imageClass: "service-card-image-2",
    includes: [
      "Thorough vacuum including trunk and mats",
      "Dashboard, console, cupholder, and vent cleaning",
      "Seat, carpet, and upholstery spot treatment",
      "Interior glass and final scent-neutral finish",
    ],
  },
  {
    title: "Exterior Detail",
    description: "Gloss, clarity, and protection tuned for Charleston roads and salt air.",
    price: "From $129",
    imageClass: "service-card-image-3",
    includes: [
      "Pre-rinse, foam bath, and hand wash",
      "Wheel faces, tires, fuel door, and trim cleaned",
      "Exterior glass and mirror polish",
      "Tire shine and high-gloss towel finish",
    ],
  },
];

const galleryItems = [
  {
    src: "/Images/IMG_6167.png",
    alt: "Detailed Porsche interior in Charleston",
    label: "Exterior",
  },
  {
    src: "/Images/IMG_7693.png",
    alt: "Premium Porsche cabin after detail",
    label: "Paint finish",
  },
  {
    src: "/Images/IMG_7726.png",
    alt: "Detailed Range Rover exterior",
    label: "Interior",
  },
  {
    src: "/Images/IMG_9521.png",
    alt: "Detailed blue luxury SUV front quarter",
    label: "Trim",
  },
];

const reviews = [
  {
    name: "Alyssa M.",
    vehicle: "BMW X5, Mount Pleasant",
    quote: "Booked before a weekend trip and the SUV looked showroom clean inside and out.",
    avatarSrc: "/Images/reviews/alyssa.jpg",
  },
  {
    name: "Jordan P.",
    vehicle: "Toyota 4Runner, James Island",
    quote: "On time, easy to text with, and they got beach sand out of places I had given up on.",
    avatarSrc: "/Images/reviews/jordan.jpg",
  },
  {
    name: "Marcus R.",
    vehicle: "Porsche 911, Downtown Charleston",
    quote: "Careful work, premium feel, and no rushed driveway detail energy. Exactly what I wanted.",
    avatarSrc: "/Images/reviews/marcus.jpg",
  },
  {
    name: "Emily S.",
    vehicle: "Range Rover, West Ashley",
    quote: "The whole process was simple. They came to me and the finish looked incredible.",
    avatarSrc: "/Images/reviews/emily.jpg",
  },
];

const navItems = [
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "How It Works", href: "#how" },
  { label: "Reviews", href: "#reviews" },
];

const CALENDLY_SCRIPT_SRC = "https://assets.calendly.com/assets/external/widget.js";
const BASE_CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL?.trim() ?? "";

type CalendlyApi = {
  initInlineWidget: (options: {
    url: string;
    parentElement: HTMLElement;
    prefill?: {
      name?: string;
      email?: string;
      customAnswers?: Record<string, string>;
    };
    resize?: boolean;
  }) => void;
};

type BookingDetails = {
  name: string;
  email: string;
  phone: string;
  vehicle: string;
  service: string;
};

const serviceLabels: Record<string, string> = {
  full: "Full Detail",
  interior: "Interior Detail",
  exterior: "Exterior Detail",
  quote: "Not sure, help me choose",
};

function getFormValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function buildCalendlyUrl(details: BookingDetails) {
  if (!BASE_CALENDLY_URL) return "";

  try {
    const url = new URL(BASE_CALENDLY_URL);
    url.searchParams.set("hide_event_type_details", "1");
    url.searchParams.set("hide_gdpr_banner", "1");
    url.searchParams.set("background_color", "000000");
    url.searchParams.set("text_color", "ffffff");
    url.searchParams.set("primary_color", "58c7f3");
    url.searchParams.set("name", details.name);
    url.searchParams.set("email", details.email);
    url.searchParams.set("a1", details.phone);
    url.searchParams.set("a2", details.vehicle);
    url.searchParams.set("a3", details.service);
    return url.toString();
  } catch {
    return "";
  }
}

function CalendlyInline({ details, url }: { details: BookingDetails; url: string }) {
  const embedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const parentElement = embedRef.current;
    if (!parentElement) return;

    let cancelled = false;

    const initCalendly = () => {
      if (cancelled) return;
      const calendly = (window as Window & { Calendly?: CalendlyApi }).Calendly;
      if (!calendly) return;

      parentElement.innerHTML = "";
      calendly.initInlineWidget({
        url,
        parentElement,
        prefill: {
          name: details.name,
          email: details.email,
          customAnswers: {
            a1: details.phone,
            a2: details.vehicle,
            a3: details.service,
          },
        },
        resize: false,
      });
    };

    const existingScript = document.querySelector<HTMLScriptElement>(
      `script[src="${CALENDLY_SCRIPT_SRC}"]`,
    );

    if ((window as Window & { Calendly?: CalendlyApi }).Calendly) {
      initCalendly();
    } else {
      const script = existingScript ?? document.createElement("script");
      script.src = CALENDLY_SCRIPT_SRC;
      script.async = true;
      script.addEventListener("load", initCalendly);

      if (!existingScript) {
        document.body.appendChild(script);
      }

      return () => {
        cancelled = true;
        script.removeEventListener("load", initCalendly);
        parentElement.innerHTML = "";
      };
    }

    return () => {
      cancelled = true;
      parentElement.innerHTML = "";
    };
  }, [url]);

  return <div ref={embedRef} className="calendly-frame" aria-label="Calendly booking calendar" />;
}

function LeadForm() {
  const [submitted, setSubmitted] = useState(false);
  const [bookingUrl, setBookingUrl] = useState("");
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const details = {
      name: getFormValue(formData, "name"),
      email: getFormValue(formData, "email"),
      phone: getFormValue(formData, "phone"),
      vehicle: getFormValue(formData, "vehicle"),
      service: serviceLabels[getFormValue(formData, "service")] ?? "Help me choose",
    };
    const calendlyUrl = buildCalendlyUrl(details);

    setBookingDetails(details);
    setBookingUrl(calendlyUrl);
    setSubmitted(true);
  };

  if (bookingDetails && bookingUrl) {
    return (
      <div className="calendly-booking">
        <div className="calendly-header">
          <div>
            <h3>Pick your appointment time</h3>
            <p>Your form details are filled in. Calendly handles the live calendar.</p>
          </div>
          <div className="calendly-actions">
            <button
              type="button"
              className="ghost-action"
              onClick={() => {
                setBookingDetails(null);
                setBookingUrl("");
                setSubmitted(false);
              }}
            >
              Edit details
            </button>
            <a className="ghost-action" href={bookingUrl} target="_blank" rel="noopener noreferrer">
              Open Calendly <ArrowUpRight size={16} strokeWidth={2} />
            </a>
          </div>
        </div>
        <CalendlyInline details={bookingDetails} url={bookingUrl} />
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="lead-success">
        <h3>Thanks, we&apos;ve got your request.</h3>
        <p>We&apos;ll text back with availability and a clear quote for your vehicle.</p>
        <a className="lead-cta" href="sms:+18435322909">
          Text us now
        </a>
      </div>
    );
  }

  return (
    <form className="lead-form" onSubmit={onSubmit}>
      <div className="lead-form-header">
        <h3>Get booked</h3>
        <p>Send the details, then choose a live opening on the calendar.</p>
      </div>
      <div className="lead-grid">
        <label className="field-label">
          <span>Name</span>
          <input className="lead-input" name="name" type="text" required autoComplete="name" />
        </label>
        <label className="field-label">
          <span>Email</span>
          <input className="lead-input" name="email" type="email" required autoComplete="email" />
        </label>
        <label className="field-label">
          <span>Phone</span>
          <input className="lead-input" name="phone" type="tel" required autoComplete="tel" />
        </label>
        <label className="field-label">
          <span>Vehicle</span>
          <input
            className="lead-input"
            name="vehicle"
            type="text"
            placeholder="Year / Make / Model"
            required
          />
        </label>
        <label className="field-label">
          <span>Service wanted</span>
          <select className="lead-input" name="service" required defaultValue="">
            <option value="" disabled>
              Select a package
            </option>
            <option value="full">Full Detail</option>
            <option value="interior">Interior Detail</option>
            <option value="exterior">Exterior Detail</option>
            <option value="quote">Not sure, help me choose</option>
          </select>
        </label>
      </div>
      <button type="submit" className="lead-submit">
        Continue to booking <ArrowRight size={18} strokeWidth={2} />
      </button>
    </form>
  );
}

function ReviewsGrid() {
  return (
    <div className="reviews-grid">
      {reviews.map((review) => (
        <figure className="review-card" key={review.name}>
          <div className="review-stars" aria-label="5 out of 5 stars">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star key={index} size={14} fill="currentColor" strokeWidth={1.8} />
            ))}
          </div>
          <blockquote>“{review.quote}”</blockquote>
          <figcaption>
            <div className="review-avatar" aria-hidden="true">
              <Image src={review.avatarSrc} alt="" fill sizes="44px" />
            </div>
            <div>
              <strong>{review.name}</strong>
              <span>{review.vehicle}</span>
            </div>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <main className="site-shell">
      <header className="topbar" aria-label="Primary navigation">
        <a className="brand" href="#" aria-label="843Shine home">
          <Image
            src="/Images/Logo.png"
            alt="843Shine logo"
            width={40}
            height={40}
            className="brand-logo"
          />
          <span>843Shine</span>
        </a>

        <nav className="nav-links desktop-nav">
          {navItems.map((item) => (
            <a href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <a className="quote-button desktop-quote" href="#booking">
          Get a quote
        </a>

        <button
          className="mobile-menu-toggle"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {mobileMenuOpen && (
        <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">
          {navItems.map((item) => (
            <a href={item.href} key={item.href} onClick={() => setMobileMenuOpen(false)}>
              {item.label}
            </a>
          ))}
          <a className="mobile-quote-button" href="#booking" onClick={() => setMobileMenuOpen(false)}>
            Get a quote
          </a>
        </nav>
      )}

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <h1 id="hero-title" data-text="843 Shine Detailing">
            <span className="hero-title-line">
              <span className="hero-843">843</span> Shine
            </span>{" "}
            <span className="hero-title-line">Detailing</span>
          </h1>
          <p className="hero-sub">
            Premium mobile detailing for Charleston, Mount Pleasant, James Island, West Ashley,
            Daniel Island, Johns Island, and nearby Lowcountry driveways.
          </p>
          <div className="hero-actions">
            <a className="primary-link" href="#booking">
              Book a detail <ArrowUpRight size={20} strokeWidth={2} />
            </a>
            <a className="secondary-link" href="sms:+18435322909">
              Text for a quote
            </a>
          </div>
        </div>

        <Image
          src="/Images/BrandingImage1.png"
          alt="843Shine premium mobile detailing"
          className="hero-image"
          width={1400}
          height={900}
          priority
          sizes="(max-width: 1400px) 100vw, 1400px"
        />
      </section>

      <section className="trust-strip" aria-label="843Shine highlights">
        {trustItems.map(({ icon: Icon, value }) => (
          <div className="trust-item" key={value}>
            <Icon size={22} strokeWidth={1.8} />
            <div>
              <strong>{value}</strong>
            </div>
          </div>
        ))}
      </section>

      <section id="services" className="services-section compact-section" aria-labelledby="services-title">
        <div className="services-container">
          <p className="section-kicker">Premium packages</p>
          <div className="services-header split-header">
            <h2 id="services-title" className="services-title">
              Our Services
            </h2>
            <p className="services-intro">
              Mobile packages for a cleaner interior, sharper exterior, or the full reset.
            </p>
          </div>
          <div className="services-grid">
            {packages.map((item) => (
              <article className="service-card" key={item.title}>
                <div className={`service-card-image ${item.imageClass}`} aria-hidden="true" />
                <div className="service-card-body">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <ul className="service-includes">
                    {item.includes.map((include) => (
                      <li key={include}>
                        <Check size={17} strokeWidth={2.4} /> {include}
                      </li>
                    ))}
                  </ul>
                  <div className="service-card-footer">
                    <div className="service-price">{item.price}</div>
                    <a className="service-learn" href="#booking">
                      Request quote <ArrowRight size={18} strokeWidth={2} />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="services-section compact-section" aria-labelledby="gallery-title">
        <div className="services-container">
          <div className="services-header split-header">
            <div>
              <p className="section-kicker">Recent shine</p>
              <h2 id="gallery-title" className="services-title">
                Charleston Detailing Gallery.
              </h2>
            </div>
            <p className="services-intro">
              Clean interiors, sharp exteriors, and polished finishes.
            </p>
          </div>
          <div className="gallery-grid">
            {galleryItems.map((item, index) => (
              <figure className={`gallery-card gallery-card-${index + 1}`} key={item.src}>
                <Image src={item.src} alt={item.alt} fill sizes="(max-width: 900px) 100vw, 50vw" />
                <figcaption>{item.label}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section id="before-after" className="services-section compact-section" aria-labelledby="ba-title">
        <div className="services-container">
          <div className="services-header split-header">
            <div>
              <p className="section-kicker">Proof in the finish</p>
              <h2 id="ba-title" className="services-title">
                See the difference.
              </h2>
            </div>
            <p className="services-intro">
              Drag the slider to compare the reset. It is the kind of clean you feel before you
              even start the engine.
            </p>
          </div>
          <BeforeAfterSlider />
        </div>
      </section>

      <section id="how" className="services-section compact-section" aria-labelledby="how-title">
        <div className="services-container">
          <div className="services-header split-header">
            <div>
              <p className="section-kicker">3 simple steps</p>
              <h2 id="how-title" className="services-title">
                How Mobile Detailing Works.
              </h2>
            </div>
            <p className="services-intro">
              Quick quote, easy scheduling, mobile service.
            </p>
          </div>
          <ol className="how-steps">
            <li className="how-step">
              <span className="how-icon">
                <MessageCircle size={30} strokeWidth={1.8} />
              </span>
              <span className="how-step-num">01</span>
              <h3>Request quote</h3>
            </li>
            <li className="how-step">
              <span className="how-icon">
                <Check size={30} strokeWidth={1.8} />
              </span>
              <span className="how-step-num">02</span>
              <h3>Pick service</h3>
            </li>
            <li className="how-step">
              <span className="how-icon">
                <CalendarCheck size={30} strokeWidth={1.8} />
              </span>
              <span className="how-step-num">03</span>
              <h3>We come to you</h3>
            </li>
          </ol>
        </div>
      </section>

      <section id="reviews" className="services-section compact-section" aria-labelledby="reviews-title">
        <div className="services-container">
          <div className="services-header split-header">
            <div>
              <p className="section-kicker">Local clients</p>
              <h2 id="reviews-title" className="services-title">
                What Charleston Clients Say.
              </h2>
            </div>
            <p className="services-intro">
              5-star mobile detailing from local drivers.
            </p>
          </div>
          <ReviewsGrid />
        </div>
      </section>

      <section id="booking" className="booking-section" aria-labelledby="booking-title">
        <div className="services-container booking-grid">
          <div>
            <p className="section-kicker">Get on the schedule</p>
            <h2 id="booking-title" className="services-title">
              Get a clear quote
            </h2>
            <p className="services-intro">
              Name, phone, vehicle, service, and preferred date. We&apos;ll handle the rest.
            </p>
            <div className="booking-notes">
              <span>
                <Check size={16} /> Mobile service
              </span>
              <span>
                <Check size={16} /> Weekend availability
              </span>
              <span>
                <Check size={16} /> Premium interior and exterior care
              </span>
            </div>
          </div>
          <LeadForm />
        </div>
      </section>

      <footer className="site-footer" aria-label="Footer">
        <div className="footer-inner">
          <div className="footer-col">
            <span className="footer-label">Phone</span>
            <a href="tel:+18435322909">843 532 2909</a>
          </div>
          <div className="footer-col">
            <span className="footer-label">Instagram</span>
            <a href="https://instagram.com/843shine" target="_blank" rel="noopener noreferrer">
              @843shine
            </a>
          </div>
          <div className="footer-col">
            <span className="footer-label">Service Area</span>
            <span>Charleston, SC & Lowcountry</span>
          </div>
          <div className="footer-col">
            <span className="footer-label">Hours</span>
            <span>Mon-Sat + select weekends</span>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} 843Shine</span>
        </div>
      </footer>

      <nav className="sticky-mobile-cta" aria-label="Quick contact actions">
        <a href="sms:+18435322909">
          <MessageCircle size={17} /> Text Us
        </a>
        <a href="#booking">
          <ArrowUpRight size={17} /> Get Quote
        </a>
        <a href="#booking">
          <CalendarCheck size={17} /> Book Now
        </a>
      </nav>
    </main>
  );
}
