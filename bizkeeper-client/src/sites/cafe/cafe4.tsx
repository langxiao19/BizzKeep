import React from 'react';

/**
 * Industry: Community / Roastery Cafe (Inspired by Hampton Coffee Company)
 * Template Name: HeritageRoasters
 * Structure: Classic top-bar navigation, centered logo, and mission-driven 
 * community sections with a rustic aesthetic.
 */

const HeritageRoasters: React.FC = () => {
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const styles = {
    topBar: {
      backgroundColor: '#2d5a27', // Hunter Green
      color: '#fff',
      padding: '8px 5%',
      fontSize: '12px',
      display: 'flex',
      justifyContent: 'center',
      fontWeight: '600',
      letterSpacing: '1px'
    },
    nav: {
      display: 'flex',
      flexDirection: 'column' as 'column',
      position: 'sticky' as 'sticky',
      top: 0,
      backgroundColor: '#fff',
      zIndex: 1000,
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
    },
    navMain: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px 5%',
    },
    navLinks: {
      display: 'flex',
      gap: '20px',
      fontSize: '14px',
      fontWeight: '700',
      color: '#333',
      cursor: 'pointer'
    },
    logo: {
      fontSize: '28px',
      fontWeight: '900',
      color: '#2d5a27',
      textAlign: 'center' as 'center',
      lineHeight: '1',
      cursor: 'pointer'
    },
    hero: {
      height: '65vh',
      width: '100%',
      backgroundImage: 'url("https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1920")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative' as 'relative'
    },
    heroOverlay: {
      backgroundColor: 'rgba(0,0,0,0.4)',
      padding: '40px',
      textAlign: 'center' as 'center',
      color: '#fff',
      borderRadius: '4px'
    },
    primaryBtn: {
      padding: '15px 35px',
      backgroundColor: '#c0392b', // Deep Red
      color: '#fff',
      border: 'none',
      fontSize: '15px',
      fontWeight: '700',
      cursor: 'pointer',
      marginTop: '20px',
      textTransform: 'uppercase' as 'uppercase'
    },
    section: {
      padding: '80px 10%',
      textAlign: 'center' as 'center'
    },
    infoGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: '40px',
      marginTop: '50px'
    },
    footer: {
      backgroundColor: '#1a1a1a',
      color: '#ccc',
      padding: '50px 5%',
      fontSize: '14px'
    }
  };

  return (
    <div style={{ fontFamily: '"Georgia", serif', color: '#333' }}>
      <div style={styles.topBar}>
        ESTABLISHED 1994 • HAND-ROASTED IN SMALL BATCHES
      </div>

      {/* NAVIGATION */}
      <nav style={styles.nav}>
        <div style={styles.navMain}>
          <div style={styles.navLinks}>
            <span onClick={() => scrollToSection('roastery')}>ROASTERY</span>
            <span onClick={() => scrollToSection('experience')}>EXPERIENCE</span>
            <span onClick={() => scrollToSection('locations')}>CAFES</span>
          </div>
          <div style={styles.logo} onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            HERITAGE <br /> <span style={{ fontSize: '14px', letterSpacing: '4px' }}>COFFEE CO.</span>
          </div>
          <div style={styles.navLinks}>
            <span onClick={() => scrollToSection('wholesale')}>WHOLESALE</span>
            <button 
              style={{ ...styles.primaryBtn, marginTop: 0, padding: '8px 20px', fontSize: '12px' }}
              onClick={() => scrollToSection('shop')}
            >
              SHOP ONLINE
            </button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header style={styles.hero}>
        <div style={styles.heroOverlay}>
          <h1 style={{ fontSize: '52px', marginBottom: '10px' }}>Taste the Tradition</h1>
          <p style={{ fontSize: '20px', fontFamily: 'sans-serif', fontWeight: '300' }}>
            Local. Authentic. Family-Owned.
          </p>
          <button style={styles.primaryBtn} onClick={() => scrollToSection('shop')}>
            ORDER FRESH ROASTS
          </button>
        </div>
      </header>

      {/* CONTENT SECTIONS */}
      <section id="roastery" style={styles.section}>
        <h2 style={{ fontSize: '36px', color: '#2d5a27' }}>From Bean to Cup</h2>
        <p style={{ maxWidth: '800px', margin: '20px auto', lineHeight: '1.8', fontSize: '18px' }}>
          We source the finest Arabica beans from sustainable farms across the globe. 
          Every batch is roasted to perfection at our local facility to ensure 
          the peak of flavor and freshness.
        </p>
        <div style={styles.infoGrid}>
          <div>
            <h3 style={{ fontSize: '20px' }}>Our Heritage</h3>
            <p style={{ fontSize: '15px', color: '#666' }}>Decades of roasting expertise passed down through generations.</p>
          </div>
          <div>
            <h3 style={{ fontSize: '20px' }}>Small Batches</h3>
            <p style={{ fontSize: '15px', color: '#666' }}>Roasted daily in 30lb increments to guarantee absolute quality.</p>
          </div>
          <div>
            <h3 style={{ fontSize: '20px' }}>Community First</h3>
            <p style={{ fontSize: '15px', color: '#666' }}>Proudly serving as the local meeting place for our neighbors.</p>
          </div>
        </div>
      </section>

      <section id="experience" style={{ ...styles.section, backgroundColor: '#fdfaf5' }}>
        <h2 style={{ fontSize: '36px' }}>The Cafe Experience</h2>
        <p style={{ fontStyle: 'italic', color: '#555' }}>More than just a coffee shop—it's your home away from home.</p>
      </section>

      <section id="wholesale" style={styles.section}>
        <h2 style={{ fontSize: '36px' }}>Wholesale Partnerships</h2>
        <p>Elevate your restaurant or office with our premium heritage blends.</p>
        <button 
          style={{ ...styles.primaryBtn, backgroundColor: 'transparent', color: '#c0392b', border: '2px solid #c0392b' }}
          onClick={() => alert('Opening Wholesale Inquiry Form...')}
        >
          GET A QUOTE
        </button>
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #333', paddingBottom: '30px' }}>
          <div>
            <h4 style={{ color: '#fff' }}>VISIT US</h4>
            <p>Main Street Roastery</p>
            <p>Open Daily 6am - 6pm</p>
          </div>
          <div>
            <h4 style={{ color: '#fff' }}>FOLLOW ALONG</h4>
            <p>Instagram / Facebook / Twitter</p>
          </div>
        </div>
        <p style={{ marginTop: '30px', textAlign: 'center' }}>
          &copy; 2026 Heritage Coffee Company. Hand-Crafted Excellence.
        </p>
      </footer>
    </div>
  );
};

export default HeritageRoasters;