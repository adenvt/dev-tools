<template>
  <b-card>
    <b-row>
      <b-col md="6">
        <label>Text to Decode</label>
        <b-textarea
          v-model="form.text"
          class="mb-3 font-small text-monospace"
          rows="10"
        />
        <b-btn
          class="mt-1"
          variant="primary"
          :disabled="!form.text"
          @click="decode"
        >
          Decode
        </b-btn>
      </b-col>
      <b-col md="6">
        <label>Result</label>
        <template v-if="result.type !== 'text'">
          <b-card>
            <dl>
              <dt>Type</dt>
              <dd>{{ result.type }}</dd>

              <dt>Mimetype</dt>
              <dd>{{ result.mime }}</dd>

              <template v-if="result.type === 'image'">
                <dt>Preview</dt>
                <dd>
                  <b-img
                    class="my-2"
                    :src="result.data"
                    fluid
                    thumbnail
                  />
                </dd>
              </template>
            </dl>
          </b-card>
        </template>
        <template v-else>
          <b-textarea
            class="bg-white font-small text-monospace"
            rows="10"
            readonly
            :value="result.data"
          />
        </template>
        <div>
          <b-btn
            :disabled="!result.data"
            class="mt-3"
            variant="secondary"
            @click="download"
          >
            Save as File
          </b-btn>
        </div>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import download from 'downloadjs'

export default {
  data: () => ({
    form  : { text: '' },
    result: {
      type: 'text',
      data: '',
      mime: '',
    },
  }),
  methods: {
    decode () {
      try {
        if (this.form.text.startsWith('data:')) {
          const [data] = this.form.text.split(';')

          this.result.mime = data.substring(5)
          this.result.data = this.form.text
          this.result.type = this.form.text.startsWith('data:image/') ? 'image' : 'file'
        } else {
          this.result.type = 'text'
          this.result.data = atob(this.form.text)
        }
      } catch (err) {
        this.$notify({
          type : 'error',
          title: 'Decode Error',
          text : err.message,
        })
      }
    },
    download () {
      download(this.result.data, 'download')
    },
  },
}
</script>
