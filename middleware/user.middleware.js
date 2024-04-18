const { getIdToken } = require("firebase/auth");
const { authAdmin } = require('../helpers/firebase_admin');
const { cookieManager } = require('../services/cookie.services');

module.exports = {
    
    isLoggedIn: async (req, res, next) => {
        try {
            const cookieToken = cookieManager.parseCookie(req.headers.cookie);

            const idToken = await authAdmin.verifyIdToken(cookieToken);
            // const cookie = cookieManager.generateCookie(idToken);
            // res.cookie('jwtToken', cookie[0], cookie[1]);
            const idTokenAccess = idToken.access;
            
            if( !idTokenAccess )    throw new Error('User not allowed');

            res.locals.access = idTokenAccess;

            if( idToken.admin === true ){
                res.locals.privilege = 2;
            }  
            else if( idToken.admin === false){   
                res.locals.privilege = 1;

            }
            else {
                throw new Error('No claim in token');
            }
            
            next();
        } catch ( error ) {
            console.error( error.message );
            res.clearCookie('jwtToken');
            res.redirect( 302,'/user/login');
        }
    }
}