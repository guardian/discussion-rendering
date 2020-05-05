import React from 'react';
import '@testing-library/jest-dom/extend-expect';

import {
    render,
    fireEvent,
    // @ts-ignore : https://github.com/testing-library/react-testing-library/issues/610
    waitFor,
} from '@testing-library/react';

import { AbuseReportForm } from './AbuseReportForm';

import { mockFetchCalls } from '../../lib/mockFetchCalls';

const fetchMock = mockFetchCalls();

describe('Dropdown', () => {
    it('Should show the expected label names', () => {
        const { getByText } = render(
            <AbuseReportForm
                toggleSetShowForm={() => {}}
                pillar={'sport'}
                commentId={123}
            />,
        );

        expect(getByText('Category')).toBeInTheDocument();
        expect(getByText('Reason (optional)')).toBeInTheDocument();
        expect(getByText('Email (optional)')).toBeInTheDocument();
    });

    it('Should show the category error message if not chosen on submit', () => {
        const { getByText } = render(
            <AbuseReportForm
                toggleSetShowForm={() => {}}
                pillar={'sport'}
                commentId={123}
            />,
        );

        fireEvent.click(getByText('Report'));
        expect(
            getByText('You must select a category before submitting'),
        ).toBeInTheDocument();
    });

    it('Should show the success message category is selected', async () => {
        const { getByText, getByLabelText, queryByText } = render(
            <AbuseReportForm
                toggleSetShowForm={() => {}}
                pillar={'sport'}
                commentId={123}
            />,
        );

        fireEvent.change(getByLabelText('Category'), { target: { value: 3 } });

        fireEvent.click(getByText('Report'));

        let options = getByLabelText('Category');
        expect(options[1].selected).toBeFalsy();
        expect(options[3].selected).toBeTruthy();

        expect(
            queryByText('You must select a category before submitting'),
        ).not.toBeInTheDocument();

        await waitFor(() => {
            expect(fetchMock.called(/reportAbuse/)).toBeTruthy();
        });

        await waitFor(() => {
            expect(getByText('Report submitted')).toBeInTheDocument();
        });
    });
});
