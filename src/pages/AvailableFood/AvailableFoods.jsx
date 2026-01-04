import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { AuthContext } from "../../Provider/AuthProvider";
import Loader from "../../utilities/Loader";
import { useContext } from "react";

const AvailableFoods = () => {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalData, setTotalData] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [sort, setSort] = useState("quantity_desc");
  const [searchValue, setSearchValue] = useState("");
  const [search, setSearch] = useState(searchValue);
  const [filters, setFilters] = useState({
    category: "",
    location: "",
  });
  const limit = 8;

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchValue);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [searchValue]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const res = await fetch(
        `https://plate-share-server-lilac.vercel.app/availableFoods?limit=${limit}&skip=${
          currentPage * limit
        }&sort=${sort}&search=${search}&category=${filters.category}&location=${
          filters.location
        }`
      );
      const data = await res.json();
      console.log(data)
      setData(data.result);
      setTotalData(data.total);
      const page = Math.ceil(data.total / limit);
      setTotalPage(page);
      setLoading(false);
    };
    loadData();
  }, [user, currentPage, sort, search, filters]);

  if (loading) {
    return <Loader />;
  }

  //Sort By Function
  const handleSorting = (e) => {
    setSort(e.target.value);
  };

  //Search Function
  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  //Filter Function
  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="mb-20">
      <h1 className="text-center font-bold text-white my-5 lg:my-10 text-2xl md:text-3xl lg:text-5xl">
        ALL FOODS
      </h1>
      
      {/* Search, Sort, Filter */}
      <div className="bg-white rounded-xl lg:mx-8 xl:mx-12 mx-3  p-4 md:p-6 shadow-sm border border-slate-200 mb-8 ">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

          <div className="text-slate-700 font-semibold text-lg">
            Total Foods: <span className="text-red-600">({totalData})</span>
          </div>

          {/* Search - Full width on mobile, auto width on desktop */}
          <div className="flex-1 max-w-md">
            <label htmlFor="search" className="block text-slate-700 font-semibold text-lg mb-2 lg:hidden">
              Search:
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-slate-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </svg>
              </div>
              <input
                id="search"
                onChange={handleSearch}
                value={searchValue}
                type="search"
                className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-xl"
                placeholder="Search"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            {/* Filter */}
            <div className="flex-1 min-w-0">
              <label className="block text-slate-700 font-semibold text-lg mb-2 lg:hidden">
                Filter:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <select
                  name="category"
                  onChange={handleFilterChange}
                  value={filters.category}
                  className="px-4 py-2.5 border border-slate-300 rounded-xl w-full"
                >
                  <option value="">Category</option>
                  <option value="Mutton_Kacchi">Mutton Kacchi</option>
                  <option value="Beef_Kacchi">Beef Kacchi</option>
                  <option value="Zorda">Zorda</option>
                  <option value="Chicken_Biriyani">Chicken Biriyani</option>
                  <option value="Tehari">Tehari</option>
                </select>

                <select
                  name="location"
                  onChange={handleFilterChange}
                  value={filters.location}
                  className="px-4 py-2.5 border border-slate-300 rounded-xl w-full"
                >
                  <option value="">Location</option>
                  <option value="Mirpur">Mirpur</option>
                  <option value="Badda">Badda</option>
                  <option value="Moghbazar">Moghbazar</option>
                  <option value="Khilgaon">Khilgaon</option>
                  <option value="Banasree">Banasree</option>
                  <option value="Rampura">Rampura</option>
                  <option value="Gulshan">Gulshan</option>
                  <option value="Banani">Banani</option>
                  <option value="Dhanmondi">Dhanmondi</option>
                  <option value="Uttara">Uttara</option>
                </select>
              </div>
            </div>

            {/* Sort */}
            <div className="flex-1 min-w-0">
              <label className="block text-slate-700 font-semibold text-lg mb-2 lg:hidden">
                Sort:
              </label>
              <select
                onChange={handleSorting}
                value={sort}
                className="px-4 py-2.5 border border-slate-300 rounded-xl w-full"
              >
                <option value="quantity_desc">Quantity: High - Low</option>
                <option value="quantity_asc">Quantity: Low - High</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-3 lg:p-5 xl:p-7 gap-6 lg:gap-8 py-5">
        {data.map((food) => (
          <div
            key={food._id}
            className="card bg-base-100 w-full lg:w-11/12 lg:mx-auto shadow-lg hover:shadow-2xl"
          >
            <figure className="p-7">
              <img
                className="w-full h-[150px] lg:h-[250px] rounded-4xl object-cover"
                src={food.foodImage}
                alt={food.foodName}
              />
            </figure>
            <div className="card-body px-10 mt-5">
              <div className="flex items-center gap-2">
                <div className="avatar">
                  <div className="ring-primary ring-offset-base-100 w-6 rounded-full ring-2 ring-offset-2">
                    <img src={food.donatorImage} alt={food.donatorName} />
                  </div>
                </div>
                <h1 className="font-bold text-xl">{food.donatorName}</h1>
              </div>
              <h2 className="card-title font-bold text-lg">{food.foodName}</h2>
              <h2 className="font-bold text-sm">Quantity: {food.quantity}</h2>
              <h2 className="font-bold text-sm">
                Expire Date: {food.expireDate}
              </h2>
              <h2 className="font-bold text-sm">
                Pickup Location: {food.pickupLocation}
              </h2>
              <div className="card-actions">
                <Link
                  to={`/availableFoods/${food._id}`}
                  className="btn bg-[#DC143C] text-white font-bold rounded-xl"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Page Number - Centered */}
      {totalPage > 1 && (
        <div className="flex justify-center items-center gap-2 mt-12">
          {currentPage > 0 && (
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 font-medium"
            >
              Previous
            </button>
          )}

          {[...Array(totalPage).keys()].map((index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              className={`w-10 h-10 rounded-lg font-medium ${
                index === currentPage
                  ? "bg-[#DC143C] text-white"
                  : "bg-white border border-slate-300 text-slate-700 hover:bg-slate-50"
              }`}
            >
              {index + 1}
            </button>
          ))}

          {currentPage < totalPage - 1 && (
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 font-medium"
            >
              Next
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default AvailableFoods;
