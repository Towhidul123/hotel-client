
import { useEffect, useState } from 'react';
import ServiceCard from './ServiceCard';

const Services = () => {

    const [services, setServices] = useState([]);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    useEffect(() => {
        fetch('http://localhost:5000/services')
            .then(response => response.json())
            .then(data => setServices(data));
    }, []);


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
                    filterServices().map(service => <ServiceCard key={service._id} service={service}></ServiceCard>)
                }
            </div>
        </div>
    );
};

export default Services;