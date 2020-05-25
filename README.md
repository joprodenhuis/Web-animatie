# Web-animatie
In deze repositorie staat mijn werk van het vak web-animatie van de minor Visual Interface Design. Tijdens dit vak heb ik een poster digitaal gemaakt en door gebruik van interactie geanimeerd. Dit is gedaan door het gebruik van de programmeertalen HTML, CSS en JavaScript. Hieronder licht ik mijn proces en eindresultaat toe.

# Het uitgekozen kunstwerk
<img src="poster.jpg" width="500">
Het kunstwerk dat ik heb uitgekozen voor de opdracht is afkomstig uit de Online Letterform Archive. Het kunstwerk is een poster voor een systeemfont genaamd 'Stop'. Dit font is ontworpen door Aldo Novarese en is uitgebracht in het jaar 1971. De poster is de voorkant van het promotieboekje van het Stop font. Het font is gemaakt omdat er aanvankelijk geen leuke en humoristische fonts beschikbaar waren. Met dit font is gebrobeerd hierop in te spelen. De letters hebben een futuristische uitstraling en zijn soms ook alleen maar te lezen in combinatie met andere letters. Ik werd door dit kunstwerk aangesproken door de mooie kleurencombinatie en de verschillende kleur mengsels. Ook vond ik de geometrische samenstelling van het kunstwerk een mooie toevoeging. 



>Artwork by: Aldo Novarese

>Decade: 1971

>Found on:
[Online Archive](http://oa.letterformarchive.org/item?workID=lfa_type_0049&LFAPics=Yes)

# Concept
Ik had al direct veel ideeën voor interacties en beweging in het ontwerp. Omdat het lettertype is ontworpen om in te spelen op speelse lettertypes vond ik het een mooie uitdaging om een speels ontwerp te maken. Hierbij wou ik de gebruiker een rol geven van oneindige creativiteit die los te laten is op verschillende manieren op het digitale kunstwerk.

Ik ben begonnen met het maken van het kunstwerk in Illustrator. Hier heb ik de verschillende letters in verschillende lagen geplaatst. Op deze manier zijn deze later makkelijk te animeren door middel van code. Ik heb de lagen vanuit Illustrator geëxporteerd als SVG en de code hiervan in de HTML geplakt.

<img src="illustrator.jpg" width="100%" height="auto">

Om het kunstwerk precies na te maken heb ik op de letters in de CSS een ``mix-blend-mode:multiply`` geplaatst waardoor de letters dezelfde kleurcombinaties kregen. Ik heb de letters in het midden van het scherm geplaatst omdat deze centraal zijn voor de website. Ik heb door gebruik te maken van Keyframes de letters een zweef effect gegeven om zo aan de gebruiker mee te geven dat de website actief is, daarnaast ziet het er aantrekkelijk en speels uit. Dit is weer terug te koppelen naar het speelse van het lettertype.

```
#S {
	animation: floatingS 4s infinite ease-in-out;
}

@keyframes floatingS {
    from { transform: translate(0,  0); }
    65%  { transform: translate(40px, 0); }
    to   { transform: translate(-0px, -0); }    
}
```

# Interactie
Om de gebruiker interactie te laten maken met het kunstwerk heb ik verschillende functies toegevoegd. De functies zijn uiteenlopend met betrekking tot interactie, dit heb ik gedaan om zelf te experimenteren met CSS animaties en om de gebruiker een speelse ervaring te geven. 
* Hover effect
* Letter kleur veranderen
* Letter volgorde
* Kleuren omkeren

### Hover effect

De eerste interactie die ik heb toegevoegd is een hover op de titel en subtitel op de pagina. Deze titels zitten niet op het originele kunstwerk maar heb ik toegevoegd om de gebruiker een korte instructie te geven. Wanneer er over de woorden van de titel wordt bewogen met de muis worden de woorden uitvergroot en zullen ze een kleurmix krijgen bestaande uit de 3 kleuren van het originele kunstwerk. Op de hover animatie zit nog een transition om de overgang iets soepeler te maken. Het kleur geven van de woorden in een gradient van de drie kleuren was nog een beetje tricky maar hier heb ik uiteindelijk met een ``-webkit-background-clip`` een oplossing voor gevonden.

```
h1 span:hover {
  font-size: 6vw;
  transition: .3s ease;
  background-image: linear-gradient(to left, #ff4054, #87b2f6, #fdd139);
  -webkit-background-clip: text;
  color: transparent;
}
```

```
h2 span:hover {
  font-size: 3vw;
  transition: .3s ease;
}
```
### Letter kleur veranderen

Het meest interessante aan het door mij gekozen kunstwerk vond ik de nieuwe kleuren die onstaan door de ``mix-blend-mode``. Dit inspireerde mij om de gebruiker de mogelijkheid te geven om de kleuren van de letters aan te laten passen zodat er nieuwe kleuren mengsels zouden ontstaan. In eerste instantie wou ik elke letter een RGB-slider geven zodat de gebruiker zelf de kleur kon bepalen. Echter kostte dit teveel JavaScript ervaring waardoor ik de keuze heb gemaakt om elke letter een button te geven waarmee de kleur kan worden aangepast. Wanneer er op de button wordt geklikt zal de kleur van de desbetreffende letter in een willekeurige kleur veranderen. 

Dit effect heb ik gemaakt door een aantal onclick funties op de buttons te zetten waarmee de functie ``randomColors()`` wordt uitgevoerd op de ``style.fill`` van de letters.

```
<button id="genNewS" onclick="randomizeS()">Change <span>S</span> color</button>
<button id="genNewT" onclick="randomizeT()">Change <span>T</span> color</button>
<button id="genNewO" onclick="randomizeO()">Change <span>O</span> color</button>
```

```
function randomizeS() {
  	document.getElementById('S-2').style.fill = randomColors();
}

function randomizeT() {
  	document.getElementById('T-2').style.fill = randomColors();
}

function randomizeO() {
  	document.getElementById('O-2').style.stroke = randomColors();
}
			
function randomColors() {
  	return '#' + Math.floor(Math.random() * 16777215).toString(16);
}
```

### Letter volgorde

Om een grotere diversiteit in kleuren mengsels te bereiken wou ik de gebruiker de optie geven om de volgorde van de letters aan te passen. Hierdoor zou er worden ingespeeld op de ``mix-blend-mode`` en zouden er nieuwe blends ontstaan. Eerst heb ik geprobeerd om de Z-index van de letters met een onclick aan te passen, dit was echter zonder succes. Uiteindelijk heb ik een methode gevonden waarbij er door middel van JavaScript een bepaald laag van de SVG in focus wordt gebracht. Hierdoor komt deze boven de andere lagen van de svg te staan. Het nadeel hiervan waar ik nog geen oplossing voor heb kunnen vinden is dat hierdoor het zwevende effect evenals de ``mix-blend-mode`` overschreden worden waardoor er geen nieuwe blends ontstaan. 

```
var svg = document.querySelector("svg");
var letters = document.querySelectorAll("path, circle");

var i = letters.length;
while(i--) {
  	letters[i].addEventListener("click", function(e) {
   		svg.appendChild(e.target);
  	});
}
```

### Kleuren omkeren

Tot slot heb ik een interactie toegevoegd die gebruik maakt van het toetsenbord. Ik heb deze interactie toegevoegd omdat ik hier mee wou experimenteren en omdat dit een extra speels element is voor de gebruiker. Wanneer de gebruiker de spatiebalk indrukt zullen alle kleuren op de website omkeren. De kleuren worden weer terug omgekeerd wanneer de spatiebalk opnieuw wordt ingedrukt.

```
.click {
  background:linear-gradient(#EA5135 0%, black 90%);
  background-size: 100% 15000%;
  -webkit-filter: invert(1);
  filter: invert(1);
  height: 10px;
}
```

```
var invert = document.querySelector('body');

window.addEventListener("keydown", toggle);

function toggle(event) {
    if(event.keyCode === 32) {
        invert.classList.toggle('click');
    }
 }
 ```
# Responsive design

Om de website op elk schermformaat gebruiksvriendelijk te houden heb ik gebruik gemaakt van een responsive design. Ik heb meerdere media queries gebruikt om breakpoints toe te voegen voor verschillende schermgroottes. Bij de media queries worden onder andere de grootte van de titels, de grootte van de letters en de margin's/padding's aangepast. Daarnaast heb ik op verschillende elementen flexbox toegepast waardoor er automatisch een responsive design ontstaat. Bijvoorbeeld de tekst en de buttons worden onder elkaar geplaatst wanneer er te weinig ruimte in de breedte is voor de elementen. 
```
h1 {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.color-buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
```

```
@media only screen and (max-width: 820px) {
  h1 {
    font-size: 26pt;
    padding-left: 15px;
    padding-right: 15px;
  }

  h2 {
    font-size: 14pt;
    padding-left: 15px;
    padding-right: 15px;
  }

  .letters {
    left: 26%;
  }
}
```

Ik heb geprobeerd om zoveel mogelijk interacties te gebruiken die door middel van onclick geactiveerd worden zodat deze ook op de telefoon bruikbaar zijn. De hover over de woorden in de titel is op de telefoon mogelijk door op de woorden te klikken. De letter kleuren en volgorde blijven onveranderd, alleen het omkeren van de kleuren vervalt op het mobiele ontwerp. 

# Experimenten
* CSS hovers
* CSS keyframes
* CSS filters
* CSS blend mode
* Flexbox
* Media Queries
* Transitions
* JavaScript interactie

# Bronnen
* [Kunstwerk](http://oa.letterformarchive.org/item?workID=lfa_type_0049&LFAPics=Yes)
* [Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
* [Random color](https://www.paulirish.com/2009/random-hex-color-code-snippets/)
* [Keydown](https://api.jquery.com/keydown/)
* [SVG Z-index](https://codepen.io/osublake/pen/YXoEQe?__cf_chl_jschl_tk__=d085a766bc8c14c2f5702214b9129b6cfcec9aaf-1590366252-0-AVIMk5_lODLNhIwHMA51tZDTA0lvpngfx2qNEUbg0L_i28tuaPjC1mxyzsMQha1NmUJbspSfJTagi9DqJn-qM2d0u1wU4Ga6riU9dqRAQH32Jp67KTVfCaVhRbuWqBzS4F66Lp-h5f8LVfqXu871NSKloM5YBleUFGVy80CkoE0opkRo5m-FCVTvJkduzC2r1ArvWQzHqv5EwEZ1HBdJ6KZqC8Iht-Vf426oQfpb7YH6ErcuWZ-ihyEgG0P0LxCIBry2Tlg0ZeMnhvU-mxuTMa7HjrLdjBSpsYEOCYxpKx9nN7fZRLEu3wQzzuh2woa2v3EQweXI2hFQqONLEbqAOfxGvSZ0HUcDOu6RyKYQiDhm)
* [Text gradient](https://w3bits.com/rainbow-text/)

