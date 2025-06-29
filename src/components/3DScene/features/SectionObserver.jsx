import { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { useCameraContext } from './CameraContext';

export function SectionObserver({ children, index, threshold = 0.4 }) {
    const { setActiveSectionIndex } = useCameraContext();
    const { ref, inView } = useInView({ 
        threshold,
        // Add a small delay before considering the section in view
        // Only trigger once when entering view
        triggerOnce: false,
        // Add root margin to start transition earlier
        rootMargin: '-20% 0px -10% 0px'
    });
    const wasInView = useRef(false);
    const timeoutRef = useRef(null);

    useEffect(() => {
        const handleInViewChange = () => {
            if (inView && !wasInView.current) {
                // Clear any existing timeout
                if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                }

                // Set a timeout to debounce the section change
                timeoutRef.current = setTimeout(() => {
                    setActiveSectionIndex(index);
                    wasInView.current = true;
                }, 150); // Debounce time in milliseconds
            } else if (!inView && wasInView.current) {
                wasInView.current = false;
                // Clear timeout if section is no longer in view
                if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                }
            }
        };

        handleInViewChange();

        // Cleanup timeout on unmount or when dependencies change
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [inView, index, setActiveSectionIndex]);

    return <div ref={ref}>{children}</div>;
}
