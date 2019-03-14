<template>
  <div
    class="upload-file"
    :class="{dragover: dragover}"
    @drop.prevent="onDrop"
  >
    <label
      @dragover.prevent
      @dragenter.prevent="dragover = true"
      @dragleave.prevent="dragover = false"
    >
      <input
        type="file"
        @change="onChange($event)"
      >
      <template v-if="file">
        <div class="p-3">
          <b-img
            v-if="src"
            :src="src"
            thumbnail
            fluid
          />
          <div class="text-center font-bold">
            <span
              class="file-icon"
              :class="icon"
            />
            {{ file.name }}
          </div>
        </div>
      </template>
      <template v-else>
        Drag file <br> or
        <span class="btn btn-primary btn-sm">
          Choose File...
        </span>
      </template>
    </label>
  </div>
</template>

<script>
import FileIcons from 'file-icons-js'

export default {
  name: 'FileUpload',
  data () {
    return {
      files   : [],
      dragover: false,
      src     : null,
    }
  },
  computed: {
    file () {
      if (this.files.length > 0)
        return this.files[0]

      return null
    },
    icon () {
      if (this.file)
        return FileIcons.getClass(this.file.name)

      return null
    },
  },
  watch: {
    file (file) {
      if (this.src)
        URL.revokeObjectURL(this.src)

      this.src = file && file.type.match('image.*')
        ? URL.createObjectURL(file)
        : null
    },
  },
  methods: {
    onChange (e) {
      if (e.target.files.length === 0)
        return

      this.files = e.target.files
      this.$emit('input', this.file)
    },
    onDrop (e) {
      if (e.dataTransfer.files.length === 0)
        return

      this.dragover = false
      this.files    = e.dataTransfer.files
      this.$emit('input', this.file)
    },
  },
}

</script>

<style lang="scss">
  .upload-file {
    width: 100%;
    position: relative;
    label {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      min-height: 150px;
      border: 1px solid #ccc;
      border-radius: 4px;
      text-align: center;
      input[type="file"] {
        height: 0;
        width: 0;
        opacity: 0;
      }
      .btn {
        margin-top: .2rem;
      }
    }
    &.dragover {
      &::before {
        content: 'DROP HERE';
        position: absolute;
        height: 100%;
        width: 100%;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 3em;
        background-color: rgba(#ccc, .5);
        color: #6d6d6d;
        pointer-events: none;
      }
      label {
        border-style: solid;
        * {
          pointer-events: none;
        }
      }
    }
  }
</style>
