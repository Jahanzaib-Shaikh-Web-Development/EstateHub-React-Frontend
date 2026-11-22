const U = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1200&q=80`
const INT = ['1502672260266-1c1ef2d93688', '1493809842364-78817add7ffb', '1556909114-f6e7ad7d3136', '1484154218962-a197022b5858'].map(U)

export const FALLBACK = U('1564013799919-ab600027ffc6')
export const HERO_IMG = U('1600585154340-be6161a56a0c')
export const AUTH_IMG = U('1613490493576-7fde63acd811')

export const categories = [
  'Luxury Houses', 'Apartments', 'Villas', 'Commercial Properties',
  'Shops', 'Offices', 'Residential Plots', 'Agricultural Land',
]
export const cities = ['Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Hyderabad', 'Faisalabad']

export const locations = [
  { city: 'Karachi', img: U('1568605114967-8130f3a36994') },
  { city: 'Lahore', img: U('1570129477492-45c003edd2be') },
  { city: 'Islamabad', img: U('1512917774080-9991f1c4c750') },
  { city: 'Rawalpindi', img: U('1545324418-cc1a3fa10c00') },
  { city: 'Hyderabad', img: U('1600596542815-ffad4c1539a9') },
  { city: 'Faisalabad', img: U('1500382017468-9049fed747ef') },
]

export const fmt = (p) => {
  if (p.purpose === 'rent') return `PKR ${p.price.toLocaleString('en-PK')}/mo`
  const n = p.price
  const t = (x) => x.toFixed(2).replace(/\.?0+$/, '')
  if (n >= 1e7) return `PKR ${t(n / 1e7)} Crore`
  if (n >= 1e5) return `PKR ${t(n / 1e5)} Lakh`
  return `PKR ${n.toLocaleString('en-PK')}`
}

const FEATURES = ['24/7 Security', 'Covered Parking', 'Gas & Electricity', 'Near Schools & Markets', 'Modern Finishing', 'Backup Power']

const mk = (id, title, purpose, category, price, city, location, beds, baths, size, main, agentId, featured = false) => ({
  id, title, purpose, category, price, city, location, beds, baths, size, agentId, featured,
  images: [U(main), ...INT.slice(id % 2, (id % 2) + 3)],
  year: 2018 + (id % 7),
  features: FEATURES,
  description: `${title} is a premium ${category.toLowerCase().replace(/s$/, '')} located in ${location}, ${city}. It offers thoughtful planning, quality construction, excellent road access and a secure, well-developed neighbourhood close to schools, hospitals and shopping. A strong choice for families, investors and businesses alike.`,
})

export const properties = [
  mk(1, 'Luxury Modern House in DHA Phase 6', 'sale', 'Luxury Houses', 85000000, 'Karachi', 'DHA Phase 6', 5, 6, '500 sq yd', '1564013799919-ab600027ffc6', 1, true),
  mk(2, 'Elegant Villa with Private Pool', 'sale', 'Villas', 120000000, 'Lahore', 'Bahria Town', 6, 7, '2 Kanal', '1613490493576-7fde63acd811', 2, true),
  mk(3, 'Furnished Apartment in Gulberg III', 'rent', 'Apartments', 150000, 'Lahore', 'Gulberg III', 3, 3, '1,800 sq ft', '1545324418-cc1a3fa10c00', 2, true),
  mk(4, 'Sea-View Luxury Apartment', 'sale', 'Apartments', 45000000, 'Karachi', 'Clifton Block 4', 3, 4, '2,400 sq ft', '1522708323590-d24dbb6b0267', 1, true),
  mk(5, 'Contemporary Villa in F-7', 'sale', 'Villas', 210000000, 'Islamabad', 'F-7 Markaz', 5, 6, '1 Kanal', '1512917774080-9991f1c4c750', 3, true),
  mk(6, 'Prime Commercial Plaza, Blue Area', 'sale', 'Commercial Properties', 350000000, 'Islamabad', 'Blue Area', 0, 8, '12,000 sq ft', '1486406146926-c627a92ad1ab', 3, true),
  mk(7, 'Corner Shop in Liberty Market', 'rent', 'Shops', 280000, 'Lahore', 'Liberty Market', 0, 1, '650 sq ft', '1441986300917-64674bd600d8', 4),
  mk(8, 'Executive Office on I.I. Chundrigar Road', 'rent', 'Offices', 320000, 'Karachi', 'I.I. Chundrigar Road', 0, 2, '2,200 sq ft', '1497366216548-37526070297c', 1),
  mk(9, 'Residential Plot in Latifabad', 'sale', 'Residential Plots', 6500000, 'Hyderabad', 'Latifabad Unit 8', 0, 0, '10 Marla', '1500076656116-558758c991c1', 5),
  mk(10, 'Fertile Agricultural Land near Canal', 'sale', 'Agricultural Land', 28000000, 'Faisalabad', 'Jaranwala Road', 0, 0, '16 Acres', '1500382017468-9049fed747ef', 6),
  mk(11, 'Designer House in E-11', 'rent', 'Luxury Houses', 450000, 'Islamabad', 'E-11/3', 5, 5, '1 Kanal', '1600596542815-ffad4c1539a9', 3),
  mk(12, 'Modern 2-Bed Apartment, Bahria Town', 'rent', 'Apartments', 70000, 'Rawalpindi', 'Bahria Town Phase 7', 2, 2, '1,100 sq ft', '1560448204-e02f11c3d0e2', 4),
  mk(13, 'Commercial Shop in Qasimabad', 'sale', 'Shops', 14500000, 'Hyderabad', 'Qasimabad', 0, 1, '500 sq ft', '1441986300917-64674bd600d8', 5),
  mk(14, 'Corner Plot in DHA Phase 8', 'sale', 'Residential Plots', 38000000, 'Lahore', 'DHA Phase 8', 0, 0, '1 Kanal', '1500076656116-558758c991c1', 2),
]
