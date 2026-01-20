import { motion } from "framer-motion";

const volunteers = [
  {
    id: 1,
    name: "Rahim Ahmed",
    role: "Food Delivery Volunteer",
    location: "Dhaka",
    image: "https://i.ibb.co.com/BVZ7jrrX/13.png",
  },
  {
    id: 2,
    name: "Nusrat Jahan",
    role: "Food Safety Coordinator",
    location: "Mirpur",
    image: "https://i.ibb.co.com/4nM13p0G/7.jpg",
  },
  {
    id: 3,
    name: "Tanvir Hasan",
    role: "Food Pickup Volunteer",
    location: "Uttara",
    image: "https://i.ibb.co.com/rGhv6Z24/16.png",
  },
  {
    id: 4,
    name: "Farida Akter",
    role: "Community Support Volunteer",
    location: "Gulshan",
    image: "https://i.ibb.co.com/JVwntVn/10.png",
  }
];

export default function VolunteerSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#DC143C] mb-4">
            Meet Our Volunteers
          </h2>
          <p className="text-gray-700 max-w-2xl mx-auto text-lg">
            Our volunteers play a vital role in connecting donors and recipients
            by helping with food pickup, delivery, and community support.
          </p>
        </div>

        {/* Volunteer Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {volunteers.map((volunteer, index) => (
            <motion.div
              key={volunteer.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300 p-6 text-center"
            >
              <img
                src={volunteer.image}
                alt={volunteer.name}
                className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-2 border-[#DC143C]"
              />
              <h3 className="text-lg font-semibold text-gray-800">{volunteer.name}</h3>
              <p className="text-sm font-medium text-[#DC143C] mt-1">
                {volunteer.role}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Location: {volunteer.location}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <button className="px-8 py-3 bg-[#DC143C] text-white rounded-lg hover:bg-[#b81232] hover:cursor-pointer transition-colors duration-300 shadow-md hover:shadow-lg font-medium">
            Become a Volunteer
          </button>
        </div>
      </div>
    </section>
  );
}
