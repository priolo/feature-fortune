import React from 'react';
import { Box, Typography, Chip, List, ListItem, ListItemText, Divider } from '@mui/material';
import { Funding } from '@/types/Funding';



interface Props {
    fundings: Funding[];
}

const FundingList: React.FC<Props> = ({ fundings }) => {
    
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed': return 'success';
            case 'pending': return 'warning';
            case 'failed': return 'error';
            case 'expired': return 'default';
            case 'created': return 'info';
            default: return 'default';
        }
    };

    const formatAmount = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <List>
            {fundings.map((funding, index) => (
                <React.Fragment key={funding.id || index}>
                    <ListItem alignItems="flex-start" sx={{ px: 0 }}>
                        <ListItemText
                            primary={
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                    <Typography variant="h6" component="span">
                                        {formatAmount(funding.amount)}
                                    </Typography>
                                    <Chip
                                        label={funding.status}
                                        color={getStatusColor(funding.status)}
                                        size="small"
                                    />
                                </Box>
                            }
                            secondary={
                                <Box>
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                                        Created: {formatDate(funding.createdAt)}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                                        Expires: {formatDate(funding.expiresAt)}
                                    </Typography>
                                    {funding.message && (
                                        <Typography variant="body2" color="text.primary" sx={{ mt: 1, fontStyle: 'italic' }}>
                                            "{funding.message}"
                                        </Typography>
                                    )}
                                </Box>
                            }
                        />
                    </ListItem>
                    {index < fundings.length - 1 && <Divider />}
                </React.Fragment>
            ))}
        </List>
    );
};

export default FundingList;