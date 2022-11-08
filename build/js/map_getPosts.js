
import '../css/map.css';
import Map from 'ol/Map.js';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile.js';
import View from 'ol/View.js';
import {fromLonLat} from "ol/proj";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import {Feature} from "ol";
import {Point} from "ol/geom";
import {Icon, Style} from "ol/style";

import {initializeApp} from 'firebase/app'
import{getFirestore, doc, getDocs, collection} from 'firebase/firestore'
import {getDownloadURL, getStorage, ref} from "firebase/storage";
// const firebaseConfig = {
//     your own firebaseConfig credentials
// };

const rposts = document.querySelector('.rposts');


initializeApp(firebaseConfig);
const db = getFirestore()
const storage = getStorage();
const colRef = collection(db, 'posts');
const iconref = ref(storage, 'icons/icon.png');


let posts = [];

const styleDiv = (div) => {
    div.classList.add('bg-sky-900/50', 'flex', 'flex-col', 'w-fit', 'h-fit', 'p-2', 'rounded-lg', 'hover:scale-105', 'shadow-lg', 'shadow-black/50', 'min-h-0');
return div
}
const styleTitle = (title) => {
    title.classList.add('font-bold', 'text-xl', 'text-center');
    return title
}
const styleImg = (img) => {
    img.classList.add('rounded-lg', 'max-h-full');
    return img
}
getDownloadURL(iconref)
    .then((url)=> {
        let layer = new VectorLayer({
            source: new VectorSource({

            }),
            style: new Style({
                image: new Icon({
                    src: url,
                    size:[720,720],
                    scale: 0.05
                })
            })
        })
        map.addLayer(layer);

        getDocs(colRef)
            .then((snap) =>  {
                snap.docs.forEach((post)=> {
                    posts.push({...post.data(), id: post.id})
                })
                posts.forEach((post)=> {
                    let img = document.createElement("img");
                    let title = document.createElement("h2");
                    let div = document.createElement("div");
                    const a = document.createElement("a");
                    const imgRef = ref(storage, `${post.id + post.img[0]}`);
                    getDownloadURL(imgRef)
                        .then((url)=> {
                            img.src = `${url}`;
                        })
                    img.alt = 'underwater photograph';
                    title.innerHTML = `${post.title}`;
                    if (window.location.pathname===  '/posts/'){
                        a.href = `../post?id=${post.id}`;
                    }else {
                        a.href = `./post?id=${post.id}`;
                    }
                    div = styleDiv(div);
                    title = styleTitle(title);
                    img = styleImg(img);
                    a.appendChild(title);
                    a.appendChild(img);
                    div.appendChild(a);
                    rposts.appendChild(div);

                    layer.getSource().addFeature(new Feature({geometry: new Point(fromLonLat([ post.location._long, post.location._lat]))}))
                })
            })
    })



const map = new Map({
    target: 'map',
    layers: [
        new TileLayer({
            source: new OSM(),
        }),
    ],
    view: new View({
        center: fromLonLat([14.358846513812116, 35.947657884600446]),
        zoom: 10,
    }),
});
const fun = (()=> {
    map.updateSize();
})
const timeout = setTimeout(fun, 3000)


