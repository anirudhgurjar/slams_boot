<template>
  <div class="container-fluid">
    <!--/sidebar-nav-fixed -->
    <h5 style="margin-top:5px;">{{cityNameFromRoute}} - <strong>{{categoryNameFromRoute}}</strong></h5>
        <hr>
    <div>
      <b-tabs content-class="mt-3">
        <b-tab title="List" active>
          <section>
            <div v-for="category in searchresults">
              <b-card img-left class="mb-2"  style="max-width: 30rem;" v-bind:img-src="category.logoURL">
                <b-card-text style="word-wrap: break-word;">
                  <h4>
                    <a href="#" v-on:click.stop="navigate(category)">{{category.name}}</a>
                  </h4>
                <article> {{category.description.substring(1,70)}}</article>
                </b-card-text>
                <div class="row pull left">
                  <div class="col-xs-10"></div>
                  <div class="col-sm-4">
                    <i class="now-ui-icons tech_mobile"></i>&nbsp;
                    <span style="font-size:1em;">
                      <strong>{{category.phone}}</strong>
                    </span>
                  </div>
                  <div class="col-sm-4">
                    <a v-bind:href="category.webURL" target="_new">
                      <i class="now-ui-icons business_globe"></i>&nbsp;
                      <span style="font-size:1em">
                        <strong>Website</strong>
                      </span>
                    </a>
                  </div>
                  <!-- <div class="col-sm-4">
                    <span style="font-size:1em">
                      <i class="now-ui-icons location_pin"></i> &nbsp;
                      <strong>{{category.address.zip}}</strong>
                    </span>
                  </div> -->
                </div>
              </b-card>
            </div>
          </section>
        </b-tab>
        <b-tab title="Map">
          <div id="map_canvas"></div>
          <div
            id="mymaps"
            class="nav nav-tabs nav-justified"
            style="height: 600px;width:500px;overflow:auto;position:relative;margin-bottom:10px;"
          />
        </b-tab>
      </b-tabs>
    </div>    
    <!-- Container -->
                <div class="footer text-ceter">
      <button class="btn btn-info" @click="backToResukts()">Back to Results</button>
    </div>
    <div>
      <b-modal
        ref="myModalRef"
        size="xl"
        headerClasses="justify-content-center"
        modal-classes="modal-sm"
      >
        <div class="container">
          <header class="masthead" style="background-image: url('img/post-bg.jpg')">
            <div class="overlay"></div>
            <div class="container-fluid">
              <div class="row">
                <div class="col-lg-8 col-md-10 mx-auto">
                  <div class="post-heading">
                    <h1>{{provider.name}}</h1>
                  </div>
                </div>
              </div>
            </div>
            <div class="row d-flex justify-content-center" style="margin:2rem;">
              <img v-bind:src="provider.logoURL">
            </div>
          </header>

          <article>
            <div class="container-fluid">
              <div class="row">
                <div class="col-lg-10">
                  <div class="col-lg-8 col-md-10 mx-auto">
                    <h2 class="section-heading">About Us</h2>
                    <p>{{provider.description}}</p>
                  </div>
                </div>
              </div>
            </div>
          </article>
          <hr>
          <footer>
            <div class="row">
              <div class="col">
                <b>Contact Details:</b>
                <br>
                Phone: {{provider.phone}}
                <br>
                <a href="mailto:support@mysite.com">{{provider.email}}</a>
                <br>
                <br>
              </div>
              <div class="col">
                <strong>Address:</strong>
                <br>
                {{provider.address.streetAddress1}}
                <br>
                {{provider.address.streetAddress2}}
                <br>
                {{provider.address.city}}
                <br>
                {{provider.address.state}} ,{{provider.address.zip}}
              </div>
              <div class="col">
                <b>Website:</b>
                <br>
                <a href="provider.webURL">{{provider.webURL}}</a>
                <br>
              </div>
            </div>
          </footer>
          <hr>

          <footer>
            <div class="container">
              <div class="row">
                <div class="col-lg-8 col-md-10 mx-auto">
                  <ul class="list-inline text-center">
                    <li class="list-inline-item">
                      <a href="#">
                        <span class="fa-stack fa-lg">
                          <i class="fas fa-circle fa-stack-2x"></i>
                          <i class="fab fa-twitter fa-stack-1x fa-inverse"></i>
                        </span>
                      </a>
                    </li>
                    <li class="list-inline-item">
                      <a href="#">
                        <span class="fa-stack fa-lg">
                          <i class="fas fa-circle fa-stack-2x"></i>
                          <i class="fab fa-facebook-f fa-stack-1x fa-inverse"></i>
                        </span>
                      </a>
                    </li>
                    <li class="list-inline-item">
                      <a href="#">
                        <span class="fa-stack fa-lg">
                          <i class="fas fa-circle fa-stack-2x"></i>
                          <i class="fab fa-instagram fa-stack-1x fa-inverse"></i>
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </b-modal>
    </div>        
  </div>
</template>
<script>
import http from "axios";
//import { Card } from '../components';
import router from "../router.js";
import { API_HOST } from "../endpoints.js";
//import { Modal } from '../components';
import $ from "jquery";

export default {
  components: {
    // Card,
    // Modal
  },
  props: {
    categoryId: String,
    cityName: String,
    statedata: {}
  },
  data() {
    return {
      searchresults: [],
      errors: {},
      providerDetails: {},
      addressData: {},
      categoryIdFromRoute: {},
      categoryNameFromRoute: {},
      cityNameFromRoute: {},
      statedata: {},
      modals: {
        classic: false
      },
      provider: {
        address: {}
      }
    };
  },
  mounted() {
    this.loadData();
  },
  created() {
    this.addressData = this.$route.params.addressData;
    this.categoryIdFromRoute = this.$route.params.categoryId;
    this.categoryNameFromRoute = this.$route.params.categoryName;
    this.cityNameFromRoute = this.$route.params.cityName;
    $(window).on("popstate", function() {
      this.backToResukts();
    });
  },
  methods: {
    loadData() {
      let tmpProviders = this.$route.params.searchresults.categories[
        this.$route.params.parentCtID
      ].childCategories[this.categoryIdFromRoute].providers;
      let cat;
      for (cat in tmpProviders) {
        http
          .get(
            // 'http://localhost:3000/api/categories/' +
            API_HOST + "/api/providers/" + cat
          )
          .then(response => {
            this.searchresults.push(response.data);
            let res = response.data;
            var i = 0;
            let marker;
            marker = new google.maps.Marker({
              position: {
                lat: parseFloat(res.address.latitude),
                lng: parseFloat(res.address.longitude)
              },
              map: this.map,
              title: res.name
            });
            this.map.setCenter(marker.getPosition());
            // }
          });
      }
      console.log("map: ", google.maps);
      document.getElementById("mymaps").innerHTML = "<h1>Loading maps</h1>";
      this.map = new google.maps.Map(document.getElementById("mymaps"), {
        center: { lat: 43.7315, lng: -79.7642 },
        scrollwheel: false,
        zoom: 17
      });

      // for(data in this.searchresults){
      //     console.log(data.address.latitude + " " + data.address.longitude);
      //      marker = new google.maps.Marker({position: {lat:data.address.latitude , lng: data.address.longitude}, map: this.map});
      // }

      //var marker = new google.maps.Marker({position: {lat:43.7315, lng: -79.7642}, map: this.map});
      console.log("Map loaded");
    },
    getImgUrl(pic) {
      return require("../../public/img/" + pic);
    },
    navigate(category) {
      // alert(JSON.stringify(category));
      // let routeData = router.resolve({name: 'spvdetails', params: { providerDetails: category }});
      // alert(routeData.href);
      // window.open(routeData.href, '_blank');

      //  router.push({name: 'spvdetails', params: { providerDetails: category }});
      this.provider = category;
      this.modals.classic = true;
      this.$refs.myModalRef.show();
    },
    backToResukts() {
      router.push({
        name: "scategorygroup",
        params: {
          statedata: this.$route.params.statedata,
          searchresults: this.$route.params.searchresults,
          addressData: this.$route.params.addressData
        }
      });
    },
    showmodel() {
      this.$refs.myModalRef.show();
    },
    hideModal() {
      this.$refs.myModalRef.hide();
    }
  }
};
</script>

<style scoped>
/* body {
  padding: 20px;
  font-family: 'Open Sans', sans-serif;
  /* background-color: #f7f7f7; }*/
.container1 {
  background: none !important;
}

.panel {
  margin-bottom: 20px;
}
.lib-panel img {
  width: 200px;
  background-color: transparent;
}

.lib-panel .row,
.lib-panel .col-md-6 {
  padding: 0;
  background-color: #ffffff;
}

.lib-panel .lib-row {
  padding: 0 20px 0 20px;
}

.lib-panel .lib-row.lib-header {
  background-color: #ffffff;
  font-size: 20px;
  padding: 10px 20px 0 20px;
}

.lib-panel .lib-row.lib-header .lib-header-seperator {
  height: 2px;
  width: 26px;
  background-color: #d9d9d9;
  margin: 2px 0 2px 0;
}

.lib-panel .lib-row.lib-desc {
  position: relative;
  height: 100%;
  display: block;
  font-size: 13px;
}
.lib-panel .lib-row.lib-desc a {
  position: absolute;
  width: 100%;
  bottom: 10px;
  left: 20px;
}

.row-margin-bottom {
  margin-bottom: 20px;
}

.box-shadow {
  -webkit-box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  box-shadow: 5px 10px 8px #888888;
}
.col-md-6 {
  margin-right: 0px;
}

.no-padding {
  padding: 0;
  margin-left: 0px;
}

.myPanel {
  
  color: rgb(72, 72, 72) !important;
  height: 100% !important;
}

.title-font {
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto,
    "Helvetica Neue", sans-serif !important;
  overflow-wrap: break-word !important;
  font-size: 18px !important;
  font-weight: 800 !important;
  line-height: 1.44444em !important;
  color: rgb(72, 72, 72) !important;
  margin: 0px !important;
}

.header-font {
  padding-top: 15px;
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto,
    "Helvetica Neue", sans-serif !important;
  overflow-wrap: break-word !important;
  font-size: 18px !important;
  font-weight: 800 !important;
  line-height: 1.44444em !important;
  color: rgb(72, 72, 72) !important;
  margin: 0px !important;
}

.starter-page {
  min-height: calc(100vh - 95px);
}

.modal-lg {
  max-width: 70% !important;
}
.maps {
  height: 300px;
  width: 100%;
}

.card-img-left {
  height: 14rem;
  width: 10rem;
}

.a {
  color: #f96332;
}

.container-fluid {
  min-width: 1531px;
  width: auto !important;
  width: 800px;
}

.mappp {
  display: -webkit-flex; /* Safari */
  -webkit-flex-wrap: wrap; /* Safari 6.1+ */
  display: flex;
  flex-wrap: wrap;
}


</style>