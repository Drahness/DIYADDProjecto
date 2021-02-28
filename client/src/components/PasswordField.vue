<template>
<q-input  square
          outlined
          clearable
          :float-label="float_caption"
          :type="hide ? 'password' : 'text'"
          :label="caption"
          :rules="rulz">
  <template v-slot:append>
    <q-icon :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="hiding = !hiding"/>
  </template>
</q-input>
</template>

<script>
export default {
  name: 'EssentialLink',
  props: {
    caption: {
      type: String,
      required: true
    },
    rulz: {
      type: Array,
      default () {
        return []
      }
    },
    float_caption: {
      type: String,
      required: true
    },
    hiding: {
      type: Boolean,
      required: true
    }
  }
}
</script>
