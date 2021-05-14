'use strict';
module.exports = number => (req, res, next) => {
    const roles = {
        Admin: 1,
        Blogger: 2,
        User: 4
    };
    if (!(roles[req.user.kind] & number)) 
        return res.status(403).send('Forbidden');
    next();
};