

const serverHeaders = {
    'Content-Type': 'application/x-www-form-urlencoded',
};
// multipart/form-data

const Host = "https://192.168.1.13:5001";

const adminLoginEndpoint = "/admin/login";

export const CheckAdmin = async (pass) => {
    var formData = new FormData();
    formData.append('adminPassword', pass);
    try {
        // Set timeout
        const res = await fetch(Host + adminLoginEndpoint, {
            method: "POST",
            headers: serverHeaders,
            body: formData,
            mode: 'same-origin',
            redirect: 'follow',
            credentials: 'same-origin',
            signal: AbortSignal.timeout(5000)
        });
    
        console.log("fetch status: "+res.status);
        console.log("fetch statusText: "+res.statusText);
    
    } catch (error) {
        console.error(error)
    }


}