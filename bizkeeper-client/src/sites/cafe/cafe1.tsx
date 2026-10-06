import React from 'react';

/**
 * Industry: Healthcare / Medical Clinic
 * Template Name: ModernClinic
 * Structure: Clean, split-hero, high-trust layout
 */

const ModernClinic: React.FC = () => {
  
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
      borderBottom: '1px solid #f0f0f0'
    },
    navLinks: {
      display: 'flex',
      gap: '25px',
      fontSize: '14px',
      fontWeight: '500',
      color: '#4A5568',
      cursor: 'pointer'
    },
    hero: {
      display: 'flex',
      height: '75vh',
      width: '100%',
      alignItems: 'center',
      backgroundColor: '#F7FAFC'
    },
    heroLeft: {
      flex: 1,
      padding: '0 5% 0 8%',
      display: 'flex',
      flexDirection: 'column' as 'column',
      justifyContent: 'center'
    },
    heroRight: {
      flex: 1,
      height: '100%',
      backgroundImage: 'url("https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200")',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    },
    primaryBtn: {
      padding: '16px 32px',
      borderRadius: '4px',
      border: 'none',
      backgroundColor: '#2B6CB0',
      color: '#fff',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      width: 'fit-content',
      marginTop: '24px',
      transition: 'background-color 0.2s'
    },
    secondaryBtn: {
      padding: '10px 20px',
      borderRadius: '4px',
      border: '2px solid #2B6CB0',
      backgroundColor: 'transparent',
      color: '#2B6CB0',
      fontWeight: '600',
      cursor: 'pointer'
    },
    section: {
      padding: '100px 10%',
      backgroundColor: '#fff'
    },
    sectionHeading: {
      fontSize: '36px',
      color: '#2D3748',
      marginBottom: '20px'
    }
  };

  return (
    <div style={{ fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif', color: '#2D3748', lineHeight: '1.5' }}>
      {/* NAVIGATION */}
      <nav style={styles.nav}>
        <div style={{ fontSize: '22px', fontWeight: '800', color: '#2B6CB0', letterSpacing: '-0.5px' }}>
          CITYHEALTH <span style={{ fontWeight: '300', color: '#718096' }}>PARTNERS</span>
        </div>
        <div style={styles.navLinks}>
          <span onClick={() => scrollToSection('specialties')}>SPECIALTIES</span>
          <span onClick={() => scrollToSection('doctors')}>OUR DOCTORS</span>
          <span onClick={() => scrollToSection('patients')}>PATIENT PORTAL</span>
          <span onClick={() => scrollToSection('locations')}>LOCATIONS</span>
        </div>
        <button style={styles.secondaryBtn} onClick={() => scrollToSection('portal')}>
          PATIENT LOGIN
        </button>
      </nav>

      {/* HERO SECTION */}
      <header style={styles.hero}>
        <div style={styles.heroLeft}>
          <h1 style={{ fontSize: '56px', fontWeight: '700', margin: '0 0 24px 0', color: '#1A365D', lineHeight: '1.1' }}>
            Compassionate Care <br /> for a Healthier You.
          </h1>
          <p style={{ fontSize: '20px', color: '#4A5568', maxWidth: '500px' }}>
            Access world-class medical expertise and personalized treatment plans 
            designed to help you live your best life.
          </p>
          <button style={styles.primaryBtn} onClick={() => scrollToSection('appointment')}>
            BOOK AN APPOINTMENT
          </button>
        </div>
        <div style={styles.heroRight}></div>
      </header>

      {/* CONTENT SECTIONS */}
      <section id="specialties" style={styles.section}>
        <h2 style={styles.sectionHeading}>Medical Specialties</h2>
        <p>From primary care to advanced surgery, our specialists are leaders in their fields.</p>
      </section>

      <section id="doctors" style={{ ...styles.section, backgroundColor: '#F7FAFC' }}>
        <h2 style={styles.sectionHeading}>Meet Our Doctors</h2>
        <p>A team of board-certified professionals committed to clinical excellence.</p>
      </section>

      <section id="patients" style={styles.section}>
        <h2 style={styles.sectionHeading}>Patient Resources</h2>
        <p>Access forms, insurance information, and our secure digital health records.</p>
      </section>

      <section id="appointment" style={{ ...styles.section, backgroundColor: '#2B6CB0', color: '#fff' }}>
        <h2 style={{ ...styles.sectionHeading, color: '#fff' }}>Schedule Your Visit</h2>
        <p>New and returning patients can book online in less than two minutes.</p>
      </section>

      <footer style={{ padding: '40px 5%', backgroundColor: '#1A365D', color: '#CBD5E0', fontSize: '14px', textAlign: 'center' }}>
        <p>&copy; 2026 CityHealth Partners. Accredited Medical Provider.</p>
      </footer>
    </div>
  );
};

export default ModernClinic;