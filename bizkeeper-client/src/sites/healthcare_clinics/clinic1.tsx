import React from 'react';

/**
 * Industry: Academic Medicine / Large Healthcare System (Inspired by UCLA Health)
 * Template Name: UniversityHealth
 * Structure: High-trust blue/white palette, prominent multi-service navigation, 
 * search-focused utility, and clear patient-care pathways.
 */

const UniversityHealth: React.FC = () => {
  
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
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    },
    navTop: {
      backgroundColor: '#003B5C', // Academic Deep Blue
      color: '#ffffff',
      padding: '10px 5%',
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: '13px',
      fontWeight: '500'
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
      fontSize: '15px',
      fontWeight: '600',
      color: '#005587', // Medical Blue
      cursor: 'pointer'
    },
    logo: {
      fontSize: '24px',
      fontWeight: '800',
      color: '#003B5C',
      letterSpacing: '-0.5px'
    },
    hero: {
      height: '65vh',
      width: '100%',
      backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0.9) 30%, rgba(255,255,255,0) 100%), url("https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1920")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      alignItems: 'center',
      padding: '0 5%'
    },
    heroContent: {
      maxWidth: '550px'
    },
    primaryBtn: {
      padding: '16px 32px',
      backgroundColor: '#FFD100', // Highlight Gold
      color: '#003B5C',
      border: 'none',
      fontSize: '16px',
      fontWeight: '700',
      cursor: 'pointer',
      borderRadius: '4px',
      marginTop: '25px',
      textTransform: 'uppercase' as 'uppercase'
    },
    serviceGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
      gap: '20px',
      marginTop: '-40px',
      padding: '0 5%',
      position: 'relative' as 'relative',
      zIndex: 10
    },
    serviceCard: {
      backgroundColor: '#ffffff',
      padding: '30px',
      textAlign: 'center' as 'center',
      boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
      borderRadius: '8px',
      cursor: 'pointer',
      borderTop: '5px solid #0071BC'
    },
    section: {
      padding: '80px 5%',
      backgroundColor: '#ffffff'
    },
    footer: {
      backgroundColor: '#003B5C',
      color: '#ffffff',
      padding: '60px 5%',
      marginTop: '40px'
    }
  };

  return (
    <div style={{ fontFamily: '"Helvetica Neue", Arial, sans-serif', color: '#333', margin: 0 }}>
      
      {/* NAVIGATION */}
      <nav style={styles.nav}>
        <div style={styles.navTop}>
          <span>PATIENT PORTAL: myHealth Login</span>
          <div style={{ display: 'flex', gap: '20px' }}>
            <span>Locations</span>
            <span>Careers</span>
            <span>Giving</span>
          </div>
        </div>
        <div style={styles.navMain}>
          <div style={styles.logo}>UNIVERSITY <span style={{ fontWeight: '300' }}>HEALTH</span></div>
          <div style={styles.navLinks}>
            <span onClick={() => scrollToSection('doctors')}>FIND A DOCTOR</span>
            <span onClick={() => scrollToSection('services')}>CARE & SERVICES</span>
            <span onClick={() => scrollToSection('patients')}>PATIENT RESOURCES</span>
            <span onClick={() => scrollToSection('research')}>RESEARCH & INNOVATION</span>
          </div>
          <button 
            style={{ ...styles.primaryBtn, marginTop: 0, padding: '10px 20px', fontSize: '13px' }}
            onClick={() => scrollToSection('appointments')}
          >
            MAKE AN APPOINTMENT
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={{ fontSize: '48px', fontWeight: '800', color: '#003B5C', lineHeight: '1.1', margin: '0 0 20px 0' }}>
            World-Class Care. <br /> Right Here.
          </h1>
          <p style={{ fontSize: '18px', color: '#444', lineHeight: '1.6' }}>
            Leading the way in medical research and patient care. Our team of 
            specialists is dedicated to providing compassionate, innovative 
            healthcare for you and your family.
          </p>
          <button style={styles.primaryBtn} onClick={() => scrollToSection('doctors')}>
            FIND A SPECIALIST
          </button>
        </div>
      </header>

      {/* QUICK ACCESS CARDS */}
      <div style={styles.serviceGrid}>
        <div style={styles.serviceCard} onClick={() => scrollToSection('appointments')}>
          <h3 style={{ color: '#005587' }}>Request Appointment</h3>
          <p style={{ fontSize: '14px', color: '#666' }}>Schedule your visit online</p>
        </div>
        <div style={styles.serviceCard} onClick={() => scrollToSection('doctors')}>
          <h3 style={{ color: '#005587' }}>Find a Provider</h3>
          <p style={{ fontSize: '14px', color: '#666' }}>Search by name or specialty</p>
        </div>
        <div style={styles.serviceCard}>
          <h3 style={{ color: '#005587' }}>View Locations</h3>
          <p style={{ fontSize: '14px', color: '#666' }}>Find care near you</p>
        </div>
        <div style={styles.serviceCard}>
          <h3 style={{ color: '#005587' }}>My Chart</h3>
          <p style={{ fontSize: '14px', color: '#666' }}>Access your medical records</p>
        </div>
      </div>

      {/* CARE SERVICES */}
      <section id="services" style={styles.section}>
        <h2 style={{ fontSize: '32px', color: '#003B5C', textAlign: 'center' }}>Our Specialties</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '30px', marginTop: '40px' }}>
          {['Primary Care', 'Cardiology', 'Oncology', 'Neurology', 'Pediatrics', 'Orthopedics'].map((service, i) => (
            <div key={i} style={{ padding: '20px', border: '1px solid #eee', textAlign: 'center' as 'center' }}>
              <div style={{ fontSize: '30px', marginBottom: '10px' }}>⚕️</div>
              <h4 style={{ color: '#005587', margin: 0 }}>{service}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* APPOINTMENT SECTION */}
      <section id="appointments" style={{ ...styles.section, backgroundColor: '#f8f9fa', textAlign: 'center' as 'center' }}>
        <h2 style={{ fontSize: '36px', color: '#003B5C' }}>Ready to Get Started?</h2>
        <p style={{ maxWidth: '600px', margin: '20px auto', fontSize: '18px', color: '#555' }}>
          Whether you need a routine check-up or specialized care, 
          booking an appointment is easy and convenient.
        </p>
        <button style={styles.primaryBtn} onClick={() => alert('Redirecting to Appointment Scheduler...')}>
          BOOK ONLINE NOW
        </button>
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px' }}>
          <div>
            <h4 style={{ fontSize: '18px', borderBottom: '1px solid #005587', paddingBottom: '10px' }}>CONTACT US</h4>
            <p>10833 Le Conte Ave<br />Claremont, CA 91711</p>
            <p>Main: (310) 555-0100</p>
          </div>
          <div>
            <h4 style={{ fontSize: '18px', borderBottom: '1px solid #005587', paddingBottom: '10px' }}>QUICK LINKS</h4>
            <p style={{ cursor: 'pointer' }}>For Medical Professionals</p>
            <p style={{ cursor: 'pointer' }}>Insurance Accepted</p>
            <p style={{ cursor: 'pointer' }}>Patient Rights</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={styles.logo}><span style={{ color: '#ffffff' }}>UNIVERSITY HEALTH</span></div>
            <p style={{ marginTop: '20px', fontSize: '12px', opacity: 0.6 }}>&copy; 2026 University Health System. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default UniversityHealth;