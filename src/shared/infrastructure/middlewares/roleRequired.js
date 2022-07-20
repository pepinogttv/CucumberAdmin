export function roleRequired(role) {
    return (req, res, next) => {
        if (!req.user || !req.user.role) return res.status(403).json({ error: { description: 'Unauthorized' } });
        if (req.user.role === 'owner') return next();
        if (req.user.role !== role) return res.status(403).json({ error: { description: 'Unauthorized' } });
        next();
    }
}

