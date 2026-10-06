import React from 'react';

/**
 * Industry: Specialty Coffee / E-commerce (Inspired by Blue Bottle Coffee)
 * Template Name: MinimalistBrew
 * Structure: Clean, high-contrast minimalist layout with spacious typography 
 * and featured product grid.
 */

const MinimalistBrew: React.FC = () => {
  
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
      borderBottom: '1px solid #e5e5e5'
    },
    navTop: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 40px',
      fontSize: '11px',
      letterSpacing: '1px',
      color: '#666',
      borderBottom: '1px solid #f7f7f7'
    },
    navMain: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px 40px',
    },
    navLinks: {
      display: 'flex',
      gap: '25px',
      fontSize: '13px',
      fontWeight: '600',
      color: '#000',
      cursor: 'pointer',
      letterSpacing: '0.5px'
    },
    logo: {
      width: '40px',
      height: '50px',
      backgroundColor: '#00A9E0', // Blue Bottle Blue
      maskImage: 'url("https://upload.wikimedia.org/wikipedia/en/c/cf/Blue_Bottle_Coffee_logo.svg")',
      WebkitMaskImage: 'url("https://upload.wikimedia.org/wikipedia/en/c/cf/Blue_Bottle_Coffee_logo.svg")',
      maskRepeat: 'no-repeat',
      WebkitMaskRepeat: 'no-repeat',
      maskSize: 'contain',
      WebkitMaskSize: 'contain'
    },
    hero: {
      height: '70vh',
      width: '100%',
      backgroundColor: '#f3f3f3',
      backgroundImage: 'url("https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1920")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      alignItems: 'center',
      padding: '0 8%'
    },
    heroCard: {
      backgroundColor: '#fff',
      padding: '40px',
      maxWidth: '450px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
    },
    ctaButton: {
      padding: '15px 40px',
      backgroundColor: '#000',
      color: '#fff',
      border: 'none',
      fontSize: '14px',
      fontWeight: '700',
      cursor: 'pointer',
      marginTop: '20px',
      letterSpacing: '1px'
    },
    section: {
      padding: '80px 8%',
      backgroundColor: '#fff'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '30px',
      marginTop: '40px'
    },
    productCard: {
      textAlign: 'center' as 'center',
      cursor: 'pointer'
    },
    productImg: {
      width: '100%',
      aspectRatio: '1/1',
      backgroundColor: '#f9f9f9',
      marginBottom: '15px',
      backgroundSize: '80%',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }
  };

  return (
    <div style={{ fontFamily: '"Courier New", Courier, monospace', color: '#000' }}>
      {/* NAVIGATION */}
      <nav style={styles.nav}>
        <div style={styles.navTop}>
          <span>COMPLIMENTARY SHIPPING ON ORDERS $50+</span>
          <div style={{ display: 'flex', gap: '20px' }}>
            <span>LOCATIONS</span>
            <span>LOG IN</span>
          </div>
        </div>
        <div style={styles.navMain}>
          <div style={styles.navLinks}>
            <span onClick={() => scrollToSection('coffee')}>COFFEE</span>
            <span onClick={() => scrollToSection('subscriptions')}>SUBSCRIPTIONS</span>
            <span onClick={() => scrollToSection('brew-guides')}>LEARN</span>
          </div>
          <div style={styles.logo} onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}></div>
          <button 
            style={{ ...styles.ctaButton, marginTop: 0, padding: '10px 25px' }}
            onClick={() => scrollToSection('shop')}
          >
            SHOP ALL
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header style={styles.hero}>
        <div style={styles.heroCard}>
          <h1 style={{ fontSize: '32px', margin: '0 0 15px 0', fontFamily: 'serif' }}>
            The Season of Renewal
          </h1>
          <p style={{ fontSize: '15px', lineHeight: '1.6', color: '#444', fontFamily: 'sans-serif' }}>
            Our limited-release Spring collection has arrived. Refresh your ritual 
            with notes of jasmine, stone fruit, and bright citrus.
          </p>
          <button style={styles.ctaButton} onClick={() => scrollToSection('coffee')}>
            SHOP THE COLLECTION
          </button>
        </div>
      </header>

      {/* CONTENT SECTIONS */}
      <section id="coffee" style={styles.section}>
        <h2 style={{ fontSize: '24px', textAlign: 'center', letterSpacing: '2px' }}>BEST SELLERS</h2>
        <div style={styles.grid}>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} style={styles.productCard}>
              <div style={{ ...styles.productImg, backgroundImage: `url(https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400)` }}></div>
              <h3 style={{ fontSize: '14px', marginBottom: '5px' }}>Signature Blend No. {i}</h3>
              <p style={{ fontSize: '12px', color: '#666' }}>$21.00 — Whole Bean</p>
            </div>
          ))}
        </div>
      </section>

      <section id="subscriptions" style={{ ...styles.section, backgroundColor: '#f7f7f7', textAlign: 'center' }}>
        <h2 style={{ fontSize: '28px', fontFamily: 'serif' }}>Coffee on Repeat</h2>
        <p style={{ maxWidth: '600px', margin: '20px auto', fontFamily: 'sans-serif' }}>
          Never run out of fresh beans. Customize your frequency and flavor profile.
        </p>
        <button 
          style={{ ...styles.ctaButton, backgroundColor: '#fff', color: '#000', border: '1px solid #000' }}
          onClick={() => alert('Redirecting to subscription wizard...')}
        >
          START A SUBSCRIPTION
        </button>
      </section>

      <section id="brew-guides" style={styles.section}>
        <h2 style={{ fontSize: '24px', marginBottom: '30px' }}>Brewing Excellence</h2>
        <p style={{ fontFamily: 'sans-serif', color: '#555' }}>
          Discover the art of the perfect pour-over. Our step-by-step guides help you 
          recreate the cafe experience at home.
        </p>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '60px 8%', backgroundColor: '#000', color: '#fff', fontSize: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: '40px' }}>
            <div>
              <h4 style={{ color: '#00A9E0' }}>COMPANY</h4>
              <p>Sustainability</p>
              <p>Our Coffee</p>
            </div>
            <div>
              <h4 style={{ color: '#00A9E0' }}>SUPPORT</h4>
              <p>Contact Us</p>
              <p>Shipping FAQ</p>
            </div>
          </div>
          <p>&copy; 2026 MinimalistBrew Coffee Inc.</p>
        </div>
      </footer>
    </div>
  );
};

export default MinimalistBrew;