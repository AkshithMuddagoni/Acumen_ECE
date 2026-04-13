import {
  animate,
  cubicBezier,
  motion,
  useMotionValue,
  useTransform,
} from "motion/react";
import {
  memo,
  useContext,
  useEffect,
  useRef,
  useState,
  createContext,
} from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

//Types
type variants = "default" | "masonry" | "polaroid";

// Wrap utility function
const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

// Create Context
const GridVariantContext = createContext<variants | undefined>(undefined);

//Motion Variants
const rowVariants = {
  initial: { opacity: 0, scale: 0.3 },
  animate: () => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: Math.random() + 1.5,
      duration: 1.4,
      ease: cubicBezier(0.18, 0.71, 0.11, 1),
    },
  }),
};

export const DraggableContainer = ({
  className,
  children,
  variant,
}: {
  className?: string;
  children: React.ReactNode;
  variant?: variants;
}) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const [isDragging, setIsDragging] = useState(false);
  const handleIsDragging = () => setIsDragging(true);
  const handleIsNotDragging = () => setIsDragging(false);

  // Get container dimensions for wrapping calculation
  const [containerDims, setContainerDims] = useState({ width: 1920, height: 1080 });

  useEffect(() => {
    const updateDimensions = () => {
      const container = ref.current?.getBoundingClientRect();
      if (container && container.width > 0) {
        setContainerDims({ width: container.width, height: container.height });
      } else {
        // Fallback to window dimensions
        setContainerDims({ width: window.innerWidth, height: window.innerHeight });
      }
    };

    // Update on mount
    updateDimensions();

    // Update on window resize
    window.addEventListener("resize", updateDimensions);
    
    // Small delay to ensure DOM is ready
    const timer = setTimeout(updateDimensions, 100);

    return () => {
      window.removeEventListener("resize", updateDimensions);
      clearTimeout(timer);
    };
  }, []);

  // Create wrapped x and y values using useTransform (no feedback loop)
  const wrappedX = useTransform(x, (latest) => {
    if (containerDims.width === 0) return latest;
    return wrap(-(containerDims.width / 2), 0, latest);
  });

  const wrappedY = useTransform(y, (latest) => {
    if (containerDims.height === 0) return latest;
    return wrap(-(containerDims.height / 2), 0, latest);
  });

  useEffect(() => {
    const handleWheelScroll = (event: WheelEvent) => {
      if (!isDragging) {
        animate(y, y.get() - event.deltaY * 2.7, {
          type: "tween",
          duration: 1.2,
          ease: cubicBezier(0.18, 0.71, 0.11, 1),
        });
      }
    };

    window.addEventListener("wheel", handleWheelScroll);
    return () => {
      window.removeEventListener("wheel", handleWheelScroll);
    };
  }, [y, isDragging]);

  return (
    <GridVariantContext.Provider value={variant}>
      <motion.div
        className="h-dvh w-screen overflow-hidden bg-[#141414] cursor-grab active:cursor-grabbing"
        drag
        dragMomentum={true}
        dragTransition={{
          timeConstant: 200,
          power: 0.28,
          restDelta: 0,
          bounceStiffness: 0,
        }}
        onMouseDown={handleIsDragging}
        onMouseUp={handleIsNotDragging}
        onMouseLeave={handleIsNotDragging}
        style={{ x: wrappedX, y: wrappedY }}
        ref={ref}
      >
        {children}
      </motion.div>
    </GridVariantContext.Provider>
  );
};

export const GridItem = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const variant = useContext(GridVariantContext);

  const gridItemStyles = cva(
    "overflow-hidden hover:cursor-pointer w-full h-full will-change-transform",
    {
      variants: {
        variant: {
          default: "rounded-sm",
          masonry: "even:mt-[60%] rounded-sm ",
          polaroid:
            "border-10 border-b-28 border-white shadow-xl even:rotate-3 odd:-rotate-2 hover:rotate-0 transition-transform ease-out duration-300 even:mt-[60%]",
        },
      },
      defaultVariants: {
        variant: "default",
      },
    },
  );

  return (
    <motion.div
      className={cn(gridItemStyles({ variant, className }))}
      variants={rowVariants}
      initial="initial"
      animate="animate"
    >
      {children}
    </motion.div>
  );
};

export const GridBody = memo(
  ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => {
    const variant = useContext(GridVariantContext);

    const gridBodyStyles = cva("grid grid-cols-[repeat(6,1fr)] h-fit w-fit", {
      variants: {
        variant: {
          default: "gap-14 p-7 md:gap-28 md:p-14",
          masonry: "gap-x-14 px-7 md:gap-x-28 md:px-14",
          polaroid: "gap-x-14 px-7 md:gap-x-28 md:px-14",
        },
      },
      defaultVariants: {
        variant: "default",
      },
    });

    return (
      <>
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className={cn(gridBodyStyles({ variant, className }))}
          >
            {children}
          </div>
        ))}
      </>
    );
  },
);

GridBody.displayName = "GridBody";
