const itemsContainer = document.querySelector("#list-items")
const STORAGE_KEY = "colorsList"
const API_URL = "https://reqres.in/api/unknown"
const API_KEY = "reqres-free-v1" // 🔑 Tu API key

// Renderiza un solo color
function addItem(item) {
    const colourCard = document.createElement("section")
    colourCard.className = "card w-75 shadow-sm mb-3"
    itemsContainer.append(colourCard)

    const colourCardBody = document.createElement("article")
    colourCardBody.className = "card-body"
    colourCard.append(colourCardBody)

    const colourCardTitle = document.createElement("h5")
    colourCardTitle.className = "card-title"
    colourCardTitle.innerText = item.name
    colourCardBody.append(colourCardTitle)

    const colourCardText = document.createElement("p")
    colourCardText.className = "card-text"
    colourCardText.innerText = item.pantone_value
    colourCardBody.append(colourCardText)

    const colourCardColour = document.createElement("figure")
    colourCardColour.style = `background-color: ${item.color}; padding: 15px; border-radius: 8px; color: white; text-align: center;`
    colourCardColour.innerText = item.color
    colourCardBody.append(colourCardColour)
}

// Hace fetch al API y guarda en localStorage
async function fetchColorsList() {
    try {
        const response = await fetch(API_URL, {
            headers: {
                "x-api-key": API_KEY
            }
        })

        if (!response.ok) {
            throw new Error("Error en la petición: " + response.status)
        }

        const data = await response.json()
        const colors = data.data

        // Guardar en localStorage
        localStorage.setItem(STORAGE_KEY, JSON.stringify(colors))

        // Renderizar
        colors.forEach(addItem)
    } catch (error) {
        console.error("Error al obtener los colores:", error)
    }
}

// Cargar desde localStorage
function loadColorsFromStorage() {
    const storedColors = localStorage.getItem(STORAGE_KEY)
    if (storedColors) {
        const colors = JSON.parse(storedColors)
        colors.forEach(addItem)
    } else {
        fetchColorsList()
    }
}

// Inicio
loadColorsFromStorage()