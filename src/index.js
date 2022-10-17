
const forge = require("node-forge");
const fs = require("fs")

const app = express();
const port = 8080;
app
    .get("/", (req, res) => {
        const p12Content = fs.readFileSync("./Passwordlike-sandbox.p12", 'binary');
        const p12 = forge.pkcs12.pkcs12FromAsn1(
            forge.asn1.fromDer(p12Content, false),
            false,
            "<insert key password (locally)>"
        );
        const keyObj = p12.getBags({
            friendlyName: "Passwordlike",
            bagType: forge.pki.oids.pkcs8ShroudedKeyBag
        }).friendlyName[0];
        const signingKey = forge.pki.privateKeyToPem(keyObj.key);
        res.status(200).send(signingKey)
    })
    .listen(port, () => console.log(`localhost:${port}`));
