lucide.createIcons();


// Lenis

const lenis = new Lenis();

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

let lastScrollTop = 0;
let isScrollingDown = false;
const scrollThreshold = 5;
const activationThreshold = 50;
lenis.on('scroll', ({ scroll }) => {
    requestAnimationFrame(() => {
        currentScroll = scroll;
        const header = document.querySelector('.header');
        if (!header) return;

        if (Math.abs(currentScroll - lastScrollTop) > scrollThreshold) {
            isScrollingDown = currentScroll > lastScrollTop;
            lastScrollTop = currentScroll;
        }

        if (isScrollingDown && currentScroll > activationThreshold && window.innerWidth > 750) {
            header.classList.add('back');
        } else {
            header.classList.remove('back');
        }
    });
});


let buttons = document.querySelectorAll('.button')

buttons.forEach((element, index) => {
    let text = element.textContent
    element.textContent = '';
    let wrap = document.createElement('div');
    wrap.classList.add('button-wrap');
    let animate = document.createElement('div');
    animate.classList.add('button-animate');
    wrap.appendChild(animate);
    element.appendChild(wrap);
    for (let index = 0; index < 2; index++) {
        let span = document.createElement('span')
        span.textContent = text;
        animate.appendChild(span);
    }
    let height = animate.clientHeight
    animate.style.maxHeight = `${height / 2}px`;
})

// Review 

function BackgroundCircle() {
    let serviceCircle = document.querySelectorAll('.informaion-service, .platform-service')
    if (serviceCircle.length == 0) return;
    serviceCircle.forEach((element, index) => {
        let text = element.querySelector('span').textContent;
        let circle = element.querySelector('.circle');
        if (text.trim() == 'Trustpilot') {
            circle.style.background = '#00B67A';
        } else if (text.trim() == 'Google') {
            circle.style.background = '#4285F4';
        } else {
            circle.style.background = '#FC3F1D';
        }
    })
}




document.addEventListener('alpine:init', () => {
    Alpine.data('reviewWidget', () => ({
        reviews: [
            {
                id: 1,
                name: 'Антон Рагулин',
                source: 'Trustpilot',
                date: '2025-12-15',
                rating: 5,
                text: 'Надежный сервис обмена, можно доверять. Они всегда стараются сделать все возможное для вас, делая вашу жизнь проще.'
            },
            {
                id: 2,
                name: 'Мария Соколова',
                source: 'Google',
                date: '2026-01-10',
                rating: 5,
                text: 'Пользуюсь сервисом уже полгода. Быстрые переводы, выгодные курсы и отличная поддержка.'
            },
            {
                id: 3,
                name: 'Дмитрий Волков',
                source: 'Яндекс',
                date: '2026-01-05',
                rating: 5,
                text: 'Отличный сервис для обмена криптовалюты. Интуитивно понятный интерфейс и быстрая обработка.'
            },
            {
                id: 4,
                name: 'Елена Петрова',
                source: 'Trustpilot',
                date: '2025-12-28',
                rating: 5,
                text: 'Профессиональный подход к клиентам. Курсы обмена одни из лучших на рынке.'
            },
            {
                id: 5,
                name: 'Иван Иванов',
                source: 'Google',
                date: '2026-01-12',
                rating: 5,
                text: 'Отличный сервис, быстро и удобно!'
            },
            {
                id: 6,
                name: 'Ольга Сидорова',
                source: 'Яндекс',
                date: '2026-01-08',
                rating: 5,
                text: 'Лучший обменник, с которым я работал!'
            },
            {
                id: 7,
                name: 'Сергей Кузнецов',
                source: 'Trustpilot',
                date: '2026-01-03',
                rating: 5,
                text: 'Быстрая обработка заявок, рекомендую!'
            },
            {
                id: 8,
                name: 'Анна Морозова',
                source: 'Google',
                date: '2025-12-20',
                rating: 5,
                text: 'Отличный курс и моментальный перевод!'
            },
            {
                id: 9,
                name: 'Павел Новиков',
                source: 'Яндекс',
                date: '2025-12-18',
                rating: 5,
                text: 'Удобный интерфейс и отличная поддержка!'
            }
        ],

        initialCount: 4,
        step: 4,

        visibleCount: 4,

        get visibleReviews() {
            return this.reviews.slice(0, this.visibleCount);
        },

        get remainingCount() {
            return this.reviews.length - this.visibleCount;
        },

        get hasMoreReviews() {
            return this.visibleCount < this.reviews.length;
        },

        getInitial(name) {
            return name ? name.charAt(0).toUpperCase() : '?';
        },

        formatDate(dateString) {
            const date = new Date(dateString);
            const options = { day: 'numeric', month: 'long', year: 'numeric' };
            return date.toLocaleDateString('ru-RU', options);
        },

        loadMore() {
            this.visibleCount = Math.min(
                this.visibleCount + this.step,
                this.reviews.length
            );
            setTimeout(() => {
                BackgroundCircle()
                lucide.createIcons();
                lenis.resize();
            }, 100);
        },

        init() {
            this.visibleCount = this.initialCount;
            setTimeout(() => {
                BackgroundCircle();
                lucide.createIcons();
            }, 100);
        }
    }));
});

// Faq 

document.querySelectorAll('.faq-item').forEach((el) => {
    el.addEventListener('click', function () {
        setTimeout(() => {
            lenis.resize();
        }, 200);
    })
})

document.querySelector('.open-country').addEventListener('click', function () {
    setTimeout(() => {
        lenis.resize();
    }, 200);
})


//Request
const inputs = document.querySelectorAll("input[type='tel']");
inputs.forEach((el) => {
    window.intlTelInput(el, {
        loadUtils: () => import("https://cdn.jsdelivr.net/npm/intl-tel-input@26.0.1/build/js/utils.js"),
    });
})



let methods = document.querySelectorAll('.choose-method span')
let inputMethod = document.querySelector('#method')
methods.forEach((el, index) => {
    el.addEventListener('click', function () {
        methods.forEach((el, index) => { el.classList.remove('choose') })
        el.classList.add('choose');
        let value = el.textContent;
        inputMethod.value = value;
    })
})