
import { useEffect, useState } from 'react';
import ServiceCard from './ServiceCard';


const Services = () => {

    const [reviewCounts, setReviewCounts] = useState({});


    const [services, setServices] = useState([]);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    useEffect(() => {
        fetch('https://y-eight-pi-68.vercel.app/services')
            .then(response => response.json())
            .then(data => setServices(data));
    }, []);

    useEffect(() => {
        services.forEach(service => {
            fetch(`https://y-eight-pi-68.vercel.app/reviewCount/${service._id}`)
                .then(response => response.json())
                .then(data => {
                    setReviewCounts(prevCounts => ({
                        ...prevCounts,
                        [service._id]: data.count
                    }));
                })
                .catch(error => console.error('Error fetching review count:', error));
        });
    }, [services]);




    const filterServices = () => {
        let filteredServices = services;

        if (minPrice !== '') {
            filteredServices = filteredServices.filter(service => service.price_per_night >= parseFloat(minPrice));
        }

        if (maxPrice !== '') {
            filteredServices = filteredServices.filter(service => service.price_per_night <= parseFloat(maxPrice));
        }

        return filteredServices;
    };

    const handleMinPriceChange = (e) => {
        setMinPrice(e.target.value);
    };

    const handleMaxPriceChange = (e) => {
        setMaxPrice(e.target.value);
    };

    return (

        <div className='text-center mt-4'>


            <h3 className="text-3xl font-bold">Our Service</h3>

            <div className="flex justify-center space-x-4 mt-4">
                <input
                    type="number"
                    placeholder="Min Price"
                    value={minPrice}
                    onChange={handleMinPriceChange}
                />
                <input
                    type="number"
                    placeholder="Max Price"
                    value={maxPrice}
                    onChange={handleMaxPriceChange}
                />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {
                    filterServices().map(service => <ServiceCard key={service._id} service={service} reviewCount={reviewCounts[service._id]}></ServiceCard>)
                }
            </div>
        </div>
    );
};

export default Services;

