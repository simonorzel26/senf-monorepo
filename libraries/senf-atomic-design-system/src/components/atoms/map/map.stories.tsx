/** @format */

import React from "react";
import { Story, Meta } from "@storybook/react";

import Map from "./Map";

import { MapProps } from "./Map.types";
import ExpandMap from "./ExpandMap";

export default {
  title: "Atom/Map",
  component: Map,
  argTypes: {},
} as Meta<typeof Map>;

const Template: Story<MapProps> = (args) => <Map {...args} />;


export const Default = Template.bind({});
Default.args = {
  initialMapViewport: {
    latitude: 50.93864020643174,
    longitude: 6.935142517089844,
    zoom: 10,
  },
  polygon:
    '{"type":"FeatureCollection","features":[{"id":"458f679b3066cc9e75c2973ef81f38d9","type":"Feature","properties":{},"geometry":{"coordinates":[[[6.933078066975327,50.93706925894358],[6.902495072399319,50.8853410139935],[7.001525721501622,50.88687226076479],[7.00006938842651,50.9382928996971],[6.933078066975327,50.93706925894358]]],"type":"Polygon"}}]}',

  ideaData: [
    {
      screamId: "ONRO4DTBAQWMd8jQwxkc",
      lat: 50.85139419195065,
      long: 7.109100275113178,
      title: "Radweg endet ",
      body: "Der Raddverkehr wird hier auf die Straße geleitet. Er sollte durchgängOmg fortgeführt werden.",
      createdAt: "2022-07-19T16:05:50.706Z",
      commentCount: 0,
      likeCount: 0,
      status: "None",
      Thema: "Rad",
      Stadtteil: "Lind",
      projectRoomId: "",
      color: "#929df6",
      locationHeader: "Linder Mauspfad 115",
    },
  ],
  ideasData: [
    {
      screamId: "ONRO4DTBAQWMd8jQwxkc",
      lat: 50.85139419195065,
      long: 7.109100275113178,
      title: "Radweg endet ",
      body: "Der Raddverkehr wird hier auf die Straße geleitet. Er sollte durchgängOmg fortgeführt werden.",
      createdAt: "2022-07-19T16:05:50.706Z",
      commentCount: 0,
      likeCount: 0,
      status: "None",
      Thema: "Rad",
      Stadtteil: "Lind",
      projectRoomId: "",
      color: "#929df6",
      locationHeader: "Linder Mauspfad 115",
    },
    {
      screamId: "km39Oxn7UzH4dG2WTPHO",
      lat: 50.854316108788055,
      long: 7.021863877693704,
      title: "Rad- und Fußweg zwischen Zündorf und Langel",
      body: "Möchte man mit dem Rad oder zu Fuß von Zündorf nach Langel (oder umgekehrt), bleibt einem heute nur der Weg unterhalb des Loorwegs Richtung Rhein. Die",
      createdAt: "2022-07-06T10:52:18.058Z",
      commentCount: 0,
      likeCount: 1,
      status: "None",
      Thema: "Rad",
      Stadtteil: "Langel",
      projectRoomId: "",
      color: "#929df6",
      locationHeader: "Loorweg 11",
    },
    {
      screamId: "g2pZU6obM8YJYU6Y3vbg",
      lat: 50.858088451846506,
      long: 7.092585344000891,
      title: "Ein Park für Wahn",
      body: "Zwischen dem Lidl und der Sparkasse in Köln Porz-Wahn befindet sich ein brachliegendes Grundstück, das wohl seit Jahren ungenutzt ist.\n\nEs bietet ca. ",
      createdAt: "2021-06-11T13:52:25.857Z",
      commentCount: 0,
      likeCount: 7,
      status: "None",
      Thema: "Sport / Freizeit",
      Stadtteil: "Wahn",
      color: "#f6c095",
      locationHeader: "Wilhelm-Ruppert-Straße 38",
    },
    {
      screamId: "8546kWkIMP3C8ix4TOMF",
      lat: 50.859401159360104,
      long: 7.081645403831804,
      title: "Neuer Asphalt für die Burgallee",
      body: "Für Fahrradfahrer ist die Burgallee, die zwischen dem Neubaugebiet am Wahner Bahnhof und dem restlichen Ort verläuft, ungeeignet. Auf der gesamten Län",
      createdAt: "2021-06-11T13:58:11.913Z",
      commentCount: 0,
      likeCount: 4,
      status: "None",
      Thema: "Rad",
      Stadtteil: "Wahn",
      color: "#929df6",
      locationHeader: "Burgallee 4",
    },
    {
      screamId: "1GnfX6SSd66ZVKZ7C2V2",
      lat: 50.86033444460372,
      long: 7.104484044303945,
      title: "Freie Fahrt für Radfahrer ",
      body: "Um das Radfahren attraktiver für alle zu machen, sollte die Einbahnstraße für Radfahrer in beide Richtungen gestattet sein.",
      createdAt: "2022-07-18T06:50:58.243Z",
      commentCount: 0,
      likeCount: 0,
      status: "None",
      Thema: "Rad",
      Stadtteil: "Wahnheide",
      projectRoomId: "",
      color: "#929df6",
      locationHeader: "Magazinstraße 10",
    },
    {
      screamId: "7CodNvIzJWWKmaYoJ7fS",
      lat: 50.860402660804255,
      long: 7.084024644270586,
      title: "Erhöhte Sicherheit Frankfurter Straße Wahn",
      body: "Das Überqueren der Straße ist hier trotz Verkehrsinsel sehr gefährlich. Durch eine Kurve mit einem Gebäude, das sehr nah an der Straße steht können Fu",
      createdAt: "2021-07-20T10:19:18.781Z",
      commentCount: 0,
      likeCount: 2,
      status: "None",
      Thema: "Verkehr",
      Stadtteil: "Wahn",
      color: "#91dff4",
      locationHeader: "Frankfurter Str. 252",
    },
    {
      screamId: "Mi9Czhbx3YsqpOTP1zXj",
      lat: 50.860847,
      long: 7.079275,
      title: "kostenpflichtige Parkplätze an der Straße",
      body: "Für Bahnfahrer kostenfreies P+R Parkhaus wird kaum genutzt, weil an der Straße gratis geparkt werden kann. Nur eine S-Bahn-Station vom Flughafen entfe",
      createdAt: "2022-07-07T09:08:29.243Z",
      commentCount: 0,
      likeCount: 1,
      status: "None",
      Thema: "Sonstige",
      Stadtteil: "Wahn",
      projectRoomId: "",
      color: "#f9db95",
      locationHeader: "Am Bahnhof 118",
    },
    {
      screamId: "nBmmkdsus4BYMCpdh3Vx",
      lat: 50.86112619427288,
      long: 7.066335025858016,
      title: "Geh- und Radweg zwischen Wahn und Zündorf",
      body: "Möchte man als Wahner an den Rhein oder als Zündorfer via Bike+Ride schnell an der S-Bahn-Haltestelle in Wahn sein, ist dies derzeit nur mit Bus oder ",
      createdAt: "2021-06-21T14:21:01.492Z",
      commentCount: 0,
      likeCount: 4,
      status: "None",
      Thema: "Rad",
      Stadtteil: "Zündorf",
      color: "#929df6",
      locationHeader: "Wahner Str.",
    },
    {
      screamId: "PyxQzdkEfNj4j7ni3lX1",
      lat: 50.861585446943934,
      long: 7.01903188994595,
      title: "Autofähre",
      body: "Hier könnte eine Autofähre eingerichtet werden. Rampen sind auf beiden Rheinseiten vorhanden.",
      createdAt: "2022-07-06T10:59:47.441Z",
      commentCount: 0,
      likeCount: 2,
      status: "None",
      Thema: "Verkehr",
      Stadtteil: "Zündorf",
      projectRoomId: "",
      color: "#91dff4",
      locationHeader: "Nato-Rampe ",
    },
    {
      screamId: "hSgpGM4JocCSzvBPjVMN",
      lat: 50.86334268184473,
      long: 7.103789233998327,
      title: "Neuordnung Einbahnstraßen",
      body: "Die Magazinstraße und die Sportplatzstraße in Wahnheide sind zwei parallele Einbahnstraßen, die durch parkende und schnell fahrende Autos eine Engstel",
      createdAt: "2022-07-21T09:07:28.914Z",
      commentCount: 0,
      likeCount: 0,
      status: "None",
      Thema: "Rad",
      Stadtteil: "Wahnheide",
      projectRoomId: "",
      color: "#929df6",
      locationHeader: "Magazinstraße 73b",
    },
    {
      screamId: "XacKMFI5pBcxNqmmkHfp",
      lat: 50.86768392437724,
      long: 7.024534665594536,
      title: "Fußgänger- und Radbrücke zwischen Zündorf und Weiss/Sürth",
      body: "Die äußeren Stadtbezirke sind schlecht miteinander verbunden. Wer von Porz nach Godorf möchte (OBI, IKEA, Karnevalswierts etc.), kann dies ohne Auto n",
      createdAt: "2021-07-20T10:37:46.673Z",
      commentCount: 0,
      likeCount: 4,
      status: "None",
      Thema: "Verkehr",
      Stadtteil: "Sürth",
      color: "#91dff4",
      locationHeader: "Unnamed Road",
    },
    {
      screamId: "2IAj2fRyA6mnURruniO9",
      lat: 50.871430863430106,
      long: 6.880953965999993,
      title: "Ampel verkehrsabhängig schalten",
      body: "Die Ampel ist total unökologisch. Angeblich soll sie so geschaltet sein, dass der Radfahrer Dauer-Grün bzw. Vorrang hat. Aber das habe ich schon mehrf",
      createdAt: "2022-07-07T14:33:34.651Z",
      commentCount: 0,
      likeCount: 0,
      status: "None",
      Thema: "Verkehr",
      Stadtteil: "Hürth",
      projectRoomId: "",
      color: "#91dff4",
      locationHeader: "Trierer Straße 81",
    },
    {
      screamId: "u3UYn6z3PeNPS3oiPasA",
      lat: 50.872272360471044,
      long: 7.038610979549617,
      title: "Fähre für Pendler",
      body: "Das Krokodil fährt immer seltener, der Fährmann findet keinen Nachfolger. Zudem bringt es hauptsächlich Touristen auf die andere Seite und fährt nicht",
      createdAt: "2022-07-06T10:57:42.180Z",
      commentCount: 0,
      likeCount: 4,
      status: "None",
      Thema: "Verkehr",
      Stadtteil: "Zündorf",
      projectRoomId: "",
      color: "#91dff4",
      locationHeader: "Am Wingert 49",
    },
    {
      screamId: "La2WGXhWZzkyJ4UoYuWK",
      lat: 50.87269731879795,
      long: 7.083376394225297,
      title: "Fahrradweg entlang der Frankfurter sanieren",
      body: "Der vorhandene Fahrradweg ist holprig, schmal und nicht durchgängig. Das muss besser gehen!",
      createdAt: "2022-07-07T09:10:04.520Z",
      commentCount: 0,
      likeCount: 1,
      status: "None",
      Thema: "Sonstige",
      Stadtteil: "Elsdorf",
      projectRoomId: "",
      color: "#f9db95",
      locationHeader: "Frankfurter Straße 408",
    },
    {
      screamId: "2oXWZfEDO9s1qmwaWwcf",
      lat: 50.875135099754715,
      long: 7.010461273726833,
      title: "Öffentliche Treffpunkte für Kinder und Jugendliche",
      body: "Scheinbar wurden bei der Planung des Sürther Feldes ältere Kinder und Jugendliche vergessen. Verschiedene öffentliche Treffpunkte, wie Skateparks, Str",
      createdAt: "2022-07-06T13:14:44.899Z",
      commentCount: 1,
      likeCount: 1,
      status: "None",
      Thema: "Sport / Freizeit",
      Stadtteil: "Rodenkirchen",
      projectRoomId: "",
      color: "#f6c095",
      locationHeader: "Sürther Feldallee 16",
    },
    {
      screamId: "9Xmo0wbmxZkaf5TbEwXI",
      lat: 50.87558939060665,
      long: 7.025881799877425,
      title: "Kleine Kiosks in Parks und auf Spielplätzen",
      body: "Aufwertung der Aufenthaltsqualität von Spielplätzen und Parks durch kleine Kiosks mit einem Sortiment aus Kaltgetränken, Eis, Kaffee,  etc.. So gesehe",
      createdAt: "2022-07-06T12:47:46.378Z",
      commentCount: 0,
      likeCount: 1,
      status: "None",
      Thema: "Sport / Freizeit",
      Stadtteil: "Weiß",
      projectRoomId: "",
      color: "#f6c095",
      locationHeader: "Zum Hedelsberg 23",
    },
    {
      screamId: "bySCFziU9JqBTONU42CQ",
      lat: 50.881866497722,
      long: 7.067144787392635,
      title: "Busbetriebshof mit Mehrhwert für Porz",
      body: "Die KVB plant mit der Stadt hier einen Busbetriebshof für Elektrobusse zu erstellen. Das mag an sich eine gute Idee sein, aber das 63000qm große Gelän",
      createdAt: "2021-11-21T18:02:41.797Z",
      commentCount: 0,
      likeCount: 4,
      status: "None",
      Thema: "Versorgung",
      Stadtteil: "Porz",
      color: "#bd98f6",
      locationHeader: "Kaiserstraße 129",
    },
    {
      screamId: "9PNxm0OJfQ7hMVYV5ZBu",
      lat: 50.88263848037664,
      long: 7.081986464587243,
      title: "Fahrrad Einfädelungsstreifen (Urbach, Eil)",
      body: "Von Süden aus kommend darf die Frankfurter Straße ab der Kreuzung Fauststraße nur noch auf dem linken Geh- und Radweg befahren werden.\n\nDie Fahrradfah",
      createdAt: "2021-07-20T10:02:08.299Z",
      commentCount: 0,
      likeCount: 2,
      status: "None",
      Thema: "Rad",
      Stadtteil: "Urbach",
      color: "#929df6",
      locationHeader: "Frankfurter Str. 540",
    },
    {
      screamId: "TnGCYaxmg7u9j94rr5AZ",
      lat: 50.88357312291362,
      long: 7.054257338728348,
      title: "Öffentliche kostenlose Toiletten",
      body: 'Am Rheinufer sollten öffentliche Toiletten - zumindest in den wärmeren Jahreszeiten oder zumindest, wenn "Grillwetter" ist - aufgestellt werden. Das R',
      createdAt: "2022-07-06T12:36:21.396Z",
      commentCount: 1,
      likeCount: 2,
      status: "None",
      Thema: "Sonstige",
      Stadtteil: "Porz",
      projectRoomId: "",
      color: "#f9db95",
      locationHeader: "Friedrich-Ebert-Ufer 65",
    },
  ],

  projectroomsData: [
    {
      centerLat: 50.96447910444719,
      zoom: 12.5,
      description_about: "room description",
      description_procedure: "room description",
      organizationType: "Initiativen",
      projectRoomId: "Y2dFTmJ2FIzD1YqPCotk",
      weblinkTitle: "Website",
      description_learnmore: null,
      contactTitle: "Kontakt",
      owner: "Neue Organisation",
      createdAt: "2022-05-31T12:41:10.338Z",
      weblink: "",
      geoData:
        '{"type":"FeatureCollection","features":[{"id":"1fd84b9011288075e06623625fed2972","type":"Feature","properties":{},"geometry":{"coordinates":[[[6.848024518461614,50.99077694309838],[6.95969680827622,50.938181265796004],[6.9300793748909655,50.969378911207144],[6.848024518461614,50.99077694309838]]],"type":"Polygon"}}]}',
      status: "active",
      calendar: false,
      title: "room ",
      contact: "",
      logoURL:
        "https://firebasestorage.googleapis.com/v0/b/senf-dev.appspot.com/o/organizationsData%2FrATYNDh5gfJGYMTKlCVC%2FY2dFTmJ2FIzD1YqPCotk%2Fthumbnail?alt=media&token=b805c2fe-e647-453e-a057-9cca7108b8a4",
      centerLong: 6.903860663368917,
      description_motivation: null,
      organizationId: "rATYNDh5gfJGYMTKlCVC",
      brief: "room description",
      icon: {
        type: "svg",
        key: null,
        ref: null,
        props: {
          id: "Ebene_1",
          "data-name": "Ebene 1",
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 16 16",
          children: [
            {
              type: "path",
              key: null,
              ref: null,
              props: {
                d: "M7.35,12.66a1.08,1.08,0,0,1-.46.27.18.18,0,0,0-.13.15L6.6,14.47a.72.72,0,0,0,.64.81.73.73,0,0,0,.61-.21l1.9-1.9a5.51,5.51,0,0,0,1.16-1.75,8.59,8.59,0,0,0,.26-2.14A.17.17,0,0,0,11,9.09a.19.19,0,0,0-.13.05Z",
              },
              _owner: null,
            },
            {
              type: "path",
              key: null,
              ref: null,
              props: {
                d: "M3.35,8.66,6.88,5.11a.18.18,0,0,0,0-.25.19.19,0,0,0-.13-.05,9.06,9.06,0,0,0-2.2.25A5.5,5.5,0,0,0,2.83,6.24L.93,8.14a.73.73,0,0,0,0,1,.72.72,0,0,0,.52.21l1.49-.17a.18.18,0,0,0,.15-.13A1.06,1.06,0,0,1,3.35,8.66Z",
              },
              _owner: null,
            },
            {
              type: "path",
              key: null,
              ref: null,
              props: {
                d: "M3.75,11.24a1.54,1.54,0,0,0-2.27.25A10.76,10.76,0,0,0,0,15.1.73.73,0,0,0,.53,16,.77.77,0,0,0,.9,16a10.91,10.91,0,0,0,3.6-1.46,1.54,1.54,0,0,0,.25-2.27Z",
              },
              _owner: null,
            },
            {
              type: "path",
              key: null,
              ref: null,
              props: {
                d: "M15.58,0a8.65,8.65,0,0,0-3.24,1.15c-.46.46-7.1,7.13-8.11,8.12a.19.19,0,0,0,0,.26l2.24,2.24a.2.2,0,0,0,.25,0l8.12-8.12A8.48,8.48,0,0,0,16,.42.35.35,0,0,0,15.71,0Z",
              },
              _owner: null,
            },
          ],
        },
        _owner: null,
      },
    },

    {
      centerLat: 50.97847910444719,
      zoom: 12.5,
      description_about: "other room",
      description_procedure: "room description",
      organizationType: "Initiativen",
      projectRoomId: "Y2dFTmJ2FIzD1YqPCotk",
      weblinkTitle: "Website",
      description_learnmore: null,
      contactTitle: "Kontakt",
      owner: "Neue Organisation",
      createdAt: "2022-05-31T12:41:10.338Z",
      weblink: "",
      geoData:
        '{"type":"FeatureCollection","features":[{"id":"1fd84b9011288075e06623625fed2972","type":"Feature","properties":{},"geometry":{"coordinates":[[[6.848024518461614,50.99077694309838],[6.95969680827622,50.938181265796004],[6.9300793748909655,50.969378911207144],[6.848024518461614,50.99077694309838]]],"type":"Polygon"}}]}',
      status: "active",
      calendar: false,
      title: "room description",
      contact: "",
      logoURL:
        "https://firebasestorage.googleapis.com/v0/b/senf-dev.appspot.com/o/organizationsData%2FrATYNDh5gfJGYMTKlCVC%2FY2dFTmJ2FIzD1YqPCotk%2Fthumbnail?alt=media&token=b805c2fe-e647-453e-a057-9cca7108b8a4",
      centerLong: 6.92860663368917,
      description_motivation: null,
      organizationId: "rATYNDh5gfJGYMTKlCVC",
      brief: "room description",
      icon: {
        type: "svg",
        key: null,
        ref: null,
        props: {
          id: "Ebene_1",
          "data-name": "Ebene 1",
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 16 16",
          children: [
            {
              type: "path",
              key: null,
              ref: null,
              props: {
                d: "M7.35,12.66a1.08,1.08,0,0,1-.46.27.18.18,0,0,0-.13.15L6.6,14.47a.72.72,0,0,0,.64.81.73.73,0,0,0,.61-.21l1.9-1.9a5.51,5.51,0,0,0,1.16-1.75,8.59,8.59,0,0,0,.26-2.14A.17.17,0,0,0,11,9.09a.19.19,0,0,0-.13.05Z",
              },
              _owner: null,
            },
            {
              type: "path",
              key: null,
              ref: null,
              props: {
                d: "M3.35,8.66,6.88,5.11a.18.18,0,0,0,0-.25.19.19,0,0,0-.13-.05,9.06,9.06,0,0,0-2.2.25A5.5,5.5,0,0,0,2.83,6.24L.93,8.14a.73.73,0,0,0,0,1,.72.72,0,0,0,.52.21l1.49-.17a.18.18,0,0,0,.15-.13A1.06,1.06,0,0,1,3.35,8.66Z",
              },
              _owner: null,
            },
            {
              type: "path",
              key: null,
              ref: null,
              props: {
                d: "M3.75,11.24a1.54,1.54,0,0,0-2.27.25A10.76,10.76,0,0,0,0,15.1.73.73,0,0,0,.53,16,.77.77,0,0,0,.9,16a10.91,10.91,0,0,0,3.6-1.46,1.54,1.54,0,0,0,.25-2.27Z",
              },
              _owner: null,
            },
            {
              type: "path",
              key: null,
              ref: null,
              props: {
                d: "M15.58,0a8.65,8.65,0,0,0-3.24,1.15c-.46.46-7.1,7.13-8.11,8.12a.19.19,0,0,0,0,.26l2.24,2.24a.2.2,0,0,0,.25,0l8.12-8.12A8.48,8.48,0,0,0,16,.42.35.35,0,0,0,15.71,0Z",
              },
              _owner: null,
            },
          ],
        },
        _owner: null,
      },
    },
  ],
};
