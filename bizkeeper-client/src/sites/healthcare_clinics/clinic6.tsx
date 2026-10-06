import React from 'react';

/**
 * Industry: Oral & Maxillofacial Surgery / Specialized Dental (Inspired by Staten Island Oral Surgery)
 * Template Name: SpecialtyOralSurgery
 * Structure: High-contrast, accessibility-focused design. Features a "Urgent Care" 
 * callout, professional surgeon credentials, and a simplified sidebar-style navigation 
 * feel within a modern header.
 */

const SpecialtyOralSurgery: React.FC = () => {
  
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
      borderBottom: '2px solid #002D62'
    },
    navTop: {
      backgroundColor: '#002D62', // Deep Navy
      color: '#ffffff',
      padding: '10px 5%',
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: '14px',
      fontWeight: '600'
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
      color: '#002D62',
      cursor: 'pointer',
      textTransform: 'uppercase' as 'uppercase'
    },
    logo: {
      fontSize: '22px',
      fontWeight: '900',
      color: '#002D62',
      lineHeight: '1.1'
    },
    hero: {
      height: '65vh',
      width: '100%',
      backgroundColor: '#f8f9fa',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      backgroundImage: 'linear-gradient(to right, rgba(255,255,255,1) 40%, rgba(255,255,255,0) 100%), url("https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1920")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      padding: '0 8%'
    },
    heroContent: {
      maxWidth: '500px'
    },
    primaryBtn: {
      padding: '16px 32px',
      backgroundColor: '#002D62',
      color: '#ffffff',
      border: 'none',
      fontSize: '15px',
      fontWeight: '700',
      cursor: 'pointer',
      borderRadius: '0px', // Traditional sharp edges
      marginTop: '25px',
      transition: 'background-color 0.3s'
    },
    emergencyStrip: {
      backgroundColor: '#B22222', // Alert Red
      color: '#fff',
      padding: '15px',
      textAlign: 'center' as 'center',
      fontWeight: '700',
      fontSize: '18px'
    },
    section: {
      padding: '80px 10%',
      backgroundColor: '#fff'
    },
    procedureGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '30px',
      marginTop: '40px'
    },
    procedureCard: {
      padding: '25px',
      border: '1px solid #e0e0e0',
      borderLeft: '5px solid #002D62',
      transition: 'transform 0.2s',
      cursor: 'pointer'
    },
    footer: {
      backgroundColor: '#001a35',
      color: '#ffffff',
      padding: '60px 10%',
      fontSize: '14px'
    }
  };

  return (
    <div style={{ fontFamily: '"Roboto", Arial, sans-serif', color: '#333', margin: 0 }}>
      
      {/* NAVIGATION */}
      <nav style={styles.nav}>
        <div style={styles.navTop}>
          <span>CALL TODAY: (718) 555-0199</span>
          <span>REFERRING DOCTORS PORTAL</span>
        </div>
        <div style={styles.navMain}>
          <div style={styles.logo} onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            SPECIALTY ORAL <br /> <span style={{ fontWeight: '300' }}>& MAXILLOFACIAL</span>
          </div>
          <div style={styles.navLinks}>
            <span onClick={() => scrollToSection('about')}>OUR SURGEONS</span>
            <span onClick={() => scrollToSection('procedures')}>PROCEDURES</span>
            <span onClick={() => scrollToSection('patients')}>PATIENT INFO</span>
            <span onClick={() => scrollToSection('location')}>CONTACT</span>
          </div>
          <button 
            style={{ ...styles.primaryBtn, marginTop: 0, padding: '10px 20px', fontSize: '13px' }}
            onClick={() => scrollToSection('appointment')}
          >
            REQUEST CONSULTATION
          </button>
        </div>
      </nav>

      <div style={styles.emergencyStrip}>
        DENTAL EMERGENCY? CONTACT OUR OFFICE IMMEDIATELY.
      </div>

      {/* HERO SECTION */}
      <header style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={{ fontSize: '42px', fontWeight: '900', color: '#002D62', lineHeight: '1.2', margin: '0 0 20px 0' }}>
            Board-Certified <br /> Surgical Excellence.
          </h1>
          <p style={{ fontSize: '18px', color: '#555', lineHeight: '1.6' }}>
            Providing advanced surgical care for the mouth, teeth, and jaws. 
            From dental implants to wisdom teeth removal, your comfort and 
            safety are our highest priorities.
          </p>
          <button style={styles.primaryBtn} onClick={() => scrollToSection('procedures')}>
            VIEW OUR SERVICES
          </button>
        </div>
      </header>

      {/* PROCEDURES SECTION */}
      <section id="procedures" style={styles.section}>
        <h2 style={{ fontSize: '32px', color: '#002D62', textAlign: 'center' }}>Surgical Procedures</h2>
        <div style={styles.procedureGrid}>
          {[
            { title: 'Dental Implants', desc: 'The gold standard for tooth replacement.' },
            { title: 'Wisdom Teeth', desc: 'Safe removal with advanced sedation options.' },
            { title: 'Jaw Surgery', desc: 'Corrective procedures for functional improvement.' },
            { title: 'Bone Grafting', desc: 'Preparing the foundation for permanent implants.' },
            { title: 'Facial Trauma', desc: 'Expert care for complex maxillofacial injuries.' },
            { title: 'Sleep Apnea', desc: 'Surgical solutions for obstructive sleep disorders.' }
          ].map((item, i) => (
            <div key={i} style={styles.procedureCard}>
              <h3 style={{ fontSize: '20px', color: '#002D62', marginBottom: '10px' }}>{item.title}</h3>
              <p style={{ fontSize: '15px', color: '#666', lineHeight: '1.4' }}>{item.desc}</p>
              <div style={{ marginTop: '15px', fontWeight: '700', fontSize: '12px', color: '#B22222' }}>LEARN MORE →</div>
            </div>
          ))}
        </div>
      </section>

      {/* SURGEON PROFILE SECTION */}
      <section id="about" style={{ ...styles.section, backgroundColor: '#f8f9fa' }}>
        <div style={{ display: 'flex', gap: '60px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: '1', height: '450px', backgroundColor: '#ddd', backgroundImage: 'url("https://images.unsplash.com/photo-1559839734-2b71f1536783?w=800")', backgroundSize: 'cover', backgroundPosition: 'top' }}></div>
          <div style={{ flex: '1', minWidth: '300px' }}>
            <h2 style={{ fontSize: '36px', color: '#002D62' }}>Meet Our Surgeons</h2>
            <p style={{ margin: '20px 0', lineHeight: '1.8' }}>
              Our board-certified surgeons bring decades of hospital-based surgical 
              residency training and clinical experience. We utilize the latest 
              3D imaging technology to ensure precise diagnostics and predictable 
              outcomes for every patient.
            </p>
            <button style={{ ...styles.primaryBtn, backgroundColor: 'transparent', color: '#002D62', border: '2px solid #002D62' }}>
              READ BIO & CREDENTIALS
            </button>
          </div>
        </div>
      </section>

      {/* CONTACT / LOCATION SECTION */}
      <section id="location" style={styles.section}>
        <div style={{ textAlign: 'center' as 'center', maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '32px', color: '#002D62' }}>Modern Care in the Village</h2>
          <p style={{ margin: '20px 0' }}>Visit our state-of-the-art surgical facility equipped with the latest in anesthesia and sterilization technology.</p>
          <div style={{ padding: '30px', backgroundColor: '#f0f4f8', borderRadius: '4px', border: '1px solid #d1d9e6' }}>
            <h4 style={{ margin: '0 0 10px 0' }}>Office Hours</h4>
            <p>Mon - Fri: 8:00 AM - 5:00 PM</p>
            <p>Sat: By Appointment Only</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px' }}>
          <div>
            <h4 style={{ fontSize: '16px', color: '#fff', marginBottom: '20px' }}>OFFICE LOCATION</h4>
            <p>123 Surgical Parkway<br />Claremont, CA 91711</p>
            <p style={{ marginTop: '10px' }}>P: (718) 555-0199</p>
          </div>
          <div>
            <h4 style={{ fontSize: '16px', color: '#fff', marginBottom: '20px' }}>PATIENT RESOURCES</h4>
            <p style={{ cursor: 'pointer', marginBottom: '10px' }}>Insurance & Financing</p>
            <p style={{ cursor: 'pointer', marginBottom: '10px' }}>Pre-Op Instructions</p>
            <p style={{ cursor: 'pointer', marginBottom: '10px' }}>Post-Op Care</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={styles.logo}><span style={{ color: '#ffffff' }}>SPECIALTY ORAL SURGERY</span></div>
            <p style={{ marginTop: '20px', fontSize: '12px', opacity: 0.5 }}>&copy; 2026 Board-Certified Oral & Maxillofacial Surgeons.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SpecialtyOralSurgery;