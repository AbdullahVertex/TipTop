// Mock data for product detail page
export const productDetailData = {
  id: 1,
  name: "Premium Product - High Quality",
  price: "Rp 656.000",
  originalPrice: "Rp 756.000",
  rating: 4.9,
  reviewCount: 1000,
  images: [
    // This will be overridden by the actual clicked product image
    // Fallback images if no product image is available
    "https://picsum.photos/seed/fallback1/400/400",
    "https://picsum.photos/seed/fallback2/400/400",
    "https://picsum.photos/seed/fallback3/400/400",
  ],
  colors: [
    { id: 1, name: "Light Grey", hex: "#D1D5DB", selected: true },
    { id: 2, name: "Light Brown", hex: "#D97706", selected: false },
    { id: 3, name: "Orange", hex: "#F59E0B", selected: false },
    { id: 4, name: "Red", hex: "#EF4444", selected: false },
    { id: 5, name: "Dark Blue", hex: "#1E40AF", selected: false },
  ],
  expandableSections: [
    {
      id: 1,
      title: "Materials",
      content: "High-quality plastic and metal components for durability and premium feel. The earbuds feature a smooth, rounded design with comfortable silicone ear tips.",
      expanded: false,
    },
    {
      id: 2,
      title: "Sound Quality",
      content: "Premium audio drivers delivering crisp highs, rich mids, and deep bass. Advanced noise cancellation technology for immersive listening experience.",
      expanded: false,
    },
    {
      id: 3,
      title: "Dimensions",
      content: "Earbud Size: 2.5cm x 1.8cm, Cable Length: 1.2m, Weight: 15g, Driver Size: 10mm. Perfect fit for all ear sizes with included multiple ear tip sizes.",
      expanded: false,
    },
  ],
  coupon: {
    title: "Shoping Day Coupon",
    description: "For every order over $50.00 USD",
    discount: "Rp 100.000",
    validity: "Dec 1, 12:00 AM - Dec 16, 12:00 AM",
    isActive: true,
  },
  reviews: {
    overallRating: 4.9,
    totalReviews: 1000,
    ratingBreakdown: [
      { stars: 5, count: 252, percentage: 25.2 },
      { stars: 4, count: 252, percentage: 25.2 },
      { stars: 3, count: 252, percentage: 25.2 },
      { stars: 2, count: 252, percentage: 25.2 },
      { stars: 1, count: 252, percentage: 25.2 },
    ],
    recentReviews: [
      {
        id: 1,
        userName: "Cody Fisher",
        userAvatar: "https://i.pravatar.cc/100?img=1",
        rating: 5,
        comment: "nice and cool stuff",
        date: "2 days ago",
      },
      {
        id: 2,
        userName: "Marvin McKinney",
        userAvatar: "https://i.pravatar.cc/100?img=2",
        rating: 5,
        comment: "nice and cool stuff",
        date: "3 days ago",
      },
      {
        id: 3,
        userName: "Darlene Robertson",
        userAvatar: "https://i.pravatar.cc/100?img=3",
        rating: 5,
        comment: "nice and cool stuff",
        date: "1 week ago",
      },
      {
        id: 4,
        userName: "Jacob Jones",
        userAvatar: "https://i.pravatar.cc/100?img=4",
        rating: 5,
        comment: "nice and cool stuff",
        date: "1 week ago",
      },
    ],
  },
  recommendedProducts: [
    {
      id: 101,
      name: "Product AAA",
      price: "Rp 500.000",
      rating: 4.9,
      image: "https://picsum.photos/seed/rec1/200/200",
    },
    {
      id: 102,
      name: "Product AAB",
      price: "Rp 500.000",
      rating: 4.9,
      image: "https://picsum.photos/seed/rec2/200/200",
    },
    {
      id: 103,
      name: "Product AAC",
      price: "Rp 500.000",
      rating: 4.9,
      image: "https://picsum.photos/seed/rec3/200/200",
    },
    {
      id: 104,
      name: "Product AAD",
      price: "Rp 500.000",
      rating: 4.9,
      image: "https://picsum.photos/seed/rec4/200/200",
    },
  ],
};

// Helper function to get product by ID
export const getProductById = (productId) => {
  // In a real app, this would be an API call
  // For now, return mock data
  return productDetailData;
};
