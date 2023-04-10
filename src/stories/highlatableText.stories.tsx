import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import TestHighlightableText from './components/testHighlightableText';
import { HandleOverlap } from '../helpers/createHighlight';

export default {
  title: 'Highlatable Text Story',
  component: TestHighlightableText,
  argTypes: {
    id: {
      description: 'Id for the text container',
      control: { type: 'text' },
    },
    text: {
      description: 'Content of the text container',
      control: { type: 'text' },
    },
    highlights: {
      description: 'Array of highlights present in the text',
      control: { type: 'object' },
    },
    setHighlights: {
      description: 'Function to set the array of highlights',
      table: {
        disable: true,
      },
    },
    style: {
      description: 'Style for the text container',
      control: { type: 'object' },
    },
    highlightOptions: {
      description: 'Styles that can be used for highlights',
      control: { type: 'object' },
    },
    highlightable: {
      description: 'Determines whether highlighting is available',
      control: { type: 'boolean' },
    },
    handleOverlaps: {
      description: 'Determines how overlapping highlights are handled.',
      options: [HandleOverlap.Merge, HandleOverlap.Delete],
      mapping: [HandleOverlap.Merge, HandleOverlap.Delete],
      control: {
        type: 'inline-radio',
        labels: ['Merge', 'Delete'],
      },
    },
    optionsTitle: {
      description: 'Title for the options popup',
      control: { type: 'text' },
    },
    optionsStyle: {
      description: 'Style for the options popup',
      control: { type: 'object' },
    },
  },
} as ComponentMeta<typeof TestHighlightableText>;

const Template:
ComponentStory<typeof TestHighlightableText> =  (args) => <TestHighlightableText {...args} />;

export const HighlatableTextStory = Template.bind({});

HighlatableTextStory.args = {
  id: 'test',
  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  highlights: [],
  style: {},
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
  highlightable: true,
  handleOverlaps: HandleOverlap.Merge,
  optionsTitle: 'Select highlight',
  optionsStyle: {},
};
