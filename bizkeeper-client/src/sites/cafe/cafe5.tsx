import React from 'react';

/**
 * Industry: European-Style Bistro / Bakery (Inspired by Euro Cafe Claremont)
 * Template Name: EuroBistro
 * Structure: Sophisticated serif-heavy design, top-centered brand identity, 
 * and a blend of "Dine-In" and "Bakery" focused sections.
 */

const EuroBistro: React.FC = () => {
  
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
      backgroundColor: '#fff',
      zIndex: 1000,
      borderBottom: '3px double #d4af37' // Gold accent border
    },
    navLinks: {
      display: 'flex',
      justifyContent: 'center',
      gap: '40px',
      padding: '15px 0',
      fontSize: '14px',
      fontWeight: '600',
      color: '#2c3e50',
      cursor: 'pointer',
      letterSpacing: '1px',
      textTransform: 'uppercase' as 'uppercase'
    },
    brandContainer: {
      padding: '20px 0',
      textAlign: 'center' as 'center',
      backgroundColor: '#fff'
    },
    logoText: {
      fontFamily: '"Times New Roman", Times, serif',
      fontSize: '36px',
      color: '#1a1a1a',
      margin: 0,
      fontStyle: 'italic'
    },
    hero: {
      height: '60vh',
      width: '100%',
      backgroundImage: 'url("https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1920")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderBottom: '10px solid #f8f9fa'
    },
    heroBox: {
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      padding: '50px',
      textAlign: 'center' as 'center',
      border: '1px solid #d4af37',
      maxWidth: '600px'
    },
    ctaButton: {
      padding: '12px 30px',
      backgroundColor: '#1a1a1a',
      color: '#fff',
      border: 'none',
      fontSize: '14px',
      fontWeight: 'bold',
      cursor: 'pointer',
      marginTop: '20px',
      letterSpacing: '2px',
      transition: 'opacity 0.3s'
    },
    section: {
      padding: '80px 15%',
      textAlign: 'center' as 'center',
      lineHeight: '1.8'
    },
    menuGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '20px',
      marginTop: '40px'
    },
    footer: {
      backgroundColor: '#f8f9fa',
      padding: '40px 5%',
      borderTop: '1px solid #eee',
      textAlign: 'center' as 'center',
      fontSize: '14px',
      color: '#666'
    }
  };

  return (
    <div style={{ fontFamily: 'Georgia, serif', color: '#333', backgroundColor: '#fff' }}>
      
      {/* NAVIGATION & BRANDING */}
      <nav style={styles.nav}>
        <div style={styles.brandContainer}>
          <h1 style={styles.logoText}>Euro Cafe</h1>
          <div style={{ fontSize: '12px', letterSpacing: '3px', color: '#d4af37', marginTop: '5px' }}>
            AUTHENTIC EUROPEAN FLAVORS
          </div>
        </div>
        <div style={styles.navLinks}>
          <span onClick={() => scrollToSection('breakfast')}>BREAKFAST</span>
          <span onClick={() => scrollToSection('lunch')}>LUNCH</span>
          <span onClick={() => scrollToSection('pastries')}>PASTRIES</span>
          <span onClick={() => scrollToSection('location')}>CONTACT</span>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header style={styles.hero}>
        <div style={styles.heroBox}>
          <h2 style={{ fontSize: '28px', color: '#1a1a1a', marginBottom: '15px' }}>Welcome to the Village</h2>
          <p style={{ fontSize: '16px', color: '#444' }}>
            Experience the charm of a European bistro right in the heart of Claremont. 
            From fresh-baked croissants to savory paninis, every dish is a journey.
          </p>
          <button style={styles.ctaButton} onClick={() => scrollToSection('lunch')}>
            VIEW FULL MENU
          </button>
        </div>
      </header>

      {/* CONTENT SECTIONS */}
      <section id="breakfast" style={styles.section}>
        <h3 style={{ fontSize: '32px', color: '#d4af37' }}>Morning Tradition</h3>
        <p>Serving gourmet coffee, crepes, and omelets daily until 11:30 AM.</p>
        <div style={styles.menuGrid}>
          <div style={{ textAlign: 'left', padding: '15px', borderBottom: '1px solid #eee' }}>
            <strong>Belgian Waffles</strong> — Served with fresh berries and cream.
          </div>
          <div style={{ textAlign: 'left', padding: '15px', borderBottom: '1px solid #eee' }}>
            <strong>Savory Crepes</strong> — Ham, swiss cheese, and béchamel.
          </div>
        </div>
      </section>

      <section id="lunch" style={{ ...styles.section, backgroundColor: '#fcfcfc' }}>
        <h3 style={{ fontSize: '32px', color: '#1a1a1a' }}>Bistro Lunch</h3>
        <p>Enjoy our selection of artisan sandwiches, fresh salads, and house-made soups.</p>
        <button 
          style={{ ...styles.ctaButton, backgroundColor: 'transparent', color: '#1a1a1a', border: '2px solid #1a1a1a' }}
          onClick={() => alert('Opening PDF Menu...')}
        >
          DOWNLOAD LUNCH MENU
        </button>
      </section>

      <section id="pastries" style={styles.section}>
        <h3 style={{ fontSize: '32px', color: '#d4af37' }}>The Bakery</h3>
        <p>Our pastry chef prepares fresh desserts and breads every morning using traditional European techniques.</p>
      </section>

      <section id="location" style={{ ...styles.section, backgroundColor: '#1a1a1a', color: '#fff' }}>
        <h3 style={{ fontSize: '24px', color: '#d4af37' }}>Visit Us</h3>
        <p>Claremont Village • Open Daily</p>
        <p style={{ fontSize: '14px', marginTop: '10px', opacity: 0.8 }}>
          546 W First St, Claremont, CA 91711
        </p>
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <p>&copy; 2026 Euro Cafe. Taste the Old World in the New World.</p>
      </footer>
    </div>
  );
};

export default EuroBistro;