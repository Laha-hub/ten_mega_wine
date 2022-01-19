'use strict';

{
    let counter1 = 0; // スクロール正の値用
    let counter2 = 1; // スクロール負の値用
    const sections = document.querySelectorAll('section');

    window.addEventListener('wheel', e => {
        const deltaY = e.deltaY > 0;
        if (deltaY) {
            counter1++;
            counter2++;
        } else {
            counter1--;
            counter2--;
        }

        if (counter1 === 5) {
            sections.forEach(section => {
                section.style.left = '0';
            });
            counter1 = 0;
            counter2 = 1;
            return;
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
        }

        document.querySelector(`.section-${deltaY ? counter1 : counter2}`).style.left = `${deltaY ? '-100vw' : '0'}`;

    });
}
