'use strict';

{
    let counter1 = 0; // スクロール正の値用
    let counter2 = 1; // スクロール負の値用
    let bool = true; // ページ最初、最後の目印

    const sections = document.querySelectorAll('section');
    const progress = document.querySelector('.progress h2');
    const circles = document.querySelectorAll('.circle');
    const menu = document.querySelector('.menu');
    const section1wrapper = document.querySelector('.section-1-wrapper');
    const section5wrapper = document.querySelector('.section-5-wrapper');
    const home = document.getElementById('home');
    const vineyards = document.getElementById('vineyards');
    const grapes = document.getElementById('grapes');
    const wine = document.getElementById('wine');
    const contact = document.getElementById('contact');

    section1wrapper.style.transform = 'scale(1)';

    const progressCounter = () => {
        progress.textContent = `${counter2}/${sections.length}`;

        circles.forEach(circle => {
            circle.style.backgroundColor = 'transparent';
        });
        document.querySelector(`.circle-${counter2}`).style.backgroundColor = '#ddd';
    };

    const pageController = () => {
        bool = true;

        if (counter1 === 5) {
            sections.forEach(section => {
                section.style.left = '0';
            });
            counter1 = 0;
            counter2 = 1;
            section1wrapper.style.transform = 'scale(1)';
            section5wrapper.style.transform = 'scale(1.5)';

            progressCounter();
            bool = false;
        }

        if (counter1 === -1) {
            sections.forEach(section => {
                if (section.classList[0] === 'section-5') {
                    return;
                }
                section.style.left = '-100vw';
            });
            counter1 = 4;
            counter2 = 5;
            section1wrapper.style.transform = 'scale(1.5)';
            section5wrapper.style.transform = 'scale(1)';

            progressCounter();
            bool = false;
        }
        progressCounter();
        return bool;
    };

    window.addEventListener('wheel', e => {
        const deltaY = e.deltaY > 0;
        if (deltaY) {
            counter1++;
            counter2++;
        } else {
            counter1--;
            counter2--;
        }

        pageController();

        // bool === false（最初、最終ページ）のときは、何もせずに終わる。bool === trueのときはページ変更
        if(bool) {
            document.querySelector(`.section-${deltaY ? counter1 : counter2}`).style.left = `${deltaY ? '-100vw' : '0'}`;

            document.querySelector(`.section-${deltaY ? counter1 : counter2}-wrapper`).style.transform = `scale(${deltaY ? '1.5' : '1'})`;

            document.querySelector(`.section-${deltaY ? counter1 + 1 : counter2 + 1}-wrapper`).style.transform = `scale(${deltaY ? '1' : '1.5'})`;
        }

    });


    // 左ボタン
    document.querySelector('.left-btn').addEventListener('click', () => {
        counter1--;
        counter2--;
        pageController() && (document.querySelector(`.section-${counter2}`).style.left = '0');

        if(bool) {
            document.querySelector(`.section-${counter2}-wrapper`).style.transform = 'scale(1)';
            document.querySelector(`.section-${counter2 + 1}-wrapper`).style.transform = 'scale(1.5)';
        }
    });

    // 右ボタン
    document.querySelector('.right-btn').addEventListener('click', () => {
        counter1++;
        counter2++;
        pageController() && (document.querySelector(`.section-${counter1}`).style.left = '-100vw');

        if(bool) {
            document.querySelector(`.section-${counter2}-wrapper`).style.transform = 'scale(1)';
            document.querySelector(`.section-${counter1}-wrapper`).style.transform = 'scale(1.5)';
        }
    });


    // .section-3-wrapper アニメーション
    document.querySelector('.grapes-img').addEventListener('mouseover', () => {
        document.querySelector('.section-3-wrapper').style.opacity = '.8';
    });

    document.querySelector('.grapes-img').addEventListener('mouseout', () => {
        document.querySelector('.section-3-wrapper').style.opacity = '1';
    });


    // hamburger-menu
    menu.addEventListener('click', () => {
        document.querySelector('.navbar').classList.toggle('change');
    });


    // anchor
    function styleLeft(n) {
        sections.forEach((section, i) => {
            if(i <= n) {
                section.style.left = '-100vw';
            } else {
                section.style.left = '0';
            }
        });
    }

    function styleTransform() {
        for(let i = 0; i < sections.length; i++) {
            document.querySelector(`.section-${i + 1}-wrapper`).style.transform = 'scale(1.5)';
        };
        document.querySelector(`.section-${counter2}-wrapper`).style.transform = 'scale(1)';
    }

    function removeChange() {
        document.querySelector('.navbar').classList.remove('change');
    }

    home.addEventListener('click', () => {
        counter1 = 0;
        counter2 = 1;
        pageController() && (sections.forEach(section => {
            section.style.left = '0';
        }));

        styleTransform();
        removeChange();
    });

    vineyards.addEventListener('click', () => {
        counter1 = 1;
        counter2 = 2;
        pageController() && styleLeft(0);

        styleTransform();
        removeChange();
    });

    grapes.addEventListener('click', () => {
        counter1 = 2;
        counter2 = 3;
        pageController() && styleLeft(1);

        styleTransform();
        removeChange();
    });

    wine.addEventListener('click', () => {
        counter1 = 3;
        counter2 = 4;
        pageController() && styleLeft(2);

        styleTransform();
        removeChange();
    });

    contact.addEventListener('click', () => {
        counter1 = 4;
        counter2 = 5;
        pageController() && styleLeft(3);

        styleTransform();
        removeChange();
    });
}
