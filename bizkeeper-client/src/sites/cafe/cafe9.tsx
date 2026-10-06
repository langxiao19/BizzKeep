import React from 'react';

/**
 * Industry: Independent Roastery & Retailer (Inspired by Cafe Grumpy)
 * Template Name: UrbanRoastery
 * Structure: Bold high-contrast typography, minimalist layout, 
 * and a product-focused grid for retail beans and merchandise.
 */

const UrbanRoastery: React.FC = () => {
  
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
      borderBottom: '2px solid #000'
    },
    navMain: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px 5%',
    },
    navLinks: {
      display: 'flex',
      gap: '25px',
      fontSize: '13px',
      fontWeight: '800',
      color: '#000',
      cursor: 'pointer',
      letterSpacing: '1px'
    },
    logo: {
      fontSize: '28px',
      fontWeight: '900',
      color: '#000',
      textTransform: 'uppercase' as 'uppercase',
      letterSpacing: '-1px'
    },
    hero: {
      height: '65vh',
      width: '100%',
      backgroundColor: '#f4f4f4',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center' as 'center',
      padding: '0 10%'
    },
    heroContent: {
      maxWidth: '800px'
    },
    primaryBtn: {
      padding: '14px 30px',
      backgroundColor: '#000',
      color: '#fff',
      border: 'none',
      fontSize: '14px',
      fontWeight: '700',
      cursor: 'pointer',
      marginTop: '25px',
      textTransform: 'uppercase' as 'uppercase'
    },
    section: {
      padding: '80px 8%',
      backgroundColor: '#fff'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '30px',
      marginTop: '40px'
    },
    productCard: {
      border: '1px solid #eee',
      padding: '20px',
      textAlign: 'center' as 'center',
      transition: 'border-color 0.3s'
    },
    productImg: {
      width: '100%',
      aspectRatio: '1/1',
      backgroundColor: '#fafafa',
      marginBottom: '15px',
      backgroundImage: 'url("https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400")',
      backgroundSize: '80%',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    },
    footer: {
      backgroundColor: '#000',
      color: '#fff',
      padding: '60px 8%',
      fontSize: '13px'
    }
  };

  return (
    <div style={{ fontFamily: '"Helvetica Neue", Arial, sans-serif', color: '#000', margin: 0 }}>
      
      {/* NAVIGATION */}
      <nav style={styles.nav}>
        <div style={styles.navMain}>
          <div style={styles.navLinks}>
            <span onClick={() => scrollToSection('coffee')}>COFFEE</span>
            <span onClick={() => scrollToSection('subscriptions')}>SUBSCRIPTIONS</span>
            <span onClick={() => scrollToSection('locations')}>LOCATIONS</span>
          </div>
          <div style={styles.logo} onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            URBAN ROASTERY
          </div>
          <div style={styles.navLinks}>
            <span onClick={() => scrollToSection('wholesale')}>WHOLESALE</span>
            <span onClick={() => scrollToSection('about')}>ABOUT</span>
            <button 
              style={{ ...styles.primaryBtn, marginTop: 0, padding: '8px 20px', fontSize: '12px' }}
              onClick={() => scrollToSection('coffee')}
            >
              SHOP NOW
            </button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={{ fontSize: '56px', fontWeight: '900', margin: '0 0 20px 0' }}>ROASTED IN THE CITY.</h1>
          <p style={{ fontSize: '18px', lineHeight: '1.6', color: '#333' }}>
            From our neighborhood roastery to your kitchen. We source specialty 
            grade beans and roast them with precision to bring out the best in every cup.
          </p>
          <button style={styles.primaryBtn} onClick={() => scrollToSection('coffee')}>
            VIEW COFFEE SELECTION
          </button>
        </div>
      </header>

      {/* RETAIL SECTION */}
      <section id="coffee" style={styles.section}>
        <h2 style={{ fontSize: '28px', fontWeight: '900' }}>FRESH ROASTS</h2>
        <div style={styles.grid}>
          {[
            { name: 'City House Blend', price: '$18.00' },
            { name: 'Single Origin: Ethiopia', price: '$22.00' },
            { name: 'Decaf Espresso', price: '$19.00' },
            { name: 'Cold Brew Blend', price: '$20.00' }
          ].map((item, i) => (
            <div key={i} style={styles.productCard}>
              <div style={styles.productImg}></div>
              <h3 style={{ fontSize: '16px', margin: '10px 0' }}>{item.name}</h3>
              <p style={{ color: '#666', marginBottom: '15px' }}>{item.price}</p>
              <button style={{ ...styles.primaryBtn, marginTop: 0, width: '100%' }}>Add to Cart</button>
            </div>
          ))}
        </div>
      </section>

      {/* SUBSCRIPTION CALLOUT */}
      <section id="subscriptions" style={{ ...styles.section, backgroundColor: '#000', color: '#fff', textAlign: 'center' }}>
        <h2 style={{ fontSize: '32px', fontWeight: '900' }}>NEVER RUN OUT</h2>
        <p style={{ maxWidth: '600px', margin: '20px auto', opacity: 0.8 }}>
          Save 15% on every bag when you subscribe. Choose your favorite roast and 
          frequency, and we’ll handle the rest.
        </p>
        <button 
          style={{ ...styles.primaryBtn, backgroundColor: '#fff', color: '#000' }}
          onClick={() => alert('Redirecting to Subscription Portal...')}
        >
          START SUBSCRIPTION
        </button>
      </section>

      {/* ABOUT / WHOLESALE */}
      <section id="wholesale" style={styles.section}>
        <div style={{ display: 'flex', gap: '50px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: '1', minWidth: '300px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: '900' }}>PARTNER WITH US</h2>
            <p style={{ lineHeight: '1.8', margin: '20px 0', color: '#444' }}>
              We offer wholesale partnerships for cafes, restaurants, and offices 
              looking to serve high-quality specialty coffee. Our team provides 
              training and equipment support to ensure excellence in every pour.
            </p>
            <button style={{ ...styles.primaryBtn, backgroundColor: 'transparent', color: '#000', border: '2px solid #000' }}>
              WHOLESALE INQUIRY
            </button>
          </div>
          <div style={{ flex: '1', height: '400px', backgroundColor: '#eee', backgroundImage: 'url("https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800")', backgroundSize: 'cover' }}></div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '40px' }}>
          <div>
            <h4 style={{ fontSize: '16px', marginBottom: '20px' }}>VISIT</h4>
            <p>Roastery HQ: 101 Urban Ave</p>
            <p>Brooklyn, NY 11222</p>
          </div>
          <div>
            <h4 style={{ fontSize: '16px', marginBottom: '20px' }}>FOLLOW</h4>
            <p>Instagram / Twitter / Facebook</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <h4 style={styles.logo}>URBAN ROASTERY</h4>
            <p style={{ opacity: 0.6 }}>&copy; 2026 Urban Roastery Co.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default UrbanRoastery;