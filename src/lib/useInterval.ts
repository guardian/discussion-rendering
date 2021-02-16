import { useEffect, useRef } from 'react';

// Why do we have this custom hook?
// https://overreacted.io/making-setinterval-declarative-with-react-hooks/
export const useInterval = (callback: any, delay: number) => {
	const savedCallback = useRef();

	// Remember the latest callback.
	useEffect(() => {
		savedCallback.current = callback;
	}, [callback]);

	// Set up the interval.
	useEffect(() => {
		function tick() {
			const currentCallback: any = savedCallback.current;
			// eslint-disable-next-line @typescript-eslint/no-unsafe-call
			currentCallback();
		}
		if (delay !== null) {
			let id = setInterval(tick, delay);
			return () => clearInterval(id);
		}
	}, [delay]);
};
