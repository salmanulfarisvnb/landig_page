// Initialize Lucide icons
lucide.createIcons();

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
    }
  });
}, observerOptions);

// Toast notification function
function showToast(message, type = "success") {
  // Remove existing toasts
  const existingToasts = document.querySelectorAll(".custom-toast");
  existingToasts.forEach((toast) => toast.remove());

  // Create toast container if it doesn't exist
  let toastContainer = document.getElementById("toast-container");
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.id = "toast-container";
    toastContainer.className =
      "fixed top-4 right-4 z-[9999] flex flex-col gap-3";
    document.body.appendChild(toastContainer);
  }

  // Create toast element
  const toast = document.createElement("div");
  toast.className = `custom-toast animate-slide-up bg-gray-900/95 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 shadow-2xl shadow-brand-500/20 flex items-center gap-3 min-w-[320px] max-w-[400px] transform translate-x-full transition-all duration-500`;

  // Set icon and colors based on type
  let icon, bgColor, textColor, borderColor;
  if (type === "success") {
    icon = '<i data-lucide="check-circle" class="w-5 h-5 text-green-400"></i>';
    bgColor = "bg-green-500/10";
    textColor = "text-green-400";
    borderColor = "border-green-500/30";
  } else if (type === "error") {
    icon = '<i data-lucide="alert-circle" class="w-5 h-5 text-red-400"></i>';
    bgColor = "bg-red-500/10";
    textColor = "text-red-400";
    borderColor = "border-red-500/30";
  } else {
    icon = '<i data-lucide="info" class="w-5 h-5 text-blue-400"></i>';
    bgColor = "bg-blue-500/10";
    textColor = "text-blue-400";
    borderColor = "border-blue-500/30";
  }

  toast.className = `custom-toast animate-slide-up ${bgColor} backdrop-blur-sm border ${borderColor} rounded-xl p-4 shadow-2xl shadow-brand-500/20 flex items-center gap-3 min-w-[320px] max-w-[400px] transform translate-x-full transition-all duration-500`;

  toast.innerHTML = `
    <div class="flex-shrink-0">
      ${icon}
    </div>
    <div class="flex-1">
      <p class="text-sm font-medium text-white">${message}</p>
    </div>
    <button class="flex-shrink-0 text-gray-400 hover:text-white transition-colors duration-200" onclick="this.parentElement.remove()">
      <i data-lucide="x" class="w-4 h-4"></i>
    </button>
  `;

  // Add to container
  toastContainer.appendChild(toast);

  // Animate in
  setTimeout(() => {
    toast.classList.remove("translate-x-full");
    toast.classList.add("translate-x-0");
  }, 100);

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (toast.parentElement) {
      toast.classList.add("translate-x-full");
      setTimeout(() => {
        if (toast.parentElement) {
          toast.remove();
        }
      }, 500);
    }
  }, 5000);

  // Re-initialize Lucide icons for the new elements
  lucide.createIcons();
}

// Form submission handling
document.addEventListener("DOMContentLoaded", function () {
  // Existing observer for fade-in
  const animatedElements = document.querySelectorAll('[class*="animate-"]');
  animatedElements.forEach((el) => observer.observe(el));

  // Enhanced card interactions
  const cards = document.querySelectorAll(".hover-lift");
  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.zIndex = "50";
    });
    card.addEventListener("mouseleave", function () {
      this.style.zIndex = "auto";
    });
  });

  // --- Section Slide/Fade Animations ---
  const sectionSelectors = [
    "#home",
    "#pricing",
    "#about",
    "#services",
    "#contact",
  ];
  sectionSelectors.forEach((selector, idx) => {
    const section = document.querySelector(selector);
    if (section) {
      section.classList.add("scroll-animate-section");
      section.style.opacity = "0";
      section.style.transform = `translateY(${40 + idx * 10}px)`;
    }
  });

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.transition =
            "opacity 0.9s cubic-bezier(0.4,0,0.2,1), transform 1.1s cubic-bezier(0.4,0,0.2,1)";
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll(".scroll-animate-section").forEach((section) => {
    sectionObserver.observe(section);
  });

  // --- Animate images and text inside sections ---
  const slideInElements = document.querySelectorAll(".slide-in-on-scroll");
  slideInElements.forEach((el, i) => {
    el.style.opacity = "0";
    el.style.transform = i % 2 === 0 ? "translateX(-60px)" : "translateX(60px)";
  });
  const slideInObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.transition =
            "opacity 0.8s cubic-bezier(0.4,0,0.2,1), transform 1s cubic-bezier(0.4,0,0.2,1)";
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateX(0)";
        }
      });
    },
    { threshold: 0.15 }
  );
  document
    .querySelectorAll(".slide-in-on-scroll")
    .forEach((el) => slideInObserver.observe(el));

  // --- Parallax backgrounds ---
  const parallaxEls = document.querySelectorAll(".parallax-bg");
  window.addEventListener("scroll", function () {
    const scrollY = window.scrollY;
    parallaxEls.forEach((el, i) => {
      const speed = el.getAttribute("data-parallax-speed") || 0.2 + i * 0.05;
      el.style.transform = `translateY(${scrollY * speed}px)`;
    });
  });

  // Contact form submission
  const contactForm = document.querySelector('form[action*="formspree.io"]');
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form data
      const formData = new FormData(this);
      const submitButton = this.querySelector('button[type="submit"]');
      const originalText = submitButton.innerHTML;

      // Show loading state
      submitButton.innerHTML = `
        <div class="flex items-center gap-2">
          <div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          <span>Sending...</span>
        </div>
      `;
      submitButton.disabled = true;

      // Submit form
      fetch(this.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.ok) {
            showToast(
              "Thank you! Your message has been sent successfully. We'll get back to you soon!",
              "success"
            );
            this.reset(); // Clear form
          } else {
            showToast(
              "Oops! Something went wrong. Please try again or contact us directly.",
              "error"
            );
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          showToast(
            "Network error. Please check your connection and try again.",
            "error"
          );
        })
        .finally(() => {
          // Reset button
          submitButton.innerHTML = originalText;
          submitButton.disabled = false;
        });
    });
  }
});
