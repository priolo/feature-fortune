import Card, { sxActionCard } from '@/components/Card';
import Paragraph from '@/layout/Paragraph';
import authSo from '@/stores/auth';
import dialogSo, { DIALOG_TYPE } from '@/stores/layout/dialogStore';
import themeSo from '@/stores/layout/theme';
import { lightTheme } from '@/theme/theme';
import { AvailabeCurrency } from '@/types/Currency';
import { Brightness4 as DarkModeIcon, Brightness7 as LightModeIcon, Settings, Tune } from '@mui/icons-material';
import { Box, Button, IconButton, MenuItem, Select, SelectChangeEvent, Switch, SxProps, TextField, Typography } from '@mui/material';
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
    const { t } = useTranslation();

    // HANDLERS
    const handleThemeToggle = () => {
        themeSo.toggleMode();
    }
    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        authSo.setUserInEdit({ ...authSo.state.userInEdit, name: event.target.value });
    }
    const handleLanguageChange = (event: SelectChangeEvent<string>) => {
        authSo.setUserInEdit({ ...authSo.state.userInEdit, language: event.target.value });
    }
    const handleNotificationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        authSo.setUserInEdit({ ...authSo.state.userInEdit, notificationsEnabled: event.target.checked })
    }
    const handleCurrencyChange = (event: SelectChangeEvent<string>) => {
        authSo.setUserInEdit({ ...authSo.state.userInEdit, preferredCurrency: event.target.value });
    }

    const handleUpdate = async () => {
        if (!authSo.state.userInEdit?.name || authSo.state.userInEdit?.name.trim() === '') {
            dialogSo.dialogOpen({
                type: DIALOG_TYPE.ERROR,
                text: t('cards.SettingsCard.alerts.name_required')
            })
            return
        }
        await authSo.update()
        dialogSo.dialogOpen({
            type: DIALOG_TYPE.SUCCESS,
            text: t('cards.SettingsCard.alerts.save_success')
        })
    }


    // RENDER
    return (
        <Card id="settings-card"
            title={t('cards.SettingsCard.title')}
            icon={<Tune color="primary" />}
        >

            <Paragraph title={t('cards.SettingsCard.sections.name')}>
                <TextField size="small" fullWidth
                    value={authSo.state.userInEdit?.name ?? ''}
                    onChange={handleNameChange}
                />
            </Paragraph>

            <Paragraph title={t('cards.SettingsCard.sections.theme')} sxValue={{ gap: 1 }}>

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
                    value={authSo.state.userInEdit?.language ?? "en"}
                    onChange={handleLanguageChange}
                >
                    <MenuItem value="en">English</MenuItem>
                    {/* Add more languages here as needed */}
                </Select>
            </Paragraph>

            <Paragraph title={t('cards.SettingsCard.sections.currency')}>
                <Select variant="outlined" size="small" fullWidth
                    value={authSo.state.userInEdit?.preferredCurrency ?? AvailabeCurrency[0]}
                    onChange={handleCurrencyChange}
                >
                    {AvailabeCurrency.map((curr) => (
                        <MenuItem key={curr} value={curr}>
                            {curr.toUpperCase()}
                        </MenuItem>
                    ))}
                </Select>
            </Paragraph>

            <Paragraph title={t('cards.SettingsCard.sections.notification.label')} sxValue={{ alignItems: "center"}}>
                <Switch
                    checked={!!authSo.state.userInEdit?.notificationsEnabled}
                    onChange={handleNotificationChange}
                />
                <Typography variant="body2" color="text.secondary" sx={{ ml: 1  }}>
                    {t(`cards.SettingsCard.sections.notification.${authSo.state.userInEdit?.notificationsEnabled ? 'desc_on' : 'desc_off'}`)}
                </Typography>
            </Paragraph>

            <Box sx={sxActionCard}>
                <Button
                    onClick={handleUpdate}
                >{t('common.update')}</Button>
            </Box>

        </Card>
    )
}

export default SettingsCard;

const sxIconButtonTheme: SxProps = {
    bgcolor: 'background.paper',
    '&:hover': { bgcolor: 'action.selected' }
}
