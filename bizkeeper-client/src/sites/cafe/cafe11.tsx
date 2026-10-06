import React from 'react';

/**
 * Industry: Specialized Coffee & Retail (Inspired by Intelligentsia)
 * Template Name: IntelligentBrew
 * Structure: Sophisticated minimalist aesthetic, large-scale imagery, 
 * clean serif headers, and a focus on direct-trade storytelling.
 */

const IntelligentBrew: React.FC = () => {
  
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
      borderBottom: '1px solid #eeeeee'
    },
    navTop: {
      backgroundColor: '#f8f8f8',
      padding: '8px 5%',
      textAlign: 'center' as 'center',
      fontSize: '11px',
      letterSpacing: '1.5px',
      color: '#333'
    },
    navMain: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '25px 5%',
    },
    navLinks: {
      display: 'flex',
      gap: '35px',
      fontSize: '13px',
      fontWeight: '600',
      color: '#1a1a1a',
      cursor: 'pointer',
      letterSpacing: '1px'
    },
    logo: {
      fontSize: '28px',
      fontWeight: '300',
      color: '#d12027', // Signature Red
      fontFamily: 'serif',
      textTransform: 'uppercase' as 'uppercase',
      letterSpacing: '4px',
      cursor: 'pointer'
    },
    hero: {
      height: '85vh',
      width: '100%',
      backgroundColor: '#1a1a1a',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundImage: 'url("https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1920")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      color: '#ffffff',
      textAlign: 'center' as 'center'
    },
    heroContent: {
      maxWidth: '700px',
      padding: '0 20px'
    },
    primaryBtn: {
      padding: '16px 40px',
      backgroundColor: '#d12027',
      color: '#ffffff',
      border: 'none',
      fontSize: '14px',
      fontWeight: '700',
      cursor: 'pointer',
      marginTop: '30px',
      letterSpacing: '2px',
      textTransform: 'uppercase' as 'uppercase',
      transition: 'background-color 0.3s'
    },
    section: {
      padding: '100px 10%',
      backgroundColor: '#ffffff'
    },
    collectionGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '50px',
      marginTop: '60px'
    },
    productCard: {
      textAlign: 'center' as 'center'
    },
    productImage: {
      width: '100%',
      aspectRatio: '4/5',
      backgroundColor: '#f4f4f4',
      marginBottom: '20px',
      backgroundImage: 'url("https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600")',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    },
    footer: {
      backgroundColor: '#1a1a1a',
      color: '#ffffff',
      padding: '80px 10%',
      fontSize: '14px'
    }
  };

  return (
    <div style={{ fontFamily: '"Inter", sans-serif', color: '#1a1a1a', margin: 0 }}>
      
      {/* NAVIGATION */}
      <nav style={styles.nav}>
        <div style={styles.navTop}>ENJOY FREE SHIPPING ON ALL COFFEE ORDERS $40+</div>
        <div style={styles.navMain}>
          <div style={styles.navLinks}>
            <span onClick={() => scrollToSection('shop')}>SHOP</span>
            <span onClick={() => scrollToSection('subscriptions')}>SUBSCRIPTIONS</span>
            <span onClick={() => scrollToSection('locations')}>LOCATIONS</span>
          </div>
          <div style={styles.logo} onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            INTELLIGENT
          </div>
          <div style={styles.navLinks}>
            <span onClick={() => scrollToSection('education')}>EDUCATION</span>
            <span onClick={() => scrollToSection('wholesale')}>WHOLESALE</span>
            <span style={{ fontWeight: '800' }}>CART (0)</span>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={{ fontSize: '52px', fontWeight: '300', fontFamily: 'serif', margin: '0 0 20px 0' }}>
            The Pursuit of Extraordinary.
          </h1>
          <p style={{ fontSize: '18px', fontWeight: '400', lineHeight: '1.6', opacity: 0.9 }}>
            Our Direct Trade model creates a sustainable future for coffee, 
            bringing the world's most remarkable flavors to your cup.
          </p>
          <button style={styles.primaryBtn} onClick={() => scrollToSection('shop')}>
            SHOP THE COLLECTION
          </button>
        </div>
      </header>

      {/* SHOP SECTION */}
      <section id="shop" style={styles.section}>
        <h2 style={{ fontSize: '12px', fontWeight: '800', letterSpacing: '3px', textAlign: 'center', marginBottom: '50px' }}>
          FEATURED SELECTIONS
        </h2>
        <div style={styles.collectionGrid}>
          {[
            { name: 'Black Cat Espresso', origin: 'Project Direct Trade' },
            { name: 'Illumination Blend', origin: 'Seasonal Selection' },
            { name: 'Frequency Blend', origin: 'Daily Ritual' }
          ].map((item, i) => (
            <div key={i} style={styles.productCard}>
              <div style={styles.productImage}></div>
              <h3 style={{ fontSize: '20px', fontFamily: 'serif', marginBottom: '8px' }}>{item.name}</h3>
              <p style={{ fontSize: '13px', color: '#666', marginBottom: '20px' }}>{item.origin}</p>
              <button style={{ ...styles.primaryBtn, marginTop: 0, padding: '12px 25px', fontSize: '12px', width: '100%' }}>
                ADD TO CART
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* STORY SECTION */}
      <section id="education" style={{ ...styles.section, backgroundColor: '#fcfcfc' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '80px', flexWrap: 'wrap' }}>
          <div style={{ flex: '1', minWidth: '350px' }}>
            <h2 style={{ fontSize: '38px', fontFamily: 'serif', marginBottom: '25px' }}>Direct Trade Pioneers.</h2>
            <p style={{ fontSize: '17px', lineHeight: '1.8', color: '#444' }}>
              We don’t just buy coffee; we build partnerships. By working directly with 
              farmers, we ensure quality at every step of the process and pay prices 
              that reflect the true value of the craft.
            </p>
            <button style={{ ...styles.primaryBtn, backgroundColor: 'transparent', color: '#1a1a1a', border: '1px solid #1a1a1a' }}>
              OUR SOURCING MODEL
            </button>
          </div>
          <div style={{ flex: '1', minWidth: '350px', height: '500px', backgroundColor: '#eee', backgroundImage: 'url("https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800")', backgroundSize: 'cover' }}></div>
        </div>
      </section>

      {/* SUBSCRIPTION CALLOUT */}
      <section id="subscriptions" style={{ ...styles.section, textAlign: 'center' as 'center', backgroundColor: '#d12027', color: '#ffffff' }}>
        <h2 style={{ fontSize: '32px', fontFamily: 'serif' }}>Coffee on Your Terms.</h2>
        <p style={{ maxWidth: '600px', margin: '20px auto', opacity: 0.9 }}>
          Never run out of your favorite beans. Save 15% and enjoy the flexibility 
          to pause or cancel at any time.
        </p>
        <button style={{ ...styles.primaryBtn, backgroundColor: '#ffffff', color: '#d12027' }}>
          START A SUBSCRIPTION
        </button>
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '60px' }}>
          <div>
            <div style={{ ...styles.logo, color: '#ffffff', marginBottom: '30px' }}>INTELLIGENT</div>
            <p style={{ opacity: 0.6 }}>Redefining the specialty coffee experience since 2026.</p>
          </div>
          <div>
            <h4 style={{ fontSize: '12px', letterSpacing: '2px', marginBottom: '25px' }}>EXPLORE</h4>
            <p style={{ marginBottom: '12px', opacity: 0.7 }}>Brewing Guides</p>
            <p style={{ marginBottom: '12px', opacity: 0.7 }}>Sourcing</p>
            <p style={{ marginBottom: '12px', opacity: 0.7 }}>Store Locator</p>
          </div>
          <div>
            <h4 style={{ fontSize: '12px', letterSpacing: '2px', marginBottom: '25px' }}>SUPPORT</h4>
            <p style={{ marginBottom: '12px', opacity: 0.7 }}>Shipping & Returns</p>
            <p style={{ marginBottom: '12px', opacity: 0.7 }}>Contact Us</p>
            <p style={{ marginBottom: '12px', opacity: 0.7 }}>Privacy Policy</p>
          </div>
        </div>
        <div style={{ borderTop: '1px solid #333', marginTop: '60px', paddingTop: '30px', textAlign: 'center', opacity: 0.4 }}>
          &copy; 2026 Intelligent Coffee Roasters. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
};

export default IntelligentBrew;