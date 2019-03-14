<template>
  <b-card>
    <b-row>
      <b-col md="6">
        <b-tabs
          v-model="form.tab"
          pills
        >
          <b-tab
            title="Text"
            class="py-3"
          >
            <label>Text to Encode</label>
            <b-textarea
              v-model="form.text"
              class="mb-3 font-small text-monospace"
              rows="10"
            />
          </b-tab>
          <b-tab
            title="File"
            class="py-3"
          >
            <label>File to Encode</label>
            <file-upload v-model="form.file" />
          </b-tab>
        </b-tabs>

        <b-btn
          class="mt-1"
          variant="primary"
          @click="encode"
        >
          Encode
        </b-btn>
      </b-col>
      <b-col md="6">
        <b-btn
          class="float-right mb-2 mx-1"
          variant="secondary"
          size="sm"
          @click="copy"
        >
          <i class="icon-docs" /> Copy
        </b-btn>
        <label>Result</label>
        <b-textarea
          id="result"
          class="bg-white font-small text-monospace"
          rows="15"
          readonly
          :value="result"
        />
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import FileUpload from '@/components/FileUpload'
import { encodeFile } from '@/utils/base64'

export default {
  components: { FileUpload },
  data      : () => ({
    form: {
      text: '',
      file: null,
      tab : 0,
    },
    result: '',
  }),
  methods: {
    async encode () {
      try {
        this.result = this.form.tab === 1
          ? await encodeFile(this.form.file)
          : btoa(this.form.text)
      } catch (err) {
        this.$notify({
          type : 'error',
          title: 'Encode Error',
          text : err.message,
        })
      }
    },
    copy (e) {
      try {
        const el = document.querySelector('#result')

        el.focus()
        el.select()

        document.execCommand('Copy')

        this.$notify({
          type : 'success',
          title: 'Copying Success',
          text : 'Result has been copied in Clipboard',
        })
      } catch (err) {
        this.$notify({
          type : 'error',
          title: 'Copying Error',
          text : err.message,
        })
      }
    },
  },
}
</script>
