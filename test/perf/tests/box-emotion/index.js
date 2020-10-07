
import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import styledEmotion from '@emotion/styled';
import { ThemeProvider as EmotionTheme } from 'emotion-theming';
import { styleFunction } from '@material-ui/core/Box';

const materialSystemTheme = createMuiTheme();
const BoxEmotion = styledEmotion('div')(styleFunction);

const App = () => {
  return (
    <>
      {new Array(100).fill().map(() => (
        <EmotionTheme theme={materialSystemTheme}>
          <BoxEmotion
            color="primary.main"
            bgcolor="background.paper"
            fontFamily="h6.fontFamily"
            fontSize={['h6.fontSize', 'h4.fontSize', 'h3.fontSize']}
            p={[2, 3, 4]}
          >
            emotion
          </BoxEmotion>
      </EmotionTheme>
      ))}
    </>
  );
}

export default App;
