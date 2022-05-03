<template>
    <div>  
        <TypeNav/>
        <!--  -->
        <ListContainer></ListContainer>
        <TodayRecommend></TodayRecommend>
        <Rank></Rank>
        <Like></Like>
        <Floor v-for="floor in floors" :key="floor.id" :floor="floor"></Floor>
        <Brand></Brand>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import ListContainer from './ListContainer'
import TodayRecommend from './TodayRecommend'
import Brand from '@/pages/Home/Brand'
import Floor from '@/pages/Home/Floor'
import Like from '@/pages/Home/Like'
import Rank from '@/pages/Home/Rank'



   export default {
     name:'Home',
     
     mounted(){
       this.$store.dispatch('getRecommends')
       this.$store.dispatch('getFloors')
       this.$store.dispatch('getRanks')
       this.$store.dispatch('getLikes')
     },
     computed:{
       ...mapState({
         floors:state => state.home.floors,
       })
     },
     components:{
       ListContainer,
       TodayRecommend,
       Brand,
       Floor,
       Like,
       Rank,
     },
     data(){
       return{

       }
     }
   }
</script>

<style scoped>

</style>