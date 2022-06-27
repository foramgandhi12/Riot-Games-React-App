export default function ErrorHandler(data, M,history) {
    if (data.error) {
        console.log(data)
        if (data.error == "You must be logged in") {
            console.log(data.errcode)
            history.push("/login")
        }
        M.toast({ html: data.error, className: "" })
        return true
    }
    else return false
}