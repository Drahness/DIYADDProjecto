<template>
  <q-banner class="bg-primary glossy text-white d-flex flex-row">
    <template v-slot:avatar>
      <q-avatar class="rounded-borders" size="64px"> <!-- size="64px"-->
        <q-icon :name="m_avatar"/>
      </q-avatar >
    </template >
    <template v-slot:default>
        <div>{{ first_line }} <br> </div>
        <div>{{ second_line }}</div>
      </template >
  </q-banner>
</template>

<script>
export default {
  name: 'Banner',
  props: {
    first_line: {
      type: String,
      default: ''
    },
    second_line: {
      type: String,
      default: ''
    },
    avatar: {
      type: String,
      default: 'account_circle'
    }
  },
  computed: {
    m_avatar () {
      return this.avatar === null || this.avatar === undefined || this.avatar === '' ? 'account_circle' : this.avatar
    }
  }
}
</script>
