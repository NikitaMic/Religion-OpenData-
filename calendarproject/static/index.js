document.addEventListener("DOMContentLoaded", () => {
    const wrapper = document.querySelector("#wrapper")
    wrapper.addEventListener("change", search)
})

async function search(){
    let region = document.querySelector("#region-select").value
    let year = document.querySelector("#year-select").value
    let religion = document.querySelector("#religion-select").value
    if (religion && year && region !== undefined){
    fetch("africa", {
        method: "POST",
        body: JSON.stringify({
        year: year,
        region: region,
        religion: religion
    })})
        .then(re => re.json())
        .then(resp => {
        if (region === "West. Hem") {
            region = "The Western Hemisphere"
            }
        else if (region === "Mideast"){
            region = "The Middle East"
            }
        document.querySelector("#result").innerText = "In " + year + " there were " + resp.data + " \n " + religion + " in " + region

        })}
}
