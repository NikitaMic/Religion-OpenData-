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
        if (region === "West. Hem" && religion !== "People on Earth") {
            region = "The Western Hemisphere"
            document.querySelector("#result").innerText = "In " + year + " there were " + resp.data + " \n " + religion + " in " + region
            }
        else if (region === "Mideast" && religion !== "People on Earth"){
            region = "The Middle East"
            document.querySelector("#result").innerText = "In " + year + " there were " + resp.data + " \n " + religion + " in " + region
        }
        else if (religion === "People on Earth"){
            region = "People on Earth"
            document.querySelector("#result").innerText = "In " + year + " there were " + resp.data + " \n " + region
        }
        else {
            document.querySelector("#result").innerText = "In " + year + " there were " + resp.data + " \n " + religion + " in " + region
        }

        })}
}
