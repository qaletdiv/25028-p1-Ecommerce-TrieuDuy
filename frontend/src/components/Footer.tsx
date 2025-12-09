import React, { useState, useCallback, memo } from 'react';
import { Facebook, Twitter, Instagram, Youtube, Mail } from 'lucide-react';

export const Footer = memo(function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 3000);
    }
  }, [email]);

  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }, []);

  return (
    <footer className="bg-white dark:bg-gray-900 text-black dark:text-white">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg mb-4 font-bold">Về GayHub</h3>
            <p className="text-sm text-black/60 dark:text-gray-400 leading-relaxed">
              Điểm đến đáng tin cậy của bạn cho các sản phẩm giày dép và phong cách sống cao cấp. Đảm bảo chất lượng, phong cách và sự hài lòng của khách hàng.
            </p>
          </div>

          {/* Shop Section */}
          <div>
            <h3 className="text-lg mb-4 font-bold">Mua Sắm</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-black/60 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                  Tất Cả Sản Phẩm
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-black/60 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                  Bán Chạy Nhất
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-black/60 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                  Hàng Mới Về
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-black/60 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                  Ưu Đãi Đặc Biệt
                </a>
              </li>
            </ul>
          </div>

          {/* Help Section */}
          <div>
            <h3 className="text-lg mb-4 font-bold">Hỗ Trợ</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-black/60 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                  Liên Hệ
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-black/60 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                  Thông Tin Vận Chuyển
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-black/60 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                  Đổi Trả & Hoàn Tiền
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-black/60 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                  Câu Hỏi Thường Gặp
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div>
            <h3 className="text-lg mb-4 font-bold">Bản Tin</h3>
            <p className="text-sm text-black/60 dark:text-gray-400 mb-4">
              Đăng ký để nhận ưu đãi độc quyền và cập nhật
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-black/40 dark:text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Email của bạn"
                  required
                  className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-black dark:text-white placeholder-gray-500"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-black dark:bg-orange-600 text-white hover:bg-gray-800 dark:hover:bg-orange-700 rounded-lg transition-colors font-medium"
              >
                {subscribed ? 'Đã Đăng Ký! ✓' : 'Đăng Ký'}
              </button>
            </form>
          </div>
        </div>

        {/* Social Media & Bottom Bar */}
        <div className="border-t border-gray-300 dark:border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Social Icons */}
            <div className="flex items-center space-x-4">
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-blue-600 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 text-black dark:text-white" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-blue-400 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5 text-black dark:text-white" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-pink-600 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-black dark:text-white" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-red-600 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5 text-black dark:text-white" />
              </a>
            </div>

            {/* Copyright & Legal */}
            <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-black/60 dark:text-gray-400">
              <span>© 2025 GayHub. Bảo lưu mọi quyền.</span>
              <div className="flex items-center gap-4">
                <a href="#" className="hover:text-black dark:hover:text-white transition-colors">
                  Chính Sách Bảo Mật
                </a>
                <a href="#" className="hover:text-black dark:hover:text-white transition-colors">
                  Điều Khoản Dịch Vụ
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
});