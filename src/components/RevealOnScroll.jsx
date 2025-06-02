import { useEffect, useRef } from "react";

export const RevealOnScroll = ({ children }) => {
  const ref = useRef(null);

  useEffect(() => {
    const current = ref.current;

    // ✅ Show immediately on very small viewports (e.g. mobile)
    if (window.innerHeight < 700 && current) {
      current.classList.add("visible");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry], observerInstance) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observerInstance.unobserve(entry.target); // animate only once
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px",
      }
    );

    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, []);

  return (
    <div ref={ref} className="reveal">
      {children}
    </div>
  );
};
