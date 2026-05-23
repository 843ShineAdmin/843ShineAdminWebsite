"use client";

import { ArrowUpRight, ArrowRight, Menu, X } from "lucide-react";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

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
        alt="After detail"
        className="ba-img"
        fill
        sizes="(max-width: 1400px) 100vw, 1400px"
        draggable={false}
      />
      <div className="ba-before-wrap" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Image
          src="/Images/Before.png"
          alt="Before detail"
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

const reviews = [
  "Car looked brand new again.",
  "Super easy process and crazy good results.",
  "Best detail I've ever had — worth every dollar.",
  "Showed up on time, left the car spotless.",
  "Genuinely the cleanest my car has ever been.",
];

function LeadForm() {
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: POST lead data to your endpoint / Meta CAPI / Zapier webhook here.
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="lead-success">
        <h3>Thanks — we&apos;ve got your details.</h3>
        <p>Pick a time that works for you and we&apos;ll lock it in.</p>
        <a
          className="lead-cta"
          href="https://calendly.com/your-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          Book your time
        </a>
      </div>
    );
  }

  return (
    <form className="lead-form" onSubmit={onSubmit}>
      <input
        className="lead-input"
        name="name"
        type="text"
        placeholder="Name"
        required
        autoComplete="name"
      />
      <input
        className="lead-input"
        name="phone"
        type="tel"
        placeholder="Phone"
        required
        autoComplete="tel"
      />
      <input
        className="lead-input"
        name="vehicle"
        type="text"
        placeholder="Vehicle (Year / Make / Model)"
        required
      />
      <select className="lead-input" name="service" required defaultValue="">
        <option value="" disabled>Service wanted</option>
        <option value="full">Full Detail</option>
        <option value="interior">Interior Detail</option>
        <option value="exterior">Exterior Detail</option>
      </select>
      <button type="submit" className="lead-submit">
        Submit
      </button>
    </form>
  );
}

function ReviewsCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % reviews.length);
    }, 4500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="reviews-carousel">
      <div className="reviews-track">
        {reviews.map((quote, i) => (
          <figure
            key={quote}
            className={`review-slide ${i === index ? "is-active" : ""}`}
            aria-hidden={i !== index}
          >
            <div className="review-stars" aria-label="5 out of 5 stars">★★★★★</div>
            <blockquote>“{quote}”</blockquote>
          </figure>
        ))}
      </div>
      <div className="reviews-dots" role="tablist">
        {reviews.map((_, i) => (
          <button
            key={i}
            className={`reviews-dot ${i === index ? "is-active" : ""}`}
            onClick={() => setIndex(i)}
            aria-label={`Show review ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

const navItems = [
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#before-after" },
  { label: "How It Works", href: "#how" },
  { label: "Reviews", href: "#reviews" },
];

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <main className="site-shell">
      <header className="topbar" aria-label="Primary navigation">
        <a className="brand" href="#" aria-label="843Shine home">
          843Shine
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
            <a
              href={item.href}
              key={item.href}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a
            className="mobile-quote-button"
            href="#booking"
            onClick={() => setMobileMenuOpen(false)}
          >
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
            Premium mobile detailing in Charleston — experience the prestige of a professionally
            detailed car, refined at every turn.
          </p>
          <a className="connect-link" href="#booking">
            Let&apos;s connect <ArrowUpRight size={22} strokeWidth={2} />
          </a>
        </div>

        <Image
          src="/Images/BrandingImage1.png"
          alt="Luxury car"
          className="hero-image"
          width={1400}
          height={900}
          priority
          sizes="(max-width: 1400px) 100vw, 1400px"
        />
      </section>

      <section id="services" className="services-section" aria-labelledby="services-title">
        <div className="services-container">
          <p className="services-kicker">843 Shine Detailing</p>
          <div className="services-divider" />
          <div className="services-header">
            <h2 id="services-title" className="services-title">Love in Every Detail</h2>
            <p className="services-intro">
              Immerse yourself in luxury with our bespoke detailing packages tailored to your car&apos;s unique needs.
            </p>
          </div>
          <div className="services-grid">
            <article className="service-card">
              <div className="service-card-image service-card-image-1" aria-hidden="true" />
              <h3>Full Detail</h3>
              <p>Complete interior + exterior clean.</p>
              <div className="service-price">$249</div>
              <a className="service-learn" href="#booking">
                Learn more <ArrowRight size={18} strokeWidth={2} />
              </a>
            </article>
            <article className="service-card">
              <div className="service-card-image service-card-image-2" aria-hidden="true" />
              <h3>Interior Detail</h3>
              <p>Seats, carpets, vacuum, wipe down, deep clean.</p>
              <div className="service-price">$149</div>
              <a className="service-learn" href="#booking">
                Learn more <ArrowRight size={18} strokeWidth={2} />
              </a>
            </article>
            <article className="service-card">
              <div className="service-card-image service-card-image-3" aria-hidden="true" />
              <h3>Exterior Detail</h3>
              <p>Hand wash, wheels, tire shine, windows.</p>
              <div className="service-price">$129</div>
              <a className="service-learn" href="#booking">
                Learn more <ArrowRight size={18} strokeWidth={2} />
              </a>
            </article>
          </div>
        </div>
      </section>

      <section id="before-after" className="services-section" aria-labelledby="ba-title">
        <div className="services-container">
          <div className="services-header">
            <h2 id="ba-title" className="services-title">See the Difference</h2>
          </div>
          <BeforeAfterSlider />
        </div>
      </section>

      <section id="how" className="services-section" aria-labelledby="how-title">
        <div className="services-container">
          <div className="services-header how-header">
            <h2 id="how-title" className="services-title">3 simple steps.</h2>
          </div>
          <ol className="how-steps">
            <li className="how-step">
              <span className="how-step-num">01</span>
              <h3>Request Quote</h3>
            </li>
            <li className="how-step">
              <span className="how-step-num">02</span>
              <h3>Pick Service</h3>
            </li>
            <li className="how-step">
              <span className="how-step-num">03</span>
              <h3>We Come To You</h3>
            </li>
          </ol>
        </div>
      </section>

      <section id="reviews" className="services-section" aria-labelledby="reviews-title">
        <div className="services-container">
          <div className="services-header">
            <h2 id="reviews-title" className="services-title">What Clients Say</h2>
          </div>
          <ReviewsCarousel />
        </div>
      </section>

      <section id="booking" className="services-section" aria-labelledby="booking-title">
        <div className="services-container">
          <div className="services-header">
            <h2 id="booking-title" className="services-title">Contact us.</h2>
            <p className="services-intro">
              Tell us about your vehicle and we&apos;ll be in touch to confirm a time.
            </p>
          </div>
          <LeadForm />
        </div>
      </section>

      <footer className="site-footer" aria-label="Footer">
        <div className="footer-inner">
          <div className="footer-col">
            <span className="footer-label">Phone</span>
            <a href="tel:+18435550000">(843) 555-0000</a>
          </div>
          <div className="footer-col">
            <span className="footer-label">Instagram</span>
            <a href="https://instagram.com/843shine" target="_blank" rel="noopener noreferrer">
              @843shine
            </a>
          </div>
          <div className="footer-col">
            <span className="footer-label">Service Area</span>
            <span>Charleston & Lowcountry</span>
          </div>
          <div className="footer-col">
            <span className="footer-label">Hours</span>
            <span>Mon–Sat · 8am–6pm</span>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} 843Shine</span>
        </div>
      </footer>
    </main>
  );
}
