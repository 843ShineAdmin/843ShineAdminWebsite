"use client";

import {
  ArrowRight,
  ArrowUpRight,
  CalendarCheck,
  Car,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
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
  { icon: Star, value: "5-star rated", gold: true },
  { icon: Car, value: "600+ cars detailed" },
  { icon: MapPin, value: "Mobile service" },
  { icon: ShieldCheck, value: "Locally owned" },
  { icon: Clock, value: "Weekend" },
];

const packages = [
  {
    title: "Full Detail",
    description: "The complete reset for vehicles that need inside-out refinement.",
    price: "$250",
    originalPrice: "$290",
    featured: true,
    image: "/Images/Image1.png",
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
    price: "$160",
    image: "/Images/Interior.png",
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
    price: "$130",
    image: "/Images/ExteriorImage.png",
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
    label: "Full Detail",
    before: "/Images/DefenderDirty.png",
    after: "/Images/DefenderClean.jpg",
    alt: "Full detail before and after mobile detailing",
  },
  {
    label: "Exterior Detail",
    before: "/Images/VWDirty.png",
    after: "/Images/VWClean.jpg",
    alt: "Exterior detail before and after mobile detailing",
  },
  {
    label: "Interior Detail",
    before: "/Images/InteriorDirty.png",
    after: "/Images/InteriorClean.jpg",
    alt: "Interior detail before and after mobile detailing",
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

const faqItems = [
  {
    question: "What do you need at my location?",
    answer:
      "843Shine operates from a mobile detailing unit. For full-quality service, we need working electricity, running water, and reasonable parking close enough to safely run our equipment.",
    bullets: [
      "Electricity: standard outdoor outlet or an accessible indoor outlet with an extension cord path",
      "Water: outdoor spigot or hose bib",
      "Parking: close enough to your vehicle for hoses, cords, and our setup",
      "If power or water is unavailable at service time, we may not be able to complete the full detail and a trip fee may apply",
      "Tell us when booking if either is missing — we carry limited backup options in some cases",
    ],
  },
  {
    question: "Do you service condos, apartments, and gated communities?",
    answer:
      "Yes — we regularly detail at condos, apartments, and gated homes across the Lowcountry. A smooth appointment comes down to access and parking.",
    bullets: [
      "Share gate codes, call box instructions, or visitor parking rules when you book",
      "Make sure your vehicle is accessible at the scheduled time (not blocked in)",
      "Confirm parking is close enough for us to run equipment safely to your car",
      "If your community restricts mobile vendors or water/electric hookups, let us know upfront so we can plan",
    ],
  },
  {
    question: "What is your rain and weather policy?",
    answer:
      "Charleston weather can change fast. If rain or storms are expected at your appointment time, we will reach out to reschedule at no charge.",
    bullets: [
      "Weather-related reschedules initiated by 843Shine do not incur a cancellation fee",
      "We would rather move your appointment than deliver a compromised finish in bad weather",
    ],
  },
  {
    question: "What are your timing, cancellation, and late-arrival policies?",
    answer:
      "We reserve travel and setup time for each appointment. Please give us as much notice as possible if your plans change.",
    bullets: [
      "24 hours notice is requested for any cancellation or reschedule",
      "Cancellations under 24 hours before your appointment are subject to a $75 fee",
      "No-shows without notice are also subject to the $75 fee",
      "We build small buffers into our schedule; if we are running more than 15 minutes behind, we will text or call you",
    ],
  },
  {
    question: "How should I prepare my vehicle?",
    answer:
      "A quick prep helps us focus on the detail instead of sorting through clutter.",
    bullets: [
      "Remove personal items, trash, and valuables before we arrive",
      "Tell us in advance about excessive pet hair, mold, biohazards, or heavily soiled interiors",
      "Unusual condition may require extra time or an adjusted quote before we begin",
    ],
  },
  {
    question: "When is payment due and what do you accept?",
    answer: "Payment is due when service is complete.",
    bullets: [
      "We accept Venmo, Apple Pay, Cash App, Zelle, check, and cash",
      "Quotes given at booking are estimates — final price may adjust if vehicle condition differs significantly from what was described",
    ],
  },
];

const navItems = [
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "How It Works", href: "#how" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
];

const BOOKING_PHONE_E164 = "+18435322909";
const BOOKING_PHONE_DISPLAY = "(843) 532-2909";

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

function buildBookingMessage(details: BookingDetails) {
  return [
    "Hi 843Shine! I'd like to book a mobile detail.",
    "",
    `Name: ${details.name}`,
    `Email: ${details.email}`,
    `Phone: ${details.phone}`,
    `Vehicle: ${details.vehicle}`,
    `Service: ${details.service}`,
  ].join("\n");
}

function buildBookingSmsUrl(details: BookingDetails) {
  return `sms:${BOOKING_PHONE_E164}?body=${encodeURIComponent(buildBookingMessage(details))}`;
}

function LeadForm() {
  const [submitted, setSubmitted] = useState(false);
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

    setBookingDetails(details);
    setSubmitted(true);
    window.location.href = buildBookingSmsUrl(details);
  };

  if (submitted && bookingDetails) {
    return (
      <div className="lead-success">
        <h3>Your booking text is ready.</h3>
        <p>
          We opened your messages app with everything filled in for {BOOKING_PHONE_DISPLAY}. Tap
          send to complete your request.
        </p>
        <pre className="lead-message-preview">{buildBookingMessage(bookingDetails)}</pre>
        <a className="lead-cta" href={buildBookingSmsUrl(bookingDetails)}>
          <MessageCircle size={18} strokeWidth={2} /> Send booking text
        </a>
        <button
          type="button"
          className="lead-reset"
          onClick={() => {
            setSubmitted(false);
            setBookingDetails(null);
          }}
        >
          Edit details
        </button>
      </div>
    );
  }

  return (
    <form className="lead-form" onSubmit={onSubmit}>
      <div className="lead-form-header">
        <h3>Get booked</h3>
        <p>
          Fill this out and we&apos;ll open a text to {BOOKING_PHONE_DISPLAY} with your info and
          service already formatted.
        </p>
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
        <MessageCircle size={18} strokeWidth={2} /> Text booking request
      </button>
    </form>
  );
}

function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [touchPaused, setTouchPaused] = useState(false);
  const carouselItems = [...galleryItems, ...galleryItems];
  const trackPaused = lightboxIndex !== null || touchPaused;

  useEffect(() => {
    if (lightboxIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLightboxIndex(null);
        return;
      }

      if (event.key === "ArrowLeft") {
        setLightboxIndex(
          (current) =>
            current === null
              ? null
              : (current - 1 + galleryItems.length) % galleryItems.length,
        );
      }

      if (event.key === "ArrowRight") {
        setLightboxIndex(
          (current) => (current === null ? null : (current + 1) % galleryItems.length),
        );
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [lightboxIndex]);

  return (
    <>
      <div className="gallery-shell">
        <div
          className="gallery-viewport"
          onTouchStart={() => setTouchPaused(true)}
          onTouchEnd={() => setTouchPaused(false)}
          onTouchCancel={() => setTouchPaused(false)}
        >
          <div className={`gallery-track${trackPaused ? " gallery-track-paused" : ""}`}>
            {carouselItems.map((item, index) => (
              <figure
                className="gallery-card gallery-ba-card"
                key={`${item.label}-${index}`}
                onClick={() => setLightboxIndex(index % galleryItems.length)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setLightboxIndex(index % galleryItems.length);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label={`View ${item.alt}`}
              >
                <div className="gallery-ba-split">
                  <div className="gallery-ba-pane">
                    <Image
                      src={item.before}
                      alt={`${item.label} before detailing`}
                      fill
                      sizes="(max-width: 768px) 40vw, 190px"
                    />
                    <span className="gallery-ba-tag">Before</span>
                  </div>
                  <div className="gallery-ba-pane">
                    <Image
                      src={item.after}
                      alt={`${item.label} after detailing`}
                      fill
                      sizes="(max-width: 768px) 40vw, 190px"
                    />
                    <span className="gallery-ba-tag gallery-ba-tag-after">After</span>
                  </div>
                </div>
                <figcaption>{item.label}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>

      <p className="gallery-hint">Before &amp; after results · Hover or swipe to pause · Tap to enlarge</p>

      {lightboxIndex !== null ? (
        <div
          className="gallery-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Gallery preview"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            type="button"
            className="gallery-lightbox-close"
            onClick={() => setLightboxIndex(null)}
            aria-label="Close gallery preview"
          >
            <X size={22} strokeWidth={2} />
          </button>

          <button
            type="button"
            className="gallery-lightbox-nav gallery-lightbox-prev"
            onClick={(event) => {
              event.stopPropagation();
              setLightboxIndex(
                (current) =>
                  current === null
                    ? null
                    : (current - 1 + galleryItems.length) % galleryItems.length,
              );
            }}
            aria-label="Previous photo"
          >
            <ChevronLeft size={28} strokeWidth={2} />
          </button>

          <figure className="gallery-lightbox-stage gallery-lightbox-ba" onClick={(event) => event.stopPropagation()}>
            <div className="gallery-ba-split gallery-ba-split-large">
              <div className="gallery-ba-pane">
                <Image
                  src={galleryItems[lightboxIndex].before}
                  alt={`${galleryItems[lightboxIndex].label} before detailing`}
                  fill
                  sizes="50vw"
                  priority
                />
                <span className="gallery-ba-tag">Before</span>
              </div>
              <div className="gallery-ba-pane">
                <Image
                  src={galleryItems[lightboxIndex].after}
                  alt={`${galleryItems[lightboxIndex].label} after detailing`}
                  fill
                  sizes="50vw"
                  priority
                />
                <span className="gallery-ba-tag gallery-ba-tag-after">After</span>
              </div>
            </div>
            <figcaption>{galleryItems[lightboxIndex].label}</figcaption>
          </figure>

          <button
            type="button"
            className="gallery-lightbox-nav gallery-lightbox-next"
            onClick={(event) => {
              event.stopPropagation();
              setLightboxIndex(
                (current) => (current === null ? null : (current + 1) % galleryItems.length),
              );
            }}
            aria-label="Next photo"
          >
            <ChevronRight size={28} strokeWidth={2} />
          </button>

          <span className="gallery-lightbox-counter">
            {lightboxIndex + 1} / {galleryItems.length}
          </span>
        </div>
      ) : null}
    </>
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
            src="/Images/843ShineLogo.png"
            alt="843Shine logo"
            width={44}
            height={44}
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
            <a className="secondary-link" href={`sms:${BOOKING_PHONE_E164}`}>
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
        {trustItems.map(({ icon: Icon, value, gold }) => (
          <div className={`trust-item${gold ? " trust-item-gold" : ""}`} key={value}>
            <Icon size={22} strokeWidth={1.8} fill={gold ? "currentColor" : undefined} />
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
              <article
                className={`service-card${item.featured ? " service-card-featured" : ""}`}
                key={item.title}
              >
                {item.featured ? (
                  <span className="service-card-badge">Best value</span>
                ) : null}
                <div className="service-card-image">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="service-card-photo"
                  />
                </div>
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
                    <div className="service-price-block">
                      {item.originalPrice ? (
                        <span className="service-price-original">
                          Originally {item.originalPrice}
                        </span>
                      ) : null}
                      <div className="service-price">{item.price}</div>
                    </div>
                    <a className="service-learn" href="#booking">
                      <strong>Book now!</strong> <ArrowRight size={18} strokeWidth={2} />
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
              Real before-and-after results from Charleston driveways.
            </p>
          </div>
          <Gallery />
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
              <span className="how-icon" aria-hidden="true">
                <MessageCircle size={22} strokeWidth={1.8} />
              </span>
              <span className="how-step-num">01</span>
              <h3>Request quote</h3>
              <p>Tell us about your vehicle and the finish you want.</p>
            </li>
            <li className="how-step">
              <span className="how-icon" aria-hidden="true">
                <Check size={22} strokeWidth={1.8} />
              </span>
              <span className="how-step-num">02</span>
              <h3>Pick service</h3>
              <p>Choose full, interior, or exterior detailing.</p>
            </li>
            <li className="how-step">
              <span className="how-icon" aria-hidden="true">
                <CalendarCheck size={22} strokeWidth={1.8} />
              </span>
              <span className="how-step-num">03</span>
              <h3>We come to you</h3>
              <p>We arrive at your driveway ready to work.</p>
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

      <section id="faq" className="services-section compact-section" aria-labelledby="faq-title">
        <div className="services-container">
          <div className="services-header split-header">
            <div>
              <p className="section-kicker">Service policy</p>
              <h2 id="faq-title" className="services-title">
                Frequently Asked Questions.
              </h2>
            </div>
            <p className="services-intro">
              Timing, access, weather, and what to expect before we arrive.
            </p>
          </div>
          <div className="faq-list">
            {faqItems.map((item) => (
              <details className="faq-item" key={item.question}>
                <summary>
                  <span>{item.question}</span>
                  <ChevronDown className="faq-chevron" size={20} strokeWidth={2} aria-hidden="true" />
                </summary>
                <div className="faq-answer">
                  <p>{item.answer}</p>
                  <ul>
                    {item.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              </details>
            ))}
          </div>
          <p className="faq-footnote">
            Questions about your appointment?{" "}
            <a href={`sms:${BOOKING_PHONE_E164}`}>Text us at {BOOKING_PHONE_DISPLAY}</a>. 843Shine may
            update this
            policy at any time.
          </p>
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
              All booking requests go straight to {BOOKING_PHONE_DISPLAY} as a formatted text.
            </p>
            <div className="booking-notes">
              <span>
                <Check size={16} /> Texts to {BOOKING_PHONE_DISPLAY}
              </span>
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
            <a href={`tel:${BOOKING_PHONE_E164}`}>{BOOKING_PHONE_DISPLAY}</a>
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
        <a href={`sms:${BOOKING_PHONE_E164}`}>
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
