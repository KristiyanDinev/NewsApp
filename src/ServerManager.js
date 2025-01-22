

const redirectV = 'follow';

// multipart/form-data

export const Host = "http://192.168.1.13:8080";

const adminLoginEndpoint = "/admin/login";
const adminAddEndpoint = "/admin/add";
const adminEditEndpoint = "/admin/edit";
const adminDeleteEndpoint = "/admin/remove";

const newsEndpoint = "/news/";

export var Admin = {};

export const setAdmin = (a) => {
    Admin = a;
}


export const LoginAdmin = async (username, pass) => {
    try {
        var formData = new FormData();
        formData.append('adminPassword', pass);
        formData.append('adminUsername', username);

        const res = await fetch(Host + adminLoginEndpoint , {
            method: "POST",
            body: formData,
            redirect: redirectV,
        });

        var data = await res.json();
        return data;

    } catch (error) {
        return {};
    }
}

export const AddAdmin = async (pass, username) => {
    try {
        var formData = new FormData();
        formData.append('currentAdminUsername', Admin.username);
        formData.append('currentAdminPassword', Admin.password);
        formData.append('adminPassword', pass);
        formData.append('adminUsername', username);

        const res = await fetch(Host + adminAddEndpoint, {
            method: "POST",
            body: formData,
            redirect: redirectV,
        });

        return res.status == 200;

    } catch (error) {
        return false;
    }
}

export const EditAdmin = async (oldpass, old_username, newpass, new_username) => {
    try {
        var formData = new FormData();
        formData.append('currentAdminPassword', Admin.password);
        formData.append('currentAdminUsername', Admin.username);
        formData.append('oldAdminPassword', oldpass);
        formData.append('oldAdminUsername', old_username);
        formData.append('newAdminPassword', newpass);
        formData.append('newAdminUsername', new_username);

        const res = await fetch(Host + adminEditEndpoint, {
            method: "POST",
            body: formData,
            redirect: redirectV,
        });

        return res.status == 200;

    } catch (error) {
        return false;
    }
}


export const DeleteAdmin = async (delpass, delusername) => {
    try {
        var formData = new FormData();
        formData.append('currentAdminPassword', Admin.password);
        formData.append('currentAdminUsername', Admin.username);
        formData.append('adminPassword', delpass);
        formData.append('adminUsername', delusername);

        const res = await fetch(Host + adminDeleteEndpoint, {
            method: "POST",
            body: formData,
            redirect: redirectV,
        });

        return res.status == 200;

    } catch (error) {
        return false;
    }
}


export const SearchNews = async (search, filter, authors, page, amount) => {
    try {
        var formData  = new FormData();
        formData.append('search', search);
        formData.append('tags', filter);
        formData.append('post_authors', authors);
        formData.append('page', page);
        formData.append('amount', amount);

        const res = await fetch(Host + newsEndpoint + "search", {
            method: "POST",
            body: formData,
            redirect: redirectV,
        });
        // res.status == 200
        var data = await res.json();
        return data;

    } catch (error) {
        return {};
    }
}

export const DeleteNews = async (id, attachments, thumbnail) => {
    try {
        var formData = new FormData();
        formData.append('Id', id);
        formData.append('Attachments', attachments); // path
        formData.append('Thumbnail', thumbnail); // path
        formData.append('AdminUsername', Admin.username);
        formData.append('AdminPassword', Admin.password);

        const res = await fetch(Host + newsEndpoint + "delete", {
            method: "POST",
            body: formData,
            redirect: redirectV,
        });

        return res.status == 200;

    } catch (error) {
        return false;
    }
}


export const PostNews = async (data) => {
    try {
        var formData = new FormData();
        formData.append('AdminPassword', Admin.password);
        formData.append('AdminUsername', Admin.username);
        formData.append('Title', data[0]);
        formData.append('Tags', data[1]);
        formData.append('HTML_body', data[2]);
        formData.append('Attachments', data[3]);
        formData.append('Thumbnail', data[4]);

        const res = await fetch(Host + newsEndpoint, {
            method: 'POST',
            body: formData,
            redirect: redirectV,
        });


        return res.status == 200;

    } catch (error) {
      return false;
    }
}

export const EditNews = async (data) => {
  try {
    var formData = new FormData();
    formData.append('AdminPassword', Admin.password);
    formData.append('AdminUsername', Admin.username);
    formData.append('Title', data.Title);
    formData.append('Id', data.Id);
    formData.append('Tags', data.Tags);
    formData.append('HTML_body', data.Body);
    formData.append('NewAttachments', data.NewAttachments);
    formData.append('DeleteAttachments', data.DeleteAttachments);
    formData.append('Thumbnail', data.NewThumbnail);
    formData.append('DeleteThumbnail', data.DeleteThumbnail);

    const res = await fetch(Host + newsEndpoint + 'edit', {
      method: 'POST',
      body: formData,
      redirect: redirectV,
    });

    return res.status == 200;
    
  } catch (error) {
    return false;
  }
};
