import Vue from 'vue';
import Router from 'vue-router';
import SLanding from './pages/Slanding.vue';
import Navbar from './pages/Header.vue'
import Scategorygroup from './pages/SCategoryGroupList.vue';
import Slisting from './pages/SListing.vue';

Vue.use(Router);


export default new Router({
    routes: [
      {
        path: '/',
        name: 'index',
         components: { default: SLanding},
      },
      {
        path: '/scategorygroup',
        name: 'scategorygroup',
        components: { default: Scategorygroup, header:Navbar },
        props : {
          addressData:{},
          statedata:{},
          searchresults:{}
        },
      },{
        path: '/slisting',
        name: 'slisting',
        components: { default: Slisting, header:Navbar },
        props : {
          addressData:{},
          categoryId:{},
          categoryName:{},
          cityName:{},
          statedata:{},
          searchresults:{},
          parentCtID:{}
        }
      }
    ],
    scrollBehavior: to => {
      if (to.hash) {
        return { selector: to.hash };
      } else {
        return { x: 0, y: 0 };
      }
    }
  });