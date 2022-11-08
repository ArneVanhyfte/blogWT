const imgs = document.querySelector('.pictures');
const name = document.querySelector('.name');
const secIdol = document.querySelector('.idol');

class SPARQLQueryDispatcher {
    constructor( endpoint ) {
        this.endpoint = endpoint;
    }

    query( sparqlQuery ) {
        const fullUrl = this.endpoint + '?query=' + encodeURIComponent( sparqlQuery );
        const headers = { 'Accept': 'application/sparql-results+json' };

        return fetch( fullUrl, { headers } ).then( body => body.json() );
    }
}

const endpointUrl = 'https://query.wikidata.org/sparql';
const sparqlQuery = `SELECT ?fname ?lname ?img WHERE {
  ?item wdt:P31 wd:Q5;
    wdt:P735 ?tempf;
    wdt:P734 ?templ;
    wdt:P18 ?img.
  ?tempf wdt:P1705 ?fname.
  ?templ wdt:P1705 ?lname.
  FILTER(REGEX(?lname, "Cousteau"))
  FILTER(REGEX(?fname, "Jacques-Yves"))
  SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
}`;

const queryDispatcher = new SPARQLQueryDispatcher( endpointUrl );
queryDispatcher.query( sparqlQuery ).then( (res)=> {
    let nameValue = `${res.results.bindings[0]['fname'].value} ${res.results.bindings[0]['lname'].value}`
    name.innerHTML = nameValue;
    res.results.bindings.forEach((binding)=> {
        let src = binding['img'].value;
        let img = document.createElement("img");
        img.src = src;
        img.alt = 'picture';
        img.classList.add('rounded-lg');
        imgs.appendChild(img);
    })
    secIdol.classList.remove('hidden');

} );