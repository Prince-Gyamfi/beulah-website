class HeroSlider {
  constructor() {
    this.slides = document.querySelectorAll(".ul-hero-slide")
    this.dots = document.querySelectorAll(".ul-hero-dot")
    this.currentSlide = 0
    this.slideInterval = null
    this.autoSlideDelay = 5000 // 5 seconds
    this.isTransitioning = false

    this.init()
  }

  init() {
    if (this.slides.length === 0) return

    // Show first slide
    this.slides[0].classList.add("active")
    this.dots[0].classList.add("active")

    // Add click events to dots
    this.dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        if (index !== this.currentSlide) {
          this.showSlide(index)
        }
      })
    })

    // Start auto-sliding
    this.slideInterval = setInterval(() => {
      this.nextSlide()
    }, this.autoSlideDelay)

    // Pause on hover
    const slider = document.querySelector(".ul-hero-image-slider")
    if (slider) {
      slider.addEventListener("mouseenter", () => this.pauseAutoSlide())
      slider.addEventListener("mouseleave", () => this.startAutoSlide())
    }

    // Add smooth scroll animation for overlay text
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animationDelay = "0.3s"
          entry.target.style.animation = "slideInUp 0.6s ease-out forwards"
        }
      })
    })

    // Observe all slide overlays
    document.querySelectorAll(".ul-hero-slide-overlay").forEach((overlay) => {
      observer.observe(overlay)
    })
  }

  showSlide(index) {
    if (this.isTransitioning) return
    this.isTransitioning = true

    // Hide all slides
    this.slides.forEach((slide) => slide.classList.remove("active"))
    this.dots.forEach((dot) => dot.classList.remove("active"))

    // Add fade-out class to current slide
    this.slides[this.currentSlide].classList.add("fade-out")

    setTimeout(() => {
      // Remove fade-out class and add active class to new slide
      this.slides[this.currentSlide].classList.remove("fade-out")
      this.slides[index].classList.add("active", "fade-in")
      this.dots[index].classList.add("active")

      this.currentSlide = index

      setTimeout(() => {
        this.slides[index].classList.remove("fade-in")
        this.isTransitioning = false
      }, 100)
    }, 400)
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

// Add CSS animation keyframes
const style = document.createElement("style")
style.textContent = `
    @keyframes slideInUp {
        from {
            transform: translateY(30px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
`
document.head.appendChild(style)
