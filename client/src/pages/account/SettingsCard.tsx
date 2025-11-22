import Card, { sxActionCard } from '@/components/Card';
import MessageCmp from '@/components/MessageCmp';
import Paragraph from '@/layout/Paragraph';
import authSo from '@/stores/auth/repo';
import dialogSo, { DIALOG_TYPE } from '@/stores/layout/dialogStore';
import themeSo from '@/stores/layout/theme';
import { lightTheme } from '@/theme/theme';
import { Brightness4 as DarkModeIcon, Brightness7 as LightModeIcon, Settings } from '@mui/icons-material';
import { Box, Button, IconButton, MenuItem, Select, SelectChangeEvent, SxProps, TextField, Typography } from '@mui/material';
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
    useStore(authSo)

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
        dialogSo.dialogOpen({
            type: DIALOG_TYPE.SUCCESS,
            text: t('cards.SettingsCard.alerts.save_success')
        });
    }


    // RENDER
    return (
        <Card id="settings-card"
            title={t('cards.SettingsCard.title')}
            icon={<Settings color="primary" />}
        >

            <Paragraph title={t('cards.SettingsCard.sections.name')}>
                <TextField size="small" fullWidth
                    value={authSo.state.user?.name ?? ''}
                    onChange={(e) => authSo.setUser({ ...authSo.state.user, name: e.target.value })}
                />
            </Paragraph>

            <Paragraph title={t('cards.SettingsCard.sections.theme')} sxValue={{ gap: 2 }}>
                
                <IconButton color="primary" size="large" sx={sxIconButtonTheme}
                    onClick={handleThemeToggle}
                >
                    {themeSa.current === lightTheme ? <DarkModeIcon /> : <LightModeIcon />}
                </IconButton>

                <Box sx={{ flex: 1 }}>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {themeSa.current === lightTheme ? t('cards.SettingsCard.theme.light.title') : t('cards.SettingsCard.theme.dark.title')}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {themeSa.current === lightTheme ? t('cards.SettingsCard.theme.light.desc') : t('cards.SettingsCard.theme.dark.desc')}
                    </Typography>
                </Box>

            </Paragraph>

            <Paragraph title={t('cards.SettingsCard.sections.language')}>
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
                >{t('cards.SettingsCard.actions.save')}</Button>
            </Box>

        </Card>
    );
};

export default SettingsCard;

const sxIconButtonTheme: SxProps = {
    bgcolor: 'background.paper',
    '&:hover': { bgcolor: 'action.selected' }
}
