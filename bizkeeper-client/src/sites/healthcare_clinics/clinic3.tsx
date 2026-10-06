import React from 'react';

/**
 * Industry: Integrated Health Network (Inspired by Sutter Health)
 * Template Name: CommunityHealthNetwork
 * Structure: User-centric utility layout with a "Find, Log In, Pay" focus, 
 * clean iconography, and a community-forward messaging style.
 */

const CommunityHealthNetwork: React.FC = () => {
  
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
      borderBottom: '1px solid #e2e2e2'
    },
    topBar: {
      backgroundColor: '#007079', // Teal primary
      color: '#ffffff',
      padding: '8px 5%',
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: '13px',
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
      fontWeight: '600',
      color: '#333',
      cursor: 'pointer'
    },
    logo: {
      fontSize: '26px',
      fontWeight: '800',
      color: '#007079',
      letterSpacing: '-1px'
    },
    hero: {
      height: '55vh',
      width: '100%',
      backgroundColor: '#f4f7f7',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      backgroundImage: 'url("https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1920")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      padding: '0 8%'
    },
    heroCard: {
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      padding: '40px',
      maxWidth: '500px',
      borderRadius: '4px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
    },
    primaryBtn: {
      padding: '14px 28px',
      backgroundColor: '#007079',
      color: '#ffffff',
      border: 'none',
      fontSize: '15px',
      fontWeight: '700',
      cursor: 'pointer',
      borderRadius: '4px',
      marginTop: '20px'
    },
    utilityGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '20px',
      padding: '40px 8%',
      backgroundColor: '#ffffff'
    },
    utilityItem: {
      textAlign: 'center' as 'center',
      padding: '20px',
      cursor: 'pointer',
      transition: 'background 0.2s',
      borderRadius: '8px'
    },
    section: {
      padding: '80px 8%',
      backgroundColor: '#fff'
    },
    footer: {
      backgroundColor: '#333',
      color: '#fff',
      padding: '60px 8%',
      fontSize: '14px'
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', color: '#333', margin: 0 }}>
      
      {/* NAVIGATION */}
      <nav style={styles.nav}>
        <div style={styles.topBar}>
          <span>For Patients & Visitors</span>
          <div style={{ display: 'flex', gap: '20px' }}>
            <span>Español</span>
            <span>Contact Us</span>
            <span>Sign In</span>
          </div>
        </div>
        <div style={styles.navMain}>
          <div style={styles.logo} onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            COMMUNITY <span style={{ fontWeight: '300' }}>HEALTH</span>
          </div>
          <div style={styles.navLinks}>
            <span onClick={() => scrollToSection('find-care')}>FIND CARE</span>
            <span onClick={() => scrollToSection('services')}>SERVICES</span>
            <span onClick={() => scrollToSection('health-info')}>HEALTH INFO</span>
          </div>
          <button 
            style={{ ...styles.primaryBtn, marginTop: 0, padding: '10px 20px', fontSize: '13px' }}
            onClick={() => scrollToSection('billing')}
          >
            PAY A BILL
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header style={styles.hero}>
        <div style={styles.heroCard}>
          <h1 style={{ fontSize: '38px', color: '#007079', margin: '0 0 15px 0' }}>It's a new day for your health.</h1>
          <p style={{ fontSize: '16px', lineHeight: '1.5', color: '#555' }}>
            Get the care you need, when and where you need it. From primary care to 
            complex surgery, our network is here for you.
          </p>
          <button style={styles.primaryBtn} onClick={() => scrollToSection('find-care')}>
            FIND A DOCTOR
          </button>
        </div>
      </header>

      {/* UTILITY ACCESS */}
      <div style={styles.utilityGrid}>
        <div style={styles.utilityItem} onClick={() => scrollToSection('find-care')}>
          <div style={{ fontSize: '32px', marginBottom: '10px' }}>🔍</div>
          <h4 style={{ color: '#007079' }}>Find a Doctor</h4>
        </div>
        <div style={styles.utilityItem}>
          <div style={{ fontSize: '32px', marginBottom: '10px' }}>📍</div>
          <h4 style={{ color: '#007079' }}>Locations</h4>
        </div>
        <div style={styles.utilityItem}>
          <div style={{ fontSize: '32px', marginBottom: '10px' }}>💳</div>
          <h4 style={{ color: '#007079' }}>Pay a Bill</h4>
        </div>
        <div style={styles.utilityItem}>
          <div style={{ fontSize: '32px', marginBottom: '10px' }}>📄</div>
          <h4 style={{ color: '#007079' }}>Test Results</h4>
        </div>
      </div>

      {/* SERVICES SECTION */}
      <section id="services" style={styles.section}>
        <h2 style={{ fontSize: '28px', color: '#007079', marginBottom: '30px' }}>Comprehensive Medical Services</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          {['Primary Care', 'Urgent Care', 'Women’s Health', 'Cancer Care', 'Heart & Vascular', 'Orthopedics'].map((service, i) => (
            <div key={i} style={{ padding: '20px', border: '1px solid #eee', cursor: 'pointer' }}>
              <h4 style={{ margin: 0, color: '#007079' }}>{service} →</h4>
            </div>
          ))}
        </div>
      </section>

      {/* BILLING / PORTAL SECTION */}
      <section id="billing" style={{ ...styles.section, backgroundColor: '#f4f7f7' }}>
        <div style={{ display: 'flex', gap: '50px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: '1', minWidth: '300px' }}>
            <h2 style={{ fontSize: '32px', color: '#007079' }}>Manage Your Care Online</h2>
            <p style={{ margin: '20px 0', lineHeight: '1.6' }}>
              With our patient portal, you can message your doctor, schedule appointments, 
              view your medical records, and pay your bills securely from any device.
            </p>
            <button style={styles.primaryBtn}>LOG IN TO PORTAL</button>
          </div>
          <div style={{ flex: '1', height: '300px', backgroundColor: '#ddd', borderRadius: '8px', backgroundImage: 'url("https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600")', backgroundSize: 'cover' }}></div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '40px' }}>
          <div>
            <h4 style={{ color: '#007079', marginBottom: '20px' }}>NETWORK</h4>
            <p>About Community Health</p>
            <p>Community Engagement</p>
            <p>Newsroom</p>
          </div>
          <div>
            <h4 style={{ color: '#007079', marginBottom: '20px' }}>CAREERS</h4>
            <p>Job Search</p>
            <p>Physician Recruitment</p>
            <p>Nursing at Community</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={styles.logo}><span style={{ color: '#fff' }}>COMMUNITY HEALTH</span></div>
            <p style={{ marginTop: '20px', opacity: 0.6 }}>&copy; 2026 Community Health Network. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CommunityHealthNetwork;