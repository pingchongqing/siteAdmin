<template>
  <div class="menu-wrapper sidebar-container">
    <scroll-bar>
      <el-menu
        mode="vertical"
        :show-timeout="200"
        :default-active="$route.path"
        background-color="#1f2438"
        text-color="#fff"
        active-text-color="#fff"
      >
      <template v-if="routes">
        <template v-for="child in routes">
          <template v-if="child.children && child.children.length>0">
            <el-submenu :index="child.path">
              <template slot="title">
                <svg-icon icon-class="file" style="font-size:16px;"/>
                <span>{{child.meta.title}}</span>
              </template>
              <template v-for="item in child.children">
                  <router-link :to="child.path+'/'+item.path" :key="item.name" v-if="!item.hidden">
                    <el-menu-item :index="child.path+'/'+item.path">
                      <span style="margin-left:16px;">{{item.meta.title}}</span>
                    </el-menu-item>
                  </router-link>
              </template>
            </el-submenu>
          </template>
          <template v-else>
            <router-link :to="child.path" :key="child.name" v-if="!child.hidden">
                <el-menu-item :index="child.path">
                  <svg-icon :icon-class="child.name" style="font-size:16px;"/>
                  <span>{{child.meta.title}}</span>
                </el-menu-item>
            </router-link>
          </template>
        </template>
      </template>
      <template v-else>
        <router-link to="/dashboard" key="dashboard" >
          <el-menu-item index="/dashboard">
          <svg-icon icon-class="table"/>
          <span>主页</span>
          </el-menu-item>
        </router-link>
      </template>
      </el-menu>
    </scroll-bar>
  </div>
  
</template>

<script>
import { mapGetters } from 'vuex'
import ScrollBar from '@/components/ScrollBar'
import scmRouter from '@/router/scmRouter'
import { getToken } from '@/utils/auth'

export default {
  data(){
    return {
      routes:scmRouter,
      usertype:Number(getToken()),
    }
  },
  components: { ScrollBar },
  computed: {
    ...mapGetters([
      'sidebar',
      // 'currentRouters',
    ]),
    // routes() {
    //   return this.currentRouters
    // },
  },
  created(){
  }
}
</script>