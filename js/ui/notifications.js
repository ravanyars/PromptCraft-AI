class NotificationManager {

    static show(
        message,
        type = "success"
    ) {

        const toast =
            document.createElement(
                "div"
            );

        toast.className =
            `toast ${type}`;

        toast.textContent =
            message;

        document.body.appendChild(
            toast
        );

        setTimeout(() => {

            toast.classList.add(
                "show"
            );

        }, 100);

        setTimeout(() => {

            toast.classList.remove(
                "show"
            );

            setTimeout(() => {

                toast.remove();

            }, 300);

        }, 3000);

    }

    static success(message) {

        this.show(
            message,
            "success"
        );

    }

    static error(message) {

        this.show(
            message,
            "error"
        );

    }

    static warning(message) {

        this.show(
            message,
            "warning"
        );

    }

    static hint(message) {

        this.show(
            message,
            "hint"
        );

    }

}