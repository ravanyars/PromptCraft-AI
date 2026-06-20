class Modal {

    constructor(id) {

        this.modal =
            document.getElementById(
                id
            );

    }

    open() {

        this.modal.classList.remove(
            "hidden"
        );

    }

    close() {

        this.modal.classList.add(
            "hidden"
        );

    }

    setContent(content) {

        const body =
            this.modal.querySelector(
                ".modal-body"
            );

        if(body){

            body.innerHTML =
                content;

        }

    }

}