const production = process.env.NODE_ENV === "production";
export function roleRequired(role) {
    return (req, res, next) => {
        if (!production) return next();
        if (req.adminUser.role !== role) return res.status(403).json({ message: 'Unauthorized' });
        next();
    }
}

