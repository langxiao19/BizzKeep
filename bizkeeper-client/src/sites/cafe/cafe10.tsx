import React from 'react';

/**
 * Industry: Premium Roastery & Craft Coffee (Inspired by Stumptown Coffee Roasters)
 * Template Name: ArtisanRoastery
 * Structure: High-impact editorial photography, bold typography with a "maker" 
 * aesthetic, and a heavy focus on the subscription model and brew guides.
 */

const ArtisanRoastery: React.FC = () => {
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const styles = {
    nav: {
      display: 'flex',
      flexDirection: 'column' as 'column',
      position: 'sticky' as 'sticky',
      top: 0,
      backgroundColor: '#ffffff',
      zIndex: 1000,
      borderBottom: '1px solid #000'
    },
    navTop: {
      backgroundColor: '#000',
      color: '#fff',
      padding: '8px 5%',
      textAlign: 'center' as 'center',
      fontSize: '11px',
      letterSpacing: '2px',
      fontWeight: '700'
    },
    navMain: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px 5%',
    },
    navLinks: {
      display: 'flex',
      gap: '30px',
      fontSize: '14px',
      fontWeight: '700',
      color: '#000',
      cursor: 'pointer',
      letterSpacing: '0.5px'
    },
    logo: {
      fontSize: '32px',
      fontWeight: '900',
      color: '#000',
      fontFamily: 'serif',
      letterSpacing: '-2px',
      cursor: 'pointer'
    },
    hero: {
      height: '80vh',
      width: '100%',
      backgroundImage: 'url("https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=1920")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      alignItems: 'flex-end',
      padding: '0 5% 80px 5%'
    },
    heroContent: {
      backgroundColor: '#ffffff',
      padding: '40px',
      maxWidth: '500px',
      boxShadow: '20px 20px 0px #000'
    },
    primaryBtn: {
      padding: '16px 32px',
      backgroundColor: '#000',
      color: '#fff',
      border: 'none',
      fontSize: '13px',
      fontWeight: '900',
      cursor: 'pointer',
      marginTop: '20px',
      letterSpacing: '2px',
      textTransform: 'uppercase' as 'uppercase'
    },
    section: {
      padding: '100px 5%',
      backgroundColor: '#fff'
    },
    featureGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '20px',
      marginTop: '40px'
    },
    footer: {
      backgroundColor: '#f4f4f4',
      padding: '80px 5%',
      color: '#000'
    }
  };

  return (
    <div style={{ fontFamily: '"Helvetica Neue", Arial, sans-serif', color: '#000', margin: 0 }}>
      
      {/* NAVIGATION */}
      <nav style={styles.nav}>
        <div style={styles.navTop}>FREE SHIPPING ON ALL ORDERS OVER $50</div>
        <div style={styles.navMain}>
          <div style={styles.navLinks}>
            <span onClick={() => scrollToSection('shop')}>SHOP COFFEE</span>
            <span onClick={() => scrollToSection('subscriptions')}>SUBSCRIPTIONS</span>
            <span onClick={() => scrollToSection('locations')}>LOCATIONS</span>
          </div>
          <div style={styles.logo} onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            ARTISAN
          </div>
          <div style={styles.navLinks}>
            <span onClick={() => scrollToSection('brew-guides')}>BREW GUIDES</span>
            <span onClick={() => scrollToSection('wholesale')}>WHOLESALE</span>
            <button 
              style={{ ...styles.primaryBtn, marginTop: 0, padding: '10px 20px', fontSize: '11px' }}
              onClick={() => scrollToSection('shop')}
            >
              CART (0)
            </button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={{ fontSize: '48px', fontWeight: '900', lineHeight: '1', margin: '0 0 20px 0' }}>
            GOOD COFFEE IS A HUMAN RIGHT.
          </h1>
          <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#333' }}>
            From the highest peaks to your morning mug, we source and roast 
            exceptional coffees that honor the farmers and the craft.
          </p>
          <button style={styles.primaryBtn} onClick={() => scrollToSection('shop')}>
            SHOP ALL COFFEE
          </button>
        </div>
      </header>

      {/* SHOP CATEGORIES */}
      <section id="shop" style={styles.section}>
        <h2 style={{ fontSize: '12px', fontWeight: '900', letterSpacing: '3px', marginBottom: '40px' }}>FEATURED COFFEE</h2>
        <div style={styles.featureGrid}>
          {[
            { name: 'Holler Mountain', notes: 'Creamy, Caramel, Fruity' },
            { name: 'Hair Bender', notes: 'Citrus, Dark Chocolate' },
            { name: 'French Roast', notes: 'Smoky, Clove, Bittersweet' }
          ].map((coffee, i) => (
            <div key={i} style={{ cursor: 'pointer' }}>
              <div style={{ width: '100%', aspectRatio: '1/1', backgroundColor: '#f0f0f0', marginBottom: '20px', backgroundImage: 'url("https://images.unsplash.com/photo-1580915411954-282cb1b0d780?w=600")', backgroundSize: 'cover' }}></div>
              <h3 style={{ fontSize: '20px', fontWeight: '900' }}>{coffee.name}</h3>
              <p style={{ fontSize: '14px', color: '#666', marginTop: '5px' }}>{coffee.notes}</p>
              <button style={{ ...styles.primaryBtn, backgroundColor: 'transparent', color: '#000', border: '2px solid #000', width: '100%', marginTop: '15px' }}>ADD TO CART</button>
            </div>
          ))}
        </div>
      </section>

      {/* SUBSCRIPTION CALLOUT */}
      <section id="subscriptions" style={{ ...styles.section, backgroundColor: '#000', color: '#fff' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '40px' }}>
          <div style={{ flex: '1', minWidth: '300px' }}>
            <h2 style={{ fontSize: '42px', fontWeight: '900', lineHeight: '1.1' }}>NEVER RUN OUT AGAIN.</h2>
            <p style={{ fontSize: '18px', marginTop: '20px', opacity: 0.8 }}>
              Join the club. Get your favorite roasts delivered on your schedule 
              and save 15% on every order.
            </p>
            <button style={{ ...styles.primaryBtn, backgroundColor: '#fff', color: '#000' }}>START A SUBSCRIPTION</button>
          </div>
          <div style={{ flex: '1', minWidth: '300px', height: '400px', backgroundColor: '#333', backgroundImage: 'url("https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800")', backgroundSize: 'cover' }}></div>
        </div>
      </section>

      {/* BREW GUIDES */}
      <section id="brew-guides" style={{ ...styles.section, textAlign: 'center' as 'center' }}>
        <h2 style={{ fontSize: '12px', fontWeight: '900', letterSpacing: '3px' }}>LEARN THE CRAFT</h2>
        <h3 style={{ fontSize: '32px', margin: '20px 0' }}>Master your morning ritual.</h3>
        <p style={{ maxWidth: '600px', margin: '0 auto', color: '#666' }}>
          Explore our library of brew guides for Chemex, AeroPress, French Press, 
          and more. We help you get the most out of every bean.
        </p>
        <button style={{ ...styles.primaryBtn, backgroundColor: 'transparent', color: '#000', border: '1px solid #000' }}>VIEW BREW GUIDES</button>
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px' }}>
          <div>
            <h4 style={{ fontSize: '12px', fontWeight: '900', marginBottom: '20px' }}>SHOP</h4>
            <p style={{ fontSize: '14px', marginBottom: '10px' }}>Coffee</p>
            <p style={{ fontSize: '14px', marginBottom: '10px' }}>Tea</p>
            <p style={{ fontSize: '14px', marginBottom: '10px' }}>Gear</p>
          </div>
          <div>
            <h4 style={{ fontSize: '12px', fontWeight: '900', marginBottom: '20px' }}>COMPANY</h4>
            <p style={{ fontSize: '14px', marginBottom: '10px' }}>Our Story</p>
            <p style={{ fontSize: '14px', marginBottom: '10px' }}>Sustainability</p>
            <p style={{ fontSize: '14px', marginBottom: '10px' }}>Careers</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={styles.logo}>ARTISAN</div>
            <p style={{ fontSize: '12px', marginTop: '20px', opacity: 0.5 }}>&copy; 2026 ARTISAN ROASTERS. ALL RIGHTS RESERVED.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ArtisanRoastery;