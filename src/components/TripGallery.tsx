
import { motion } from 'framer-motion';

interface TripGalleryProps {
  images: string[];
}

const TripGallery: React.FC<TripGalleryProps> = ({ images }) => {
  return (
    <div className="my-16">
      <h2 className="mb-8 font-poppins text-3xl font-bold tracking-tight text-foreground">
        Photo Gallery
      </h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {images.map((img, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className={`relative overflow-hidden rounded-2xl ${idx === 0 ? 'col-span-2 row-span-2 md:h-[400px]' : 'h-[190px]'
              }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 hover:scale-110"
              style={{ backgroundImage: `url(${img})` }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TripGallery;
