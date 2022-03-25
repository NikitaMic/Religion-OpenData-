document.addEventListener("DOMContentLoaded", () => {
    const submit = document.querySelector("#submit")
    submit.addEventListener("click", search)
})

async function search(){
    const year = document.querySelector("#year-select").value
    const region = document.querySelector("#region-select").value
    const religion = document.querySelector("#religion-select").value
    fetch("africa", {
        method: "POST",
        body: JSON.stringify({
        year: year,
        region: region,
        religion: "Christian"
    })})
        .then(re => re.json())
        .then(resp => {
        document.querySelector("#result").innerText = "In " + year + " there were " + resp.data + " Christians in " + region
        })
}
