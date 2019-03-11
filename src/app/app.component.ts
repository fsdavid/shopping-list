import {Component, OnInit} from '@angular/core';
import {fadeAnimation} from './animations';
import {ShoppingListItem, ShoppingListModel} from './resources/models/shopping-list/shopping-list.model';
import {Observable} from 'rxjs/index';
import * as storeActions from './resources/store/store.actions';
import * as storeReducer from './resources/store/store.reducers';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],


  // animations: [fadeAnimation], // register the animations


})
export class AppComponent implements OnInit {
  title = 'shopping-list';

  shoppingLists: ShoppingListModel[] = [];
  shoppingListsObservable: Observable<{shoppingLists: ShoppingListModel[]}>;

  constructor( private store: Store<storeReducer.StoreState>) {}

  ngOnInit() {
    this.shoppingListsObservable = this.store.select('store');
    this.shoppingListsObservable.subscribe(s => {
      this.shoppingLists = s.shoppingLists;
    });


    if (this.shoppingLists.length < 2) {
      this.store.dispatch(new storeActions.CreateShoppingList(new ShoppingListModel(1, 'Test List', 'This is test list with random items inside.', this.demoSearchResult)));
    }

  }








  // this Object is created or test and should e removed.
  demoSearchResult: ShoppingListItem[] = [
    {
      "itemChecked": true,
      "itemCount": 1,
      "item": {
        "assortmentGroup": "TS",
        "brand": "Wilkinson Sword",
        "bulkyProduct": false,
        "code": "375363_1_1",
        "contentUnit": "Packung",
        "description": "Der Wilkinson Duplo ist gründlich, sanft und zuverlässig. Ein Einwegrasierer ohne Kompromisse!",
        "images": [
          {
            "format": "preview",
            "imageType": "PRIMARY",
            "url": "/medias/sys_master/images/images/h33/h66/8840991211550/375363-1-1-1.jpg"
          },
          {
            "format": "product",
            "imageType": "PRIMARY",
            "url": "/medias/sys_master/images/images/h2d/h18/8840991146014/375363-1-1-1.jpg"
          }
        ],
        "name": "Wilkinson Sword Duplo Einwegrasierer 6+2 Gratis",
        "numberContentUnits": "1 Packung",
        "posProduct": {},
        "price": {
          "currencyIso": "EUR",
          "formattedValue": "€ 1,99",
          "priceType": "BUY",
          "value": 1.99
        },
        "stock": {
          "stockLevelStatus": "inStock"
        },
        "url": "Katalog/Drogerie-%26-Hygiene/K%C3%B6rperpflege/Rasur-%26-Haarentfernung/Rasierer/Wilkinson-Sword-Duplo-Einwegrasierer-6%2B2-Gratis/p/375363_1_1"
      }
    },
    {
      "itemChecked": true,
      "itemCount": 1,
      "item":
        {
          "assortmentGroup": "TS",
          "brand": "Ferrero",
          "bulkyProduct": false,
          "campaigns": "30.106.2.0.,30.106.0.0.",
          "code": "66635_1_1",
          "contentUnit": "g",
          "description": "<p>18&nbsp;Duplos von Ferrero - gef&uuml;llte Vollmilchschokolade mit Waffel (7%) und Nugatcreme (17%).&nbsp;Die Waffelspezialit&auml;t kombiniert&nbsp;feine Nugatcreme und zarte Waffeln, umh&uuml;llt von&nbsp;leckere&nbsp;Vollmilchschokolade.</p>",
          "images": [
            {
              "format": "preview",
              "imageType": "PRIMARY",
              "url": "/medias/sys_master/images/images/h02/hd6/8848706306078/66635-1-1-1.jpg"
            },
            {
              "format": "product",
              "imageType": "PRIMARY",
              "url": "/medias/sys_master/images/images/h1c/hb7/8848706240542/66635-1-1-1.jpg"
            }
          ],
          "name": "Duplo Big Pack, 18er-Pack",
          "numberContentUnits": "327 g",
          "posProduct": {

          },
          "price": {
            "basePrice": {
              "basePrice": 10.64,
              "basePriceBaseFactor": 1,
              "basePriceUnit": "kg"
            },
            "currencyIso": "EUR",
            "formattedValue": "€ 3,49",
            "priceType": "BUY",
            "value": 3.49
          },
          "stock": {
            "stockLevelStatus": "inStock"
          },
          "url": "Katalog/S%C3%BC%C3%9Fwaren-%26-Knabberartikel/Riegel-%26-Snacks/Schokoriegel/Duplo-Big-Pack%2C-18er-Pack/p/66635_1_1"
        }},

    {
      "itemChecked": false,
      "itemCount": 2,
      "item":
        {
          "assortmentGroup": "TS",
          "brand": "Ferrero",
          "bulkyProduct": false,
          "code": "241246_1_1",
          "contentUnit": "g",
          "description": "Leckerer Schokoriegel aus Waffel und Schokolade.",
          "images": [
            {
              "format": "preview",
              "imageType": "PRIMARY",
              "url": "/medias/sys_master/images/images/hae/hc7/8851561054238/241246-1-1-1.jpg"
            },
            {
              "format": "product",
              "imageType": "PRIMARY",
              "url": "/medias/sys_master/images/images/h91/h05/8851560988702/241246-1-1-1.jpg"
            }
          ],
          "name": "Ferrero Duplo 18+2 Gratis Big Pack",
          "numberContentUnits": "364 g",
          "posProduct": {

          },
          "price": {
            "basePrice": {
              "basePrice": 9.59,
              "basePriceBaseFactor": 1,
              "basePriceUnit": "kg"
            },
            "currencyIso": "EUR",
            "formattedValue": "€ 3,49",
            "priceType": "BUY",
            "value": 3.49
          },
          "stock": {
            "stockLevelStatus": "inStock"
          },
          "url": "Katalog/S%C3%BC%C3%9Fwaren-%26-Knabberartikel/Riegel-%26-Snacks/Schokoriegel/Ferrero-Duplo-18%2B2-Gratis-Big-Pack/p/241246_1_1"
        }},
    {
      "itemChecked": true,
      "itemCount": 1,
      "item":
        {
          "assortmentGroup": "TS",
          "brand": "Ferrero",
          "bulkyProduct": false,
          "code": "66635_2_1",
          "contentUnit": "g",
          "description": "<p>Gef&uuml;llte Wei&szlig;e Schokolade mit Waffel (7 %) und Haselnusscreme (17 %)</p>\n",
          "images": [
            {
              "format": "preview",
              "imageType": "PRIMARY",
              "url": "/medias/sys_master/images/images/h39/h79/9017191399454/66635-2-1-1.jpg"
            }
          ],
          "name": "Duplo 18er Big Pack White",
          "numberContentUnits": "328 g",
          "posProduct": {

          },
          "price": {
            "basePrice": {
              "basePrice": 10.64,
              "basePriceBaseFactor": 1,
              "basePriceUnit": "kg"
            },
            "currencyIso": "EUR",
            "formattedValue": "€ 3,49",
            "priceType": "BUY",
            "value": 3.49
          },
          "stock": {
            "stockLevelStatus": "inStock"
          },
          "url": "Katalog/S%C3%BC%C3%9Fwaren-%26-Knabberartikel/Riegel-%26-Snacks/Schokoriegel/Duplo-18er-Big-Pack-White/p/66635_2_1"
        }},
    {
      "itemChecked": true,
      "itemCount": 1,
      "item":
        {
          "assortmentGroup": "TS",
          "brand": "LEGO",
          "bulkyProduct": false,
          "code": "695500_1_1",
          "contentUnit": "Packung",
          "description": "<p>Achtung! Nicht geeignet f&uuml;r Kinder unter 3 Jahren, da Erstickungsgefahr durch verschluckbare Kleinteile besteht.</p>\n\n<p>Kleinere Kinder haben viel Spa&szlig; beim Spielen mit diesem s&uuml;&szlig;en Marienk&auml;fer auf R&auml;dern. Er ist ganz einfach zu bauen und unterst&uuml;tzt so erste Bauerfolge und die Entwicklung feinmotorischer F&auml;higkeiten. Ein lustiges, kreatives Spielzeug zum Mitnehmen! Der Kopf des Marienk&auml;fers l&auml;sst sich drehen, wenn er schlafen oder aufwachen sollen. Mit der Blume l&auml;sst sich der Lebensraum des Marienk&auml;fers erkl&auml;ren. LEGO DUPLO Steine werden speziell f&uuml;r kleine Kinderh&auml;nde entwickelt, um sicheres Spielen zu gew&auml;hrleisten.</p>\n",
          "images": [
            {
              "format": "preview",
              "imageType": "PRIMARY",
              "url": "/medias/sys_master/images/images/h8f/hc1/8990301159454/695500-1-1-1.jpg"
            },
            {
              "format": "product",
              "imageType": "PRIMARY",
              "url": "/medias/sys_master/images/images/h5a/ha0/8990301093918/695500-1-1-1.jpg"
            }
          ],
          "name": "LEGO DUPLO Mein erster Marienkäfer - erste Bauerfolge, 10859",
          "numberContentUnits": "1 Packung",
          "posProduct": {

          },
          "price": {
            "currencyIso": "EUR",
            "formattedValue": "€ 4,99",
            "priceType": "BUY",
            "value": 4.99
          },
          "url": "Aktuelle-Themen/Weihnachtswelt/Spielwaren/LEGO-DUPLO-Mein-erster-Marienk%C3%A4fer---erste-Bauerfolge%2C-10859/p/695500_1_1"
        }},
    {
      "itemChecked": true,
      "itemCount": 1,
      "item":
        {
          "assortmentGroup": "TS",
          "brand": "LEGO",
          "bulkyProduct": false,
          "code": "695502_1_1",
          "contentUnit": "Packung",
          "description": "<p>Achtung! Nicht geeignet f&uuml;r Kinder unter 3 Jahren, da Erstickungsgefahr durch verschluckbare Kleinteile besteht.</p>\n\n<p>Kleine Rennfahrer haben Runde f&uuml;r Runde Spa&szlig; mit dem Set &bdquo;Mein erstes Rennauto&ldquo;. Kleine H&auml;nde bauen es ohne Schwierigkeiten zusammen und trainieren dabei ihre feinmotorischen und ersten Baufertigkeiten. Ein tolles Spielzeug zum Mitnehmen! Dreh den Fahrerstein, je nachdem, wer das Auto fahren soll! LEGO DUPLO Steine werden speziell f&uuml;r kleine Kinderh&auml;nde entwickelt, um sicheres Spielen zu gew&auml;hrleisten.</p>\n\n<ul>\n\t<li>Rennauto zum Zusammenbauen auf LEGO DUPLO R&auml;dern.</li>\n\t<li>Mit zweiseitig bedrucktem Baustein mit unterschiedlichen Fahrern f&uuml;r den Spieleinstieg.</li>\n\t<li>Einfach und schnell zusammengebaut f&uuml;r langen Fahrspa&szlig;!</li>\n\t<li>Ein lustiges Spielzeug zum Mitnehmen!</li>\n\t<li>Zweiseitig bedruckter Baustein mit zwei Rennfahrern zur Auswahl.</li>\n\t<li>Ein ideales Spielzeug f&uuml;r Kinder im Kindergartenalter.</li>\n\t<li>LEGO DUPLO Produkte sind speziell f&uuml;r kleine H&auml;nde geeignet und besonders lustig und sicher.</li>\n\t<li>Geeignet f&uuml;r Kinder im Alter von 1,5 bis 3 Jahren.</li>\n\t<li>Das Rennauto ist &uuml;ber 7 cm hoch, 9 cm lang und 6 cm breit.</li>\n</ul>\n",
          "images": [
            {
              "format": "preview",
              "imageType": "PRIMARY",
              "url": "/medias/sys_master/images/images/h4e/h13/8990286938142/695502-1-1-1.jpg"
            },
            {
              "format": "product",
              "imageType": "PRIMARY",
              "url": "/medias/sys_master/images/images/he6/h0d/8990286872606/695502-1-1-1.jpg"
            }
          ],
          "name": "LEGO DUPLO Mein erstes Rennauto, 10860",
          "numberContentUnits": "1 Packung",
          "posProduct": {

          },
          "price": {
            "currencyIso": "EUR",
            "formattedValue": "€ 4,99",
            "priceType": "BUY",
            "value": 4.99
          },
          "stock": {
            "stockLevelStatus": "inStock"
          },
          "url": "Aktuelle-Themen/Weihnachtswelt/Spielwaren/LEGO-DUPLO-Mein-erstes-Rennauto%2C-10860/p/695502_1_1"
        }},
    {
      "itemChecked": true,
      "itemCount": 1,
      "item":
        {
          "assortmentGroup": "TS",
          "brand": "LEGO",
          "bulkyProduct": false,
          "code": "532346_1_1",
          "contentUnit": "Packung",
          "description": "<p>Achtung! Nicht geeignet f&uuml;r Kinder unter 3 Jahren, da Erstickungsgefahr durch verschluckbare Kleinteile besteht.</p>\n\n<p>Kleinkinder haben einen Riesenspa&szlig; beim Bauen und Umgestalten dieses lustigen gelben Busses, der endlosen Fahrspa&szlig; verspricht. Dieses einfache Modell f&ouml;rdert die feinmotorischen F&auml;higkeiten und die Entwicklung von Baufertigkeiten &ndash; und die mit Figuren verzierten Fenstersteine regen zu Rollenspielen an. LEGO DUPLO Steine sind speziell f&uuml;r kleine Kinderh&auml;nde geeignet und besonders sicher aufgemacht.<br />\n&nbsp;</p>\n\n<p>Spiele und lerne mit dem Set LEGO DUPLO Mein erster Bus! Setz die gro&szlig;en Teile zusammen, um den Bus zubauen, stapele dann die bunten Steine &uuml;bereinander, um eine bunte Tafel zuerrichten. Dieses leicht zu bauenden Set dient als perfekte Einf&uuml;hrung ingrundlegende Baufertigkeiten. Die Tafel kann als Kulisse f&uuml;r das Lernen und f&uuml;rRollenspiele benutzt werden, um Ihrem Kind das ABC mit den liebevoll verziertenSteinen beizubringen. Die gro&szlig;en LEGO DUPLO Steine wurden speziell f&uuml;r kleineKinderh&auml;nde entwickelt, um ein sicheres Spielen zu gew&auml;hrleisten. Enth&auml;lt eineLEGO DUPLO Figur &ndash; ein Kind.</p>\n\n<ul>\n\t<li>Enth&auml;lt eine LEGO DUPLO&reg; Figur &ndash; ein Kind</li>\n\t<li>Mit Bus und Tafel zum Bauen</li>\n\t<li>Enth&auml;lt 6 bunte, liebevoll verzierte Steine als Gespr&auml;chs- undSpieleinstieg</li>\n\t<li>Kleinkinder werden den leicht zu bauenden Bus mit seinen rollenden R&auml;dernlieben.</li>\n\t<li>Spielen Sie mit Ihrem Kleinkind, um ihm ganz spielerisch das ABCbeizubringen.</li>\n\t<li>Mit der Tafel lassen sich fr&uuml;he Baufertigkeiten f&ouml;rdern.</li>\n\t<li>LEGO DUPLO Produkte werden speziell f&uuml;r kleine Kinderh&auml;nde entwickelt, um ein sicheres Spielen zu gew&auml;hrleisten.</li>\n</ul>\n",
          "images": [
            {
              "format": "preview",
              "imageType": "PRIMARY",
              "url": "/medias/sys_master/images/images/h00/h0a/8990302076958/532346-1-1-1.jpg"
            },
            {
              "format": "product",
              "imageType": "PRIMARY",
              "url": "/medias/sys_master/images/images/h1a/hd8/8990302011422/532346-1-1-1.jpg"
            }
          ],
          "name": "LEGO DUPLO Mein erster Bus, 10851",
          "numberContentUnits": "1 Packung",
          "posProduct": {

          },
          "price": {
            "currencyIso": "EUR",
            "formattedValue": "€ 4,99",
            "priceType": "BUY",
            "value": 4.99
          },
          "url": "Aktuelle-Themen/Weihnachtswelt/Spielwaren/LEGO-DUPLO-Mein-erster-Bus%2C-10851/p/532346_1_1"
        }},
    {
      "itemChecked": true,
      "itemCount": 1,
      "item":
        {
          "assortmentGroup": "TS",
          "brand": "Wilkinson Sword",
          "bulkyProduct": false,
          "code": "906471_1_1",
          "contentUnit": "Packung",
          "description": "<p>Problemlose und einfache F&uuml;hrung ,da es sich bei dem Duplo II System um feststehende Rasierk&ouml;pfe handelt.</p>\n\n<p>Aloe Vera Strips sorgen&nbsp;f&uuml;r ein&nbsp;sanftes Gleiten des Rasierers<strong>&nbsp;</strong>und<strong>&nbsp;</strong>haben eine pflegende Wirkung.&nbsp;</p>\n",
          "images": [
            {
              "format": "preview",
              "imageType": "PRIMARY",
              "url": "/medias/sys_master/images/images/h04/h7d/8972151783454/906471-1-1-1.jpg"
            },
            {
              "format": "product",
              "imageType": "PRIMARY",
              "url": "/medias/sys_master/images/images/h0e/haa/8972151717918/906471-1-1-1.jpg"
            }
          ],
          "name": "Wilkinson Sword Duplo 2 Plus Klingen 10er",
          "numberContentUnits": "1 Packung",
          "posProduct": {

          },
          "price": {
            "currencyIso": "EUR",
            "formattedValue": "€ 6,79",
            "priceType": "BUY",
            "value": 6.79
          },
          "stock": {
            "stockLevelStatus": "inStock"
          },
          "url": "Katalog/Drogerie-%26-Hygiene/K%C3%B6rperpflege/Rasur-%26-Haarentfernung/Rasierer/Wilkinson-Sword-Duplo-2-Plus-Klingen-10er/p/906471_1_1"
        }},
    {
      "itemChecked": true,
      "itemCount": 1,
      "item":
        {
          "assortmentGroup": "TS",
          "brand": "LEGO",
          "bulkyProduct": false,
          "code": "68448_1_1",
          "contentUnit": "Packung",
          "description": "<p>Kreativit&auml;t ohne Grenzen aus kunterbunten LEGO DUPLO Steinen!</p>\n\n<p>Baue Modelle in allen Regenbogenfarben, vom Wal, Pinguin &uuml;ber ein Boot bis hin zu einem Flugzeug. Mit diesem Set lassen sich die feinmotorischen F&auml;higkeiten und Baufertigkeiten ganz einfach spielerisch ein&uuml;ben. Dein Kind wird sich mit Begeisterung Geschichten und Abenteuer ausdenken und &uuml;ber die verschiedenen Farben und Formen beim gemeinsamen Spiel erz&auml;hlen. Diese gro&szlig;e Box voller bunter Steine regt die Fantasie und Kreativit&auml;t der Kinder an! Mit etwas Hilfe kann das Kind ein Eis, ein H&auml;schen oder eine Krone bauen . . . oder was ihm sonst noch einf&auml;llt! Das selbst gebaute Essen kann man teilen, sich gemeinsam um die Tiere k&uuml;mmern oder den ganzen Tag in selbst gebauten Fahrzeugen umher sausen! Ordnungssinn und Farben lassen sich mit den regenbogenfarbenen Bausteinen spielerisch &uuml;ben. Dieses Set bietet unz&auml;hlige Bauoptionen, um die Vorstellungskraft und Fantasie kleiner Baumeister zu befl&uuml;geln.</p>\n\n<ul>\n\t<li>Mit 70 bunten LEGO DUPLO Elementen in unterschiedlichen Formen und Gr&ouml;&szlig;en.</li>\n\t<li>Mit Propeller, Verkehrskegel, Strudel, Blumen und Boot-Element.</li>\n\t<li>Erste Bau- und feinmotorische F&auml;higkeiten werden mit diesem vielseitigen Spielzeug f&uuml;r Kinder im Kindergartenalter trainiert.</li>\n\t<li>Eine echte Bereicherung f&uuml;r jede LEGO DUPLO Sammlung! LEGO DUPLO Produkte werden speziell f&uuml;r kleine Kinderh&auml;nde entwickelt, um sicheres Spielen zu gew&auml;hrleisten.</li>\n\t<li>Teile: 70</li>\n\t<li>Geeignet f&uuml;r Kinder im Alter von 1,5 - 5 Jahren</li>\n</ul>\n",
          "images": [
            {
              "format": "preview",
              "imageType": "PRIMARY",
              "url": "/medias/sys_master/images/images/h6b/hbf/8990296571934/68448-1-1-1.jpg"
            },
            {
              "format": "product",
              "imageType": "PRIMARY",
              "url": "/medias/sys_master/images/images/h99/h4c/8990296506398/68448-1-1-1.jpg"
            }
          ],
          "name": "LEGO DUPLO Tiere auf dem Bauernhof, 10870",
          "numberContentUnits": "1 Packung",
          "posProduct": {

          },
          "price": {
            "currencyIso": "EUR",
            "formattedValue": "€ 9,99",
            "priceType": "BUY",
            "value": 9.99
          },
          "stock": {
            "stockLevelStatus": "inStock"
          },
          "url": "Katalog/Spielwaren-%26-Zubeh%C3%B6r/LEGO/LEGO-DUPLO-Tiere-auf-dem-Bauernhof%2C-10870/p/68448_1_1"
        }},
    {
      "itemChecked": true,
      "itemCount": 1,
      "item":
        {
          "assortmentGroup": "TS",
          "brand": "LEGO",
          "bulkyProduct": false,
          "code": "68369_1_1",
          "contentUnit": "Packung",
          "description": "<p>Achtung! Nicht geeignet f&uuml;r Kinder unter 3 Jahren, da Erstickungsgefahr durch verschluckbare Kleinteile besteht.</p>\n\n<p>Kleinere Kinder haben viel Spa&szlig; beim Spielen mit diesem s&uuml;&szlig;en Marienk&auml;fer auf R&auml;dern. Er ist ganz einfach zu bauen und unterst&uuml;tzt so erste Bauerfolge und die Entwicklung feinmotorischer F&auml;higkeiten. Ein lustiges, kreatives Spielzeug zum Mitnehmen! Der Kopf des Marienk&auml;fers l&auml;sst sich drehen, wenn er schlafen oder aufwachen sollen. Mit der Blume l&auml;sst sich der Lebensraum des Marienk&auml;fers erkl&auml;ren. LEGO DUPLO Steine werden speziell f&uuml;r kleine Kinderh&auml;nde entwickelt, um sicheres Spielen zu gew&auml;hrleisten.</p>\n\n<p>&nbsp;</p>\n\n<p>- Marienk&auml;fer zum Zusammenbauen auf LEGO DUPLO R&auml;dern.<br />\n- Mit Gesichtsstein mit zwei Gesichtsausdr&uuml;cken (wach/schlafend) als Spieleinstieg.<br />\n- Enth&auml;lt au&szlig;erdem ein Blumen-Element.<br />\n- Einfach und schnell zusammengebaut f&uuml;r langen Spielspa&szlig;!<br />\n- Ein lustiges Spielzeug zum Mitnehmen!<br />\n- Dreh das Gesicht des Marienk&auml;fers, wenn er schlafen oder aufwachen soll!<br />\n- Erfinde Geschichten mit der Blume und dem Marienk&auml;fer oder erkl&auml;re deinem Kind den Lebensraum des<br />\n&nbsp; Marienk&auml;fers, um spielerisch seine Sprachfertigkeiten zu &uuml;ben.<br />\n- Ein tolles Geschenk f&uuml;r Kinder im Kindergartenalter.<br />\n- LEGO DUPLO Produkte sind speziell f&uuml;r kleine H&auml;nde geeignet und besonders lustig und sicher.<br />\n- Geeignet f&uuml;r Kinder im Alter von 1,5 bis 3 Jahren.<br />\n- Der Marienk&auml;fer ist &uuml;ber 7 cm hoch, 12 cm lang und 6 cm breit.<br />\n- Kombiniere ihn mit 10863 Meine erste Steinebox mit Ziehtieren und setz den Marienk&auml;fer auf den Tierzug!</p>\n\n<p><br />\n&nbsp;</p>\n\n<p>Feiere mit Emma Chicos Geburtstag mit dieser leicht zu bauenden Parkszene: mit Bogen, Wippe, Ballons und einem Kuchenstand mit baubarem Kuchen, Schubkarre, zwei zu &ouml;ffnenden Geschenkschachteln mit Geschenken, Bild und Stiftelement. Dieses beliebte Kinderspielzeug enth&auml;lt auch eine einfache Bau- und Spielanleitung und besonders gro&szlig;e Bausteine, die kleineren Kindern den Einstieg leicht machen und ihr Selbstbewusstsein st&auml;rken. Enth&auml;lt eine Spielfigur sowie eine Katerfigur.</p>\n\n<ul>\n\t<li>Enth&auml;lt die Spielfigur Emma sowie die Katerfigur Chico.</li>\n\t<li>Enth&auml;lt eine Parkszene mit Bogen, baubaren Ballons und Wippe sowie einen Stand mit einem baubaren Kuchen sowie eine Schubkarre.</li>\n\t<li>Belade die Schubkarre mit all den Dingen, die man f&uuml;r eine tolle Geburtstagsparty braucht!</li>\n\t<li>Verziere mit Emma den Geburtstagskuchen f&uuml;r Chico.</li>\n\t<li>Geh eine Runde Wippen und hilf Chico dann, seine Geschenke auszupacken.</li>\n\t<li>Als Zubeh&ouml;r sind 8 Cupcakes, ein Bild, ein Stiftelement, 2 Partyh&uuml;te, ein Teller, ein Kuchenst&uuml;ck, eine Blume, eine Schleife und 2 zu &ouml;ffnende Geschenkschachteln enthalten.</li>\n\t<li>Dieses beliebte Kinderspielzeug bietet Kindern im Alter von 4 bis 7 Jahren ein altersgerechtes Bau- und Spielerlebnis.</li>\n\t<li>Enth&auml;lt einfach zu bauende Modelle. Dank der gr&ouml;&szlig;eren Teile und der einfach aufgemachten Bauanleitung k&ouml;nnen die Kinder ganz schnell mit dem Bauen und Spielen beginnen.</li>\n\t<li>Alle LEGO JUNIORS Sets k&ouml;nnen mit allen anderen LEGO Sets kombiniert werden.</li>\n\t<li>Die Parkszene mit Bogen und Wippe ist &uuml;ber 7 cm hoch, 10 cm breit und 8 cm tief.</li>\n\t<li>Die Schubkarre ist &uuml;ber 5 cm breit und unter 2 cm hoch sowie 2 cm tief.</li>\n\t<li>Der Kuchen mit Untersatz ist &uuml;ber 5 cm hoch und 3 cm breit.</li>\n</ul>\n\n<p><br />\n<br />\nHilf Emma bei der Planung von Chicos Geburtstag im Heartlake City Park! Schaff alle S&uuml;&szlig;igkeiten mit der Schubkarre in den Park und stell den Bogen auf. Spiel mit Chico auf der Wippe, bevor du mit Emma den leckeren Kuchen verzierst. Schneid ein St&uuml;ck f&uuml;r Chico ab, damit er still sitzt, w&auml;hrend Emma ihn portr&auml;tiert und ihre k&uuml;nstlerische Ader zeigt. Hilf ihm dann, seine Geschenke zu &ouml;ffnen und spiel mit ihnen!</p>\n",
          "images": [
            {
              "format": "preview",
              "imageType": "PRIMARY",
              "url": "/medias/sys_master/images/images/h58/h6c/8991084085278/68369-1-1-1.jpg"
            },
            {
              "format": "product",
              "imageType": "PRIMARY",
              "url": "/medias/sys_master/images/images/hbe/h9c/8991083888670/68369-1-1-1.jpg"
            }
          ],
          "name": "LEGO JUNIORS Emmas Party, 10748",
          "numberContentUnits": "1 Packung",
          "posProduct": {

          },
          "price": {
            "currencyIso": "EUR",
            "formattedValue": "€ 9,99",
            "priceType": "BUY",
            "value": 9.99
          },
          "stock": {
            "stockLevelStatus": "inStock"
          },
          "url": "Katalog/Spielwaren-%26-Zubeh%C3%B6r/LEGO/LEGO-JUNIORS-Emmas-Party%2C-10748/p/68369_1_1"
        }}
  ];


}
