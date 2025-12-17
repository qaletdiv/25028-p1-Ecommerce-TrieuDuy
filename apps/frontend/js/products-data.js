// Products Data
const products = [
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
        ]
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
            "https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1597045566677-8cf032ed6634?w=800&h=800&fit=crop"
        ]
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
        ]
    },
    {
        id: 4,
        name: "Giày Sneaker Trắng Tối Giản",
        category: "Giày",
        description: "Thiết kế sạch sẽ, linh hoạt cho mọi trang phục hàng ngày",
        price: 1999000,
        rating: 4.6,
        featured: false,
        createdAt: "2024-12-10",
        image: "https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=400&h=400&fit=crop"
    },
    {
        id: 5,
        name: "Dép Slides Thể Thao",
        category: "Dép",
        description: "Dép quai ngang êm ái, hoàn hảo cho thư giãn",
        price: 899000,
        rating: 4.5,
        featured: false,
        createdAt: "2024-12-12",
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop"
    },
    {
        id: 6,
        name: "Áo Thun Basic Premium",
        category: "Áo",
        description: "Áo thun cotton cao cấp, form chuẩn, thoải mái",
        price: 399000,
        rating: 4.8,
        featured: false,
        createdAt: "2024-12-14",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop"
    },
    {
        id: 7,
        name: "Giày Chạy Bộ Năng Động",
        category: "Giày",
        description: "Giày thể thao đa năng với đế chống trượt",
        price: 2499000,
        rating: 4.7,
        featured: false,
        createdAt: "2024-12-15",
        image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop"
    },
    {
        id: 8,
        name: "Giày Sneaker Đen Cổ Điển",
        category: "Giày",
        description: "Phong cách cổ điển không bao giờ lỗi thời",
        price: 1799000,
        rating: 4.6,
        featured: false,
        createdAt: "2024-12-16",
        image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400&h=400&fit=crop"
    },
    {
        id: 9,
        name: "Giày Thể Thao Đa Năng",
        category: "Giày",
        description: "Thiết kế hiện đại, phù hợp mọi hoạt động",
        price: 2199000,
        rating: 4.5,
        featured: false,
        createdAt: "2024-12-17",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop"
    },
    {
        id: 10,
        name: "Dép Quai Ngang Thời Trang",
        category: "Dép",
        description: "Dép thời trang với thiết kế độc đáo",
        price: 599000,
        rating: 4.4,
        featured: false,
        createdAt: "2024-12-18",
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop"
    },
    {
        id: 11,
        name: "Áo Thun Polo Nam",
        category: "Áo",
        description: "Áo polo chất liệu cao cấp, form đẹp",
        price: 499000,
        rating: 4.7,
        featured: false,
        createdAt: "2024-12-19",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop"
    },
    {
        id: 12,
        name: "Giày Boots Cổ Cao",
        category: "Giày",
        description: "Giày boots cổ cao phong cách streetwear",
        price: 3299000,
        rating: 4.8,
        featured: false,
        createdAt: "2024-12-20",
        image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop"
    },
    {
        id: 13,
        name: "Giày Thể Thao Nữ",
        category: "Giày",
        description: "Giày thể thao nữ thiết kế năng động",
        price: 1899000,
        rating: 4.6,
        featured: false,
        createdAt: "2024-12-21",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop"
    },
    {
        id: 14,
        name: "Dép Tông Nam",
        category: "Dép",
        description: "Dép tông nam chất liệu cao cấp",
        price: 299000,
        rating: 4.3,
        featured: false,
        createdAt: "2024-12-22",
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop"
    },
    {
        id: 15,
        name: "Áo Khoác Thể Thao",
        category: "Áo",
        description: "Áo khoác thể thao chống nước",
        price: 899000,
        rating: 4.7,
        featured: false,
        createdAt: "2024-12-23",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop"
    },
    {
        id: 16,
        name: "Giày Cao Cổ Da Thật",
        category: "Giày",
        description: "Giày cao cổ da thật cao cấp",
        price: 4599000,
        rating: 4.9,
        featured: false,
        createdAt: "2024-12-24",
        image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop"
    },
    {
        id: 17,
        name: "Dép Quai Hậu",
        category: "Dép",
        description: "Dép quai hậu thời trang",
        price: 399000,
        rating: 4.5,
        featured: false,
        createdAt: "2024-12-25",
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop"
    },
    {
        id: 18,
        name: "Áo Thun Cổ Tròn Nam",
        category: "Áo",
        description: "Áo thun cotton 100%, thoáng mát, thấm hút mồ hôi tốt",
        price: 299000,
        rating: 4.6,
        featured: false,
        createdAt: "2024-12-26",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop"
    },
    {
        id: 19,
        name: "Áo Polo Nam Cổ Bẻ",
        category: "Áo",
        description: "Áo polo chất liệu pique cao cấp, form đẹp, lịch sự",
        price: 599000,
        rating: 4.7,
        featured: false,
        createdAt: "2024-12-27",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop"
    },
    {
        id: 20,
        name: "Áo Sơ Mi Dài Tay",
        category: "Áo",
        description: "Áo sơ mi công sở, chất liệu cotton, form chuẩn",
        price: 699000,
        rating: 4.8,
        featured: false,
        createdAt: "2024-12-28",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop"
    },
    {
        id: 21,
        name: "Áo Khoác Hoodie",
        category: "Áo",
        description: "Áo khoác hoodie có mũ, ấm áp, phong cách streetwear",
        price: 899000,
        rating: 4.7,
        featured: false,
        createdAt: "2024-12-29",
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop"
    },
    {
        id: 22,
        name: "Áo Thun Tay Ngắn Nữ",
        category: "Áo",
        description: "Áo thun nữ form rộng, chất liệu mềm mại, nhiều màu sắc",
        price: 349000,
        rating: 4.6,
        featured: false,
        createdAt: "2024-12-30",
        image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop"
    },
    {
        id: 23,
        name: "Áo Khoác Gió Thể Thao",
        category: "Áo",
        description: "Áo khoác gió chống nước, nhẹ, phù hợp thể thao",
        price: 799000,
        rating: 4.8,
        featured: false,
        createdAt: "2024-12-31",
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop"
    },
    {
        id: 24,
        name: "Áo Thun Tay Dài",
        category: "Áo",
        description: "Áo thun tay dài ấm áp, chất liệu cotton dày dặn",
        price: 449000,
        rating: 4.5,
        featured: false,
        createdAt: "2025-01-01",
        image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=400&fit=crop"
    },
    {
        id: 25,
        name: "Áo Tank Top Thể Thao",
        category: "Áo",
        description: "Áo tank top không tay, thoáng mát, lý tưởng cho tập gym",
        price: 249000,
        rating: 4.4,
        featured: false,
        createdAt: "2025-01-02",
        image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=400&fit=crop"
    },
    {
        id: 26,
        name: "Áo Sơ Mi Ngắn Tay",
        category: "Áo",
        description: "Áo sơ mi ngắn tay casual, phong cách trẻ trung",
        price: 549000,
        rating: 4.6,
        featured: false,
        createdAt: "2025-01-03",
        image: "https://images.unsplash.com/photo-1594938291221-94f313b4a18d?w=400&h=400&fit=crop"
    },
    {
        id: 27,
        name: "Áo Khoác Bomber",
        category: "Áo",
        description: "Áo khoác bomber phong cách cổ điển, ấm áp",
        price: 1299000,
        rating: 4.9,
        featured: false,
        createdAt: "2025-01-04",
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop"
    },
    {
        id: 28,
        name: "Áo Thun In Hình",
        category: "Áo",
        description: "Áo thun in hình độc đáo, thiết kế trẻ trung",
        price: 379000,
        rating: 4.5,
        featured: false,
        createdAt: "2025-01-05",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop"
    },
    {
        id: 29,
        name: "Áo Len Cổ Lọ",
        category: "Áo",
        description: "Áo len cổ lọ ấm áp, chất liệu len mềm mại",
        price: 699000,
        rating: 4.7,
        featured: false,
        createdAt: "2025-01-06",
        image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=400&fit=crop"
    },
    {
        id: 30,
        name: "Áo Khoác Denim",
        category: "Áo",
        description: "Áo khoác denim phong cách, bền bỉ, không bao giờ lỗi thời",
        price: 999000,
        rating: 4.8,
        featured: false,
        createdAt: "2025-01-07",
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop"
    },
    {
        id: 31,
        name: "Áo Thun Oversize",
        category: "Áo",
        description: "Áo thun oversize form rộng, phong cách unisex",
        price: 329000,
        rating: 4.6,
        featured: false,
        createdAt: "2025-01-08",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop"
    },
    {
        id: 32,
        name: "Áo Khoác Mưa",
        category: "Áo",
        description: "Áo khoác mưa chống thấm nước, nhẹ, gọn nhẹ",
        price: 599000,
        rating: 4.5,
        featured: false,
        createdAt: "2025-01-09",
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop"
    },
    {
        id: 33,
        name: "Áo Thun Cổ V",
        category: "Áo",
        description: "Áo thun cổ V thoáng mát, phong cách casual",
        price: 279000,
        rating: 4.4,
        featured: false,
        createdAt: "2025-01-10",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop"
    },
    {
        id: 34,
        name: "Áo Khoác Nỉ",
        category: "Áo",
        description: "Áo khoác nỉ ấm áp, mềm mại, phù hợp mùa đông",
        price: 849000,
        rating: 4.7,
        featured: false,
        createdAt: "2025-01-11",
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop"
    },
    {
        id: 35,
        name: "Áo Sơ Mi Kẻ Sọc",
        category: "Áo",
        description: "Áo sơ mi kẻ sọc thanh lịch, phù hợp công sở",
        price: 649000,
        rating: 4.6,
        featured: false,
        createdAt: "2025-01-12",
        image: "https://images.unsplash.com/photo-1594938291221-94f313b4a18d?w=400&h=400&fit=crop"
    },
    {
        id: 36,
        name: "Áo Thun Tay Ngắn Cổ Tròn",
        category: "Áo",
        description: "Áo thun cơ bản, chất liệu cotton, nhiều màu",
        price: 199000,
        rating: 4.3,
        featured: false,
        createdAt: "2025-01-13",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop"
    },
    {
        id: 37,
        name: "Áo Khoác Thể Thao",
        category: "Áo",
        description: "Áo khoác thể thao có khóa kéo, tiện lợi",
        price: 749000,
        rating: 4.6,
        featured: false,
        createdAt: "2025-01-14",
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop"
    },
    {
        id: 38,
        name: "Áo Thun Dài Tay Cổ Tròn",
        category: "Áo",
        description: "Áo thun dài tay ấm áp, chất liệu cotton dày",
        price: 399000,
        rating: 4.5,
        featured: false,
        createdAt: "2025-01-15",
        image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=400&fit=crop"
    },
    {
        id: 39,
        name: "Áo Khoác Blazer",
        category: "Áo",
        description: "Áo khoác blazer thanh lịch, phù hợp công sở",
        price: 1499000,
        rating: 4.9,
        featured: false,
        createdAt: "2025-01-16",
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop"
    },
    {
        id: 40,
        name: "Áo Thun Cổ Tròn Tay Ngắn",
        category: "Áo",
        description: "Áo thun cơ bản, giá rẻ, chất lượng tốt",
        price: 179000,
        rating: 4.2,
        featured: false,
        createdAt: "2025-01-17",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop"
    },
    {
        id: 41,
        name: "Giày Dunk Low",
        category: "Giày",
        description: "Giày Dunk Low cổ điển, thiết kế đơn giản",
        price: 2499000,
        rating: 4.7,
        featured: false,
        createdAt: "2025-01-18",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop"
    },
    {
        id: 42,
        name: "Giày Dunk High",
        category: "Giày",
        description: "Giày Dunk High cổ cao, phong cách streetwear",
        price: 2799000,
        rating: 4.8,
        featured: false,
        createdAt: "2025-01-19",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop"
    },
    {
        id: 43,
        name: "Giày Killshot 2",
        category: "Giày",
        description: "Giày Killshot thiết kế tennis cổ điển",
        price: 2199000,
        rating: 4.6,
        featured: false,
        createdAt: "2025-01-20",
        image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop"
    },
    {
        id: 44,
        name: "Giày Cortez Classic",
        category: "Giày",
        description: "Giày Cortez biểu tượng, thiết kế năm 1972",
        price: 1999000,
        rating: 4.7,
        featured: false,
        createdAt: "2025-01-21",
        image: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=400&h=400&fit=crop"
    },
    {
        id: 45,
        name: "Giày Cortez Leather",
        category: "Giày",
        description: "Giày Cortez chất liệu da cao cấp",
        price: 2299000,
        rating: 4.8,
        featured: false,
        createdAt: "2025-01-22",
        image: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=400&h=400&fit=crop"
    },
    {
        id: 46,
        name: "Giày Air Jordan 1 Retro",
        category: "Giày",
        description: "Air Jordan 1 Retro phiên bản cổ điển",
        price: 4499000,
        rating: 4.9,
        featured: false,
        createdAt: "2025-01-23",
        image: "https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=400&h=400&fit=crop"
    },
    {
        id: 47,
        name: "Giày Air Jordan 1 Mid",
        category: "Giày",
        description: "Air Jordan 1 Mid cổ trung, phong cách hiện đại",
        price: 3999000,
        rating: 4.8,
        featured: false,
        createdAt: "2025-01-24",
        image: "https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=400&h=400&fit=crop"
    },
    {
        id: 48,
        name: "Giày Air Jordan 1 Low",
        category: "Giày",
        description: "Air Jordan 1 Low cổ thấp, linh hoạt",
        price: 3499000,
        rating: 4.7,
        featured: false,
        createdAt: "2025-01-25",
        image: "https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=400&h=400&fit=crop"
    },
    {
        id: 49,
        name: "Giày Air Force 1 '07",
        category: "Giày",
        description: "Air Force 1 phiên bản cổ điển năm 1982",
        price: 2299000,
        rating: 4.8,
        featured: false,
        createdAt: "2025-01-26",
        image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop"
    },
    {
        id: 50,
        name: "Giày Air Force 1 Low",
        category: "Giày",
        description: "Air Force 1 Low thiết kế tối giản",
        price: 1999000,
        rating: 4.7,
        featured: false,
        createdAt: "2025-01-27",
        image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop"
    },
    {
        id: 51,
        name: "Giày Air Force 1 High",
        category: "Giày",
        description: "Air Force 1 High cổ cao, bảo vệ mắt cá chân",
        price: 2499000,
        rating: 4.6,
        featured: false,
        createdAt: "2025-01-28",
        image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop"
    },
    {
        id: 52,
        name: "Giày Air Max 90",
        category: "Giày",
        description: "Air Max 90 với công nghệ đệm khí visible",
        price: 3199000,
        rating: 4.8,
        featured: false,
        createdAt: "2025-01-29",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop"
    },
    {
        id: 53,
        name: "Giày Air Max 270",
        category: "Giày",
        description: "Air Max 270 với đệm khí lớn nhất",
        price: 3499000,
        rating: 4.7,
        featured: false,
        createdAt: "2025-01-30",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop"
    },
    {
        id: 54,
        name: "Giày Air Max 97",
        category: "Giày",
        description: "Air Max 97 thiết kế đường ray tốc độ",
        price: 3799000,
        rating: 4.9,
        featured: false,
        createdAt: "2025-02-01",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop"
    },
    {
        id: 55,
        name: "Giày Blazer Mid",
        category: "Giày",
        description: "Blazer Mid thiết kế cổ điển năm 1973",
        price: 2699000,
        rating: 4.6,
        featured: false,
        createdAt: "2025-02-02",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop"
    },
    {
        id: 56,
        name: "Giày Blazer Low",
        category: "Giày",
        description: "Blazer Low cổ thấp, phong cách retro",
        price: 2399000,
        rating: 4.5,
        featured: false,
        createdAt: "2025-02-03",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop"
    },
    {
        id: 57,
        name: "Giày Vaporfly Next%",
        category: "Giày",
        description: "Vaporfly Next% cho vận động viên chạy bộ chuyên nghiệp",
        price: 5999000,
        rating: 4.9,
        featured: false,
        createdAt: "2025-02-04",
        image: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=400&h=400&fit=crop"
    },
    {
        id: 58,
        name: "Giày Vaporfly 3",
        category: "Giày",
        description: "Vaporfly 3 công nghệ carbon plate",
        price: 5499000,
        rating: 4.8,
        featured: false,
        createdAt: "2025-02-05",
        image: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=400&h=400&fit=crop"
    },
    {
        id: 59,
        name: "Giày Pegasus 40",
        category: "Giày",
        description: "Pegasus 40 giày chạy bộ đa năng",
        price: 2999000,
        rating: 4.7,
        featured: false,
        createdAt: "2025-02-06",
        image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop"
    },
    {
        id: 60,
        name: "Giày Pegasus Trail",
        category: "Giày",
        description: "Pegasus Trail cho địa hình gồ ghề",
        price: 3299000,
        rating: 4.6,
        featured: false,
        createdAt: "2025-02-07",
        image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop"
    }
];

// Shop by Icons data
const shoeIcons = [
    {
        id: 'dunk',
        name: 'Dunk',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
        filter: 'Dunk'
    },
    {
        id: 'killshot',
        name: 'Killshot',
        image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop',
        filter: 'Killshot'
    },
    {
        id: 'cortez',
        name: 'Cortez',
        image: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=400&h=400&fit=crop',
        filter: 'Cortez'
    },
    {
        id: 'air-jordan-1',
        name: 'Air Jordan 1',
        image: 'https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=400&h=400&fit=crop',
        filter: 'Air Jordan 1'
    },
    {
        id: 'air-force-1',
        name: 'Air Force 1',
        image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop',
        filter: 'Air Force 1'
    },
    {
        id: 'air-max',
        name: 'Air Max',
        image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400&h=400&fit=crop',
        filter: 'Air Max'
    },
    {
        id: 'blazer',
        name: 'Blazer',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
        filter: 'Blazer'
    },
    {
        id: 'vaporfly',
        name: 'Vaporfly',
        image: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=400&h=400&fit=crop',
        filter: 'Vaporfly'
    },
    {
        id: 'pegasus',
        name: 'Pegasus',
        image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop',
        filter: 'Pegasus'
    }
];

