# react-fluo 🚀️

React Fluo is a library used to create highlightable texts and inputs. It offers a customizable solution that can be easily placed within any react app. It is configurable, allowing the user to modify styles, define highlights, make the text editable, among other things.

### Installation

`yarn add react-fluo`

or

`npm add react-fluo`

### Demo

A demo in storybook can be found [here](https://64a82a93a7c5d6b4ac6ee99b-sswaniehjy.chromatic.com).

### Usage

A basic use case for the library would be as follows:

```
import React, { useState } from 'react';
import HighlightableText from 'react-fluo';

const ExampleText = ({text}) => {
  const [text, setText] = useState('Lorem Ipsum')
  const [highlights, setHighlights] = useState([])

  const highlightOptions = [
    {
      background: '#fff58c',
    },
    {
      background: '#ffab52',
    },
    {
      background: '#7af4ff',
    }
  ]

  return (
  <div>
    <HighlightableText
      id='example_id'
      text={text}
      setText={setText}
      highlights={highlights}
      setHighlights={setHighlights}
      highlightOptions={highlightOptions}
    />
  </div>
)}

export default ExampleText

```

The library is, however, customizable to different apps. Styles can be changed, the possible highlights are defined by the user, whether or not the text is editable or whether highlights are enabled can be defined, amongst other things.

A list of the different properties accepted by the component are:


| property         | Description                                                                                                                                                                                                                                                                         | Optional                          | Type                                                                                                     |
| :----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| id               | Identifier for the container which will contain the editable text. It is important that this id is unique for each container.                                                                                                                                                       | N                                 | Accepts strings, such as "example_id".                                                                   |
| text             | Contains the text to display on screen.                                                                                                                                                                                                                                             | N                                 | Accepts strings.                                                                                         |
| setText          | Saves the changes made on the text.                                                                                                                                                                                                                                                 | Y (N if text is editable)         | Accepts a function, such as a state function.                                                            |
| highlights       | Array of highlights to display over the text.                                                                                                                                                                                                                                       | N                                 | Accepts an array of type Highlight. A detailed view of this type can be seen in the data types section.  |
| setHighlights    | Function used to change the array of highlights.                                                                                                                                                                                                                                    | N                                 | Accepts a function, such as a state function.                                                            |
| highlightOptions | Array used to define the styles of the highlights offered by the app. It is important to note that changes in letter sizing, spacing, etc. are not currently supported.                                                                                                             | N                                 | Accepts an array of CSS properties, React.CSSProperties[]                                                |
| highlightable    | Enables or disables the ability to create new highlights. If highlights are passed via props those will be displayed, but no new one can be created                                                                                                                                 | Y                                 | Accepts a boolean                                                                                        |
| editable         | Enables or disables the editable text mode. If the text is editable, a setText function**is required**.                                                                                                                                                                             | Y                                 | Accepts a boolean                                                                                        |
| style            | Style for the global text container.                                                                                                                                                                                                                                                | Y                                 | CSS properties, React.CSSProperties                                                                      |
| handleOverlaps   | Defines how overlapping highlights are handled. The possible values are Merge, which creates a new highlight that contains both overlapping highlights, Delte, that deletes both highlights, and Error, which adds an error into the**errors** prop. The default behavior is Merge. | Y                                 | A value from the HandleOverlap enum. A detailed view of this type can be seen in the data types section. |
| defaultHighlight | Index in the array highlightOptions that indicates which style is used when a new highlight is created.                                                                                                                                                                             | Y                                 | Accepts a number                                                                                         |
| optionsTitle     | The title displayed on the options popup.                                                                                                                                                                                                                                           | Y                                 | Accepts a string                                                                                         |
| optionsStyle     | Changes the styles of the options popup.                                                                                                                                                                                                                                            | Y                                 | CSS properties, React.CSSProperties                                                                      |
| closeIcon        | Allows the close icon of the options popup to be changed.                                                                                                                                                                                                                           | Y                                 | A string that contains the path to the image.                                                            |
| replyIcon        | Allows the reply icon to be changed.                                                                                                                                                                                                                                                | Y                                 | A string that contains the path to the image.                                                            |
| showOptionsIcon  | Allows the expand highlights icon to be changed in the options popup.                                                                                                                                                                                                               | Y                                 | A string that contains the path to the image.                                                            |
| errors           | An array of strings that contains errors that can happen while creating Highlights, with a handleOverlaps strategy Error.                                                                                                                                                           | Y (N if merge strategy is errors) | An array of strings.                                                                                     |
| setErrors        | Function used to change the errors variable.                                                                                                                                                                                                                                        | Y (N if merge strategy is errors) | A function that changes the error variable, like a stateful function.                                    |
| currentAuthor    | This is used to display a username and avatar when creating comments and replies.                                                                                                                                                                                                   | Y                                 | Accepts values of type Author. A detailed view of this type can be seen in the data types section.       |

### Data types

This library is implemented using typescript. When passing some props, it is important that they match their corresponding data types.

##### Highlight

```
interface Highlight {
  id: number,
  start: number,
  end: number,
  selection: string,
  style: string,
  comments: Comment[],
}

```

##### Comment, Reply and Author

```
export interface Author {
  name: string,
  avatar?: string,
}

export interface Reply {
  text: string,
  date: Date,
  author?: Author,
}

export interface Comment {
  id: number,
  date: Date,
  text: string,
  author?: Author,
  replies: Reply[]
}
```

##### Handle Overlap

```
export enum HandleOverlap {
  Merge,
  Delete,
  Error,
}
```
