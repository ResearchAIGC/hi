// Language toggle functionality
document.addEventListener('DOMContentLoaded', function() {
  // Get DOM elements for desktop
  const languageToggle = document.getElementById('language-toggle');
  const languageDropdown = document.getElementById('language-dropdown');
  const currentLanguageElement = document.getElementById('current-language');
  const languageLinks = document.querySelectorAll('#language-dropdown a[data-lang]');
  
  // Get DOM elements for mobile
  const languageToggleMobile = document.getElementById('language-toggle-mobile');
  const languageDropdownMobile = document.getElementById('language-dropdown-mobile');
  const currentLanguageElementMobile = document.getElementById('current-language-mobile');
  const languageLinksMobile = document.querySelectorAll('#language-dropdown-mobile a[data-lang]');

  // Close dropdown when clicking outside (always add this listener)
  document.addEventListener('click', function() {
    if (languageDropdown) {
      languageDropdown.classList.add('hidden');
    }
    if (languageDropdownMobile) {
      languageDropdownMobile.classList.add('hidden');
    }
  });

  // Toggle desktop dropdown menu
  if (languageToggle && languageDropdown) {
    languageToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      languageDropdown.classList.toggle('hidden');
      // Close mobile dropdown if open
      if (languageDropdownMobile) {
        languageDropdownMobile.classList.add('hidden');
      }
    });

    // Prevent dropdown from closing when clicking inside
    languageDropdown.addEventListener('click', function(e) {
      e.stopPropagation();
    });
  }

  // Toggle mobile dropdown menu
  if (languageToggleMobile && languageDropdownMobile) {
    languageToggleMobile.addEventListener('click', function(e) {
      e.stopPropagation();
      languageDropdownMobile.classList.toggle('hidden');
      // Close desktop dropdown if open
      if (languageDropdown) {
        languageDropdown.classList.add('hidden');
      }
    });

    // Prevent dropdown from closing when clicking inside
    languageDropdownMobile.addEventListener('click', function(e) {
      e.stopPropagation();
    });
  }

  // Handle language selection for desktop links
  languageLinks.forEach(link => {
    link.addEventListener('click', function() {
      const selectedLang = this.getAttribute('data-lang');
      handleLanguageChange(selectedLang);
    });
  });
  
  // Handle language selection for mobile links
  languageLinksMobile.forEach(link => {
    link.addEventListener('click', function() {
      const selectedLang = this.getAttribute('data-lang');
      handleLanguageChange(selectedLang);
    });
  });
  
  // Common function to handle language change
  function handleLanguageChange(selectedLang) {
    // Save selected language to localStorage first
    localStorage.setItem('preferredLanguage', selectedLang);
    
    // Check if we're on a blog post page
    const isBlogPost = window.location.pathname.includes('/blog/');
    
    if (isBlogPost) {
      // For blog posts, we need to redirect to the translated version
      const currentPath = window.location.pathname;
      
      // Extract year, month, day from current URL (format: /blog/YYYY/MM/DD/slug/)
      const blogPathRegex = /\/blog\/(\d{4})\/(\d{2})\/(\d{2})\/(.*?)\//;
      const match = currentPath.match(blogPathRegex);
      
      if (match) {
        const year = match[1];
        const month = match[2];
        const day = match[3];
        const currentSlug = match[4];
        
        // Remove -zh suffix if present to get the base slug
        const baseSlug = currentSlug.endsWith('-zh') ? currentSlug.replace('-zh', '') : currentSlug;
        
        // Determine target slug based on selected language
        let targetSlug;
        if (selectedLang === 'zh') {
          // User clicked Chinese, switch to Chinese version
          targetSlug = `${baseSlug}-zh`;
        } else {
          // User clicked English, switch to English version
          targetSlug = baseSlug;
        }
        
        // Build target URL
        const targetUrl = `/blog/${year}/${month}/${day}/${targetSlug}/`;
        
        // Redirect to the correct language version
        window.location.href = targetUrl;
        return;
      }
    }
    
    // Update current language display for desktop
    if (currentLanguageElement) {
      currentLanguageElement.textContent = selectedLang.toUpperCase();
    }
    
    // Update current language display for mobile
    if (currentLanguageElementMobile) {
      currentLanguageElementMobile.textContent = selectedLang.toUpperCase();
    }
    
    // Save selected language to localStorage
    localStorage.setItem('preferredLanguage', selectedLang);
    
    // Update all translated elements on the page
    updatePageLanguage(selectedLang);
    
    // Trigger custom event for language change
    const event = new CustomEvent('languageChanged', {
      detail: { lang: selectedLang }
    });
    document.dispatchEvent(event);
    
    // Close both dropdowns
    if (languageDropdown) {
      languageDropdown.classList.add('hidden');
    }
    if (languageDropdownMobile) {
      languageDropdownMobile.classList.add('hidden');
    }
  }

  // Initialize with preferred language
  function initializeLanguage() {
    // Get preferred language from localStorage or use page language as fallback
    const preferredLang = localStorage.getItem('preferredLanguage') || document.documentElement.getAttribute('lang') || 'en';
    
    // Update current language display for desktop
    if (currentLanguageElement) {
      currentLanguageElement.textContent = preferredLang.toUpperCase();
    }
    
    // Update current language display for mobile
    if (currentLanguageElementMobile) {
      currentLanguageElementMobile.textContent = preferredLang.toUpperCase();
    }
    
    // Update page content
    updatePageLanguage(preferredLang);
    
    // Trigger custom event for language change on page load
    const event = new CustomEvent('languageChanged', {
      detail: { lang: preferredLang }
    });
    document.dispatchEvent(event);
  }
  
  // Mobile navigation menu toggle
  const mobileNavToggle = document.getElementById('mobile-nav-toggle');
  const mobileNavMenu = document.getElementById('mobile-nav-menu');
  
  if (mobileNavToggle && mobileNavMenu) {
    mobileNavToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      mobileNavMenu.classList.toggle('hidden');
      // Close both language dropdowns if open
      if (languageDropdown) {
        languageDropdown.classList.add('hidden');
      }
      if (languageDropdownMobile) {
        languageDropdownMobile.classList.add('hidden');
      }
      
      // Toggle aria-expanded attribute
      const isExpanded = !mobileNavMenu.classList.contains('hidden');
      mobileNavToggle.setAttribute('aria-expanded', isExpanded);
    });
  }

  // Update all translated elements on the page
  function updatePageLanguage(lang) {
    // Get all elements that need translation (both data-i18n and data-i18n-html)
    const elements = document.querySelectorAll('[data-i18n], [data-i18n-html]');
    
    elements.forEach(element => {
      let key, translation;
      
      // Check if the element has either data-i18n or data-i18n-html attribute
      if (element.hasAttribute('data-i18n')) {
        key = element.getAttribute('data-i18n');
      } else if (element.hasAttribute('data-i18n-html')) {
        key = element.getAttribute('data-i18n-html');
      }
      
      if (key) {
        translation = getTranslation(key, lang);
        
        if (translation) {
          // Format translation for special cases
          const formattedTranslation = formatTranslation(translation, key, element);
          
          // Check if the element is an input or textarea
          if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            element.setAttribute('placeholder', formattedTranslation);
          } else {
            // Check if the element has HTML content
            if (element.hasAttribute('data-i18n-html')) {
              element.innerHTML = formattedTranslation;
            } else {
              element.textContent = formattedTranslation;
            }
          }
        }
      }
    });
    

    

    // Update all elements with JSON translations
    const translatedElements = document.querySelectorAll('[data-translations]');
    translatedElements.forEach(element => {
      try {
        const translations = JSON.parse(element.getAttribute('data-translations'));
        const contentTypes = Object.keys(translations);
        
        contentTypes.forEach(contentType => {
          const contentTypeTranslations = translations[contentType];
          if (contentTypeTranslations[lang]) {
            element.textContent = contentTypeTranslations[lang];
          }
        });
      } catch (error) {
        console.error('Error parsing translations:', error);
      }
    });
    
    // Update CV items
    const cvItemsEn = document.querySelectorAll('.cv-item-en');
    const cvItemsZh = document.querySelectorAll('.cv-item-zh');
    
    cvItemsEn.forEach(item => {
      item.classList.toggle('hidden', lang === 'zh');
    });
    
    cvItemsZh.forEach(item => {
      item.classList.toggle('hidden', lang === 'en');
    });
    
    // Update CV header information only on CV page
    if (window.location.pathname.includes('/cv/')) {
      const cvNameElement = document.querySelector('main h1:first-of-type');
      const cvPositionElement = document.querySelector('main h1 + p');
      
      if (cvNameElement) {
        const siteTitle = getTranslation('site.title', lang);
        if (siteTitle) {
          cvNameElement.textContent = siteTitle;
        }
      }
      
      if (cvPositionElement) {
        const sitePosition = getTranslation('site.position', lang);
        if (sitePosition) {
          cvPositionElement.textContent = sitePosition;
        }
      }
    }
    
    // Update the lang attribute on the html tag
    document.documentElement.setAttribute('lang', lang);
    
    // Update page title and description
    updatePageMeta(lang);
  }
  
  // Update page title and description meta tags
  function updatePageMeta(lang) {
    // Get the page's base title and description from data attributes
    const titleElement = document.querySelector('title');
    const descriptionElement = document.querySelector('meta[name="description"]');
    
    if (titleElement && descriptionElement) {
      // Check if we have i18n translations for the site title and description
      const siteTitle = getTranslation('site.title', lang);
      const siteDescription = getTranslation('site.description', lang);
      
      if (siteTitle) {
        // Update the title
        titleElement.textContent = siteTitle;
      }
      
      if (siteDescription) {
        // Update the description meta tag
        descriptionElement.setAttribute('content', siteDescription);
      }
    }
  }
  
  // Handle special cases for translation keys
  function formatTranslation(translation, key, _element) {
    // Special handling for post.back_to_blog to include the arrow
    if (key === 'post.back_to_blog') {
      return '← ' + translation;
    }
    return translation;
  }

  // Get translation from the global i18n object
  function getTranslation(key, lang) {
    // Check if window.i18n is available (set by the template)
    if (typeof window.i18n === 'object' && window.i18n[lang]) {
      const keys = key.split('.');
      let value = window.i18n[lang];
      
      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = value[k];
        } else {
          return null;
        }
      }
      
      // Replace template variables
      if (typeof value === 'string') {
        // Get the site data from i18n
        const siteData = window.i18n && window.i18n[lang] && window.i18n[lang].site;
        const siteName = siteData && siteData.title ? siteData.title : 'Your Name';
        const sitePosition = siteData && siteData.position ? siteData.position : 'AI Researcher';
        
        value = value.replace(/\{\{\s*site\.name\s*\}\}/g, siteName);
        value = value.replace(/\{\{\s*site\.position\s*\}\}/g, sitePosition);
        // Replace site.time with current year
        value = value.replace(/\{\{\s*site\.time\s*\|\s*date:\s*['"]%Y['"]\s*\}\}/g, new Date().getFullYear());
        
        // Convert Markdown links to HTML
        value = value.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
        // Convert newlines to HTML line breaks
        value = value.replace(/\n/g, '<br>');
        // Remove trailing line breaks
        value = value.trim();
      }
      
      return value;
    }
    
    return null;
  }

  // Initialize language on page load
  initializeLanguage();
});
