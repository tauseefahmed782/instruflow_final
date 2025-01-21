const menu = document.querySelector("nav .bg")

document.querySelector(".group .bars").addEventListener("click", () => menu.classList.add("active"))
document.querySelector(".bg .menu .close").addEventListener("click", () => menu.classList.remove("active"))

menu.addEventListener("click", (e) => {
  e.stopPropagation();

  if (!e.target.classList.contains("bg")) return;
  menu.classList.remove("active")
})

window.onload = () => {

  Array.from(document.querySelectorAll(".menu .items")).forEach(elem => {
    elem.addEventListener("click", (e) => {
      e.stopPropagation()
      elem.classList.toggle("active")
    })


    const sMenu1 = elem.querySelectorAll(".subMenu")

    

    sMenu1.forEach(el => {

      el.addEventListener("click", (e) => e.stopPropagation())

      el.querySelectorAll(".sub-items").forEach((ele) => {
        ele?.addEventListener("click", (e) => {
          ele.classList.toggle("active")
        })

        const sMenu2 = el.querySelectorAll(".subMenu")

      sMenu2.forEach(e => {
        e.addEventListener("click", (e) => e.stopPropagation())
      })
    })
    
    


      
    })

  })
}
