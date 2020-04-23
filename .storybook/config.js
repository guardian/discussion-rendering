import { configure, addParameters } from '@storybook/react';
import MockDate from 'mockdate';

MockDate.set('Fri March 27 2020 12:00:00 GMT+0000 (Greenwich Mean Time)');

import { mockFetchCalls } from '../src/lib/mockFetchCalls';

mockFetchCalls();

const guardianViewports = {
    mobileMedium: {
        name: 'mobileMedium',
        styles: {
            width: '375px',
            height: '800px',
        },
    },
    mobileLandscape: {
        name: 'mobileLandscape',
        styles: {
            width: '480px',
            height: '800px',
        },
    },
    phablet: {
        name: 'phablet',
        styles: {
            width: '660px',
            height: '800px',
        },
    },
    tablet: {
        name: 'tablet',
        styles: {
            width: '740px',
            height: '800px',
        },
    },
    desktop: {
        name: 'desktop',
        styles: {
            width: '980px',
            height: '800px',
        },
    },
    leftCol: {
        name: 'leftCol',
        styles: {
            width: '1140px',
            height: '800px',
        },
    },
    wide: {
        name: 'wide',
        styles: {
            width: '1300px',
            height: '800px',
        },
    },
};

addParameters({
    viewport: {
        viewports: guardianViewports,
        defaultViewport: 'wide',
    },
});

// automatically import all files ending in *.stories.tsx
configure(require.context('../', true, /\.stories\.tsx?$/), module);
