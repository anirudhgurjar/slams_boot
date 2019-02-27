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
     var isMobile = false; //initiate as false
// device detection
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
    isMobile = true;
}
     if(isMobile){
      router.push({name: 'slisting', params: {parentCtID:pctId, categoryId: ctId , categoryName :ctName,addressData:this.addressData,cityName:this.addressData.city, statedata:this.searchresultsGrouped,searchresults:this.searchresults}});
     }else{
       router.push({name: 'slisting_desktop', params: {parentCtID:pctId, categoryId: ctId , categoryName :ctName,addressData:this.addressData,cityName:this.addressData.city, statedata:this.searchresultsGrouped,searchresults:this.searchresults}});
     }
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