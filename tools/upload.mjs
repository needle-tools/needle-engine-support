import { Client } from "basic-ftp";


runUpload();

async function runUpload(){

    const server = process.env.FTP_SERVER_NAME;
    const user = process.env.FTP_SERVER_USER;
    const password = process.env.FTP_SERVER_PASSWORD;
    if(!server || !user || !password){
        console.error("FTP_SERVER_NAME, FTP_SERVER_USER, FTP_SERVER_PASSWORD must be set");
        return;
    }

    const clients = new Client(1000 * 20);

    console.log("TODO: upload to ftp server");

}