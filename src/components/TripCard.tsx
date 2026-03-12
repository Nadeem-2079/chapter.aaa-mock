
import { motion } from 'framer-motion';
import { MapPin, Clock, ArrowRight } from 'lucide-react';

export interface Trip {
  slug: string;
  name: string;
  location: string;
  image: string;
  shortDesc: string;
  duration: string;
  price: number;
  tags: string[];
}

interface TripCardProps {
  trip: Trip;
}

const TripCard: React.FC<TripCardProps> = ({ trip }) => {
  return (
    <a href={`/trip/${trip.slug}`} className="block">
      <motion.div
        whileHover={{ y: -10, scale: 1.02 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="group relative h-[450px] w-full cursor-pointer overflow-hidden rounded-3xl bg-neutral-100 shadow-lg dark:bg-neutral-900"
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-in-out group-hover:scale-110"
          style={{ backgroundImage: `url(${trip.image})` }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 transition-opacity duration-300 group-hover:opacity-90" />

        {/* Floating Price Badge */}
        <div className="absolute right-4 top-4 rounded-full bg-black/60 px-4 py-2 font-poppins font-bold text-white shadow-xl backdrop-blur-md border border-white/10 group-hover:bg-ocean-blue transition-all duration-300 z-10">
          ₹{trip.price}
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 flex w-full flex-col justify-end p-6 text-white">
          <div className="mb-3 flex flex-wrap gap-2">
            {trip.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium tracking-wide backdrop-blur-md"
              >
                {tag}
              </span>
            ))}
          </div>

          <h3 className="mb-1 font-poppins text-2xl font-bold font-poppins tracking-tight">
            {trip.name}
          </h3>

          <div className="mb-3 flex items-center space-x-4 text-sm font-light text-gray-200">
            <div className="flex items-center space-x-1">
              <MapPin size={16} className="text-ocean-blue" />
              <span>{trip.location}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock size={16} className="text-sunset-orange" />
              <span>{trip.duration}</span>
            </div>
          </div>

          <p className="mb-5 line-clamp-2 text-sm text-gray-300">
            {trip.shortDesc}
          </p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="w-full pt-2"
          >
            <button className="group relative flex w-full items-center justify-center space-x-2 overflow-hidden rounded-xl bg-ocean-blue py-3.5 font-bold tracking-wide text-white shadow-lg shadow-ocean-blue/30 transition-all duration-300 hover:scale-[1.02] hover:bg-ocean-blue/90 hover:shadow-xl hover:shadow-ocean-blue/40">
              <span className="relative z-10 transition-transform duration-300 group-hover:-translate-x-1">View Trip Details</span>
              <ArrowRight className="relative z-10 h-5 w-5 -translate-x-4 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
              <div className="absolute inset-0 z-0 h-full w-full translate-y-full bg-gradient-to-t from-black/20 to-transparent transition-transform duration-300 group-hover:translate-y-0" />
            </button>
          </motion.div>
        </div>
      </motion.div>
    </a>
  );
};

export default TripCard;
