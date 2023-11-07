import { Link } from "react-router-dom";


const ServiceCard = ({ service, reviewCount  }) => {

    const { _id, room_images, price_per_night } = service;
    
    return (
        <Link to={`/products/${_id}`}>
      <div>
        <div className="flex items-center justify-center object-center ">
          <div className="relative flex w-[312px] flex-col rounded-xl  ">
            <div className="relative  h-48 overflow-hidden rounded-xl ">
              <img className="object-cover w-full h-full " src={room_images} alt="" />
            </div>
            <div className="text-center mt-2">
              <p>Price: {price_per_night}</p>
              <p>Review Count: {reviewCount}</p> {/* Add this line */}
            </div>
          </div>
        </div>
      </div>
    </Link>
    );
};

export default ServiceCard;