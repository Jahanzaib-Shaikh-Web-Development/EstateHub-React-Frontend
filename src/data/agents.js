const P = (g, n) => `https://randomuser.me/api/portraits/${g}/${n}.jpg`

export const agents = [
  { id: 1, name: 'Ahmed Raza', title: 'Senior Property Consultant', city: 'Karachi', photo: P('men', 32), phone: '+92 300 1234567', email: 'ahmed@estatehub.pk', experience: 12, rating: 4.9, specialty: 'Luxury Homes & Offices', bio: 'Ahmed has closed over 300 premium transactions across DHA and Clifton and is known for transparent, no-pressure advice.' },
  { id: 2, name: 'Sana Malik', title: 'Luxury Real Estate Advisor', city: 'Lahore', photo: P('women', 44), phone: '+92 301 2345678', email: 'sana@estatehub.pk', experience: 9, rating: 4.8, specialty: 'Villas & Apartments', bio: 'Sana specialises in high-end villas and apartments in Gulberg, DHA and Bahria Town with a focus on investors.' },
  { id: 3, name: 'Usman Tariq', title: 'Commercial Property Expert', city: 'Islamabad', photo: P('men', 52), phone: '+92 302 3456789', email: 'usman@estatehub.pk', experience: 14, rating: 4.9, specialty: 'Commercial & Corporate', bio: 'Usman advises corporates and developers on Blue Area plazas, office leasing and large investments in the capital.' },
  { id: 4, name: 'Hira Khan', title: 'Rental Specialist', city: 'Rawalpindi', photo: P('women', 68), phone: '+92 303 4567890', email: 'hira@estatehub.pk', experience: 6, rating: 4.7, specialty: 'Rentals & Shops', bio: 'Hira matches tenants with quality apartments and retail spaces quickly, with fully verified documentation.' },
  { id: 5, name: 'Bilal Ahmed', title: 'Plots & Land Consultant', city: 'Hyderabad', photo: P('men', 76), phone: '+92 304 5678901', email: 'bilal@estatehub.pk', experience: 8, rating: 4.8, specialty: 'Residential Plots', bio: 'Bilal helps first-time buyers across Hyderabad and Sindh find clear-title plots with strong growth potential.' },
  { id: 6, name: 'Zainab Iqbal', title: 'Agricultural Land Advisor', city: 'Faisalabad', photo: P('women', 29), phone: '+92 305 6789012', email: 'zainab@estatehub.pk', experience: 10, rating: 4.9, specialty: 'Agricultural Land', bio: 'Zainab guides farmland buyers on soil, water access, legal verification and long-term returns in Punjab.' },
]

export const testimonials = [
  { id: 1, name: 'Farhan Siddiqui', role: 'Homeowner, Karachi', photo: P('men', 12), rating: 5, text: 'EstateHub made buying our first home effortless. The listings were accurate and our agent was always available.' },
  { id: 2, name: 'Ayesha Noor', role: 'Investor, Lahore', photo: P('women', 21), rating: 5, text: 'I sold my apartment within three weeks at a great price. Professional team and transparent communication.' },
  { id: 3, name: 'Kamran Ali', role: 'Business Owner, Islamabad', photo: P('men', 65), rating: 4, text: 'Found the perfect office space on Blue Area. The advanced search saved us a lot of time.' },
]
