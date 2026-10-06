import React from 'react';

/**
 * Industry: Casual Dining / Cafe (Inspired by Urbane Cafe)
 * Template Name: UrbanBistro
 * Structure: Full-width immersive hero with centered branding and top-right CTA
 */

const UrbanBistro: React.FC = () => {
  
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
      padding: '0 0 0 40px',
      position: 'absolute' as 'absolute',
      top: 0,
      width: '100%',
      height: '80px',
      backgroundColor: 'rgba(0,0,0,0.3)',
      zIndex: 1000,
      backdropFilter: 'blur(5px)',
      boxSizing: 'border-box' as 'border-box'
    },
    navGroup: {
      display: 'flex',
      alignItems: 'center',
      gap: '25px'
    },
    navLinks: {
      display: 'flex',
      gap: '25px',
      fontSize: '14px',
      fontWeight: '800',
      color: '#fff',
      cursor: 'pointer',
      letterSpacing: '1.5px'
    },
    logoContainer: {
      position: 'absolute' as 'absolute',
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      flexDirection: 'column' as 'column',
      alignItems: 'center',
      color: '#fff',
      textAlign: 'center' as 'center'
    },
    ctaButton: {
      height: '80px',
      padding: '0 40px',
      backgroundColor: '#E67E22',
      color: '#fff',
      border: 'none',
      fontSize: '16px',
      fontWeight: '900',
      letterSpacing: '2px',
      cursor: 'pointer',
      transition: 'background-color 0.3s'
    },
    hero: {
      height: '100vh',
      width: '100%',
      backgroundImage: 'url("https://images.unsplash.com/photo-1509722747041-619f38d78241?auto=format&fit=crop&w=1920")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    section: {
      padding: '100px 10%',
      backgroundColor: '#fff',
      textAlign: 'center' as 'center'
    },
    menuIcon: {
      display: 'flex',
      flexDirection: 'column' as 'column',
      gap: '6px',
      cursor: 'pointer'
    },
    bar: {
      width: '30px',
      height: '4px',
      backgroundColor: '#E67E22',
      borderRadius: '2px'
    }
  };

  return (
    <div style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', margin: 0 }}>
      {/* NAVIGATION */}
      <nav style={styles.nav}>
        <div style={styles.navGroup}>
          <div style={styles.menuIcon}>
            <div style={styles.bar}></div>
            <div style={styles.bar}></div>
            <div style={styles.bar}></div>
          </div>
          <div style={styles.navLinks}>
            <span onClick={() => scrollToSection('locations')}>LOCATIONS</span>
            <span onClick={() => scrollToSection('menu')}>MENU</span>
          </div>
        </div>

        <div style={styles.logoContainer}>
          <div style={{ fontSize: '28px', fontWeight: '700' }}>URBAN BISTRO</div>
          <div style={{ fontSize: '10px', letterSpacing: '3px', marginTop: '-5px' }}>CRAFTED // FRESH // LOCAL</div>
        </div>

        <button style={styles.ctaButton} onClick={() => scrollToSection('order')}>
          ORDER NOW
        </button>
      </nav>

      {/* HERO SECTION */}
      <header style={styles.hero}>
        {/* Overlay to ensure text/nav visibility */}
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.1)' }}></div>
      </header>

      {/* CONTENT SECTIONS */}
      <section id="locations" style={styles.section}>
        <h2 style={{ fontSize: '42px', color: '#333' }}>Find Your Bistro</h2>
        <p style={{ fontSize: '18px', color: '#666', maxWidth: '600px', margin: '20px auto' }}>
          We bring fresh ingredients and handcrafted sandwiches to neighborhoods across the coast.
        </p>
      </section>

      <section id="menu" style={{ ...styles.section, backgroundColor: '#f9f9f9' }}>
        <h2 style={{ fontSize: '42px', color: '#333' }}>Our Menu</h2>
        <p style={{ fontSize: '18px', color: '#666' }}>Explore our signature salads and oven-baked sandwiches.</p>
      </section>

      <section id="order" style={styles.section}>
        <h2 style={{ fontSize: '42px', color: '#333' }}>Ready for Lunch?</h2>
        <button 
          style={{ ...styles.ctaButton, height: 'auto', padding: '20px 60px', borderRadius: '4px', marginTop: '30px' }}
          onClick={() => alert('Redirecting to online ordering...')}
        >
          START ORDER
        </button>
      </section>

      {/* COOKIE CONSENT STRIP */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        width: '100%',
        backgroundColor: '#403d39',
        color: '#fff',
        padding: '20px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 2000,
        boxSizing: 'border-box'
      }}>
        <p style={{ margin: 0, fontSize: '14px' }}>
          We use cookies to improve your experience on our site. By using our site, you consent to cookies.
        </p>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button style={{ padding: '10px 20px', backgroundColor: '#fff', color: '#333', border: 'none', fontWeight: 'bold' }}>Preferences</button>
          <button style={{ padding: '10px 20px', backgroundColor: '#E67E22', color: '#fff', border: 'none', fontWeight: 'bold' }}>Accept All</button>
        </div>
      </div>
    </div>
  );
};

export default UrbanBistro;