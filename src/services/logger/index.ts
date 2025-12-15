import pino from 'pino';
import path from 'path';

// Configuration for log rotation
const transport = pino.transport({
    target: 'pino-roll',
    options: {
        file: path.join(process.cwd(), 'logs', 'app-log'),
        frequency: 'daily', // Rotate daily
        size: '10m',        // Or when file size exceeds 10MB
        mkdir: true,        // Create directory if it doesn't exist
        dateFormat: 'yyyy-MM-dd',
        limit: {
            count: 10,      // Keep last 10 rotated files
        }
    }
});

export const logger = pino({
    level: process.env.LOG_LEVEL || 'info',
    timestamp: pino.stdTimeFunctions.isoTime,
    base: null, // Remove pid, hostname from logs
}, transport);

/**
 * Bridge function to use with Julian framework's onParentLog
 * @param logEntry The log entry from the framework
 */
export const frameworkLogBridge = (logEntry: any) => {
    // Map framework log levels/types to Pino levels if necessary
    // Assuming logEntry has a structure we can dump
    const { type, message, ...rest } = logEntry;
    
    // You might want to adjust the level based on 'type' or other properties
    logger.info({ type, ...rest }, message || 'Framework Log');
    
    // Return true to allow the framework to continue its own logging (e.g. to console)
    // or false to suppress it if you only want file logging.
    return true; 
};
