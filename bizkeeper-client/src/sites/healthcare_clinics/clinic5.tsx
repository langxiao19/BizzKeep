import React from 'react';

/**
 * Industry: Private Non-Profit Healthcare System (Inspired by Scripps Health)
 * Template Name: ScrippsStyleHealth
 * Structure: Wellness-focused imagery, horizontal search utility, and a clean 
 * three-column approach to 'Find a Doctor', 'Locations', and 'Services'.
 */

const ScrippsStyleHealth: React.FC = () => {
  
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
      borderBottom: '1px solid #e5e7eb'
    },
    navTop: {
      backgroundColor: '#004b8d', // Scripps Deep Blue
      color: '#ffffff',
      padding: '8px 5%',
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: '12px',
      fontWeight: '500'
    },
    navMain: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px 5%',
    },
    navLinks: {
      display: 'flex',
      gap: '30px',
      fontSize: '15px',
      fontWeight: '700',
      color: '#004b8d',
      cursor: 'pointer'
    },
    logo: {
      fontSize: '28px',
      fontWeight: '900',
      color: '#004b8d',
      letterSpacing: '-1px'
    },
    hero: {
      height: '60vh',
      width: '100%',
      backgroundImage: 'url("https://images.unsplash.com/photo-1505751172107-573967a4f32a?auto=format&fit=crop&w=1920")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative' as 'relative'
    },
    heroOverlay: {
      position: 'absolute' as 'absolute',
      inset: 0,
      backgroundColor: 'rgba(0, 75, 141, 0.2)'
    },
    searchContainer: {
      position: 'relative' as 'relative',
      zIndex: 2,
      backgroundColor: '#ffffff',
      padding: '40px',
      width: '80%',
      maxWidth: '900px',
      marginTop: '-60px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
      borderRadius: '4px',
      display: 'flex',
      gap: '15px'
    },
    input: {
      flex: 1,
      padding: '12px 15px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      fontSize: '16px'
    },
    primaryBtn: {
      padding: '14px 30px',
      backgroundColor: '#004b8d',
      color: '#ffffff',
      border: 'none',
      fontSize: '14px',
      fontWeight: '700',
      cursor: 'pointer',
      borderRadius: '4px',
      textTransform: 'uppercase' as 'uppercase'
    },
    section: {
      padding: '80px 10%',
      backgroundColor: '#fff'
    },
    infoGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '40px',
      marginTop: '60px'
    },
    footer: {
      backgroundColor: '#f3f4f6',
      color: '#374151',
      padding: '60px 10%',
      borderTop: '1px solid #e5e7eb'
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', color: '#333', margin: 0 }}>
      
      {/* NAVIGATION */}
      <nav style={styles.nav}>
        <div style={styles.navTop}>
          <span>For Patients: Pay Your Bill Online</span>
          <div style={{ display: 'flex', gap: '20px' }}>
            <span>MyScripps Login</span>
            <span>Español</span>
            <span>Contact Us</span>
          </div>
        </div>
        <div style={styles.navMain}>
          <div style={styles.logo} onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            SCRIPPS <span style={{ fontWeight: '300' }}>HEALTH</span>
          </div>
          <div style={styles.navLinks}>
            <span onClick={() => scrollToSection('doctors')}>FIND A DOCTOR</span>
            <span onClick={() => scrollToSection('locations')}>LOCATIONS</span>
            <span onClick={() => scrollToSection('services')}>SERVICES</span>
          </div>
          <button 
            style={{ ...styles.primaryBtn, padding: '10px 20px', fontSize: '12px' }}
            onClick={() => scrollToSection('appointments')}
          >
            REQUEST APPOINTMENT
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header style={styles.hero}>
        <div style={styles.heroOverlay}></div>
        <h1 style={{ position: 'relative', zIndex: 2, color: '#fff', fontSize: '48px', fontWeight: '800', textAlign: 'center' }}>
          Your Health. Our Passion.
        </h1>
      </header>

      {/* SEARCH UTILITY */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={styles.searchContainer}>
          <input style={styles.input} type="text" placeholder="Search for a doctor, specialty, or condition..." />
          <button style={styles.primaryBtn}>Search</button>
        </div>
      </div>

      {/* CORE SERVICES GRID */}
      <section id="services" style={styles.section}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '32px', color: '#004b8d' }}>World-Class Care in San Diego</h2>
          <p style={{ color: '#666', marginTop: '10px' }}>Ranked among the nation's best for clinical excellence and patient safety.</p>
        </div>
        
        <div style={styles.infoGrid}>
          {[
            { title: 'Find a Doctor', desc: 'Connect with hundreds of primary care and specialty physicians.', btn: 'Search Doctors' },
            { title: 'Locations', desc: 'Find hospitals, clinics, and urgent care centers near you.', btn: 'Find Location' },
            { title: 'Specialties', desc: 'From cardiology to oncology, access top-tier medical experts.', btn: 'View Services' }
          ].map((item, i) => (
            <div key={i} style={{ border: '1px solid #eee', padding: '30px', borderRadius: '4px', textAlign: 'center' }}>
              <h3 style={{ color: '#004b8d', fontSize: '22px' }}>{item.title}</h3>
              <p style={{ margin: '15px 0', lineHeight: '1.6', color: '#555' }}>{item.desc}</p>
              <button style={{ ...styles.primaryBtn, backgroundColor: 'transparent', color: '#004b8d', border: '2px solid #004b8d' }}>
                {item.btn}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* WELLNESS / CARE SECTION */}
      <section id="appointments" style={{ ...styles.section, backgroundColor: '#f9fafb' }}>
        <div style={{ display: 'flex', gap: '60px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: '1', minWidth: '350px', height: '400px', backgroundColor: '#ddd', backgroundImage: 'url("https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800")', backgroundSize: 'cover' }}></div>
          <div style={{ flex: '1', minWidth: '350px' }}>
            <h2 style={{ fontSize: '36px', color: '#004b8d' }}>Health & Wellness</h2>
            <p style={{ margin: '20px 0', lineHeight: '1.8' }}>
              Get the latest health tips, nutrition advice, and medical news from Scripps experts. 
              Our mission is to improve the quality of life for our community through 
              preventative care and personalized treatment.
            </p>
            <button style={styles.primaryBtn}>Read Our Blog</button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px' }}>
          <div>
            <h4 style={{ color: '#004b8d', marginBottom: '20px' }}>SCRIPPS HEALTH</h4>
            <p>4275 Campus Point Court</p>
            <p>San Diego, CA 92121</p>
            <p>800-SCRIPPS</p>
          </div>
          <div>
            <h4 style={{ color: '#004b8d', marginBottom: '20px' }}>PATIENTS</h4>
            <p style={{ cursor: 'pointer', marginBottom: '10px' }}>Classes & Events</p>
            <p style={{ cursor: 'pointer', marginBottom: '10px' }}>Insurance Accepted</p>
            <p style={{ cursor: 'pointer', marginBottom: '10px' }}>Patient Rights</p>
          </div>
          <div>
            <h4 style={{ color: '#004b8d', marginBottom: '20px' }}>PROFESSIONALS</h4>
            <p style={{ cursor: 'pointer', marginBottom: '10px' }}>Medical Library</p>
            <p style={{ cursor: 'pointer', marginBottom: '10px' }}>Nursing at Scripps</p>
            <p style={{ cursor: 'pointer', marginBottom: '10px' }}>Physician Portal</p>
          </div>
        </div>
        <div style={{ marginTop: '50px', borderTop: '1px solid #d1d5db', paddingTop: '20px', textAlign: 'center', fontSize: '12px', opacity: 0.7 }}>
          &copy; 2026 Scripps Health. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
};

export default ScrippsStyleHealth;