import React from 'react';

/**
 * Industry: Specialized Coffee & Draft Retail (Inspired by La Colombe)
 * Template Name: DoveRoasters
 * Structure: Bold typography, monochromatic accents, high-energy hero section, 
 * and a focus on both bagged coffee and ready-to-drink cans.
 */

const DoveRoasters: React.FC = () => {
  
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
    },
    promoBar: {
      backgroundColor: '#000000',
      color: '#ffffff',
      padding: '10px 5%',
      textAlign: 'center' as 'center',
      fontSize: '12px',
      fontWeight: '700',
      letterSpacing: '1px'
    },
    navMain: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px 5%',
      borderBottom: '1px solid #e2e2e2'
    },
    navLinks: {
      display: 'flex',
      gap: '30px',
      fontSize: '14px',
      fontWeight: '800',
      color: '#000000',
      cursor: 'pointer',
      textTransform: 'uppercase' as 'uppercase'
    },
    logo: {
      fontSize: '28px',
      fontWeight: '900',
      color: '#000000',
      letterSpacing: '-1px',
      cursor: 'pointer'
    },
    hero: {
      height: '80vh',
      width: '100%',
      backgroundColor: '#f4f4f4',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      backgroundImage: 'url("https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=1920")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      padding: '0 8%'
    },
    heroContent: {
      maxWidth: '550px',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      padding: '50px',
      boxShadow: '10px 10px 0px #000000'
    },
    primaryBtn: {
      padding: '16px 40px',
      backgroundColor: '#000000',
      color: '#ffffff',
      border: 'none',
      fontSize: '14px',
      fontWeight: '900',
      cursor: 'pointer',
      marginTop: '30px',
      textTransform: 'uppercase' as 'uppercase',
      letterSpacing: '1px'
    },
    section: {
      padding: '100px 8%',
      backgroundColor: '#ffffff'
    },
    productGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '30px',
      marginTop: '50px'
    },
    card: {
      textAlign: 'center' as 'center',
      padding: '20px',
      border: '1px solid #f0f0f0',
      transition: 'border-color 0.3s'
    },
    footer: {
      backgroundColor: '#f8f8f8',
      padding: '80px 8%',
      borderTop: '1px solid #eee'
    }
  };

  return (
    <div style={{ fontFamily: '"Helvetica Neue", Arial, sans-serif', color: '#000000', margin: 0 }}>
      
      {/* NAVIGATION */}
      <nav style={styles.nav}>
        <div style={styles.promoBar}>FREE SHIPPING ON ORDERS $50+</div>
        <div style={styles.navMain}>
          <div style={styles.navLinks}>
            <span onClick={() => scrollToSection('coffee')}>COFFEE</span>
            <span onClick={() => scrollToSection('draft')}>DRAFT LATTE</span>
            <span onClick={() => scrollToSection('subscriptions')}>SUBSCRIPTIONS</span>
          </div>
          <div style={styles.logo} onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            DOVE ROASTERS
          </div>
          <div style={styles.navLinks}>
            <span onClick={() => scrollToSection('locations')}>LOCATIONS</span>
            <span onClick={() => scrollToSection('wholesale')}>WHOLESALE</span>
            <button 
              style={{ ...styles.primaryBtn, marginTop: 0, padding: '10px 25px', fontSize: '12px' }}
              onClick={() => scrollToSection('coffee')}
            >
              SHOP ALL
            </button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={{ fontSize: '56px', fontWeight: '900', lineHeight: '1', margin: '0 0 20px 0' }}>
            AMERICA'S <br /> COFFEE.
          </h1>
          <p style={{ fontSize: '18px', lineHeight: '1.6', color: '#333' }}>
            From the first espresso bar in Philadelphia to your doorstep. 
            We source, roast, and craft the boldest flavors in the country.
          </p>
          <button style={styles.primaryBtn} onClick={() => scrollToSection('coffee')}>
            SHOP THE ROASTS
          </button>
        </div>
      </header>

      {/* PRODUCT SECTION */}
      <section id="coffee" style={styles.section}>
        <h2 style={{ fontSize: '32px', fontWeight: '900', textAlign: 'center' }}>BEST SELLERS</h2>
        <div style={styles.productGrid}>
          {[
            { name: 'Corsica Blend', type: 'Dark Roast', price: '$16.00' },
            { name: 'Nizza Blend', type: 'Medium Roast', price: '$16.00' },
            { name: 'Monaco Blend', type: 'Dark Roast', price: '$16.00' },
            { name: 'Draft Latte 4-Pack', type: 'Ready to Drink', price: '$12.00' }
          ].map((item, i) => (
            <div key={i} style={styles.card}>
              <div style={{ height: '300px', backgroundColor: '#f9f9f9', marginBottom: '20px', backgroundImage: 'url("https://images.unsplash.com/photo-1580915411954-282cb1b0d780?w=600")', backgroundSize: 'cover' }}></div>
              <h3 style={{ fontSize: '20px', fontWeight: '800' }}>{item.name}</h3>
              <p style={{ color: '#666', fontSize: '14px', margin: '5px 0' }}>{item.type}</p>
              <p style={{ fontWeight: '700', margin: '10px 0' }}>{item.price}</p>
              <button style={{ ...styles.primaryBtn, marginTop: '10px', width: '100%', padding: '12px' }}>ADD TO CART</button>
            </div>
          ))}
        </div>
      </section>

      {/* DRAFT LATTE FOCUS */}
      <section id="draft" style={{ ...styles.section, backgroundColor: '#000000', color: '#ffffff' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '60px', flexWrap: 'wrap' }}>
          <div style={{ flex: '1', minWidth: '350px', height: '500px', backgroundColor: '#222', backgroundImage: 'url("https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=800")', backgroundSize: 'cover' }}></div>
          <div style={{ flex: '1', minWidth: '350px' }}>
            <h2 style={{ fontSize: '48px', fontWeight: '900', marginBottom: '25px' }}>DRAFT LATTE. <br /> IN A CAN.</h2>
            <p style={{ fontSize: '18px', lineHeight: '1.8', opacity: 0.8 }}>
              Experience the full-throttle creaminess of our signature Draft Latte. 
              Real ingredients, real milk, and a unique cold-pressed espresso base 
              that delivers a clean, frothy finish.
            </p>
            <button style={{ ...styles.primaryBtn, backgroundColor: '#ffffff', color: '#000000' }}>
              SHOP CANS
            </button>
          </div>
        </div>
      </section>

      {/* SUBSCRIPTION */}
      <section id="subscriptions" style={{ ...styles.section, textAlign: 'center' as 'center' }}>
        <h2 style={{ fontSize: '36px', fontWeight: '900' }}>COFFEE ON YOUR SCHEDULE</h2>
        <p style={{ maxWidth: '600px', margin: '20px auto', color: '#444' }}>
          Never run out. Save up to 15% on every shipment and customize your 
          delivery frequency. Pause or cancel anytime.
        </p>
        <button style={{ ...styles.primaryBtn, backgroundColor: 'transparent', color: '#000', border: '2px solid #000' }}>
          START SUBSCRIPTION
        </button>
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px' }}>
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: '900', marginBottom: '20px' }}>SHOP</h4>
            <p style={{ fontSize: '14px', marginBottom: '12px', cursor: 'pointer' }}>Coffee</p>
            <p style={{ fontSize: '14px', marginBottom: '12px', cursor: 'pointer' }}>Draft Latte</p>
            <p style={{ fontSize: '14px', marginBottom: '12px', cursor: 'pointer' }}>Merch</p>
          </div>
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: '900', marginBottom: '20px' }}>COMPANY</h4>
            <p style={{ fontSize: '14px', marginBottom: '12px', cursor: 'pointer' }}>About Us</p>
            <p style={{ fontSize: '14px', marginBottom: '12px', cursor: 'pointer' }}>Cafes</p>
            <p style={{ fontSize: '14px', marginBottom: '12px', cursor: 'pointer' }}>Careers</p>
          </div>
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: '900', marginBottom: '20px' }}>SUPPORT</h4>
            <p style={{ fontSize: '14px', marginBottom: '12px', cursor: 'pointer' }}>Contact Us</p>
            <p style={{ fontSize: '14px', marginBottom: '12px', cursor: 'pointer' }}>Shipping FAQ</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={styles.logo}>DOVE ROASTERS</div>
            <p style={{ marginTop: '20px', fontSize: '12px', opacity: 0.5 }}>&copy; 2026 DOVE ROASTERS. PURE COFFEE.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DoveRoasters;