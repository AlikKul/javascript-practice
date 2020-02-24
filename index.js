let fruits = [
    {id: 1, title: 'Яблоки', price: 20, img: 'https://lh3.googleusercontent.com/proxy/-p87EWY6zV-2bC8dOlEnYpbDHlcAiUf1XEE39vo0Jz5D4uEryyvgNnLaE_tc2-gUD4TtSeoVl-FsoCkF6J6L0IIQCTccaXPU8A8IBSHXaUUonaurxRKuYBcxva-oPHJm_3T5uaDD_HbOlGmg7t2HIQ'},
    {id: 2, title: 'Апельсины', price: 15, img: 'https://www.gepardtop.ru/published/publicdata/GEPARDTURUPURPL/attachments/SC/products_pictures/1002_9d673.256.jpg'},
    {id: 3, title: 'Манго', price: 10, img: 'https://lh3.googleusercontent.com/proxy/WXl7ZjDW4lWNv4M1-BzYlO9piIX1vasXEM-CwG1RwzEKhu6yMi5O7otevhQ5QYqEWBNn6Wgtl0WCjtsFNuJ_dH7xW2sBZ-DJ-dJ43_YKkOL3JZc9YoWhh8cjwd5Kb4ICFb9rELaIoKc5Das'}
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
            content: `Удалить ${fruits.find(fruit => fruit.id === indx + 1).title}?`,
            closable: false,
            width: '300px',
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

// let del = false;
// knpk.addEventListener('click', () => {
//     let promise = new Promise((resolve, reject) => {
//         let modalConfirm = $.modal({
//             title: 'Подтверждение',
//             content: 'Удалить?',
//             closable: false,
//             width: '300px',
//             footerButtons: [
//                 {
//                     text: 'Да', type: 'danger', handler() {
//                         del = true;
//                         modalConfirm.close();
//                         resolve(del);
//                     }
//                 },
//                 {
//                     text: 'Нет', type: 'primary', handler() {
//                         del = false;
//                         modalConfirm.close();
//                         resolve(del);
//                     }
//                 }
//             ]
//         });
//         modalConfirm.open();
//     });
//     promise.then(del => {
//         console.log(del);
//     })
// })





// let modalWin = $.modal({
//     title: 'Awsome title!',
//     content: 'Awsome content!!!',
//     closable: true,
//     width: '300px',
//     footerButtons: [
//         { text: 'OK', type: 'primary', handler() {
//             console.log('OK button clicked');
//             }
//         },
//         { text: 'Cancel', type: 'danger', handler() {
//             console.log('Cansecl button clicked');
//             }
//         }
//     ]
// });
