class HeroSlider {
  constructor() {
    this.slides = document.querySelectorAll(".ul-hero-slide")
    this.dots = document.querySelectorAll(".ul-hero-dot")
    this.currentSlide = 0
    this.slideInterval = null
    this.autoSlideDelay = 4000 // 4 seconds

    this.init()
  }

  init() {
    if (this.slides.length === 0) return

    // Show first slide
    this.showSlide(0)

    // Add click events to dots
    this.dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        this.goToSlide(index)
      })
    })

    // Start auto-sliding
    this.startAutoSlide()

    // Pause on hover
    const slider = document.querySelector(".ul-hero-image-slider")
    if (slider) {
      slider.addEventListener("mouseenter", () => this.pauseAutoSlide())
      slider.addEventListener("mouseleave", () => this.startAutoSlide())
    }
  }

  showSlide(index) {
    // Hide all slides
    this.slides.forEach((slide) => slide.classList.remove("active"))
    this.dots.forEach((dot) => dot.classList.remove("active"))

    // Show current slide
    if (this.slides[index]) {
      this.slides[index].classList.add("active")
    }

    if (this.dots[index]) {
      this.dots[index].classList.add("active")
    }

    this.currentSlide = index
  }

  nextSlide() {
    const nextIndex = (this.currentSlide + 1) % this.slides.length
    this.showSlide(nextIndex)
  }

  goToSlide(index) {
    this.showSlide(index)
    this.restartAutoSlide()
  }

  startAutoSlide() {
    this.slideInterval = setInterval(() => {
      this.nextSlide()
    }, this.autoSlideDelay)
  }

  pauseAutoSlide() {
    if (this.slideInterval) {
      clearInterval(this.slideInterval)
      this.slideInterval = null
    }
  }

  restartAutoSlide() {
    this.pauseAutoSlide()
    this.startAutoSlide()
  }
}

// Initialize slider when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new HeroSlider()
})

// Counter animation for stats
class StatsCounter {
  constructor() {
    this.init()
  }

  init() {
    const stats = document.querySelectorAll(".ul-hero-stat-number")
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.animateCounter(entry.target)
          observer.unobserve(entry.target)
        }
      })
    })

    stats.forEach((stat) => observer.observe(stat))
  }

  animateCounter(element) {
    const target = element.textContent
    const number = Number.parseInt(target.replace(/[^\d]/g, ""))
    const suffix = target.replace(/[\d]/g, "")
    const duration = 2000
    const increment = number / (duration / 16)
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= number) {
        current = number
        clearInterval(timer)
      }

      if (suffix.includes("M")) {
        element.textContent = `$${Math.floor(current)}M${suffix.includes("+") ? "+" : ""}`
      } else if (suffix.includes("K")) {
        element.textContent = `${Math.floor(current)}K${suffix.includes("+") ? "+" : ""}`
      } else {
        element.textContent = `${Math.floor(current)}${suffix}`
      }
    }, 16)
  }
}

// Initialize stats counter
document.addEventListener("DOMContentLoaded", () => {
  new StatsCounter()
})
