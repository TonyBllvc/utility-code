import { motion } from "framer-motion";

export default function HeroCover({
  header,
  subHeader,
  inputComponent = null,
  image = null,
  componentLayer = null,
  children
}) {
  const isSlider = Array.isArray(image);

  return (
    <div className="min-h-screen w-full">
      <div className="relative w-full min-h-11 py-10 flex items-center justify-center">
        {/* Background Layer */}
        {image ? (
          isSlider ? (
            <div className="absolute inset-0 overflow-hidden">
              {/* TODO: Replace with carousel/slider implementation */}
              <img
                src={image[0]}
                alt="Hero background"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40" />
            </div>
          ) : (
            <div className="absolute inset-0">
              <img
                src={image}
                alt="Hero background"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40" />
            </div>
          )
        ) : (
          <div className="absolute inset-0 bg-gradient-to-r from-default-primary/10 via-default-tertiary/10 to-default-secondary/10" />
        )}

        {/* Content Layer */}
        <div className="relative text-center px-4 max-w-3xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold mb-6 bg-default-primary bg-clip-text text-default-primary"
          // className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-default-primary/30 to-default-primary/70 bg-clip-text text-transparent"
          >
            {header}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-default-text font-normal mb-8"
          >
            {subHeader}
          </motion.p>

          {inputComponent && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-8"
            >
              {inputComponent}
            </motion.div>
          )}

          {componentLayer && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex justify-center gap-6 text-sm text-muted-foreground"
            >
              {componentLayer}
            </motion.div>
          )}
        </div>
      </div>
      <div className="my-10">
        {children}
      </div>
    </div>
  );
}
