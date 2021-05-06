const kvizOtazky = [{
        otazka: 'Co je ikonicka hracka 80 let?',
        foto: 'obrazky/moncicak.jpg',
        moznosti: ['Kočičák', 'Mončičák', 'Opičák'],
        odpoved: 'Mončičák',
        odpovedVybrana: ""
    },
    {
        otazka: 'Jake je Matejovo najoblíbenejše jídlo?',
        foto: 'obrazky/ovoce.jpg',
        moznosti: ['Kokos', 'Melounek', 'Jahoda', 'Ani jedna z moznosti'],
        odpoved: 'Melounek',
        odpovedVybrana: ""
    },
    {
        otazka: 'Pro uspesne absolvovani kurzu je potreba',
        foto: 'obrazky/pivo.jpg',
        moznosti: ['Umět Javascript', 'Chodit po kurzu do hospody'],
        odpoved: 'Umět Javascript',
        odpovedVybrana: ""
    },
    {
        otazka: 'Kdo je na obrazku?',
        foto: 'obrazky/snehurka.jpg',
        moznosti: ['Ledová královna', 'Sněhurka', 'Obidve moznosti'],
        odpoved: 'Sněhurka',
        odpovedVybrana: ""
    }
];
let kviz = document.querySelector('.kviz');
let cisloOtazky = document.querySelector('#cislo');
let textOtazky = document.querySelector('#otazka');
let obrazok = document.querySelector('img');
let moznosti = document.querySelector('#moznosti');
let vysledek = document.querySelector('.vysledek');
let volby = document.querySelector('#volby');

let aktualnaOtazka = 0;

function vytvorOtazku() {
    //priradi cislo otazky
    cisloOtazky.innerText = aktualnaOtazka + 1;

    //vygeneruje otazku z pola kvizOtazky
    textOtazky.innerHTML = kvizOtazky[aktualnaOtazka].otazka;

    //vygeneruje prislusne foto z pola kvizOtazky
    obrazok.src = kvizOtazky[aktualnaOtazka].foto;
    obrazok.alt = kvizOtazky[aktualnaOtazka].odpoved;
    obrazok.id = 'obrazek';

    //vytvori odpovede
    for (let i = 0; i < kvizOtazky[aktualnaOtazka].moznosti.length; i++) {
        let ul = document.createElement('ul');
        ul.id = 'odpovedi';

        let li = document.createElement('li');
        li.setAttribute('data-odpoved', i);
        //kliknutim vyber element li
        li.setAttribute('onclick', 'vyberOdpoved(this)');
        li.innerHTML = kvizOtazky[aktualnaOtazka].moznosti[i];

        ul.appendChild(li);
        moznosti.appendChild(ul);
    }
}
vytvorOtazku();

//ziskaj odpoved
function vyberOdpoved(odpoved) {
    let textOdpovedi = odpoved.innerHTML;
    kvizOtazky[aktualnaOtazka].odpovedVybrana = textOdpovedi;
    moznosti.innerHTML = '';

    //pokracovanie na dalsiu otazku alebo na vysledok
    aktualnaOtazka = aktualnaOtazka + 1;
    if (aktualnaOtazka < kvizOtazky.length) {
        vytvorOtazku();
    } else {
        ukazVysledok();
        kviz.style.display = 'none';
    }
}

//zobraz vysledok
function ukazVysledok() {
    vysledek.style.display = 'block';
    let spravneOdpovede = 0;

    for (let i = 0; i < kvizOtazky.length; i++) {
        let zobrazVysledok = document.createElement('div');
        zobrazVysledok.id = 'volba';

        let zobrazOtazku = document.createElement('h3');
        zobrazOtazku.innerHTML = i + 1 + ". " + kvizOtazky[i].otazka;
        zobrazVysledok.appendChild(zobrazOtazku);

        let vyber = document.createElement('p');
        vyber.innerHTML = "Tvoje odpoved: " + kvizOtazky[i].odpovedVybrana;
        zobrazVysledok.appendChild(vyber);

        let vyhodnoceni = document.createElement('p');
        zobrazVysledok.appendChild(vyhodnoceni);

        if (kvizOtazky[i].odpovedVybrana == kvizOtazky[i].odpoved) {
            vyhodnoceni.innerHTML = 'To je spravne';
            spravneOdpovede = spravneOdpovede + 1;
        } else {
            vyhodnoceni.innerHTML = 'Spravna odpoved: ' + kvizOtazky[i].odpoved;
        }
        volby.appendChild(zobrazVysledok);
    }
    let vypocet = (spravneOdpovede / kvizOtazky.length) * 100;
    document.querySelector('.pocet').innerHTML = spravneOdpovede;
    document.querySelector('.total').innerHTML = kvizOtazky.length;
    document.querySelector('.percento').innerHTML = vypocet;
}