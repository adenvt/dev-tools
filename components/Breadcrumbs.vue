<template>
  <b-breadcrumb :items="items" />
</template>

<script>
import _map from 'lodash/map'
import _flow from 'lodash/flow'
import { capitalize, split, join, map } from 'lodash/fp'

const formatName = (name) => {
  return _flow([
    split('-'),
    map(capitalize),
    join(' '),
  ])(name)
}

export default {
  computed: {
    items () {
      return _map(this.$route.matched, (item) => {
        return {
          text: formatName(item.name),
          href: item.path,
        }
      })
    }
  }
}
</script>
