const rateLimit = require('express-rate-limit')
const logger = require('../services/Logger')

// General API rate limiter
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: { error: 'Too many requests, please try again later.' },
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
        logger.log({
            level: 'warn',
            module: 'RateLimiter',
            message: `Rate limit exceeded for IP: ${req.ip}`
        })
        res.status(429).json({ error: 'Too many requests, please try again later.' })
    }
})

// Strict rate limiter for authentication routes
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 login attempts per windowMs
    message: { error: 'Too many login attempts, please try again after 15 minutes.' },
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: true, // Don't count successful logins
    handler: (req, res) => {
        logger.log({
            level: 'warn',
            module: 'RateLimiter',
            message: `Auth rate limit exceeded for IP: ${req.ip}`
        })
        res.status(429).json({ error: 'Too many login attempts, please try again after 15 minutes.' })
    }
})

// Rate limiter for password reset
const passwordResetLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 3, // Limit each IP to 3 password reset requests per hour
    message: { error: 'Too many password reset attempts, please try again after 1 hour.' },
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
        logger.log({
            level: 'warn',
            module: 'RateLimiter',
            message: `Password reset rate limit exceeded for IP: ${req.ip}`
        })
        res.status(429).json({ error: 'Too many password reset attempts, please try again after 1 hour.' })
    }
})

// Rate limiter for comment submission (prevent spam)
const commentLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 10, // Limit each IP to 10 comments per hour
    message: { error: 'Too many comments submitted, please try again later.' },
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
        logger.log({
            level: 'warn',
            module: 'RateLimiter',
            message: `Comment rate limit exceeded for IP: ${req.ip}`
        })
        res.status(429).json({ error: 'Too many comments submitted, please try again later.' })
    }
})

// Rate limiter for contact/email (prevent spam)
const mailLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 5, // Limit each IP to 5 emails per hour
    message: { error: 'Too many messages sent, please try again later.' },
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
        logger.log({
            level: 'warn',
            module: 'RateLimiter',
            message: `Mail rate limit exceeded for IP: ${req.ip}`
        })
        res.status(429).json({ error: 'Too many messages sent, please try again later.' })
    }
})

module.exports = {
    apiLimiter,
    authLimiter,
    passwordResetLimiter,
    commentLimiter,
    mailLimiter
}
