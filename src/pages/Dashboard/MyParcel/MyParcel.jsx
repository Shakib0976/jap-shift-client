import React from 'react';
import UseAuth from '../../../hooks/UseAuth';
import UseAxiosSecure from '../../../hooks/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const MyParcel = () => {



    const { user } = UseAuth();
    const axiosSecure = UseAxiosSecure();
    const { data: parcels = []} = useQuery({
        queryKey: ['my-parcels', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user.email}`);
            return res.data;
        }
    })

    console.log(parcels);

    const formatDate = (iso) => {
        return new Date(iso).toLocaleString(); // Format: "6/22/2025, 3:11:31 AM"
    };

    return (
        <div className="overflow-x-auto shadow-md rounded-xl">
            <table className="table table-zebra w-full">
                <thead className="bg-base-200 text-base font-semibold">
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Type</th>
                        <th>Created At</th>
                        <th>Cost</th>
                        <th>Payment</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {parcels.map((parcel, index) => (
                        <tr key={parcel._id}>
                            <td>{index + 1}</td>
                            <td className="max-w-[180px] truncate">{parcel.title}</td>
                            <td className="capitalize">{parcel.type}</td>
                            <td>{formatDate(parcel.creation_date)}</td>
                            <td>৳{parcel.cost}</td>
                            <td>
                                <span
                                    className={`badge ${parcel.payment_status === "paid"
                                        ? "badge-success"
                                        : "badge-error"
                                        }`}
                                >
                                    {parcel.payment_status}
                                </span>
                            </td>
                            <td className="space-x-2">
                                <button
                                    // onClick={() => handleView(parcel._id)}
                                    className="btn btn-xs btn-outline"
                                >
                                    View
                                </button>
                                {parcel.payment_status === "unpaid" && (
                                    <button
                                        // onClick={() => handlePay(parcel._id)}
                                        className="btn btn-xs btn-primary text-black"
                                    >
                                        Pay
                                    </button>
                                )}
                                <button
                                    // onClick={() => handleDelete(parcel._id)}
                                    className="btn btn-xs btn-error"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    {parcels.length === 0 && (
                        <tr>
                            <td colSpan="6" className="text-center text-gray-500 py-6">
                                No parcels found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default MyParcel;