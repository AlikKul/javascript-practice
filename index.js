let fruits = [
    {id: 1, title: 'Яблоки', price: 20, img: 'https://ivan-pole.ru/wa-data/public/shop/products/67/07/767/images/2103/2103.256x256.jpg'},
    {id: 2, title: 'Апельсины', price: 15, img: 'https://www.gepardtop.ru/published/publicdata/GEPARDTURUPURPL/attachments/SC/products_pictures/1002_9d673.256.jpg'},
    {id: 3, title: 'Манго', price: 10, img: 'https://www.imwalrussoaps.com/uploads/4/7/6/8/47689877/s471809434186068050_p40_i2_w256.jpeg'}
];

$.fruitsList = function(fruits) {
    return {
        show() {
            let list = document.querySelector('.row');
            fruits.forEach(fruit => {
                let listItem = document.createElement('div');
                listItem.classList.add('col');
                let listItemContent = document.createElement('div');
                listItemContent.classList.add('card');
                listItemContent.insertAdjacentHTML('afterbegin', `
                    <img class="card-img-top" src="${fruit.img}">
                    <div class="card-body">
                        <h5 class="card-title">${fruit.title}</h5>
                        <p class="card-text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum, odio!</p>
                        <a class="btn btn-primary">Посмотреть цену</a>
                        <a class="btn btn-danger">Удалить</a>
                    </div>
                `);
                listItem.appendChild(listItemContent);
                list.appendChild(listItem);
            });
        },
        delete(id) {}
    };
};

let fruitsList = $.fruitsList(fruits);
fruitsList.show();

const showPriceBtns = document.querySelectorAll('.btn-primary');
showPriceBtns.forEach((btn, indx) => {
    btn.addEventListener('click', () => {
        let modalWin = $.modal({
            title: 'Цена',
            content: `Цена на ${fruits.find(fruit => fruit.id === indx + 1).title}: ${fruits.find(fruit => fruit.id === indx + 1).price} р.`,
            closable: true,
            onClose() {
                modalConfirm.destroy();
            },
            footerButtons: [
                {
                    text: 'OK', type: 'pimary', handler() {
                        modalWin.close();
                    }
                }
            ]
        });
        modalWin.open();
    });
});

let deleteBtns = document.querySelectorAll('.btn-danger');
deleteBtns.forEach((btn, indx) => {
    btn.addEventListener('click', () => {
        let modalConfirm = $.modal({
            title: 'Подтверждение',
            content: `Удалить ${fruits.find(fruit => fruit.id === indx + 1).title} ?`,
            closable: false,
            width: '300px',
            onClose() {
                modalConfirm.destroy();
            },
            footerButtons: [
                {
                    text: 'Да', type: 'danger', handler() {
                        let list = document.querySelector('.row');
                        list.childNodes[indx].style.display = 'none';
                        modalConfirm.close();
                    }
                },
                {
                    text: 'Нет', type: 'primary', handler() {
                        modalConfirm.close();
                    }
                }
            ]
        });
        modalConfirm.open();
    });
});
