const section1 = document.querySelector('.section_1');
        const section2 = document.querySelector('.section_2');

        section1.addEventListener('mouseover', () => {
            section1.style.width = '864px';
            section1.style.height = '596px';
            section2.style.width = '596px';
            section2.style.height = '596px';
        });

        section1.addEventListener('mouseout', () => {
            section1.style.width = '762px';
            section1.style.height = '538px';
            section2.style.width = '538px';
            section2.style.height = '538px';
        });

        section2.addEventListener('mouseover', () => {
            section2.style.width = '609px';
            section2.style.height = '596px';
            section1.style.width = '690px';
            section1.style.height = '596px';
        });

        section2.addEventListener('mouseout', () => {
            section2.style.width = '538px';
            section2.style.height = '538px';
            section1.style.width = '762px';
            section1.style.height = '538px';
        });

        // 타이핑 효과
        const splitWords = () => {
            const textNode = document.querySelector(".text");
            const text = textNode.textContent;
            const newDomElements = text.split(" ").map((text) => {
                return `<span class="word">${text}</span>`;
            });
            textNode.innerHTML = newDomElements.join("");
        };

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



    // 문서가 로드될 때 실행될 함수를 정의합니다.
    document.addEventListener('DOMContentLoaded', function() {
        // 오디오 요소를 생성합니다.
        const audio = new Audio('/mp3/타이핑소리.mp3');

        // autoplay 속성을 추가합니다.
        audio.autoplay = true;

        // 오디오 컨트롤러를 추가하지 않습니다.
        audio.controls = false;

        // 오디오를 페이지에 추가합니다.
        document.body.appendChild(audio);

        // 3초 후에 오디오를 멈춥니다.
        setTimeout(() => {
            audio.pause();
        }, 2000); // 3000 milliseconds = 3 seconds
    });