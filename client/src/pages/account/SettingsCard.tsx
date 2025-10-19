import Card, { sxActionCard } from '@/components/Card';
import Paragraph from '@/layout/Paragraph';
import authSo from '@/stores/auth/repo';
import themeSo from '@/stores/layout/theme';
import { Brightness4 as DarkModeIcon, Language as LanguageIcon, Brightness7 as LightModeIcon, Settings } from '@mui/icons-material';
import { Box, Button, Divider, IconButton, MenuItem, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';
import { useStore } from '@priolo/jon';
import React from 'react';
import { useTranslation } from 'react-i18next';



interface Props {
}

/**
 * login and register new accout
 */
const SettingsCard: React.FC<Props> = ({
}) => {

    // STORES
    const themeSa = useStore(themeSo)

    // HOOKS
    const { i18n, t } = useTranslation();

    // HANDLERS
    const handleThemeToggle = () => {
        themeSo.toggleMode();
    };
    const handleLanguageChange = (event: SelectChangeEvent<string>) => {
        i18n.changeLanguage(event.target.value);
    };
    const handleSave = () => {
        //authSo.saveUser();
    }


    // RENDER

    return (
        <Card id="settings-card"
            title="Settings"
            icon={<Settings color="primary" />}
        >

            <Paragraph title="NAME">
                <TextField size="small" fullWidth
                    value={authSo.state.user?.name ?? ''}
                    onChange={(e) => authSo.setUser({ ...authSo.state.user, name: e.target.value })}
                />
            </Paragraph>

            <Paragraph title="THEME">
                <IconButton
                    onClick={handleThemeToggle}
                    color="primary"
                    size="large"
                    sx={{
                        bgcolor: 'background.paper',
                        '&:hover': { bgcolor: 'action.selected' }
                    }}
                >
                    {themeSa.mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
                </IconButton>
                <Box sx={{ flex: 1 }}>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {themeSa.mode === 'light' ? 'Light Mode' : 'Dark Mode'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {themeSa.mode === 'light' ? 'Switch to dark theme for better visibility in low light' : 'Switch to light theme for better visibility in bright environments'}
                    </Typography>
                </Box>
            </Paragraph>

            <Paragraph title="LANGUAGE">
                <Select variant="outlined" size="small" fullWidth
                    value={i18n.language}
                    onChange={handleLanguageChange}
                >
                    <MenuItem value="en">English</MenuItem>
                    {/* Add more languages here as needed */}
                </Select>
            </Paragraph>

            <Box sx={sxActionCard}>
                <Button
                    onClick={handleSave}
                >SAVE</Button>
            </Box>

        </Card>
    );
};

export default SettingsCard;
