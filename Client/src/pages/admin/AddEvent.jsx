import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";

const AddEvent = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        eventName: "",
        description: "",
        venue: "",
        category: "",        
        date: "",
        timeFrom: "",
        timeTo: "",
        eventCoordinator: "",
        price: 0,
        lat: "",
        lng: "",
    });
    const [imageFile, setImageFile] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const data = new FormData();

    // append only text fields
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    // append image separately
    if (imageFile) {
      data.append("image", imageFile); // ✅ correct
    }

    await API.post("/admin/events", data);

    alert("Event Added Successfully ✅");
    navigate("/admin/events");
  } catch (err) {
    console.log(err);
    alert("Error adding event ❌");
  }
};
    return (
        <div className="min-h-screen bg-gray-100 p-6 mt-10 pt-10">
            <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-8">
                <h2 className="text-3xl font-bold mb-8 text-center">
                    Add New Event
                </h2>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* LEFT COLUMN */}
                    <div className="space-y-4">
                        <input
                            type="text"
                            name="eventName"
                            placeholder="Event Name"
                            value={formData.eventName}
                            onChange={handleChange}
                            className="w-full border p-3 rounded-lg"
                            required
                        />

                        <textarea
                            name="description"
                            placeholder="Description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full border p-3 rounded-lg"
                            rows="4"
                        />

                        <input
                            type="text"
                            name="venue"
                            placeholder="Venue"
                            value={formData.venue}
                            onChange={handleChange}
                            className="w-full border p-3 rounded-lg"
                        />

                        <input
                            type="text"
                            name="eventCoordinator"
                            placeholder="Event Coordinator"
                            value={formData.eventCoordinator}
                            onChange={handleChange}
                            className="w-full border p-3 rounded-lg"
                        />

                        <input
                            type="text"
                            name="category"
                            placeholder="Category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full border p-3 rounded-lg"
                        />
                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="space-y-4">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImageFile(e.target.files[0])}
                            className="w-full border p-3 rounded-lg"
                        />

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                className="border p-3 rounded-lg"
                                required
                            />

                            <input
                                type="time"
                                name="timeFrom"
                                value={formData.timeFrom}
                                onChange={handleChange}
                                className="border p-3 rounded-lg"
                            />

                            <input
                                type="time"
                                name="timeTo"
                                value={formData.timeTo}
                                onChange={handleChange}
                                className="border p-3 rounded-lg"
                            />
                        </div>

                        <input
                            type="text"
                            name="price"
                            placeholder="Price"
                            value={formData.price}
                            onChange={handleChange}
                            className="w-full border p-3 rounded-lg"
                        />

                        <div className="grid grid-cols-2 gap-3">
                            <input
                                type="text"
                                name="lat"
                                placeholder="Latitude"
                                value={formData.lat}
                                onChange={handleChange}
                                className="border p-3 rounded-lg"
                            />

                            <input
                                type="text"
                                name="lng"
                                placeholder="Longitude"
                                value={formData.lng}
                                onChange={handleChange}
                                className="border p-3 rounded-lg"
                            />
                        </div>
                    </div>

                 
                    <div className="md:col-span-2 flex justify-between mt-6">
                        <button
                            type="submit"
                            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
                        >
                            Add Event
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddEvent;
