const section1 = document.querySelector('.section_1');
const section2 = document.querySelector('.section_2');

function displayPosts(posts) {
    const section1 = document.getElementById('section_1');
    const section2 = document.getElementById('section_2');
    const containerBottom = document.querySelector('.Container_bottom');

    section1.innerHTML = ''; // 기존 게시글 제거
    section2.innerHTML = ''; // 기존 게시글 제거
    containerBottom.innerHTML = ''; // 기존 게시글 제거

    posts.forEach((post, index) => {
        const postElement = document.createElement('div');
        // postElement.classList.add('post');

        postElement.innerHTML = `
<div class="QPart" style="padding-left: 40px;">
            <p class="Q">Q</p><p class="QTitle">${post.title}</p>
        </div>
        <p class="detailQ">${post.content}</p>
        <div class="APart" style="padding-left: 40px;">
            <p class="A">A</p><p class="ATitle">${post.comments && post.comments.length > 0 ? post.comments[0].content : '댓글 없음'}
</p>
        </div>
        `;

        if (index === 0) {
            section1.appendChild(postElement);
        } else if (index === 1) {
            section2.appendChild(postElement);

             // section2에 있는 detailQ 요소에만 타이핑 효과 적용
            const detailQElement = postElement.querySelector('.detailQ');
            splitWords(detailQElement);
            typeEffect(detailQElement, 50); // 타이핑 속도 설정
        } else {
            const sectionIndex = index - 2; // section_3부터 시작
            let section = document.getElementById(`section_3`);
            if (!section) {
                section = document.createElement('div');
                section.id = `section_3}`;
                section.classList.add(`section_3`);
                containerBottom.appendChild(section);
            }
            section.appendChild(postElement);
        }
    });
}

// 카테고리 제목 요소에 이벤트 리스너를 추가
const categoryTitles = document.querySelectorAll('.category-title');
const defaultActiveTitle = document.querySelector('.category-title.on');

categoryTitles.forEach(title => {
    title.addEventListener('click', () => {
        categoryTitles.forEach(t => t.classList.remove('on'));
        title.classList.add('on');
        const category = title.getAttribute('data-category');
        fetchPostsByCategory(category);
    });
});

// 페이지 로드 시 기본 카테고리 게시글 로드
if (defaultActiveTitle) {
    const defaultCategory = defaultActiveTitle.getAttribute('data-category');
    fetchPostsByCategory(defaultCategory);
}

// 섹션 요소에 마우스 오버/아웃 이벤트 리스너를 추가
const section1Element = document.querySelector('.section_1');
const section2Element = document.querySelector('.section_2');

if (section1Element && section2Element) {
    section1Element.addEventListener('mouseover', () => {
        section1Element.style.width = '864px';
        section1Element.style.height = '596px';
        section2Element.style.width = '538px';
        section2Element.style.height = '596px';
    });

    section1Element.addEventListener('mouseout', () => {
        section1Element.style.width = '762px';
        section1Element.style.height = '538px';
        section2Element.style.width = '538px';
        section2Element.style.height = '538px';
    });

    section2Element.addEventListener('mouseover', () => {
        section2Element.style.width = '609px';
        section2Element.style.height = '596px';
        section1Element.style.width = '690px';
        section1Element.style.height = '596px';
    });

    section2Element.addEventListener('mouseout', () => {
        section2Element.style.width = '538px';
        section2Element.style.height = '538px';
        section1Element.style.width = '762px';
        section1Element.style.height = '538px';
    });
}

// 카테고리별로 게시글을 가져오는 함수
function fetchPostsByCategory(category) {
    console.log(category);
    fetch(`http://43.203.128.248:3000/posts?boardType=${category}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            if (!Array.isArray(data)) {
                throw new TypeError('Expected an array but got ' + typeof data);
            }
            displayPosts(data);
        })
        .catch(error => console.error('Error fetching posts:', error));
}

function typeEffect(element, speed) {
    const text = element.textContent;
    element.textContent = "";
    element.style.visibility = "visible";

    let i = 0;
    const timer = setInterval(function() {
        if (i < text.length) {
            element.append(text.charAt(i));
            i++;
        } else {
            clearInterval(timer);
        }
    }, speed);
}

function splitWords(textNode) {
    const text = textNode.textContent;
    const newDomElements = text.split(" ").map((text) => {
        return `<span class="word">${text}</span>`;
    });
    textNode.innerHTML = newDomElements.join(" ");
}

const renderCanvas = () => {
    const Engine = Matter.Engine;
    const Render = Matter.Render;
    const World = Matter.World;
    const Bodies = Matter.Bodies;
    const Runner = Matter.Runner;
    const params = {
        isStatic: true,
        render: {
            fillStyle: "transparent"
        }
    };
    const canvasSize = {
        width: window.innerWidth,
        height: window.innerHeight
    };
    const engine = Engine.create({});

    const render = Render.create({
        element: document.body,
        engine: engine,
        options: {
            ...canvasSize,
            background: "transparent",
            wireframes: false
        }
    });
    const floor = Bodies.rectangle(
        canvasSize.width / 2,
        canvasSize.height,
        canvasSize.width,
        50,
        params
    );
    const wall1 = Bodies.rectangle(
        0,
        canvasSize.height / 2,
        50,
        canvasSize.height,
        params
    );
    const wall2 = Bodies.rectangle(
        canvasSize.width,
        canvasSize.height / 2,
        50,
        canvasSize.height,
        params
    );
    const top = Bodies.rectangle(
        canvasSize.width / 2,
        0,
        canvasSize.width,
        50,
        params
    );
    const wordElements = document.querySelectorAll(".word");
    const wordBodies = [...wordElements].map((elemRef) => {
        const width = elemRef.offsetWidth;
        const height = elemRef.offsetHeight;

        return {
            body: Matter.Bodies.rectangle(canvasSize.width / 2, 0, width, height, {
                render: {
                    fillStyle: "transparent"
                }
            }),
            elem: elemRef,
            render() {
                const { x, y } = this.body.position;
                this.elem.style.top = `${y - 20}px`;
                this.elem.style.left = `${x - width / 2}px`;
                this.elem.style.transform = `rotate(${this.body.angle}rad)`;
            }
        };
    });

    const mouse = Matter.Mouse.create(document.body);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
        mouse,
        constraint: {
            stiffness: 0.2,
            render: {
                visible: false
            }
        }
    });
    mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
    mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);

    World.add(engine.world, [
        floor,
        ...wordBodies.map((box) => box.body),
        wall1,
        wall2,
        top,
        mouseConstraint
    ]);
    render.mouse = mouse;
    Runner.run(engine);
    Render.run(render);

    (function rerender() {
        wordBodies.forEach((element) => {
            element.render();
        });
        Matter.Engine.update(engine);
        requestAnimationFrame(rerender);
    })();
};

window.addEventListener("DOMContentLoaded", (event) => {
    splitWords();
    renderCanvas();
});