<template>
  <div>
    <button @click="callApi">调用API</button>
    <button @click="logout">退出登录</button>
    <button @click="getToken">获取accessToken</button>
    <button @click="revokeAccess">强制Token过期</button>
    <pre>{{res}}</pre>
  </div>
</template>

<script>
import API from "../api/GetApi";
import Mgr from "../api/oidc-config";

export default {
  name: "Home",
  data() {
    return {
      res: "My Home",
      myapi: new API(),
      mgr: new Mgr()
    };
  },

  methods: {
    callApi() {
      var that = this;
      that.myapi
        .getAll("identity/Get")
        .then(function(data) {
          that.res = data;
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    logout() {
      var that = this;
      that.mgr.signOut();
    },
    getToken() {
      var that = this;
      that.mgr.getUser().then(function(user) {
        if (user) {
          that.res = "access_token:" + user.access_token;
        } else {
          that.res = "User not logged in";
        }
      });
    },
    revokeAccess() {
      var that = this;
          that.myapi
        .revokeToken("js")
        .then(function(data) {
          that.res = data;
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  },
  mounted() {
    var that = this;
    that.mgr.getUser().then(function(user) {
      console.log(user)
      if (user) {
        that.res = "access_token:" + user.access_token;
      } else {
        that.res = "User not logged in";
      }
    });
  }
};
</script>

<style scoped>
</style>
