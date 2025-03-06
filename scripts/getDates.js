let d = new Date();
document.querySelector("#copyright").innerHTML = `&copy;${d.getFullYear()}`;
document.querySelector("#lastModified").innerHTML = `Last modified: ${document.lastModified}`;
