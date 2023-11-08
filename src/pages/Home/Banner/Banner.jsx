import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';
import { ParallaxBanner, useParallax } from 'react-scroll-parallax';

const Banner = () => {
    const AutoplaySlider = withAutoplay(AwesomeSlider);

    return (

        <div>
 <div className="relative">
            <ParallaxBanner
                layers={[
                    { image: 'https://i.ibb.co/S0xgtMc/nathan-cima-4aq-H2ut-APAs-unsplash-min.jpg', speed: -20 },
                    { image: 'https://i.ibb.co/S0xgtMc/nathan-cima-4aq-H2ut-APAs-unsplash-min.jpg', speed: -10 },
                ]}
                className="w-full h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px] 2xl:h-[700px] object-cover"
            >
                <div className="absolute inset-0 flex  justify-center">
                    <h1 className="flex justify-center items-center text-center text-5xl  font-thin  text-[white]">Spend Your Vacation with Us </h1>
                </div>
            </ParallaxBanner>
        </div>


            <div>
                <h2 className='text-center font-bold text-3xl mt-5'>Special Discount <br />50% OFF</h2>
                <div className='flex justify-center w-full aspect-video max-h-[600px] py-5'>

                    <AutoplaySlider
                        play={true}
                        cancelOnInteraction={false} // should stop playing on user interaction
                        interval={6000}
                    >
                        <div data-src="https://i.ibb.co/dpXZ6Yn/albert-vincent-wu-fupf3-x-AUqw-unsplash-min.jpg" />
                        <div data-src="https://i.ibb.co/Qb1nn9k/dad-hotel-P6-B7y6-Gnyzw-unsplash-min.jpg" />
                        <div data-src="https://i.ibb.co/n73rZqr/febrian-zakaria-sjv-U0-THcc-QA-unsplash-min.jpg" />
                    </AutoplaySlider>
                </div>
            </div>

        </div>


    );
};

export default Banner;