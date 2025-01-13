

const serverHeaders = {
    'Content-Type': 'application/x-www-form-urlencoded',
};
// multipart/form-data

const Host = "http://192.168.1.13:8080";

const adminLoginEndpoint = "/admin/login";

export const CheckAdmin = async (pass) => {

    try {
        
        const res = await fetch(Host + adminLoginEndpoint , {
            method: "POST",
            headers: serverHeaders,
            body: "adminPassword=" + pass,
            redirect: 'follow',
        });

        console.log("fetch status: " + res.status);
        console.log("fetch statusText: " + res.statusText);

    } catch (error) {
        console.error(error)
    }


}