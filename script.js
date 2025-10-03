// Ждем загрузки страницы
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// Инициализация сайта
function initializeWebsite() {
    setupScrollAnimations();
    setupModalHandlers();
    setupFormHandlers();
    setupSmoothScroll();
    setupMobileMenu();
}

// Плавные анимации при скролле
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Добавляем анимации к элементам
    const animatedElements = document.querySelectorAll('.service-item, .step, .trust-item, .review-item, .faq-item');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Обработка модальных окон
function setupModalHandlers() {
    // Закрытие по клику вне модального окна
    window.onclick = function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    };

    // Закрытие по Escape
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeAllModals();
        }
    });
}

// Открытие модальных окон
function openCallbackModal() {
    document.getElementById('callbackModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function openHelpModal() {
    document.getElementById('helpModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function openConsultationModal() {
    document.getElementById('consultationModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function openGiftModal() {
    document.getElementById('giftModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Закрытие модальных окон
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
    document.body.style.overflow = 'auto';
}

function closeAllModals() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.style.display = 'none';
    });
    document.body.style.overflow = 'auto';
}

// Плавный скролл к секциям
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetTop = element.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: targetTop,
            behavior: 'smooth'
        });
    }
}

// Плавный скролл для всех внутренних ссылок
function setupSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
}

// Обработка форм
function setupFormHandlers() {
    // Форма обратного звонка
    const callbackForm = document.querySelector('.callback-form');
    if (callbackForm) {
        callbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmit(this, 'Заявка на обратный звонок');
        });
    }

    // Форма помощи
    const helpForm = document.querySelector('.help-form');
    if (helpForm) {
        helpForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmit(this, 'Заявка на помощь');
        });
    }

    // Форма консультации
    const consultationForm = document.querySelector('.consultation-form');
    if (consultationForm) {
        consultationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmit(this, 'Заявка на консультацию');
        });
    }

    // Форма подарочного сертификата
    const giftForm = document.querySelector('.gift-form');
    if (giftForm) {
        giftForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmit(this, 'Заказ подарочного сертификата');
        });
    }

    // Выбор подарочного сертификата
    const giftOptions = document.querySelectorAll('.gift-option');
    giftOptions.forEach(option => {
        option.addEventListener('click', function() {
            giftOptions.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
        });
    });
}

// Обработка отправки форм
function handleFormSubmit(form, formType) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Показываем индикатор загрузки
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Отправляем...';
    submitButton.disabled = true;

    // Имитация отправки (в реальном проекте здесь будет AJAX запрос)
    setTimeout(() => {
        // Успешная отправка
        showSuccessMessage(formType);
        form.reset();
        closeAllModals();
        
        // Возвращаем кнопку в исходное состояние
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // В реальном проекте здесь будет отправка данных на сервер
        console.log('Отправлена форма:', formType, data);
    }, 2000);
}

// Показ сообщения об успешной отправке
function showSuccessMessage(formType) {
    const message = document.createElement('div');
    message.className = 'success-message';
    message.innerHTML = `
        <div class="success-content">
            <i class="fas fa-check-circle"></i>
            <h3>Заявка отправлена!</h3>
            <p>Спасибо! Мы свяжемся с вами в ближайшее время.</p>
        </div>
    `;
    
    // Стили для сообщения
    message.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 3000;
        animation: fadeIn 0.3s;
    `;
    
    const successContent = message.querySelector('.success-content');
    successContent.style.cssText = `
        background: white;
        padding: 40px;
        border-radius: 15px;
        text-align: center;
        max-width: 400px;
        animation: slideIn 0.3s;
    `;
    
    const icon = message.querySelector('i');
    icon.style.cssText = `
        font-size: 60px;
        color: #28a745;
        margin-bottom: 20px;
    `;
    
    const title = message.querySelector('h3');
    title.style.cssText = `
        font-size: 24px;
        color: #2c5aa0;
        margin-bottom: 15px;
    `;
    
    const text = message.querySelector('p');
    text.style.cssText = `
        font-size: 18px;
        color: #666;
    `;
    
    document.body.appendChild(message);
    
    // Автоматическое закрытие через 3 секунды
    setTimeout(() => {
        message.remove();
    }, 3000);
    
    // Закрытие по клику
    message.addEventListener('click', () => {
        message.remove();
    });
}

// Мобильное меню (если понадобится в будущем)
function setupMobileMenu() {
    // Пока не используется, но готово для расширения
}

// Маска для телефонных номеров
function setupPhoneMask() {
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 0) {
                if (value.length <= 1) {
                    value = '+7 (' + value;
                } else if (value.length <= 4) {
                    value = '+7 (' + value.substring(1);
                } else if (value.length <= 7) {
                    value = '+7 (' + value.substring(1, 4) + ') ' + value.substring(4);
                } else if (value.length <= 9) {
                    value = '+7 (' + value.substring(1, 4) + ') ' + value.substring(4, 7) + '-' + value.substring(7);
                } else {
                    value = '+7 (' + value.substring(1, 4) + ') ' + value.substring(4, 7) + '-' + value.substring(7, 9) + '-' + value.substring(9, 11);
                }
            }
            e.target.value = value;
        });
    });
}

// Функции для улучшения доступности
function toggleHighContrast() {
    document.body.classList.toggle('high-contrast');
    localStorage.setItem('highContrast', document.body.classList.contains('high-contrast'));
}

function toggleLargeText() {
    document.body.classList.toggle('large-text');
    localStorage.setItem('largeText', document.body.classList.contains('large-text'));
}

// Восстановление настроек доступности
function restoreAccessibilitySettings() {
    if (localStorage.getItem('highContrast') === 'true') {
        document.body.classList.add('high-contrast');
    }
    if (localStorage.getItem('largeText') === 'true') {
        document.body.classList.add('large-text');
    }
}

// Отслеживание скролла для показа кнопки "наверх"
function setupScrollToTop() {
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollButton.className = 'scroll-to-top';
    scrollButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 60px;
        height: 60px;
        background: #ff6b35;
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(255, 107, 53, 0.3);
    `;
    
    document.body.appendChild(scrollButton);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollButton.style.opacity = '1';
            scrollButton.style.visibility = 'visible';
        } else {
            scrollButton.style.opacity = '0';
            scrollButton.style.visibility = 'hidden';
        }
    });
    
    scrollButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Инициализация дополнительных функций
document.addEventListener('DOMContentLoaded', function() {
    setupPhoneMask();
    restoreAccessibilitySettings();
    setupScrollToTop();
});

// Функция для валидации форм
function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.style.borderColor = '#dc3545';
            isValid = false;
        } else {
            field.style.borderColor = '#ddd';
        }
        
        // Дополнительная валидация для телефона
        if (field.type === 'tel' && field.value.trim()) {
            const phoneRegex = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
            if (!phoneRegex.test(field.value)) {
                field.style.borderColor = '#dc3545';
                isValid = false;
            }
        }
        
        // Валидация email
        if (field.type === 'email' && field.value.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                field.style.borderColor = '#dc3545';
                isValid = false;
            }
        }
    });
    
    return isValid;
}

// Обработчик изменения размера окна
window.addEventListener('resize', function() {
    // Закрываем модальные окна при изменении ориентации на мобильных
    if (window.innerWidth !== window.outerWidth) {
        closeAllModals();
    }
});

// Предотвращение отправки формы по Enter в полях (кроме textarea)
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA' && e.target.tagName !== 'BUTTON') {
        const form = e.target.closest('form');
        if (form) {
            e.preventDefault();
            const submitButton = form.querySelector('button[type="submit"]');
            if (submitButton) {
                submitButton.click();
            }
        }
    }
});

// Анимация числовых показателей (если понадобится)
function animateNumbers() {
    const numbers = document.querySelectorAll('.animate-number');
    numbers.forEach(number => {
        const finalNumber = parseInt(number.getAttribute('data-number'));
        let currentNumber = 0;
        const increment = finalNumber / 100;
        
        const timer = setInterval(() => {
            currentNumber += increment;
            if (currentNumber >= finalNumber) {
                currentNumber = finalNumber;
                clearInterval(timer);
            }
            number.textContent = Math.floor(currentNumber).toLocaleString();
        }, 20);
    });
}

// Загрузка и отображение отзывов (заглушка для будущего расширения)
function loadReviews() {
    // Здесь можно подключить загрузку отзывов с сервера
    console.log('Отзывы загружены');
}

// Система уведомлений
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#2c5aa0'};
        color: white;
        border-radius: 8px;
        z-index: 2000;
        animation: slideInRight 0.3s;
        max-width: 300px;
        font-size: 16px;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// CSS анимации для уведомлений
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); }
        to { transform: translateX(0); }
    }
    @keyframes slideOutRight {
        from { transform: translateX(0); }
        to { transform: translateX(100%); }
    }
`;
document.head.appendChild(style);
