export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#FFB6C1] to-[#FFDEE9] text-center py-12">
        <h1 className="text-4xl font-bold text-gray-900">Welcome to Multi-Vendor Store</h1>
        <p className="text-lg text-gray-700 mt-4">Find the best products from top-rated vendors at unbeatable prices.</p>
        <button className="mt-6 px-6 py-3 bg-[#FF4500] text-white rounded-lg text-lg hover:bg-[#E63900] transition">Start Shopping</button>
      </div>

      {/* Categories Section */}
      <div className="py-10 px-6">
        <h2 className="text-2xl font-semibold text-gray-800 text-center">Shop by Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <div className="bg-[#D2E8E3] rounded-lg p-4 text-center shadow hover:shadow-lg">
            <img src="/images/home-category.png" alt="Home" className="mx-auto w-16 h-16" />
            <h3 className="text-lg font-medium mt-2">Home</h3>
          </div>
          <div className="bg-[#FFDAB9] rounded-lg p-4 text-center shadow hover:shadow-lg">
            <img src="/images/kitchen-category.png" alt="Kitchen" className="mx-auto w-16 h-16" />
            <h3 className="text-lg font-medium mt-2">Kitchen</h3>
          </div>
          <div className="bg-[#E6E6FA] rounded-lg p-4 text-center shadow hover:shadow-lg">
            <img src="/images/fashion-category.png" alt="Fashion" className="mx-auto w-16 h-16" />
            <h3 className="text-lg font-medium mt-2">Fashion</h3>
          </div>
          <div className="bg-[#FFDEAD] rounded-lg p-4 text-center shadow hover:shadow-lg">
            <img src="/images/sports-category.png" alt="Sports" className="mx-auto w-16 h-16" />
            <h3 className="text-lg font-medium mt-2">Sports</h3>
          </div>
        </div>
      </div>

      {/* Call-to-Action Section */}
      <div className="bg-[#FAF3DD] py-12 text-center">
        <h2 className="text-3xl font-bold text-gray-900">Ready to Discover Amazing Deals?</h2>
        <p className="text-lg text-gray-700 mt-4">Join now and start exploring the best products from top vendors.</p>
        <button className="mt-6 px-6 py-3 bg-[#32CD32] text-white rounded-lg text-lg hover:bg-[#2E8B57] transition">Join Now</button>
      </div>
    </div>
  );
}
