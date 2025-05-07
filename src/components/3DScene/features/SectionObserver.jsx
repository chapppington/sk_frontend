import { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { useCameraContext } from './CameraContext';

export function SectionObserver({ children, index, threshold = 0.4 }) {
    const { setActiveSectionIndex } = useCameraContext();
    const { ref, inView } = useInView({ threshold });
    const wasInView = useRef(false);

    useEffect(() => {
        if (inView && !wasInView.current) {
            setActiveSectionIndex(index);
            wasInView.current = true;
        } else if (!inView && wasInView.current) {
            wasInView.current = false;
        }
    }, [inView, index, setActiveSectionIndex]);

    return <div ref={ref}>{children}</div>;
}
