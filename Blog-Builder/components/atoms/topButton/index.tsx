import React, { useEffect, useState } from 'react';
import ArrowSideIcon from '@atoms/icons/Arrow-Side-Icon';

/**
 * It renders a button that scrolls to the top of the page when clicked. The reference top element should have class backReference
 * @returns A React component that renders a button that scrolls to the top of the page when clicked.
 */
const TopButton: React.FC = () => {
  const [pos, setPos] = useState(false);

  /**
   * It scrolls the window to the top of the page
   */
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };

  useEffect(() => {
    /**
     * "When the user scrolls, check if the element is in view, and if it is, set the position to true,
     * otherwise set it to false."
     *
     * The first thing we do is create an IntersectionObserver. This is a browser API that allows us to
     * check if an element is in view
     */
    const handleScroll = () => {
      const observer = new IntersectionObserver((e) => {
        e.forEach((entry) => {
          setPos(!entry.isIntersecting);
        });
      });

      const sectionToObserve = document.querySelector('.backReference');
      if (sectionToObserve) {
        observer.observe(sectionToObserve);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {pos && (
        <div
          className="fixed bottom-4 right-4 lg:right-12 lg:bottom-12 p-4 rounded-sm bg-primary-10 cursor-pointer z-10"
          onClick={scrollToTop}
        >
          <ArrowSideIcon className="w-4 -rotate-90" />
        </div>
      )}
    </>
  );
};

export default TopButton;
