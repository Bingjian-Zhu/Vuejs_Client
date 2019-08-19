<template></template>

<script>
import Mgr from "../api/oidc-config";

export default {
  data() {
    return {
      signedIn: true,
      mgr:new Mgr()
    };
  },
  mounted() {
    var that = this;
    that.mgr.getSignedIn().then(
      signIn => {
        this.signedIn = signIn;
      },
      err => {
        console.log(err);
      }
    );
  }
};
</script>

