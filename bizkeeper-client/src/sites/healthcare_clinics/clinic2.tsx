import React from 'react';

/**
 * Industry: Specialized Healthcare / Tertiary Care (Inspired by Mayo Clinic)
 * Template Name: ClinicalExcellence
 * Structure: Search-centric header, clear path-based navigation (Care, Research, Education), 
 * and high-authority trust signals with a clean, medical-white and deep-blue palette.
 */

const ClinicalExcellence: React.FC = () => {
  
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
      borderBottom: '1px solid #e2e8f0'
    },
    navTop: {
      backgroundColor: '#f8fafc',
      padding: '10px 8%',
      display: 'flex',
      justifyContent: 'flex-end',
      fontSize: '12px',
      gap: '20px',
      color: '#64748b',
      fontWeight: '500'
    },
    navMain: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px 8%',
    },
    navLinks: {
      display: 'flex',
      gap: '35px',
      fontSize: '15px',
      fontWeight: '700',
      color: '#1e293b',
      cursor: 'pointer'
    },
    logo: {
      fontSize: '26px',
      fontWeight: '800',
      color: '#00467f', // Mayo Deep Blue
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      cursor: 'pointer'
    },
    hero: {
      backgroundColor: '#00467f',
      padding: '80px 8%',
      color: '#ffffff',
      textAlign: 'center' as 'center',
      backgroundImage: 'linear-gradient(rgba(0, 70, 127, 0.8), rgba(0, 70, 127, 0.8)), url("https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1920")',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    },
    searchBar: {
      maxWidth: '700px',
      margin: '40px auto 0 auto',
      display: 'flex',
      backgroundColor: '#ffffff',
      borderRadius: '4px',
      overflow: 'hidden',
      padding: '4px'
    },
    searchInput: {
      flex: 1,
      padding: '16px',
      border: 'none',
      outline: 'none',
      fontSize: '16px'
    },
    primaryBtn: {
      padding: '14px 28px',
      backgroundColor: '#0071bc',
      color: '#ffffff',
      border: 'none',
      fontSize: '15px',
      fontWeight: '700',
      cursor: 'pointer',
      borderRadius: '4px',
      transition: 'background-color 0.2s'
    },
    section: {
      padding: '80px 8%',
      backgroundColor: '#ffffff'
    },
    actionGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '2px',
      backgroundColor: '#e2e8f0',
      marginTop: '-40px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
    },
    actionCard: {
      backgroundColor: '#ffffff',
      padding: '40px',
      textAlign: 'center' as 'center',
      cursor: 'pointer'
    },
    footer: {
      backgroundColor: '#f8fafc',
      padding: '80px 8%',
      borderTop: '1px solid #e2e8f0'
    }
  };

  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', color: '#1e293b', margin: 0 }}>
      
      {/* NAVIGATION */}
      <nav style={styles.nav}>
        <div style={styles.navTop}>
          <span>Patient Online Services</span>
          <span>Log in to Patient Account</span>
          <span>English</span>
        </div>
        <div style={styles.navMain}>
          <div style={styles.logo} onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div style={{ width: '30px', height: '30px', backgroundColor: '#00467f', borderRadius: '50%' }}></div>
            CLINICAL EXCELLENCE
          </div>
          <div style={styles.navLinks}>
            <span onClick={() => scrollToSection('care')}>CARE AT CLINICAL</span>
            <span onClick={() => scrollToSection('health-info')}>HEALTH INFORMATION</span>
            <span onClick={() => scrollToSection('research')}>RESEARCH & EDUCATION</span>
          </div>
          <button 
            style={{ ...styles.primaryBtn, padding: '10px 20px', fontSize: '13px' }}
            onClick={() => scrollToSection('request')}
          >
            REQUEST APPOINTMENT
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header style={styles.hero}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '48px', fontWeight: '800', marginBottom: '16px' }}>
            Empowering Health through Expertise.
          </h1>
          <p style={{ fontSize: '20px', opacity: 0.9 }}>
            Search thousands of health topics, symptoms, and medical conditions 
            backed by world-leading clinical research.
          </p>
          <div style={styles.searchBar}>
            <input 
              style={styles.searchInput} 
              type="text" 
              placeholder="Search diseases, symptoms, tests..." 
            />
            <button style={styles.primaryBtn}>SEARCH</button>
          </div>
        </div>
      </header>

      {/* QUICK ACTIONS */}
      <div style={styles.actionGrid}>
        <div style={styles.actionCard} onClick={() => scrollToSection('request')}>
          <div style={{ fontSize: '32px', marginBottom: '16px' }}>📅</div>
          <h3 style={{ color: '#00467f', marginBottom: '8px' }}>Request Appointment</h3>
          <p style={{ fontSize: '14px', color: '#64748b' }}>Consult with our world-class specialists.</p>
        </div>
        <div style={styles.actionCard}>
          <div style={{ fontSize: '32px', marginBottom: '16px' }}>🩺</div>
          <h3 style={{ color: '#00467f', marginBottom: '8px' }}>Find a Doctor</h3>
          <p style={{ fontSize: '14px', color: '#64748b' }}>Explore our network of medical experts.</p>
        </div>
        <div style={styles.actionCard}>
          <div style={{ fontSize: '32px', marginBottom: '16px' }}>🧪</div>
          <h3 style={{ color: '#00467f', marginBottom: '8px' }}>Tests & Procedures</h3>
          <p style={{ fontSize: '14px', color: '#64748b' }}>Learn about clinical options and prep.</p>
        </div>
      </div>

      {/* HEALTH INFORMATION SECTION */}
      <section id="health-info" style={styles.section}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '32px', color: '#00467f' }}>Diseases & Conditions</h2>
          <span style={{ color: '#0071bc', fontWeight: 'bold', cursor: 'pointer' }}>SEE ALL A-Z →</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
          {['Heart Disease', 'Diabetes', 'Cancer', 'Neurological Disorders', 'Infectious Diseases', 'Bone & Joint Health'].map((topic, i) => (
            <div key={i} style={{ padding: '24px', backgroundColor: '#f1f5f9', borderRadius: '4px', fontWeight: '600', cursor: 'pointer' }}>
              {topic}
            </div>
          ))}
        </div>
      </section>

      {/* RESEARCH/EDUCATION CALLOUT */}
      <section id="research" style={{ ...styles.section, backgroundColor: '#00467f', color: '#ffffff' }}>
        <div style={{ display: 'flex', gap: '60px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: '1', minWidth: '350px' }}>
            <h2 style={{ fontSize: '36px', marginBottom: '24px' }}>Advancing Medicine for Everyone.</h2>
            <p style={{ fontSize: '18px', lineHeight: '1.7', opacity: 0.9 }}>
              Our clinical trials and research initiatives are defining the future of healthcare. 
              We translate laboratory breakthroughs into life-changing treatments faster 
              to provide hope for our patients.
            </p>
            <button style={{ ...styles.primaryBtn, backgroundColor: '#ffffff', color: '#00467f', marginTop: '32px' }}>
              EXPLORE OUR RESEARCH
            </button>
          </div>
          <div style={{ flex: '1', minWidth: '350px', height: '400px', backgroundColor: '#00335c', borderRadius: '8px', backgroundImage: 'url("https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800")', backgroundSize: 'cover' }}></div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', marginBottom: '60px' }}>
          <div>
            <h4 style={{ color: '#00467f', marginBottom: '20px' }}>CARE LOCATIONS</h4>
            <p style={{ fontSize: '14px', marginBottom: '10px' }}>Claremont, CA</p>
            <p style={{ fontSize: '14px', marginBottom: '10px' }}>Phoenix, AZ</p>
            <p style={{ fontSize: '14px', marginBottom: '10px' }}>Rochester, MN</p>
          </div>
          <div>
            <h4 style={{ color: '#00467f', marginBottom: '20px' }}>FOR PROFESSIONALS</h4>
            <p style={{ fontSize: '14px', marginBottom: '10px' }}>Medical Referrals</p>
            <p style={{ fontSize: '14px', marginBottom: '10px' }}>Clinical Trials</p>
            <p style={{ fontSize: '14px', marginBottom: '10px' }}>Continuing Education</p>
          </div>
          <div>
            <h4 style={{ color: '#00467f', marginBottom: '20px' }}>COMPANY</h4>
            <p style={{ fontSize: '14px', marginBottom: '10px' }}>About Clinical Excellence</p>
            <p style={{ fontSize: '14px', marginBottom: '10px' }}>News & Media</p>
            <p style={{ fontSize: '14px', marginBottom: '10px' }}>Contact Us</p>
          </div>
        </div>
        <div style={{ textAlign: 'center', fontSize: '12px', color: '#94a3b8', borderTop: '1px solid #e2e8f0', paddingTop: '30px' }}>
          <p>&copy; 2026 Clinical Excellence Health System. A non-profit organization.</p>
          <p style={{ marginTop: '10px' }}>Privacy Policy | Terms of Use | Accessibility Statement</p>
        </div>
      </footer>
    </div>
  );
};

export default ClinicalExcellence;