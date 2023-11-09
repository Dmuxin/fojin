<template>
  <div class="app-container">
    建设中...
  </div>
</template>

<script>
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'ComplexTable',
  components: { Pagination },
  directives: { waves },
  data() {
    return {

    }
  },
  created() {
  },
  methods: {
  }
}
</script>
