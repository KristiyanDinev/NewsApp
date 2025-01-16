

const serverHeaders = {
    'Content-Type': 'application/x-www-form-urlencoded',
};

const redirectV = 'follow';

// multipart/form-data

export const Host = "http://192.168.1.13:8080";

const adminLoginEndpoint = "/admin/login";
const adminAddEndpoint = "/admin/add";
const adminEditEndpoint = "/admin/edit";
const adminDeleteEndpoint = "/admin/remove";

const newsEndpoint = "/news/";

export var AdminPassword = "";

export const setAdmin = (p) => {
    AdminPassword = p;
}


export const CheckAdmin = async (pass) => {
    try {
        const res = await fetch(Host + adminLoginEndpoint , {
            method: "POST",
            headers: serverHeaders,
            body: "adminPassword=" + pass,
            redirect: redirectV,
        });

        return res.status == 200;

    } catch (error) {
        console.error(error)
    }
}

export const AddAdmin = async (pass) => {
    try {
        const res = await fetch(Host + adminAddEndpoint, {
            method: "POST",
            headers: serverHeaders,
            body: "currentAdmin=" + AdminPassword +"&adminPassword="+pass,
            redirect: redirectV,
        });

        return res.status == 200;

    } catch (error) {
        console.error(error)
    }
}

export const EditAdmin = async (oldpass, newpass) => {
    try {
        const res = await fetch(Host + adminEditEndpoint, {
            method: "POST",
            headers: serverHeaders,
            body: "currentAdmin=" + AdminPassword + "&oldAdminPassword=" + oldpass + "&newAdminPassword=" + newpass,
            redirect: redirectV,
        });

        return res.status == 200;

    } catch (error) {
        console.error(error)
    }
}


export const DeleteAdmin = async (delpass) => {
    try {
        const res = await fetch(Host + adminDeleteEndpoint, {
            method: "POST",
            headers: serverHeaders,
            body: "currentAdmin=" + AdminPassword + "&adminPassword=" + delpass,
            redirect: redirectV,
        });

        return res.status == 200;

    } catch (error) {
        console.error(error)
    }
}


export const SearchNews = async (search, filter) => {
    try {
        const res = await fetch(Host + newsEndpoint + "search?search="+search + "&tags=" + filter, {
            method: "GET",
            redirect: redirectV,
        });
        // res.status == 200

        console.log(res);

    } catch (error) {
        console.error(error)
    }
}