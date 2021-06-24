import {createMuiTheme, Theme, ThemeOptions,responsiveFontSizes} from '@material-ui/core/styles';

const theme:Theme = createMuiTheme({
    palette:{
        primary:{
            main: '#DC2659',
            light: '#E56187'
        }
    },
    custom: {
      zIndex :{
          BackgroundImg: -900
      }
    },
} as ThemeOptions);

export default responsiveFontSizes(theme);


