import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import UseAuth from "../../hooks/UseAuth";
import { useLoaderData } from "react-router";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";

// Helper function to generate a unique tracking ID
const generateTrackingID = () => {
    const date = new Date();
    const datePart = date.toISOString().split("T")[0].replace(/-/g, ""); // Format: YYYYMMDD
    const rand = Math.random().toString(36).substring(2, 7).toUpperCase(); // Random 5-character alphanumeric
    return `PCL-${datePart}-${rand}`; // Example: PCL-20250703-ABCDE
};

const SendParcel = () => {


    const axiosSecure = UseAxiosSecure();








    // Initialize react-hook-form
    const {
        register,         // Used to register input fields
        handleSubmit,     // Handles form submission
        watch,            // Watches field values for conditional logic
        formState: { errors }, // Captures form validation errors
    } = useForm();

    const serviceCenters = useLoaderData(); // Load service center data via React Router loader

    // Display loading state if service center data hasn't loaded yet
    if (!serviceCenters) {
        return <div className="text-center p-8 text-lg">Loading service centers...</div>;
    }

    // Get unique regions from the service center data
    const uniqueRegions = [...new Set(serviceCenters.map((w) => w.region))];

    // Helper function to get districts based on selected region
    const getDistrictsByRegion = (region) =>
        serviceCenters.filter((w) => w.region === region).map((w) => w.district);

    const { user } = UseAuth(); // Get the current logged-in user

    // Watch specific fields for conditional logic
    const parcelType = watch("type");
    const senderRegion = watch("sender_region");
    const receiverRegion = watch("receiver_region");

    // Handle form submission
    const onSubmit = (data) => {
        const weight = parseFloat(data.weight) || 0; // Convert weight to number
        const isSameDistrict = data.sender_center === data.receiver_center;

        // Cost calculation logic
        let baseCost = 0;
        let extraCost = 0;
        let breakdown = "";

        if (data.type === "document") {
            baseCost = isSameDistrict ? 60 : 80;
            breakdown = `Document delivery ${isSameDistrict ? "within" : "outside"} the district.`;
        } else {
            if (weight <= 3) {
                baseCost = isSameDistrict ? 110 : 150;
                breakdown = `Non-document up to 3kg ${isSameDistrict ? "within" : "outside"} the district.`;
            } else {
                const extraKg = weight - 3;
                const perKgCharge = extraKg * 40;
                const districtExtra = isSameDistrict ? 0 : 40;
                baseCost = isSameDistrict ? 110 : 150;
                extraCost = perKgCharge + districtExtra;

                breakdown = `
        Non-document over 3kg ${isSameDistrict ? "within" : "outside"} the district.<br/>
        Extra charge: ৳40 x ${extraKg.toFixed(1)}kg = ৳${perKgCharge}<br/>
        ${districtExtra ? "+ ৳40 extra for outside district delivery" : ""}
      `;
            }
        }

        const totalCost = baseCost + extraCost;

        // Show cost breakdown using SweetAlert
        Swal.fire({
            title: "Delivery Cost Breakdown",
            icon: "info",
            html: `
      <div class="text-left text-base space-y-2">
        <p><strong>Parcel Type:</strong> ${data.type}</p>
        <p><strong>Weight:</strong> ${weight} kg</p>
        <p><strong>Delivery Zone:</strong> ${isSameDistrict ? "Within Same District" : "Outside District"}</p>
        <hr class="my-2"/>
        <p><strong>Base Cost:</strong> ৳${baseCost}</p>
        ${extraCost > 0 ? `<p><strong>Extra Charges:</strong> ৳${extraCost}</p>` : ""}
        <div class="text-gray-500 text-sm">${breakdown}</div>
        <hr class="my-2"/>
        <p class="text-xl font-bold text-green-600">Total Cost: ৳${totalCost}</p>
      </div>
    `,
            showDenyButton: true,
            confirmButtonText: "💳 Proceed to Payment",
            denyButtonText: "✏️ Continue Editing",
            confirmButtonColor: "#16a34a",
            denyButtonColor: "#d3d3d3",
            customClass: {
                popup: "rounded-xl shadow-md px-6 py-6",
            },
        }).then((result) => {
            if (result.isConfirmed) {
                // If user confirms, prepare parcel data
                const parcelData = {
                    ...data,
                    cost: totalCost,
                    created_by: user.email,
                    payment_status: 'unpaid',
                    delivery_status: 'not_collected',
                    creation_date: new Date().toISOString(),
                    tracking_id: generateTrackingID(),
                };

                // You can send parcelData to backend or redirect to payment
                console.log("Ready for payment:", parcelData);



                // send data to the server

                axiosSecure.post('/parcels', parcelData)
                    .then(res => {
                        console.log(res.data);

                        if (res.data.insertedId) {
                            // TODO: redirect to a payment page 
                            Swal.fire({
                                title: "Redirecting...",
                                text: "Proceeding to payment gateway.",
                                icon: "success",
                                timer: 1500,
                                showConfirmButton: false,
                            });
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })


            }
        });
    };

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Header */}
                <div className="text-center">
                    <h2 className="text-3xl font-bold">Send a Parcel</h2>
                    <p className="text-gray-500">Fill in the details below</p>
                </div>

                {/* Parcel Info Section */}
                <div className="border p-4 rounded-xl shadow-md space-y-4">
                    <h3 className="font-semibold text-xl">Parcel Info</h3>

                    {/* Parcel Name Input */}
                    <div>
                        <label className="label">Parcel Name</label>
                        <input
                            {...register("title", { required: true })}
                            className="input input-bordered w-full"
                            placeholder="Describe your parcel"
                        />
                        {errors.title && <p className="text-red-500 text-sm">Parcel name is required</p>}
                    </div>

                    {/* Parcel Type Radio Buttons */}
                    <div>
                        <label className="label">Type</label>
                        <div className="flex gap-4">
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    value="document"
                                    {...register("type", { required: true })}
                                    className="radio"
                                />
                                Document
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    value="non-document"
                                    {...register("type", { required: true })}
                                    className="radio"
                                />
                                Non-Document
                            </label>
                        </div>
                        {errors.type && <p className="text-red-500 text-sm">Type is required</p>}
                    </div>

                    {/* Weight Input (only enabled for non-document) */}
                    <div>
                        <label className="label">Weight (kg)</label>
                        <input
                            type="number"
                            step="0.1"
                            {...register("weight")}
                            disabled={parcelType !== "non-document"}
                            className={`input input-bordered w-full ${parcelType !== "non-document" ? "bg-gray-100 cursor-not-allowed" : ""}`}
                            placeholder="Enter weight"
                        />
                    </div>
                </div>

                {/* Sender and Receiver Info */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Sender Info Section */}
                    <div className="border p-4 rounded-xl shadow-md space-y-4">
                        <h3 className="font-semibold text-xl">Sender Info</h3>
                        <div className="grid grid-cols-1 gap-4">
                            <input {...register("sender_name", { required: true })} className="input input-bordered w-full" placeholder="Name" />
                            <input {...register("sender_contact", { required: true })} className="input input-bordered w-full" type="number" placeholder="Contact" />
                            <select {...register("sender_region", { required: true })} className="select select-bordered w-full">
                                <option value="">Select Region</option>
                                {uniqueRegions.map((region) => (
                                    <option key={region} value={region}>{region}</option>
                                ))}
                            </select>
                            <select {...register("sender_center", { required: true })} className="select select-bordered w-full">
                                <option value="">Select Service Center</option>
                                {getDistrictsByRegion(senderRegion).map((district) => (
                                    <option key={district} value={district}>{district}</option>
                                ))}
                            </select>
                            <input {...register("sender_address", { required: true })} className="input input-bordered w-full" placeholder="Address" />
                            <textarea {...register("pickup_instruction", { required: true })} className="textarea textarea-bordered w-full" placeholder="Pickup Instruction" />
                        </div>
                    </div>

                    {/* Receiver Info Section */}
                    <div className="border p-4 rounded-xl shadow-md space-y-4">
                        <h3 className="font-semibold text-xl">Receiver Info</h3>
                        <div className="grid grid-cols-1 gap-4">
                            <input {...register("receiver_name", { required: true })} className="input input-bordered w-full" placeholder="Name" />
                            <input {...register("receiver_contact", { required: true })} className="input input-bordered w-full" type="number" placeholder="Contact" />
                            <select {...register("receiver_region", { required: true })} className="select select-bordered w-full">
                                <option value="">Select Region</option>
                                {uniqueRegions.map((region) => (
                                    <option key={region} value={region}>{region}</option>
                                ))}
                            </select>
                            <select {...register("receiver_center", { required: true })} className="select select-bordered w-full">
                                <option value="">Select Service Center</option>
                                {getDistrictsByRegion(receiverRegion).map((district) => (
                                    <option key={district} value={district}>{district}</option>
                                ))}
                            </select>
                            <input {...register("receiver_address", { required: true })} className="input input-bordered w-full" placeholder="Address" />
                            <textarea {...register("delivery_instruction", { required: true })} className="textarea textarea-bordered w-full" placeholder="Delivery Instruction" />
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="text-center">
                    <button className="btn btn-primary text-black">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default SendParcel;
