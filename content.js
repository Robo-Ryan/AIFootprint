class ChatGPTCarbonTracker {
  constructor() {
    this.messageCount = 0
    this.widget = null
    this.isVisible = false
    this.init()
  }

  init() {
    this.getMessageCount()
    this.createWidget()
    this.setupEventListeners()

    // Update message count periodically
    setInterval(() => {
      this.getMessageCount()
      this.updateWidget()
    }, 5000)
  }

  getMessageCount() {
    try {
      // Get message counts from localStorage
      const loggedInCount = Number.parseInt(localStorage.getItem("oai/apps/loggedInUserMessageCount") || "0")
      const noAuthCount = Number.parseInt(localStorage.getItem("oai/apps/noAuthUserMessageCount") || "0")
      this.messageCount = loggedInCount + noAuthCount
    } catch (error) {
      console.error("Error reading message count:", error)
      this.messageCount = 0
    }
  }

  calculateImpact() {
    // Rough estimates based on AI model energy consumption
    // Assuming ~0.003 kWh per message and ~475g CO2 per kWh
    const energyPerMessage = 0.003 // kWh
    const co2PerKwh = 475 // grams
    const offsetCostPerTon = 20 // USD per metric ton

    const totalEnergy = this.messageCount * energyPerMessage
    const totalCO2 = (totalEnergy * co2PerKwh) / 1000 // convert to kg
    const offsetCost = (totalCO2 / 1000) * offsetCostPerTon // convert to metric tons

    return {
      messages: this.messageCount,
      energy: totalEnergy,
      co2: totalCO2,
      offsetCost: Math.max(0.01, offsetCost), // minimum $0.01
    }
  }

  createWidget() {
    this.widget = document.createElement("div")
    this.widget.id = "carbon-tracker-widget"
    this.widget.className = "carbon-widget"

    document.body.appendChild(this.widget)
    this.updateWidget()
  }

  updateWidget() {
    if (!this.widget) return

    const impact = this.calculateImpact()

    this.widget.innerHTML = `
      <div class="carbon-widget-header">
        <div class="carbon-widget-icon">🌍</div>
        <h3>Impact Estimate</h3>
        <button class="carbon-widget-toggle" onclick="this.parentElement.parentElement.classList.toggle('minimized')">−</button>
      </div>
      <div class="carbon-widget-content">
        <div class="carbon-widget-subtitle">Environmental impact for ${impact.messages} messages</div>
        
        <div class="carbon-metric energy">
          <span class="metric-label">Energy Consumption</span>
          <span class="metric-value">${impact.energy.toFixed(4)} kWh</span>
        </div>
        
        <div class="carbon-metric emissions">
          <span class="metric-label">CO₂ Emissions</span>
          <span class="metric-value">${impact.co2.toFixed(2)} g</span>
        </div>
        
        <div class="carbon-metric offset-cost">
          <span class="metric-label">Carbon Offset Cost</span>
          <span class="metric-value">$${impact.offsetCost.toFixed(2)}</span>
        </div>
        
        <button class="carbon-offset-btn" onclick="window.open('https://carbonfund.org/donate/', '_blank')">
          <span class="btn-icon">🌱</span>
          Donate Carbon Offset
        </button>
        
        <div class="carbon-widget-footer">
          <p>Offset ${(impact.co2 / 1000000).toFixed(6)} metric tons via Carbonfund.org</p>
          <small>* Estimates based on average AI model energy consumption<br>
          * Actual impact may vary based on model efficiency and usage patterns<br>
          * Carbon offset cost calculated at $20/metric ton via Carbonfund.org</small>
        </div>
      </div>
    `
  }

  setupEventListeners() {
    // Make widget draggable
    let isDragging = false
    let currentX
    let currentY
    let initialX
    let initialY
    let xOffset = 0
    let yOffset = 0

    const dragStart = (e) => {
      if (e.target.classList.contains("carbon-widget-header") || e.target.tagName === "H3") {
        initialX = e.clientX - xOffset
        initialY = e.clientY - yOffset
        isDragging = true
      }
    }

    const dragEnd = () => {
      initialX = currentX
      initialY = currentY
      isDragging = false
    }

    const drag = (e) => {
      if (isDragging) {
        e.preventDefault()
        currentX = e.clientX - initialX
        currentY = e.clientY - initialY
        xOffset = currentX
        yOffset = currentY
        this.widget.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`
      }
    }

    document.addEventListener("mousedown", dragStart)
    document.addEventListener("mouseup", dragEnd)
    document.addEventListener("mousemove", drag)
  }
}

// Initialize the tracker when the page loads
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    new ChatGPTCarbonTracker()
  })
} else {
  new ChatGPTCarbonTracker()
}
