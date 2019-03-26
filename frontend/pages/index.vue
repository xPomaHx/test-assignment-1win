<template>
    <div>
        <b-container>
            <b-row>
                <b-col>
                    <b-list-group>
                        <b-list-group-item v-for="(sport,index) of sports" :key=index button :active=sport.active @click="openItem(sport)">{{sport.name}}
                            <transition name="fade">
                                <b-list-group v-if="Boolean(sport.active)" class="innerList">
                                    <b-list-group-item v-for="(text,index) of sport.list" :key=index>
                                        {{text}}
                                    </b-list-group-item>
                                </b-list-group>
                            </transition>
                        </b-list-group-item>
                    </b-list-group>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import io from 'socket.io-client';
const socket = io.connect({
  path:"/api",
});

export default {
  data(){
    return {
      sports:[],
      waitMetaId:null,
    }
  },
  methods:{
    async openItem(sport){
      if(sport.active) return;
      for(let sport of this.sports){
        this.$set(sport,'active',false);
      };
      const reqData={
        id:sport.id,
        meta_id:String(Math.random()),
      };
      this.waitMetaId=reqData.meta_id;
      socket.emit('get-sport', reqData);
      this.$set(sport,'active',true);
    }
  },
  async created(){
    await socket;
    socket.on('sport-list', (data)=>{
      this.sports=data;
    });
    socket.on('get-sport', ({ response, meta }) => {
      if(this.waitMetaId!==meta.meta_id) return
      const sport=this.sports.find(el=>el.id===meta.id);
      this.$set(sport,"list",response);
    });
  }
};
</script>

<style scoped>
.innerList{
    overflow:auto;
    max-height: 25vh;
    color:black;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
</style>
