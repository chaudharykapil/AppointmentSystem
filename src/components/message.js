export function showMessagge(){
    let msg = localStorage.getItem("message")
    if(msg){
        alert(msg)
        localStorage.removeItem("message")
    }
}
export function loadmsg(msg){
    localStorage.setItem("message",msg)
}