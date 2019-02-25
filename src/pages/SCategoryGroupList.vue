<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-1">
        <span></span>
      </div>
      <div class="col">
        <div class="header">
          <h5
            style="padding-top:1rem;font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto,'Helvetica Neue', sans-serif !important;" >
            <!-- Found {{searchresults.length}} Activites Near :&nbsp; -->
           We have found {{searchresults.length}} {{(searchresults.length==1)?'Activity':'Activities'}} Near :&nbsp;
            <strong>{{(this.addressData.city)?this.addressData.city:'Missing'}}</strong>
          </h5>
        </div>
       <div v-for="cat in searchresultsGrouped" style="display:inline">
          <h4 style>
            <strong>{{cat.categoryName}}</strong>
          </h4>
          <hr>
          <div class="card-deck" >
           <div v-for="obj in cat.childCategories">
                <div class="card ml-0 mt-0" style="width: 12rem;">
                     <img class="card-img" src="https://picsum.photos/150" alt="Card image cap">
                     <div class="card-img-overlay  d-flex flex-column justify-content-end">
                         <h5 class="card-title">    
                             <a href="#" v-on:click.stop="navigate(cat.categoryId,obj.categoryId,obj.categoryName)"><strong class="strong">{{obj.categoryName}}</strong></a>
                         </h5>
                     </div>
                </div>
          </div> 
          </div>
          <br/>
        </div>
      </div>
    </div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="alertModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">...</div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>    
    <footer class="text-center btn-primary"><hr/>All rights reserved<hr/></footer>
  </div>
</template>
<script>
import http from 'axios';
//import subCateGory from './SListing';
import dh from '../endpoints.js';
import {API_HOST} from '../endpoints.js';
import router from '../router.js'
import $ from 'jquery';


export default {
  components: {
  //  subCateGory
  },

  data() {
    return {
      searchresults: {},
      searchresultsGrouped: {},
      allCategoryData :[],
      errors: {},
      addressData: {},
      categoryDispData:{}
    };
  },
  mounted() {
  if(!this.$route.params.statedata){
      this.loadData();
    }else{           
      this.searchresultsGrouped= this.$route.params.searchresults.categories;//Mapper.groupBy(this.$route.params.statedata, p=> p.parent_id,catData.data); 
       this.searchresults= this.$route.params.searchresults;//Mapper.groupBy(this.$route.params.statedata, p=> p.parent_id,catData.data); 
      
    }
  },
  created() {
    this.addressData = this.$route.params.addressData;
    this.allCategoryData=Mapper.getCategorydata();    
    $(window).on('popstate', function() {
      //alert("pop");
    });
    $('.container-fluid').css('background-image','none');
  },
  methods: {
    loadData() {
      console.log(this.addressData.lat + '&longitude=' +this.addressData.lon);
        http.get(API_HOST + '/api/categories/')
        .then(catData => {
          http
        // .get(API_HOST +'/search/city/' + this.addressData)
        .get(API_HOST +'/search/location/geo?miles=2&latitude=' + this.addressData.lat + '&longitude=' +this.addressData.lon)
        .then(response => {
          this.searchresults = response.data;
          //this.searchresultsGrouped=Mapper.groupBy(this.searchresults, p=> p.parent_id,catData.data);
          this.searchresultsGrouped=response.data.categories;
        console.log('Got data=');
        console.log(JSON.stringify(this.searchresultsGrouped));
        })
        .catch(e => {
          //this.errors.push(e);
          console.log('Errors' + e);
        });
        })
        .catch(e => {
          //this.errors.push(e);
          console.log('Errors' + e);
        });



      console.log('dh=' + this.addressData);
      Mapper.getCategorydata().then(catData=>{
 

      });



    },
    navigate(pctId,ctId,ctName){
      // alert(JSON.stringify(category));
       router.push({name: 'slisting', params: {parentCtID:pctId, categoryId: ctId , categoryName :ctName,addressData:this.addressData,cityName:this.addressData.city, statedata:this.searchresultsGrouped,searchresults:this.searchresults}});
    }
  }
};
</script>

<style>
.card-title {
  text-align: center;
}

.card {
  margin: 0.5rem;
  margin-bottom: 1px;
}

.container-fluid {
  background: none;
  margin-top: 0px;
}

.card-img-top {
  width: 50%;
  height: 10vw;
  object-fit: fill;
}

.h4 {
  font-family: 'Arial Black", Gadget, sans-serif';
}

.starter-page {
  min-height: calc(100vh - 95px);
}

.card-img{
  opacity: 0.8;
}

.strong{
  color: aliceblue;
}

</style>