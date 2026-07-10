import { useState, useEffect } from "react";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import jsx from "react-syntax-highlighter/dist/esm/languages/prism/jsx";
import oneDark from "react-syntax-highlighter/dist/esm/styles/prism/one-dark";

function App() {
  SyntaxHighlighter.registerLanguage("jsx", jsx);
  const [count, setCount] = useState(0);

  // State to store the code content
  const [code, setCode] = useState("");
  // State to handle potential loading state
  const [isLoading, setIsLoading] = useState(true);
  // State to handle potential errors
  const [error, setError] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Define an async function to handle the fetch call
    const fetchCode = async () => {
      try {
        const response = await fetch("/App.jsx"); // Use the public path to your file
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text();
        setCode(text);
      } catch (e) {
        setError(e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCode();
  }, []); // The empty dependency array ensures this effect runs only once

  if (isLoading) {
    return <p>Loading code...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const customStyle = {
    lineHeight: "1",
    fontSize: ".8rem",
    borderRadius: "5px",
  };

  return (
    <>
      <div class="top-bar">
        <div class="top-bar-inner">
          <div class="top-bar-left">
            <span class="tb-brewing">Now Brewing</span>
            <span>Ethiopia Yirgacheffe · Layo Teraga</span>
            <span>Roasted Tuesday</span>
          </div>
          <div class="top-bar-right">
            <span class="tb-ship">Free shipping on orders over $45</span>
            <span>Ships Tue &amp; Fri · Fresh within 5 days</span>
          </div>
        </div>
      </div>

      {/* <!-- NAV --> */}
      <nav className={`site-nav${isScrolled ? " scrolled" : ""}`}>
        <div class="nav-inner">
          <div class="nav-wordmark">
            Jessna <em>Rodriguez</em>
          </div>
          <div class="nav-links">
            <a href="#menu">Menu</a>
            <a href="#origins">Origins</a>
            <a href="#roastery">Our Story</a>
            <a href="#brew">Brew Guide</a>
            <a href="#subscribe">Subscribe</a>
          </div>
          <a href="#subscribe" class="nav-cta">
            Order Online
          </a>
        </div>
      </nav>

      {/* <!-- ============================================================
     HERO  —  split layout with roastery lens art + steam
============================================================ --> */}
      <section class="hero">
        <div class="inner">
          <div class="hero-content">
            <div class="hero-overline">
              Specialty Roastery &amp; Café · Boise, ID
            </div>
            <h1 class="hero-h1">
              Coffee Worth
              <em>Slowing</em>
              Down For.
            </h1>
            <p class="hero-sub">
              Every coffee we roast begins with a relationship — a farmer, a
              lot, and a story. We source direct, roast small, and ship fresh so
              you can taste exactly what we tasted at origin.
            </p>
            <div class="hero-ctas">
              <a href="#menu" class="btn btn-caramel btn-lg">
                Explore the Menu
              </a>
              <a href="#subscribe" class="btn btn-outline btn-lg">
                Start a Subscription
              </a>
            </div>
            <div class="hero-trust">
              <div class="trust-chip">🌱 Direct Trade</div>
              <div class="trust-chip">🔥 Small Batch</div>
              <div class="trust-chip">📦 Ships Within 5 Days</div>
              <div class="trust-chip">♻️ Sustainable</div>
            </div>
          </div>
        </div>

        {/* <!-- Roastery lens art --> */}
        <div class="hero-art" aria-hidden="true">
          {/* <!-- Ambient outer glow --> */}
          <div class="hero-art-glow"></div>
          {/* <!-- Orbit ring --> */}
          <div class="hero-orbit"></div>
          {/* <!-- Lens circle --> */}
          <div class="hero-lens">
            <div class="lens-glow"></div>
            <div class="lens-beans"></div>
            {/* <!-- Latte-art concentric rings --> */}
            <div
              class="latte-ring"
              style={{ width: "75%", height: "75%" }}
            ></div>
            <div
              class="latte-ring"
              style={{ width: "55%", height: "55%" }}
            ></div>
            <div
              class="latte-ring"
              style={{ width: "37%", height: "37%" }}
            ></div>
            <div
              class="latte-ring"
              style={{
                width: "20%",
                height: "20%",
                background: "rgba(201,123,44,.06)",
              }}
            ></div>
          </div>
          {/* <!-- Steam rising from center of lens --> */}
          <div class="hero-steam">
            <div class="h-wisp h-wisp-a"></div>
            <div class="h-wisp h-wisp-b"></div>
            <div class="h-wisp h-wisp-c"></div>
            <div class="h-wisp h-wisp-d"></div>
          </div>
          {/* <!-- Floating origin labels --> */}
          <div class="origin-label" style={{ top: "18%", left: "4%" }}>
            Ethiopia
          </div>
          <div class="origin-label" style={{ top: "55%", right: "2%" }}>
            Colombia
          </div>
          <div class="origin-label" style={{ bottom: "22%", left: "10%" }}>
            Indonesia
          </div>
          <div
            class="origin-label"
            style={{ top: "38%", right: "4%", opacity: ".6" }}
          >
            Guatemala
          </div>
        </div>
      </section>

      {/* <!-- WAVE: hero → caramel marquee --> */}
      <div class="wave" style={{ background: "var(--caramel)" }}>
        <svg
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
          style={{ height: "60px" }}
        >
          <path
            d="M0,30 C480,55 960,5 1440,30 L1440,60 L0,60 Z"
            fill="var(--bg)"
          />
        </svg>
      </div>

      {/* <!-- MARQUEE --> */}
      <div class="marquee-section marquee-caramel">
        <div class="marquee-track">
          <span class="marquee-item">
            Single Origin<span class="sep"></span>
          </span>
          <span class="marquee-item">
            Direct Trade<span class="sep"></span>
          </span>
          <span class="marquee-item">
            Small Batch Roasted<span class="sep"></span>
          </span>
          <span class="marquee-item">
            Ethiopia · Colombia · Indonesia<span class="sep"></span>
          </span>
          <span class="marquee-item">
            Fresh Within 5 Days<span class="sep"></span>
          </span>
          <span class="marquee-item">
            Specialty Grade Only<span class="sep"></span>
          </span>
          <span class="marquee-item">
            Single Origin<span class="sep"></span>
          </span>
          <span class="marquee-item">
            Direct Trade<span class="sep"></span>
          </span>
          <span class="marquee-item">
            Small Batch Roasted<span class="sep"></span>
          </span>
          <span class="marquee-item">
            Ethiopia · Colombia · Indonesia<span class="sep"></span>
          </span>
          <span class="marquee-item">
            Fresh Within 5 Days<span class="sep"></span>
          </span>
          <span class="marquee-item">
            Specialty Grade Only<span class="sep"></span>
          </span>
        </div>
      </div>
      <div class="marquee-section marquee-dark">
        <div class="marquee-track rev">
          <span class="marquee-item">
            Pour-Over Bar<span class="sep"></span>
          </span>
          <span class="marquee-item">
            Espresso Service<span class="sep"></span>
          </span>
          <span class="marquee-item">
            Cold Brew<span class="sep"></span>
          </span>
          <span class="marquee-item">
            Daily Pastries<span class="sep"></span>
          </span>
          <span class="marquee-item">
            Subscription Roasts<span class="sep"></span>
          </span>
          <span class="marquee-item">
            Wholesale Programs<span class="sep"></span>
          </span>
          <span class="marquee-item">
            Pour-Over Bar<span class="sep"></span>
          </span>
          <span class="marquee-item">
            Espresso Service<span class="sep"></span>
          </span>
          <span class="marquee-item">
            Cold Brew<span class="sep"></span>
          </span>
          <span class="marquee-item">
            Daily Pastries<span class="sep"></span>
          </span>
          <span class="marquee-item">
            Subscription Roasts<span class="sep"></span>
          </span>
          <span class="marquee-item">
            Wholesale Programs<span class="sep"></span>
          </span>
        </div>
      </div>

      {/* <!-- WAVE: dark marquee → light cream origins --> */}
      <div class="wave" style={{ background: "var(--surface-1)" }}>
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          style={{ height: "80px" }}
        >
          <path
            d="M0,60 C480,10 960,70 1440,20 L1440,80 L0,80 Z"
            fill="#F2EBD9"
          />
        </svg>
      </div>

      {/* <!-- ============================================================
     ORIGINS BENTO  —  warm cream bg (strong contrast)
============================================================ --> */}
      <section class="origins-section" id="origins">
        <div style={{ maxWidth: "var(--max-w)", margin: "0 auto 3rem" }}>
          <div class="section-label dark-label">
            <span class="sl-line"></span>Where It Comes From
          </div>
          <h2 class="origins-h2">
            Every Cup Starts
            <br />
            at the <em>Source.</em>
          </h2>
          <p class="origins-sub">
            We travel to origin, cup on-site, and build lasting relationships
            with producers. What you brew is exactly what we fell in love with
            at elevation.
          </p>
        </div>

        <div class="origins-bento">
          {/* <!-- Featured: Ethiopia --> */}
          <div class="ob-card ob-featured">
            <div class="obf-region">🇪🇹 East Africa · Ethiopia</div>
            <div class="obf-name">
              Yirgacheffe
              <br />
              <em>Layo Teraga</em>
            </div>
            <p class="obf-notes">
              "Bergamot, lemon curd, jasmine — a floral brightness unlike
              anything from other regions. Picked and washed at 1,850 meters by
              the Layo Teraga cooperative."
            </p>
            <div class="obf-pills">
              <span class="obf-pill">Washed</span>
              <span class="obf-pill">Light Roast</span>
              <span class="obf-pill">1,850m</span>
              <span class="obf-pill">Direct Trade</span>
            </div>
            <a class="obf-link" href="#">
              Explore this origin ›
            </a>
          </div>
          {/* <!-- Seasonal --> */}
          <div class="ob-card ob-caramel">
            <div class="ob-icon">🌸</div>
            <div class="ob-title">Seasonal Blend</div>
            <p class="ob-desc">
              Our rotating seasonal blend changes every 8 weeks. Currently:
              Colombia + Guatemala — brown sugar, stone fruit, silky finish.
            </p>
          </div>
          {/* <!-- Cold brew --> */}
          <div class="ob-card ob-dark">
            <div class="ob-icon">🧊</div>
            <div class="ob-title">Cold Brew Concentrate</div>
            <p class="ob-desc">
              18-hour cold steep. Deep chocolate, brown sugar, effortless
              finish. Dilute 1:1 or sip straight over ice.
            </p>
          </div>
          {/* <!-- Colombia --> */}
          <div class="ob-card ob-light">
            <div class="ob-icon">🇨🇴</div>
            <div class="ob-title">Huila, Colombia</div>
            <p class="ob-desc">
              Red apple, brown sugar, walnut. A reliable sweetness that works
              beautifully across every brew method.
            </p>
          </div>
          {/* <!-- Indonesia --> */}
          <div class="ob-card ob-light">
            <div class="ob-icon">🇮🇩</div>
            <div class="ob-title">Sumatra Mandheling</div>
            <p class="ob-desc">
              Dark chocolate, cedar, long finish. Our boldest roast — for those
              who want coffee that means business.
            </p>
          </div>
          {/* <!-- Wholesale — wide --> */}
          <div class="ob-card ob-dark ob-wide">
            <div class="ow-icon">📦</div>
            <div class="ow-body">
              <div class="ob-title">Wholesale &amp; Café Programs</div>
              <p class="ob-desc">
                We roast for over 40 cafés across the Pacific Northwest.
                Flexible volumes, direct partnership, and a dedicated account
                manager from day one.
              </p>
            </div>
          </div>
          {/* <!-- Subscription --> */}
          <div class="ob-card ob-caramel">
            <div class="ob-icon">🔄</div>
            <div class="ob-title">Monthly Subscription</div>
            <p class="ob-desc">
              A curated selection shipped fresh — always within 5 days of roast.
              You choose the roast and frequency.
            </p>
          </div>
          {/* <!-- Brewing gear --> */}
          <div class="ob-card ob-light">
            <div class="ob-icon">⚗️</div>
            <div class="ob-title">Brewing Equipment</div>
            <p class="ob-desc">
              V60, Chemex, grinders, kettles — everything to brew like a
              professional at home.
            </p>
          </div>
        </div>
      </section>

      {/* <!-- ============================================================
     ROASTERY STORY  —  3 overlapping stacked panels
============================================================ --> */}
      <section class="roastery-section" id="roastery">
        {/* <!-- Layer 1: caramel --> */}
        <div class="rs-layer-1">
          <div class="rs1-inner">
            <div>
              <div class="rs1-eyebrow">Our Roastery · Est. 2019</div>
              <h2 class="rs1-h2">
                Roasted With
                <br />
                <em>Purpose.</em>
              </h2>
              <p class="rs1-p">
                We roast every Tuesday and Friday in small batches — never more
                than 22kg at a time. The result is consistent, traceable, and
                always fresh. You'll taste the difference on the first sip.
              </p>
            </div>
            <div class="rs1-visual">🔥</div>
          </div>
          {/* <!-- Floating stat card at the seam --> */}
          <div
            style={{
              maxWidth: "var(--max-w)",
              margin: "0 auto",
              position: "relative",
            }}
          >
            <div class="rs-float-card">
              <div class="rfc-label">Max batch size</div>
              <div class="rfc-num">22 kg</div>
              <div class="rfc-sub">
                Roasted Tuesday &amp; Friday · Never more
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Layer 2: dark surface --> */}
        <div class="rs-layer-2">
          <div class="rs2-inner">
            <div class="section-label">
              <span class="sl-line"></span>Why Direct Trade
            </div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem,4vw,3.2rem)",
                fontWeight: 400,
                color: "var(--cream-bright)",
                lineHeight: "1.05",
                letterSpacing: "-.02em",
              }}
            >
              We Know Every
              <br />
              <em
                style={{ fontStyle: "italic", color: "var(--caramel-light)" }}
              >
                Farm We Buy From.
              </em>
            </h2>
            <div class="rs2-grid">
              <div class="rs2-pillar">
                <div class="rs2-pillar-num">100%</div>
                <div class="rs2-pillar-title">Direct Trade</div>
                <p class="rs2-pillar-desc">
                  Every origin in our lineup was sourced through a direct
                  relationship — no middlemen, no mystery lots.
                </p>
              </div>
              <div class="rs2-pillar">
                <div class="rs2-pillar-num">3×</div>
                <div class="rs2-pillar-title">Above Market Price</div>
                <p class="rs2-pillar-desc">
                  We pay a minimum of three times the commodity price on every
                  coffee we buy. Good coffee is worth paying for.
                </p>
              </div>
              <div class="rs2-pillar">
                <div class="rs2-pillar-num">12</div>
                <div class="rs2-pillar-title">Active Partnerships</div>
                <p class="rs2-pillar-desc">
                  Across Ethiopia, Colombia, Indonesia, Guatemala, and Peru —
                  relationships built over years, not contracts.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Layer 3: deepest dark --> */}
        <div class="rs-layer-3">
          <div class="rs3-inner">
            <div>
              <blockquote class="rs3-quote">
                "Specialty coffee at its best is an act of translation — taking
                what a farmer built at 1,800 meters and delivering it faithfully
                to your kitchen."
              </blockquote>
              <div class="rs3-source">
                <div class="rs3-avatar">☕</div>
                <div>
                  <div class="rs3-name">James Okafor</div>
                  <div class="rs3-role">
                    Head Roaster &amp; Co-Founder, Ember Coffee Co.
                  </div>
                </div>
              </div>
            </div>
            <div class="rs3-right">
              <div class="rs3-fact">
                <div class="rs3-fact-icon">🌱</div>
                <div class="rs3-fact-body">
                  <div class="fact-title">Farm Visit Policy</div>
                  <div class="fact-desc">
                    We visit every origin before adding it to the lineup. No
                    exceptions.
                  </div>
                </div>
              </div>
              <div class="rs3-fact">
                <div class="rs3-fact-icon">📊</div>
                <div class="rs3-fact-body">
                  <div class="fact-title">Transparent Pricing</div>
                  <div class="fact-desc">
                    Our coffee pages show the farm gate price we paid. Always.
                  </div>
                </div>
              </div>
              <div class="rs3-fact">
                <div class="rs3-fact-icon">♻️</div>
                <div class="rs3-fact-body">
                  <div class="fact-title">Carbon-Offset Shipping</div>
                  <div class="fact-desc">
                    Every order shipped with verified carbon offsets since 2022.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- WAVE: bg → surface-1 freshness --> */}
      <div class="wave" style={{ background: "var(--bg)" }}>
        <svg
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
          style={{ height: "60px" }}
        >
          <path
            d="M0,30 C200,5 400,55 600,30 C800,5 1000,55 1200,30 C1300,18 1380,42 1440,30 L1440,60 L0,60 Z"
            fill="var(--surface-1)"
          />
        </svg>
      </div>

      {/* <!-- ============================================================
     FRESHNESS PROMISE  —  bold editorial color break
============================================================ --> */}
      <section class="freshness-section">
        <div class="freshness-inner">
          <div class="freshness-steam">
            <div class="fs-wisp"></div>
            <div class="fs-wisp"></div>
            <div class="fs-wisp"></div>
          </div>
          <div class="freshness-eyebrow">The Ember Freshness Promise</div>
          <div class="freshness-num">≤ 5</div>
          <div class="freshness-unit">Days from roast to your door.</div>
          <p class="freshness-desc">
            Most coffee sits in warehouses for weeks before you open the bag.
            Ours ships the same day it's roasted — because freshness isn't a
            marketing line, it's the whole point.
          </p>
          <a href="#subscribe" class="btn btn-caramel btn-lg btn-pill">
            Start Your Subscription →
          </a>
        </div>
      </section>

      {/* <!-- ============================================================
     MENU SECTION  —  product cards
============================================================ --> */}
      <section class="menu-section" id="menu">
        <div class="menu-header">
          <div class="section-label">
            <span class="sl-line"></span>What We Pour
          </div>
          <h2 class="menu-h2">
            The Full <em>Menu.</em>
          </h2>
          <p class="menu-sub">
            Every item — from our single-origins to the cardamom croissant — is
            made with the same intention. No shortcuts.
          </p>
        </div>
        <div class="menu-grid">
          <div class="pcard">
            <div class="pcard-img">☕</div>
            <div class="pcard-body">
              <div class="pcard-tag">Single Origin · Ethiopia</div>
              <div class="pcard-title">Yirgacheffe Natural</div>
              <p class="pcard-desc">
                Dark cherry, baker's chocolate, bergamot. A clean, bright finish
                with exceptional clarity.
              </p>
              <div class="pcard-footer">
                <div class="pcard-price">$22.00</div>
                <a class="pcard-cta" href="#">
                  Order ›
                </a>
              </div>
            </div>
          </div>
          <div class="pcard">
            <div class="pcard-img">🫘</div>
            <div class="pcard-body">
              <div class="pcard-tag">Espresso Blend · Medium Roast</div>
              <div class="pcard-title">Ember House Espresso</div>
              <p class="pcard-desc">
                Milk chocolate, brown sugar, dried cherry. Dialed in for
                espresso — exceptional as a latte.
              </p>
              <div class="pcard-footer">
                <div class="pcard-price">$19.00</div>
                <a class="pcard-cta" href="#">
                  Order ›
                </a>
              </div>
            </div>
          </div>
          <div class="pcard">
            <div class="pcard-img cold">🧊</div>
            <div class="pcard-body">
              <div class="pcard-tag">Cold Brew · 32oz Bottle</div>
              <div class="pcard-title">Midnight Blend Cold Brew</div>
              <p class="pcard-desc">
                18-hour cold steep. Deep chocolate, brown sugar, long finish.
                Serve over ice or diluted 1:1.
              </p>
              <div class="pcard-footer">
                <div class="pcard-price">$14.00</div>
                <a class="pcard-cta" href="#">
                  Order ›
                </a>
              </div>
            </div>
          </div>
          <div class="pcard">
            <div class="pcard-img">🇨🇴</div>
            <div class="pcard-body">
              <div class="pcard-tag">Single Origin · Colombia</div>
              <div class="pcard-title">Huila El Paraíso</div>
              <p class="pcard-desc">
                Red apple, brown sugar, walnut. Sourced directly from the Huila
                region at 1,700m elevation.
              </p>
              <div class="pcard-footer">
                <div class="pcard-price">$20.00</div>
                <a class="pcard-cta" href="#">
                  Order ›
                </a>
              </div>
            </div>
          </div>
          <div class="pcard">
            <div
              class="pcard-img"
              style={{ background: "var(--caramel-dark)" }}
            >
              🌸
            </div>
            <div class="pcard-body">
              <div class="pcard-tag">Seasonal Blend · Limited</div>
              <div class="pcard-title">Spring Equinox Blend</div>
              <p class="pcard-desc">
                Colombia + Guatemala. Stone fruit, jasmine, silky caramel
                finish. Available March–May.
              </p>
              <div class="pcard-footer">
                <div class="pcard-price">$21.00</div>
                <a class="pcard-cta" href="#">
                  Order ›
                </a>
              </div>
            </div>
          </div>
          <div class="pcard">
            <div class="pcard-img pastry">🥐</div>
            <div class="pcard-body">
              <div class="pcard-tag">Pastry · Baked Daily 6am</div>
              <div class="pcard-title">Cardamom Croissant</div>
              <p class="pcard-desc">
                House-laminated, infused with Nordic cardamom, finished with
                pearl sugar. Pick up in café.
              </p>
              <div class="pcard-footer">
                <div class="pcard-price">$5.50</div>
                <a class="pcard-cta" href="#">
                  Add to order ›
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- STATS BAND  —  caramel --> */}
      <div class="stats-band">
        <div class="stats-grid">
          <div class="stat-item">
            <div class="stat-num">12</div>
            <div class="stat-label">Origins Sourced</div>
          </div>
          <div class="stat-item">
            <div class="stat-num">100%</div>
            <div class="stat-label">Direct Trade</div>
          </div>
          <div class="stat-item">
            <div class="stat-num">5,200+</div>
            <div class="stat-label">Active Subscribers</div>
          </div>
          <div class="stat-item">
            <div class="stat-num">4.9 ★</div>
            <div class="stat-label">Average Rating</div>
          </div>
        </div>
      </div>

      {/* <!-- WAVE: surface-1 → bg process --> */}
      <div class="wave" style={{ background: "var(--surface-1)" }}>
        <svg
          viewBox="0 0 1440 70"
          preserveAspectRatio="none"
          style={{ height: "70px" }}
        >
          <path
            d="M0,40 C120,18 240,58 360,40 C480,22 600,58 720,40 C840,22 960,58 1080,40 C1200,22 1320,58 1440,40 L1440,70 L0,70 Z"
            fill="var(--bg)"
          />
        </svg>
      </div>

      {/* <!-- ============================================================
     PROCESS  —  Seed to Cup, horizontal 4 steps
============================================================ --> */}
      <section class="process-section" id="brew">
        <div class="process-header">
          <div class="section-label">
            <span class="sl-line"></span>Seed to Cup
          </div>
          <h2 class="process-h2">
            How We Get It
            <br />
            <em>to You.</em>
          </h2>
          <p class="process-sub">
            Four steps, zero shortcuts. From a single farm lot to your morning
            cup — traceable, fresh, and intentional at every stage.
          </p>
        </div>
        <div class="process-flow">
          <div class="pf-step">
            <div class="pf-num-row">
              <span class="pf-num">01</span>
              <div class="pf-icon">🌱</div>
            </div>
            <div class="pf-title">Source</div>
            <p class="pf-desc">
              We travel to origin, cup on-site, and select lots based on
              quality, traceability, and producer wellbeing — not price alone.
            </p>
            <div class="pf-badge">🌍 12 active origin partnerships</div>
          </div>
          <div class="pf-connector">
            <div class="pf-arrow"></div>
          </div>
          <div class="pf-step">
            <div class="pf-num-row">
              <span class="pf-num">02</span>
              <div class="pf-icon">🔥</div>
            </div>
            <div class="pf-title">Roast</div>
            <p class="pf-desc">
              Every batch roasted in-house, Tuesday and Friday, in quantities of
              22kg or less. Each profile is developed per origin — never a
              generic curve.
            </p>
            <div class="pf-badge">⚖️ 22kg max · Profile-specific roasting</div>
          </div>
          <div class="pf-connector">
            <div class="pf-arrow"></div>
          </div>
          <div class="pf-step">
            <div class="pf-num-row">
              <span class="pf-num">03</span>
              <div class="pf-icon">📦</div>
            </div>
            <div class="pf-title">Pack &amp; Ship</div>
            <p class="pf-desc">
              Orders are packed same-day and shipped with degassing valves to
              preserve freshness. Every bag includes the roast date and brew
              recommendations.
            </p>
            <div class="pf-badge">
              📬 Ships same day · Carbon-offset delivery
            </div>
          </div>
          <div class="pf-connector">
            <div class="pf-arrow"></div>
          </div>
          <div class="pf-step">
            <div class="pf-num-row">
              <span class="pf-num">04</span>
              <div class="pf-icon">☕</div>
            </div>
            <div class="pf-title">Brew</div>
            <p class="pf-desc">
              Every coffee ships with a tailored brew guide — grind size, water
              temperature, and ratio for your preferred method. We want you to
              get the most from every gram.
            </p>
            <div class="pf-badge">📖 Method-specific brew guides included</div>
          </div>
        </div>
      </section>

      {/* <!-- WAVE: bg → surface-2 testimonials --> */}
      <div class="wave" style={{ background: "var(--bg)" }}>
        <svg
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
          style={{ height: "60px" }}
        >
          <path
            d="M0,50 C150,25 280,60 450,35 C580,15 720,62 900,38 C1020,22 1160,55 1300,32 C1360,22 1410,45 1440,35 L1440,60 L0,60 Z"
            fill="var(--surface-2)"
          />
        </svg>
      </div>

      {/* <!-- ============================================================
     TESTIMONIALS
============================================================ --> */}
      <section class="testimonials-section" id="reviews">
        <div class="testi-header">
          <div class="section-label">
            <span class="sl-line"></span>What People Are Saying
          </div>
          <h2 class="testi-h2">
            The Cup
            <br />
            Speaks for <em>Itself.</em>
          </h2>
          <p class="testi-sub">
            Thousands of customers across the country, every morning.
          </p>
        </div>

        <div class="testi-featured">
          <p class="tf-quote">
            "The Yirgacheffe changed the way I think about light roast. I'd
            written it off entirely — then I had this one, and I understand now.
            It's honest, precise, and completely alive in the cup. I've ordered
            it four times."
          </p>
          <div class="tf-author">
            <div class="tf-avatar">☕</div>
            <div>
              <div class="tf-name">Marisol L. · Verified Subscriber</div>
              <div class="tf-role">Boise, ID · Member since 2022</div>
            </div>
            <div class="tf-stars">★★★★★</div>
          </div>
        </div>

        <div class="testi-grid">
          <div class="tc">
            <div class="tc-stars">★★★★★</div>
            <p class="tc-quote">
              "Best pour-over I've had outside of Tokyo. They take their time,
              and it shows in every cup. The Colombia is extraordinary."
            </p>
            <div class="tc-author">
              <div class="tc-avatar">J</div>
              <div>
                <div class="tc-name">James K.</div>
                <div class="tc-role">Coffee writer · Portland, OR</div>
              </div>
            </div>
          </div>
          <div class="tc offset">
            <div class="tc-stars">★★★★★</div>
            <p class="tc-quote">
              "The subscription has genuinely changed my mornings. Always fresh,
              always interesting. I love that I can see the roast date on every
              bag."
            </p>
            <div class="tc-author">
              <div class="tc-avatar">A</div>
              <div>
                <div class="tc-name">Ana P.</div>
                <div class="tc-role">Subscriber since 2021 · Meridian, ID</div>
              </div>
            </div>
          </div>
          <div class="tc offset">
            <div class="tc-stars">★★★★★</div>
            <p class="tc-quote">
              "I finally understand what 'terroir' means in coffee. The way
              Ember describes each origin — and then delivers exactly what they
              promised — is remarkable."
            </p>
            <div class="tc-author">
              <div class="tc-avatar">R</div>
              <div>
                <div class="tc-name">Ryan S.</div>
                <div class="tc-role">Home brewer · Seattle, WA</div>
              </div>
            </div>
          </div>
          <div class="tc">
            <div class="tc-stars">★★★★★</div>
            <p class="tc-quote">
              "Our café has been using Ember's wholesale program for 14 months.
              The consistency is unreal. Our regulars notice every time we
              switch the single-origin."
            </p>
            <div class="tc-author">
              <div class="tc-avatar">D</div>
              <div>
                <div class="tc-name">Dana H.</div>
                <div class="tc-role">Café owner · Boise, ID</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- ============================================================
     SUBSCRIPTION + CTA  —  combined section
============================================================ --> */}
      <section class="subcta-section" id="subscribe">
        {/* <!-- Caramel left --> */}
        <div class="sc-left">
          {/* <!-- Ambient steam in the panel --> */}
          <div class="sc-steam">
            <div class="scs-wisp"></div>
            <div class="scs-wisp"></div>
            <div class="scs-wisp"></div>
          </div>
          <div class="sc-left-inner">
            <div class="sc-overline">Start Your Subscription</div>
            <h2 class="sc-h2">
              Fresh Coffee.
              <br />
              <em>Every Month.</em>
              <br />
              Always.
            </h2>
            <p class="sc-p">
              Your first bag ships within 5 days of roasting. Pause or cancel
              anytime — no fees, no friction. Just exceptional coffee on your
              schedule.
            </p>
            <div class="sc-perks">
              <div class="sc-perk">Ships within 5 days of roast — always</div>
              <div class="sc-perk">Choose roast level and frequency</div>
              <div class="sc-perk">
                Free shipping on every subscription order
              </div>
              <div class="sc-perk">Pause or cancel anytime, no questions</div>
              <div class="sc-perk">Exclusive subscriber origin releases</div>
            </div>
          </div>
        </div>

        {/* <!-- Dark right — form --> */}
        <div class="sc-right">
          <h3 class="sc-form-title">
            Build Your <em>Box.</em>
          </h3>
          <p class="sc-form-sub">Takes 2 minutes. Ships faster than that.</p>
          <form class="sc-form" onsubmit="return false;">
            <div class="form-row">
              <div class="form-group">
                <label>First Name</label>
                <input type="text" placeholder="Maria" />
              </div>
              <div class="form-group">
                <label>Last Name</label>
                <input type="text" placeholder="Santos" />
              </div>
            </div>
            <div class="form-group">
              <label>Email Address</label>
              <input type="email" placeholder="maria@example.com" />
            </div>
            <div class="form-group">
              <label>Roast Preference</label>
              <select>
                <option value="">Select your preference...</option>
                <option>
                  Light — Bright &amp; Fruity (Ethiopia, Guatemala)
                </option>
                <option>Medium — Balanced &amp; Sweet (Colombia, Peru)</option>
                <option>Dark — Bold &amp; Full-Bodied (Sumatra, Brazil)</option>
                <option>Rotating — Surprise me each month</option>
              </select>
            </div>
            <div class="form-group">
              <label>Grind</label>
              <select>
                <option>Whole Bean (recommended)</option>
                <option>Pour-Over / Medium-Fine</option>
                <option>Espresso / Fine</option>
                <option>French Press / Coarse</option>
              </select>
            </div>
            <div class="form-group">
              <label>Delivery Frequency</label>
              <div class="freq-grid">
                <div class="freq-opt selected" onclick="selectFreq(this)">
                  Every 2 Weeks
                </div>
                <div class="freq-opt" onclick="selectFreq(this)">
                  Monthly
                </div>
                <div class="freq-opt" onclick="selectFreq(this)">
                  Every 6 Weeks
                </div>
              </div>
            </div>
            <button
              type="submit"
              class="btn btn-caramel btn-lg btn-block"
              style={{ marginTop: ".5rem" }}
            >
              Start My Subscription →
            </button>
            <div
              style={{
                fontSize: ".75rem",
                color: "var(--muted)",
                textAlign: "center",
                marginTop: ".75rem",
              }}
            >
              No commitment. Cancel anytime. First order ships within 5 days.
            </div>
          </form>
        </div>
      </section>

      {/* <!-- ============================================================
     FOOTER
============================================================ --> */}
      <footer class="site-footer">
        <div class="footer-grid">
          <div>
            <div class="footer-brand-name">
              Ember <em>Coffee</em> Co.
            </div>
            <p class="footer-tagline">
              Small batch roastery and specialty café in Boise, Idaho. Direct
              trade, farm-forward, always fresh.
            </p>
            <div class="footer-badges">
              <span class="f-badge">Direct Trade</span>
              <span class="f-badge">Specialty Grade</span>
              <span class="f-badge">Carbon Offset</span>
              <span class="f-badge">Est. 2019</span>
            </div>
          </div>
          <div>
            <div class="footer-col-title">Order</div>
            <ul class="footer-links">
              <li>
                <a href="#">Single Origins</a>
              </li>
              <li>
                <a href="#">Espresso Blends</a>
              </li>
              <li>
                <a href="#">Cold Brew</a>
              </li>
              <li>
                <a href="#">Pastries</a>
              </li>
              <li>
                <a href="#">Brewing Equipment</a>
              </li>
              <li>
                <a href="#">Gift Cards</a>
              </li>
            </ul>
          </div>
          <div>
            <div class="footer-col-title">Company</div>
            <ul class="footer-links">
              <li>
                <a href="#">Our Story</a>
              </li>
              <li>
                <a href="#">Origins &amp; Sourcing</a>
              </li>
              <li>
                <a href="#">Wholesale</a>
              </li>
              <li>
                <a href="#">Brew Guide</a>
              </li>
              <li>
                <a href="#">Blog</a>
              </li>
              <li>
                <a href="#">Careers</a>
              </li>
            </ul>
          </div>
          <div>
            <div class="footer-col-title">Find Us</div>
            <div class="fci">
              <span class="fci-icon">📍</span>
              <div>
                1248 W Myrtle St
                <br />
                Boise, ID 83702
              </div>
            </div>
            <div class="fci">
              <span class="fci-icon">🕐</span>
              <div>
                Mon–Fri 6am–6pm
                <br />
                Sat–Sun 7am–5pm
              </div>
            </div>
            <div class="fci">
              <span class="fci-icon">✉️</span>
              <div>
                <a href="mailto:hello@embercoffee.co">hello@embercoffee.co</a>
              </div>
            </div>
            <div class="fci">
              <span class="fci-icon">📞</span>
              <div>
                <a href="tel:2085550000">(208) 555-0000</a>
              </div>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© 2026 Ember Coffee Co. All rights reserved.</span>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Accessibility</a>
          </div>
        </div>
      </footer>
      {/* <div className="polaroid-container">
          <div className="polaroid-frame rotate-right">
            <div className="polaroid-image">
              <img
                src="/vite.svg"
                className="polaroid-image"
                alt="Polaroid Image"
              />
            </div>
            <p className="polaroid-text">Polaroid Text</p>
          </div>
          <div className="polaroid-frame rotate-left">
            <div className="polaroid-image">
              <img
                src="/flowers.jpg"
                className="polaroid-image"
                alt="Polaroid Image"
              />
            </div>
            <p className="polaroid-text">Polaroid Text</p>
          </div>
          <div className="polaroid-frame rotate-right">
            <div className="polaroid-image">
              <img
                src="/flowers.jpg"
                className="polaroid-image"
                alt="Polaroid Image"
              />
            </div>
            <p className="polaroid-text">Polaroid Text</p>
          </div>
          <div className="polaroid-frame rotate-left">
            <div className="polaroid-image">
              <img
                src="/flowers.jpg"
                className="polaroid-image"
                alt="Polaroid Image"
              />
            </div>
            <p className="polaroid-text">Polaroid Text</p>
          </div>
        </div> */}
      <button>Click Here</button>
      <div
        style={{
          width: "60vw",
          height: "50vh",
          overflow: "auto",
          margin: "0 auto",
        }}
      >
        {/* <SyntaxHighlighter
            language="jsx"
            style={oneDark}
            customStyle={customStyle}
          >
            {code}
          </SyntaxHighlighter> */}
      </div>
    </>
  );
}

export default App;
