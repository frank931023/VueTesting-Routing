<template>
  <button @click="confirmInput">Confirm</button>
  <button @click="saveChanges">Save Changes</button>
  <ul>
    <users-item
      v-for="user in users"
      :key="user.id"
      :name="user.fullName"
      :role="user.role"
    ></users-item>
  </ul>
</template>

<script>
import UsersItem from '../components/users/UsersItem.vue';

export default {
  components: {
    UsersItem,
  }, // navigate programmatically with $ sign property and push method
  inject: ['users'],
  data() {
    return {
      changedSaved: false,
    };
  },
  methods: {
    confirmInput() {
      // do something
      this.$router.push('/teams');
    },
    saveChanges() {
      this.changedSaved = !this.changedSaved;
    },
  },
  beforeRouteEnter(to, from, next) {
    console.log('UserList Cmp beforeRouteEnter');
    console.log(to, from);
    next();
  },
  beforeRouteLeave(to, from, next) {
    console.log('UserList Cmp beforeRouteLeave');
    console.log(to, from);
    if (this.changedSaved) {
      next();
    } else {
      const userWantsToLeave = confirm('Are you sure you want to leave?');
      next(userWantsToLeave);
    }
  }, // provide great user experience by using beforeRouteLeave guard to make sure user don't lose unsaved changes when they leave the page by accident
  unmounted() {
    console.log('UserList Cmp unmounted');
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 2rem auto;
  max-width: 20rem;
  padding: 0;
}
</style>