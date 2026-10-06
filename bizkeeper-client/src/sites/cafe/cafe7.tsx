import React from 'react';

/**
 * Industry: Global Coffee & Tea Retail (Inspired by The Coffee Bean & Tea Leaf)
 * Template Name: HeritageLeaf
 * Structure: Promotional-led hero, clean grid-based product categories, 
 * and a focused rewards-centric layout.
 */

const HeritageLeaf: React.FC = () => {
  
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
    topUtility: {
      backgroundColor: '#4B2C20', // Signature Coffee Bean Purple/Brown
      color: '#ffffff',
      padding: '8px 5%',
      display: 'flex',
      justifyContent: 'flex-end',
      fontSize: '11px',
      gap: '20px',
      letterSpacing: '0.5px'
    },
    navMain: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px 5%',
      borderBottom: '1px solid #eee'
    },
    navLinks: {
      display: 'flex',
      gap: '30px',
      fontSize: '14px',
      fontWeight: '700',
      color: '#4B2C20',
      cursor: 'pointer'
    },
    logo: {
      fontSize: '22px',
      fontWeight: '800',
      color: '#4B2C20',
      fontFamily: 'serif'
    },
    hero: {
      height: '60vh',
      width: '100%',
      backgroundColor: '#F4F1EA',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      overflow: 'hidden'
    },
    heroText: {
      flex: '1',
      padding: '0 8%',
    },
    heroImage: {
      flex: '1',
      height: '100%',
      backgroundImage: 'url("https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1200")',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    },
    primaryBtn: {
      padding: '14px 28px',
      backgroundColor: '#4B2C20',
      color: '#ffffff',
      border: 'none',
      fontSize: '14px',
      fontWeight: '700',
      cursor: 'pointer',
      borderRadius: '25px',
      marginTop: '25px'
    },
    section: {
      padding: '60px 8%',
      textAlign: 'center' as 'center'
    },
    categoryGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '20px',
      marginTop: '40px'
    },
    categoryCard: {
      padding: '20px',
      backgroundColor: '#f9f9f9',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'transform 0.2s'
    },
    footer: {
      backgroundColor: '#F4F1EA',
      padding: '60px 8%',
      color: '#4B2C20',
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: '14px'
    }
  };

  return (
    <div style={{ fontFamily: '"Helvetica Neue", Arial, sans-serif', color: '#333', margin: 0 }}>
      
      {/* NAVIGATION */}
      <nav style={styles.nav}>
        <div style={styles.topUtility}>
          <span>FIND A STORE</span>
          <span>ORDER AHEAD</span>
          <span>SIGN IN</span>
        </div>
        <div style={styles.navMain}>
          <div style={styles.logo}>HERITAGE LEAF</div>
          <div style={styles.navLinks}>
            <span onClick={() => scrollToSection('coffee')}>COFFEE</span>
            <span onClick={() => scrollToSection('tea')}>TEA</span>
            <span onClick={() => scrollToSection('menu')}>MENU</span>
            <span onClick={() => scrollToSection('rewards')}>REWARDS</span>
          </div>
          <button 
            style={{ ...styles.primaryBtn, marginTop: 0, padding: '10px 25px' }}
            onClick={() => scrollToSection('shop')}
          >
            SHOP ONLINE
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header style={styles.hero}>
        <div style={styles.heroText}>
          <h1 style={{ fontSize: '48px', color: '#4B2C20', lineHeight: '1.2' }}>
            Bold Flavors.<br />Brewed for You.
          </h1>
          <p style={{ fontSize: '18px', color: '#666', marginTop: '15px' }}>
            Experience the original taste of ice-blended favorites and 
            hand-picked single origin coffees.
          </p>
          <button style={styles.primaryBtn} onClick={() => scrollToSection('menu')}>
            DISCOVER THE MENU
          </button>
        </div>
        <div style={styles.heroImage}></div>
      </header>

      {/* SHOP CATEGORIES */}
      <section id="shop" style={styles.section}>
        <h2 style={{ fontSize: '28px', color: '#4B2C20' }}>Shop Our Favorites</h2>
        <div style={styles.categoryGrid}>
          <div style={styles.categoryCard} onClick={() => scrollToSection('coffee')}>
            <div style={{ fontSize: '40px', marginBottom: '10px' }}>☕</div>
            <h3 style={{ fontSize: '16px' }}>WHOLE BEAN</h3>
          </div>
          <div style={styles.categoryCard} onClick={() => scrollToSection('tea')}>
            <div style={{ fontSize: '40px', marginBottom: '10px' }}>🍃</div>
            <h3 style={{ fontSize: '16px' }}>LOOSE LEAF TEA</h3>
          </div>
          <div style={styles.categoryCard}>
            <div style={{ fontSize: '40px', marginBottom: '10px' }}>🥤</div>
            <h3 style={{ fontSize: '16px' }}>POWDERS</h3>
          </div>
          <div style={styles.categoryCard}>
            <div style={{ fontSize: '40px', marginBottom: '10px' }}>🎁</div>
            <h3 style={{ fontSize: '16px' }}>GIFTS</h3>
          </div>
        </div>
      </section>

      {/* REWARDS SECTION */}
      <section id="rewards" style={{ ...styles.section, backgroundColor: '#4B2C20', color: '#fff' }}>
        <h2 style={{ fontSize: '32px' }}>Earn Points with Every Sip</h2>
        <p style={{ maxWidth: '600px', margin: '20px auto', opacity: 0.9 }}>
          Join Heritage Leaf Rewards to unlock exclusive offers, free drinks, 
          and birthday treats.
        </p>
        <button 
          style={{ ...styles.primaryBtn, backgroundColor: '#fff', color: '#4B2C20' }}
          onClick={() => alert('Redirecting to Rewards Signup...')}
        >
          JOIN THE CLUB
        </button>
      </section>

      <section id="coffee" style={styles.section}>
        <h2 style={{ fontSize: '28px' }}>Our Coffee Heritage</h2>
        <p style={{ lineHeight: '1.8', color: '#555', maxWidth: '800px', margin: '20px auto' }}>
          Since our founding, we have been committed to sourcing the top 1% 
          of Arabica beans. Our roasting process highlights the unique 
          characteristics of every origin.
        </p>
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <div>
          <h4 style={{ marginBottom: '15px' }}>ABOUT US</h4>
          <p style={{ cursor: 'pointer' }}>Our Story</p>
          <p style={{ cursor: 'pointer' }}>Sustainability</p>
          <p style={{ cursor: 'pointer' }}>Careers</p>
        </div>
        <div>
          <h4 style={{ marginBottom: '15px' }}>CUSTOMER CARE</h4>
          <p style={{ cursor: 'pointer' }}>Contact Us</p>
          <p style={{ cursor: 'pointer' }}>Shipping & Returns</p>
          <p style={{ cursor: 'pointer' }}>Gift Card Balance</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={styles.logo}>HERITAGE LEAF</div>
          <p style={{ marginTop: '10px', fontSize: '12px' }}>&copy; 2026 Heritage Leaf & Tea Co.</p>
        </div>
      </footer>
    </div>
  );
};

export default HeritageLeaf;