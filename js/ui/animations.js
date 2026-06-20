class AnimationManager {

    static triggerConfetti() {

        const canvas =
            document.getElementById(
                "confettiCanvas"
            );

        if(!canvas){

            return;

        }

        const ctx =
            canvas.getContext("2d");

        canvas.width =
            window.innerWidth;

        canvas.height =
            window.innerHeight;

        const particles = [];

        for(let i=0;i<150;i++){

            particles.push({

                x:
                Math.random()
                *
                canvas.width,

                y:
                Math.random()
                *
                canvas.height,

                size:
                Math.random()*8+2,

                speed:
                Math.random()*3+1,

                color:
                [
                    "#6C63FF",
                    "#00D9FF",
                    "#22C55E",
                    "#EF4444",
                    "#FFD700"
                ][
                    Math.floor(
                        Math.random()*5
                    )
                ]

            });

        }

        function animate(){

            ctx.clearRect(
                0,
                0,
                canvas.width,
                canvas.height
            );

            particles.forEach(
                particle => {

                    ctx.fillStyle =
                        particle.color;

                    ctx.fillRect(

                        particle.x,

                        particle.y,

                        particle.size,

                        particle.size

                    );

                    particle.y +=
                        particle.speed;

                    if(
                        particle.y >
                        canvas.height
                    ){

                        particle.y =
                            -10;

                    }

                }
            );

            requestAnimationFrame(
                animate
            );

        }

        animate();

        setTimeout(() => {

            ctx.clearRect(
                0,
                0,
                canvas.width,
                canvas.height
            );

        },5000);

    }

    static pulse(element){

        element.classList.add(
            "pulse"
        );

        setTimeout(() => {

            element.classList.remove(
                "pulse"
            );

        },1000);

    }

    static shake(element){

        element.classList.add(
            "shake"
        );

        setTimeout(() => {

            element.classList.remove(
                "shake"
            );

        },800);

    }

}