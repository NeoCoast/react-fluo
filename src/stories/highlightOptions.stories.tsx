import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import TestHighlightOptions from './components/testHighlightOptions';

export default {
  title: 'Highlight Options Story',
  component: TestHighlightOptions,
  argTypes: {
    highlightOptions: {
      description: 'Styles that can be used for highlights',
      control: { type: 'object' },
    },
    title: {
      description: 'Title shown in the optoins popup',
      control: { type: 'text' },
    },
    closeIcon: {
      description: 'Icon used to close the popup. If none is provided, a default icon is set',
      control: { type: 'text' },
    },
    style: {
      description: 'Style for the optoins popup',
      control: { type: 'object' },
    },
  },
} as ComponentMeta<typeof TestHighlightOptions>;

const Template:
ComponentStory<typeof TestHighlightOptions> =  (args) => <TestHighlightOptions {...args} />;

export const HighlightOptionsStory = Template.bind({});

HighlightOptionsStory.args = {
  highlightOptions: [
    {
      background: '#fff58c',
    },
    {
      background: '#ffab52',
    },
    {
      background: '#7af4ff',
    },
    {
      background: '#7dffbc',
    },
    {
      background: '#d68fff',
    },
    {
      background: '#ff5eb7',
    },
    {
      background: '#ff4d5b',
    },
    {
      backgroundImage: 'repeating-linear-gradient(45deg, rgb(42 191 196), rgb(96, 109, 188) 10px, rgb(70, 82, 152) 10px, rgb(70, 82, 152) 20px)',
    },
    {
      backgroundImage: 'linear-gradient(to right, rgb(236 124 72), rgb(173 1 1))',
    },
    {
      backgroundImage: 'radial-gradient(rgb(255, 255, 255) 30%, transparent 30%), radial-gradient(rgb(255, 255, 255) 30%, transparent 30%)',
      backgroundPosition: '0px 0px, 5px 5px',
      backgroundSize: '10px 10px',
      backgroundColor: 'rgb(255, 41, 41)',
    },
    {
      backgroundImage: 'radial-gradient(closest-side, rgb(234 255 4), rgb(110 255 74), rgb(246 246 60))',
    },
    {
      background: 'linear-gradient(135deg, #ccc 25%, transparent 25%) -50px 0, linear-gradient(225deg, #eee 25%, transparent 25%) -50px 0, linear-gradient(315deg, #ccc 25%, transparent 25%), linear-gradient(45deg, #eee 25%, transparent 25%)',
      backgroundSize: '20px 20px',
      backgroundColor: '#fff',
    },
  ],
  title: 'Enter you title here',
  style: {},
  closeIcon: 'https://img.icons8.com/fluency-systems-regular/2x/multiply.png',
};
