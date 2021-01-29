import React from 'react';
import '@testing-library/jest-dom/extend-expect';

import { render, fireEvent, screen } from '@testing-library/react';

import { Pillar } from '@guardian/types';

import { DropdownOptionType } from '../../types';
import { Dropdown } from './Dropdown';

const threadOptions: DropdownOptionType[] = [
	{
		value: 'collapsed',
		title: 'Collapsed',
		isActive: true,
	},
	{
		value: 'expanded',
		title: 'Expanded',
	},
	{
		value: 'unthreaded',
		title: 'Unthreaded',
	},
];

const noActiveOptions: DropdownOptionType[] = threadOptions.map((option) => ({
	...option,
	isActive: false,
}));

describe('Dropdown', () => {
	it('should display the given label', () => {
		const label = 'I should show';
		render(
			<Dropdown
				id="abc"
				pillar={Pillar.News}
				label={label}
				options={threadOptions}
				onSelect={() => {}}
			/>,
		);

		expect(screen.getByText(label)).toBeInTheDocument();
	});

	it('should display option titles', () => {
		render(
			<Dropdown
				id="abc"
				pillar={Pillar.News}
				label={'The label'}
				options={noActiveOptions}
				onSelect={() => {}}
			/>,
		);

		expect(screen.getByText(threadOptions[0].title)).toBeInTheDocument();
		expect(screen.getByText(threadOptions[1].title)).toBeInTheDocument();
		expect(screen.getByText(threadOptions[2].title)).toBeInTheDocument();
	});

	it('should render the correct number of options', () => {
		const { container } = render(
			<Dropdown
				id="abc"
				pillar={Pillar.News}
				label={'The label'}
				options={threadOptions}
				onSelect={() => {}}
			/>,
		);

		const listItems = container.querySelectorAll('li');
		expect(listItems.length).toEqual(threadOptions.length);
	});

	it.only('should expand the menu when the label is clicked', () => {
		const { queryByTestId } = render(
			<Dropdown
				id="abc"
				pillar={Pillar.News}
				label={'The label'}
				options={threadOptions}
				onSelect={() => {}}
			/>,
		);

		const ulElement = queryByTestId('drop-down-list-abc') as HTMLElement;
		expect(ulElement).not.toBeVisible();
		// expect(ulElement).toHaveStyle('display: block');
		const button = queryByTestId('drop-down-button-abc') as HTMLElement;
		fireEvent.click(button);
		expect(ulElement).toBeVisible();
		// expect(ulElement).toHaveStyle('display: block');
	});

	it('should close the expanded menu when readers click away', () => {
		const { container, queryByTestId } = render(
			<Dropdown
				id="abc"
				pillar={Pillar.News}
				label={'The label'}
				options={threadOptions}
				onSelect={() => {}}
			/>,
		);

		const ulElement = container.querySelector('ul');
		const button = queryByTestId('drop-down-button-abc') as HTMLElement;
		fireEvent.click(button);
		expect(ulElement).toHaveStyle('display: block');
		fireEvent.click(container);
		expect(ulElement).toHaveStyle('display: none');
	});

	it('should close the expanded menu when blurred', () => {
		const { container, queryByTestId } = render(
			<Dropdown
				id="abc"
				pillar={Pillar.News}
				label={'The label'}
				options={threadOptions}
				onSelect={() => {}}
			/>,
		);

		const ulElement = container.querySelector('ul');
		const button = queryByTestId('drop-down-button-abc') as HTMLElement;
		fireEvent.click(button);
		expect(ulElement).toHaveStyle('display: block');
		fireEvent.keyDown(container, { key: 'Escape', code: 'Escape' });
		expect(ulElement).toHaveStyle('display: none');
	});
});

it('should trigger the correct onSelect callbacks when an option is clicked', () => {
	const mockCallback = jest.fn();
	const { queryByTestId } = render(
		<Dropdown
			id="abc"
			pillar={Pillar.News}
			label={'The label'}
			options={threadOptions}
			onSelect={mockCallback}
		/>,
	);

	const button = queryByTestId('drop-down-button-abc') as HTMLElement;
	fireEvent.click(button);
	fireEvent.click(screen.getByText(threadOptions[2].title));
	expect(mockCallback).toHaveBeenCalled();
	expect(mockCallback.mock.calls[0][0]).toBe('unthreaded');
	fireEvent.click(button);
	fireEvent.click(screen.getByText(threadOptions[1].title));
	expect(mockCallback).toHaveBeenCalled();
	expect(mockCallback.mock.calls[1][0]).toBe('expanded');
});
