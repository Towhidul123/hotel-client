import { Link } from "react-router-dom";


const ServiceCard = ({ service }) => {

    const { _id, room_images } = service;

    return (
        <Link to={`/products/${_id}`}>
            <div>
                <div className="flex items-center justify-center object-center ">
                    <div className="relative flex w-[312px] flex-col rounded-xl  ">
                       
                        <div className="relative  h-48 overflow-hidden rounded-xl ">
                            <img className="object-cover w-full h-full " src={room_images} alt="" />
                        </div>


                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ServiceCard;