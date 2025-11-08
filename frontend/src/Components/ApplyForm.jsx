import { useState } from "react";

export default function ApplyForm({
  onClose,
  isModal = true,
  insuranceOptions,
  emailTo = "Info@smrfinserv.com",
  formTitle = "Apply Online",
  subject = "New Insurance Application",
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    insuranceType: "",
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
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.mobile) newErrors.mobile = "Mobile number is required";
    if (insuranceOptions && !formData.insuranceType)
      newErrors.insuranceType = "Insurance type is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const { name, email, mobile, insuranceType } =
        formData;
      let body = `
        Name: ${name}
        Email: ${email}
        Mobile: ${mobile}
      `;

      if (insuranceOptions && insuranceType) {
        body += `\nInsurance Type: ${insuranceType}`;
      }

      window.location.href = `mailto:${emailTo}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;
    }
  };

  const formContent = (
    <div className="bg-white shadow-md rounded-2xl w-full max-w-4xl p-8 relative">
      {isModal && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl"
        >
          &times;
        </button>
      )}
      <div className="bg-blue-600 text-center  text-white py-3 rounded-t-xl font-semibold text-lg -mt-8 mb-6 shadow-sm">
        {formTitle}
      </div>

      <form className="space-y-6">
        <div className="grid md:grid-cols-3 gap-4">
          {/* Full Name */}
          <div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
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
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {/* Insurance Type */}
          {insuranceOptions && (
            <div>
              <select
                name="insuranceType"
                value={formData.insuranceType}
                onChange={handleChange}
                className={`w-full border ${
                  errors.insuranceType ? "border-red-500" : "border-gray-300"
                } rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400`}
              >
                <option value="">Select Insurance Type</option>
                {insuranceOptions.map((option) => (
                  <option
                    key={option}
                    value={option.toUpperCase().replace(/ /g, "_")}
                  >
                    {option}
                  </option>
                ))}
              </select>
              {errors.insuranceType && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.insuranceType}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Button */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-blue-600 font-medium text-white  rounded-md py-3 px-12 hover:bg-blue-400 hover:text-black transition"
          >
            Apply Now
          </button>
        </div>
      </form>
    </div>
  );

  return isModal ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {formContent}
    </div>
  ) : (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      {formContent}
    </div>
  );
}
