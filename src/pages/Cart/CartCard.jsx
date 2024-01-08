import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Toaster, toast } from 'react-hot-toast';


const CartCard = ({ card, handleDelete, handleBookingConfirm, handleUpdateDate }) => {

    const { _id, special_offers, availability, room_size, price_per_night, room_images, description, formattedDate, email } = card;

    const [newDate, setNewDate] = useState('');

    const handleDateChange = (e) => {
        setNewDate(e.target.value);
    }
    

    const handleUpdateDateClick = () => {
        if (newDate) {
            handleUpdateDate(_id, newDate);
            setNewDate(''); // Reset the date input after updating

            toast.success('Date updated successfully!', {
                duration: 3000,
                position: 'bottom-right',
            });

        }
        else toast.error('Please select the Date first!', {
            duration: 3000,
            position: 'bottom-left',
        });


    }


    return (

        <div className='flex justify-center items-center p-10' >
            <Toaster />
           
            <div className=" flex flex-col text-gray-700 bg-blue-gray-100 shadow-md w-96 rounded-xl bg-clip-border" data-aos="zoom-in" >
                <div className="flex items-center justify-center">
                    <div className="relative flex w-[312px] md:w-72 lg:w-96 flex-col rounded-xl  ">
                        <div className="relative  h-48 overflow-hidden rounded-xl ">
                            <img className="aspect-video h-full w-full object-cover rounded-tr-lg rounded-tl-lg md:rounded-bl-lg md:rounded-tr-none " src={room_images} alt="" />
                            {/* <img className="object-cover w-full h-full " src={image} alt="" /> */}
                        </div>


                        <div className='space-y-2'>
                            <div className='mt-2 '>

                                <button
                                    onClick={() => handleDelete(_id)}
                                    className="flex items-center justify-center w-full select-none rounded-lg bg-pink-500 py-3 px-6 text-center font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                    type="button"
                                    data-ripple-light="true"
                                    style={{ textAlign: 'center' }}
                                >
                                    Delete
                                </button>

                            </div>
                            <div className="flex justify-between">


                                {/* Add the date input and "Update Date" button */}
                                <input type="date" value={newDate} onChange={handleDateChange} className="border rounded p-2" />
                                <button
                                    onClick={handleUpdateDateClick}
                                    className="rounded-lg bg-pink-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                    type="button"
                                    data-ripple-light="true"
                                >
                                    Update Date
                                </button>
                            </div>
                        </div>


                    </div>
                </div>



            </div>

        </div>
    );
};

export default CartCard;