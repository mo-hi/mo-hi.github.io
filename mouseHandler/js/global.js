
function function_Click (event)  {
    if (typeof event === "object" && event instanceof MouseEvent) {
        id = event.currentTarget.id}
    document.getElementById("out-click").innerHTML = "Click: " + id 
    // + cUSERINPUT_EVENT["event"].srcElement.id
}

function function_Hover (event)  {
    if (typeof event === "object" && event instanceof MouseEvent) {
        id = event.currentTarget.id}
    document.getElementById("out-hover").innerHTML = "Hover: " + id
}

function function_Tipp(event)  {
    if (typeof event === "object" && event instanceof KeyboardEvent) {
    document.getElementById("out-tipp").innerHTML += event.key}
}