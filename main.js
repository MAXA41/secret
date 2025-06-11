document.addEventListener('DOMContentLoaded', function() {
    // Мобільне меню
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    
    mobileMenuBtn.addEventListener('click', function() {
        mainNav.style.display = mainNav.style.display === 'block' ? 'none' : 'block';
    });
    
    // Плавна прокрутка для всіх посилань
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Завантаження популярних шаблонів
    const templatesGrid = document.querySelector('.templates-grid');
    
    if (templatesGrid) {
        const templates = [
            {
                id: 1,
                title: 'Літній відпочинок',
                category: 'Подорожі',
                image: 'images/templates/template1.jpg',
                downloads: 1245,
                isPremium: false
            },
            {
                id: 2,
                title: 'Кавовий ранок',
                category: 'Їжа',
                image: 'images/templates/template2.jpg',
                downloads: 987,
                isPremium: true
            },
            {
                id: 3,
                title: 'Фітнес виклик',
                category: 'Фітнес',
                image: 'images/templates/template3.jpg',
                downloads: 1567,
                isPremium: false
            },
            {
                id: 4,
                title: 'Бізнес презентація',
                category: 'Бізнес',
                image: 'images/templates/template4.jpg',
                downloads: 765,
                isPremium: true
            }
        ];
        
        templates.forEach(template => {
            const templateCard = document.createElement('div');
            templateCard.className = 'template-card';
            templateCard.innerHTML = `
                <div class="template-image">
                    <img src="${template.image}" alt="${template.title}">
                    ${template.isPremium ? '<span class="premium-badge">Premium</span>' : ''}
                </div>
                <div class="template-info">
                    <h3>${template.title}</h3>
                    <div class="template-meta">
                        <span class="category">${template.category}</span>
                        <span class="downloads"><i class="fas fa-download"></i> ${template.downloads}</span>
                    </div>
                    <a href="#" class="btn btn-primary btn-sm">Завантажити</a>
                </div>
            `;
            templatesGrid.appendChild(templateCard);
        });
    }
    
    // Обробник форми підписки
    const subscribeForm = document.querySelector('.subscribe-form');
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email && validateEmail(email)) {
                alert('Дякуємо за підписку! На ваш email будуть надходити оновлення.');
                emailInput.value = '';
            } else {
                alert('Будь ласка, введіть коректну email адресу.');
            }
        });
    }
    
    // Валідація email
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});