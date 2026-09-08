document.addEventListener("DOMContentLoaded", function () {

    const boton = document.getElementById("botonTelegram");

    const TELEGRAM_USUARIO = "USUARIO_TELEGRAM";

    boton.addEventListener("click", function () {

        if (TELEGRAM_USUARIO === "USUARIO_TELEGRAM") {
            alert(
                "El asistente de Telegram todavía está en configuración."
            );
            return;
        }

        window.location.href =
            "https://t.me/" + TELEGRAM_USUARIO;
    });

});
/* =========================================================
   VARIABLES
========================================================= */

const body = document.body;

const header =
    document.getElementById("header");

const mobileMenuButton =
    document.getElementById("mobileMenuButton");

const mobileMenu =
    document.getElementById("mobileMenu");

const searchButton =
    document.getElementById("searchButton");

const searchOverlay =
    document.getElementById("searchOverlay");

const closeSearch =
    document.getElementById("closeSearch");

const searchInput =
    document.getElementById("searchInput");

const searchResults =
    document.getElementById("searchResults");

const cartButton =
    document.getElementById("cartButton");

const cartDrawer =
    document.getElementById("cartDrawer");

const cartOverlay =
    document.getElementById("cartOverlay");

const closeCart =
    document.getElementById("closeCart");

const cartItemsContainer =
    document.getElementById("cartItems");

const cartCount =
    document.getElementById("cartCount");

const cartTotal =
    document.getElementById("cartTotal");

const checkoutButton =
    document.getElementById("checkoutButton");

const toast =
    document.getElementById("toast");



/* =========================================================
   PRODUCTOS
========================================================= */

const products = [

    {
        name: "AirPods",
        price: 90000
    },

    {
        name: "Cable USB-C",
        price: 25000
    },

    {
        name: "Parlante Bluetooth",
        price: 70000
    },

    {
        name: "Trípode",
        price: 45000
    },

    {
        name: "Cargador 25W",
        price: 50000
    },

    {
        name: "Powerbank",
        price: 70000
    }

];


let cart = [];



/* =========================================================
   FORMATO MONEDA
========================================================= */

function formatPrice(price) {

    return new Intl.NumberFormat(
        "es-CO",
        {
            style: "currency",
            currency: "COP",
            maximumFractionDigits: 0
        }
    ).format(price);

}



/* =========================================================
   HEADER SCROLL
========================================================= */

function updateHeader() {

    if (window.scrollY > 40) {

        header.classList.add(
            "scrolled"
        );

    } else {

        header.classList.remove(
            "scrolled"
        );

    }

}


window.addEventListener(
    "scroll",
    updateHeader,
    {
        passive: true
    }
);



/* =========================================================
   MENÚ MÓVIL
========================================================= */

mobileMenuButton.addEventListener(
    "click",
    () => {

        mobileMenu.classList.toggle(
            "open"
        );

    }
);


document
    .querySelectorAll(
        ".mobile-menu a"
    )
    .forEach(
        link => {

            link.addEventListener(
                "click",
                () => {

                    mobileMenu.classList.remove(
                        "open"
                    );

                }
            );

        }
    );



/* =========================================================
   BUSCADOR
========================================================= */

searchButton.addEventListener(
    "click",
    () => {

        searchOverlay.classList.add(
            "active"
        );

        setTimeout(
            () => {

                searchInput.focus();

            },
            300
        );

    }
);


closeSearch.addEventListener(
    "click",
    closeSearchOverlay
);


searchOverlay.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            searchOverlay
        ) {

            closeSearchOverlay();

        }

    }
);


function closeSearchOverlay() {

    searchOverlay.classList.remove(
        "active"
    );

    searchInput.value = "";

    searchResults.innerHTML = "";

}



searchInput.addEventListener(
    "input",
    () => {

        const query =
            searchInput.value
                .toLowerCase()
                .trim();


        if (!query) {

            searchResults.innerHTML =
                "";

            return;

        }


        const results =
            products.filter(
                product =>
                    product.name
                        .toLowerCase()
                        .includes(query)
            );


        if (
            results.length === 0
        ) {

            searchResults.innerHTML = `
                <p style="
                    color:#777;
                    padding:20px 0;
                ">
                    No encontramos ese producto.
                </p>
            `;

            return;

        }


        searchResults.innerHTML =
            results
                .map(
                    product => `

                    <div style="
                        display:flex;
                        justify-content:space-between;
                        align-items:center;
                        border-bottom:1px solid #eee;
                        padding:15px 0;
                    ">

                        <strong>
                            ${product.name}
                        </strong>

                        <span>
                            ${formatPrice(product.price)}
                        </span>

                    </div>

                `
                )
                .join("");

    }
);



/* =========================================================
   FILTROS
========================================================= */

const filters =
    document.querySelectorAll(
        ".filter"
    );

const productCards =
    document.querySelectorAll(
        ".product-card"
    );


filters.forEach(
    filter => {

        filter.addEventListener(
            "click",
            () => {

                filters.forEach(
                    item =>
                        item.classList.remove(
                            "active"
                        )
                );


                filter.classList.add(
                    "active"
                );


                const category =
                    filter.dataset.category;


                productCards.forEach(
                    card => {

                        const cardCategory =
                            card.dataset.category;


                        if (
                            category ===
                            "all" ||
                            category ===
                            cardCategory
                        ) {

                            card.style.display =
                                "block";

                        } else {

                            card.style.display =
                                "none";

                        }

                    }
                );

            }
        );

    }
);



/* =========================================================
   FAVORITOS
========================================================= */

document
    .querySelectorAll(
        ".favorite"
    )
    .forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    button.classList.toggle(
                        "active"
                    );


                    const icon =
                        button.querySelector(
                            "i"
                        );


                    if (
                        button.classList.contains(
                            "active"
                        )
                    ) {

                        icon.classList.remove(
                            "fa-regular"
                        );

                        icon.classList.add(
                            "fa-solid"
                        );

                    } else {

                        icon.classList.remove(
                            "fa-solid"
                        );

                        icon.classList.add(
                            "fa-regular"
                        );

                    }

                }
            );

        }
    );



/* =========================================================
   AGREGAR PRODUCTO
========================================================= */

document
    .querySelectorAll(
        ".add-product"
    )
    .forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    const productName =
                        button.dataset.name;


                    const product =
                        products.find(
                            item =>
                                item.name ===
                                productName
                        );


                    if (!product) return;


                    addToCart(
                        product
                    );

                }
            );

        }
    );



/* =========================================================
   CARRITO
========================================================= */

function addToCart(product) {

    const existing =
        cart.find(
            item =>
                item.name ===
                product.name
        );


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });

    }


    updateCart();

    showToast(
        `${product.name} agregado al carrito`
    );

}


function updateCart() {

    const totalItems =
        cart.reduce(
            (
                total,
                item
            ) =>
                total +
                item.quantity,
            0
        );


    cartCount.textContent =
        totalItems;


    if (cart.length === 0) {

        cartItemsContainer.innerHTML = `

            <div class="empty-cart">

                <i class="fa-solid fa-bag-shopping"></i>

                <p>
                    Tu carrito está vacío.
                </p>

            </div>

        `;

        cartTotal.textContent =
            "$0";

        return;

    }


    cartItemsContainer.innerHTML =
        cart
            .map(
                (
                    item,
                    index
                ) => `

                    <div class="cart-item">

                        <div class="cart-item-info">

                            <h4>
                                ${item.name}
                            </h4>

                            <span>
                                ${item.quantity}
                                ×
                                ${formatPrice(item.price)}
                            </span>

                        </div>


                        <strong>
                            ${formatPrice(
                                item.price *
                                item.quantity
                            )}
                        </strong>


                        <button
                            class="remove-cart-item"
                            data-index="${index}"
                        >

                            <i class="fa-solid fa-trash"></i>

                        </button>

                    </div>

                `
            )
            .join("");


    const total =
        cart.reduce(
            (
                sum,
                item
            ) =>
                sum +
                item.price *
                item.quantity,
            0
        );


    cartTotal.textContent =
        formatPrice(total);


    document
        .querySelectorAll(
            ".remove-cart-item"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        const index =
                            Number(
                                button.dataset.index
                            );


                        cart.splice(
                            index,
                            1
                        );


                        updateCart();

                    }
                );

            }
        );

}



/* =========================================================
   ABRIR CARRITO
========================================================= */

cartButton.addEventListener(
    "click",
    openCart
);


function openCart() {

    cartDrawer.classList.add(
        "open"
    );

    cartOverlay.classList.add(
        "active"
    );

    body.style.overflow =
        "hidden";

}


function closeCartDrawer() {

    cartDrawer.classList.remove(
        "open"
    );

    cartOverlay.classList.remove(
        "active"
    );

    body.style.overflow =
        "";

}


closeCart.addEventListener(
    "click",
    closeCartDrawer
);


cartOverlay.addEventListener(
    "click",
    closeCartDrawer
);



/* =========================================================
   CHECKOUT WHATSAPP
========================================================= */

checkoutButton.addEventListener(
    "click",
    () => {

        if (cart.length === 0) {

            showToast(
                "Tu carrito está vacío"
            );

            return;

        }


        let message =
            "Hola Techvault 👋%0A%0A";

        message +=
            "Quiero realizar este pedido:%0A%0A";


        cart.forEach(
            item => {

                message +=
                    `• ${item.name} x${item.quantity} - ${formatPrice(
                        item.price *
                        item.quantity
                    )}%0A`;

            }
        );


        const total =
            cart.reduce(
                (
                    sum,
                    item
                ) =>
                    sum +
                    item.price *
                    item.quantity,
                0
            );


        message +=
            `%0ATotal: ${formatPrice(total)}`;


        window.open(
            `https://wa.me/573105346923?text=${message}`,
            "_blank"
        );

    }
);



/* =========================================================
   TOAST
========================================================= */

let toastTimeout;


function showToast(message) {

    const text =
        toast.querySelector(
            "span"
        );


    text.textContent =
        message;


    toast.classList.add(
        "show"
    );


    clearTimeout(
        toastTimeout
    );


    toastTimeout =
        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            2500
        );

}



/* =========================================================
   EFECTO PARALLAX
========================================================= */

const hero =
    document.querySelector(
        ".hero"
    );


const heroProducts =
    document.querySelectorAll(
        ".hero-product"
    );


const heroLight =
    document.querySelector(
        ".hero-light"
    );


const immersive =
    document.querySelector(
        ".immersive"
    );


const immersiveBackground =
    document.getElementById(
        "immersiveBackground"
    );


const immersiveContent =
    document.getElementById(
        "immersiveContent"
    );



function updateScrollEffects() {

    const scroll =
        window.scrollY;


    /* -----------------------------------------------------
       HERO
    ----------------------------------------------------- */

    const heroHeight =
        hero.offsetHeight;


    let heroProgress =
        scroll /
        heroHeight;


    heroProgress =
        Math.max(
            0,
            Math.min(
                heroProgress,
                1
            )
        );


    heroProducts.forEach(
        product => {

            const speed =
                Number(
                    product.dataset.speed
                );


            const y =
                scroll *
                speed;


            const rotation =
                scroll *
                speed *
                .015;


            const scale =
                1 +
                heroProgress *
                .20;


            product.style.transform =
                `
                translate3d(
                    0,
                    ${-y}px,
                    0
                )
                rotate(
                    ${rotation}deg
                )
                scale(
                    ${scale}
                )
                `;

        }
    );


    heroLight.style.transform =
        `
        translate(
            -50%,
            calc(
                -50% +
                ${scroll * .08}px
            )
        )
        scale(
            ${1 + heroProgress * .2}
        )
        `;



    /* -----------------------------------------------------
       ZOOM INMERSIVO
    ----------------------------------------------------- */

    const immersiveTop =
        immersive.offsetTop;


    const immersiveHeight =
        immersive.offsetHeight;


    let progress =
        (
            scroll -
            immersiveTop
        ) /
        immersiveHeight;


    progress =
        Math.max(
            0,
            Math.min(
                progress,
                1
            )
        );


    const scale =
        1 +
        progress *
        2.7;


    const y =
        progress *
        -80;


    immersiveBackground.style.transform =
        `
        scale(
            ${scale}
        )
        translateY(
            ${y}px
        )
        `;


    const opacity =
        Math.min(
            progress * 2.5,
            1
        );


    const contentScale =
        .75 +
        progress *
        .25;


    const contentY =
        80 -
        progress *
        80;


    immersiveContent.style.opacity =
        opacity;


    immersiveContent.style.transform =
        `
        scale(
            ${contentScale}
        )
        translateY(
            ${contentY}px
        )
        `;

}


window.addEventListener(
    "scroll",
    updateScrollEffects,
    {
        passive: true
    }
);


/* =========================================================
   INICIALIZAR
========================================================= */

updateHeader();

updateCart();

updateScrollEffects();
