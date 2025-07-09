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
    if (this.dots[0]) {
      this.dots[0].classList.add("active")
    }

    // Add click events to dots
    this.dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        if (index !== this.currentSlide && !this.isTransitioning) {
          this.showSlide(index)
          this.pauseAutoSlide()
          this.startAutoSlide()
        }
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
    if (this.isTransitioning || index === this.currentSlide) return

    this.isTransitioning = true

    const currentSlideElement = this.slides[this.currentSlide]
    const nextSlideElement = this.slides[index]

    // Update dots
    this.dots.forEach((dot) => dot.classList.remove("active"))
    if (this.dots[index]) {
      this.dots[index].classList.add("active")
    }

    // Start transition
    nextSlideElement.style.opacity = "0"
    nextSlideElement.classList.add("active")

    // Fade out current slide and fade in next slide
    currentSlideElement.style.opacity = "0"

    setTimeout(() => {
      nextSlideElement.style.opacity = "1"
    }, 50)

    setTimeout(() => {
      currentSlideElement.classList.remove("active")
      currentSlideElement.style.opacity = ""
      nextSlideElement.style.opacity = ""

      this.currentSlide = index
      this.isTransitioning = false
    }, 800)
  }

  nextSlide() {
    if (this.isTransitioning) return
    const nextIndex = (this.currentSlide + 1) % this.slides.length
    this.showSlide(nextIndex)
  }

  startAutoSlide() {
    this.pauseAutoSlide()
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
}

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

// Intersection Observer for scroll animations
class ScrollAnimation {
  constructor() {
    this.init()
  }

  init() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = "running"
        }
      })
    }, observerOptions)

    // Observe feature cards
    const featureCards = document.querySelectorAll(".ul-feature")
    featureCards.forEach((card) => {
      card.style.animationPlayState = "paused"
      observer.observe(card)
    })
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new HeroSlider()
  new StatsCounter()
  new ScrollAnimation()
})
