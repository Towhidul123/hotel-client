import React, { useContext, useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useParams } from 'react-router-dom';

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from '../../../providers/AuthProvider';

const ProductDetail = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);

    const [startDate, setStartDate] = useState(null);

    const { user} = useContext(AuthContext)

    const email = user.email;


    useEffect(() => {
        console.log('Fetching data for productId:', productId);
        fetch(`http://localhost:5000/products/${productId}`)
            .then(res => res.json())
            .then(data => setProduct(data))
            .catch(error => console.error('Error fetching data:', error));
    }, [productId]);

    if (!product) {
        return <div>Loading...</div>;
    }

    const {_id, special_offers, availability, room_size, price_per_night, room_images, description } = product;
   
  //  console.log(product);
 //   console.log(productCart);


 const handleAddToCart = () => {
    if (startDate) {
        // Convert startDate to ISO string and extract year, month, and date
        const isoDate = startDate.toISOString();
        const year = isoDate.substring(0, 4);
        const month = isoDate.substring(5, 7);
        const day = isoDate.substring(8, 10);

        const formattedDate = `${year}-${month}-${day}`;

        // Use formattedDate in your request
        const productCart = { special_offers, availability, room_size, price_per_night, room_images, description, formattedDate, email};

        fetch("http://localhost:5000/addToCart", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(productCart),
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.insertedId) {
                toast.success('Successfully Added!');
            }
        });
    } else {
        // Handle case where startDate is null (not selected)
        console.error('startDate is null. Please select a date.');
    }
};
    const handleBookNow = () => {
        Swal.fire({
            title: "Are you sure?",
            html: `
            You are about to book this room.<br/>
            Price: ${product.price_per_night}<br/>
            Room Size: ${product.room_size}<br/>
            Room Type: ${product.description}
        `,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Book Now"
        }).then((result) => {
            if (result.isConfirmed) {
                handleAddToCart();
            }
        });
    };


    return (


        <div >
            <div className='flex justify-center items-center'>

                <DatePicker selected={startDate} placeholderText="Pick a date" onChange={(date) => setStartDate(date)} />

            </div>
            <div className='flex justify-center items-center p-10'>
                {/* <h1>{product.name}</h1> */}

                <Toaster position="top-right" reverseOrder={false}
                />

                <div className=" flex flex-col text-gray-700 bg-blue-gray-100 shadow-md w-96 rounded-xl bg-clip-border " data-aos="zoom-in">
                    <div className=" overflow-hidden text-white shadow-lg rounded-xl bg-blue-gray-500 bg-clip-border shadow-blue-gray-500/40 object-cover">
                        <img className="aspect-video h-full w-full object-cover rounded-tr-lg rounded-tl-lg md:rounded-bl-lg md:rounded-tr-none " src={product.room_images} alt="" />
                    </div>
                    <div className="p-4">
                        <h5 className="flex justify-between  mb-2  text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                            <div>
                                Price:  {product.price_per_night}
                            </div>
                            <div>
                                Room Size: {product.room_size}
                            </div>
                        </h5>
                        <h5 className="block mb-2  text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                            {product.description}

                        </h5>

                        <h5 className="block mb-2  text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                            {product.special_offers}
                        </h5>

                        <h5 className="block mb-2  text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                            Room Status: {product.availability}
                        </h5>

                    </div>


                    <button
                        className="select-none rounded-lg bg-pink-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button"
                        data-ripple-light="true"
                        onClick={handleBookNow}


                        disabled={!startDate}




                    >
                        Add to Cart
                    </button>

                </div>


            </div>




        </div>
    );
};

export default ProductDetail;
