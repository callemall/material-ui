import React from 'react';
import Title from 'react-title-component';

import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import sliderReadmeText from './README';
import SliderExampleSimple from './ExampleSimple';
import sliderExampleSimpleCode from '!raw!./ExampleSimple';
import SliderExampleDisabled from './ExampleDisabled';
import sliderExampleDisabledCode from '!raw!./ExampleDisabled';
import SliderExampleStep from './ExampleStep';
import sliderExampleStepCode from '!raw!./ExampleStep';
import SliderExampleControlled from './ExampleControlled';
import sliderExampleControlledCode from '!raw!./ExampleControlled';
import SliderExampleLogScale from './ExampleLogScale';
import sliderExampleLogScaleCode from '!raw!./ExampleLogScale';
import SliderExampleAxis from './ExampleAxis';
import sliderExampleAxisCode from '!raw!./ExampleAxis';
import SliderExampleCustomScale from './ExampleCustomScale';
import sliderExampleCustomScaleCode from '!raw!./ExampleCustomScale';
import sliderCode from '!raw!material-ui/Slider/Slider';

const SliderPage = () => (
  <div>
    <Title render={(previousTitle) => `Slider - ${previousTitle}`} />
    <MarkdownElement text={sliderReadmeText} />
    <CodeExample
      title="Simple examples"
      code={sliderExampleSimpleCode}
    >
      <SliderExampleSimple />
    </CodeExample>
    <CodeExample
      title="Disabled examples"
      code={sliderExampleDisabledCode}
    >
      <SliderExampleDisabled />
    </CodeExample>
    <CodeExample
      title="Stepped example"
      code={sliderExampleStepCode}
    >
      <SliderExampleStep />
    </CodeExample>
    <CodeExample
      title="Controlled Examples"
      code={sliderExampleControlledCode}
    >
      <SliderExampleControlled />
    </CodeExample>
    <CodeExample
      title="Logarithmic Scale Example"
      code={sliderExampleLogScaleCode}
    >
      <SliderExampleLogScale />
    </CodeExample>
    <CodeExample
      title="Alternative Axis Examples"
      code={sliderExampleAxisCode}
    >
      <SliderExampleAxis />
    </CodeExample>
    <CodeExample
      title="Custom scale"
      code={sliderExampleCustomScaleCode}
    >
      <SliderExampleCustomScale />
    </CodeExample>
    <PropTypeDescription code={sliderCode} />
  </div>
);

export default SliderPage;
