const tutoringList = document.querySelector('#tutoring-list');
const form = document.querySelector('#add-tutoring-form');


// create element and render tutoring
function renderTutoring(doc){
    let li = document.createElement('li');
    let name = document.createElement('span');
    let subject = document.createElement('span');
    let cross = document.createElement('div');

    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().Name;
    subject.textContent = doc.data().Subject;
    cross.textContent = 'X'

    li.appendChild(name);
    li.appendChild(subject);
    li.appendChild(cross)

    tutoringList.appendChild(li);

    // deleting data

    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('Tutoring').doc(id).delete();
    })
}

/* getting data
db.collection('Tutoring').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        renderTutoring(doc);
    })
});
*/


/* Ordering or Finding data
db.collection('Tutoring').where('Subject', '==', 'Math').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        renderTutoring(doc);
    })
});
db.collection('Tutoring').orderBy('Name').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        renderTutoring(doc);
    })
});

*/

// saving data
form.addEventListener('submit', (e) => {
    e.preventDefault();
    if(form.Name.value != "" && form.Subject.value != ""){
        db.collection('Tutoring').add({
            Name: form.Name.value,
            Subject: form.Subject.value
        });
        form.Name.value = '';
        form.Subject.value = '';
    }
});

// real time listener
db.collection('Tutoring').orderBy('Subject').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if(change.type == 'added'){
            renderTutoring(change.doc);
        }else if (change.type == 'removed'){
            let li = tutoringList.querySelector('[data-id=' + change.doc.id + ']')
            tutoringList.removeChild(li);
        }
    })
})

/* updating data
db.collection('Tutoring').doc('id').update({
    Name: '',
    Subject: ''
})
*/