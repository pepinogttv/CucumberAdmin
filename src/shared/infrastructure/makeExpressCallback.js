export default (controller) => (req, res) => {
    if (req.body.product) req.body.product = recursiveParse(req.body.product);
    if (req.body.category) req.body.category = recursiveParse(req.body.category);
    console.log({
        body: req.body,
    })
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
            res.set('Content-Type', 'application/json');
            res.type('json');
            const body = {
                success: true,
                code: 200,
                data: httpResponse
            };
            res.status(200).send(body);
        })
        .catch((e) => {
            console.log(e)
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