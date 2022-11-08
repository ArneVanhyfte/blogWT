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
import {getFirestore, doc, getDoc, getDocs} from 'firebase/firestore'
import {getStorage, ref, getDownloadURL} from 'firebase/storage'

// const firebaseConfig = {
//     your own firebaseConfig credentials
// };
const querystring = window.location.search;
const par = new URLSearchParams(querystring);
const id = par.get('id');
let postInfo

const title = document.querySelector('.title');
const text = document.querySelector('.text');
const imgs = document.querySelector('.pictures');

initializeApp(firebaseConfig);
const db = getFirestore();
const storage = getStorage();

const postRef = doc(db, 'posts', id);
const iconref = ref(storage, 'icons/icon.png');

getDownloadURL(iconref)
    .then((url) => {
        let layer = new VectorLayer({
            source: new VectorSource({}),
            style: new Style({
                image: new Icon({
                    src: url,
                    size: [720, 720],
                    scale: 0.05
                })
            })
        })


        getDoc(postRef)
            .then((post) => {
                postInfo = (post.data())
                title.innerHTML = postInfo.title;
                text.innerHTML = postInfo.text;
                postInfo.img.forEach((src) => {
                    let img = document.createElement("img");
                    let a = document.createElement("a");
                    const imgRef = ref(storage, `${post.id + src}`);
                    getDownloadURL(imgRef)
                        .then((url) => {
                            a.href = url;
                            a.target = '_blank';
                            img.src = `${url}`;
                        })
                    img.alt = 'picture';
                    a.appendChild(img);
                    imgs.appendChild(a);
                })
                const map = new Map({
                    target: 'map',
                    layers: [
                        new TileLayer({
                            source: new OSM(),
                        }),
                    ],
                    view: new View({
                        center: fromLonLat([postInfo.location._long, postInfo.location._lat]),
                        zoom: 10,
                    }),
                });

                layer.getSource().addFeature(new Feature({geometry: new Point(fromLonLat([postInfo.location._long, postInfo.location._lat]))}))
                map.addLayer(layer);
            })
    })








