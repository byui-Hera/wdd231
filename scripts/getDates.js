let d = new Date();
const copyrightElement = document.querySelector("#copyright");
if (copyrightElement) {
	copyrightElement.innerHTML = `&copy;${d.getFullYear()}`;
}
const lastModifiedElement = document.querySelector("#lastModified");
if (lastModifiedElement) {
	lastModifiedElement.innerHTML = `Last modified: ${document.lastModified}`;
}
