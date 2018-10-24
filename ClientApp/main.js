import Vue from 'vue';
import VueProgressBar from 'vue-progressbar';
import App from './App.vue';
import router from './router';
import store from './store';
import './styles.css';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import fontawesome from '@fortawesome/fontawesome';
import { faCopyright } from '@fortawesome/fontawesome-free-regular';
import { faEdit, faTrash, faCheck, faPlus } from '@fortawesome/fontawesome-free-solid';
import VueTouch from 'vue-touch';

Vue.config.productionTip = true;

fontawesome.library.add(faCopyright);
fontawesome.library.add(faEdit);
fontawesome.library.add(faTrash);
fontawesome.library.add(faCheck);
fontawesome.library.add(faPlus);

Vue.component('font-awesome-icon', FontAwesomeIcon);

const options = {
    color: '#fff',
    failedColor: '#ff0000',
    thickness: '2px',
    transition: {
        speed: '0.2s',
        opacity: '0.6s',
        termination: 300
    },
    autoRevert: true,
    location: 'top',
    inverse: false
};

Vue.use(VueProgressBar, options);

Vue.use(VueTouch);

export default new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');