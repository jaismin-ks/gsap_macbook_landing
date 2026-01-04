import { useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Showcase = () => {
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });

  const showcaseRef = useRef(null);
  const maskImgRef = useRef(null);
  const contentRef = useRef(null);

  useGSAP(
    () => {
      if (isTablet) return;

      let rafId;

      rafId = requestAnimationFrame(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: showcaseRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
            pin: true,
            invalidateOnRefresh: true,
          },
        });

        tl.to(maskImgRef.current, { scale: 1.1 })
          .to(
            contentRef.current,
            { opacity: 1, y: 0, ease: "power1.in" },
            "<"
          );

        ScrollTrigger.refresh();
      });

      return () => {
        cancelAnimationFrame(rafId);
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    },
    { dependencies: [isTablet] }
  );

  return (
    <section id="showcase" ref={showcaseRef}>
      <div className="media">
        <video
          src="/videos/game.mp4"
          loop
          muted
          autoPlay
          playsInline
          onLoadedMetadata={() => ScrollTrigger.refresh()}
        />

        <div className="mask">
          <img ref={maskImgRef} src="/mask-logo.svg" alt="mask" />
        </div>
      </div>

      <div className="content" ref={contentRef}>
        <div className="wrapper">
          <div className="lg:max-w-md">
            <h2>Rocket Chip</h2>

            <div className="space-y-5 mt-7 pe-10">
              <p>
                Introducing{" "}
                <span className="text-white">
                  M4, the next generation of Apple silicon
                </span>
                . M4 powers
              </p>
              <p>
                It drives Apple Intelligence on iPad Pro, so you can write,
                create, and accomplish more with ease.
              </p>
              <p>
                A brand-new display engine delivers breathtaking precision.
              </p>
              <p className="text-primary">
                Learn more about Apple Intelligence
              </p>
            </div>
          </div>

          <div className="max-w-3xs space-y-14">
            <div className="space-y-2">
              <p>Up to</p>
              <h3>4x faster</h3>
              <p>pro rendering performance than M2</p>
            </div>

            <div className="space-y-2">
              <p>Up to</p>
              <h3>1.5x faster</h3>
              <p>CPU performance than M2</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Showcase;
