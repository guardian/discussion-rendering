import React, { useEffect } from "react"
import { FocusStyleManager } from "@guardian/src-foundations/utils"
import MockDate from 'mockdate';
import { mockFetchCalls } from '../src/lib/mockFetchCalls';

MockDate.set('Fri March 27 2020 12:00:00 GMT+0000 (Greenwich Mean Time)');

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


export const parameters = {
  viewport: {
      viewports: guardianViewports,
      defaultViewport: 'wide',
  },
  actions: { argTypesRegex: "^on[A-Z].*" },
}

const FocusManagerDecorator = storyFn => {
	useEffect(() => {
		FocusStyleManager.onlyShowFocusOnTabs()
	})

	return <div>{storyFn()}</div>
}

export const decorators = [FocusManagerDecorator];
