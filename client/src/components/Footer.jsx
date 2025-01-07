import React from "react";

function Footer() {
  return (
    <footer className="py-10 px-4 text-gray-500 bg-white">
      <div className="max-w-screen-xl mx-auto">
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start space-y-8 lg:space-y-0 ">
          {/* Useful Links */}
          <div>
            <h3 className="font-bold text-lg text-black mb-4">Useful Links</h3>
            <ul className="space-y-2 cursor-pointer">
              <li>About</li>
              <li>Careers</li>
              <li>Blog</li>
              <li>Press</li>
              <li>Lead</li>
              <li>Value</li>
            </ul>
          </div>

          <div>
            <ul className="space-y-2 mt-11 cursor-pointer">
              <li>Privacy</li>
              <li>Terms</li>
              <li>FAQs</li>
              <li>Security</li>
              <li>Mobile</li>
              <li>Contact</li>
            </ul>
          </div>

          <div>
            <ul className="space-y-2 mt-11 cursor-pointer">
              <li>Partner</li>
              <li>Franchise</li>
              <li>Seller</li>
              <li>Warehouse</li>
              <li>Deliver</li>
              <li>Resources</li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-bold text-lg text-black mb-4">Categories <span className="text-green-600 text-md font-normal pl-5 ">see all</span></h3>
            <ul className="space-y-2 cursor-pointer">
              <li>Vegetables & Fruits</li>
              <li>Cold Drinks & Juices</li>
              <li>Bakery & Biscuits</li>
              <li>Dry Fruits, Masala & Oil</li>
              <li>Organic & Premium</li>
              <li>Pharma & Wellness</li>
              <li>Ice Creams & Frozen Desserts</li>
              <li>Beauty & Cosmetics</li>
              <li>Toys & Games</li>
            </ul>
          </div>

          <div>
            <ul className="space-y-2 mt-10 cursor-pointer">
              <li>Dairy & Breakfast</li>
              <li>Instant & Frozen Food</li>
              <li>Sweet Tooth</li>
              <li>Sauces & Spreads</li>
              <li>Paan Corner</li>
              <li>Cleaning Essentials</li>
              <li>Personal Care</li>
              <li>Electronics & Electricals</li>
              <li>Print Store</li>
            </ul>
          </div>

          <div>
            <ul className="space-y-2 mt-10 cursor-pointer">
              <li>Munchies</li>
              <li>Tea, Coffee & Health Drinks</li>
              <li>Atta, Rice & Dal</li>
              <li>Chicken, Meat & Fish</li>
              <li>Baby Care</li>
              <li>Home & Office</li>
              <li>Pet Care</li>
              <li>Books</li>
              <li>Navratri Specials</li>
            </ul>
          </div>
        </div>

        {/* Middle Section */}
        <div className="flex flex-col lg:flex-row items-center justify-center mt-10 space-y-6 lg:space-y-6 md:space-x-12">
          {/* © Blink Commerce Private Limited, 2016-2024 */}
          <div><p className="text-sm mt-6 lg:text-left"> © Blink Commerce Private Limited, 2016-2024</p></div>

          {/* Download App section */}
          <div className="flex space-x-3 items-center">
            <h3 className="font-bold text-md ml-6">Download App</h3>
            <img
              src="appStore.webp"
              alt="Google Play"
              className="h-7 cursor-pointer"
            />
            <img
              src="play-store.webp"
              alt="App Store"
              className="h-7 cursor-pointer"
            />
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-4">
            <a href="#" aria-label="Facebook">
              <img
                src="fb.svg"
                alt="Facebook"
                className="h-10"
              />
            </a>
            <a href="#" aria-label="Twitter">
              <img
                src="twitter.svg"
                alt="Twitter"
                className="h-10"
              />
            </a>
            <a href="#" aria-label="Instagram">
              <img
                src="insta.svg"
                alt="Instagram"
                className="h-10"
              />
            </a>
            <a href="#" aria-label="LinkedIn">
              <img
                src="linkedin.svg"
                alt="LinkedIn"
                className="h-10"
              />
            </a>
            <a href="#" aria-label="Thread">
              <img
                src="thread.svg"
                alt="Thread"
                className="h-10 rounded-full"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-8 text-center text-gray-600 text-sm">
        <p className="mt-2">
          “Blinkit” is owned & managed by "Blink Commerce Private Limited" and
          is not related, linked, or interconnected in whatsoever manner or
          nature, to “GROFR.COM” which is a real estate services business
          operated by “Redstone Consultancy Services Private Limited.”
        </p>
      </div>
    </footer>
  )
}

export default Footer;
