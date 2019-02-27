<template>
  <div class="container-fluid">
    <div class="page-header clear-filter">
      <div class="jumbotorn">
        <div class="text-center brand">
          <h1 class="h1-sm">Explore.Discover.Learn</h1>
          <h5>Slamsbox helps you to find great activities around you</h5>
          <form class="col-lg-12 d-flex justify-content-center">
            <div class="form-group form-inline">
              <div class="input-group">
              <span class="btn btn-info">Near</span>
              <gmap-autocomplete         
                  ref="autocomplete"     
                  class="form-control input-sm"
                  placeholder="Postal code"
                    @place_changed="setAddr"/>
              
              <router-link
                :to="{ name: 'scategorygroup', params: { addressData: this.autocompAddr } }"
                class="btn btn-primary btn"
                tag="button"
              >Search</router-link> 
              </div> 
            </div>
          </form>
          <div class="form-group d-flex justify-content-center">
            <button class="btn btn-icon btn-round btn-info" v-on:click="openSocial('tw')">
              <i class="fa fa-twitter"/>
            </button>            
            <button class="btn btn-icon btn-round" style="background:#39569c" v-on:click="openSocial('fb')">
              <i class="fab fa-facebook"/>
            </button>
            
            <button class="btn btn-icon btn-round btn-danger" v-on:click="openSocial('gl')">
              <i class="fab fa-google"/>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  beforeCreate() {
   setupGoogle();
  },
  data() {
    return {
      address: '',
      autocompAddr: {
        city: '',
        lat: '',
        lon: ''
      },
      isGoogleLoaded:false,
    };
  },
  methods: {
    testSetup() {
      console.log("testiung");
      if(this.isGoogleLoaded){
        return;
      }else if(typeof google ==='undefined'){ 
        this.setupGoogle();
      }else{
        this.setupGoogle();
      }
    },
    setAddr(place){
       let ac = place.address_components;
        let lat = place.geometry.location.lat();
        let lon = place.geometry.location.lng();
        let city = ac[0]['short_name'];
        this.autocompAddr.city = city;
        this.autocompAddr.lat = lat;
        this.autocompAddr.lon = lon;
        console.log(JSON.stringify(this.autocompAddr));
    },
    setupGoogle() {    
      this.autocomplete = new google.maps.places.Autocomplete(
        this.$refs.autocomplete,
        { types: ['geocode'] }
      );
      this.autocomplete.addListener('place_changed', () => {
        let place = this.autocomplete.getPlace();
        let ac = place.address_components;
        let lat = place.geometry.location.lat();
        let lon = place.geometry.location.lng();
        let city = ac[0]['short_name'];
        this.autocompAddr.city = city;
        this.autocompAddr.lat = lat;
        this.autocompAddr.lon = lon;
       // console.log(JSON.stringify(this.autocompAddr));
      });
      this.isGoogleLoaded=true;
    },
    whenGoogleLoadedDo(fnt) {
      if (typeof google != 'undefined') fnt();
      else
        setTimeout(function() {
          (function(fnt) {
            this.whenGoogleLoadedDo(fnt);
          })(fnt);
        }, 1000); // You can set timer as you wish //
    },
    openSocial(channel){
      if(channel=='tw')
        window.open('http://twitter.com/slamsbox');
       else if(channel== 'fb') 
        window.open('http://facebook.com/slamsbox');
       else if(channel=== 'gl') 
        window.open('http://google.com/slamsbox');
    }
  }
};
</script>

<style scoped>
.jumbotorn {
  margin-top: 15rem;
  align-content: center;
  color: aliceblue;
}
.container-fluid {
   background: url('../../public/img/background.jpg') !important;
  background-repeat: no-repeat;
  background-size: cover !important;   
  height: -webkit-fill-available;
    overflow: hidden; 
}

</style>