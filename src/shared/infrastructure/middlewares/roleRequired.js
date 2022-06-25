export function roleRequired(role) {
    return (req, res, next) => {
        if (req.adminUser.role !== role) return res.status(403).json({ message: 'Unauthorized' });
        next();
    }
}

