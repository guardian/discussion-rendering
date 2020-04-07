import React from 'react';
import { LoadingComments } from './LoadingComments';

export default { component: LoadingComments, title: 'LoadingComments' };

export const Default = () => <LoadingComments />;
Default.story = { name: 'default' };
