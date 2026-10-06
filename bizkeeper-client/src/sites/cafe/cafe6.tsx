import React from 'react';

/**
 * Industry: Family Restaurant / Grill & Bakery (Inspired by The Corner Grill)
 * Template Name: NeighborhoodGrill
 * Structure: Traditional high-contrast header, distinct "Dine-in" vs "Bakery" 
 * focus, and bold service-oriented sections.
 */

const NeighborhoodGrill: React.FC = () => {
  
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
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
    },
    navTop: {
      backgroundColor: '#1a1a1a',
      color: '#ffffff',
      padding: '10px 5%',
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: '13px',
      fontWeight: '600'
    },
    navMain: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px 5%',
    },
    navLinks: {
      display: 'flex',
      gap: '25px',
      fontSize: '15px',
      fontWeight: '700',
      color: '#333',
      cursor: 'pointer',
      textTransform: 'uppercase' as 'uppercase'
    },
    logo: {
      fontSize: '24px',
      fontWeight: '900',
      color: '#d32f2f', // Bold Grill Red
      letterSpacing: '-1px'
    },
    hero: {
      height: '70vh',
      width: '100%',
      backgroundImage: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1920")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      flexDirection: 'column' as 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
      textAlign: 'center' as 'center',
      padding: '0 20px'
    },
    ctaButton: {
      padding: '18px 40px',
      backgroundColor: '#d32f2f',
      color: '#fff',
      border: 'none',
      fontSize: '16px',
      fontWeight: '800',
      cursor: 'pointer',
      marginTop: '30px',
      borderRadius: '4px',
      transition: 'transform 0.2s'
    },
    section: {
      padding: '80px 10%',
      backgroundColor: '#fff'
    },
    dualSection: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '40px',
      alignItems: 'center'
    },
    footer: {
      backgroundColor: '#1a1a1a',
      color: '#fff',
      padding: '60px 5%',
      marginTop: '40px'
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', color: '#333', margin: 0 }}>
      
      {/* NAVIGATION */}
      <nav style={styles.nav}>
        <div style={styles.navTop}>
          <span>CALL US: (909) 555-0123</span>
          <span>OPEN DAILY: 7:00 AM - 9:00 PM</span>
        </div>
        <div style={styles.navMain}>
          <div style={styles.logo}>THE CORNER <span style={{ color: '#1a1a1a' }}>GRILL & BAKERY</span></div>
          <div style={styles.navLinks}>
            <span onClick={() => scrollToSection('breakfast')}>BREAKFAST</span>
            <span onClick={() => scrollToSection('lunch-dinner')}>LUNCH & DINNER</span>
            <span onClick={() => scrollToSection('bakery')}>BAKERY</span>
            <span onClick={() => scrollToSection('catering')}>CATERING</span>
          </div>
          <button 
            style={{ ...styles.ctaButton, marginTop: 0, padding: '10px 20px', fontSize: '14px' }}
            onClick={() => scrollToSection('order')}
          >
            ORDER ONLINE
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header style={styles.hero}>
        <h1 style={{ fontSize: '60px', fontWeight: '900', marginBottom: '10px' }}>FRESH. LOCAL. DELICIOUS.</h1>
        <p style={{ fontSize: '22px', maxWidth: '700px', fontWeight: '300' }}>
          From our sizzling grills to our stone ovens, we serve up 
          neighborhood favorites made from scratch every single day.
        </p>
        <button style={styles.ctaButton} onClick={() => scrollToSection('lunch-dinner')}>
          EXPLORE THE MENU
        </button>
      </header>

      {/* CONTENT SECTIONS */}
      <section id="breakfast" style={styles.section}>
        <div style={styles.dualSection}>
          <div>
            <h2 style={{ fontSize: '36px', marginBottom: '20px' }}>Start Your Morning Right</h2>
            <p style={{ fontSize: '18px', color: '#666', lineHeight: '1.6' }}>
              Known for our fluffy omelets, golden pancakes, and signature 
              breakfast burritos. We use farm-fresh eggs and premium meats 
              to fuel your morning.
            </p>
          </div>
          <div style={{ height: '300px', backgroundColor: '#eee', backgroundImage: 'url("https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=600")', backgroundSize: 'cover' }}></div>
        </div>
      </section>

      <section id="bakery" style={{ ...styles.section, backgroundColor: '#f9f9f9' }}>
        <div style={styles.dualSection}>
          <div style={{ height: '300px', backgroundColor: '#eee', backgroundImage: 'url("https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600")', backgroundSize: 'cover' }}></div>
          <div>
            <h2 style={{ fontSize: '36px', marginBottom: '20px' }}>Baked Fresh Daily</h2>
            <p style={{ fontSize: '18px', color: '#666', lineHeight: '1.6' }}>
              Our in-house bakery features artisan breads, seasonal pies, 
              and decadent pastries. Grab a treat to go or enjoy one 
              with our premium house coffee.
            </p>
          </div>
        </div>
      </section>

      <section id="catering" style={styles.section}>
        <div style={{ textAlign: 'center' as 'center' }}>
          <h2 style={{ fontSize: '42px' }}>Catering For Any Occasion</h2>
          <p style={{ maxWidth: '800px', margin: '20px auto', fontSize: '18px' }}>
            Bring The Corner Grill to your next office meeting, family gathering, 
            or community event. We offer customizable platters and full-service options.
          </p>
          <button 
            style={{ ...styles.ctaButton, backgroundColor: '#1a1a1a' }}
            onClick={() => alert('Opening Catering Form...')}
          >
            GET CATERING INFO
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ fontSize: '20px', color: '#d32f2f' }}>OUR LOCATION</h3>
            <p>123 Neighborhood Way<br />Claremont, CA 91711</p>
          </div>
          <div>
            <h3 style={{ fontSize: '20px', color: '#d32f2f' }}>STAY CONNECTED</h3>
            <p>Follow us for daily specials and new bakery arrivals.</p>
          </div>
        </div>
        <div style={{ borderTop: '1px solid #333', marginTop: '40px', paddingTop: '20px', textAlign: 'center', fontSize: '14px', color: '#888' }}>
          &copy; 2026 The Corner Grill & Bakery. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
};

export default NeighborhoodGrill;