
import authSo from '@/stores/auth/repo';
import { Button } from '@mui/material';
import React from 'react';



interface Props {
}

/**
 * login and register new accout
 */
const GithubLoginCmp: React.FC<Props> = ({
}) => {

    // STORES


    // HOOKS


    // HANDLERS
    const handleGithubLogin = () => {
		authSo.loginWithGithub()
	};


    // RENDER

    return (
        <Button variant="contained" 
            onClick={handleGithubLogin}
        >GITHUB</Button>
    );
};

export default GithubLoginCmp;
