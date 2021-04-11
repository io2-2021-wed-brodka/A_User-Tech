import { Button, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useHistory } from 'react-router';
import { login } from '../../api/login/login';

const useStyles = makeStyles({
    container: {
        marginTop: '1em',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
    },

});

export interface LoginPageProps {
    setToken: (newToken: string) => void;
    setUserName: (userName: string) => void;
}

const LoginPage = (props: LoginPageProps) => {
    const classes = useStyles();
    const history = useHistory()

    const { enqueueSnackbar } = useSnackbar();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };
    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleLogInClick = () => {
        login(username, password).then(r => {
            if (r.isError) {
                enqueueSnackbar(`Loggin failed: ${r.errorMessage}`, { variant: "error" });
            }
            else {
                props.setToken(r.data?.token || '');
                props.setUserName(username);
                history.push("/");
            }
        });

    }

    return (
        <>
            <div className={classes.container}>
                <form>
                    <TextField
                        id={"LoginInput"}
                        label={"Login"}
                        variant="filled"
                        value={username}
                        onChange={handleUsernameChange}
                        autoComplete="username" />
                    <TextField
                        id={"PasswordInput"}
                        label={"Password"}
                        variant="filled"
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        autoComplete="current-password" />
                    <Button onClick={handleLogInClick}>
                        Log In
                    </Button>
                </form>
            </div>
        </>
    )
}

export default LoginPage;