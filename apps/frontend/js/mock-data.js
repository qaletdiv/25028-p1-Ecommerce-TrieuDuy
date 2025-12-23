// Mock Data - Dữ liệu gốc không bao giờ thay đổi
// File này chứa dữ liệu mẫu ban đầu của website

const MOCK_PRODUCTS = [
    {
        id: 1,
        name: "Giày Thể Thao Air Max Classic",
        category: "Giày",
        description: "Thiết kế cổ điển với công nghệ đệm khí hiện đại",
        price: 2899000,
        rating: 4.8,
        featured: true,
        createdAt: "2024-01-15",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&h=800&fit=crop"
        ],
        sizes: [38, 39, 40, 41, 42, 43],
        stock: 45,
        reviews: []
    },
    {
        id: 2,
        name: "Giày Cao Cổ Jordan Basketball",
        category: "Giày",
        description: "Giày bóng rổ biểu tượng với hỗ trợ mắt cá chân vượt trội",
        price: 4299000,
        rating: 4.9,
        featured: true,
        createdAt: "2024-01-10",
        image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&h=800&fit=crop"
        ],
        sizes: [38, 39, 40, 41, 42, 43],
        stock: 32,
        reviews: []
    },
    {
        id: 3,
        name: "Giày Chạy Bộ UltraBoost Pro",
        category: "Giày",
        description: "Công nghệ đệm hoàn trả năng lượng cho mọi cự ly",
        price: 3599000,
        rating: 4.7,
        featured: true,
        createdAt: "2024-01-20",
        image: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop"
        ],
        sizes: [38, 39, 40, 41, 42, 43],
        stock: 28,
        reviews: []
    },
    {
        id: 4,
        name: "Giày Lifestyle Retro Classic",
        category: "Giày",
        description: "Phong cách cổ điển, phù hợp mọi dịp",
        price: 2399000,
        rating: 4.6,
        featured: false,
        createdAt: "2024-01-25",
        image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&h=800&fit=crop"
        ],
        sizes: [38, 39, 40, 41, 42, 43],
        stock: 52,
        reviews: []
    },
    {
        id: 5,
        name: "Giày Thể Thao Lightweight Runner",
        category: "Giày",
        description: "Siêu nhẹ, thoáng khí, lý tưởng cho chạy đường dài",
        price: 3199000,
        rating: 4.5,
        featured: false,
        createdAt: "2024-02-01",
        image: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&h=800&fit=crop"
        ],
        sizes: [38, 39, 40, 41, 42, 43],
        stock: 38,
        reviews: []
    },
    {
        id: 6,
        name: "Giày Cao Cổ Street Style",
        category: "Giày",
        description: "Thời trang đường phố, cá tính và nổi bật",
        price: 2699000,
        rating: 4.4,
        featured: false,
        createdAt: "2024-02-05",
        image: "https://images.unsplash.com/photo-1597045566677-8cf032ed6634?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1597045566677-8cf032ed6634?w=800&h=800&fit=crop"
        ],
        sizes: [38, 39, 40, 41, 42, 43],
        stock: 41,
        reviews: []
    },
    {
        id: 7,
        name: "Áo Thể Thao Năng Động",
        category: "Áo",
        description: "Chất liệu thoáng mát, thấm hút mồ hôi tốt",
        price: 899000,
        rating: 4.3,
        featured: true,
        createdAt: "2024-02-10",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=800&fit=crop"
        ],
        sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        stock: 65,
        reviews: []
    },
    {
        id: 8,
        name: "Áo Khoác Thể Thao",
        category: "Áo",
        description: "Giữ ấm, chống nước, phù hợp mọi thời tiết",
        price: 1599000,
        rating: 4.6,
        featured: false,
        createdAt: "2024-02-15",
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=800&fit=crop"
        ],
        sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        stock: 48,
        reviews: []
    }
];

const MOCK_SHOE_ICONS = [
    {
        id: 'dunk',
        name: 'Dunk',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop&auto=format',
        filter: 'Dunk'
    },
    {
        id: 'killshot',
        name: 'Killshot',
        image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop&auto=format',
        filter: 'Killshot'
    },
    {
        id: 'cortez',
        name: 'Cortez',
        image: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=400&h=400&fit=crop&auto=format',
        filter: 'Cortez'
    },
    {
        id: 'air-jordan-1',
        name: 'Air Jordan 1',
        image: 'https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=400&h=400&fit=crop&auto=format',
        filter: 'Air Jordan 1'
    },
    {
        id: 'air-force-1',
        name: 'Air Force 1',
        image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop&auto=format',
        filter: 'Air Force 1'
    },
    {
        id: 'air-max',
        name: 'Air Max',
        image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400&h=400&fit=crop&auto=format',
        filter: 'Air Max'
    },
    {
        id: 'blazer',
        name: 'Blazer',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop&auto=format',
        filter: 'Blazer'
    },
    {
        id: 'vaporfly',
        name: 'Vaporfly',
        image: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=400&h=400&fit=crop&auto=format',
        filter: 'Vaporfly'
    },
    {
        id: 'pegasus',
        name: 'Pegasus',
        image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop&auto=format',
        filter: 'Pegasus'
    }
];


