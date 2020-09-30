'use strict'

// Make navbar transparent when it is on the top
// 제일 위 목록 고정 상단바 밑 배경 만드는 코드.
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;

document.addEventListener('scroll', () => {
    if (window.scrollY > navbarHeight) {
        navbar.classList.add('navbar--dark');
    } else {
        navbar.classList.remove('navbar--dark');
    }
})

// Handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (event) => {
    const target = event.target;
    const link = target.dataset.link;
    if (link == null) {
        return;
    }
    // remove('open')을 scrollIntoView()위에 써서 핸드폰 사이즈 메뉴바로 메뉴 선택시 선택 영역으로 스크롤링 되면서 메뉴는 사라지게 만든다.
    navbarMenu.classList.remove('open');
    scrollIntoView(link);
})

// Navbar toggle button for small screen
const navbarToggleBtn = document.querySelector('.navbar__toggle-btn');
navbarToggleBtn.addEventListener('click', () => {
    navbarMenu.classList.toggle('open');
});


// Handle click on "contact me" button on home
const contactMe = document.querySelector('.home__contact');
contactMe.addEventListener('click', () => {
    scrollIntoView('#contact');
});

// Make home slowly fade to transparent as the window scrolls down
// 스크롤을 통해 화면을 내리면 home__container에 있는 글자들의 투명도가 낮아진다.
const home = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height //높이 구하기
document.addEventListener('scroll', () => {
    home.style.opacity = 1 - window.scrollY / homeHeight;
});

// Show "arrow up" button when scrolling down
const arrowUp = document.querySelector('.arrow-up');
document.addEventListener('scroll', () => {
    if (window.scrollY > homeHeight / 2) {
        arrowUp.classList.add('visible');
    } else {
        arrowUp.classList.remove('visible');
    }
});

//Handle click on the "Arrow up" button
arrowUp.addEventListener('click', () => {
    scrollIntoView('#home');
});

// Project를 눌렀을때 그것만 보여주는 기능
const workBtnContainer = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project');
workBtnContainer.addEventListener('click', (e) => {
    const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
    if (filter == null) {
        return;
    }

    // Remove selection from the previous item and select the new one
    // work부분에서 새로 클릭된 부분(ex.front-end,react,javascipt)을 선택했을때
    // 그 부분에 색깔이 가면서 포커스가 맞춰지게 하기
    const active = document.querySelector('.category__btn.selected');
    active.classList.remove('selected');
    const target = e.target.nodeName === 'BUTTON' ? e.target : e.target.parentNode;
    target.classList.add('selected');

    projectContainer.classList.add('anim-out');
    setTimeout(() => {
        projects.forEach((project) => {
            if (filter === '*' || filter === project.dataset.type) {
                project.classList.remove('invisible');
            } else {
                project.classList.add('invisible');
            }
        });
        projectContainer.classList.remove('anim-out');
    }, 300)
    // 위에 forEach(project)는
    // let project;
    // for(let i = 0; i < projects.length; i++) {
    //     project = projects[i];
    // }
    // 와 같은 의미 같은 코드임.

    console.log(filter);
});


// 중복되는 스크롤 코드가 있기에 스크롤 함수를 하나 만들었다.
// (selector)를 넣어주면 scrollIntoView() <- 괄호안에 원하는 셀렉터를 주면 된다.
function scrollIntoView(selector) {
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({ behavior: 'smooth' });
}





