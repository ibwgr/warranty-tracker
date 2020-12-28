
//Todo: just for testing -> remove when no longer needed
const btnGet = document.getElementById('testbutton-get');
const btnPost = document.getElementById('testbutton-post');

btnGet.addEventListener('click', () => {

    fetch('http://localhost:3000/warranty/last-12-month', {
        headers: new Headers({
            'Accept': 'application/json',
        })
    }).then(response => {
        if (response.ok) {
            console.log(response.json());
        } else {
            console.log('response not ok');
        }
    })
});

btnPost.addEventListener('click', () => {
    const data = {
        date_: '2020-04-12',
        machine: 'Master250',
        customer: 'CCL USA',
        contact: 'M. Muster',
        issue: 'TestPost',
        employee: 'S. Hutter',
        time_: '20:00:00'
    };

    fetch('http://localhost:3000/warranty/add-entry',  {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
});