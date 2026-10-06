import React from 'react';
import {
  Box,
  Typography,
  Container,
  Button,
  TextField,
  Avatar,
  IconButton,
} from '@mui/material';
import {
  Phone,
  Email,
  LocationOn,
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  CheckCircle,
} from '@mui/icons-material';
import Navbar from '../layout/Navbar';
import { images } from '../assets';

const Home: React.FC = () => {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      profession: 'Food Critic',
      text: 'Exceptional dining experience with outstanding service and delicious food.',
      image: images.testimonial1,
    },
    {
      name: 'Mike Chen',
      profession: 'Regular Customer',
      text: "The best restaurant in town! I come here every week for their amazing dishes.",
      image: images.testimonial2,
    },
    {
      name: 'Emily Davis',
      profession: 'Chef',
      text: 'Incredible attention to detail and flavors that dance on your palate.',
      image: images.testimonial3,
    },
    {
      name: 'David Wilson',
      profession: 'Food Blogger',
      text: 'A culinary masterpiece that never fails to impress. Highly recommended!',
      image: images.testimonial4,
    },
  ];

  return (
    <Box sx={{ flexGrow: 1, backgroundColor: '#FFFBF2' }}>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@200;400&family=Roboto:wght@400;500;700&display=swap');
          
          .demo-cafe-hero {
            background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.5)), 
                        url('https://images.unsplash.com/photo-1461023058943-07fcbe16d735?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'),
                        linear-gradient(135deg, #8B4513 0%, #A0522D 50%, #CD853F 100%);
            background-size: cover;
            background-position: center;
            background-attachment: fixed;
            color: white;
            padding: 80px 0 60px;
            text-align: center;
            position: relative;
            overflow: hidden;
            min-height: 600px;
            display: flex;
            align-items: center;
          }
          
          .demo-cafe-hero::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
            animation: float 20s ease-in-out infinite;
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          
          .demo-cafe-hero-content {
            position: relative;
            z-index: 2;
          }
          
          .demo-cafe-section-title {
            text-align: center;
            margin-bottom: 60px;
          }
          
          .demo-cafe-section-subtitle {
            color: #DA9F5B;
            font-family: 'Montserrat', sans-serif;
            font-size: 1.1rem;
            font-weight: 600;
            letter-spacing: 5px;
            text-transform: uppercase;
            margin-bottom: 15px;
          }
          
          .demo-cafe-section-main-title {
            font-family: 'Roboto', sans-serif;
            font-size: 3rem;
            font-weight: 700;
            color: #33211D;
            margin-bottom: 20px;
          }
          
          .demo-cafe-testimonial-card {
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            text-align: center;
            margin: 20px;
          }
          
          .demo-cafe-footer {
            background: linear-gradient(135deg, #33211D 0%, #2A1B17 100%);
            color: white;
            padding: 60px 0 20px;
          }
          
          .demo-cafe-footer-title {
            color: white;
            font-family: 'Montserrat', sans-serif;
            font-size: 1.3rem;
            font-weight: 600;
            letter-spacing: 3px;
            text-transform: uppercase;
            margin-bottom: 30px;
          }
          
          .demo-cafe-btn-primary {
            background: #DA9F5B;
            color: white;
            border: none;
            padding: 12px 30px;
            border-radius: 5px;
            font-weight: 600;
            transition: all 0.3s ease;
          }
          
          .demo-cafe-btn-primary:hover {
            background: #be792b;
            transform: translateY(-2px);
          }
          
          .demo-cafe-btn-secondary {
            background: transparent;
            color: #DA9F5B;
            border: 2px solid #DA9F5B;
            padding: 10px 28px;
            border-radius: 5px;
            font-weight: 600;
            transition: all 0.3s ease;
          }
          
          .demo-cafe-btn-secondary:hover {
            background: #DA9F5B;
            color: white;
          }
          
          .demo-cafe-offer-section {
            background: linear-gradient(rgba(51, 33, 29, 0.9), rgba(51, 33, 29, 0.9)), 
                        url(${images.bg});
            background-size: cover;
            background-position: center;
            color: white;
            text-align: center;
            padding: 80px 0;
            margin: 80px 0;
          }
        `}
      </style>

      <Navbar currentPage="home" />

      {/* Hero Section */}
      <Box id="home" className="demo-cafe-hero">
        <Container maxWidth="lg">
          <Box className="demo-cafe-hero-content">
            <Typography variant="h4" sx={{ color: '#DA9F5B', fontWeight: 500, mb: 2 }}>
              Step into our cozy corner
            </Typography>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '3rem', md: '5rem' },
                fontWeight: 700,
                mb: 2,
                fontFamily: 'serif',
                textShadow: '3px 3px 6px rgba(0,0,0,0.4)',
                lineHeight: 1.2,
              }}
            >
              DIGITALCAFE
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 500 }}>
              Where coffee meets comfort
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* About Section */}
      <Container id="about" maxWidth="lg" sx={{ py: 8 }}>
        <Box className="demo-cafe-section-title">
          <Typography className="demo-cafe-section-subtitle">About Us</Typography>
          <Typography className="demo-cafe-section-main-title">Serving Since 1995</Typography>
        </Box>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          <Box sx={{ flex: '1 1 300px', minWidth: 300 }}>
            <Typography variant="h3" sx={{ mb: 3, color: '#33211D', fontWeight: 700 }}>
              Our Story
            </Typography>
            <Typography variant="h6" sx={{ mb: 3, color: '#555', fontWeight: 500 }}>
              Creating memorable dining experiences with passion and excellence
            </Typography>
            <Typography sx={{ mb: 3, color: '#666', lineHeight: 1.8 }}>
              For over two decades, we've been dedicated to serving exceptional cuisine in a warm,
              welcoming atmosphere. Our commitment to quality ingredients and outstanding service
              has made us a beloved destination for food lovers.
            </Typography>
            <Button className="demo-cafe-btn-secondary">Learn More</Button>
          </Box>

          <Box sx={{ flex: '1 1 300px', minWidth: 300 }}>
            <Box sx={{ minHeight: 400, position: 'relative' }}>
              <img
                src={images.about}
                alt="About us"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '10px',
                }}
              />
            </Box>
          </Box>

          <Box sx={{ flex: '1 1 300px', minWidth: 300 }}>
            <Typography variant="h3" sx={{ mb: 3, color: '#33211D', fontWeight: 700 }}>
              Our Vision
            </Typography>
            <Typography sx={{ mb: 3, color: '#666', lineHeight: 1.8 }}>
              To be the premier dining destination where exceptional food meets outstanding service,
              creating unforgettable experiences for every guest who walks through our doors.
            </Typography>
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <CheckCircle sx={{ color: '#DA9F5B', mr: 2 }} />
                <Typography sx={{ color: '#555', fontWeight: 500 }}>
                  Fresh, locally sourced ingredients
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <CheckCircle sx={{ color: '#DA9F5B', mr: 2 }} />
                <Typography sx={{ color: '#555', fontWeight: 500 }}>
                  Award-winning culinary team
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <CheckCircle sx={{ color: '#DA9F5B', mr: 2 }} />
                <Typography sx={{ color: '#555', fontWeight: 500 }}>
                  Exceptional customer service
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button className="demo-cafe-btn-primary">Learn More</Button>
              <Button
                className="demo-cafe-btn-secondary"
                onClick={() => (window.location.href = '/digitalcafe/menu')}
              >
                View Full Menu
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>

      {/* Special Offer Section */}
      <Box className="demo-cafe-offer-section">
        <Container maxWidth="md">
          <Typography variant="h1" sx={{ fontSize: '4rem', color: '#DA9F5B', mb: 2 }}>
            30% OFF
          </Typography>
          <Typography variant="h3" sx={{ mb: 3, fontWeight: 600 }}>
            Weekend Special Offer
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Only for weekends from 1st Jan to 31st Dec 2025
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <TextField
              placeholder="Your Email"
              variant="outlined"
              sx={{
                backgroundColor: 'white',
                borderRadius: '5px',
                '& .MuiOutlinedInput-root': {
                  height: '60px',
                  '& fieldset': {
                    border: 'none',
                  },
                },
              }}
            />
            <Button className="demo-cafe-btn-primary" sx={{ height: '60px', px: 4 }}>
              Sign Up
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Container id="testimonials" maxWidth="lg" sx={{ py: 8 }}>
        <Box className="demo-cafe-section-title">
          <Typography className="demo-cafe-section-subtitle">Testimonial</Typography>
          <Typography className="demo-cafe-section-main-title">Our Clients Say</Typography>
        </Box>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {testimonials.map((testimonial, index) => (
            <Box key={index} sx={{ flex: '1 1 400px', minWidth: 300 }}>
              <Box className="demo-cafe-testimonial-card">
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Avatar src={testimonial.image} sx={{ width: 60, height: 60, mr: 3 }} />
                  <Box>
                    <Typography variant="h6" sx={{ color: '#33211D', fontWeight: 600 }}>
                      {testimonial.name}
                    </Typography>
                    <Typography sx={{ color: '#DA9F5B', fontStyle: 'italic' }}>
                      {testimonial.profession}
                    </Typography>
                  </Box>
                </Box>
                <Typography sx={{ color: '#666', lineHeight: 1.6, fontStyle: 'italic' }}>
                  "{testimonial.text}"
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>

      {/* Footer */}
      <Box id="contact" className="demo-cafe-footer">
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            <Box sx={{ flex: '1 1 250px', minWidth: 250 }}>
              <Typography className="demo-cafe-footer-title">Get In Touch</Typography>
              <Box sx={{ color: 'white', '& > *': { mb: 2 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <LocationOn sx={{ mr: 2, color: '#DA9F5B' }} />
                  <Typography>123 Restaurant St, Food City, FC 12345</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Phone sx={{ mr: 2, color: '#DA9F5B' }} />
                  <Typography>+1 (555) 123-4567</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Email sx={{ mr: 2, color: '#DA9F5B' }} />
                  <Typography>info@bizkeeperrestaurant.com</Typography>
                </Box>
              </Box>
            </Box>

            <Box sx={{ flex: '1 1 250px', minWidth: 250 }}>
              <Typography className="demo-cafe-footer-title">Follow Us</Typography>
              <Typography sx={{ mb: 3, opacity: 0.9 }}>
                Stay connected with us on social media for the latest updates and special offers.
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <IconButton
                  sx={{
                    color: 'white',
                    border: '1px solid white',
                    '&:hover': { color: '#DA9F5B', borderColor: '#DA9F5B' },
                  }}
                >
                  <Facebook />
                </IconButton>
                <IconButton
                  sx={{
                    color: 'white',
                    border: '1px solid white',
                    '&:hover': { color: '#DA9F5B', borderColor: '#DA9F5B' },
                  }}
                >
                  <Twitter />
                </IconButton>
                <IconButton
                  sx={{
                    color: 'white',
                    border: '1px solid white',
                    '&:hover': { color: '#DA9F5B', borderColor: '#DA9F5B' },
                  }}
                >
                  <Instagram />
                </IconButton>
                <IconButton
                  sx={{
                    color: 'white',
                    border: '1px solid white',
                    '&:hover': { color: '#DA9F5B', borderColor: '#DA9F5B' },
                  }}
                >
                  <LinkedIn />
                </IconButton>
              </Box>
            </Box>

            <Box sx={{ flex: '1 1 250px', minWidth: 250 }}>
              <Typography className="demo-cafe-footer-title">Open Hours</Typography>
              <Box sx={{ color: 'white' }}>
                <Box sx={{ mb: 2 }}>
                  <Typography sx={{ fontWeight: 600, textTransform: 'uppercase', mb: 1 }}>
                    Monday - Friday
                  </Typography>
                  <Typography>11:00 AM - 10:00 PM</Typography>
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: 600, textTransform: 'uppercase', mb: 1 }}>
                    Saturday - Sunday
                  </Typography>
                  <Typography>10:00 AM - 11:00 PM</Typography>
                </Box>
              </Box>
            </Box>

            <Box sx={{ flex: '1 1 250px', minWidth: 250 }}>
              <Typography className="demo-cafe-footer-title">Newsletter</Typography>
              <Typography sx={{ mb: 3, opacity: 0.9 }}>
                Subscribe to our newsletter for exclusive offers and updates.
              </Typography>
              <Box sx={{ display: 'flex' }}>
                <TextField
                  placeholder="Your Email"
                  size="small"
                  sx={{
                    backgroundColor: 'white',
                    borderRadius: '5px 0 0 5px',
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        border: 'none',
                      },
                    },
                  }}
                />
                <Button
                  className="demo-cafe-btn-primary"
                  sx={{
                    borderRadius: '0 5px 5px 0',
                    px: 3,
                    minWidth: 'auto',
                  }}
                >
                  Sign Up
                </Button>
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              textAlign: 'center',
              pt: 4,
              mt: 4,
              borderTop: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <Typography sx={{ opacity: 0.8 }}>
              © 2025 BizKeeper Restaurant. All Rights Reserved. | Designed with ❤️ for exceptional
              dining experiences.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;

