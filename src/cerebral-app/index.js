import CerebralApp from 'cerebral';
import DevTools from 'cerebral/devtools';
import { state, sequence } from 'cerebral';
import axios from 'axios';

export default CerebralApp({
  state: {
    color: "green",
    center: [ 40, -81 ],
    boundary: {
      "type": "FeatureCollection",
      "features": [
        {
          "type": "Feature",
          "properties": {},
          "geometry": {
            "type": "LineString",
            "coordinates": [
              [
                -87.5390625,
                41.73852846935917
              ],
              [
                -87.5390625,
                38.65119833229951
              ],
              [
                -88.0224609375,
                38.272688535980976
              ],
              [
                -88.154296875,
                37.82280243352756
              ],
              [
                -89.12109375,
                37.3002752813443
              ],
              [
                -87.099609375,
                37.71859032558816
              ],
              [
                -86.2646484375,
                37.89219554724437
              ],
              [
                -85.166015625,
                38.95940879245423
              ],
              [
                -84.638671875,
                39.90973623453719
              ],
              [
                -84.8583984375,
                41.27780646738183
              ],
              [
                -84.90234375,
                41.86956082699455
              ]
            ]
          }
        },
        {
          "type": "Feature",
          "properties": {},
          "geometry": {
            "type": "Polygon",
            "coordinates": [
              [
                [
                  -86.6162109375,
                  41.672911819602085
                ],
                [
                  -88.24218749999999,
                  41.77131167976407
                ],
                [
                  -88.505859375,
                  39.9434364619742
                ],
                [
                  -87.5830078125,
                  37.92686760148135
                ],
                [
                  -84.814453125,
                  37.26530995561875
                ],
                [
                  -83.671875,
                  39.26628442213066
                ],
                [
                  -84.287109375,
                  41.77131167976407
                ],
                [
                  -86.6162109375,
                  41.672911819602085
                ]
              ]
            ]
          }
        }
      ]
    },
  },
  sequences: {
    mapClicked: sequence('mapClicked', [
      ({store,get}) => (get(state`color`) === 'red') ? store.set(state`color`, 'green') : store.set(state`color`, 'red'),
    ]),
    loadBoundary: sequence('loadBoundary', [
      ({store}) => axios.get('https://api.growersync.trellisfw.io/bookmarks/fields/fields-index/Home/fields-index/Home128', { 
        headers: { Authorization: "Bearer def" },
      }).then(resp => {
        store.set(state`boundary`, resp.data.boundary.geojson);
      })
    ]),
  },
}, {
  devtools: DevTools({
    host: 'localhost:8001',
    reconnect: true,
  }),
});
