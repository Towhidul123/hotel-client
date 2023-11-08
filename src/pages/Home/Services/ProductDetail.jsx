import React, { useContext, useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useParams } from 'react-router-dom';

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from '../../../providers/AuthProvider';
import Swal from 'sweetalert2';
import ReviewComponent from '../../Review/ReviewComponent';

const ProductDetail = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    

    const [startDate, setStartDate] = useState(null);

    const { user } = useContext(AuthContext)

    const email = user.email;
    const [reviews, setReviews] = useState([]);

    const [reviewData, setReviewData] = useState({ username: '', rating: '', comment: '' });

    const handleReviewSubmit = (e) => {
        e.preventDefault();

        fetch('https://y-eight-pi-68.vercel.app/reviews', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                roomId: _id,
                username: reviewData.username,
                rating: reviewData.rating,
                comment: reviewData.comment,
                timestamp: new Date().toISOString(),
            }),
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    // Review added successfully, update the state or show a success message
                    setReviewData({ username: '', rating: '', comment: '' });
                    // Optionally, fetch and update the list of reviews for this room
                }
            });
    };



    useEffect(() => {
        console.log('Fetching data for productId:', productId);
        fetch(`https://y-eight-pi-68.vercel.app/products/${productId}`)
            .then(res => res.json())
            .then(data => {
                setProduct(data);
                fetch(`https://y-eight-pi-68.vercel.app/reviews?roomId=${data._id}`)
                    .then(res => res.json())
                    .then(reviewsData => setReviews(reviewsData));
            })
            .catch(error => console.error('Error fetching data:', error));
    }, [productId]);

    if (!product) {
        return <div>Loading...</div>;
    }
    const { _id, special_offers, availability, room_size, price_per_night, room_images, description, room_count } = product;

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
            const productCart = { special_offers, availability, room_size, price_per_night, room_images, description, formattedDate, email, room_count };

            fetch("https://y-eight-pi-68.vercel.app/addToCart", {
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
                fetch(`https://y-eight-pi-68.vercel.app/updateRoomAvailability/${_id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        roomCount: room_count - 1,
                        availability: room_count > 1 ? 'available' : 'unavailable',
                    }),
                })
                .then(res => res.json())
                .then(data => {
                    if (data.ok) {
                        handleAddToCart();
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "No Room Available!",
                            });    }
                });
            }
        });
    };


    return (


        <div >
            <div className='flex justify-center items-center'>

                <DatePicker selected={startDate} placeholderText="Pick a date" onChange={(date) => setStartDate(date)} />
                <div>
                    No.of rooms left:{room_count}
                </div>
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
                        Book Now
                    </button>

                </div>


            </div>

            <div className='p-10'>
            <h3 className='text-center text-3xl'>Reviews</h3>
            <div className=' flex justify-center items-center'>
                
                {reviews.map(review => (
                    <ReviewComponent
                        key={review._id}
                        username={review.username}
                        rating={review.rating}
                        comment={review.comment}
                        timestamp={review.timestamp}
                    />
                ))}
            </div>
            </div>        
            <div className='p-10 flex justify-center items-center flex-col'>
   
    <h3 className='text-3xl'>Submit a Review</h3>
    
    <form  onSubmit={handleReviewSubmit} className=" flex flex-col items-center ">
        <input
            type="text"
            placeholder="Username"
            value={reviewData.username}
            onChange={(e) => setReviewData({ ...reviewData, username: e.target.value })}
            required
        />
        <input
            type="number"
            placeholder="Rating"
            value={reviewData.rating}
            onChange={(e) => setReviewData({ ...reviewData, rating: e.target.value })}
            required
        />
        <textarea
            placeholder="Comment"
            value={reviewData.comment}
            onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })}
            required
        />
        <button type="submit">Submit Review</button>
    </form>
</div>



        </div>
    );
};

export default ProductDetail;
