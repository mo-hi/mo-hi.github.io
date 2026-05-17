const config = {
    theme: document.querySelector('input[name="theme"]:checked').value,
    mainWidth: document.querySelector('input[name="mainWidth"]:checked').value,
}

function foo() {
    
}

function Reset() {
    document.getElementById('id-form-theme').reset()
    document.getElementById('id-form-mainWidth').reset()
}

function _UpdateConfig() {
    config["theme"] = document.querySelector('input[name="theme"]:checked').value,
    config["mainWidth"] = document.querySelector('input[name="mainWidth"]:checked').value
}

function Update() {
    _UpdateConfig() 

    document.body.className = config["theme"]
    document.querySelector('main').className = "w-responsive-" + config["mainWidth"]

    document.getElementById("id-html-code-show").innerHTML = ""
    ExposeHTML({
        divToExpose: getTruncatedHTML(document.body, 1), 
        divToAppend: document.getElementById("id-html-code-show"),
        outer: true,
        pretty: true, 
        textAreaClassName: "code",})
}