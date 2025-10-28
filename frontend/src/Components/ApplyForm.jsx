import { useState } from "react";

export default function ApplyForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    pincode: "",
    employment: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name) newErrors.name = "Full Name is required";
    if (!formData.name) newErrors.email = "Email is required";
    if (!formData.mobile) newErrors.mobile = "Mobile number is required";
    if (!formData.pincode) newErrors.pincode = "Pincode is required";
    if (!formData.employment) newErrors.employment = "Employment type is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert("Form submitted!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-md rounded-2xl w-full max-w-4xl p-8">
        <div className="bg-yellow-400 text-center py-3 rounded-t-xl font-semibold text-lg -mt-8 mb-6 shadow-sm">
          Apply Online
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-3 gap-4">
            {/* Full Name */}
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Mobile Number *"
                className={`w-full border ${
                  errors.name ? "border-red-500" : "border-gray-300"
                } rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400`}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>
            {/* Email */}
            <div>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="John@gmail.com*"
                className={`w-full border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>
            {/* Mobile Number */}
            <div>
              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Mobile Number *"
                className={`w-full border ${
                  errors.mobile ? "border-red-500" : "border-gray-300"
                } rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400`}
              />
              {errors.mobile && (
                <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>
              )}
            </div>

            {/* Pincode */}
            <div>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                placeholder="Pincode(Current Address) *"
                className={`w-full border ${
                  errors.pincode ? "border-red-500" : "border-gray-300"
                } rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400`}
              />
              {errors.pincode && (
                <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>
              )}
            </div>

            {/* Employment Type */}
            <div>
              <select
                name="employment"
                value={formData.employment}
                onChange={handleChange}
                className={`w-full border ${
                  errors.employment ? "border-red-500" : "border-gray-300"
                } rounded-md p-3 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400`}
              >
                <option value="">Employment Type *</option>
                <option value="salaried">Salaried</option>
                <option value="self-employed">Self Employed</option>
              </select>
              {errors.employment && (
                <p className="text-red-500 text-xs mt-1">{errors.employment}</p>
              )}
            </div>
          </div>

          {/* Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-gray-200 text-gray-600 font-medium rounded-md py-3 px-12 hover:bg-yellow-400 hover:text-black transition"
            >
              Apply Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
