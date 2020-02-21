let modalWin = $.modal({
    title: 'Awsome title!',
    content: 'Awsome content!!!',
    closable: true,
    width: '300px',
    footerButtons: [
        { text: 'OK', type: 'primary', handler() {
            console.log('OK button clicked');
            }
        },
        { text: 'Cancel', type: 'danger', handler() {
            console.log('Cansecl button clicked');
            }
        }
    ]
});
