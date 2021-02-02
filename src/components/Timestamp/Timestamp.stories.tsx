import { Timestamp } from './Timestamp';

export default { component: Timestamp, title: 'Timestamp' };

// Date is mocked to "Fri March 27 2020 12:00:00 GMT+0000 (Greenwich Mean Time)" in config

export const TwoMonths = () => (
	<Timestamp
		isoDateTime={'2020-01-26T14:22:39Z'}
		webUrl=""
		commentId={123}
		onPermalinkClick={() => {}}
	/>
);
TwoMonths.story = { name: 'Two months' };

export const OneHour = () => (
	<Timestamp
		isoDateTime={'2020-03-27T11:00:00Z'}
		webUrl=""
		commentId={123}
		onPermalinkClick={() => {}}
	/>
);
OneHour.story = { name: 'One Hour' };

export const TwentyThreeHours = () => (
	<Timestamp
		isoDateTime={'2020-03-26T13:00:00Z'}
		webUrl=""
		commentId={123}
		onPermalinkClick={() => {}}
	/>
);
TwentyThreeHours.story = { name: 'Twenty three hours' };

export const TwentyFiveHours = () => (
	<Timestamp
		isoDateTime={'2020-03-26T11:00:00Z'}
		webUrl=""
		commentId={123}
		onPermalinkClick={() => {}}
	/>
);
TwentyFiveHours.story = { name: 'Twenty five hours' };
