export const PROMPTS = [
  { id: 1, title: "Misty Mountain Forest", category: "Nature", price: 1, seller: "ArtsyAI", sellerId: 2, preview: "🌲", downloads: 1240, rating: 4.9, prompt: "A breathtaking misty forest at golden hour, volumetric light rays, photorealistic, 8K, ultra detailed, cinematic composition, award-winning photography", approved: true },
  { id: 2, title: "Cyberpunk Portrait", category: "Portrait", price: 1, seller: "NeoPix", sellerId: 3, preview: "🤖", downloads: 980, rating: 4.8, prompt: "Cyberpunk female portrait, neon lights, rain-soaked streets, futuristic visor, ultra realistic, octane render, 8K, cinematic lighting", approved: true },
  { id: 3, title: "Luxury Interior Render", category: "Real Estate", price: 1, seller: "ArchStudio", sellerId: 4, preview: "🏠", downloads: 730, rating: 4.7, prompt: "Luxury modern living room interior, golden hour sunlight, marble floors, minimalist furniture, architectural digest style, photorealistic render", approved: true },
  { id: 4, title: "Neon Tokyo Streets", category: "Urban", price: 1, seller: "CityAI", sellerId: 5, preview: "🌃", downloads: 1100, rating: 4.9, prompt: "Rainy Tokyo street at midnight, neon signs reflecting on wet pavement, bokeh lights, cinematic, blade runner aesthetic, 8K", approved: true },
  { id: 5, title: "Abstract Fluid Art", category: "Abstract", price: 1, seller: "FluidGen", sellerId: 6, preview: "🎨", downloads: 850, rating: 4.6, prompt: "Abstract fluid acrylic pour painting, vibrant blue and gold colors, macro photography, high contrast, studio lighting, canvas texture", approved: true },
  { id: 6, title: "Vintage Botanical Print", category: "Nature", price: 1, seller: "ArtsyAI", sellerId: 2, preview: "🌸", downloads: 620, rating: 4.8, prompt: "Victorian botanical illustration, exotic tropical flowers, aged paper texture, ink and watercolor, museum quality, intricate details", approved: true },
  { id: 7, title: "Dark Fantasy Castle", category: "Architecture", price: 1, seller: "DarkGen", sellerId: 7, preview: "🏰", downloads: 0, rating: 0, prompt: "Gothic dark fantasy castle on a cliff, thunderstorm, dramatic lightning, moody atmosphere, hyper detailed, matte painting style", approved: false },
  { id: 8, title: "Ocean Sunset Blur", category: "Nature", price: 1, seller: "WaveAI", sellerId: 8, preview: "🌊", downloads: 0, rating: 0, prompt: "Golden hour ocean sunset, long exposure waves, silhouette of rocks, pastel sky, minimal composition, fine art photography", approved: false },
];

export const USERS = [
  { id: 1, name: "Admin User", email: "admin@promptbazaar.com", role: "admin", joined: "Jan 1" },
  { id: 2, name: "ArtsyAI", email: "artsy@example.com", role: "seller", joined: "Mar 10", uploads: 58, earnings: 3720 },
  { id: 3, name: "NeoPix", email: "neopix@example.com", role: "seller", joined: "Mar 22", uploads: 42, earnings: 2980 },
  { id: 4, name: "ArchStudio", email: "arch@example.com", role: "seller", joined: "Apr 5", uploads: 31, earnings: 1840 },
  { id: 5, name: "CityAI", email: "city@example.com", role: "seller", joined: "Apr 12", uploads: 24, earnings: 1520 },
  { id: 6, name: "Rahul Islam", email: "rahul@example.com", role: "buyer", joined: "May 1", downloads: 12 },
  { id: 7, name: "Fatema Begum", email: "fatema@example.com", role: "buyer", joined: "May 8", downloads: 7 },
];

export const CATEGORIES = ["All", "Nature", "Portrait", "Real Estate", "Urban", "Abstract", "Architecture"];

export const WITHDRAWALS = [
  { id: 1, seller: "ArtsyAI", amount: 1200, method: "bKash", account: "017XXXXXXXX", date: "May 21", status: "pending" },
  { id: 2, seller: "NeoPix", amount: 3400, method: "Bank", account: "DBBL-XXXX", date: "May 20", status: "pending" },
  { id: 3, seller: "ArchStudio", amount: 800, method: "Rocket", account: "018XXXXXXXX", date: "May 18", status: "completed" },
  { id: 4, seller: "CityAI", amount: 2100, method: "Bank", account: "IBBL-XXXX", date: "May 15", status: "completed" },
];

export const MONTHLY_REVENUE = [
  { month: "Jan", revenue: 8420 },
  { month: "Feb", revenue: 11200 },
  { month: "Mar", revenue: 9800 },
  { month: "Apr", revenue: 13600 },
  { month: "May", revenue: 9380 },
];
