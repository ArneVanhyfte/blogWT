import {initializeApp} from 'firebase/app'
import{getFirestore, addDoc, collection, query, where, onSnapshot} from 'firebase/firestore';

// const firebaseConfig = {
//     your own firebaseConfig credentials
// };

initializeApp(firebaseConfig);
const db = getFirestore()
const colRef = collection(db, 'comments');


const naamInput = document.querySelector("#naam");
const entryInput = document.querySelector("#entry");
const submit = document.querySelector("#submit");
const errNaam = document.querySelector("#errNaam");
const errEntry = document.querySelector("#errEntry");
const commentList = document.querySelector('.comments');

const id = (new URLSearchParams(location.search)).get('id');

const q = query(colRef, where("postId", "==", id))

onSnapshot(q, (snapshot)=> {
let comments = [];
snapshot.docs.forEach((doc)=> {
    comments.push({...doc.data(), id: doc.id})
})
commentList.innerHTML ="";
comments.forEach((comment)=> {
    const div = document.createElement("div");
    const h3 = document.createElement("h3");
    const p = document.createElement("p");
    h3.innerText = comment['name'];
    p.innerText = comment['text'];
    div.classList.add('bg-sky-900/50', 'text-white', 'w-fit', 'p-4', 'pl-5', 'pr-5', 'rounded-lg', 'flex', 'flex-col', 'gap-4');
    h3.classList.add('font-semibold', 'text-2xl',);
    p.classList.add('text-xl');
    div.appendChild(h3);
    div.appendChild(p);
    commentList.appendChild(div);
})
})




    submit.addEventListener('click', e => {
        e.preventDefault();
        resetErrors();
        if (isValid()) {
            let user;
            if (!naamInput.value) {
                user = 'Anon';
            } else {
                user = naamInput.value;
            }
            addDoc(colRef, {
                postId: id,
                name: user,
                text: entryInput.value,
            })
                .then(()=> {
                    resetForm()
                })
        } else {
        }
    });


    const resetErrors = () => {
        errNaam.style.display = ('none');
        errEntry.style.display = ('none');
    };
    resetErrors();

    const isValid = () => {
        let isvalid = true;
        if (!entryInput.value) {
            setError(errEntry, 'You have to fill in text for your review here:')
            isvalid = false;
        }
        return isvalid;
    };

    const setError = (e, error)=>{
        e.style.display = ('block');
        e.innerText = (error);
    };

    const postComment = async (user, entry) => {

    };

    const resetForm = ()=>{
        naamInput.value ='';
        entryInput.value ='';
    };


