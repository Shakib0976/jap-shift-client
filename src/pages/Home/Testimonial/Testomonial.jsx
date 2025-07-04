import React, {  useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const testimonials = [
    {
        text: "Use this",
        desc: "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.",
        name: "Alice Johnson",
        role: "Senior Product Designer",
        image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
        text: "Use this",
        desc: "With Posture Pro, my back pain is gone and I feel more confident in my daily routine.",
        name: "Michael Smith",
        role: "UX Specialist",
        image: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    {
        text: "Use this",
        desc: "I've never realized how much posture impacts energy levels. Game-changer!",
        name: "Lisa Wong",
        role: "Marketing Strategist",
        image: "https://randomuser.me/api/portraits/women/46.jpg",
    },
];

const TestimonialSlider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [sliderRef, instanceRef] = useKeenSlider({
        loop: true,
        slideChanged(slider) {
            setCurrentSlide(slider.track.details.rel);
        },
        slides: {
            perView: 1.2,
            spacing: 5,
            origin: "center",
        },
        breakpoints: {
            "(min-width: 768px)": {
                slides: { perView: 1.3, spacing: 30, origin: "center" },
            },
            "(min-width: 1024px)": {
                slides: { perView: 1.5, spacing: 40, origin: "center" },
            },
        },
    });

    return (
        <section className="py-12 bg-base-100">
            <div className="max-w-6xl mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-4">What our customers are saying</h2>
                <p className="text-gray-600 mb-10 max-w-3xl mx-auto">
                    Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!
                </p>

                <div className="keen-slider overflow-visible" ref={sliderRef}>
                    {testimonials.map((t, idx) => (
                        <div key={idx} className="keen-slider__slide flex justify-center">
                            <div className="card w-full max-w-md bg-base-100 shadow-lg border p-6">
                                <h3 className="text-xl font-semibold text-primary mb-2">{t.text}</h3>
                                <p className="text-gray-600 mb-4">{t.desc}</p>
                                <div className="divider my-4" />
                                <div className="flex items-center gap-4 text-left">
                                    <img
                                        src={t.image}
                                        alt={t.name}
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                    <div>
                                        <p className="font-semibold">{t.name}</p>
                                        <p className="text-sm text-gray-500">{t.role}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Arrows below the slider */}
                <div className="flex justify-center items-center gap-4 mt-6">
                    <button
                        onClick={() => instanceRef.current?.prev()}
                        className="btn btn-sm btn-outline"
                    >
                        <FaArrowLeft />
                    </button>
                    <div className="flex space-x-2">
                        {testimonials.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => instanceRef.current?.moveToSlideRelative(idx)}
                                className={`w-3 h-3 rounded-full ${currentSlide === idx ? "bg-primary" : "bg-gray-300"
                                    }`}
                            />
                        ))}
                    </div>
                    <button
                        onClick={() => instanceRef.current?.next()}
                        className="btn btn-sm btn-outline"
                    >
                        <FaArrowRight />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default TestimonialSlider;
