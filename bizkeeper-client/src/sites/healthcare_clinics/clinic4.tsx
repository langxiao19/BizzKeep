import React from 'react';

/**
 * Industry: Academic Health System / Research Hospital (Inspired by UCI Health)
 * Template Name: OrangeCountyHealth
 * Structure: Clean, clinical, and high-trust. Features a heavy emphasis on 
 * 'Find a Provider', 'Locations', and 'Clinical Trials' with a modern 
 * orange and blue accent palette.
 */

const OrangeCountyHealth: React.FC = () => {
  
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
      boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
    },
    topUtility: {
      backgroundColor: '#f8f9fa',
      padding: '8px 5%',
      display: 'flex',
      justifyContent: 'flex-end',
      fontSize: '12px',
      gap: '20px',
      color: '#004a8b'
    },
    navMain: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px 5%',
      borderBottom: '4px solid #f2a900' // Gold accent bar
    },
    navLinks: {
      display: 'flex',
      gap: '25px',
      fontSize: '14px',
      fontWeight: '700',
      color: '#004a8b',
      cursor: 'pointer',
      textTransform: 'uppercase' as 'uppercase'
    },
    logo: {
      fontSize: '24px',
      fontWeight: '900',
      color: '#004a8b',
      letterSpacing: '-0.5px'
    },
    hero: {
      height: '60vh',
      width: '100%',
      backgroundColor: '#004a8b',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundImage: 'linear-gradient(rgba(0,74,139,0.7), rgba(0,74,139,0.7)), url("https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1920")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      color: '#ffffff',
      textAlign: 'center' as 'center',
      padding: '0 20px'
    },
    primaryBtn: {
      padding: '15px 35px',
      backgroundColor: '#f2a900', // UCI Gold
      color: '#004a8b',
      border: 'none',
      fontSize: '15px',
      fontWeight: '800',
      cursor: 'pointer',
      borderRadius: '2px',
      marginTop: '25px',
      transition: 'background-color 0.2s'
    },
    actionSection: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '20px',
      padding: '40px 5%',
      marginTop: '-60px',
      zIndex: 10,
      position: 'relative' as 'relative'
    },
    actionCard: {
      backgroundColor: '#ffffff',
      padding: '30px',
      boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
      textAlign: 'center' as 'center',
      cursor: 'pointer',
      borderBottom: '4px solid #004a8b'
    },
    section: {
      padding: '80px 10%',
      backgroundColor: '#fff'
    },
    footer: {
      backgroundColor: '#002a4e',
      color: '#fff',
      padding: '60px 5%',
      fontSize: '14px'
    }
  };

  return (
    <div style={{ fontFamily: 'Montserrat, sans-serif', color: '#333', margin: 0 }}>
      
      {/* NAVIGATION */}
      <nav style={styles.nav}>
        <div style={styles.topUtility}>
          <span>Patient Portal</span>
          <span>Find a Location</span>
          <span>Contact Us</span>
          <span>English</span>
        </div>
        <div style={styles.navMain}>
          <div style={styles.logo} onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            HEALTH <span style={{ fontWeight: '300' }}>SCIENCES</span>
          </div>
          <div style={styles.navLinks}>
            <span onClick={() => scrollToSection('find-doctor')}>FIND A DOCTOR</span>
            <span onClick={() => scrollToSection('medical-services')}>MEDICAL SERVICES</span>
            <span onClick={() => scrollToSection('clinical-trials')}>CLINICAL TRIALS</span>
            <span onClick={() => scrollToSection('patients')}>PATIENTS & VISITORS</span>
          </div>
          <button 
            style={{ ...styles.primaryBtn, marginTop: 0, padding: '10px 20px', fontSize: '12px' }}
            onClick={() => scrollToSection('appointments')}
          >
            MAKE AN APPOINTMENT
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header style={styles.hero}>
        <div style={{ maxWidth: '800px' }}>
          <h1 style={{ fontSize: '52px', fontWeight: '800', marginBottom: '20px' }}>Advanced Care. Exceptional Discovery.</h1>
          <p style={{ fontSize: '20px', opacity: 0.9, lineHeight: '1.6' }}>
            As the region’s only academic health system, we offer the latest 
            treatment options and world-class specialists dedicated to your health.
          </p>
          <button style={styles.primaryBtn} onClick={() => scrollToSection('medical-services')}>
            EXPLORE OUR CARE
          </button>
        </div>
      </header>

      {/* QUICK ACTION CARDS */}
      <div style={styles.actionSection}>
        <div style={styles.actionCard} onClick={() => scrollToSection('find-doctor')}>
          <div style={{ fontSize: '40px', marginBottom: '15px' }}>👨‍⚕️</div>
          <h3 style={{ color: '#004a8b' }}>Find a Provider</h3>
          <p style={{ fontSize: '14px', color: '#666' }}>Search by name, specialty, or condition.</p>
        </div>
        <div style={styles.actionCard}>
          <div style={{ fontSize: '40px', marginBottom: '15px' }}>🏥</div>
          <h3 style={{ color: '#004a8b' }}>View All Locations</h3>
          <p style={{ fontSize: '14px', color: '#666' }}>Hospitals and clinics near you.</p>
        </div>
        <div style={styles.actionCard} onClick={() => scrollToSection('clinical-trials')}>
          <div style={{ fontSize: '40px', marginBottom: '15px' }}>🔬</div>
          <h3 style={{ color: '#004a8b' }}>Clinical Trials</h3>
          <p style={{ fontSize: '14px', color: '#666' }}>Participate in ground-breaking research.</p>
        </div>
      </div>

      {/* MEDICAL SERVICES */}
      <section id="medical-services" style={styles.section}>
        <h2 style={{ fontSize: '36px', color: '#004a8b', textAlign: 'center', marginBottom: '40px' }}>Comprehensive Specialized Care</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '30px' }}>
          {['Cancer Center', 'Digestive Health', 'Heart & Vascular', 'Neurology', 'Orthopaedic Surgery', 'Women’s Health'].map((service, i) => (
            <div key={i} style={{ padding: '20px', border: '1px solid #f2a900', textAlign: 'center' as 'center', cursor: 'pointer' }}>
              <h4 style={{ margin: 0, color: '#004a8b' }}>{service}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* RESEARCH & CLINICAL TRIALS */}
      <section id="clinical-trials" style={{ ...styles.section, backgroundColor: '#f8f9fa' }}>
        <div style={{ display: 'flex', gap: '60px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: '1', height: '400px', backgroundColor: '#ddd', backgroundImage: 'url("https://images.unsplash.com/photo-1579154235884-10f5fe588f60?w=800")', backgroundSize: 'cover' }}></div>
          <div style={{ flex: '1', minWidth: '300px' }}>
            <h2 style={{ fontSize: '36px', color: '#004a8b' }}>Advancing the Future of Medicine</h2>
            <p style={{ margin: '20px 0', lineHeight: '1.8' }}>
              Our researchers are at the forefront of discovery, translating lab 
              breakthroughs into life-changing bedside treatments. Learn about 
              the clinical trials currently enrolling patients.
            </p>
            <button style={{ ...styles.primaryBtn, backgroundColor: 'transparent', color: '#004a8b', border: '2px solid #004a8b' }}>
              SEARCH TRIALS
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px' }}>
          <div>
            <h4 style={{ color: '#f2a900', marginBottom: '20px' }}>UCI HEALTH</h4>
            <p>101 The City Drive South<br />Orange, CA 92868</p>
            <p>Main: (714) 555-0199</p>
          </div>
          <div>
            <h4 style={{ color: '#f2a900', marginBottom: '20px' }}>RESOURCES</h4>
            <p style={{ cursor: 'pointer' }}>For Physicians</p>
            <p style={{ cursor: 'pointer' }}>Billing & Insurance</p>
            <p style={{ cursor: 'pointer' }}>Medical Records</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={styles.logo}><span style={{ color: '#fff' }}>HEALTH SCIENCES</span></div>
            <p style={{ marginTop: '20px', fontSize: '12px', opacity: 0.5 }}>&copy; 2026 Health Sciences. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default OrangeCountyHealth;