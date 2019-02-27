import Vue from 'vue';
import Router from 'vue-router';
import SLanding from './pages/Slanding.vue';
import Navbar from './pages/Header.vue'
import Footer from './pages/FooterBar.vue';
import Scategorygroup from './pages/SCategoryGroupList.vue';
import Slisting from './pages/SListing.vue';
import Slisting_desktop from './pages/Slisting_desktop.vue';

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
        components: { default: Scategorygroup, header:Navbar,footer:Footer },
        props : {
          addressData:{},
          statedata:{},
          searchresults:{}
        },
      },{
        path: '/slisting',
        name: 'slisting',
        components: { default: Slisting, header:Navbar},
        props : {
          addressData:{},
          categoryId:{},
          categoryName:{},
          cityName:{},
          statedata:{},
          searchresults:{},
          parentCtID:{}
        }
      },{
        path: '/slisting_desktop',
        name: 'slisting_desktop',
        components: { default: Slisting_desktop, header:Navbar },
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