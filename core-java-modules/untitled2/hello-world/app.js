const chromium = require('chrome-aws-lambda');

exports.lambdaHandler = async (event, context, callback) => {
    let result = null;
    let browser = null;

    console.info("EVENT\n" + JSON.stringify(event, null, 2))
    try {
        browser = await chromium.puppeteer.launch({
            args: chromium.args,
            defaultViewport: chromium.defaultViewport,
            executablePath: await chromium.executablePath,
            headless: chromium.headless,
            ignoreHTTPSErrors: true,
        });

        let page = await browser.newPage();

        if (event.html) {
            //let body = JSON.parse(event.body)
            await page.setContent(event.html);
            const pdf = await page.pdf({
                printBackground: true,
                displayHeaderFooter: true,
                margin: {
                    top: "1cm",
                    right: "1cm",
                    bottom: "1cm",
                    left: "1cm"
                }
            });
            return {
                headers: {
                    "Content-type": "application/pdf"
                },
                statusCode: 200,
                body: pdf.toString("base64"),
                isBase64Encoded: true
            }
            /* res.setHeader('Content-Type', 'application/pdf');
             return res.send(pdf);*/
        }


    } catch (error) {
        return callback(error);
    } finally {
        if (browser !== null) {
            await browser.close();
        }
    }

    return callback(null, result);
};
