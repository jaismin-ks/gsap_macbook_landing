import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { performanceImages, performanceImgPositions } from "../constants";
import { useMediaQuery } from "react-responsive";

gsap.registerPlugin(ScrollTrigger);

const Performance = () => {
  const sectionRef = useRef(null);
  const imagesRef = useRef([]);
  const textRef = useRef(null);

  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // Text animation
      gsap.fromTo(
        ".content p",
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          ease: "power1.out",
          scrollTrigger: {
            trigger: ".content p",
            start: "top bottom",
            end: "top center",
            scrub: true,
          },
        }
      );

      // Desktop-only image animation
      if (isMobile) return;

      const tl = gsap.timeline({
        defaults: {duration: 4, ease: "power1.inOut", overwrite: "auto"},
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
          invalidateOnRefresh: true
        },
      });

      performanceImgPositions.forEach((item) => {
        if (item.id === "p5") return;

        const imageEl = imagesRef.current.find(
          (img) => img?.classList.contains(item.id)
        );

        if (!imageEl) return;

        tl.to(
          imageEl,
          {
            left: item.left != null ? `${item.left}%` : undefined,
            right: item.right != null ? `${item.right}%` : undefined,
            bottom: item.bottom != null ? `${item.bottom}%` : undefined,
            transform: item.transform,
            willChange: "transform, left, right, bottom",
          },
          0
        );
      });
    },
    { scope: sectionRef, dependencies: [isMobile] }
  );

  return (
    <section id="performance" ref={sectionRef}>
      <h2>Next-level graphics performance. Game on.</h2>

      <div className="wrapper">
        {performanceImages.map((item, index) => (
          <img
            key={index}
            ref={(el) => (imagesRef.current[index] = el)}
            src={item.src}
            className={item.id}
            alt={item.alt || `Performance Image ${index + 1}`}
          />
        ))}
      </div>

      <div className="content">
        <p ref={textRef}>
          Run graphics-intensive workflows with a responsiveness that keeps up
          with your imagination. The M4 family of chips features a GPU with a
          second-generation hardware-accelerated ray tracing engine that renders
          images faster, so{" "}
          <span className="text-white">
            gaming feels more immersive and realistic than ever.
          </span>{" "}
          And Dynamic Caching optimizes fast on-chip memory to dramatically
          increase average GPU utilization — driving a huge performance boost
          for the most demanding pro apps and games.
        </p>
      </div>
    </section>
  );
};

export default Performance;
