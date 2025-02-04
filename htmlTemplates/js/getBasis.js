let scriptSrc = ''; let cssSrc = ''
if (window.location.hostname === "") {
    scriptSrc = "../basis/js/b.js"
    cssSrc = "../basis/css/b.css"
} else {
    scriptSrc = "https://mo-hi.github.io/basis/js/b.js"
    cssSrc = "https://mo-hi.github.io/basis/css/b.css"
}

document.write('<script src="' + scriptSrc + '"><' + '/script>');

//  document.write also posssibe, but load is better
let link = document.createElement('link');
link.rel = 'stylesheet'; 
link.href = cssSrc
document.head.appendChild(link)