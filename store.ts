
import { useState, useEffect } from 'react';
import { SiteData, BlogPost, Testimonial, Service, SiteSettings, Project, Enquiry } from './types';

const STORAGE_KEY = 'ansh_real_estate_data_v5';

const DEFAULT_DATA: SiteData = {
  settings: {
    siteName: "Ansh Real Estate",
    ownerName: "Pravin Zuge",
    phone1: "9987404540",
    phone2: "9892264570",
    email: "pravinzuge81@gmail.com",
    address: "Shree Krushna App., Manjula Nivas, Sec.- R3, Plot No.-243, Shop No.-1, Kolhi, Tel. Panvel, Raigad - 410206",
    primaryColor: "#0f172a",
    heroTitle: "Trusted Real Estate Services in Panvel & Raigad",
    heroSubtitle: "Exclusive Sales & Consulting for Siddhivinayak Builders and Premium Raigad Developments.",
    aboutContent: "With years of experience in the local market, Ansh Real Estate has established itself as a beacon of trust and professionalism in Panvel and Raigad. We specialize in both residential and commercial sectors, offering end-to-end solutions for all your property needs.",
    mission: "To provide transparent, professional, and personalized real estate services that exceed client expectations.",
    vision: "To be the most preferred and trusted real estate partner in the Raigad district, fostering long-term relationships through integrity and excellence.",
    metaTitle: "Ansh Real Estate - Top Property Consultants in Panvel",
    metaDescription: "Ansh Real Estate offers premium property buying, selling, and consulting services in Panvel and Raigad.",
    autoReplyText: "Subject: Thank You for Contacting Ansh Real Estate\n\nDear Sir/Madam,\n\nThank you for reaching out to Ansh Real Estate. We have received your enquiry and appreciate your interest in our services.\n\nOur team will review your details and contact you shortly to assist you with your real estate requirements.\n\nIf your enquiry is urgent, feel free to call us at 9987404540 / 9892264570.\n\nWarm regards,\n\nPravin Zuge\nAnsh Real Estate\n📞 9987404540 / 9892264570\n✉️ pravinzuge81@gmail.com"
  },
  services: [
    { id: "1", title: "Property Buying Assistance", description: "Find your dream home with our curated list of properties and expert negotiation support.", icon: "Home" },
    { id: "2", title: "Property Selling Services", description: "Get the best market value for your property with our strategic marketing and extensive network.", icon: "TrendingUp" },
    { id: "3", title: "Rental & Leasing Services", description: "Hassle-free rental solutions for both tenants and owners, including agreement documentation.", icon: "Key" },
    { id: "4", title: "Commercial Consulting", description: "Strategic location analysis and consulting for retail, office, and industrial spaces.", icon: "Briefcase" }
  ],
  testimonials: [
    { id: "1", name: "Rahul Sharma", role: "Homeowner", content: "Pravin ji helped me find the perfect apartment in Panvel. His transparency and local knowledge are truly commendable.", rating: 5 }
  ],
  blogs: [
    { id: "1", title: "Why Panvel is the Next Real Estate Hub", excerpt: "Exploring the infrastructure developments and future growth potential of the Panvel property market.", content: "Panvel has seen exponential growth due to the upcoming Navi Mumbai International Airport and improved connectivity...", image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=800&q=80", date: "2024-03-20", category: "Market Trends", slug: "panvel-real-estate-hub" }
  ],
  projects: [
    { id: "p1", name: "Siddhivinayak Sapphire", location: "Panvel, Raigad", developer: "Siddhivinayak Builders", architect: "Internal", status: "Available", type: "Residential", image: "images/siddhivinayak-sapphire.jpg" },
    { id: "p2", name: "Siddhivinayak Hills", location: "Panvel, Raigad", developer: "Siddhivinayak Builders", architect: "Internal", status: "Available", type: "Residential", image: "images/siddhivinayak-hills.jpg" },
    { id: "p3", name: "Siddhivinayak Aarambh", location: "Plot 27, Sector 7, Pushpak", developer: "Riu Homes Pvt Ltd", architect: "Atul Patel", status: "Available", type: "Residential", image: "images/siddhivinayak-aarambh.jpg" },
    { id: "p4", name: "Siddhivinayak Harmony", location: "Plot 109, Sector 8, Pushpak Nagar Dapoli", developer: "Siddhivinayak Builders", architect: "Atul Patel", status: "Available", type: "Mixed Use", image: "images/siddhivinayak-harmony.jpg" },
    { id: "p5", name: "Om Sai Aangan", location: "Plot 59, Sector 8, Pushpak", developer: "Om Sai Group", architect: "Atul Patel", status: "Available", type: "Residential", image: "images/om-sai-aangan.jpg" },
    { id: "p6", name: "Siddhivinayak Solitaire", location: "Plot 76+77+78, Sector 8, Pushpak", developer: "Siddhivinayak Builders", architect: "Atul Patel", status: "Available", type: "Residential", image: "images/siddhivinayak-solitaire.jpg" },
    { id: "p7", name: "Dattu Maharaj Residency", location: "Plot 74, Sector 8, Pushpak Nagar Dapoli", developer: "Siddhivinayak Builders", architect: "Atul Patel", status: "Available", type: "Residential", image: "images/dattu-maharaj.jpg" },
    { id: "p8", name: "Siddhivinayak Ekdant", location: "Plot 24, Sector R5, Pushpak", developer: "Siddhivinayak Builders", architect: "Atul Patel", status: "Available", type: "Residential", image: "images/siddhivinayak-ekdant.jpg" },
    { id: "p9", name: "Rasika Residency", location: "Plot 18, Sector R5, Pushpak", developer: "Siddhivinayak Builders", architect: "Amit N. Patil", status: "Available", type: "Residential", image: "images/rasika-residency.jpg" },
    { id: "p10", name: "Siddhivinayak Sparsh", location: "Plot 80, Sector 8, Pushpak Nagar Dapoli", developer: "Siddhivinayak Builders", architect: "Atul Patel", status: "Available", type: "Residential", image: "images/siddhivinayak-sparsh.jpg" },
    { id: "p11", name: "Janubai Niwas", location: "Plot 111, Sector R4, Pushpak", developer: "Siddhivinayak Builders", architect: "Atul Patel", status: "Available", type: "Residential", image: "images/janubai-niwas.jpg" },
    { id: "p12", name: "Siddhivinayak Mangalmurti", location: "Plot 107, Sector R4, Pushpak Nagar Dapoli", developer: "Siddhivinayak Builders", architect: "Atul Patel", status: "Available", type: "Mixed Use", image: "images/siddhivinayak-mangalmurti.jpg" },
    { id: "p13", name: "Ambika Niwas", location: "Plot 88, Sector R4, Pushpak", developer: "Siddhivinayak Builders", architect: "Atul Patel", status: "Available", type: "Residential", image: "images/ambika-niwas.jpg" },
    { id: "p14", name: "Siddhivinayak Green Park", location: "Plot 188, Sector R4, Pushpak Nagar", developer: "Siddhivinayak Builders", architect: "Atul Patel", status: "Available", type: "Residential", image: "images/siddhivinayak-green-park.jpg" },
    { id: "p15", name: "Siddhivinayak Vastu", location: "Plot 130, Sector R4, Pushpak", developer: "Siddhivinayak Builders", architect: "Amit N. Patil", status: "Available", type: "Residential", image: "images/siddhivinayak-vastu.jpg" },
    { id: "p16", name: "Siddhivinayak Krupa", location: "Plot 128, Sector R4, Pushpak", developer: "Siddhivinayak Builders", architect: "Atul Patel", status: "Available", type: "Residential", image: "images/siddhivinayak-krupa.jpg" },
    { id: "p17", name: "Siddhivinayak Swastik", location: "Plot 202 C, 202 D, Sector R4, Pushpak Nagar", developer: "Siddhivinayak Builders", architect: "Atul Patel", status: "Available", type: "Residential", image: "images/siddhivinayak-swastik.jpg" },
    { id: "p18", name: "Siddhivinayak Signature", location: "Sector 8, Pushpak Nagar", developer: "Siddhivinayak Builders", architect: "Atul Patel", status: "Upcoming", type: "Residential", image: "images/upcoming-1.jpg" },
    { id: "p19", name: "Siddhivinayak Elite", location: "Sector R5, Pushpak", developer: "Siddhivinayak Builders", architect: "Amit N. Patil", status: "Upcoming", type: "Residential", image: "images/upcoming-2.jpg" },
    { id: "p20", name: "Siddhivinayak Heritage", location: "Sector 7, Pushpak", developer: "Siddhivinayak Builders", architect: "Atul Patel", status: "Upcoming", type: "Residential", image: "images/upcoming-3.jpg" }
  ],
  enquiries: []
};

export function useSiteStore() {
  const [data, setData] = useState<SiteData>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : DEFAULT_DATA;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const updateSettings = (settings: SiteSettings) => setData(prev => ({ ...prev, settings }));
  const updateServices = (services: Service[]) => setData(prev => ({ ...prev, services }));
  const updateTestimonials = (testimonials: Testimonial[]) => setData(prev => ({ ...prev, testimonials }));
  const updateBlogs = (blogs: BlogPost[]) => setData(prev => ({ ...prev, blogs }));
  const updateProjects = (projects: Project[]) => setData(prev => ({ ...prev, projects }));
  
  const addEnquiry = (enquiry: Enquiry) => {
    setData(prev => ({
      ...prev,
      enquiries: [enquiry, ...prev.enquiries]
    }));
  };

  const updateEnquiryStatus = (id: string, status: Enquiry['status']) => {
    setData(prev => ({
      ...prev,
      enquiries: prev.enquiries.map(e => e.id === id ? { ...e, status } : e)
    }));
  };

  const deleteEnquiry = (id: string) => {
    setData(prev => ({
      ...prev,
      enquiries: prev.enquiries.filter(e => e.id !== id)
    }));
  };

  return { 
    data, 
    updateSettings, 
    updateServices, 
    updateTestimonials, 
    updateBlogs, 
    updateProjects, 
    addEnquiry, 
    updateEnquiryStatus, 
    deleteEnquiry 
  };
}
