import logger from '../../shared/infrastructure/logger.js';
export default (controller) => (req, res) => {
    // console.log(req.body);

    if (req.body.product) req.body.product = recursiveParse(req.body.product);
    if (req.body.category) req.body.category = recursiveParse(req.body.category);
    if (req.body.wholesaler) req.body.wholesaler = recursiveParse(req.body.wholesaler);
    if (req.body.brand) req.body.brand = recursiveParse(req.body.brand);


    const httpRequest = {
        body: req.body,
        files: req.files,
        file: req.file,
        query: req.query,
        params: req.params,
        ip: req.ip,
        method: req.method,
        path: req.path,
        logger: req.logger,
        user: req.user,
        source: {
            ip: req.ip,
            browser: req.get('User-Agent')
        },
        headers: {
            'Content-Type': req.get('Content-Type'),
            Referer: req.get('referer'),
            'User-Agent': req.get('User-Agent')
        }
    };

    controller(httpRequest)
        .then((httpResponse) => {
            if (httpResponse) {
                const { token, user } = httpResponse;
                if (token) return res
                    .cookie("token", token, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === "production",
                    })
                    .status(200)
                    .json({ success: true, data: { user } })

            }
            res.type('json');
            const body = {
                success: true,
                code: 200,
                data: httpResponse
            };
            res.status(200).send(body);
        })
        .catch((e) => {
            logger.error(e);
            res.status(400).send({
                success: false,
                code: 400,
                error: {
                    description: e.message
                }
            });
        });
};

function recursiveParse(strObject) {
    if (typeof strObject !== 'string') return strObject;
    return recursiveParse(JSON.parse(strObject));
}


