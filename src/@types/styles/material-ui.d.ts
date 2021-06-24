import { Theme, ThemeOptions } from "@material-ui/core/styles/createMuiTheme";

declare module "@material-ui/core/styles/createMuiTheme" {
    interface Theme {
        custom: {
            zIndex: {
                BackgroundImg: number;
            };
        }
    }
    // allow configuration using `createMuiTheme`
    interface ThemeOptions {
        custom?: {
            zIndex?: {
                BackgroundImg?: number;
            };
        };
    }
}
