import React from 'react';

/**
 * Industry: Specialized Coffee Retailer (Inspired by Philz Coffee)
 * Template Name: PersonalBrew
 * Structure: Community-centric hero, bold mission statements, 
 * and a modular "Collection" grid for retail products.
 */

const PersonalBrew: React.FC = () => {
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const styles = {
    nav: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px 5%',
      position: 'sticky' as 'sticky',
      top: 0,
      backgroundColor: '#ffffff',
      zIndex: 1000,
      borderBottom: '1px solid #f2f2f2'
    },
    navLinks: {
      display: 'flex',
      gap: '30px',
      fontSize: '14px',
      fontWeight: '600',
      color: '#333',
      cursor: 'pointer',
      letterSpacing: '0.5px'
    },
    logo: {
      fontSize: '26px',
      fontWeight: '900',
      color: '#4B2C20',
      letterSpacing: '-1px',
      cursor: 'pointer'
    },
    hero: {
      height: '75vh',
      width: '100%',
      backgroundColor: '#f9f7f2',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundImage: 'url("https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c?auto=format&fit=crop&w=1920")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      position: 'relative' as 'relative'
    },
    heroOverlay: {
      position: 'absolute' as 'absolute',
      inset: 0,
      backgroundColor: 'rgba(0,0,0,0.3)'
    },
    heroContent: {
      position: 'relative' as 'relative',
      zIndex: 1,
      textAlign: 'center' as 'center',
      color: '#ffffff',
      maxWidth: '800px',
      padding: '0 20px'
    },
    primaryBtn: {
      padding: '16px 36px',
      backgroundColor: '#00704A', // Deep Coffee Green
      color: '#ffffff',
      border: 'none',
      fontSize: '15px',
      fontWeight: '700',
      cursor: 'pointer',
      borderRadius: '4px',
      marginTop: '25px',
      textTransform: 'uppercase' as 'uppercase'
    },
    section: {
      padding: '100px 8%',
      textAlign: 'center' as 'center'
    },
    collectionGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '40px',
      marginTop: '50px'
    },
    card: {
      textAlign: 'left' as 'left',
      backgroundColor: '#fff',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
    },
    footer: {
      backgroundColor: '#2d2d2d',
      color: '#ffffff',
      padding: '80px 8%',
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'wrap' as 'wrap',
      gap: '40px'
    }
  };

  return (
    <div style={{ fontFamily: '"Avenir", sans-serif', color: '#333', margin: 0 }}>
      
      {/* NAVIGATION */}
      <nav style={styles.nav}>
        <div style={styles.logo} onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          PERSONAL BREW
        </div>
        <div style={styles.navLinks}>
          <span onClick={() => scrollToSection('shop')}>SHOP</span>
          <span onClick={() => scrollToSection('subscriptions')}>SUBSCRIPTIONS</span>
          <span onClick={() => scrollToSection('locations')}>LOCATIONS</span>
          <span onClick={() => scrollToSection('mission')}>OUR MISSION</span>
        </div>
        <button 
          style={{ ...styles.primaryBtn, marginTop: 0, padding: '10px 25px' }}
          onClick={() => scrollToSection('order')}
        >
          ORDER AHEAD
        </button>
      </nav>

      {/* HERO SECTION */}
      <header style={styles.hero}>
        <div style={styles.heroOverlay}></div>
        <div style={styles.heroContent}>
          <h1 style={{ fontSize: '56px', fontWeight: '800', marginBottom: '20px' }}>
            Better Days Start with Better Coffee.
          </h1>
          <p style={{ fontSize: '20px', fontWeight: '400', opacity: 0.9 }}>
            Crafted with love, one cup at a time. Personalized to your 
            unique taste and brewed for your specific moment.
          </p>
          <button style={styles.primaryBtn} onClick={() => scrollToSection('shop')}>
            SHOP THE BLENDS
          </button>
        </div>
      </header>

      {/* SHOP SECTION */}
      <section id="shop" style={styles.section}>
        <h2 style={{ fontSize: '32px', color: '#2d2d2d' }}>Find Your Perfect Match</h2>
        <p style={{ color: '#666', marginTop: '10px' }}>Explore our world-famous signature blends.</p>
        
        <div style={styles.collectionGrid}>
          {[
            { name: 'Light & Bright', desc: 'Notes of citrus and honey.' },
            { name: 'Medium & Balanced', desc: 'Smooth caramel and nut tones.' },
            { name: 'Dark & Bold', desc: 'Rich cocoa and earthy spices.' }
          ].map((item, i) => (
            <div key={i} style={styles.card}>
              <div style={{ height: '250px', backgroundColor: '#eee', backgroundImage: `url(https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&sig=${i})`, backgroundSize: 'cover' }}></div>
              <div style={{ padding: '25px' }}>
                <h3 style={{ fontSize: '20px', margin: '0 0 10px 0' }}>{item.name}</h3>
                <p style={{ color: '#777', fontSize: '15px' }}>{item.desc}</p>
                <button style={{ ...styles.primaryBtn, width: '100%', fontSize: '13px' }}>Shop Collection</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MISSION SECTION */}
      <section id="mission" style={{ ...styles.section, backgroundColor: '#fdfaf5' }}>
        <h2 style={{ fontSize: '32px' }}>One Cup at a Time</h2>
        <p style={{ maxWidth: '750px', margin: '20px auto', lineHeight: '1.8', fontSize: '17px' }}>
          At Personal Brew, we believe coffee is more than just a drink—it’s an 
          opportunity to connect. We focus on people first, sourcing sustainably 
          and roasting every batch to ensure you feel at home, no matter where you are.
        </p>
      </section>

      {/* SUBSCRIPTION CALLOUT */}
      <section id="subscriptions" style={{ ...styles.section, padding: '60px 8%' }}>
        <div style={{ border: '2px solid #00704A', padding: '50px', borderRadius: '12px' }}>
          <h2 style={{ fontSize: '28px' }}>Never Run Out</h2>
          <p>Get your favorite blends delivered to your door on your schedule.</p>
          <button 
            style={{ ...styles.primaryBtn, backgroundColor: 'transparent', color: '#00704A', border: '2px solid #00704A' }}
            onClick={() => alert('Starting Subscription Builder...')}
          >
            CREATE A SUBSCRIPTION
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <div style={{ flex: '1', minWidth: '200px' }}>
          <div style={{ ...styles.logo, color: '#ffffff', marginBottom: '20px' }}>PERSONAL BREW</div>
          <p style={{ opacity: 0.7, fontSize: '14px' }}>Brewing joy across the community since 2026.</p>
        </div>
        <div style={{ flex: '1', minWidth: '150px' }}>
          <h4 style={{ marginBottom: '20px', fontSize: '14px', letterSpacing: '1px' }}>HELP</h4>
          <p style={{ opacity: 0.7, fontSize: '14px', cursor: 'pointer' }}>FAQ</p>
          <p style={{ opacity: 0.7, fontSize: '14px', cursor: 'pointer' }}>Shipping</p>
          <p style={{ opacity: 0.7, fontSize: '14px', cursor: 'pointer' }}>Contact</p>
        </div>
        <div style={{ flex: '1', minWidth: '150px' }}>
          <h4 style={{ marginBottom: '20px', fontSize: '14px', letterSpacing: '1px' }}>LEGAL</h4>
          <p style={{ opacity: 0.7, fontSize: '14px', cursor: 'pointer' }}>Privacy Policy</p>
          <p style={{ opacity: 0.7, fontSize: '14px', cursor: 'pointer' }}>Terms of Service</p>
        </div>
      </footer>
    </div>
  );
};

export default PersonalBrew;