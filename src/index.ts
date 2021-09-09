import * as dotenv from "dotenv";
dotenv.config();

import app from "./app";
import './database';

function main(){

    app.listen(app.get('port'));

    console.log('Servidor corriendo en ' + 'localhost:' + app.get('port'));

}

main();
