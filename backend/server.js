const express = require("express")
const cors = require("cors")

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Data UMKM
const businessInfo = {
  name: "Warung Kopi Nusantara",
  description:
    "UMKM keluarga yang menyajikan kopi premium Indonesia dengan cita rasa autentik dan makanan tradisional yang lezat. Kami berkomitmen menggunakan biji kopi pilihan dari petani lokal.",
  address: "Jl. Merdeka No. 123, Jakarta Selatan",
  phone: "+62 812-3456-7890",
  email: "info@warungkopinusantara.com",
  hours: "06:00 - 22:00 WIB",
  established: "2018",
  owner: "Bapak Suharto & Ibu Sari",
}
// Test endpoint untuk debug
app.get("/", (req, res) => {
  res.json({
    message: "Backend API is running!",
    timestamp: new Date().toISOString(),
    endpoints: [
      "GET /api/business",
      "GET /api/products",
      "GET /api/categories",
      "POST /api/contact",
      "POST /api/orders",
    ],
  })
})

// API Routes dengan logging yang lebih detail
app.get("/api/business", (req, res) => {
  console.log("📡 GET /api/business - Business info requested")
  console.log("📋 Sending business info:", businessInfo)

  // Set headers explicitly
  res.setHeader("Content-Type", "application/json")
  res.status(200).json(businessInfo)
})

// Expanded product list untuk halaman menu
const products = [
  // Minuman Kopi
  {
    id: 1,
    name: "Kopi Arabica Gayo",
    price: 45000,
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=300&h=200&fit=crop",
    category: "Minuman",
    subcategory: "Kopi",
    description: "Kopi premium dari dataran tinggi Gayo dengan aroma yang khas",
    rating: 4.8,
    stock: 50,
    featured: true,
  },
  {
    id: 2,
    name: "Kopi Robusta Lampung",
    price: 35000,
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300&h=200&fit=crop",
    category: "Minuman",
    subcategory: "Kopi",
    description: "Kopi robusta dengan body yang kuat dan rasa yang bold",
    rating: 4.6,
    stock: 40,
    featured: true,
  },
  {
    id: 3,
    name: "Es Kopi Susu Gula Aren",
    price: 20000,
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=300&h=200&fit=crop",
    category: "Minuman",
    subcategory: "Kopi",
    description: "Perpaduan kopi, susu, dan gula aren yang menyegarkan",
    rating: 4.5,
    stock: 60,
    featured: true,
  },
  {
    id: 4,
    name: "Cappuccino",
    price: 25000,
    image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=300&h=200&fit=crop",
    category: "Minuman",
    subcategory: "Kopi",
    description: "Cappuccino klasik dengan foam susu yang creamy",
    rating: 4.4,
    stock: 35,
    featured: false,
  },
  {
    id: 5,
    name: "Americano",
    price: 18000,
    image: "https://images.unsplash.com/photo-1551030173-122aabc4489c?w=300&h=200&fit=crop",
    category: "Minuman",
    subcategory: "Kopi",
    description: "Espresso dengan air panas, simple dan nikmat",
    rating: 4.3,
    stock: 45,
    featured: false,
  },

  // Minuman Non-Kopi
  {
    id: 6,
    name: "Teh Tarik",
    price: 15000,
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=300&h=200&fit=crop",
    category: "Minuman",
    subcategory: "Non-Kopi",
    description: "Teh manis dengan susu yang ditarik hingga berbusa",
    rating: 4.2,
    stock: 50,
    featured: false,
  },
  {
    id: 7,
    name: "Es Jeruk Nipis",
    price: 12000,
    image: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=300&h=200&fit=crop",
    category: "Minuman",
    subcategory: "Non-Kopi",
    description: "Jeruk nipis segar dengan es batu",
    rating: 4.1,
    stock: 40,
    featured: false,
  },
  {
    id: 8,
    name: "Jus Alpukat",
    price: 18000,
    image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=300&h=200&fit=crop",
    category: "Minuman",
    subcategory: "Non-Kopi",
    description: "Jus alpukat creamy dengan susu kental manis",
    rating: 4.6,
    stock: 25,
    featured: false,
  },

  // Makanan Berat
  {
    id: 9,
    name: "Nasi Gudeg Jogja",
    price: 25000,
    image: "https://images.unsplash.com/photo-1707529332935-bfa3925f15ac?w=300&h=200&fit=crop",
    category: "Makanan",
    subcategory: "Makanan Berat",
    description: "Gudeg autentik Yogyakarta dengan rasa manis yang pas",
    rating: 4.7,
    stock: 30,
    featured: true,
  },
  {
    id: 10,
    name: "Rendang Daging",
    price: 35000,
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=300&h=200&fit=crop",
    category: "Makanan",
    subcategory: "Makanan Berat",
    description: "Rendang daging sapi dengan bumbu rempah tradisional",
    rating: 4.9,
    stock: 25,
    featured: true,
  },
  {
    id: 11,
    name: "Nasi Liwet Solo",
    price: 22000,
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=300&h=200&fit=crop",
    category: "Makanan",
    subcategory: "Makanan Berat",
    description: "Nasi liwet dengan lauk pauk tradisional Solo",
    rating: 4.5,
    stock: 20,
    featured: false,
  },
  {
    id: 12,
    name: "Ayam Bakar Taliwang",
    price: 28000,
    image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=300&h=200&fit=crop",
    category: "Makanan",
    subcategory: "Makanan Berat",
    description: "Ayam bakar khas Lombok dengan sambal taliwang pedas",
    rating: 4.6,
    stock: 18,
    featured: false,
  },

  // Snack & Gorengan
  {
    id: 13,
    name: "Sate Ayam Madura",
    price: 30000,
    image: "https://images.unsplash.com/photo-1529563021893-cc83c992d75d?w=300&h=200&fit=crop",
    category: "Makanan",
    subcategory: "Snack",
    description: "Sate ayam dengan bumbu kacang khas Madura",
    rating: 4.8,
    stock: 35,
    featured: true,
  },
  {
    id: 14,
    name: "Pisang Goreng",
    price: 8000,
    image: "https://images.unsplash.com/photo-1587132137056-bfbf0166836e?w=300&h=200&fit=crop",
    category: "Makanan",
    subcategory: "Snack",
    description: "Pisang goreng crispy dengan tepung renyah",
    rating: 4.3,
    stock: 50,
    featured: false,
  },
  {
    id: 15,
    name: "Tempe Mendoan",
    price: 10000,
    image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=300&h=200&fit=crop",
    category: "Makanan",
    subcategory: "Snack",
    description: "Tempe goreng setengah matang khas Banyumas",
    rating: 4.4,
    stock: 40,
    featured: false,
  },
  {
    id: 16,
    name: "Bakwan Jagung",
    price: 6000,
    image: "https://images.unsplash.com/photo-1738429567615-b21a0c277d81?w=300&h=200&fit=crop",
    category: "Makanan",
    subcategory: "Snack",
    description: "Bakwan jagung manis yang gurih dan renyah",
    rating: 4.2,
    stock: 45,
    featured: false,
  },

  // Dessert
  {
    id: 17,
    name: "Es Cendol",
    price: 15000,
    image: "https://images.unsplash.com/photo-1588461123433-6e389a38b54a?w=300&h=200&fit=crop",
    category: "Dessert",
    subcategory: "Es",
    description: "Es cendol dengan santan dan gula merah",
    rating: 4.5,
    stock: 30,
    featured: false,
  },
  {
    id: 18,
    name: "Klepon",
    price: 12000,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop",
    category: "Dessert",
    subcategory: "Kue",
    description: "Klepon isi gula merah dengan kelapa parut",
    rating: 4.4,
    stock: 25,
    featured: false,
  },
]

// Storage untuk data
const contacts = []
const orders = []

// API Routes
app.get("/api/business", (req, res) => {
  console.log("📡 GET /api/business - Business info requested")
  res.json(businessInfo)
})

app.get("/api/products", (req, res) => {
  console.log("📡 GET /api/products - Products requested")

  // Query parameters untuk filtering
  const { category, subcategory, search, featured, minPrice, maxPrice } = req.query

  let filteredProducts = [...products]

  // Filter by category
  if (category && category !== "all") {
    filteredProducts = filteredProducts.filter((p) => p.category.toLowerCase() === category.toLowerCase())
  }

  // Filter by subcategory
  if (subcategory && subcategory !== "all") {
    filteredProducts = filteredProducts.filter((p) => p.subcategory.toLowerCase() === subcategory.toLowerCase())
  }

  // Filter by search term
  if (search) {
    filteredProducts = filteredProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase()),
    )
  }

  // Filter by featured
  if (featured === "true") {
    filteredProducts = filteredProducts.filter((p) => p.featured)
  }

  // Filter by price range
  if (minPrice) {
    filteredProducts = filteredProducts.filter((p) => p.price >= Number.parseInt(minPrice))
  }
  if (maxPrice) {
    filteredProducts = filteredProducts.filter((p) => p.price <= Number.parseInt(maxPrice))
  }

  res.json(filteredProducts)
})

app.get("/api/products/featured", (req, res) => {
  console.log("📡 GET /api/products/featured - Featured products requested")
  const featuredProducts = products.filter((p) => p.featured)
  res.json(featuredProducts)
})

app.get("/api/categories", (req, res) => {
  console.log("📡 GET /api/categories - Categories requested")
  const categories = [...new Set(products.map((p) => p.category))]
  const subcategories = [...new Set(products.map((p) => p.subcategory))]

  res.json({
    categories,
    subcategories,
    categoryMap: categories.reduce((acc, cat) => {
      acc[cat] = [...new Set(products.filter((p) => p.category === cat).map((p) => p.subcategory))]
      return acc
    }, {}),
  })
})

app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body
  console.log("📡 POST /api/contact - New contact:", { name, email })

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Semua field harus diisi" })
  }

  const newContact = {
    id: contacts.length + 1,
    name,
    email,
    message,
    timestamp: new Date().toISOString(),
  }

  contacts.push(newContact)

  res.json({
    success: true,
    message: "Pesan Anda telah terkirim! Kami akan segera menghubungi Anda.",
  })
})

app.post("/api/orders", (req, res) => {
  const { customerName, customerPhone, items, totalAmount } = req.body
  console.log("📡 POST /api/orders - New order:", { customerName, totalAmount })

  if (!customerName || !customerPhone || !items || items.length === 0) {
    return res.status(400).json({ error: "Data pesanan tidak lengkap" })
  }

  const newOrder = {
    id: orders.length + 1,
    customerName,
    customerPhone,
    items,
    totalAmount,
    status: "pending",
    timestamp: new Date().toISOString(),
  }

  orders.push(newOrder)

  res.json({
    success: true,
    message: "Pesanan Anda telah diterima! Kami akan segera menghubungi Anda.",
    orderId: newOrder.id,
  })
})

// Admin routes
app.get("/api/admin/contacts", (req, res) => {
  res.json(contacts)
})

app.get("/api/admin/orders", (req, res) => {
  res.json(orders)
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`📡 API available at http://localhost:${PORT}/api`)
  console.log(`🔗 Frontend should connect to: http://localhost:${PORT}`)
})
