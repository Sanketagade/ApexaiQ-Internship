<template>
  <div class="d-flex align-center">
    <v-rating
      :value="value"
      :readonly="readonly"
      :dense="dense"
      :size="size"
      :half-increments="halfIncrements"
      color="secondary"
      background-color="grey lighten-2"
      @input="$emit('input', $event)"
    />
    <span v-if="showValue" class="ml-1 font-weight-semibold" :style="{ fontSize: valueSize }">
      {{ Number(value).toFixed(1) }}
    </span>
    <span v-if="showCount && count !== null" class="ml-1 grey--text" :style="{ fontSize: countSize }">
      ({{ count }})
    </span>
  </div>
</template>

<script>
export default {
  name: 'StarRating',
  props: {
    value: { type: Number, default: 0 },
    readonly: { type: Boolean, default: false },
    dense: { type: Boolean, default: true },
    size: { type: [Number, String], default: 18 },
    halfIncrements: { type: Boolean, default: true },
    showValue: { type: Boolean, default: false },
    showCount: { type: Boolean, default: false },
    count: { type: Number, default: null },
    valueSize: { type: String, default: '0.9rem' },
    countSize: { type: String, default: '0.78rem' }
  }
}
</script>
