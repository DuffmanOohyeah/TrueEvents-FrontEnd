import React, {ReactElement, useState} from "react";
import {Button} from "@material-ui/core";



function SignInButton(): ReactElement {
    const [loading, setLoading] = useState<boolean>(false);

    return (
        <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={loading}
        > Sign in
        </Button>
    );
}
export default SignInButton;
