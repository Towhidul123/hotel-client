import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import CartCard from "./CartCard";
import Swal from "sweetalert2";
import moment from 'moment';

const Cart = () => {

    const { user } = useContext(AuthContext);
    const [card, setCard] = useState([]);

    const url = `http://localhost:5000/addToCart?email=${user?.email}`;
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => setCard(data))
            .catch(error => console.error('Error fetching data:', error));
    }, [url])


    const handleDelete = _id => {
        const currentDate = moment();
        const bookingDate = moment(card.find(item => item._id === _id).formattedDate);

        const daysDifference = bookingDate.diff(currentDate, 'days');

        if (daysDifference >= 2) {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                 
                fetch(`http://localhost:5000/addToCart/${_id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        if (data.deletedCount > 0) {
                            Swal.fire(
                                'Deleted!',
                                'Your product has been deleted.',
                                'success'
                            )
                            const remaining = card.filter(card => card._id !== _id);
                            setCard(remaining);
                        }
                    })
                }
            })
        } else {
            Swal.fire({
                title: 'Cancellation Window Expired',
                text: 'You can only cancel bookings before 1 day from the booking day.',
                icon: 'error'
            });
        }
    }


    const handleUpdateDate = (_id, newDate) => {
        fetch(`http://localhost:5000/updateBookingDate/${_id}`, {
          method: 'PATCH',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify({ newDate })
        })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          if (data.modifiedCount > 0) {
            const updatedCard = card.map(item => {
              if (item._id === _id) {
                return { ...item, formattedDate: newDate }; // Assuming 'formattedDate' is the property to update
              } else {
                return item;
              }
            });
            setCard(updatedCard);
          }
        })
      }




    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                {
                    card.map(card => <CartCard key={card._id} card={card} handleDelete={handleDelete} handleUpdateDate={handleUpdateDate}></CartCard>)
                }


            </div>

        </div>
    );
};

export default Cart;