import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import VueNativeSock from 'vue-native-websocket';

const BACKEND_URL = 'http://localhost:8080';
const PUSHER_URL = 'ws://localhost:8080/pusher';

const SET_CARS = 'SET_CARS';
const CREATE_CAR = 'CREATE_CAR';
const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
const SEARCH_ERROR = 'SEARCH_ERROR';

const MESSAGE_CAR_CREATED = 1;

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    cars: [],
    searchResults: [],
  },
  mutations: {
    SOCKET_ONOPEN() {},
    SOCKET_ONCLOSE() {},
    SOCKET_ONERROR(state, event) {
      console.error(event);
    },
    SOCKET_ONMESSAGE(state, message) {
      switch (message.kind) {
        case MESSAGE_CAR_CREATED:
          this.commit(CREATE_CAR, {id: message.id, body: message.body});
      }
    },
    [SET_CARS](state, cars) {
      state.cars = cars;
    },
    [CREATE_CAR](state, car) {
      state.cars = [car, ...state.cars];
    },
    [SEARCH_SUCCESS](state, cars) {
      state.searchResults = cars;
    },
    [SEARCH_ERROR](state) {
      state.searchResults = [];
    },
  },
  actions: {
    getCars({commit}) {
      axios
        .get(`${BACKEND_URL}/cars`)
        .then(({data}) => {
          commit(SET_CARS, data);
        })
        .catch(err => console.error(err));
    },
    async createCar(_, car) {
      await axios.post(`${BACKEND_URL}/cars`, null, {
        params: {
          body: car.body,
        },
      });
    },
    async searchCars({commit}, query) {
      if (query.length == 0) {
        commit(SEARCH_SUCCESS, []);
        return;
      }
      axios
        .get(`${BACKEND_URL}/search`, {
          params: {query},
        })
        .then(({data}) => commit(SEARCH_SUCCESS, data))
        .catch(err => {
          console.error(err);
          commit(SEARCH_ERROR);
        });
    },
  },
});

Vue.use(VueNativeSock, PUSHER_URL, {store, format: 'json'});

store.dispatch('getCars');

export default store;
