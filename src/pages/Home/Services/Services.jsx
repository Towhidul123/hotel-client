
import { useEffect, useState } from 'react';
import ServiceCard from './ServiceCard';

const Services = () => {

    const [services, setServices] = useState([]);

    useEffect(()=>{
        fetch('http://localhost:5000/services')
        .then(response => response.json())
        .then(data => setServices(data));
    })

    return (
        <div className='text-center mt-4'>
           
            <h3 className="text-3xl font-bold">Our Service</h3>
        
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {
                    services.map(service => <ServiceCard key={service._id} service={service}></ServiceCard>)
                }

            </div>
        
        
        
        </div>
    );
};

export default Services;