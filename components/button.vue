<template>
  <button
    :class="`control control--type-${type} control--size-${size}`"
    @click="$emit('click')"
  >
    <slot></slot>
  </button>
</template>
<script>
export default {
  props: {
    type: {
      type: String,
      default: "ghost",
    }, // ghost or full
    size: {
      type: String,
      default: "medium",
    },
  },
};
</script>
<style lang="scss" scoped>
.control {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: inherit;
  background: $secondary-color;
  color: $primary-color;
  border: 2px solid $primary-color;
  height: 29px;
  min-width: 30px;
  outline: none;
  //line-height: 1;
  vertical-align: middle;
  cursor: pointer;
  transition: all 0.2s ease-out;
  font-weight: bold;

  &:hover {
    box-shadow: inset 0px 0px 0px 1px black;
  }

  &--type-full {
    background: $primary-color;
    color: $secondary-color;
    &:hover {
      color: $primary-color;
      background: $secondary-color;
      &.button--no-hover {
        background: $primary-color;
        color: $secondary-color;
      }
    }
  }

  &--size-large {
    height: 40px;
    padding-left: $margin-sm;
    padding-right: $margin-sm;
  }

  &--icons {
    padding-top: 5px;
  }
}
</style>