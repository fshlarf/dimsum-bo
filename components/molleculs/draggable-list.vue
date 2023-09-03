<template>
  <div class="">
    <ul class="">
      <li
        class="item flex justify-between items-center py-[24px] pl-[24px] pr-[12px] cursor-pointer"
        v-for="(item, i) in list"
        :key="i"
        draggable="true"
        @dragstart="dragStart(i, $event)"
        @dragover.prevent
        @dragenter="dragEnter"
        @dragleave="dragLeave"
        @dragend="dragEnd"
        @drop="dragFinish(i, $event)"
        @touchstart.prevent
        @touchmove.prevent
        @touchend.prevent
      >
        <div class="flex items-center gap-[12px] text-sm text-[#66738F]">
          <img src="/icons/portfolio/ham-menu.svg" alt="menu" />
          <p>{{ item.title }}</p>
        </div>
        <div @click="item.isOpen = !item.isOpen" id="kebab-menu">
          <KebabMenu
            :is-show="item.isOpen"
            @onSelect="onSelect"
            :options="options"
          />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import KebabMenu from "~/components/atoms/kebab-menu.vue";

export default {
  components: {
    KebabMenu,
  },
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    list: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      dragging: -1,
    };
  },
  computed: {
    isDragging() {
      return this.dragging > -1;
    },
  },
  methods: {
    onSelect(data) {
      this.$emit("onSelectOption", data);
    },
    removeItemAt(index) {
      this.todos.splice(index, 1);
    },
    dragStart(which, ev) {
      ev.dataTransfer.setData("Text", this.id);
      ev.dataTransfer.effectAllowed = "move";
      this.dragging = which;
    },
    dragEnter(ev) {
      /* 
      if (ev.clientY > ev.target.height / 2) {
        ev.target.style.marginBottom = '10px'
      } else {
        ev.target.style.marginTop = '10px'
      }
      */
    },
    dragLeave(ev) {
      /* 
      ev.target.style.marginTop = '2px'
      ev.target.style.marginBottom = '2px'
      */
    },
    dragEnd(ev) {
      this.dragging = -1;
    },
    dragFinish(to, ev) {
      this.moveItem(this.dragging, to);
    },
    moveItem(from, to) {
      if (to === -1) {
        this.removeItemAt(from);
      } else {
        this.list.splice(to, 0, this.list.splice(from, 1)[0]);
      }
      this.$emit("updateListOrder", this.list);
    },
  },
};
</script>

<style>
.todo-list {
  list-style-type: none;
  padding: 10px;
}

.todo-item {
  border: 1px solid #ccc;
  border-radius: 2px;
  padding: 14px 8px;
  margin-bottom: 3px;
  background-color: #fff;
  box-shadow: 1px 2px 2px #ccc;
  font-size: 22px;
}

.todo-item:hover {
  opacity: 1;
  font-size: 28px;
}
</style>
